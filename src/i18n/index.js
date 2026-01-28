import { createI18n } from 'vue-i18n'
// Import default locale synchronously to avoid white screen in Tauri
import en from './locales/en.js'

// Default locale - loaded synchronously
const DEFAULT_LOCALE = 'en'

// Supported locales list
export const SUPPORT_LOCALES = [
  'en',
  'zh-CN',
  'ru',
  'ar',
  'de',
  'es',
  'fr',
  'he',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt',
  'sv',
  'th',
  'tr',
  'uk',
  'vi'
]

// Create i18n instance with default locale loaded synchronously
// This ensures zero white screen in Tauri WebView environment
export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  globalInjection: true, // Enable global $t, $d, $n
  messages: {
    en // Default locale bundled synchronously
  }
})

// Cache for loaded locales and in-flight loading promises
const loadedLanguages = new Set(['en']) // Default locale is pre-loaded
const loadingPromises = new Map()

/**
 * Load locale messages dynamically
 * @param {string} locale - Locale code to load
 * @returns {Promise<Object>} Loaded messages
 */
async function loadLocaleMessages(locale) {
  // If the language was already loaded
  if (loadedLanguages.has(locale)) {
    return Promise.resolve()
  }

  // Skip dynamic import for default locale (already bundled)
  if (locale === DEFAULT_LOCALE) {
    return Promise.resolve()
  }

  // If the language is currently being loaded, return the existing promise
  if (loadingPromises.has(locale)) {
    return loadingPromises.get(locale)
  }

  // Load locale messages with dynamic import
  const loadPromise = import(`./locales/${locale}.js`)
    .then(messages => {
      // Set locale and locale message
      i18n.global.setLocaleMessage(locale, messages.default)
      loadedLanguages.add(locale)
      loadingPromises.delete(locale)
      return messages.default
    })
    .catch(error => {
      console.error(`Failed to load locale messages for ${locale}:`, error)
      loadingPromises.delete(locale)
      throw error
    })

  loadingPromises.set(locale, loadPromise)
  return loadPromise
}

/**
 * Set i18n language
 * @param {string} locale - Locale code
 */
function setI18nLanguage(locale) {
  i18n.global.locale.value = locale
  
  // Set html lang attribute
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale)
  }
  
  return locale
}

/**
 * Change application language
 * Non-blocking: Returns immediately after setting locale if already loaded,
 * or loads asynchronously without blocking the caller
 * @param {string} locale - Locale code to switch to
 * @returns {Promise<string>} The locale that was set
 */
export async function changeLanguage(locale) {
  // Check if locale is supported
  if (!SUPPORT_LOCALES.includes(locale)) {
    console.warn(`Locale ${locale} is not supported, falling back to ${DEFAULT_LOCALE}`)
    locale = DEFAULT_LOCALE
  }

  // If already loaded, switch immediately
  if (loadedLanguages.has(locale)) {
    return setI18nLanguage(locale)
  }

  try {
    // Load locale messages asynchronously
    await loadLocaleMessages(locale)
    return setI18nLanguage(locale)
  } catch (error) {
    // If loading fails, try to fallback to default locale
    console.error(`Failed to change language to ${locale}, falling back to ${DEFAULT_LOCALE}`)
    return setI18nLanguage(DEFAULT_LOCALE)
  }
}

/**
 * Load locale asynchronously after app is mounted
 * This is the recommended way to load non-default locales
 * @param {string} locale - Locale code to load
 * @returns {Promise<void>}
 */
export function loadLocaleAsync(locale) {
  // Non-blocking language change
  changeLanguage(locale).catch(err => {
    console.error('Failed to load locale:', err)
  })
} 