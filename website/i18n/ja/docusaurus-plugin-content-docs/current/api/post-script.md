---
sidebar_position: 3
title: 投稿スクリプト設定
description: 投稿スクリプトの完全な設定リファレンス
---

このページでは、タスク作成に使用される `post` スクリプトの設定パラメータについて説明します。

## 概要

`post` スクリプトは、TikTok または Instagram にコンテンツ（動画または画像）を自動的に公開するために使用されます。さまざまな投稿方法、素材ソース、サウンドオプションをサポートしています。

## スクリプト設定 (`script_config`)

`script_config` オブジェクトには、投稿スクリプトのパラメータが含まれます。以下は利用可能なパラメータです：

### 共通パラメータ（TikTok と Instagram）

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| content_type | integer | いいえ | 0 | コンテンツタイプ：`0` = 動画、`1` = 画像 |
| image_count | integer | いいえ | 1 | 選択する画像の数（content_type = 1 の場合） |
| captions | string | いいえ | "" | 投稿のキャプションテキスト。スピンタックス形式をサポート：`{option1\|option2\|option3}` |
| post_way | string | いいえ | "share" | 投稿方法：`share`、`addButton`、または `useSound` |
| material_source | string | いいえ | "materialLibrary" | 素材ソース：`materialLibrary` または `localFolder`（material_list が提供されている場合は無視） |
| material_path | string | 条件付き | "" | ローカルフォルダパス（material_source = "localFolder" の場合必須） |
| material_list | string[] | いいえ | [] | **直接素材ファイルパス配列。** 提供された場合、material_source と material_path のロジックをバイパスします。API 自動化に最適。 |
| materials_tags | string | いいえ | "" | ライブラリからフィルタリングするためのカンマ区切りの素材タグ |
| upload_wait_time | integer | いいえ | 30 | アップロード完了を待つ秒数 |
| sound_wait_time | integer | いいえ | 10 | サウンド読み込みを待つ秒数 |
| add_sound | string/integer | いいえ | "-1" | サウンドオプション：`-1` = デフォルト、`0` = 無効、`1` = 有効、`custom` = カスタムサウンドを使用 |
| sound_name | string | 条件付き | "" | サウンド名/URL（post_way = "useSound" の場合必須） |
| custom_sound_keyword | string | 条件付き | "" | カスタムサウンドを検索するキーワード（add_sound = "custom" の場合必須） |
| origin_sound_volume | integer | いいえ | 50 | オリジナルサウンドボリューム（0-100） |
| add_sound_volume | integer | いいえ | 50 | 追加サウンドボリューム（0-100） |

### TikTok 固有のパラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| add_product_link | integer | いいえ | 0 | 商品リンクを追加：`0` = いいえ、`1` = はい |

### Instagram 固有のパラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| placement | string | いいえ | "reel" | 投稿配置：`reel` または `story` |

## 例

### 直接素材リストを使用した基本的な投稿タスク

これは API 自動化の推奨アプローチです - 素材ライブラリやフォルダスキャンに依存せずに素材パスを直接渡します：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "新しい動画をチェック！#バイラル #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### 素材ライブラリを使用した投稿タスク（TikTok）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "新しい動画をチェック！#バイラル #fyp",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "トレンド, ダンス",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### ユーザー名リストによる投稿タスク

このモードでは、デバイスのシリアル番号を知らなくても、特定のアカウント用に直接タスクを作成できます：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "新しい動画をチェック！#バイラル #fyp",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### ローカルフォルダを使用した投稿タスク（Instagram）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "素晴らしいコンテンツ！#instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### カスタムサウンドを使用した投稿

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "このトレンドサウンドに合わせて踊る！",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "トレンドダンス 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### 特定のサウンド URL を使用した投稿

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "この素晴らしいサウンドを使用！",
      "material_source": "materialLibrary"
    }
  }'
```

### 画像投稿（カルーセル）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "これらの写真をチェック！#フォトカルーセル",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## レスポンス

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

## 関連項目

- [タスク管理 API](./task-management.md) - タスクの作成、リスト、管理
