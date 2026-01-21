#!/usr/bin/env node
/*
  remove-i18n-descriptions.cjs

  Usage:
    node remove-i18n-descriptions.cjs        # dry-run, shows which files would change
    node remove-i18n-descriptions.cjs --apply  # actually overwrites files (creates .bak backups)

  This script finds all subdirectories of `website/i18n`, opens `code.json` in each one,
  removes all object properties named `description` at any depth, and writes the file back
  (pretty-printed). If `--apply` is not provided it only shows what would change.
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../website/i18n');
const APPLY = process.argv.includes('--apply') || process.argv.includes('-a');

function removeDescriptions(obj) {
    let changed = false;
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            if (typeof obj[i] === 'object' && obj[i] !== null) {
                if (removeDescriptions(obj[i])) changed = true;
            }
        }
        return changed;
    }

    if (typeof obj !== 'object' || obj === null) return false;

    if (Object.prototype.hasOwnProperty.call(obj, 'description')) {
        delete obj.description;
        changed = true;
    }

    for (const k of Object.keys(obj)) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            if (removeDescriptions(obj[k])) changed = true;
        }
    }

    return changed;
}

function processFile(filePath) {
    let raw;
    try {
        raw = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Failed to read ${filePath}: ${err.message}`);
        return false;
    }

    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        console.error(`Invalid JSON in ${filePath}: ${err.message}`);
        return false;
    }

    const changed = removeDescriptions(json);
    if (!changed) return false;

    if (APPLY) {
        const bak = `${filePath}.bak`;
        try {
            fs.writeFileSync(bak, raw, 'utf8');
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
            console.log(`Updated: ${filePath} (backup -> ${bak})`);
        } catch (err) {
            console.error(`Failed to write ${filePath}: ${err.message}`);
            return false;
        }
    } else {
        console.log(`Would change: ${filePath}`);
    }

    return true;
}

function main() {
    if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) {
        console.error(`i18n root not found: ${ROOT}`);
        process.exit(2);
    }

    const subdirs = fs.readdirSync(ROOT).filter(name => {
        const p = path.join(ROOT, name);
        return fs.existsSync(p) && fs.statSync(p).isDirectory();
    });

    if (subdirs.length === 0) {
        console.log('No language directories found. Nothing to do.');
        return;
    }

    console.log(`Found ${subdirs.length} language directories under ${ROOT}`);
    const changedFiles = [];

    for (const d of subdirs) {
        const file = path.join(ROOT, d, 'code.json');
        if (!fs.existsSync(file)) continue;
        const changed = processFile(file);
        if (changed) changedFiles.push(file);
    }

    if (!APPLY) {
        console.log('\nDry run complete.');
        if (changedFiles.length > 0) {
            console.log(`Run with --apply to actually update ${changedFiles.length} files.`);
        } else {
            console.log('No files would be changed.');
        }
    } else {
        console.log('\nApply complete.');
        if (changedFiles.length === 0) console.log('No files were changed.');
    }
}

if (require.main === module) main();
