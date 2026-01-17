// 翻译文件检查和同步工具
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义所有支持的语言
const LANGUAGES = [
  { code: 'en', name: '英语 (English)', file: 'en.js', isBase: true },
  { code: 'zh-CN', name: '简体中文 (Simplified Chinese)', file: 'zh-CN.js' },
  { code: 'ru', name: '俄语 (Russian)', file: 'ru.js' },
  { code: 'ja', name: '日语 (Japanese)', file: 'ja.js' },
  { code: 'ko', name: '韩语 (Korean)', file: 'ko.js' },
  { code: 'es', name: '西班牙语 (Spanish)', file: 'es.js' },
  { code: 'pt', name: '葡萄牙语 (Portuguese)', file: 'pt.js' },
  { code: 'fr', name: '法语 (French)', file: 'fr.js' },
  { code: 'de', name: '德语 (German)', file: 'de.js' },
  { code: 'it', name: '意大利语 (Italian)', file: 'it.js' },
  { code: 'ar', name: '阿拉伯语 (Arabic)', file: 'ar.js' },
  { code: 'hi', name: '印地语 (Hindi)', file: 'hi.js' },
  { code: 'id', name: '印尼语 (Indonesian)', file: 'id.js' },
  { code: 'th', name: '泰语 (Thai)', file: 'th.js' },
  { code: 'vi', name: '越南语 (Vietnamese)', file: 'vi.js' },
  { code: 'tr', name: '土耳其语 (Turkish)', file: 'tr.js' },
  { code: 'pl', name: '波兰语 (Polish)', file: 'pl.js' },
  { code: 'nl', name: '荷兰语 (Dutch)', file: 'nl.js' },
  { code: 'sv', name: '瑞典语 (Swedish)', file: 'sv.js' },
  { code: 'he', name: '希伯来语 (Hebrew)', file: 'he.js' },
  { code: 'uk', name: '乌克兰语 (Ukrainian)', file: 'uk.js' }
];

// 动态导入所有语言文件
const translations = {};
for (const lang of LANGUAGES) {
  try {
    const module = await import(`./locales/${lang.file}`);
    translations[lang.code] = module.default;
  } catch (error) {
    console.error(`❌ 无法加载 ${lang.name} (${lang.file}): ${error.message}`);
    translations[lang.code] = {};
  }
}

// 收集所有语言文件中的键
const allKeys = new Set();
Object.values(translations).forEach(trans => {
  Object.keys(trans).forEach(key => allKeys.add(key));
});

// 按字母顺序排序的键列表
const sortedKeys = Array.from(allKeys).sort();

// 常见英文单词和短语（用于检测未翻译的内容）
const COMMON_ENGLISH_PATTERNS = [
  /^(Click|Please|Error|Success|Warning|Failed|Loading|Confirm|Cancel|Delete|Save|Edit|Add|Remove|Create|Update|Select|Search|Filter|Sort|Import|Export|Download|Upload|Settings|Account|Device|Script|Task|Video|Audio|Image|File|Folder|Data|User|Password|Email|Phone|Name|Title|Description|Status|Type|Category|Tag|Date|Time|Duration|Size|Quality|Format|Language|Version|License|Help|About|Contact|Privacy|Terms|Copyright|All rights reserved)/i,
  /^(The |A |An |This |That |These |Those |Is |Are |Was |Were |Be |Been |Being |Have |Has |Had |Do |Does |Did |Will |Would |Could |Should |May |Might |Must |Can |Cannot )/,
  /\b(and|or|not|but|for|with|from|into|during|including|until|against|among|throughout|despite|towards|upon|concerning|to|in|on|at|by|about|like|through|over|before|between|after|since|without|under|within|along|following|across|behind|beyond|plus|except|up|out|around|down|off|above|near)\b/i
];

// 检测文本是否可能是英文
function looksLikeEnglish(text) {
  if (!text || typeof text !== 'string') return false;
  
  // 检查常见英文模式
  for (const pattern of COMMON_ENGLISH_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }
  
  // 检查是否主要由拉丁字母组成（排除特定语言的特殊字符）
  const latinChars = text.match(/[a-zA-Z]/g);
  if (latinChars && latinChars.length > text.length * 0.7) {
    // 检查是否包含非ASCII字符（可能是其他语言）
    const hasNonAscii = /[^\x00-\x7F]/.test(text);
    if (!hasNonAscii) {
      return true;
    }
  }
  
  return false;
}

