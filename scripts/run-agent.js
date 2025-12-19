import { spawn } from 'child_process';
import { join } from 'path';
import { platform, homedir } from 'os';

const isWindows = platform() === 'win32';
const isMac = platform() === 'darwin';

// Parse command line arguments
const args = process.argv.slice(2);
const appType = args[0] || 'tikmatrix'; // Default to tikmatrix

// Validate app type
if (!['tikmatrix', 'igmatrix'].includes(appType.toLowerCase())) {
    console.error('❌ Invalid app type. Use: tikmatrix or igmatrix');
    console.log('Usage: node run-agent.js [tikmatrix|igmatrix]');
    process.exit(1);
}

const isTikMatrix = appType.toLowerCase() === 'tikmatrix';
const appName = isTikMatrix ? 'TikMatrix' : 'IgMatrix';
const appId = isTikMatrix ? 'com.tikmatrix' : 'com.igmatrix';

console.log(`🚀 Starting ${appName} Agent...`);

// Set environment variables
function setEnvironment() {
    process.env.MATRIX_APP_NAME = appName;
    process.env.LOG_LEVEL = 'info';

    if (isWindows) {
        const appDataDir = process.env.APPDATA || join(homedir(), 'AppData', 'Roaming');
        process.env.MATRIX_APP_WORK_DIR = join(appDataDir, appId);
    } else {
        const appSupportDir = isMac
            ? join(homedir(), 'Library', 'Application Support')
            : join(homedir(), '.local', 'share');
        process.env.MATRIX_APP_WORK_DIR = join(appSupportDir, appId);
    }

    console.log(`📝 Environment:`);
    console.log(`   MATRIX_APP_NAME: ${process.env.MATRIX_APP_NAME}`);
    console.log(`   MATRIX_APP_WORK_DIR: ${process.env.MATRIX_APP_WORK_DIR}`);
    console.log(`   LOG_LEVEL: ${process.env.LOG_LEVEL}`);
}

// Start the agent process
function startAgent() {
    const agentExecutable = isWindows
        ? join(process.env.MATRIX_APP_WORK_DIR, 'bin', 'agent.exe')
        : join(process.env.MATRIX_APP_WORK_DIR, 'bin', 'agent');

    console.log(`\n🎯 Starting agent from: ${agentExecutable}`);

    let agentProcess;

    if (isWindows) {
        // On Windows, spawn directly without a new window
        agentProcess = spawn(agentExecutable, [], {
            stdio: 'inherit',
            detached: false,
            env: process.env
        });
    } else {
        // On Unix systems
        agentProcess = spawn(agentExecutable, [], {
            stdio: 'inherit',
            detached: false,
            env: process.env
        });
    }

    agentProcess.on('error', (error) => {
        console.error(`❌ Failed to start agent: ${error.message}`);
        process.exit(1);
    });

    agentProcess.on('spawn', () => {
        console.log(`✅ ${appName} agent started successfully!`);
        console.log(`\n💡 Press Ctrl+C to stop the agent\n`);
    });

    agentProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`⚠️  Agent exited with code ${code}`);
            process.exit(code);
        } else {
            console.log('👋 Agent stopped gracefully');
        }
    });

    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
        console.log('\n\n⏹️  Stopping agent...');
        agentProcess.kill('SIGINT');
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    });

    process.on('SIGTERM', () => {
        console.log('\n\n⏹️  Stopping agent...');
        agentProcess.kill('SIGTERM');
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    });
}

// Main execution
async function main() {
    try {
        setEnvironment();
        startAgent();
    } catch (error) {
        console.error('❌ Failed to start agent:', error.message);
        process.exit(1);
    }
}

main();
