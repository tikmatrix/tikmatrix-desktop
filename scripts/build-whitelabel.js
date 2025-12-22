import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

const args = process.argv.slice(2).filter(Boolean);
const hasFlag = flag => args.includes(flag);

if (hasFlag('--help') || hasFlag('-h')) {
    printUsage(0);
}

const brandArg = args.find(arg => !arg.startsWith('-')) || process.env.WHITELABEL_BRAND;

if (!brandArg) {
    console.error('❌ 未指定白标品牌目录。');
    printUsage(1);
}

const skipIcon = hasFlag('--skip-icon');
const skipBuild = hasFlag('--skip-build');
const verbose = hasFlag('--verbose');

const brandDir = path.join(rootDir, 'whitelable', brandArg);
const configPath = path.join(brandDir, 'config.json');
const buildScriptPath = isWindows
    ? path.join(rootDir, 'build.ps1')
    : isMac
        ? path.join(rootDir, 'build.sh')
        : null;

if (!fs.existsSync(brandDir)) {
    console.error(`❌ 未找到白标目录: ${brandDir}`);
    process.exit(1);
}

if (!fs.existsSync(configPath)) {
    console.error(`❌ 未找到配置文件: ${configPath}`);
    console.error('👉 请先创建 config.json 并填写必要信息。');
    process.exit(1);
}

const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const targetApp = mustHave(rawConfig.targetApp, 'targetApp');
const appName = mustHave(rawConfig.appName, 'appName');
const officialWebsite = mustHave(rawConfig.officialWebsite, 'officialWebsite');
const enablePay = rawConfig.enablePay !== false; // 默认为 true
const enableSupportEntry = rawConfig.enableSupportEntry !== false; // 默认为 true
if (!enablePay) {
    console.warn('⚠️ 警告: 支付功能被禁用 (enablePay=false)');
}
const emailSupport = rawConfig.emailSupport?.trim() || '';
const telegramSupport = rawConfig.telegramSupport?.trim() || '';
const whatsappSupport = rawConfig.whatsappSupport?.trim() || '';
const iconFile = rawConfig.iconFile?.trim() || 'app-icon.png';
const iconSource = path.join(brandDir, iconFile);

if (!fs.existsSync(iconSource)) {
    console.error(`❌ 未找到白标图标文件: ${iconSource}`);
    process.exit(1);
}

// Generate appId from appName: lowercase and remove spaces
const appId = sanitizeAppId(appName);
if (!appId) {
    throw new Error('无法根据 appName 生成有效的 appId');
}
const updaterEndpoint = `https://api.niostack.com/front-api/check_update?app=${appId}`;

if (verbose) {
    console.log('📋 白标配置:');
    console.log(`   • 品牌: ${brandArg}`);
    console.log(`   • 应用名: ${appName}`);
    console.log(`   • 应用 ID: ${appId}`);
    console.log(`   • 官网: ${officialWebsite}`);
    console.log(`   • 更新地址: ${updaterEndpoint}`);
    console.log(`   • 支持入口: ${enableSupportEntry ? '启用' : '禁用'}`);
}

const backups = new Map();
const iconBackups = new Map();
const generatedIconsBackup = new Map();
const generatedIconsOriginalPaths = new Set();
let iconUpdated = false;
let iconGenerated = false;
let hadError = false;

try {
    console.log(`🚀 开始为 ${brandArg} 构建白标包...`);

    updateTauriConfig();
    updateWhitelabelConfig();
    updateMainRs();
    updateIcons();

    if (!skipIcon) {
        backupGeneratedIcons();
        runCommand('npm run tauri icon');
        iconGenerated = true;
    } else {
        console.log('⚠️ 跳过图标生成 (tauri icon)。');
    }

    if (!skipBuild) {
        runBuild();
        console.log('🎉 构建完成，产物位于 src-tauri/target/release');
    } else {
        console.log('⚠️ 已按要求跳过 tauri build，配置已应用但未打包。');
    }

} catch (error) {
    hadError = true;
    console.error(`❌ 构建失败: ${error.message}`);
    process.exitCode = 1;
} finally {
    restoreTextFiles();
    restoreIcons();
    restoreGeneratedIcons();

    if (iconUpdated && iconGenerated) {
        console.log('♻️ 已恢复默认图标集 (使用备份文件)。');
    }

    if (!hadError) {
        console.log('✅ 已恢复项目原始配置。');
    }
}

