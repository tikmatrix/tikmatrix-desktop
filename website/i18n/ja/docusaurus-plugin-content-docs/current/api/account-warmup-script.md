---
sidebar_position: 6
title: アカウントウォームアップスクリプト設定
description: アカウントウォームアップスクリプトの完全な設定リファレンス
---

このページでは、タスク作成に使用される `account_warmup` スクリプトの設定パラメータについて説明します。

## 概要

`account_warmup` スクリプトは、自然なユーザー動作をシミュレートして TikTok または Instagram アカウントをウォームアップするために使用されます。設定された確率に基づいて、動画を視聴し、ランダムにいいね、フォロー、お気に入り、コメントを行います。これにより、新しいアカウントがエンゲージメント履歴を構築し、ボット検出を回避するのに役立ちます。

## スクリプト設定 (`script_config`)

`script_config` オブジェクトには、アカウントウォームアップスクリプトのパラメータが含まれます。以下は利用可能なパラメータです：

### パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| task_duration | number | いいえ | 600 | ウォームアップタスクの総時間（秒） |
| topic | string | いいえ | "" | 検索トピックキーワード（1行に1つ、ランダムに選択） |
| min_duration | number | いいえ | 15 | 最小動画視聴時間（秒） |
| max_duration | number | いいえ | 30 | 最大動画視聴時間（秒） |
| like_probable | number | いいえ | 0 | 動画にいいねする確率（0-100） |
| floow_probable | number | いいえ | 0 | 動画作成者をフォローする確率（0-100） |
| collect_probable | number | いいえ | 0 | 動画をお気に入り/ブックマークする確率（0-100） |
| comment_probable | number | いいえ | 0 | 動画にコメントする確率（0-100） |
| comment | string | いいえ | "" | コメントテンプレート（1行に1つ、ランダムに選択） |
| insert_emoji | boolean | いいえ | false | コメントにランダムな絵文字を挿入するかどうか |
| comment_order | string | いいえ | "random" | コメント選択順序：`random` または `sequential` |
| generate_by_chatgpt | boolean | いいえ | false | ChatGPT を使用してコメントを生成するかどうか |
| chatgpt_settings | object | いいえ | {} | ChatGPT 設定（下記参照） |

### ChatGPT 設定構造

`generate_by_chatgpt` が `true` に設定されている場合、`chatgpt_settings` オブジェクトで ChatGPT コメント生成を設定できます：

| パラメータ | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| api_key | string | はい | OpenAI API キー |
| model | string | いいえ | 使用するモデル（デフォルト："gpt-3.5-turbo"）。オプション："gpt-3.5-turbo"、"gpt-4"、"gpt-4-turbo" |
| prompt | string | いいえ | コメント生成のカスタムプロンプト。デフォルトでは友好的で関連性のあるコメントを生成 |
| max_tokens | number | いいえ | レスポンスの最大トークン数（デフォルト：100） |
| temperature | number | いいえ | 創造性レベル 0-2（デフォルト：0.7）。高い値 = より創造的 |
| base_url | string | いいえ | カスタム API エンドポイント URL（Azure OpenAI または互換 API 用） |

`chatgpt_settings` オブジェクトの例：

```json
{
  "api_key": "sk-your-openai-api-key",
  "model": "gpt-3.5-turbo",
  "prompt": "この動画について短くフレンドリーなコメントを日本語で生成してください",
  "max_tokens": 50,
  "temperature": 0.8,
  "base_url": "https://api.openai.com/v1"
}
```

:::tip 推奨
新しいアカウントの場合は、低いインタラクション確率（5-15%）から始めて、時間の経過とともに徐々に増やしてください。これは自然なユーザー動作を模倣します。
:::

## 例

### 基本的なアカウントウォームアップ

動画視聴のみのシンプルなウォームアップ：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 10,
      "max_duration": 30
    }
  }'
```

### トピック検索を使用したウォームアップ

特定のトピックを検索してアカウントをウォームアップ：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 900,
      "topic": "面白い猫\n犬の動画\nペット動画",
      "min_duration": 15,
      "max_duration": 45
    }
  }'
```

### インタラクション付きウォームアップ

いいね、フォロー、コメントを含む完全なウォームアップ：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "料理\nレシピ\n食べ物",
      "min_duration": 20,
      "max_duration": 60,
      "like_probable": 30,
      "floow_probable": 10,
      "collect_probable": 5,
      "comment_probable": 15,
      "comment": "素晴らしい！🔥\nこのコンテンツが好き！\nとても良い！👏\nすごい、信じられない！",
      "insert_emoji": true,
      "comment_order": "random"
    }
  }'
```

### ChatGPT コメントを使用したウォームアップ

ChatGPT を使用してインテリジェントなコメントを生成：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1800,
      "topic": "テクノロジーレビュー\nガジェット",
      "min_duration": 30,
      "max_duration": 90,
      "like_probable": 25,
      "comment_probable": 20,
      "generate_by_chatgpt": true,
      "chatgpt_settings": {
        "api_key": "your-api-key",
        "model": "gpt-3.5-turbo",
        "prompt": "この動画について短くフレンドリーなコメントを生成してください"
      }
    }
  }'
```

### 複数デバイスでの一括ウォームアップ

複数のデバイスで同時にウォームアップを実行：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20
    },
    "enable_multi_account": true
  }'
```

### スケジュールされたウォームアップタスク

特定の時刻にウォームアップを実行するようにスケジュール：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 1200,
      "topic": "音楽\nダンス\nトレンド",
      "min_duration": 20,
      "max_duration": 40,
      "like_probable": 15,
      "floow_probable": 5
    },
    "start_time": "09:00"
  }'
```

### ユーザー名リストによるウォームアップ

特定のアカウント用にウォームアップタスクを作成：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "account_warmup",
    "script_config": {
      "task_duration": 600,
      "min_duration": 15,
      "max_duration": 30,
      "like_probable": 20,
      "floow_probable": 5
    }
  }'
```

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

## ベストプラクティス

1. **低い確率から始める**：新しいアカウントの場合は、低いインタラクション確率（5-15%）を使用し、数日/数週間かけて徐々に増やします。

2. **関連性のあるトピックを使用**：アカウントのニッチに合ったトピックを選択して、関連性のあるエンゲージメント履歴を構築します。

3. **視聴時間を変動させる**：min_duration と max_duration の範囲を設定して、自然な視聴パターンをシミュレートします。

4. **適度なタスク時間**：連続した長時間のセッションではなく、1日2〜3回、各10〜30分のウォームアップセッションを実行します。

5. **多様なコメントを使用**：複数のコメントテンプレートを提供して、スパム検出をトリガーする可能性のある繰り返しパターンを避けます。

6. **賢くスケジュール**：`start_time` を使用して、ターゲットオーディエンスのタイムゾーンでアクティブな時間帯にウォームアップタスクを実行します。

## 関連項目

- [タスク管理 API](./task-management.md) - タスクの作成、リスト、管理
- [投稿スクリプト設定](./post-script.md) - 投稿スクリプトパラメータの設定
- [フォロースクリプト設定](./follow-script.md) - フォロースクリプトパラメータの設定
- [アンフォロースクリプト設定](./unfollow-script.md) - アンフォロースクリプトパラメータの設定
