import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const desktopDir = path.resolve(__dirname, '..');
const androidDir = path.resolve(desktopDir, '..', 'tikmatrix-android');

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

const verbose = hasFlag('--verbose');

const brandDir = path.join(desktopDir, 'whitelable', brandArg);
const configPath = path.join(brandDir, 'config.json');

if (!fs.existsSync(brandDir)) {
    console.error(`❌ 未找到白标目录: ${brandDir}`);
    process.exit(1);
}

if (!fs.existsSync(configPath)) {
    console.error(`❌ 未找到配置文件: ${configPath}`);
    console.error('👉 请先创建 config.json 并填写必要信息。');
    process.exit(1);
}

if (!fs.existsSync(androidDir)) {
    console.error(`❌ 未找到 tikmatrix-android 目录: ${androidDir}`);
    console.error('👉 请确保 tikmatrix-android 与 tikmatrix-desktop 在同一父目录下。');
    process.exit(1);
}

const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const appName = mustHave(rawConfig.appName, 'appName');
const targetApp = mustHave(rawConfig.targetApp, 'targetApp');

// Generate appId from appName: lowercase and remove spaces
const appId = sanitizeAppId(appName);
if (!appId) {
    throw new Error('无法根据 appName 生成有效的 appId');
}

// Generate package name from appId (use GitHub namespace)
const packageName = `com.github.${appId}`;

if (verbose) {
    console.log('📋 白标配置:');
    console.log(`   • 品牌: ${brandArg}`);
    console.log(`   • 应用名: ${appName}`);
    console.log(`   • 应用 ID: ${appId}`);
    console.log(`   • 包名: ${packageName}`);
    console.log(`   • 目标应用: ${targetApp}`);
}

const backups = new Map();
let hadError = false;

try {
    console.log(`🚀 开始为 ${brandArg} 构建白标 APK...`);

    // Update Android build.gradle
    updateAppBuildGradle();

    // Update AndroidManifest.xml
    updateAndroidManifest();

    // Update app name in strings.xml
    updateStringsXml();

    // Build APK
    buildApk();

    // Rename APK files
    renameApkFiles();

} catch (error) {
    hadError = true;
    console.error(`❌ 构建失败: ${error.message}`);
    process.exitCode = 1;
} finally {
    restoreFiles();

    if (!hadError) {
        console.log(`✅ ${brandArg} 白标 APK 构建完成！`);
        console.log(`📦 APK 文件:`);
        console.log(`   • ${packageName}.apk`);
        console.log(`   • ${packageName}.test.apk`);
    }
}

function updateAppBuildGradle() {
    const buildGradlePath = path.join(androidDir, 'app', 'build.gradle');
    backupFile(buildGradlePath);

    let content = fs.readFileSync(buildGradlePath, 'utf-8');

    // Update applicationId
    content = content.replace(
        /applicationId\s+"[^"]+"/,
        `applicationId "${packageName}"`
    );

    // Do NOT change `namespace` here. Keep original namespace to match Java package

    fs.writeFileSync(buildGradlePath, content);
    console.log('✓ 更新 app/build.gradle');
}

function updateAndroidManifest() {
    const manifestPath = path.join(androidDir, 'app', 'src', 'main', 'AndroidManifest.xml');
    backupFile(manifestPath);

    let content = fs.readFileSync(manifestPath, 'utf-8');

    // Do NOT change the manifest `package` attribute. Android Gradle plugin manages namespace/applicationId.

    fs.writeFileSync(manifestPath, content);
    console.log('✓ 更新 AndroidManifest.xml');
}

function updateStringsXml() {
    const stringsPath = path.join(androidDir, 'app', 'src', 'main', 'res', 'values', 'strings.xml');
    backupFile(stringsPath);

    let content = fs.readFileSync(stringsPath, 'utf-8');

    // Update app_name
    content = content.replace(
        /<string name="app_name">[^<]+<\/string>/,
        `<string name="app_name">${escapeXml(appName)}</string>`
    );

    fs.writeFileSync(stringsPath, content);
    console.log('✓ 更新 strings.xml');
}