function updateTauriConfig() {
    const tauriConfigPath = path.join(rootDir, 'src-tauri', 'tauri.conf.json');
    backupTextFile(tauriConfigPath);

    const json = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));

    json.package = json.package || {};
    json.package.productName = appName;

    if (json.tauri?.windows?.length) {
        json.tauri.windows = json.tauri.windows.map(win => ({
            ...win,
            title: appName,
        }));
    }

    if (json.tauri?.bundle) {
        json.tauri.bundle.identifier = `com.${appId}`;
    }

    if (json.tauri?.updater) {
        json.tauri.updater.endpoints = [updaterEndpoint];
    }



    fs.writeFileSync(tauriConfigPath, JSON.stringify(json, null, 2) + '\n');
}

function updateWhitelabelConfig() {
    const configFile = path.join(rootDir, 'src', 'config', 'whitelabel.js');
    backupTextFile(configFile);
    let content = fs.readFileSync(configFile, 'utf-8');

    content = replaceConfigString(content, 'appName', appName);
    content = replaceConfigString(content, 'officialWebsite', officialWebsite);
    content = replaceConfigBoolean(content, 'enablePay', enablePay);
    content = replaceConfigBoolean(content, 'enableSupportEntry', enableSupportEntry);
    content = replaceConfigString(content, 'targetApp', targetApp);
    content = replaceConfigString(content, 'emailSupport', emailSupport);
    content = replaceConfigString(content, 'telegramSupport', telegramSupport);
    content = replaceConfigString(content, 'whatsappSupport', whatsappSupport);

    fs.writeFileSync(configFile, content, 'utf-8');
}

function updateMainRs() {
    const mainRsPath = path.join(rootDir, 'src-tauri', 'src', 'main.rs');
    backupTextFile(mainRsPath);
    let content = fs.readFileSync(mainRsPath, 'utf-8');

    // 将 MATRIX_APP_NAME 在 `setup_env` 函数的末尾设置，
    // 使用正则定位 `setup_env` 函数的开头并在其闭合前插入变量设置。
    const setupEnvRegex = /(fn setup_env\([^)]*\)\s*\{[\s\S]*?)\n\}/;
    if (!setupEnvRegex.test(content)) {
        throw new Error('无法在 main.rs 中找到 `setup_env` 函数或其结束位置。');
    }

    const MATRIX_APP_NAME = targetApp === 'tiktok' ? 'TikMatrix' : 'IgMatrix';
    content = content.replace(
        setupEnvRegex,
        `$1\n    std::env::set_var("MATRIX_APP_NAME", "${escapeRust(MATRIX_APP_NAME)}");\n}`
    );

    fs.writeFileSync(mainRsPath, content, 'utf-8');
}

