import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()

/**
 * Version info update script
 *
 * Usage:
 *   node update-version.js
 *   node update-version.js --app=tikmatrix --app-name=TikMatrix
 *   node update-version.js --app=videomagic --app-name=VideoMagic
 *
 * New optional flags:
 *   --force-update               Mark this as a mandatory update (blocks client UI until installed)
 *   --gray-percentage=<0-100>    Roll out to this % of devices (default: 100 = everyone)
 *   --notes=<text>               Inline release notes (English)
 *   --notes-file=<path>          Read English release notes from a file
 *   --notes-i18n-file=<path>     Read pre-translated notes from a JSON file
 *                                Expected format: { "en": "...", "zh-Hans": "...", ... }
 *
 * V1/V2 updater compatibility:
 *   CI always produces both installer formats. This script reads both and stores them so
 *   the server can serve the right format per client version:
 *     platforms    — Tauri V2 format (.msi   + .msi.sig)   for clients >= 2.18.0
 *     platforms_v1 — Tauri V1 format (.msi.zip + .msi.zip.sig) for clients <= 2.17.5
 */

function parseArgs() {
    const args = process.argv.slice(2)
    const params = {
        app: 'tikmatrix',
        appName: 'TikMatrix',
        forceUpdate: false,
        grayPercentage: 100,
        notes: null,
        notesFile: null,
        notesI18nFile: null,
    }

    for (const arg of args) {
        if (arg.startsWith('--app=')) {
            params.app = arg.split('=').slice(1).join('=')
        } else if (arg.startsWith('--app-name=')) {
            params.appName = arg.split('=').slice(1).join('=')
        } else if (arg === '--force-update') {
            params.forceUpdate = true
        } else if (arg.startsWith('--gray-percentage=')) {
            const pct = parseInt(arg.split('=')[1], 10)
            if (!isNaN(pct) && pct >= 0 && pct <= 100) {
                params.grayPercentage = pct
            } else {
                console.warn(`Invalid --gray-percentage value: ${arg}. Using 100.`)
            }
        } else if (arg.startsWith('--notes=')) {
            params.notes = arg.split('=').slice(1).join('=')
        } else if (arg.startsWith('--notes-file=')) {
            params.notesFile = arg.split('=').slice(1).join('=')
        } else if (arg.startsWith('--notes-i18n-file=')) {
            params.notesI18nFile = arg.split('=').slice(1).join('=')
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
    return fs.readFileSync(filePath, 'utf-8').trim()
}

function readNotes(params) {
    if (params.notesFile) {
        const absPath = path.isAbsolute(params.notesFile)
            ? params.notesFile
            : resolvePath(params.notesFile)
        if (!fs.existsSync(absPath)) throw new Error(`Notes file not found: ${absPath}`)
        return fs.readFileSync(absPath, 'utf-8').trim()
    }
    if (params.notes) {
        return params.notes
    }
    // Default placeholder — in CI you should always pass --notes-file or --notes
    return `v${version} update`
}

function readNotesI18n(params, fallbackNotes) {
    if (params.notesI18nFile) {
        const absPath = path.isAbsolute(params.notesI18nFile)
            ? params.notesI18nFile
            : resolvePath(params.notesI18nFile)
        if (!fs.existsSync(absPath)) throw new Error(`Notes i18n file not found: ${absPath}`)
        const parsed = JSON.parse(fs.readFileSync(absPath, 'utf-8'))
        if (typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('--notes-i18n-file must be a JSON object mapping lang codes to strings')
        }
        // Ensure English fallback is present
        if (!parsed['en']) parsed['en'] = fallbackNotes
        return parsed
    }
    // No i18n file provided — seed only English
    return { en: fallbackNotes }
}

const params = parseArgs()
const configPath = resolvePath('src-tauri', 'tauri.conf.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
const version = config.package?.version || config.version

// CI always produces both formats; both signatures are required.
// V2 format: .msi + .msi.sig  (served to clients >= 2.18.0)
// V1 format: .msi.zip + .msi.zip.sig (served to clients <= 2.17.5)
const v2SigPath = resolvePath('target', 'release', 'bundle', 'msi', `${params.appName}_${version}_x64_en-US.msi.sig`)
const v1SigPath = resolvePath('target', 'release', 'bundle', 'msi', `${params.appName}_${version}_x64_en-US.msi.zip.sig`)
const linuxSigPath = resolvePath('target', 'release', 'bundle', 'appimage', `${params.appName}_${version}_amd64.AppImage.sig`)

const v2Signature = readSignature(v2SigPath)
const v1Signature = readSignature(v1SigPath)
const linuxSignature = fs.existsSync(linuxSigPath) ? readSignature(linuxSigPath) : v2Signature

const notes = readNotes(params)
const notesI18n = readNotesI18n(params, notes)

// Allow overriding the API base URL for local testing, e.g. API_BASE_URL=http://localhost:3000
const apiBase = (process.env.API_BASE_URL || 'https://api.tikmatrix.com').replace(/\/$/, '')
const releaseBase = apiBase

console.log(`App:             ${params.app}`)
console.log(`App Name:        ${params.appName}`)
console.log(`Version:         v${version}`)
console.log(`Force update:    ${params.forceUpdate}`)
console.log(`Gray percentage: ${params.grayPercentage}%`)
console.log(`Notes (en):      ${notes.slice(0, 80)}${notes.length > 80 ? '...' : ''}`)
console.log(`i18n languages:  ${Object.keys(notesI18n).join(', ')}`)
console.log(`API base:        ${apiBase}`)

const macUrl = `${releaseBase}/front-api/release/${params.appName}_${version}_universal.dmg`
const windowsV2Url = `${releaseBase}/front-api/release/${params.appName}_${version}_x64_en-US.msi`
const windowsV1Url = `${releaseBase}/front-api/release/${params.appName}_${version}_x64_en-US.msi.zip`
const linuxUrl = `${releaseBase}/front-api/release/${params.appName}_${version}_amd64.AppImage`

let body = JSON.stringify({
    version: `v${version}`,
    notes,
    notes_i18n: notesI18n,
    pub_date: new Date().toISOString(),
    force_update: params.forceUpdate,
    gray_percentage: params.grayPercentage,
    // V2 clients (>= 2.18.0): Tauri V2 updater downloads .msi directly
    platforms_v2: {
        'windows-x86_64': { signature: v2Signature, url: windowsV2Url },
        'darwin-x86_64':  { signature: v2Signature, url: macUrl },
        'darwin-arm64':   { signature: v2Signature, url: macUrl },
        'darwin-aarch64': { signature: v2Signature, url: macUrl },
        'linux-x86_64':   { signature: linuxSignature, url: linuxUrl },
    },
    // V1 clients (<= 2.17.5): Tauri V1 updater requires .msi.zip wrapper
    platforms_v1: {
        'windows-x86_64': { signature: v1Signature, url: windowsV1Url },
        'darwin-x86_64':  { signature: v1Signature, url: macUrl },
        'darwin-arm64':   { signature: v1Signature, url: macUrl },
        'darwin-aarch64': { signature: v1Signature, url: macUrl },
        'linux-x86_64':   { signature: linuxSignature, url: linuxUrl },
    },
}, null, 2)

let response = await fetch(`${apiBase}/ci/update_version_info`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body).toString(),
        'Authorization': 'Bearer ' + process.env.API_KEY,
        'X-App': params.app
    },
    body
})
console.log(`update_version_info: ${response.status} ${response.statusText}`)
