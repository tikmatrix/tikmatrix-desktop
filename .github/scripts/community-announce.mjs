#!/usr/bin/env node
// Post a release announcement to the public Telegram community (t.me/tikmatrix_chat).
//
// This is the customer-facing counterpart of the team notification each build
// workflow sends: it says what changed and what users have to do, and leaves out
// everything internal — run links, branches, git tags and script version labels.
// The workflows call it only after every build job succeeded.
//
//   KIND=client  VERSION=3.2.2  APP=All|TikMatrix|TikMatrix Pro|IgMatrix
//                PLATFORMS=all|windows|macos|linux  GRAY_PERCENTAGE=0-100  NOTES=...
//   KIND=script  VERSION=3.0.0.<label>  PLATFORMS=...  NOTES=...
//
//   BOT_TOKEN  bot that is an admin of the group
//   CHAT_ID    defaults to @tikmatrix_chat
//   DRY_RUN=1  print the message instead of sending it
//
// Zero dependencies; needs Node 18+ for fetch.

const SITE = 'https://tikmatrix.com'
const BRANDS = {
  TikMatrix: '/Download-TikMatrix',
  'TikMatrix Pro': '/Download-TikMatrix-Pro',
  IgMatrix: '/Download-IgMatrix',
}
const PLATFORM_NAMES = { windows: 'Windows', macos: 'macOS', linux: 'Linux' }
// Telegram rejects messages above 4096 characters; keep room for the rest.
const MAX_NOTES = 3000

const env = (k, d = '') => (process.env[k] ?? d).trim()

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Notes arrive as one workflow input: a sentence, or one change per line
// ("- fix ..."). The Actions form has no multi-line field, so a literal "\n"
// separates lines too. Render lines as bullets and leave a single sentence alone.
function changes(notes) {
  if (!notes) return []
  const text = notes.length > MAX_NOTES ? `${notes.slice(0, MAX_NOTES).trimEnd()}…` : notes
  const lines = text.split(/\r?\n|\\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length === 1 && !/^[-*•]\s/.test(lines[0])) return ['', '<b>What\'s new</b>', esc(lines[0])]
  return ['', '<b>What\'s new</b>', ...lines.map((l) => `• ${esc(l.replace(/^[-*•]\s+/, ''))}`)]
}

function platformLine(platforms) {
  if (!platforms || platforms === 'all') return []
  return [`Now available for ${PLATFORM_NAMES[platforms] || esc(platforms)}`]
}

function clientMessage() {
  const version = env('VERSION').replace(/^v/, '')
  if (!/^\d+\.\d+\.\d+/.test(version)) throw new Error(`client VERSION must be x.y.z, got "${version}"`)
  const app = env('APP', 'All')
  const brands = app === 'All' ? Object.keys(BRANDS) : [app]
  if (!brands.every((b) => BRANDS[b])) throw new Error(`unknown APP "${app}"`)
  const gray = Number(env('GRAY_PERCENTAGE', '0'))

  const title = brands.length === 1 ? `${brands[0]} v${version} is out` : `New desktop release: v${version}`
  const rollout = gray >= 100
    ? 'Available to everyone now: the app offers the update on its next check, or you can download it from the website.'
    : 'Rolling out gradually over the next few days: the app offers the update when it reaches you. Want it now? Download it from the website.'

  return [
    `🚀 <b>${esc(title)}</b>`,
    ...(brands.length > 1 ? [esc(brands.join(' · '))] : []),
    ...platformLine(env('PLATFORMS')),
    ...changes(env('NOTES')),
    '',
    rollout,
    ...brands.map((b) => `${esc(b)}: ${SITE}${BRANDS[b]}`),
  ].join('\n')
}

function scriptMessage() {
  // The label after x.y.z is an internal build name; only the prefix means
  // anything to users — it is the oldest app version that receives the script.
  const m = env('VERSION').replace(/^v/, '').match(/^(\d+\.\d+\.\d+)\./)
  if (!m) throw new Error(`script VERSION must look like x.y.z.<label>, got "${env('VERSION')}"`)
  const date = new Date().toISOString().slice(0, 10)

  return [
    `🔧 <b>Automation script update</b> · ${date}`,
    `For app version ${m[1]} and later`,
    ...platformLine(env('PLATFORMS')),
    ...changes(env('NOTES')),
    '',
    'Nothing to install: the app downloads the new scripts by itself, at startup or in the background while it is idle.',
  ].join('\n')
}

async function main() {
  const kind = env('KIND')
  const text = kind === 'client' ? clientMessage() : kind === 'script' ? scriptMessage() : null
  if (!text) throw new Error(`KIND must be client or script, got "${kind}"`)

  if (env('DRY_RUN')) { console.log(text); return }

  const token = env('BOT_TOKEN')
  if (!token) throw new Error('BOT_TOKEN is not set')
  const chatId = env('CHAT_ID') || '@tikmatrix_chat'
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    }),
  })
  const body = await res.json().catch(() => ({}))
  // Print Telegram's description only; the request URL holds the token.
  if (!body.ok) throw new Error(`Telegram refused the message (${res.status}): ${body.description || 'no description'}`)
  console.log(`Posted to ${chatId} (message ${body.result?.message_id})`)
  console.log(text)
}

main().catch((err) => {
  const cause = err.cause?.code || err.cause?.message
  console.error(`::error::community announcement: ${err.message}${cause ? ` (${cause})` : ''}`)
  process.exit(1)
})