// 检测文本所属的语言类型
function detectLanguageScript(text) {
  if (!text || typeof text !== 'string') return 'unknown';
  
  // 中文（简体/繁体）
  if (/[\u4e00-\u9fff]/.test(text)) return 'chinese';
  
  // 日文（平假名、片假名、汉字）
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'japanese';
  
  // 韩文
  if (/[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/.test(text)) return 'korean';
  
  // 阿拉伯文
  if (/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/.test(text)) return 'arabic';
  
  // 泰文
  if (/[\u0e00-\u0e7f]/.test(text)) return 'thai';
  
  // 印地语/梵文系
  if (/[\u0900-\u097f]/.test(text)) return 'hindi';
  
  // 希伯来文
  if (/[\u0590-\u05ff]/.test(text)) return 'hebrew';
  
  // 西里尔文（俄语、乌克兰语等）
  if (/[\u0400-\u04ff]/.test(text)) return 'cyrillic';
  
  // 拉丁字母（包括带音标的字符，如西班牙语、法语、葡萄牙语等）
  if (/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(text)) return 'latin';
  
  return 'unknown';
}

// 检查翻译质量
function checkTranslationQuality(translations, langCode, langName, baseTranslations) {
  const issues = {
    missing: [],
    untranslated: [],
    possibleWrongLanguage: []
  };
  
  // 跳过英文基准语言的翻译质量检查
  if (langCode === 'en') {
    for (const key of sortedKeys) {
      if (translations[key] === undefined) {
        issues.missing.push(key);
      }
    }
    return issues;
  }
  
  // 确定目标语言的文字系统
  const targetScripts = getExpectedScripts(langCode);
  
  for (const key of sortedKeys) {
    const value = translations[key];
    const baseValue = baseTranslations[key];
    
    // 检查缺失的键
    if (value === undefined) {
      issues.missing.push(key);
      continue;
    }
    
    // 跳过空值
    if (!value || typeof value !== 'string') continue;
    
    // 跳过包含占位符或特殊格式的文本（这些可能包含英文）
    if (value.includes('{') || value.includes('\\n') || value.includes('http')) {
      continue;
    }
    
    // 检查是否仍为英文（未翻译）
    if (looksLikeEnglish(value)) {
      // 额外检查：如果和英文原文相同或非常相似，很可能未翻译
      if (baseValue && value === baseValue) {
        issues.untranslated.push({ key, value, reason: '与英文原文完全相同' });
      } else if (baseValue && value.toLowerCase() === baseValue.toLowerCase()) {
        issues.untranslated.push({ key, value, reason: '与英文原文仅大小写不同' });
      } else {
        issues.untranslated.push({ key, value, reason: '包含明显的英文文本' });
      }
      continue;
    }
    
    // 检查是否使用了错误的语言文字系统（仅针对非拉丁语言）
    // 拉丁语言之间不互相检查，因为它们使用相同的字符集
    if (!targetScripts.includes('latin')) {
      const detectedScript = detectLanguageScript(value);
      if (detectedScript !== 'unknown' && detectedScript !== 'latin' && 
          !targetScripts.includes(detectedScript)) {
        issues.possibleWrongLanguage.push({ 
          key, 
          value, 
          expected: targetScripts.join(' or '),
          detected: detectedScript 
        });
      }
    }
  }
  
  return issues;
}

// 获取语言代码对应的预期文字系统
function getExpectedScripts(langCode) {
  const scriptMap = {
    'zh-CN': ['chinese'],
    'ja': ['japanese', 'chinese'], // 日文包含汉字
    'ko': ['korean'],
    'ar': ['arabic'],
    'hi': ['hindi'],
    'th': ['thai'],
    'he': ['hebrew'],
    'ru': ['cyrillic'],
    'uk': ['cyrillic'],
    // 拉丁字母语言（包括越南语）
    'vi': ['latin'],
    'es': ['latin'],
    'pt': ['latin'],
    'fr': ['latin'],
    'de': ['latin'],
    'it': ['latin'],
    'tr': ['latin'],
    'pl': ['latin'],
    'nl': ['latin'],
    'sv': ['latin'],
    'id': ['latin']
  };
  
  return scriptMap[langCode] || ['latin'];
}

// 检查每种语言的覆盖情况（简化版，用于概览）
function checkCoverage(translations, name) {
  const missing = [];

  for (const key of sortedKeys) {
    if (translations[key] === undefined) {
      missing.push(key);
    }
  }

  console.log(`${name}: ${Object.keys(translations).length}/${sortedKeys.length} 键 (${missing.length} 个缺失)`);

  if (missing.length > 0 && missing.length <= 10) {
    console.log(`  缺失的键: ${missing.join(', ')}`);
  } else if (missing.length > 10) {
    console.log(`  缺失的键: ${missing.slice(0, 10).join(', ')}... (还有 ${missing.length - 10} 个)`);
  }

  return missing;
}


// 生成排序后的翻译对象
function generateSortedTranslations(translations, baseTranslations) {
  const sorted = {};

  for (const key of sortedKeys) {
    sorted[key] = translations[key] || baseTranslations[key] || key;
  }

  return sorted;
}

// 生成JavaScript代码
function generateJsCode(translations) {
  let output = 'export default {\n';

  for (const key of sortedKeys) {
    const value = translations[key] || '';
    // 正确转义所有特殊字符
    const escapedValue = value
      .replace(/\\/g, '\\\\')  // 反斜杠必须首先转义
      .replace(/'/g, "\\'")     // 单引号
      .replace(/\n/g, '\\n')    // 换行符
      .replace(/\r/g, '\\r')    // 回车符
      .replace(/\t/g, '\\t')    // 制表符
      .replace(/\f/g, '\\f')    // 换页符
      .replace(/\v/g, '\\v');   // 垂直制表符
    output += `  ${key}: '${escapedValue}',\n`;
  }

  output += '};\n';
  return output;
}

// 写入文件
function writeFile(filePath, content) {
  fs.writeFileSync(path.join(__dirname, filePath), content, 'utf8');
}

// 打印详细的翻译质量报告
function printQualityReport(langName, issues) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${langName} - 翻译质量检查`);
  console.log('='.repeat(60));
  
  if (issues.missing.length === 0 && issues.untranslated.length === 0 && 
      issues.possibleWrongLanguage.length === 0) {
    console.log('✅ 完美！没有发现问题。');
    return;
  }
  
  if (issues.missing.length > 0) {
    console.log(`\n❌ 缺失的键 (${issues.missing.length} 个):`);
    if (issues.missing.length <= 20) {
      issues.missing.forEach(key => console.log(`   - ${key}`));
    } else {
      issues.missing.slice(0, 20).forEach(key => console.log(`   - ${key}`));
      console.log(`   ... 还有 ${issues.missing.length - 20} 个`);
    }
  }
  
  if (issues.untranslated.length > 0) {
    console.log(`\n⚠️  疑似未翻译（仍为英文）的字段 (${issues.untranslated.length} 个):`);
    if (issues.untranslated.length <= 10) {
      issues.untranslated.forEach(({ key, value, reason }) => {
        console.log(`   - ${key}: "${value}" (${reason})`);
      });
    } else {
      issues.untranslated.slice(0, 10).forEach(({ key, value, reason }) => {
        console.log(`   - ${key}: "${value}" (${reason})`);
      });
      console.log(`   ... 还有 ${issues.untranslated.length - 10} 个`);
    }
  }
  
  if (issues.possibleWrongLanguage.length > 0) {
    console.log(`\n⚠️  疑似使用了错误语言的字段 (${issues.possibleWrongLanguage.length} 个):`);
    if (issues.possibleWrongLanguage.length <= 10) {
      issues.possibleWrongLanguage.forEach(({ key, value, expected, detected }) => {
        console.log(`   - ${key}: "${value}"`);
        console.log(`     (预期: ${expected}, 检测到: ${detected})`);
      });
    } else {
      issues.possibleWrongLanguage.slice(0, 10).forEach(({ key, value, expected, detected }) => {
        console.log(`   - ${key}: "${value}"`);
        console.log(`     (预期: ${expected}, 检测到: ${detected})`);
      });
      console.log(`   ... 还有 ${issues.possibleWrongLanguage.length - 10} 个`);
    }
  }
}

// 生成汇总报告
function printSummaryReport(allIssues) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 总体汇总报告');
  console.log('='.repeat(60));
  
  let totalMissing = 0;
  let totalUntranslated = 0;
  let totalWrongLanguage = 0;
  let perfectLanguages = [];
  
  allIssues.forEach(({ langName, issues }) => {
    totalMissing += issues.missing.length;
    totalUntranslated += issues.untranslated.length;
    totalWrongLanguage += issues.possibleWrongLanguage.length;
    
    if (issues.missing.length === 0 && issues.untranslated.length === 0 && 
        issues.possibleWrongLanguage.length === 0) {
      perfectLanguages.push(langName);
    }
  });
  
  console.log(`\n总键数: ${sortedKeys.length}`);
  console.log(`支持语言数: ${LANGUAGES.length}`);
  console.log(`\n问题统计:`);
  console.log(`  - 缺失的键: ${totalMissing} 个`);
  console.log(`  - 疑似未翻译: ${totalUntranslated} 个`);
  console.log(`  - 疑似错误语言: ${totalWrongLanguage} 个`);
  
  if (perfectLanguages.length > 0) {
    console.log(`\n✅ 翻译完美的语言 (${perfectLanguages.length} 个):`);
    perfectLanguages.forEach(lang => console.log(`   - ${lang}`));
  }
  
  const problemLanguages = allIssues.filter(({ issues }) => 
    issues.missing.length > 0 || issues.untranslated.length > 0 || 
    issues.possibleWrongLanguage.length > 0
  );
  
  if (problemLanguages.length > 0) {
    console.log(`\n⚠️  需要注意的语言 (${problemLanguages.length} 个):`);
    problemLanguages.forEach(({ langName, issues }) => {
      const problems = [];
      if (issues.missing.length > 0) problems.push(`${issues.missing.length}缺失`);
      if (issues.untranslated.length > 0) problems.push(`${issues.untranslated.length}未翻译`);
      if (issues.possibleWrongLanguage.length > 0) problems.push(`${issues.possibleWrongLanguage.length}错误语言`);
      console.log(`   - ${langName}: ${problems.join(', ')}`);
    });
  }
}

console.log('='.repeat(60));
console.log('🌍 TikMatrix Desktop - 国际化翻译检查和同步工具');
console.log('='.repeat(60));
console.log(`\n总键数: ${sortedKeys.length}`);
console.log(`支持语言数: ${LANGUAGES.length}\n`);

console.log('====== 第一步：检查所有语言的完整性 ======\n');

// 检查所有语言的覆盖情况
LANGUAGES.forEach(lang => {
  checkCoverage(translations[lang.code], lang.name);
});

console.log('\n====== 第二步：详细的翻译质量检查 ======');

// 对每种语言进行详细的翻译质量检查
const allIssues = [];
const baseTranslations = translations['en'];

for (const lang of LANGUAGES) {
  const issues = checkTranslationQuality(
    translations[lang.code], 
    lang.code, 
    lang.name, 
    baseTranslations
  );
  allIssues.push({ langName: lang.name, langCode: lang.code, issues });
  printQualityReport(lang.name, issues);
}

// 打印汇总报告
printSummaryReport(allIssues);

console.log('\n====== 第三步：生成更新文件 ======\n');

// 合并并排序所有语言的翻译
const sortedTranslations = {};
LANGUAGES.forEach(lang => {
  sortedTranslations[lang.code] = generateSortedTranslations(
    translations[lang.code], 
    baseTranslations
  );
});

// 创建备份
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.join(__dirname, 'backups', timestamp);

if (!fs.existsSync(path.join(__dirname, 'backups'))) {
  fs.mkdirSync(path.join(__dirname, 'backups'));
}
fs.mkdirSync(backupDir);

// 备份所有语言文件
console.log('正在备份所有语言文件...');
let backedUpCount = 0;
LANGUAGES.forEach(lang => {
  const filePath = path.join(__dirname, 'locales', lang.file);
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, path.join(backupDir, lang.file));
    backedUpCount++;
  }
});

console.log(`✅ 已备份 ${backedUpCount} 个语言文件到: backups/${timestamp}/`);

// 写入新文件
console.log('\n正在更新所有语言文件...');
let updatedCount = 0;
LANGUAGES.forEach(lang => {
  const code = generateJsCode(sortedTranslations[lang.code]);
  writeFile(`locales/${lang.file}`, code);
  updatedCount++;
});

console.log(`✅ 已更新 ${updatedCount} 个语言文件`);
console.log('\n所有文件现在包含相同的键且按字母顺序排列。');
console.log('对于缺失的翻译，暂时使用英文作为默认值。');
console.log('请根据上述报告检查并修正翻译问题。');
console.log('\n' + '='.repeat(60)); 