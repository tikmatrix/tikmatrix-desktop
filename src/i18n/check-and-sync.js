// 翻译文件检查和同步工具
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 导入翻译文件
import en from './locales/en.js';
import zhCN from './locales/zh-CN.js';
import ru from './locales/ru.js';
import ar from './locales/ar.js';
import de from './locales/de.js';
import es from './locales/es.js';
import fr from './locales/fr.js';
import he from './locales/he.js';
import hi from './locales/hi.js';
import id from './locales/id.js';
import it from './locales/it.js';
import ja from './locales/ja.js';
import ko from './locales/ko.js';
import nl from './locales/nl.js';
import pl from './locales/pl.js';
import pt from './locales/pt.js';
import sv from './locales/sv.js';
import th from './locales/th.js';
import tr from './locales/tr.js';
import uk from './locales/uk.js';
import vi from './locales/vi.js';

// 收集所有语言文件中的键
const allKeys = new Set();
Object.keys(en).forEach(key => allKeys.add(key));
Object.keys(zhCN).forEach(key => allKeys.add(key));
Object.keys(ru).forEach(key => allKeys.add(key));
Object.keys(ar).forEach(key => allKeys.add(key));
Object.keys(de).forEach(key => allKeys.add(key));
Object.keys(es).forEach(key => allKeys.add(key));
Object.keys(fr).forEach(key => allKeys.add(key));
Object.keys(he).forEach(key => allKeys.add(key));
Object.keys(hi).forEach(key => allKeys.add(key));
Object.keys(id).forEach(key => allKeys.add(key));
Object.keys(it).forEach(key => allKeys.add(key));
Object.keys(ja).forEach(key => allKeys.add(key));
Object.keys(ko).forEach(key => allKeys.add(key));
Object.keys(nl).forEach(key => allKeys.add(key));
Object.keys(pl).forEach(key => allKeys.add(key));
Object.keys(pt).forEach(key => allKeys.add(key));
Object.keys(sv).forEach(key => allKeys.add(key));
Object.keys(th).forEach(key => allKeys.add(key));
Object.keys(tr).forEach(key => allKeys.add(key));
Object.keys(uk).forEach(key => allKeys.add(key));
Object.keys(vi).forEach(key => allKeys.add(key));

// 按字母顺序排序的键列表
const sortedKeys = Array.from(allKeys).sort();

// 检查每种语言的覆盖情况
function checkCoverage(translations, name) {
  const missing = [];

  for (const key of sortedKeys) {
    if (translations[key] === undefined) {
      missing.push(key);
    }
  }

  console.log(`${name}: ${Object.keys(translations).length}/${sortedKeys.length} 键 (${missing.length} 个缺失)`);

  if (missing.length > 0) {
    console.log(`缺失的键: ${missing.join(', ')}`);
  }

  return missing;
}


