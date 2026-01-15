// Comprehensive i18n translation checking tool for Docusaurus
// Checks translation completeness, language detection, and content quality for all supported languages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { franc } from 'franc-min';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants for text analysis
const MINIMUM_TEXT_LENGTH_FOR_DETECTION = 30; // Increased to reduce false positives
const COMMON_ENGLISH_WORDS_PATTERN = /\b(the|is|are|and|or|to|in|for|of|on|at|with|by)\b/i;
const PLACEHOLDER_PATTERN = /\{[^}]+\}/g;
const NON_WORD_PATTERN = /[^\w\s]/g;
const NUMBERS_AND_FORMATTING_PATTERN = /^[0-9\s\-\/\(\)]+$/;
const BRAND_NAMES_PATTERN = /TikTok|TikMatrix|IgMatrix|Instagram|Android|GitHub|Telegram/i;

// Supported languages configuration with ISO 639-3 codes for language detection
// Based on docusaurus.config.js locales
const LANGUAGES = {
    'zh-Hans': { name: '简体中文', isoCode: 'cmn', dir: 'zh-Hans' },
    'ru': { name: 'Русский', isoCode: 'rus', dir: 'ru' },
    'ja': { name: '日本語', isoCode: 'jpn', dir: 'ja' },
    'ko': { name: '한국어', isoCode: 'kor', dir: 'ko' },
    'es': { name: 'Español', isoCode: 'spa', dir: 'es' },
    'pt': { name: 'Português', isoCode: 'por', dir: 'pt' },
    'fr': { name: 'Français', isoCode: 'fra', dir: 'fr' },
    'de': { name: 'Deutsch', isoCode: 'deu', dir: 'de' },
    'it': { name: 'Italiano', isoCode: 'ita', dir: 'it' },
    'ar': { name: 'العربية', isoCode: 'arb', dir: 'ar' },
    'hi': { name: 'हिन्दी', isoCode: 'hin', dir: 'hi' },
    'id': { name: 'Bahasa Indonesia', isoCode: 'ind', dir: 'id' },
    'th': { name: 'ไทย', isoCode: 'tha', dir: 'th' },
    'vi': { name: 'Tiếng Việt', isoCode: 'vie', dir: 'vi' },
    'tr': { name: 'Türkçe', isoCode: 'tur', dir: 'tr' },
    'pl': { name: 'Polski', isoCode: 'pol', dir: 'pl' },
    'nl': { name: 'Nederlands', isoCode: 'nld', dir: 'nl' },
    'sv': { name: 'Svenska', isoCode: 'swe', dir: 'sv' },
    'he': { name: 'עברית', isoCode: 'heb', dir: 'he' },
    'uk': { name: 'Українська', isoCode: 'ukr', dir: 'uk' }
};

// Docusaurus i18n directory structure
const I18N_ROOT = path.resolve(__dirname, '../i18n');

// Load code.json translation files
function loadTranslations() {
    const translations = {};

    for (const [code, config] of Object.entries(LANGUAGES)) {
        try {
            const codeJsonPath = path.join(I18N_ROOT, config.dir, 'code.json');

            if (fs.existsSync(codeJsonPath)) {
                const content = fs.readFileSync(codeJsonPath, 'utf8');
                translations[code] = JSON.parse(content);
            } else {
                console.warn(`⚠️  Warning: code.json not found for ${code} at ${codeJsonPath}`);
                translations[code] = {};
            }
        } catch (error) {
            console.error(`❌ Failed to load ${code}: ${error.message}`);
            translations[code] = {};
        }
    }

    return translations;
}

// Collect all unique keys from all translations
function collectAllKeys(translations) {
    const allKeys = new Set();

    for (const trans of Object.values(translations)) {
        Object.keys(trans).forEach(key => allKeys.add(key));
    }

    return Array.from(allKeys).sort();
}

// Check if a string is likely English (simple heuristic)
function isLikelyEnglish(text) {
    if (!text || typeof text !== 'string') return false;

    // Check for common English words
    return COMMON_ENGLISH_WORDS_PATTERN.test(text);
}

// Detect language of text using franc library
function detectLanguage(text) {
    if (!text || typeof text !== 'string' || text.length < MINIMUM_TEXT_LENGTH_FOR_DETECTION) {
        return 'und'; // undefined
    }

    // Remove common placeholders and special characters
    const cleanText = text.replace(PLACEHOLDER_PATTERN, '').replace(NON_WORD_PATTERN, ' ').trim();

    if (cleanText.length < MINIMUM_TEXT_LENGTH_FOR_DETECTION) {
        return 'und';
    }

    return franc(cleanText);
}

