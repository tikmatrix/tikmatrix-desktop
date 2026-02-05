import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()

/**
 * 版本信息更新脚本
 * 用法:
 *   node update-version.js
 *   node update-version.js --app=tikmatrix --app-name=TikMatrix
 *   node update-version.js --app=videomagic --app-name=VideoMagic
 */

// 解析命令行参数
function parseArgs() {
    const args = process.argv.slice(2)
    const params = {
        app: 'tikmatrix',
        appName: 'TikMatrix'
    }

    for (const arg of args) {
        if (arg.startsWith('--app=')) {
            params.app = arg.split('=')[1]
        } else if (arg.startsWith('--app-name=')) {
            params.appName = arg.split('=')[1]
        }
    }

    return params
}

function resolvePath(...segments) {
    return path.join(rootDir, ...segments)
}

function readSignature(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Signature file not found: ${filePath}`)
    }
    return fs.readFileSync(filePath, 'utf-8')
}

function findSignatureFile(bundleDir, version) {
    // Look for signature files matching the pattern *_{version}_x64_en-US.msi.zip.sig
    // This handles productNames with spaces (e.g., "TikMatrix Pro")
    if (!fs.existsSync(bundleDir)) {
        throw new Error(`Bundle directory not found: ${bundleDir}`)
    }
    
    const files = fs.readdirSync(bundleDir)
    const pattern = `_${version}_x64_en-US.msi.zip.sig`
    const sigFiles = files.filter(f => f.endsWith(pattern))
    
    if (sigFiles.length === 0) {
        throw new Error(`No signature file found in ${bundleDir} matching pattern: *${pattern}`)
    }
    
    if (sigFiles.length > 1) {
        console.warn(`Warning: Multiple signature files found, using first one: ${sigFiles[0]}`)
    }
    
    return path.join(bundleDir, sigFiles[0])
}

function findMacSignatureFile(bundleDir, version) {
    // Look for macOS signature files matching the pattern *_{version}_universal.dmg.tar.gz.sig
    // This handles productNames with spaces (e.g., "TikMatrix Pro")
    if (!fs.existsSync(bundleDir)) {
        // If the macOS bundle directory doesn't exist, return null (not an error for Windows-only builds)
        return null
    }
    
    const files = fs.readdirSync(bundleDir)
    const pattern = `_${version}_universal.dmg.tar.gz.sig`
    const sigFiles = files.filter(f => f.endsWith(pattern))
    
    if (sigFiles.length === 0) {
        return null
    }
    
    if (sigFiles.length > 1) {
        console.warn(`Warning: Multiple macOS signature files found, using first one: ${sigFiles[0]}`)
    }
    
    return path.join(bundleDir, sigFiles[0])
}

function validateProductName(productName, platform) {
    // Validate that product name only contains safe characters
    // Allow alphanumeric, spaces, hyphens, and underscores
    // Note: Dots are excluded to prevent path traversal attacks
    const validPattern = /^[a-zA-Z0-9\s_-]+$/
    if (!validPattern.test(productName)) {
        throw new Error(`Invalid product name for ${platform}: ${productName}. Contains unsafe characters.`)
    }
    
    // Additional check: prevent path traversal patterns
    if (productName.includes('..') || productName.includes('./') || productName.includes('.\\')) {
        throw new Error(`Invalid product name for ${platform}: ${productName}. Contains path traversal patterns.`)
    }
    
    return productName
}

const params = parseArgs()
const configPath = resolvePath('src-tauri', 'tauri.conf.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
const version = config.package.version
const bundleDir = resolvePath('src-tauri', 'target', 'release', 'bundle', 'msi')
const signaturePath = findSignatureFile(bundleDir, version)
const signature = readSignature(signaturePath)

// Extract the actual product name from the signature file name
// e.g., "TikMatrix Pro_2.12.5_x64_en-US.msi.zip.sig" -> "TikMatrix Pro"
// Use a more robust extraction that splits on the version pattern
const signatureFileName = path.basename(signaturePath)
const suffix = `_${version}_x64_en-US.msi.zip.sig`
if (!signatureFileName.endsWith(suffix)) {
    throw new Error(`Unexpected signature file format: ${signatureFileName}`)
}
const productName = validateProductName(
    signatureFileName.slice(0, -suffix.length),
    'Windows'
)

// Try to find macOS signature file and extract product name
const macBundleDir = resolvePath('src-tauri', 'target', 'universal-apple-darwin', 'release', 'bundle', 'dmg')
const macSignaturePath = findMacSignatureFile(macBundleDir, version)
let macProductName = null
let macSignature = null

if (macSignaturePath) {
    try {
        macSignature = readSignature(macSignaturePath)
        const macSignatureFileName = path.basename(macSignaturePath)
        const macSuffix = `_${version}_universal.dmg.tar.gz.sig`
        if (!macSignatureFileName.endsWith(macSuffix)) {
            console.warn(`Warning: Unexpected macOS signature file format: ${macSignatureFileName}`)
        } else {
            macProductName = validateProductName(
                macSignatureFileName.slice(0, -macSuffix.length),
                'macOS'
            )
        }
    } catch (error) {
        console.warn(`Warning: Could not read macOS signature file: ${error.message}`)
    }
}

console.log(`App: ${params.app}`)
console.log(`App Name: ${params.appName}`)
console.log(`Product Name (from bundle): ${productName}`)
if (macProductName) {
    console.log(`Mac Product Name (from bundle): ${macProductName}`)
}
console.log(`Version: v${version}`)

// Build platforms configuration
const platforms = {
    "windows-x86_64": {
        "signature": signature,
        "url": `https://r2.niostack.com/${productName}_${version}_x64_en-US.msi.zip`
    }
}

// Only include macOS platforms if we have a valid macOS signature
if (macSignature && macProductName) {
    const macUrl = `https://r2.niostack.com/${macProductName}_${version}_universal.dmg`
    
    // Add all macOS platform variants with the same configuration
    platforms["darwin-x86_64"] = { "signature": macSignature, "url": macUrl }
    platforms["darwin-arm64"] = { "signature": macSignature, "url": macUrl }
    platforms["darwin-aarch64"] = { "signature": macSignature, "url": macUrl }
}

let body = JSON.stringify({
    "version": `v${version}`,
    "notes": `v${version} is released! Please update to the new version.`,
    "pub_date": new Date().toISOString(),
    "platforms": platforms
}, null, 2)

let response = await fetch('https://api.niostack.com/ci/update_version_info', {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body).toString(),
        'Authorization': 'Bearer ' + process.env.API_KEY,
        'X-App': params.app
    },
    body: body
})
console.log(`update_version_info: ${response.status} ${response.statusText}`)
// For Rust version info update
let response_rust = await fetch('https://api.tikmatrix.com/ci/update_version_info', {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body).toString(),
        'Authorization': 'Bearer ' + process.env.API_KEY,
        'X-App': params.app
    },
    body: body
})
console.log(`update_version_info: ${response_rust.status} ${response_rust.statusText}`)
