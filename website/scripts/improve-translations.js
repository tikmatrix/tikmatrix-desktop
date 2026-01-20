#!/usr/bin/env node

/**
 * Translation Improvement Script
 * Automatically improve translations in website/i18n directory using GitHub Copilot CLI
 * 
 * Features:
 * - Concurrent processing with configurable limits
 * - Progress tracking and reporting
 * - Error handling and logging
 * - Skip already processed files
 * - Support for dry-run mode
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const { promisify } = require('util');

// Configuration
const CONFIG = {
    i18nDir: path.join(__dirname, '..', 'i18n'),
    logDir: path.join(__dirname, '..', 'logs'),
    concurrency: 3, // Number of parallel processes
    fileExtensions: ['.json', '.md', '.mdx'],
    excludePatterns: ['node_modules', '.git', 'current.json'],
    copilotModel: 'gpt-5-mini',
    dryRun: false,
    skipProcessed: true,
    verbose: false
};

// Language code to full name mapping
const LANGUAGE_MAP = {
    'zh-Hans': 'Simplified Chinese',
    'ar': 'Arabic',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'nl': 'Dutch',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'sv': 'Swedish',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'vi': 'Vietnamese'
};

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const config = { ...CONFIG };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--concurrency':
            case '-c':
                config.concurrency = parseInt(args[++i], 10);
                break;
            case '--dry-run':
            case '-d':
                config.dryRun = true;
                break;
            case '--no-skip':
                config.skipProcessed = false;
                break;
            case '--verbose':
            case '-v':
                config.verbose = true;
                break;
            case '--model':
            case '-m':
                config.copilotModel = args[++i];
                break;
            case '--lang':
            case '-l':
                config.targetLang = args[++i];
                break;
            case '--help':
            case '-h':
                printHelp();
                process.exit(0);
            default:
                if (args[i].startsWith('-')) {
                    console.error(`Unknown option: ${args[i]}`);
                    printHelp();
                    process.exit(1);
                }
        }
    }

    return config;
}

function printHelp() {
    console.log(`
Usage: node improve-translations.js [options]

Options:
  -c, --concurrency <num>   Number of parallel processes (default: 3)
  -d, --dry-run            Preview files without processing
  -v, --verbose            Show detailed logs
  -m, --model <model>      Copilot model to use (default: gpt-4o-mini)
  -l, --lang <code>        Process only specific language (e.g., zh-Hans)
  --no-skip                Don't skip already processed files
  -h, --help               Show this help message

Examples:
  node improve-translations.js
  node improve-translations.js --dry-run
  node improve-translations.js -c 5 -l zh-Hans
  node improve-translations.js --verbose --no-skip
  `);
}

// Ensure log directory exists
function ensureLogDir(config) {
    if (!fs.existsSync(config.logDir)) {
        fs.mkdirSync(config.logDir, { recursive: true });
    }
}

// Get all files recursively
function getAllFiles(dir, baseDir = dir, config) {
    let results = [];

    if (!fs.existsSync(dir)) {
        console.warn(`Directory does not exist: ${dir}`);
        return results;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        // Check if should be excluded
        if (config.excludePatterns.some(pattern => item.includes(pattern))) {
            continue;
        }

        if (stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, baseDir, config));
        } else if (stat.isFile()) {
            const ext = path.extname(item);
            if (config.fileExtensions.includes(ext)) {
                results.push(fullPath);
            }
        }
    }

    return results;
}

// Extract language code from file path
function extractLanguage(filePath, i18nDir) {
    const relativePath = path.relative(i18nDir, filePath);
    const langCode = relativePath.split(path.sep)[0];
    return {
        code: langCode,
        name: LANGUAGE_MAP[langCode] || langCode
    };
}

// Generate file metadata
function generateMetadata(files, i18nDir) {
    return files.map(filePath => {
        const lang = extractLanguage(filePath, i18nDir);
        const relativePath = path.relative(i18nDir, filePath);
        const stat = fs.statSync(filePath);

        return {
            // absolutePath is kept for compatibility but now holds the path
            // relative to the i18n directory (per request).
            absolutePath: relativePath,
            relativePath: relativePath,
            languageCode: lang.code,
            languageName: lang.name,
            extension: path.extname(filePath),
            size: stat.size,
            lastModified: stat.mtime
        };
    });
}

// Check if copilot CLI is available
function checkCopilotCLI() {
    try {
        execSync('copilot --version', { stdio: 'pipe' });
        return true;
    } catch (error) {
        console.error('❌ GitHub Copilot CLI is not installed or not in PATH');
        console.error('Please install it first: https://github.com/github/gh-copilot');
        return false;
    }
}

// Process a single file with copilot
async function processFile(metadata, config) {
    const { absolutePath, languageName, languageCode, relativePath } = metadata;

    // Resolve the actual file path from the i18n directory and the stored relative path
    const fileFullPath = path.join(config.i18nDir, absolutePath);

    const prompt = `"
请将文件 i18n/${relativePath} 的内容翻译为目标语言：${languageName}（${languageCode}）。

【回复规则（必须严格遵守）】
你只能回复以下两种中文之一：
1️⃣ 已经检测到所有内容都正确，无需翻译
2️⃣ 我已经翻译完成

禁止回复任何其他文字、解释、标点或格式。
"`;

    const command = 'copilot';
    const args = [
        '-p',
        prompt,
        '--yolo',
        '--model',
        config.copilotModel

    ];

    if (config.verbose) {
        console.log(`\n📝 Processing: ${relativePath}`);
        console.log(`   Command: ${command} ${args.join(' ')}`);
    }

    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const proc = spawn(command, args, {
            stdio: config.verbose ? 'inherit' : 'pipe',
            shell: true,
            cwd: path.dirname(fileFullPath)
        });

        let stdout = '';
        let stderr = '';

        if (!config.verbose) {
            proc.stdout?.on('data', (data) => { stdout += data.toString(); });
            proc.stderr?.on('data', (data) => { stderr += data.toString(); });
        }

        proc.on('close', (code) => {
            const duration = Date.now() - startTime;

            if (code === 0) {
                resolve({
                    success: true,
                    file: relativePath,
                    duration,
                    stdout
                });
            } else {
                reject({
                    success: false,
                    file: relativePath,
                    code,
                    duration,
                    stderr: stderr || stdout
                });
            }
        });

        proc.on('error', (error) => {
            reject({
                success: false,
                file: relativePath,
                error: error.message,
                duration: Date.now() - startTime
            });
        });
    });
}

// Process files with concurrency control
async function processFilesWithConcurrency(metadataList, config) {
    const results = {
        total: metadataList.length,
        success: 0,
        failed: 0,
        skipped: 0,
        errors: [],
        startTime: Date.now()
    };

    // Simple concurrency control using Promise.all with batches
    const batches = [];
    for (let i = 0; i < metadataList.length; i += config.concurrency) {
        batches.push(metadataList.slice(i, i + config.concurrency));
    }

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        const batchPromises = batch.map(async (metadata) => {
            try {
                // Check if file was recently processed
                if (config.skipProcessed) {
                    const fullPath = path.join(config.i18nDir, metadata.absolutePath);
                    const stat = fs.statSync(fullPath);
                    const hoursSinceModified = (Date.now() - stat.mtime.getTime()) / (1000 * 60 * 60);
                    if (hoursSinceModified < 1) {
                        results.skipped++;
                        if (config.verbose) {
                            console.log(`⏭️  Skipping (recently modified): ${metadata.relativePath}`);
                        }
                        return { skipped: true };
                    }
                }

                const result = await processFile(metadata, config);
                results.success++;
                console.log(`✅ [${results.success + results.failed}/${results.total}] ${metadata.relativePath} (${result.duration}ms)`);
                return result;
            } catch (error) {
                results.failed++;
                results.errors.push({
                    file: metadata.relativePath,
                    error: error.stderr || error.error || 'Unknown error'
                });
                console.error(`❌ [${results.success + results.failed}/${results.total}] ${metadata.relativePath}`);
                if (config.verbose && error.stderr) {
                    console.error(`   Error: ${error.stderr}`);
                }
                return error;
            }
        });

        await Promise.all(batchPromises);

        // Progress update
        const progress = ((batchIndex + 1) / batches.length * 100).toFixed(1);
        console.log(`\n📊 Progress: ${progress}% (Batch ${batchIndex + 1}/${batches.length})\n`);
    }

    results.endTime = Date.now();
    results.totalDuration = results.endTime - results.startTime;

    return results;
}

// Write results to log file
function writeLog(results, config) {
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const logFile = path.join(config.logDir, `translation-improvement-${timestamp}.log`);

    const logContent = `
Translation Improvement Log
===========================
Date: ${new Date().toISOString()}
Total Files: ${results.total}
Successful: ${results.success}
Failed: ${results.failed}
Skipped: ${results.skipped}
Duration: ${(results.totalDuration / 1000).toFixed(2)}s
Average: ${results.total > 0 ? (results.totalDuration / results.total).toFixed(0) : 0}ms per file

Configuration:
- Concurrency: ${config.concurrency}
- Model: ${config.copilotModel}
- Dry Run: ${config.dryRun}
- Skip Processed: ${config.skipProcessed}

${results.errors.length > 0 ? `
Errors:
${results.errors.map((e, i) => `${i + 1}. ${e.file}\n   ${e.error}`).join('\n')}
` : ''}
`;

    fs.writeFileSync(logFile, logContent);
    console.log(`\n📄 Log saved to: ${logFile}`);
}

// Main function
async function main() {
    console.log('🚀 Translation Improvement Script\n');

    const config = parseArgs();

    // Validate copilot CLI
    if (!config.dryRun && !checkCopilotCLI()) {
        process.exit(1);
    }

    // Ensure directories exist
    ensureLogDir(config);

    // Get all files
    console.log('📂 Scanning i18n directory...');
    const allFiles = getAllFiles(config.i18nDir, config.i18nDir, config);
    console.log(`   Found ${allFiles.length} files\n`);

    if (allFiles.length === 0) {
        console.log('No files to process.');
        return;
    }

    // Generate metadata
    let metadataList = generateMetadata(allFiles, config.i18nDir);

    // Filter by language if specified
    if (config.targetLang) {
        metadataList = metadataList.filter(m => m.languageCode === config.targetLang);
        console.log(`🔍 Filtered to language: ${config.targetLang} (${metadataList.length} files)\n`);
    }

    if (metadataList.length === 0) {
        console.log('No files match the criteria.');
        return;
    }

    // Show metadata summary
    const langCounts = metadataList.reduce((acc, m) => {
        acc[m.languageCode] = (acc[m.languageCode] || 0) + 1;
        return acc;
    }, {});

    console.log('📊 Files by language:');
    Object.entries(langCounts).forEach(([code, count]) => {
        const name = LANGUAGE_MAP[code] || code;
        console.log(`   ${code.padEnd(10)} (${name}): ${count} files`);
    });
    console.log('');

    // Dry run mode
    if (config.dryRun) {
        console.log('🔍 DRY RUN MODE - No files will be processed\n');
        console.log('Sample files to be processed:');
        metadataList.slice(0, 5).forEach(m => {
            console.log(`   - ${m.relativePath}`);
        });
        if (metadataList.length > 5) {
            console.log(`   ... and ${metadataList.length - 5} more files`);
        }
        return;
    }

    // Confirm before processing
    console.log(`⚙️  Configuration:`);
    console.log(`   - Concurrency: ${config.concurrency}`);
    console.log(`   - Model: ${config.copilotModel}`);
    console.log(`   - Skip recently processed: ${config.skipProcessed}`);
    console.log('');

    // Process files
    console.log('🔄 Starting processing...\n');
    const results = await processFilesWithConcurrency(metadataList, config);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ Processing Complete!\n');
    console.log(`Total Files: ${results.total}`);
    console.log(`✅ Successful: ${results.success}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⏭️  Skipped: ${results.skipped}`);
    console.log(`⏱️  Total Duration: ${(results.totalDuration / 1000).toFixed(2)}s`);
    console.log(`📈 Average: ${results.total > 0 ? (results.totalDuration / results.total).toFixed(0) : 0}ms per file`);
    console.log('='.repeat(60));

    // Write log
    writeLog(results, config);

    // Exit with error code if there were failures
    if (results.failed > 0) {
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { main, generateMetadata, getAllFiles };