// Extract text values from nested JSON structure
function extractTextValues(obj, prefix = '') {
    const values = {};

    if (typeof obj === 'string') {
        return { [prefix]: obj };
    }

    if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
            const newPrefix = prefix ? `${prefix}.${key}` : key;

            if (typeof value === 'string') {
                values[newPrefix] = value;
            } else if (typeof value === 'object' && value !== null) {
                if (value.message && typeof value.message === 'string') {
                    values[newPrefix] = value.message;
                } else {
                    Object.assign(values, extractTextValues(value, newPrefix));
                }
            }
        }
    }

    return values;
}

// Check translation completeness for a single language
function checkLanguageCompleteness(langCode, translations, allKeys, allTranslations) {
    const langName = LANGUAGES[langCode].name;
    const expectedIsoCode = LANGUAGES[langCode].isoCode;
    const trans = translations[langCode] || {};

    // Extract text values from nested structure
    const transValues = extractTextValues(trans);

    const missing = [];
    const empty = [];
    const sameAsEnglish = [];
    const wrongLanguage = [];

    for (const key of allKeys) {
        const value = transValues[key];

        // Check if key is missing
        if (value === undefined) {
            missing.push(key);
            continue;
        }

        // Check if value is empty
        if (!value || value.trim() === '') {
            empty.push(key);
            continue;
        }

        // Skip language detection for English
        if (langCode === 'en') continue;

        // Check if value is same as English (not translated)
        const englishTrans = extractTextValues(allTranslations['en'] || {});
        const englishValue = englishTrans[key];

        if (englishValue && value === englishValue && !value.match(NUMBERS_AND_FORMATTING_PATTERN)) {
            // Skip if it's just numbers or simple formatting
            // English fallback is acceptable for incomplete translations, so we mark it but don't fail
            sameAsEnglish.push({ key, value });
            continue;
        }

        // Skip detection for brand-heavy content (TikTok, Instagram, etc.)
        if (value.match(BRAND_NAMES_PATTERN)) {
            continue; // Brand names often cause false positives
        }

        // Check if translation is in the correct language
        // Only check longer strings for better accuracy
        if (value.length > MINIMUM_TEXT_LENGTH_FOR_DETECTION) {
            const detectedLang = detectLanguage(value);

            // Allow 'und' (undefined) as it might be technical terms
            // Allow 'eng' for languages that use English as fallback
            if (detectedLang !== 'und' && detectedLang !== expectedIsoCode && detectedLang !== 'eng') {
                // Only flag non-English language mismatches (real translation errors)
                wrongLanguage.push({ key, value, detected: detectedLang, expected: expectedIsoCode });
            }
        }
    }

    return {
        langCode,
        langName,
        total: allKeys.length,
        translated: allKeys.length - missing.length - empty.length,
        missing,
        empty,
        sameAsEnglish,
        wrongLanguage
    };
}

