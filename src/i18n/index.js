import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import zhCN from './locales/zh-CN.js'
import ru from './locales/ru.js'
import ar from './locales/ar.js'
import de from './locales/de.js'
import es from './locales/es.js'
import fr from './locales/fr.js'
import he from './locales/he.js'
import hi from './locales/hi.js'
import id from './locales/id.js'
import it from './locales/it.js'
import ja from './locales/ja.js'
import ko from './locales/ko.js'
import nl from './locales/nl.js'
import pl from './locales/pl.js'
import pt from './locales/pt.js'
import sv from './locales/sv.js'
import th from './locales/th.js'
import tr from './locales/tr.js'
import uk from './locales/uk.js'
import vi from './locales/vi.js'

export const i18n = createI18n({
  locale: 'en', // 设置默认语言
  messages: {
    en,
    'zh-CN': zhCN,
    'ru': ru,
    'ar': ar,
    'de': de,
    'es': es,
    'fr': fr,
    'he': he,
    'hi': hi,
    'id': id,
    'it': it,
    'ja': ja,
    'ko': ko,
    'nl': nl,
    'pl': pl,
    'pt': pt,
    'sv': sv,
    'th': th,
    'tr': tr,
    'uk': uk,
    'vi': vi
  }
}) 