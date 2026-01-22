---
sidebar_position: 5
title: アンフォロースクリプト設定
description: アンフォロースクリプトの完全な設定リファレンス
---

このページでは、タスク作成に使用される `unfollow` スクリプトの設定パラメータについて説明します。

## 概要

`unfollow` スクリプトは、TikTok または Instagram でユーザーを自動的にアンフォローするために使用されます。API 経由で複数のターゲットユーザーを提供すると、**ターゲットユーザーごとに1つのタスクが作成されます**。`start_time` パラメータを使用して、各タスクの実行時刻を制御できます。

## スクリプト設定 (`script_config`)

`script_config` オブジェクトには、アンフォロースクリプトのパラメータが含まれます。以下は利用可能なパラメータです：

### パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|------|----------|---------|-------------|
| target_users | string[] | はい* | [] | アンフォローするターゲットユーザー名の配列（ユーザーごとに1つのタスク） |
| target_user | string | はい* | "" | 単一のターゲットユーザー名、または改行/カンマで区切られた複数のユーザー名 |
| access_method | string | いいえ | "direct" | ユーザープロフィールへのナビゲーション方法：`direct`（URL 経由）または `search` |

:::note
`target_users` 配列または `target_user` 文字列のいずれかを提供する必要があります。両方が提供された場合、`target_users` が優先されます。
:::

:::info タスク作成
複数のターゲットユーザーが提供された場合、API は**ターゲットユーザーごとに1つのタスクを作成**します。たとえば、3人のターゲットユーザーと2つのデバイスを指定すると、6つのタスクが作成されます。`start_time` パラメータを使用して、タスクの開始実行時刻を制御します。
:::

## 例

### 単一ユーザーのアンフォロー

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@username_to_unfollow"],
      "access_method": "direct"
    }
  }'
```

### 複数ユーザーのアンフォロー

複数のユーザーをアンフォローする場合、ユーザーごとに1つのタスクが作成されます：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
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
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@user1", "@user2"],
      "access_method": "direct"
    },
    "start_time": "14:30"
  }'
```

### 検索メソッド経由でのユーザーアンフォロー

直接 URL アクセスが機能しない場合は、検索メソッドを使用：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["username1", "username2"],
      "access_method": "search"
    }
  }'
```

### 複数デバイスでの一括アンフォロー

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "unfollow",
    "script_config": {
      "target_users": ["@old_account"],
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

3. **賢く一括処理**：一度に多くのユーザーをアンフォローしないでください。システムはターゲットユーザーごとに1つのタスクを作成するため、大きなリストは多くのタスクを生成します。

## 関連項目

- [タスク管理 API](./task-management.md) - タスクの作成、リスト、管理
- [投稿スクリプト設定](./post-script.md) - 投稿スクリプトパラメータの設定
- [フォロースクリプト設定](./follow-script.md) - フォロースクリプトパラメータの設定
