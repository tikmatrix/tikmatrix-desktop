---
sidebar_position: 5
title: コメント脚本配置
description: コメント脚本の完整配置参考
---

本页介绍用于タスク创建の `comment` 脚本の配置参数。

## 概述

`comment` 脚本用于自動在 TikTok または Instagram 投稿上で发布コメント。当您通じて API 提供複数ターゲット投稿 URL 时，**每个ターゲット投稿 URL 创建一个タスク**。您できます以使用 `start_time` 参数制御每个タスクの実行时间。

## 脚本配置 (`script_config`)

`script_config` 对象含むコメント脚本の参数。以下是できます用の参数：

### 参数

| 参数 | 类型 | 必填 | 默认值 | 説明 |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | 是* | [] | 要コメントのターゲット投稿 URL 数组（每个 URL 一个タスク） |
| target_post_url | string | 是* | "" | 单个ターゲット投稿 URL または用换行符/逗号分隔の複数 URL |
| comment_content | string | 是 | "" | コメント文本コンテンツ。できます以含む用换行符分隔の多条コメント |
| comment_order | string | 否 | "random" | など何选择コメント：`random`（ランダム）または `sequential`（顺序） |
| insert_emoji | boolean | 否 | false | 是否在コメント中插入ランダム表情符号 |
| comment_image_path | string | 否 | "" | 画像コメントの画像文件パス（仅限 TikTok）。サポート绝对パスまたは相对于 work_dir/upload/ の相对パス |

:::note
必须提供 `target_post_urls` 数组または `target_post_url` 字符串。など果两者都提供，`target_post_urls` 优先。
:::

:::tip 画像コメント（仅限 TikTok）
`comment_image_path` 参数允许您在コメント中附加画像。此機能**仅在 TikTok 上でサポート** - Instagram コメント不サポート画像附件。画像将被推送到デバイスし作に图库中の第一张画像被选择。
:::

:::info タスク创建
当提供複数ターゲット投稿 URL 时，API 会 **に每个ターゲット投稿 URL 创建一个タスク**。例など，など果您指定された 3 个投稿 URL 和 2 个デバイス，将创建 6 个タスク。使用 `start_time` 参数制御タスク开始実行の时间。
:::

## 示例

### コメント单个投稿

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "精彩内容！🔥"
    }
  }'
```

### 使用複数コメント选项

提供用换行符分隔の多条コメント。系统将に基づいて `comment_order` 选择其中一条：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "视频太棒了！\n喜欢这个内容！\n继续加油！👏\n真的很不错！",
      "comment_order": "random"
    }
  }'
```

### コメント複数投稿

当コメント複数投稿时，每个投稿创建一个タスク：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_urls": [
        "https://www.tiktok.com/@user1/video/111",
        "https://www.tiktok.com/@user2/video/222",
        "https://www.tiktok.com/@user3/video/333"
      ],
      "comment_content": "好视频！\n太棒了！\n喜欢！",
      "comment_order": "sequential"
    }
  }'
```

这将创建 3 个立即実行の独立タスク。

### 定时コメント

使用 `start_time` 安排タスク开始実行の时间：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "定时评论！"
    },
    "start_time": "14:30"
  }'
```

### 带表情符号插入のコメント

启用自動表情符号插入使コメント更具吸引力：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "这太棒了",
      "insert_emoji": true
    }
  }'
```

### 按ユーザー名列表模式コメント

直接に特定アカウント创建コメントタスク：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "视频不错！"
    }
  }'
```

### 在多デバイス上で一括コメント

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "内容很棒！\n出色的作品！\n太喜欢了！",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram コメント示例

同样の API 适用于 Instagram 投稿：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "美丽的照片！📸",
      "insert_emoji": true
    }
  }'
```

### TikTok 画像コメント示例

在您の TikTok コメント中附加画像（不サポート Instagram）：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "看看这张图片！",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info 画像パス
`comment_image_path` できます以是：

- **绝对パス**：`C:/images/my_image.jpg` または `/home/user/images/my_image.jpg`
- **相对パス**：`my_image.jpg`（相对于 `work_dir/upload/`）

:::

## 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [301, 302, 303],
    "created_count": 3
  }
}
```

## コメント顺序

### ランダム顺序 (`random`)

- 从提供の列表中ランダム选择一条コメント
- 适合使コメント看起来更自然
- 默认動作

### 顺序 (`sequential`)

- に基づいて `job_count` 按顺序选择コメント
- 第一个タスク使用第一条コメント，第二个タスク使用第二条コメント，依此类推
- 到达列表末尾时循环回开头
- 适合在複数タスク之间分发異なるのコメント

## 投稿 URL 形式

### TikTok

```text
https://www.tiktok.com/@username/video/1234567890123456
https://vm.tiktok.com/ABCDEFG/
```

### Instagram

```text
https://www.instagram.com/p/ABCDEFGHIJK/
https://www.instagram.com/reel/ABCDEFGHIJK/
```

## 最適な实践

1. **变化您のコメント**：提供複数コメント选项以避免看起来像垃圾信息。

2. **使用顺序模式得る多样性**：当使用同じデバイスコメント複数投稿时，使用 `sequential` 顺序来分发異なるのコメント。

3. **启用表情符号插入**：設定 `insert_emoji: true` 使コメント看起来更自然和有吸引力。

4. **安排タスク**：使用 `start_time` 参数将コメント分散在一段时间内，减少触发频率限制の机会。

5. **遵守平台限制**：不要一次创建太多コメントタスク。大多数平台对コメント有频率限制。

## 错误代码

| 代码 | 説明 |
|------|-------------|
| 40001 | 缺少ターゲット投稿 URL またはコメントコンテンツ |
| 40003 | API 不サポート该脚本 |
| 40301 | API 訪問需要 Pro+ 计划 |

## 另请参阅

- [タスク管理 API](./task-management.md) - 创建、列出和管理タスク
- [发布脚本配置](./post-script.md) - 配置发布脚本参数
- [フォロー脚本配置](./follow-script.md) - 配置フォロー脚本参数
- [本地 API 概述](./local-api.md) - API 概述和快速入门
