import { execSync } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Configuration
const API_KEY = 'LUfAkEaQ3Hwd5Cs6KbJr8FVGYDSzMj9R';
const API_URL = 'https://api.niostack.com/ci/update_lib';
// const API_URL = 'http://localhost:8787/ci/update_lib';
const PLATFORM = 'windows';
const BETA = '0'; //changeme 设置为 '1' 以使用测试环境
const SCRIPT_NAME = BETA === '1' ? 'beta/script.exe' : 'script.exe';
const AGENT_NAME = BETA === '1' ? 'beta/agent.exe' : 'agent.exe';

// tikmatrix-agent 项目路径(相对于当前项目)
const AGENT_PROJECT_PATH = path.resolve(__dirname, '../../tikmatrix-agent');

// Get version from command line arguments
let version = process.argv.find(arg => arg.startsWith('--version='))?.split('=')[1];

// Determine which components to deploy
const componentArg = process.argv.find(arg => arg.startsWith('--component='))?.split('=')[1]?.toLowerCase();
const agentOnlyFlag = process.argv.includes('--agent-only');
const scriptOnlyFlag = process.argv.includes('--script-only');

let componentSelection = 'both';

if (componentArg) {
    if (!['agent', 'script', 'both'].includes(componentArg)) {
        console.error(`Invalid component "${componentArg}". Use "agent", "script", or "both".`);
        process.exit(1);
    }
    componentSelection = componentArg;
} else if (agentOnlyFlag && scriptOnlyFlag) {
    console.error('Cannot use both "--agent-only" and "--script-only" flags simultaneously.');
    process.exit(1);
} else if (agentOnlyFlag) {
    componentSelection = 'agent';
} else if (scriptOnlyFlag) {
    componentSelection = 'script';
}

const deployAgent = componentSelection === 'agent' || componentSelection === 'both';
const deployScript = componentSelection === 'script' || componentSelection === 'both';

if (!deployAgent && !deployScript) {
    console.error('No component selected for deployment.');
    process.exit(1);
}

// Function to prompt for version
function promptForVersion() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Please enter the version number (e.g., 1.0.0): ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Function to make HTTP POST request
async function updateLibrary(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
}

// Main deployment function
async function deploy() {
    try {
        // Get version
        if (!version) {
            version = await promptForVersion();
        }

        // Ensure version starts with 'win'
        if (!version.startsWith('win')) {
            version = `win${version}`;
        }

        const componentsLabel = [deployAgent ? 'agent' : null, deployScript ? 'script' : null].filter(Boolean).join(' & ');

        console.log(`Building and deploying ${componentsLabel} version ${version} for Windows platform...`);

        // Build with Cargo
        console.log('Building with cargo...');
        execSync('cargo build --release', {
            stdio: 'inherit',
            cwd: AGENT_PROJECT_PATH
        });

        // Upload to R2
        if (deployAgent) {
            console.log(`Uploading ${AGENT_NAME} to R2...`);
            execSync(`wrangler r2 object put matrix/${AGENT_NAME} --file=target/release/agent.exe --remote`, {
                stdio: 'inherit',
                cwd: AGENT_PROJECT_PATH
            });
        }

        if (deployScript) {
            console.log(`Uploading ${SCRIPT_NAME} to R2...`);
            execSync(`wrangler r2 object put matrix/${SCRIPT_NAME} --file=target/release/script.exe --remote`, {
                stdio: 'inherit',
                cwd: AGENT_PROJECT_PATH
            });
        }

        console.log('Upload complete. Updating library versions...');

        if (deployAgent) {
            // Update agent library
            const agentUpdateData = {
                oldName: 'agent',
                oldPlatform: PLATFORM,
                name: 'agent',
                downloadUrl: `https://r2.niostack.com/${AGENT_NAME}`,
                platform: PLATFORM,
                version: version,
                app: 'TikMatrix',
                beta: BETA
            };

            console.log('Updating agent library...');
            try {
                await updateLibrary(agentUpdateData);
                console.log('Agent library updated successfully');
            } catch (error) {
                console.error('Failed to update agent library:', error.message);
            }
        }

        if (deployScript) {
            // Update script library
            const scriptUpdateData = {
                oldName: 'script',
                oldPlatform: PLATFORM,
                name: 'script',
                downloadUrl: `https://r2.niostack.com/${SCRIPT_NAME}`,
                platform: PLATFORM,
                version: version,
                app: 'TikMatrix',
                beta: BETA
            };

            console.log('Updating script library...');
            try {
                await updateLibrary(scriptUpdateData);
                console.log('Script library updated successfully');
            } catch (error) {
                console.error('Failed to update script library:', error.message);
            }
        }

        console.log(`${componentsLabel.charAt(0).toUpperCase()}${componentsLabel.slice(1)} deployment complete. Updated version ${version} for Windows platform.`);
    } catch (error) {
        console.error('Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run deployment
deploy();
