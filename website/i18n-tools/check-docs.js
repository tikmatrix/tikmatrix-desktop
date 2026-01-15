// Documentation completeness checking tool for Docusaurus
// Checks if all language documentation directories have complete files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Documentation root (Docusaurus docs directory)
const DOCS_ROOT = path.resolve(__dirname, '../docs');
const I18N_ROOT = path.resolve(__dirname, '../i18n');

// Minimum file size threshold (files smaller than this are considered empty)
const MINIMUM_FILE_SIZE_BYTES = 100;

// Supported languages - based on Docusaurus config
const DOC_LANGUAGES = [
    { code: 'en', name: 'English', dir: '' }, // English is in docs/ root
    { code: 'zh-Hans', name: '简体中文', dir: 'zh-Hans' },
    { code: 'ru', name: 'Русский', dir: 'ru' },
    { code: 'ja', name: '日本語', dir: 'ja' },
    { code: 'ko', name: '한국어', dir: 'ko' },
    { code: 'es', name: 'Español', dir: 'es' },
    { code: 'pt', name: 'Português', dir: 'pt' },
    { code: 'fr', name: 'Français', dir: 'fr' },
    { code: 'de', name: 'Deutsch', dir: 'de' },
    { code: 'it', name: 'Italiano', dir: 'it' },
    { code: 'ar', name: 'العربية', dir: 'ar' },
    { code: 'hi', name: 'हिन्दी', dir: 'hi' },
    { code: 'id', name: 'Bahasa Indonesia', dir: 'id' },
    { code: 'th', name: 'ไทย', dir: 'th' },
    { code: 'vi', name: 'Tiếng Việt', dir: 'vi' },
    { code: 'tr', name: 'Türkçe', dir: 'tr' },
    { code: 'pl', name: 'Polski', dir: 'pl' },
    { code: 'nl', name: 'Nederlands', dir: 'nl' },
    { code: 'sv', name: 'Svenska', dir: 'sv' },
    { code: 'he', name: 'עברית', dir: 'he' },
    { code: 'uk', name: 'Українська', dir: 'uk' }
];

// Get all markdown files from base English docs
function collectExpectedFiles(baseDir) {
    const files = [];

    function traverse(dir, relativePath = '') {
        try {
            const entries = fs.readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name;

                if (entry.isDirectory()) {
                    traverse(fullPath, relPath);
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    files.push(relPath);
                }
            }
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error.message);
        }
    }

    traverse(baseDir);
    return files.sort();
}

// Check if file exists and is not empty
function checkFile(filePath) {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return { exists: false, empty: true, size: 0 };
        }

        const size = stats.size;
        const isEmpty = size < MINIMUM_FILE_SIZE_BYTES; // Consider files under threshold as effectively empty

        return { exists: true, empty: isEmpty, size };
    } catch (error) {
        return { exists: false, empty: true, size: 0 };
    }
}

// Check documentation completeness for a single language
function checkLanguageDocumentation(langConfig, expectedFiles) {
    let langDir;

    // English docs are in docs/ root, others are in i18n/{lang}/docusaurus-plugin-content-docs/current/
    if (langConfig.code === 'en') {
        langDir = DOCS_ROOT;
    } else {
        langDir = path.join(I18N_ROOT, langConfig.dir, 'docusaurus-plugin-content-docs', 'current');
    }

    const results = {
        code: langConfig.code,
        name: langConfig.name,
        dir: langDir,
        files: [],
        missingFiles: [],
        emptyFiles: [],
        totalSize: 0,
        exists: fs.existsSync(langDir)
    };

    if (!results.exists) {
        // If the directory doesn't exist, all files are missing
        results.missingFiles = [...expectedFiles];
        return results;
    }

    for (const file of expectedFiles) {
        const filePath = path.join(langDir, file);
        const fileCheck = checkFile(filePath);

        results.files.push({
            path: file,
            ...fileCheck
        });

        if (!fileCheck.exists) {
            results.missingFiles.push(file);
        } else if (fileCheck.empty) {
            results.emptyFiles.push(file);
        } else {
            results.totalSize += fileCheck.size;
        }
    }

    return results;
}