function buildApk() {
    console.log('🔨 开始构建 APK...');

    try {
        // Determine gradlew command for current platform
        const isWin = process.platform === 'win32';
        const gradlewCmd = isWin ? 'gradlew.bat' : './gradlew';

        // Make gradlew executable on unix-like systems only
        if (!isWin) {
            const gradlewPath = path.join(androidDir, 'gradlew');
            if (fs.existsSync(gradlewPath)) {
                try {
                    execSync(`chmod +x ${gradlewPath}`, { cwd: androidDir });
                } catch (e) {
                    // Non-fatal
                }
            }
        }

        // Clean build
        runCommand(`${gradlewCmd} clean`, androidDir);

        // Build APKs
        runCommand(`${gradlewCmd} build`, androidDir);
        runCommand(`${gradlewCmd} packageDebugAndroidTest`, androidDir);

        console.log('✓ APK 构建完成');
    } catch (error) {
        throw new Error(`APK 构建失败: ${error.message}`);
    }
}

function renameApkFiles() {
    const apkDir = path.join(androidDir, 'app', 'build', 'apk');
    const debugApkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
    const testApkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'androidTest', 'debug', 'app-debug-androidTest.apk');

    // Create apk directory if not exists
    if (!fs.existsSync(apkDir)) {
        fs.mkdirSync(apkDir, { recursive: true });
    }

    // Rename and move APK files
    if (fs.existsSync(debugApkPath)) {
        const targetApkPath = path.join(apkDir, `${packageName}.apk`);
        fs.copyFileSync(debugApkPath, targetApkPath);
        console.log(`✓ 生成 ${packageName}.apk`);
    } else {
        console.warn(`⚠️ 未找到 debug APK: ${debugApkPath}`);
    }

    if (fs.existsSync(testApkPath)) {
        const targetTestApkPath = path.join(apkDir, `${packageName}.test.apk`);
        fs.copyFileSync(testApkPath, targetTestApkPath);
        console.log(`✓ 生成 ${packageName}.test.apk`);
    } else {
        console.warn(`⚠️ 未找到 test APK: ${testApkPath}`);
    }
}

function restoreFiles() {
    for (const [filePath, backupContent] of backups) {
        try {
            fs.writeFileSync(filePath, backupContent);
        } catch (error) {
            console.error(`⚠️ 恢复文件失败 ${filePath}:`, error.message);
        }
    }
    backups.clear();
}

function backupFile(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`文件不存在: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    backups.set(filePath, content);
}

function runCommand(command, cwd = null, quiet = false) {
    if (!quiet && verbose) {
        console.log(`$ ${command}`);
    }
    const isWin = process.platform === 'win32';
    const shell = isWin ? 'cmd.exe' : 'sh';
    const args = isWin ? ['/c', command] : ['-c', command];
    const res = spawnSync(shell, args, { cwd: cwd || androidDir, stdio: quiet ? 'ignore' : 'inherit', windowsHide: true });
    if (res.error) throw res.error;
    if (res.status !== 0) throw new Error(`命令执行失败（退出码 ${res.status}）: ${command}`);
}

function mustHave(value, key) {
    if (value === undefined || value === null) {
        throw new Error(`配置字段 "${key}" 不能为空`);
    }
    const str = String(value).trim();
    if (!str) {
        throw new Error(`配置字段 "${key}" 不能为空`);
    }
    return str;
}

function sanitizeAppId(value) {
    return value
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
}

function escapeXml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function printUsage(code) {
    console.log('用法:');
    console.log('  node scripts/build-whitelabel-apk.js <品牌目录> [--verbose]');
    console.log('示例:');
    console.log('  node scripts/build-whitelabel-apk.js IgMatrix --verbose');
    console.log('');
    console.log('注意:');
    console.log('  • 需要 tikmatrix-android 仓库在同一父目录下');
    console.log('  • 会根据 appName 自动生成 appId 和包名 (com.github.{appId})');
    console.log('  • APK 文件会以包名命名');
    process.exit(code);
}
