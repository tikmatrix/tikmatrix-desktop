import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { platform, homedir } from 'os';
import { copyFileSync, mkdirSync, chmodSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine the tikmatrix-agent directory path
const agentDir = resolve(__dirname, '..', '..', 'tikmatrix-agent');
const isWindows = platform() === 'win32';
const isMac = platform() === 'darwin';
const args = process.argv.slice(2);
const debugMode = args.includes('--debug');
if (debugMode) {
    console.log('🐛 Debug mode enabled');
}

console.log(`🚀 Building tikmatrix-agent (${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'})...`);
console.log(`📁 Agent directory: ${agentDir}`);

// Step 1: Kill existing processes
function killProcesses() {
    // Return a promise that resolves when kill commands exit.
    return new Promise((resolve) => {
        console.log('🔪 Killing existing processes...');

        const children = [];

        if (isWindows) {
            try {
                children.push(spawn('taskkill', ['/IM', 'agent.exe', '/F'], { stdio: 'ignore' }));
                children.push(spawn('taskkill', ['/IM', 'script.exe', '/F'], { stdio: 'ignore' }));
            } catch (error) {
                // ignore
            }
        } else {
            try {
                children.push(spawn('pkill', ['-f', 'agent'], { stdio: 'ignore' }));
                children.push(spawn('pkill', ['-f', 'script'], { stdio: 'ignore' }));
            } catch (error) {
                // ignore
            }
        }

        if (children.length === 0) {
            // nothing to wait for
            return resolve();
        }

        let remaining = children.length;
        children.forEach((c) => {
            if (!c || !c.on) {
                remaining -= 1;
                if (remaining <= 0) resolve();
                return;
            }
            c.on('close', () => {
                remaining -= 1;
                if (remaining <= 0) resolve();
            });
            // also guard against error
            c.on('error', () => {
                remaining -= 1;
                if (remaining <= 0) resolve();
            });
        });
        // Fallback: resolve after a short timeout in case OS doesn't return
        setTimeout(() => resolve(), 2000);
    });
}

// Step 2: Run cargo build
function runCargoBuild() {
    return new Promise((resolve, reject) => {

        console.log(`🔨 Running cargo build ${debugMode ? '' : '--release'}...`);

        const cargo = spawn('cargo', ['build', debugMode ? '' : '--release'], {
            cwd: agentDir,
            stdio: 'inherit',
            shell: true
        });

        cargo.on('error', (error) => {
            reject(new Error(`Failed to run cargo: ${error.message}`));
        });

        cargo.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Cargo build failed with exit code ${code}`));
            } else {
                console.log('✅ Cargo build completed successfully!');
                resolve();
            }
        });
    });
}

// Step 3: Copy binaries to destination
async function copyBinaries() {
    console.log('📦 Copying binaries...');

    const releaseDir = join(agentDir, 'target', debugMode ? 'debug' : 'release');

    // helper: try copy with retries
    async function copyWithRetry(src, dest, makeExecutable = false) {
        const maxAttempts = 6;
        const delayMs = 300;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // If destination exists, try unlinking first to avoid EBUSY from stale handles
                try {
                    unlinkSync(dest);
                } catch (e) {
                    // ignore unlink errors
                }

                copyFileSync(src, dest);
                if (makeExecutable) {
                    try { chmodSync(dest, 0o755); } catch (e) { /* ignore */ }
                }
                return;
            } catch (err) {
                if (attempt === maxAttempts) throw err;
                // wait a bit and retry
                await new Promise((res) => setTimeout(res, delayMs));
            }
        }
    }

    if (isWindows) {
        // Windows paths
        const appDataDir = process.env.APPDATA || join(homedir(), 'AppData', 'Roaming');
        const tikmatrixBin = join(appDataDir, 'com.tikmatrix', 'bin');
        const igmatrixBin = join(appDataDir, 'com.igmatrix', 'bin');

        // Create directories if they don't exist
        mkdirSync(tikmatrixBin, { recursive: true });
        mkdirSync(igmatrixBin, { recursive: true });

        // Copy agent.exe
        const agentSrc = join(releaseDir, 'agent.exe');
        await copyWithRetry(agentSrc, join(tikmatrixBin, 'agent.exe'));
        await copyWithRetry(agentSrc, join(igmatrixBin, 'agent.exe'));
        console.log('✅ agent.exe copied');

        // Copy script.exe
        const scriptSrc = join(releaseDir, 'script.exe');
        await copyWithRetry(scriptSrc, join(tikmatrixBin, 'script.exe'));
        await copyWithRetry(scriptSrc, join(igmatrixBin, 'script.exe'));
        console.log('✅ script.exe copied');

    } else {
        // macOS/Linux paths
        const appSupportDir = isMac
            ? join(homedir(), 'Library', 'Application Support')
            : join(homedir(), '.local', 'share');

        // Use igmatrix as per build.sh
        const matrixAppDir = join(appSupportDir, 'com.igmatrix');
        const binDir = join(matrixAppDir, 'bin');

        // Create directory if it doesn't exist
        mkdirSync(binDir, { recursive: true });

        // Copy agent
        const agentSrc = join(releaseDir, 'agent');
        const agentDest = join(binDir, 'agent');
        await copyWithRetry(agentSrc, agentDest, true);
        console.log('✅ agent copied');

        // Copy script
        const scriptSrc = join(releaseDir, 'script');
        const scriptDest = join(binDir, 'script');
        await copyWithRetry(scriptSrc, scriptDest, true);
        console.log('✅ script copied');
    }
}

// Main execution
async function main() {
    try {
        await runCargoBuild();
        await killProcesses();
        await copyBinaries();
        console.log('🎉 Build completed successfully!');
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

main();
