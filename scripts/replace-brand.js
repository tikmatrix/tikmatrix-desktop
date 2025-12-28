const fs = require('fs').promises;
const path = require('path');

const root = process.cwd();

const SRC_DIR = path.join(root, 'src');
const I18N_DIR = path.join(root, 'i18n');

const fileExts = ['.js', '.jsx', '.ts', '.tsx'];

async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
        const res = path.resolve(dir, e.name);
        if (e.isDirectory()) {
            files.push(...await walk(res));
        } else {
            files.push(res);
        }
    }
    return files;
}

function replaceAll(text) {
    // Replace main brand names and common lowercase variants.
    return text
        .replace(/TikMatrix/g, 'IgMatrix')
        .replace(/tikmatrix/g, 'igmatrix')
        .replace(/TikTok/g, 'Instagram')
        .replace(/tiktok/g, 'instagram');
}

async function processSrc() {
    try {
        const files = await walk(SRC_DIR);
        const targets = files.filter(f => fileExts.includes(path.extname(f)));
        for (const f of targets) {
            let content = await fs.readFile(f, 'utf8');
            const updated = replaceAll(content);
            if (updated !== content) {
                await fs.writeFile(f, updated, 'utf8');
                console.log('[updated]', path.relative(root, f));
            }
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn('No src directory found, skipping src processing.');
            return;
        }
        throw err;
    }
}

async function processI18n() {
    try {
        const files = await walk(I18N_DIR);
        const targets = files.filter(f => path.basename(f) === 'code.json');
        for (const f of targets) {
            let content = await fs.readFile(f, 'utf8');
            const updated = replaceAll(content);
            if (updated !== content) {
                await fs.writeFile(f, updated, 'utf8');
                console.log('[updated]', path.relative(root, f));
            }
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn('No i18n directory found, skipping i18n processing.');
            return;
        }
        throw err;
    }
}

async function processDocusaurus() {
    const file = path.join(root, 'docusaurus.config.js');
    try {
        let content = await fs.readFile(file, 'utf8');
        // Only replace specific identifiers in the docusaurus config
        let updated = content.replace(/tikmatrix_logo/g, 'igmatrix_logo');
        // Also replace the download button/label text
        updated = updated.replace(/Download-TikMatrix/g, 'Download-IgMatrix');
        // Also replace https://tikmatrix.com URLs to https://igmatrix.com
        updated = updated.replace(/https:\/\/tikmatrix\.com/g, 'https://igmatrix.com');
        if (updated !== content) {
            await fs.writeFile(file, updated, 'utf8');
            console.log('[updated]', path.relative(root, file));
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn('No docusaurus.config.js found, skipping docusaurus config processing.');
            return;
        }
        throw err;
    }
}

async function main() {
    console.log('Brand replace start: TikMatrix -> IgMatrix, TikTok -> Instagram');
    await processSrc();
    await processI18n();
    await processDocusaurus();
    console.log('Brand replace completed.');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
