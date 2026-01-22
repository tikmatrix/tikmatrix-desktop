---
sidebar_position: 4
title: フォロースクリプト設定
description: フォロースクリプトの完全な設定リファレンス
---

このページでは、タスク作成に使用される `follow` スクリプトの設定パラメータについて説明します。

## 概要

`follow` スクリプトは、TikTok または Instagram でユーザーを自動的にフォローするために使用されます。API 経由で複数のターゲットユーザーを提供すると、**ターゲットユーザーごとに1つのタスクが作成されます**。`start_time` パラメータを使用して、各タスクの実行時刻を制御できます。

## スクリプト設定 (`script_config`)

`script_config` オブジェクトには、フォロースクリプトのパラメータが含まれます。以下は利用可能なパラメータです：

### パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| target_users | string[] | はい* | [] | フォローするターゲットユーザー名の配列（ユーザーごとに1つのタスク） |
| target_user | string | はい* | "" | 単一のターゲットユーザー名、または改行/カンマで区切られた複数のユーザー名 |
| access_method | string | いいえ | "direct" | ユーザープロフィールへのナビゲーション方法：`direct`（URL 経由）または `search` |

:::note
`target_users` 配列または `target_user` 文字列のいずれかを提供する必要があります。両方が提供された場合、`target_users` が優先されます。
:::

:::info タスク作成
複数のターゲットユーザーが提供された場合、API は**ターゲットユーザーごとに1つのタスクを作成**します。たとえば、3人のターゲットユーザーと2つのデバイスを指定すると、6つのタスクが作成されます。`start_time` パラメータを使用して、タスクの開始実行時刻を制御します。
:::

## 例

### 単一ユーザーのフォロー

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@username_to_follow"],
      "access_method": "direct"
    }
  }'
```

### 複数ユーザーのフォロー

複数のユーザーをフォローする場合、ユーザーごとに1つのタスクが作成されます：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2", "@user3"],
      "access_method": "direct"
    }
  }'
```

これにより、すぐに実行される3つの個別タスクが作成されます。

### 開始時刻を使用したタスクのスケジュール

`start_time` を使用して、タスクの開始時刻をスケジュール：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### 検索メソッド経由でのユーザーフォロー

直接 URL アクセスが機能しない場合は、検索メソッドを使用：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### ユーザー名リストモードでのユーザーフォロー

特定のアカウント用にフォロータスクを直接作成：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@target_user"],
      "access_method": "direct"
    }
  }'
```

### 複数デバイスでの一括フォロー

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "follow",
    "script_config": {
      "target_users": ["@influencer_account"],
      "access_method": "direct"
    },
    "enable_multi_account": true
  }'
```

## レスポンス

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_ids": [201, 202, 203],
    "created_count": 3
  }
}
```

## アクセス方法

### 直接メソッド (`direct`)

- URL 経由でユーザープロフィールを開く：`tiktok.com/@username` または `instagram.com/username`
- より速く、より信頼性が高い
- ほとんどのユースケースで推奨

### 検索メソッド (`search`)

- 検索に移動し、ユーザー名を入力し、結果をクリック
- より遅いが、直接 URL アクセスがブロックされている場合に機能
- 類似したユーザー名が複数存在する場合、精度が低い可能性があります

## ベストプラクティス

1. **スケジュールに start_time を使用**：`start_time` パラメータを使用して、タスクの実行時刻をスケジュールします（形式："HH:MM"）。

2. **直接アクセスを優先**：`direct` アクセスメソッドは `search` よりも高速で信頼性が高いです。

3. **賢く一括処理**：一度に多くのユーザーをフォローしないでください。システムはターゲットユーザーごとに1つのタスクを作成するため、大きなリストは多くのタスクを生成します。

## 関連項目

- [タスク管理 API](./task-management.md) - タスクの作成、リスト、管理
- [投稿スクリプト設定](./post-script.md) - 投稿スクリプトパラメータの設定
- [アンフォロースクリプト設定](./unfollow-script.md) - アンフォロースクリプトパラメータの設定
