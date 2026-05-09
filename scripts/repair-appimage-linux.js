import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawnSync } from 'node:child_process'

const projectRoot = path.resolve(process.argv[2] || '.')
const targetRoot = path.join(projectRoot, 'target')

const bundledGraphicsLibraries = [
  /^libEGL\.so(?:\..+)?$/,
  /^libgbm\.so(?:\..+)?$/,
  /^libwayland-client\.so(?:\..+)?$/,
  /^libwayland-egl\.so(?:\..+)?$/,
  /^libepoxy\.so(?:\..+)?$/
]

function fail(message) {
  throw new Error(message)
}

function exists(filePath) {
  return fs.existsSync(filePath)
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options
  })

  if (result.status !== 0) {
    fail(`Command failed: ${command} ${args.join(' ')}`)
  }
}

function makeExecutable(filePath) {
  fs.chmodSync(filePath, 0o755)
}

function walk(currentPath, onEntry) {
  if (!exists(currentPath)) {
    return
  }

  for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
    const entryPath = path.join(currentPath, entry.name)
    onEntry(entryPath, entry)
    if (entry.isDirectory()) {
      walk(entryPath, onEntry)
    }
  }
}

function findAppDirs(rootPath) {
  const appDirs = []
  walk(rootPath, (entryPath, entry) => {
    if (entry.isDirectory() && entry.name.endsWith('.AppDir')) {
      appDirs.push(entryPath)
    }
  })
  return appDirs.sort()
}

function findFirstFile(rootPath, matcher) {
  let found = null
  walk(rootPath, (entryPath, entry) => {
    if (!found && entry.isFile() && matcher(entryPath, entry.name)) {
      found = entryPath
    }
  })
  return found
}

function resolveAppImageTool() {
  const envTool = process.env.TAURI_APPIMAGE_TOOL_PATH
  if (envTool && exists(envTool)) {
    makeExecutable(envTool)
    return envTool
  }

  const bundledTool = findFirstFile(targetRoot, (entryPath, name) => {
    return name.startsWith('appimagetool-') && name.endsWith('.AppImage')
  })

  if (bundledTool) {
    makeExecutable(bundledTool)
    return bundledTool
  }

  const whichCommand = process.platform === 'win32' ? 'where' : 'which'
  const lookup = spawnSync(whichCommand, ['appimagetool'], { encoding: 'utf8' })
  if (lookup.status === 0) {
    const located = lookup.stdout.split(/\r?\n/).map(line => line.trim()).find(Boolean)
    if (located) {
      return located
    }
  }

  fail(`Unable to locate appimagetool under ${targetRoot}`)
}

function resolveAppImageArch(appImageToolPath) {
  if (appImageToolPath.includes('aarch64')) {
    return 'aarch64'
  }

  if (appImageToolPath.includes('x86_64') || appImageToolPath.includes('amd64')) {
    return 'x86_64'
  }

  return os.arch() === 'arm64' ? 'aarch64' : 'x86_64'
}

function removeBundledGraphicsLibraries(appDir) {
  let removedCount = 0
  const userDir = path.join(appDir, 'usr')

  walk(userDir, (entryPath, entry) => {
    if (!entry.isFile() && !entry.isSymbolicLink()) {
      return
    }

    if (!bundledGraphicsLibraries.some(pattern => pattern.test(entry.name))) {
      return
    }

    fs.rmSync(entryPath, { force: true })
    removedCount += 1
  })

  return removedCount
}

function patchGtkHook(appDir) {
  const hookPath = path.join(appDir, 'apprun-hooks', 'linuxdeploy-plugin-gtk.sh')
  if (!exists(hookPath)) {
    return false
  }

  const original = fs.readFileSync(hookPath, 'utf8')
  const targetLine = 'export GDK_BACKEND=x11 # Crash with Wayland backend on Wayland - We tested it without it and ended up with this: https://github.com/tauri-apps/tauri/issues/8541'

  if (!original.includes(targetLine)) {
    return false
  }

  const replacement = [
    'if [ -z "${GDK_BACKEND:-}" ] && [ -n "${DISPLAY:-}" ]; then',
    '    export GDK_BACKEND=x11 # Match the upstream fallback without breaking pure Wayland sessions.',
    'fi'
  ].join('\n')

  fs.writeFileSync(hookPath, original.replace(targetLine, replacement), 'utf8')
  makeExecutable(hookPath)
  return true
}