// Generate report
function generateReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📚 Docusaurus Documentation Completeness Report');
    console.log('='.repeat(80));

    console.log(`\n📄 Total expected files: ${results.totalFiles}`);
    console.log(`🌍 Total languages checked: ${results.languages.length}\n`);

    // Summary table
    console.log('┌─────────┬────────────────────┬──────────┬─────────┬───────┬─────────────┬────────┐');
    console.log('│ Code    │ Language           │ Complete │ Missing │ Empty │ Total Size  │ Status │');
    console.log('├─────────┼────────────────────┼──────────┼─────────┼───────┼─────────────┼────────┤');

    for (const result of results.languages) {
        const complete = result.files.filter(f => f.exists && !f.empty).length;
        const percentage = ((complete / results.totalFiles) * 100).toFixed(1);
        const sizeKB = (result.totalSize / 1024).toFixed(1);
        const status = result.missingFiles.length === 0 && result.emptyFiles.length === 0 ? '✅' : '⚠️';

        const existsIndicator = result.exists ? '' : '❌';

        console.log(
            `│ ${status} ${result.code.padEnd(6)}│ ${result.name.padEnd(18)} │ ` +
            `${complete.toString().padStart(3)}/${results.totalFiles.toString().padStart(3)} │ ` +
            `${result.missingFiles.length.toString().padStart(7)} │ ` +
            `${result.emptyFiles.length.toString().padStart(5)} │ ` +
            `${sizeKB.padStart(9)} KB │ ` +
            `${existsIndicator.padEnd(6)} │`
        );
    }

    console.log('└─────────┴────────────────────┴──────────┴─────────┴───────┴─────────────┴────────┘');

    // Detailed issues
    console.log('\n' + '='.repeat(80));
    console.log('📋 Detailed Issues by Language');
    console.log('='.repeat(80));

    for (const result of results.languages) {
        const hasIssues = !result.exists || result.missingFiles.length > 0 || result.emptyFiles.length > 0;

        if (!hasIssues) continue;

        console.log(`\n\n🔍 ${result.code} - ${result.name}`);
        console.log('-'.repeat(80));

        if (!result.exists) {
            console.log(`\n  ❌ Documentation directory does not exist:`);
            console.log(`     ${result.dir}`);
            console.log(`\n  💡 To create this directory structure, run:`);
            console.log(`     mkdir -p "${result.dir}"`);
            continue;
        }

        if (result.missingFiles.length > 0) {
            console.log(`\n  ❌ Missing files (${result.missingFiles.length}):`);
            result.missingFiles.slice(0, 10).forEach(file => {
                console.log(`     - ${file}`);
            });
            if (result.missingFiles.length > 10) {
                console.log(`     ... and ${result.missingFiles.length - 10} more`);
            }
        }

        if (result.emptyFiles.length > 0) {
            console.log(`\n  ⚠️  Empty or too small files (${result.emptyFiles.length}):`);
            result.emptyFiles.slice(0, 10).forEach(file => {
                console.log(`     - ${file}`);
            });
            if (result.emptyFiles.length > 10) {
                console.log(`     ... and ${result.emptyFiles.length - 10} more`);
            }
        }
    }

    // Overall summary
    console.log('\n\n' + '='.repeat(80));
    console.log('📊 Summary');
    console.log('='.repeat(80));

    const fullyComplete = results.languages.filter(r =>
        r.exists && r.missingFiles.length === 0 && r.emptyFiles.length === 0
    ).length;

    const notExists = results.languages.filter(r => !r.exists).length;
    const incomplete = results.languages.filter(r =>
        r.exists && (r.missingFiles.length > 0 || r.emptyFiles.length > 0)
    ).length;

    console.log(`✅ Fully complete languages: ${fullyComplete}/${results.languages.length}`);
    console.log(`❌ Languages without directory: ${notExists}`);
    console.log(`⚠️  Languages with incomplete docs: ${incomplete}`);

    if (fullyComplete === results.languages.length) {
        console.log('\n🎉 All documentation is complete!');
    } else {
        console.log('\n⚠️  Some documentation needs attention. Please review the detailed issues above.');
    }

    console.log('\n' + '='.repeat(80) + '\n');
}

// Main execution
function main() {
    console.log('🚀 Starting Docusaurus documentation completeness check...\n');

    try {
        // Collect expected files from English docs
        console.log('📖 Scanning English documentation for expected files...');
        const expectedFiles = collectExpectedFiles(DOCS_ROOT);
        console.log(`   Found ${expectedFiles.length} markdown files\n`);

        // Check each language
        const languageResults = [];

        for (const langConfig of DOC_LANGUAGES) {
            const result = checkLanguageDocumentation(langConfig, expectedFiles);
            languageResults.push(result);
        }

        // Generate report
        const report = {
            totalFiles: expectedFiles.length,
            languages: languageResults
        };

        generateReport(report);

        // Exit with error code if there are issues
        const hasIssues = languageResults.some(r =>
            !r.exists || r.missingFiles.length > 0 || r.emptyFiles.length > 0
        );

        process.exit(hasIssues ? 1 : 0);

    } catch (error) {
        console.error('❌ Error during check:', error);
        process.exit(1);
    }
}

main();
