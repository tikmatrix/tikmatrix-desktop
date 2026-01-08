import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 统一的下载地址更新脚本
 * 用法:
 *   node update-download-url.js --platform=windows --distributor=OFFICIAL
 *   node update-download-url.js --platform=mac --distributor=TEST001
 *   node update-download-url.js --platform=windows --all-distributors
 *   node update-download-url.js --platform=mac --all-distributors
 *   node update-download-url.js --platform=windows --distributor=OFFICIAL --app-name=CustomApp
 */

const configPath = path.join(__dirname, '..', 'src-tauri', 'tauri.conf.json')
const distributorsPath = path.join(__dirname, '..', 'distributors.json')

// 解析命令行参数
function parseArgs() {
    const args = process.argv.slice(2)
    const params = {
        platform: null,
        distributor: null,
        allDistributors: false,
        app: 'tikmatrix',
        appName: 'TikMatrix'
    }

    for (const arg of args) {
        if (arg.startsWith('--platform=')) {
            params.platform = arg.split('=')[1]
        } else if (arg.startsWith('--distributor=')) {
            params.distributor = arg.split('=')[1]
        } else if (arg === '--all-distributors') {
            params.allDistributors = true
        } else if (arg.startsWith('--app=')) {
            params.app = arg.split('=')[1]
        } else if (arg.startsWith('--app-name=')) {
            params.appName = arg.split('=')[1]
        }
    }

    return params
}

// 获取版本号
function getVersion() {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    return config.package.version
}

// 获取所有启用的分发商
function getDistributors() {
    if (!fs.existsSync(distributorsPath)) {
        throw new Error(`Distributors file not found: ${distributorsPath}`)
    }
    const distributorsData = JSON.parse(fs.readFileSync(distributorsPath, 'utf-8'))
    return distributorsData.distributors.filter(d => d.enabled)
}

// 构建下载URL
function buildDownloadUrl(platform, version, distributorCode, appName) {
    let fileName
    let basePath

    if (platform === 'windows') {
        fileName = distributorCode === 'OFFICIAL'
            ? `${appName}_${version}_x64_en-US.msi`
            : `${appName}_${version}_x64_en-US_${distributorCode}.msi`
    } else if (platform === 'mac') {
        fileName = distributorCode === 'OFFICIAL'
            ? `${appName}_${version}_universal.dmg`
            : `${appName}_${version}_universal_${distributorCode}.dmg`
    } else {
        throw new Error(`Unknown platform: ${platform}`)
    }

    basePath = distributorCode === 'OFFICIAL'
        ? 'https://r2.niostack.com'
        : 'https://r2.niostack.com/distributors'

    return `${basePath}/${fileName}`
}

// 更新单个下载URL
async function updateDownloadUrl(platform, app, distributorCode, downloadUrl) {
    console.log(`Updating ${distributorCode} (${platform}): ${downloadUrl}`)

    try {
        const response = await fetch('https://api.niostack.com/ci/update_download_url', {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': downloadUrl.length.toString(),
                'Authorization': 'Bearer ' + process.env.API_KEY,
                'X-Platform': platform,
                'X-App': app,
                'X-Distributor': distributorCode
            },
            body: downloadUrl
        })
        //new tikmatrix api call
        const response_rust = await fetch('https://api.tikmatrix.com/ci/update_download_url', {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': downloadUrl.length.toString(),
                'Authorization': 'Bearer ' + process.env.API_KEY,
                'X-Platform': platform,
                'X-App': app,
                'X-Distributor': distributorCode
            },
            body: downloadUrl
        })
        console.log(`tikmatrix response: ${response_rust.status} ${response_rust.statusText}`)

        if (response.ok) {
            console.log(`✅ ${distributorCode}: ${response.status} ${response.statusText}`)
            return true
        } else {
            console.error(`❌ ${distributorCode}: ${response.status} ${response.statusText}`)
            return false
        }
    } catch (error) {
        console.error(`❌ ${distributorCode}: ${error.message}`)
        return false
    }
}

// 主函数
async function main() {
    const params = parseArgs()

    // 验证参数
    if (!params.platform) {
        console.error('Error: --platform is required (windows or mac)')
        console.log('\nUsage:')
        console.log('  node update-download-url.js --platform=windows --distributor=OFFICIAL')
        console.log('  node update-download-url.js --platform=mac --distributor=TEST001')
        console.log('  node update-download-url.js --platform=windows --all-distributors')
        console.log('  node update-download-url.js --platform=mac --all-distributors')
        console.log('  node update-download-url.js --platform=windows --distributor=OFFICIAL --app-name=CustomApp')
        process.exit(1)
    }

    if (!['windows', 'mac'].includes(params.platform)) {
        console.error('Error: --platform must be "windows" or "mac"')
        process.exit(1)
    }

    if (!params.allDistributors && !params.distributor) {
        console.error('Error: Either --distributor or --all-distributors is required')
        process.exit(1)
    }

    const version = getVersion()
    console.log(`Version: ${version}`)
    console.log(`Platform: ${params.platform}`)
    console.log(`App: ${params.app}`)
    console.log(`App Name: ${params.appName}\n`)

    if (params.allDistributors) {
        // 更新所有分发商
        const distributors = getDistributors()
        console.log(`Updating download URLs for ${distributors.length} distributors...\n`)

        let successCount = 0
        for (const distributor of distributors) {
            const downloadUrl = buildDownloadUrl(params.platform, version, distributor.code, params.appName)
            const success = await updateDownloadUrl(params.platform, params.app, distributor.code, downloadUrl)
            if (success) successCount++
        }

        console.log(`\n✅ Updated ${successCount}/${distributors.length} distributor download URLs!`)
    } else {
        // 更新单个分发商
        const downloadUrl = buildDownloadUrl(params.platform, version, params.distributor, params.appName)
        const success = await updateDownloadUrl(params.platform, params.app, params.distributor, downloadUrl)

        if (success) {
            console.log('\n✅ Download URL updated successfully!')
        } else {
            console.log('\n❌ Failed to update download URL')
            process.exit(1)
        }
    }
}

main()
