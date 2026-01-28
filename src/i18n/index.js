import { createI18n } from 'vue-i18n'

// Default locale - loaded immediately
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

// Create i18n instance with only default locale
export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  globalInjection: true, // Enable global $t, $d, $n
  messages: {}
})

// Cache for loaded locales
const loadedLanguages = new Set()

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

  // Load locale messages with dynamic import
  try {
    const messages = await import(`./locales/${locale}.js`)
    
    // Set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default)
    loadedLanguages.add(locale)
    
    return messages.default
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error)
    throw error
  }
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
 * @param {string} locale - Locale code to switch to
 * @returns {Promise<string>} The locale that was set
 */
export async function changeLanguage(locale) {
  // Check if locale is supported
  if (!SUPPORT_LOCALES.includes(locale)) {
    console.warn(`Locale ${locale} is not supported, falling back to ${DEFAULT_LOCALE}`)
    locale = DEFAULT_LOCALE
  }

  // Load locale messages if not loaded
  if (!loadedLanguages.has(locale)) {
    await loadLocaleMessages(locale)
  }

  return setI18nLanguage(locale)
}

// Load default locale immediately
loadLocaleMessages(DEFAULT_LOCALE) 