// 生成排序后的翻译对象
function generateSortedTranslations(translations) {
  const sorted = {};

  for (const key of sortedKeys) {
    sorted[key] = translations[key] || en[key] || key;
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

  output += '};';
  return output;
}

// 写入文件
function writeFile(filePath, content) {
  fs.writeFileSync(path.join(__dirname, filePath), content, 'utf8');
}

console.log('====== 检查翻译完整性 ======');
console.log(`总键数: ${sortedKeys.length}`);

// 检查覆盖情况
checkCoverage(en, '英语 (English)');
checkCoverage(zhCN, '中文 (Chinese)');
checkCoverage(ru, '俄语 (Russian)');
checkCoverage(ar, '阿拉伯语 (Arabic)');
checkCoverage(de, '德语 (German)');
checkCoverage(es, '西班牙语 (Spanish)');
checkCoverage(fr, '法语 (French)');
checkCoverage(he, '希伯来语 (Hebrew)');
checkCoverage(hi, '印地语 (Hindi)');
checkCoverage(id, '印度尼西亚语 (Indonesian)');
checkCoverage(it, '意大利语 (Italian)');
checkCoverage(ja, '日语 (Japanese)');
checkCoverage(ko, '韩语 (Korean)');
checkCoverage(nl, '荷兰语 (Dutch)');
checkCoverage(pl, '波兰语 (Polish)');
checkCoverage(pt, '葡萄牙语 (Portuguese)');
checkCoverage(sv, '瑞典语 (Swedish)');
checkCoverage(th, '泰语 (Thai)');
checkCoverage(tr, '土耳其语 (Turkish)');
checkCoverage(uk, '乌克兰语 (Ukrainian)');
checkCoverage(vi, '越南语 (Vietnamese)');

console.log('\n====== 生成更新文件 ======');

// 合并并排序翻译
const sortedEn = generateSortedTranslations(en);
const sortedZh = generateSortedTranslations(zhCN);
const sortedRu = generateSortedTranslations(ru);
const sortedAr = generateSortedTranslations(ar);
const sortedDe = generateSortedTranslations(de);
const sortedEs = generateSortedTranslations(es);
const sortedFr = generateSortedTranslations(fr);
const sortedHe = generateSortedTranslations(he);
const sortedHi = generateSortedTranslations(hi);
const sortedId = generateSortedTranslations(id);
const sortedIt = generateSortedTranslations(it);
const sortedJa = generateSortedTranslations(ja);
const sortedKo = generateSortedTranslations(ko);
const sortedNl = generateSortedTranslations(nl);
const sortedPl = generateSortedTranslations(pl);
const sortedPt = generateSortedTranslations(pt);
const sortedSv = generateSortedTranslations(sv);
const sortedTh = generateSortedTranslations(th);
const sortedTr = generateSortedTranslations(tr);
const sortedUk = generateSortedTranslations(uk);
const sortedVi = generateSortedTranslations(vi);

// 生成代码
const enCode = generateJsCode(sortedEn);
const zhCode = generateJsCode(sortedZh);
const ruCode = generateJsCode(sortedRu);
const arCode = generateJsCode(sortedAr);
const deCode = generateJsCode(sortedDe);
const esCode = generateJsCode(sortedEs);
const frCode = generateJsCode(sortedFr);
const heCode = generateJsCode(sortedHe);
const hiCode = generateJsCode(sortedHi);
const idCode = generateJsCode(sortedId);
const itCode = generateJsCode(sortedIt);
const jaCode = generateJsCode(sortedJa);
const koCode = generateJsCode(sortedKo);
const nlCode = generateJsCode(sortedNl);
const plCode = generateJsCode(sortedPl);
const ptCode = generateJsCode(sortedPt);
const svCode = generateJsCode(sortedSv);
const thCode = generateJsCode(sortedTh);
const trCode = generateJsCode(sortedTr);
const ukCode = generateJsCode(sortedUk);
const viCode = generateJsCode(sortedVi);

// 创建备份
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.join(__dirname, 'backups', timestamp);

if (!fs.existsSync(path.join(__dirname, 'backups'))) {
  fs.mkdirSync(path.join(__dirname, 'backups'));
}
fs.mkdirSync(backupDir);

// 备份原文件
const localeFiles = ['en', 'zh-CN', 'ru', 'ar', 'de', 'es', 'fr', 'he', 'hi', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'sv', 'th', 'tr', 'uk', 'vi'];
localeFiles.forEach(locale => {
  const sourceFile = path.join(__dirname, `locales/${locale}.js`);
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, path.join(backupDir, `${locale}.js`));
  }
});

console.log(`已创建备份在: backups/${timestamp}/`);

// 写入新文件
writeFile('locales/en.js', enCode);
writeFile('locales/zh-CN.js', zhCode);
writeFile('locales/ru.js', ruCode);
writeFile('locales/ar.js', arCode);
writeFile('locales/de.js', deCode);
writeFile('locales/es.js', esCode);
writeFile('locales/fr.js', frCode);
writeFile('locales/he.js', heCode);
writeFile('locales/hi.js', hiCode);
writeFile('locales/id.js', idCode);
writeFile('locales/it.js', itCode);
writeFile('locales/ja.js', jaCode);
writeFile('locales/ko.js', koCode);
writeFile('locales/nl.js', nlCode);
writeFile('locales/pl.js', plCode);
writeFile('locales/pt.js', ptCode);
writeFile('locales/sv.js', svCode);
writeFile('locales/th.js', thCode);
writeFile('locales/tr.js', trCode);
writeFile('locales/uk.js', ukCode);
writeFile('locales/vi.js', viCode);

console.log('已更新所有语言文件，各文件现在包含相同的键且按字母顺序排列。');
console.log('对于缺失的翻译，暂时使用英文作为默认值。');
console.log('请检查更新后的文件并修正翻译。'); 