function updateIcons() {
    // 检查白标目录中的图标文件
    const brandAppIcon = path.join(brandDir, 'app-icon.png');
    const brandLogo = path.join(brandDir, 'logo.png');
    const brandLogoDark = path.join(brandDir, 'logo_dark.png');

    // 目标文件路径
    const targetAppIcon = path.join(rootDir, 'app-icon.png');
    const targetAssetsAppIcon = path.join(rootDir, 'src', 'assets', 'app-icon.png');
    const targetLogo = path.join(rootDir, 'src', 'assets', 'logo.png');
    const targetLogoDark = path.join(rootDir, 'src', 'assets', 'logo_dark.png');

    // 1. 如果白标目录中没有 app-icon.png，提示必须自定义 icon
    if (!fs.existsSync(brandAppIcon)) {
        console.error(`❌ 白标目录中必须提供 app-icon.png 文件: ${brandAppIcon}`);
        process.exit(1);
    }

    // 备份并复制 app-icon.png 到根目录
    if (fs.existsSync(targetAppIcon)) {
        iconBackups.set(targetAppIcon, fs.readFileSync(targetAppIcon));
    }
    fs.copyFileSync(brandAppIcon, targetAppIcon);

    // 备份并复制 app-icon.png 到 src/assets/app-icon.png
    if (fs.existsSync(targetAssetsAppIcon)) {
        iconBackups.set(targetAssetsAppIcon, fs.readFileSync(targetAssetsAppIcon));
    }
    fs.copyFileSync(brandAppIcon, targetAssetsAppIcon);

    // 2. 处理 logo_dark.png
    if (fs.existsSync(brandLogoDark)) {
        // 白标目录中有 logo_dark.png，直接使用
        if (fs.existsSync(targetLogoDark)) {
            iconBackups.set(targetLogoDark, fs.readFileSync(targetLogoDark));
        }
        fs.copyFileSync(brandLogoDark, targetLogoDark);
    } else if (fs.existsSync(brandLogo)) {
        // 白标目录中没有 logo_dark.png 但有 logo.png，复制 logo.png 到 logo_dark.png
        if (fs.existsSync(targetLogoDark)) {
            iconBackups.set(targetLogoDark, fs.readFileSync(targetLogoDark));
        }
        fs.copyFileSync(brandLogo, targetLogoDark);
    } else {
        // 白标目录中都没有，使用 app-icon.png
        if (fs.existsSync(targetLogoDark)) {
            iconBackups.set(targetLogoDark, fs.readFileSync(targetLogoDark));
        }
        fs.copyFileSync(brandAppIcon, targetLogoDark);
    }

    // 3. 处理 logo.png
    if (fs.existsSync(brandLogo)) {
        // 白标目录中有 logo.png，直接使用
        if (fs.existsSync(targetLogo)) {
            iconBackups.set(targetLogo, fs.readFileSync(targetLogo));
        }
        fs.copyFileSync(brandLogo, targetLogo);
    } else {
        // 白标目录中没有 logo.png，使用 app-icon.png
        if (fs.existsSync(targetLogo)) {
            iconBackups.set(targetLogo, fs.readFileSync(targetLogo));
        }
        fs.copyFileSync(brandAppIcon, targetLogo);
    }

    iconUpdated = true;

    if (verbose) {
        console.log('📦 图标文件已更新:');
        console.log(`   • app-icon.png (根目录)`);
        console.log(`   • app-icon.png (src/assets)`);
        console.log(`   • logo.png (src/assets) - 源: ${fs.existsSync(brandLogo) ? 'logo.png' : 'app-icon.png'}`);
        console.log(`   • logo_dark.png (src/assets) - 源: ${fs.existsSync(brandLogoDark) ? 'logo_dark.png' : fs.existsSync(brandLogo) ? 'logo.png' : 'app-icon.png'}`);
    }
}

function restoreTextFiles() {
    for (const [filePath, content] of backups.entries()) {
        fs.writeFileSync(filePath, content, 'utf-8');
    }
}

function restoreIcons() {
    for (const [filePath, buffer] of iconBackups.entries()) {
        fs.writeFileSync(filePath, buffer);
    }
}

function backupGeneratedIcons() {
    const iconsDir = path.join(rootDir, 'src-tauri', 'icons');
    if (!fs.existsSync(iconsDir)) {
        return;
    }

    const files = fs.readdirSync(iconsDir);
    files.forEach(file => {
        const filePath = path.join(iconsDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            generatedIconsOriginalPaths.add(filePath);
            generatedIconsBackup.set(filePath, fs.readFileSync(filePath));
        }
    });
}

