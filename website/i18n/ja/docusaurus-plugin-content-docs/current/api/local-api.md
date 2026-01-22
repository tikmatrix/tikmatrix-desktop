---
sidebar_position: 1
title: ローカル API 概要
description: プログラム的なタスク管理のための TikMatrix ローカル API
---

TikMatrix は、プログラム的にタスクを管理できるローカル RESTful API を提供します。これは、TikMatrix を独自の自動化システムと統合したり、カスタムワークフローを構築したり、バッチ操作を作成したりするのに便利です。

## 要件

:::warning ライセンス要件
**ローカル API は Pro、Team、Business プランのサブスクライバーのみが利用できます。** Starter プランには API へのアクセスがありません。
:::

## ベース URL

API はローカルマシン上で実行されます：

```text
http://localhost:50809/api/v1/
```

:::note
ポート `50809` はデフォルトポートです。API リクエストを行う前に TikMatrix が実行されていることを確認してください。
:::

## レスポンス形式

すべての API レスポンスは次の形式に従います：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### レスポンスコード

| コード | 説明 |
|------|-------------|
| 0 | 成功 |
| 40001 | 不正なリクエスト - 無効なパラメータ |
| 40002 | 不正なリクエスト - script_name が不足 |
| 40003 | 不正なリクエスト - API 経由でサポートされていないスクリプト |
| 40301 | 禁止 - API アクセスには Pro+ プランが必要 |
| 40401 | 見つかりません - リソースが見つかりません |
| 50001 | 内部サーバーエラー |

## クイックスタート

### 1. API アクセスの確認

まず、ライセンスが API アクセスをサポートしているか確認します：

```bash
curl http://localhost:50809/api/v1/license/check
```

レスポンス：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "plan_name": "Pro",
    "api_enabled": true,
    "device_limit": 20,
    "message": "API access enabled"
  }
}
```

### 2. タスクの作成

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "新しい動画をチェック！#バイラル"
    },
    "enable_multi_account": false,
    "start_time": "14:30"
  }'
```

### 3. タスクのリスト

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## 利用可能なスクリプト

`script_name` パラメータは次の値を受け入れます：

| スクリプト名 | 説明 | API サポート |
|-------------|-------------|-------------|
| `post` | コンテンツを公開 | ✅ サポート済み |
| `follow` | ユーザーをフォロー | ✅ サポート済み |
| `unfollow` | ユーザーをアンフォロー | ✅ サポート済み |
| `account_warmup` | アカウントをウォームアップ | ✅ サポート済み |
| `comment` | 投稿にコメント | ✅ サポート済み |
| `like` | 投稿にいいね | 🔜 近日公開 |
| `message` | ダイレクトメッセージを送信 | 🔜 近日公開 |
| `super_marketing` | スーパーマーケティングキャンペーン | 🔜 近日公開 |
| `profile` | プロフィールを更新 | 🔜 近日公開 |
| `scrape_user` | ユーザーデータをスクレイピング | 🔜 近日公開 |

## タスクステータス

| ステータスコード | ステータステキスト | 説明 |
|-------------|-------------|-------------|
| 0 | pending | タスクは実行待ち |
| 1 | running | タスクは現在実行中 |
| 2 | completed | タスクは正常に完了 |
| 3 | failed | タスクは失敗 |

## 次のステップ

- [タスク管理 API](./task-management) - タスクの作成、クエリ、管理
- [投稿スクリプト設定](./post-script) - 投稿スクリプトパラメータの設定
- [フォロースクリプト設定](./follow-script) - フォロースクリプトパラメータの設定
- [アンフォロースクリプト設定](./unfollow-script) - アンフォロースクリプトパラメータの設定
- [アカウントウォームアップスクリプト設定](./account-warmup-script) - アカウントウォームアップスクリプトパラメータの設定
- [コメントスクリプト設定](./comment-script) - コメントスクリプトパラメータの設定
- [API 例](./examples) - さまざまな言語でのコード例
