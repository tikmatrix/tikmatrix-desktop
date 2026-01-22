---
sidebar_position: 2
title: タスク管理 API
description: タスク管理エンドポイントの完全な API リファレンス
---

このページでは、TikMatrix でタスクを管理するための利用可能なすべての API エンドポイントについて説明します。

## タスクの作成

1つまたは複数のデバイスまたはユーザー名用の新しいタスクを作成します。

- **エンドポイント：** `POST /api/v1/task`
- **Content-Type：** `application/json`

### リクエストパラメータ

API はタスク作成の2つのモードをサポートしています：

**モード 1：デバイスベース** - `serials` を使用してデバイス用のタスクを作成
**モード 2：ユーザー名ベース** - `usernames` を使用して特定のアカウント用のタスクを直接作成

| パラメータ | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| serials | string[] | 条件付き | デバイスシリアル番号の配列（`usernames` が提供されていない場合は必須） |
| usernames | string[] | 条件付き | タスクを作成するユーザー名の配列（`serials` が提供されていない場合は必須）。提供された場合、これらのアカウント用にタスクが直接作成されます。 |
| script_name | string | はい | 実行するスクリプトの名前 |
| script_config | object | はい | スクリプトの設定パラメータ（スクリプト固有のドキュメントを参照） |
| enable_multi_account | boolean | いいえ | マルチアカウントモードを有効にする（デフォルト：false）。デバイスベースモードでのみ適用。 |
| start_time | string | いいえ | "HH:MM" 形式のスケジュールされた開始時刻 |

### サポートされているスクリプト

| スクリプト名 | 説明 | ドキュメント |
|-------------|-------------|---------------|
| post | TikTok/Instagram に動画または画像を公開 | [投稿スクリプト設定](./post-script.md) |
| follow | ユーザーをフォローまたはアンフォロー | [フォロースクリプト設定](./follow-script.md) |

### 例

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "新しい動画をチェック！#バイラル #fyp",
      "material_list": ["C:/Videos/video1.mp4"],
      "upload_wait_time": 60
    }
  }'
```

詳細な `script_config` パラメータとその他の例については、[投稿スクリプト設定](./post-script.md) および [フォロースクリプト設定](./follow-script.md) を参照してください。

### レスポンス

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [101, 102],
    "created_count": 2
  }
}
```

## タスクのリスト

オプションのフィルタを使用してタスクをクエリします。

- **エンドポイント：** `GET /api/v1/task`

| パラメータ | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| status | integer | いいえ | ステータスでフィルタ（0=pending、1=running、2=completed、3=failed） |
| serial | string | いいえ | デバイスシリアルでフィルタ |
| script_name | string | いいえ | スクリプト名でフィルタ |
| source | string | いいえ | ソースでフィルタ（"ui" または "api"） |
| page | integer | いいえ | ページ番号（デフォルト：1） |
| page_size | integer | いいえ | ページあたりのアイテム数（デフォルト：20、最大：100） |

## タスクの詳細を取得

特定のタスクに関する詳細情報を取得します。

- **エンドポイント：** `GET /api/v1/task/{task_id}`

## タスクの削除

タスクを削除します。タスクが実行中の場合、最初に停止されます。

- **エンドポイント：** `DELETE /api/v1/task/{task_id}`

## タスクの一括削除

複数のタスクを一度に削除します。実行中のタスクは最初に停止されます。

- **エンドポイント：** `DELETE /api/v1/task/batch`
- **ボディ：** `{ "task_ids": [1, 2, 3] }`

## タスクの停止

実行中のタスクを停止します。

- **エンドポイント：** `POST /api/v1/task/{task_id}/stop`

## 失敗したタスクの再試行

失敗したタスクを再試行します。

- **エンドポイント：** `POST /api/v1/task/{task_id}/retry`

## すべての失敗したタスクの再試行

すべての失敗したタスクを一度に再試行します。

- **エンドポイント：** `POST /api/v1/task/retry-all`

## タスク統計の取得

すべてのタスクに関する統計を取得します。

- **エンドポイント：** `GET /api/v1/task/stats`
- **レスポンス：** total、pending、running、completed、failed のカウントを返します。

## API ライセンスの確認

ライセンスが API アクセスをサポートしているか確認します。

- **エンドポイント：** `GET /api/v1/license/check`
- **注意：** Starter プランはエラーコード 40301 を返します。Pro、Team、Business プランは API アクセスがあります。
