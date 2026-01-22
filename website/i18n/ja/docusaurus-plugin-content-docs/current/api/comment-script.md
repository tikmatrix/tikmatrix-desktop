---
sidebar_position: 5
title: コメントスクリプト設定
description: コメントスクリプトの完全な設定リファレンス
---

このページでは、タスク作成に使用される `comment` スクリプトの設定パラメータについて説明します。

## 概要

`comment` スクリプトは、TikTok または Instagram の投稿に自動的にコメントを投稿するために使用されます。API 経由で複数のターゲット投稿 URL を提供すると、**ターゲット投稿 URL ごとに1つのタスクが作成されます**。`start_time` パラメータを使用して、各タスクの実行時刻を制御できます。

## スクリプト設定 (`script_config`)

`script_config` オブジェクトには、コメントスクリプトのパラメータが含まれます。以下は利用可能なパラメータです：

### パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | はい* | [] | コメントするターゲット投稿 URL の配列（URL ごとに1つのタスク） |
| target_post_url | string | はい* | "" | 単一のターゲット投稿 URL、または改行/カンマで区切られた複数の URL |
| comment_content | string | はい | "" | コメントテキストコンテンツ。改行で区切られた複数のコメントを含めることができます |
| comment_order | string | いいえ | "random" | コメントの選択方法：`random` または `sequential` |
| insert_emoji | boolean | いいえ | false | コメントにランダムな絵文字を挿入するかどうか |
| comment_image_path | string | いいえ | "" | 画像コメント用の画像ファイルパス（TikTok のみ）。絶対パスまたは work_dir/upload/ への相対パスをサポート |

:::note
`target_post_urls` 配列または `target_post_url` 文字列のいずれかを提供する必要があります。両方が提供された場合、`target_post_urls` が優先されます。
:::

:::tip 画像コメント（TikTok のみ）
`comment_image_path` パラメータを使用すると、コメントに画像を添付できます。この機能は **TikTok でのみサポートされています** - Instagram のコメントは画像の添付をサポートしていません。画像はデバイスにプッシュされ、ギャラリーの最初の画像として選択されます。
:::

:::info タスク作成
複数のターゲット投稿 URL が提供された場合、API は**ターゲット投稿 URL ごとに1つのタスクを作成**します。たとえば、3つの投稿 URL と2つのデバイスを指定すると、6つのタスクが作成されます。`start_time` パラメータを使用して、タスクの開始実行時刻を制御します。
:::

## 例

### 単一投稿へのコメント

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "素晴らしいコンテンツ！🔥"
    }
  }'
```

### 複数のコメントオプションを使用

改行で区切られた複数のコメントを提供します。システムは `comment_order` に基づいて1つを選択します：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "素晴らしい動画！\nこのコンテンツが好き！\n頑張って！👏\nこれは本当に良い！",
      "comment_order": "random"
    }
  }'
```

### 複数の投稿にコメント

複数の投稿にコメントする場合、投稿ごとに1つのタスクが作成されます：

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
      "comment_content": "素晴らしい動画！\n最高！\n好きです！",
      "comment_order": "sequential"
    }
  }'
```

これにより、すぐに実行される3つの個別タスクが作成されます。

### 開始時刻を使用したコメントのスケジュール

`start_time` を使用して、タスクの開始時刻をスケジュール：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "スケジュールされたコメント！"
    },
    "start_time": "14:30"
  }'
```

### 絵文字挿入を使用したコメント

自動絵文字挿入を有効にして、コメントをより魅力的に：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "これは素晴らしい",
      "insert_emoji": true
    }
  }'
```

### ユーザー名リストモードでのコメント

特定のアカウント用にコメントタスクを直接作成：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "良い動画！"
    }
  }'
```

### 複数デバイスでの一括コメント

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "素晴らしいコンテンツ！\n素晴らしい作品！\nこれが好き！",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram コメントの例

同じ API が Instagram 投稿でも機能します：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "美しい写真！📸",
      "insert_emoji": true
    }
  }'
```

### TikTok 画像コメントの例

TikTok コメントに画像を添付（Instagram ではサポートされていません）：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "この画像を見て！",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info 画像パス
`comment_image_path` は以下のいずれかです：

- **絶対パス**：`C:/images/my_image.jpg` または `/home/user/images/my_image.jpg`
- **相対パス**：`my_image.jpg`（`work_dir/upload/` からの相対パス）

:::

## レスポンス

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

## コメント順序

### ランダム順序 (`random`)

- 提供されたリストからランダムに1つのコメントを選択
- コメントがより自然に見えるようにするのに適しています
- デフォルトの動作

### 順次順序 (`sequential`)

- `job_count` に基づいて順番にコメントを選択
- 最初のタスクは最初のコメントを使用、2番目のタスクは2番目のコメントを使用、というように続きます
- リストの最後に達すると最初に戻ります
- 複数のタスクにわたって異なるコメントを配布するのに適しています

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

## ベストプラクティス

1. **コメントを変える**：スパムに見えないように、複数のコメントオプションを提供します。

2. **バラエティのために順次順序を使用**：同じデバイスで複数の投稿にコメントする場合、`sequential` 順序を使用して異なるコメントを配布します。

3. **絵文字挿入を有効にする**：`insert_emoji: true` に設定して、コメントをより自然で魅力的に見せます。

4. **タスクをスケジュール**：`start_time` パラメータを使用して、時間をかけてコメントを分散し、レート制限を受ける可能性を減らします。

5. **プラットフォームの制限を尊重**：一度に多くのコメントタスクを作成しないでください。ほとんどのプラットフォームにはコメントのレート制限があります。

## エラーコード

| コード | 説明 |
|------|-------------|
| 40001 | ターゲット投稿 URL またはコメントコンテンツが不足 |
| 40003 | API 経由でサポートされていないスクリプト |
| 40301 | API アクセスには Pro+ プランが必要 |

## 関連項目

- [タスク管理 API](./task-management.md) - タスクの作成、リスト、管理
- [投稿スクリプト設定](./post-script.md) - 投稿スクリプトパラメータの設定
- [フォロースクリプト設定](./follow-script.md) - フォロースクリプトパラメータの設定
- [ローカル API 概要](./local-api.md) - API 概要とクイックスタート