function restoreGeneratedIcons() {
    const iconsDir = path.join(rootDir, 'src-tauri', 'icons');
    if (!fs.existsSync(iconsDir)) {
        return;
    }

    const currentFiles = fs.readdirSync(iconsDir);
    currentFiles.forEach(file => {
        const filePath = path.join(iconsDir, file);
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) {
            return;
        }

        if (!generatedIconsBackup.has(filePath)) {
            fs.rmSync(filePath, { force: true });
        }
    });

    for (const [filePath, buffer] of generatedIconsBackup.entries()) {
        fs.writeFileSync(filePath, buffer);
    }
}

function backupTextFile(filePath) {
    if (!backups.has(filePath)) {
        backups.set(filePath, fs.readFileSync(filePath, 'utf-8'));
    }
}

function replaceConfigString(content, key, value) {
    // 支持多种写法：
    // appName: 'x', "appName": "x", `appName`: `x`, 'appName': x, appName: import.meta.env... || 'x'
    const patterns = [
        // key (unquoted) with quoted value: appName: 'value' / "value" / `value`
        new RegExp(`(\\b${key}\\b\\s*:\\s*)(['"\`])([\\s\\S]*?)\\2`),
        // key quoted with quoted value: 'appName': 'value'
        new RegExp(`(['"\`]${key}['"\`]\\s*:\\s*)(['"\`])([\\s\\S]*?)\\2`),
        // key (unquoted) with unquoted expression/value until comma, newline or closing brace
        new RegExp(`(\\b${key}\\b\\s*:\\s*)([^,\\n\\}]+)`)
    ];

    for (const regex of patterns) {
        const m = content.match(regex);
        if (m) {
            const prefix = m[1];
            return content.replace(regex, `${prefix}'${escapeJs(value)}'`);
        }
    }

    throw new Error(`无法在 whitelabel.js 中找到字段 ${key}`);
}
function replaceConfigBoolean(content, key, value) {
    // 支持 key 被引号包裹或不被引号包裹的情况，匹配 true/false 或表达式后仍替换为布尔字面量
    const patterns = [
        new RegExp(`(\\b${key}\\b\\s*:\\s*)(true|false|[^,\\n\\}]+)`),
        new RegExp(`(['"\`]${key}['"\`]\\s*:\\s*)(true|false|[^,\\n\\}]+)`)
    ];

    for (const regex of patterns) {
        const m = content.match(regex);
        if (m) {
            const prefix = m[1];
            return content.replace(regex, `${prefix}${value ? 'true' : 'false'}`);
        }
    }

    throw new Error(`无法在 whitelabel.js 中找到字段 ${key}`);
}

function runCommand(command, quiet = false) {
    if (!quiet) {
        console.log(`➡️  执行命令: ${command}`);
    }
    execSync(command, {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true,
    });
}

function runBuild() {
    if (isWindows || isMac) {
        if (!buildScriptPath || !fs.existsSync(buildScriptPath)) {
            throw new Error(`未找到构建脚本: ${buildScriptPath}`);
        }

        const command = isWindows
            ? `powershell -ExecutionPolicy Bypass -File "${buildScriptPath}"`
            : `bash "${buildScriptPath}"`;

        runCommand(command);
        return;
    }

    console.warn('⚠️ 当前平台不在支持列表(仅 Windows/macOS)，回退到 `npm run tauri build`。');
    runCommand('npm run tauri build');
}

function mustHave(value, key) {
    // Allow `officialWebsite` to be empty (some whitelabel configs may omit it)
    if (value === undefined || value === null) {
        if (key === 'officialWebsite') return '';
        throw new Error(`配置字段 "${key}" 不能为空`);
    }
    const str = String(value).trim();
    if (!str) {
        if (key === 'officialWebsite') return '';
        throw new Error(`配置字段 "${key}" 不能为空`);
    }
    return str;
}

function sanitizeAppId(value) {
    return value
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9.-]/g, '');
}



function escapeJs(value) {
    return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function escapeRust(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function printUsage(code) {
    console.log('用法:');
    console.log('  node scripts/build-whitelabel.js <品牌目录> [--skip-icon] [--skip-build] [--verbose]');
    console.log('示例:');
    console.log('  node scripts/build-whitelabel.js TikZenx --verbose');
    process.exit(code);
}