function writeAppRunWrapper(appDir) {
  const originalAppRun = path.join(appDir, 'AppRun.tauri')
  const appRunPath = path.join(appDir, 'AppRun')

  if (!exists(appRunPath) && !exists(originalAppRun)) {
    fail(`Expected AppRun in ${appDir}`)
  }

  if (!exists(originalAppRun) && exists(appRunPath)) {
    fs.renameSync(appRunPath, originalAppRun)
  }

  fs.mkdirSync(path.join(appDir, 'usr', 'lib', 'gio', 'modules-empty'), { recursive: true })

  const wrapper = `#!/usr/bin/env bash
set -euo pipefail

APPDIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "\${APPDIR}/usr/lib/gio/modules-empty"

find_wayland_client_preload() {
  local candidate

  for candidate in \\
    /usr/lib/x86_64-linux-gnu/libwayland-client.so.0 \\
    /lib/x86_64-linux-gnu/libwayland-client.so.0 \\
    /usr/lib/aarch64-linux-gnu/libwayland-client.so.0 \\
    /lib/aarch64-linux-gnu/libwayland-client.so.0 \\
    /usr/lib/libwayland-client.so.0 \\
    /lib/libwayland-client.so.0 \\
    /usr/lib64/libwayland-client.so.0 \\
    /lib64/libwayland-client.so.0; do
    if [[ -r "\${candidate}" ]]; then
      echo "\${candidate}"
      return 0
    fi
  done

  if command -v ldconfig >/dev/null 2>&1; then
    candidate="$(ldconfig -p 2>/dev/null | awk '/libwayland-client\\.so\\.0/ { print $NF; exit }')"
    if [[ -n "\${candidate}" && -r "\${candidate}" ]]; then
      echo "\${candidate}"
      return 0
    fi
  fi

  return 1
}

export GIO_USE_VFS="\${GIO_USE_VFS:-local}"
export GIO_MODULE_DIR="\${GIO_MODULE_DIR:-\${APPDIR}/usr/lib/gio/modules-empty}"
export WEBKIT_DISABLE_DMABUF_RENDERER="\${WEBKIT_DISABLE_DMABUF_RENDERER:-1}"
export WEBKIT_DISABLE_COMPOSITING_MODE="\${WEBKIT_DISABLE_COMPOSITING_MODE:-1}"

if wayland_client_preload="$(find_wayland_client_preload)"; then
  case " \${LD_PRELOAD:-} " in
    *" \${wayland_client_preload} "*) ;;
    *) export LD_PRELOAD="\${wayland_client_preload}\${LD_PRELOAD:+ \${LD_PRELOAD}}" ;;
  esac
fi

exec "\${APPDIR}/AppRun.tauri" "$@"
`

  fs.writeFileSync(appRunPath, wrapper, 'utf8')
  makeExecutable(appRunPath)
  makeExecutable(originalAppRun)
}

function rebuildAppImage(appDir, appImageToolPath, appImageArch) {
  const appImagePath = `${appDir.slice(0, -'.AppDir'.length)}.AppImage`
  for (const filePath of [appImagePath, `${appImagePath}.sig`, `${appImagePath}.zsync`]) {
    fs.rmSync(filePath, { force: true })
  }

  const env = { ...process.env }
  if (appImageToolPath.endsWith('.AppImage')) {
    env.APPIMAGE_EXTRACT_AND_RUN = '1'
    env.ARCH = appImageArch
  }

  run(appImageToolPath, [appDir, appImagePath], { env })
  return appImagePath
}

function signAppImage(appImagePath) {
  if (!process.env.TAURI_SIGNING_PRIVATE_KEY && !process.env.TAURI_SIGNING_PRIVATE_KEY_PATH) {
    return false
  }

  const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  run(npxCommand, ['tauri', 'signer', 'sign', appImagePath], { cwd: projectRoot, env: process.env })
  return true
}

if (!exists(targetRoot)) {
  fail(`Expected target directory under ${projectRoot}`)
}

const appDirs = findAppDirs(targetRoot)
if (appDirs.length === 0) {
  fail(`No AppDir outputs found under ${targetRoot}`)
}

const appImageToolPath = resolveAppImageTool()
const appImageArch = resolveAppImageArch(appImageToolPath)

for (const appDir of appDirs) {
  const removedCount = removeBundledGraphicsLibraries(appDir)
  const hookPatched = patchGtkHook(appDir)
  writeAppRunWrapper(appDir)
  const appImagePath = rebuildAppImage(appDir, appImageToolPath, appImageArch)
  const signed = signAppImage(appImagePath)

  console.log(
    `Repaired ${path.basename(appDir)}: removed ${removedCount} bundled graphics libraries${hookPatched ? ', patched GTK hook' : ''}${signed ? ', re-signed AppImage' : ''}`
  )
}