// Generate report
function generateReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📊 Docusaurus i18n Translation Completeness Report');
    console.log('='.repeat(80));

    console.log(`\n📝 Total translation keys: ${results.totalKeys}`);
    console.log(`🌍 Total languages checked: ${results.languages.length}\n`);

    // Summary table
    console.log('┌─────────┬────────────────────┬───────────┬─────────┬───────┬──────────┬───────────┐');
    console.log('│ Code    │ Language           │ Translated│ Missing │ Empty │ Same as  │ Wrong     │');
    console.log('│         │                    │           │         │       │ English  │ Language  │');
    console.log('├─────────┼────────────────────┼───────────┼─────────┼───────┼──────────┼───────────┤');

    for (const result of results.languages) {
        const percentage = ((result.translated / result.total) * 100).toFixed(1);
        const status = result.missing.length === 0 && result.empty.length === 0 ? '✅' : '⚠️';

        console.log(
            `│ ${status} ${result.langCode.padEnd(6)}│ ${result.langName.padEnd(18)} │ ` +
            `${result.translated.toString().padStart(4)}/${result.total.toString().padStart(4)}│ ` +
            `${result.missing.length.toString().padStart(7)} │ ` +
            `${result.empty.length.toString().padStart(5)} │ ` +
            `${result.sameAsEnglish.length.toString().padStart(8)} │ ` +
            `${result.wrongLanguage.length.toString().padStart(9)} │`
        );
    }

    console.log('└─────────┴────────────────────┴───────────┴─────────┴───────┴──────────┴───────────┘');

    // Detailed issues
    console.log('\n' + '='.repeat(80));
    console.log('📋 Detailed Issues by Language');
    console.log('='.repeat(80));

    for (const result of results.languages) {
        const hasIssues = result.missing.length > 0 ||
            result.empty.length > 0 ||
            result.sameAsEnglish.length > 0 ||
            result.wrongLanguage.length > 0;

        if (!hasIssues) continue;

        console.log(`\n\n🔍 ${result.langCode} - ${result.langName}`);
        console.log('-'.repeat(80));

        if (result.missing.length > 0) {
            console.log(`\n  ❌ Missing keys (${result.missing.length}):`);
            result.missing.slice(0, 10).forEach(key => {
                console.log(`     - ${key}`);
            });
            if (result.missing.length > 10) {
                console.log(`     ... and ${result.missing.length - 10} more`);
            }
        }

        if (result.empty.length > 0) {
            console.log(`\n  ⚠️  Empty values (${result.empty.length}):`);
            result.empty.slice(0, 10).forEach(key => {
                console.log(`     - ${key}`);
            });
            if (result.empty.length > 10) {
                console.log(`     ... and ${result.empty.length - 10} more`);
            }
        }

        if (result.sameAsEnglish.length > 0) {
            console.log(`\n  ℹ️  English fallback (awaiting translation) (${result.sameAsEnglish.length}):`);
            console.log(`     Note: English fallback is acceptable for incomplete translations`);
            result.sameAsEnglish.slice(0, 3).forEach(item => {
                console.log(`     - ${item.key}: "${item.value.substring(0, 60)}${item.value.length > 60 ? '...' : ''}"`);
            });
            if (result.sameAsEnglish.length > 3) {
                console.log(`     ... and ${result.sameAsEnglish.length - 3} more`);
            }
        }

        if (result.wrongLanguage.length > 0) {
            console.log(`\n  🚨 Wrong language detected (${result.wrongLanguage.length}):`);
            result.wrongLanguage.slice(0, 5).forEach(item => {
                console.log(`     - ${item.key}:`);
                console.log(`       Text: "${item.value.substring(0, 50)}${item.value.length > 50 ? '...' : ''}"`);
                console.log(`       Expected: ${item.expected}, Detected: ${item.detected}`);
            });
            if (result.wrongLanguage.length > 5) {
                console.log(`     ... and ${result.wrongLanguage.length - 5} more`);
            }
        }
    }

    // Overall summary
    console.log('\n\n' + '='.repeat(80));
    console.log('📊 Summary');
    console.log('='.repeat(80));

    const fullyComplete = results.languages.filter(r =>
        r.missing.length === 0 && r.empty.length === 0
    ).length;

    const needsTranslation = results.languages.filter(r =>
        r.sameAsEnglish.length > 0
    ).length;

    const hasWrongLanguage = results.languages.filter(r =>
        r.wrongLanguage.length > 0
    ).length;

    console.log(`✅ Fully complete languages: ${fullyComplete}/${results.languages.length}`);
    console.log(`ℹ️  Languages with English fallback: ${needsTranslation}`);
    console.log(`⚠️  Languages with potential false positives: ${hasWrongLanguage} (language detection limitations)`);

    if (fullyComplete === results.languages.length) {
        console.log('\n✅ All translation structures are complete!');
        if (needsTranslation > 0) {
            console.log(`ℹ️  Note: ${needsTranslation} languages use English fallback for untranslated content (standard practice).`);
        }
        if (hasWrongLanguage > 0) {
            console.log(`ℹ️  Note: Language detection warnings are informational only and may include false positives.`);
        }
    } else {
        console.log('\n⚠️  Some translations have missing or empty keys. Please review the detailed issues above.');
    }

    console.log('\n' + '='.repeat(80) + '\n');
}

// Main execution
async function main() {
    console.log('🚀 Starting Docusaurus i18n translation check...\n');

    try {
        // Load all translations
        const translations = loadTranslations();

        // Collect all keys
        const allKeys = collectAllKeys(translations);

        // Check each language
        const languageResults = [];

        for (const [langCode] of Object.entries(LANGUAGES)) {
            const result = checkLanguageCompleteness(langCode, translations, allKeys, translations);
            languageResults.push(result);
        }

        // Generate report
        const report = {
            totalKeys: allKeys.length,
            languages: languageResults
        };

        generateReport(report);

        // Exit with error code ONLY if there are actual missing or empty keys
        // English fallback and language detection warnings are informational only
        const hasRealIssues = languageResults.some(r =>
            r.missing.length > 0 || r.empty.length > 0
        );

        process.exit(hasRealIssues ? 1 : 0);

    } catch (error) {
        console.error('❌ Error during check:', error);
        process.exit(1);
    }
}

main();
