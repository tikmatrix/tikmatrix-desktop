import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        console.log(`Found ${targets.length} source files to process`);
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
        console.error('Error processing src directory:', err.message);
        console.warn('Skipping src processing due to error.');
        return;
    }
}

async function processI18n() {
    try {
        const files = await walk(I18N_DIR);
        const targets = files.filter(f => path.basename(f) === 'code.json');
        console.log(`Found ${targets.length} i18n files to process`);
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
        console.error('Error processing i18n directory:', err.message);
        console.warn('Skipping i18n processing due to error.');
        return;
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
        } else {
            console.log('No changes needed in docusaurus.config.js');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn('No docusaurus.config.js found, skipping docusaurus config processing.');
            return;
        }
        console.error('Error processing docusaurus.config.js:', err.message);
        console.warn('Skipping docusaurus config processing due to error.');
        return;
    }
}

async function main() {
    console.log('Brand replace start: TikMatrix -> IgMatrix, TikTok -> Instagram');
    console.log('Working directory:', root);
    await processSrc();
    await processI18n();
    await processDocusaurus();
    console.log('Brand replace completed.');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
