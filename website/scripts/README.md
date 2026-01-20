# Translation Improvement Scripts

## improve-translations.js

自动化翻译检查和完善脚本，使用 GitHub Copilot CLI 批量处理 i18n 目录下的翻译文件。

### 功能特性

- ✅ **并发处理**：支持多线程并发执行，可配置并发数量
- ✅ **进度显示**：实时显示处理进度和统计信息
- ✅ **智能过滤**：自动跳过最近修改过的文件，避免重复处理
- ✅ **错误处理**：完善的错误捕获和日志记录
- ✅ **语言筛选**：支持仅处理指定语言的文件
- ✅ **预览模式**：Dry-run 模式查看待处理文件列表
- ✅ **详细日志**：自动生成处理日志文件

### 前置条件

1. 安装 GitHub Copilot CLI

```bash
# 使用 GitHub CLI 安装
gh extension install github/gh-copilot

# 或参考官方文档
# https://github.com/github/gh-copilot
```

1. 确保已登录 GitHub Copilot

```bash
gh copilot --version
```

### 快速开始

#### 1. 预览模式（推荐首次使用）

查看将要处理的文件，不实际执行：

```bash
npm run improve-translations:dry
```

#### 2. 处理所有语言

```bash
npm run improve-translations
```

#### 3. 仅处理指定语言

```bash
# 处理中文翻译
npm run improve-translations:zh

# 或指定其他语言
node scripts/improve-translations.js -l ru
node scripts/improve-translations.js -l ja
```

### 命令行选项

```bash
node scripts/improve-translations.js [options]
```

| 选项 | 简写 | 说明 | 默认值 |
|------|------|------|--------|
| `--concurrency <num>` | `-c` | 并发执行数量 | 3 |
| `--dry-run` | `-d` | 预览模式，不实际处理 | false |
| `--verbose` | `-v` | 显示详细日志 | false |
| `--model <model>` | `-m` | 指定 Copilot 模型 | gpt-4o-mini |
| `--lang <code>` | `-l` | 仅处理指定语言 | 全部 |
| `--no-skip` | - | 不跳过最近处理的文件 | - |
| `--help` | `-h` | 显示帮助信息 | - |

### 使用示例

#### 1. 标准使用（推荐）

```bash
# 使用默认配置处理所有文件
npm run improve-translations
```

#### 2. 高并发处理

```bash
# 使用 5 个并发线程
node scripts/improve-translations.js -c 5
```

#### 3. 详细日志模式

```bash
# 查看每个文件的详细处理过程
node scripts/improve-translations.js -v
```

#### 4. 强制重新处理

```bash
# 不跳过任何文件，全部重新处理
node scripts/improve-translations.js --no-skip
```

#### 5. 组合使用

```bash
# 处理中文，使用 5 个并发，显示详细日志
node scripts/improve-translations.js -l zh-Hans -c 5 -v
```

### 工作流程

1. **扫描目录**：递归扫描 `website/i18n` 目录
2. **文件过滤**：
   - 仅处理 `.json`、`.md`、`.mdx` 文件
   - 排除 `node_modules`、`.git` 等目录
   - 跳过最近 1 小时内修改的文件（可配置）
3. **生成元数据**：提取语言代码、文件路径等信息
4. **并发处理**：按批次并发执行 Copilot CLI
5. **结果记录**：生成详细的日志文件

### 支持的语言

脚本支持以下 20 种语言：

| 代码 | 语言 | 代码 | 语言 |
|------|------|------|------|
| zh-Hans | 简体中文 | ja | 日本語 |
| ar | العربية | ko | 한국어 |
| de | Deutsch | nl | Nederlands |
| es | Español | pl | Polski |
| fr | Français | pt | Português |
| he | עברית | ru | Русский |
| hi | हिन्दी | sv | Svenska |
| id | Bahasa Indonesia | th | ไทย |
| it | Italiano | tr | Türkçe |
| uk | Українська | vi | Tiếng Việt |

### 输出示例

```
🚀 Translation Improvement Script

📂 Scanning i18n directory...
   Found 1920 files

📊 Files by language:
   zh-Hans    (Simplified Chinese): 96 files
   ar         (Arabic): 96 files
   de         (German): 96 files
   ...

⚙️  Configuration:
   - Concurrency: 3
   - Model: gpt-4o-mini
   - Skip recently processed: true

🔄 Starting processing...

✅ [1/96] zh-Hans/code.json (1234ms)
✅ [2/96] zh-Hans/docusaurus-plugin-content-blog/article.md (2345ms)
...

📊 Progress: 33.3% (Batch 1/3)

============================================================
✨ Processing Complete!

Total Files: 96
✅ Successful: 94
❌ Failed: 2
⏭️  Skipped: 0
⏱️  Total Duration: 234.56s
📈 Average: 2443ms per file
============================================================

📄 Log saved to: website/logs/translation-improvement-2026-01-20T12-30-45.log
```

### 日志文件

每次执行都会在 `website/logs/` 目录生成日志文件，包含：

- 执行时间和配置
- 成功/失败统计
- 错误详情
- 平均处理时间

日志文件命名格式：`translation-improvement-YYYY-MM-DDTHH-MM-SS.log`

### 注意事项

1. **首次使用建议**：先运行 `--dry-run` 模式查看待处理文件
2. **并发数量**：建议不超过 5，避免触发 API 限流
3. **文件备份**：重要文件建议先备份或提交 Git
4. **网络连接**：需要稳定的网络连接到 GitHub Copilot 服务
5. **处理时间**：根据文件数量，可能需要较长时间

### 故障排除

#### Copilot CLI 未找到

```bash
# 检查安装
gh extension list

# 重新安装
gh extension install github/gh-copilot
```

#### 权限错误

```bash
# Windows PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 并发过高导致失败

减少并发数量：

```bash
node scripts/improve-translations.js -c 2
```

### 高级配置

可以编辑脚本文件 `improve-translations.js` 中的 `CONFIG` 对象来修改默认配置：

```javascript
const CONFIG = {
  i18nDir: path.join(__dirname, '..', 'i18n'),
  logDir: path.join(__dirname, '..', 'logs'),
  concurrency: 3,           // 默认并发数
  fileExtensions: ['.json', '.md', '.mdx'],  // 支持的文件类型
  excludePatterns: ['node_modules', '.git', 'current.json'],  // 排除规则
  copilotModel: 'gpt-4o-mini',  // Copilot 模型
  dryRun: false,
  skipProcessed: true,      // 跳过最近处理的文件
  verbose: false
};
```

### 最佳实践

1. **定期执行**：建议每周运行一次，保持翻译质量
2. **增量处理**：使用默认的 `skipProcessed` 选项，只处理新增或修改的文件
3. **重点语言**：使用 `-l` 选项针对重点市场的语言进行专项优化
4. **质量检查**：处理完成后，抽查几个文件确认翻译质量
5. **版本控制**：处理后通过 Git 查看差异，确认修改合理

### 相关脚本

- `write-translations`: Docusaurus 官方翻译初始化
- `write-heading-ids`: 自动生成标题 ID

### 技术细节

- **并发控制**：使用批次处理控制并发，避免资源耗尽
- **错误恢复**：单个文件失败不影响其他文件处理
- **进度追踪**：实时显示处理进度和成功率
- **智能跳过**：检查文件修改时间，避免重复处理

### 贡献

如需改进脚本功能，请遵循以下原则：

1. 保持简单性和可维护性
2. 添加充分的错误处理
3. 保持向后兼容
4. 更新此文档

### License

MIT
