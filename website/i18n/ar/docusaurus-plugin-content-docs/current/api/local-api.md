---
sidebar_position: 1
title: API المحلي 概览
description: TikMatrix API المحلي，用于以编程方式管理任务
---

TikMatrix 提供了一个本地的 RESTful API，允许你以编程方式管理任务。这对于将 TikMatrix 集成到你自己的自动化系统、构建自定义工作流程أو创建批量操作非常有用。

## 要求

:::warning 许可证要求
**API المحلي 仅对 Pro、Team 和 Business 计划用户开放。** Starter 计划不提供 API 访问权限。
:::

## 基础 URL

API 在本机运行，地址为：

```text
http://localhost:50809/api/v1/
```

:::note
端口 `50809` 为默认端口。请在发起请求前确保 TikMatrix 已在运行。
:::

## 响应格式

所有 API 响应遵循فيما يلي格式：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### 响应码الوصف

| Code | الوصف |
|------|------|
| 0 | 成功 |
| 40001 | المعاملات错误 - 无效的معاملات الطلب |
| 40002 | المعاملات错误 - 缺少 script_name |
| 40003 | المعاملات错误 - 脚本暂不支持 API 调用 |
| 40301 | 禁止 - API 访问需要 Pro+ 计划 |
| 40401 | 未找到 - 资源不存在 |
| 50001 | 服务器内部错误 |

## 快速开始

### 1. 检查 API 访问权限

首先，确认你的许可证نعملا支持 API：

```bash
curl http://localhost:50809/api/v1/license/check
```

أمثلة响应：

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

### 2. إنشاء مهمة

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "captions": "看看我的新视频！#热门"
    },
    "enable_multi_account": false
  }'
```

### 3. 查询任务列表

```bash
curl http://localhost:50809/api/v1/task?status=0&page=1&page_size=20
```

## 可用脚本

:::info عندما前支持
目前，API المحلي 支持 `post`、`follow`、`unfollow`、`account_warmup` 和 `comment` 脚本。更多脚本将在未来版本中陆续添加。
:::

`script_name` المعاملات可接受下列值：

| 脚本名 | الوصف | API 支持 |
|--------|------|----------|
| `post` | النشر内容 | ✅ 已支持 |
| `follow` | 关注用户 | ✅ 已支持 |
| `unfollow` | 取消关注 | ✅ 已支持 |
| `account_warmup` | تدفئة الحساب | ✅ 已支持 |
| `comment` | 评论 | ✅ 已支持 |
| `like` | 点赞 | 🔜 قريبًا |
| `message` | 私信 | 🔜 قريبًا |
| `super_marketing` | التسويق الفائق活动 | 🔜 قريبًا |
| `profile` | 更新个人资料 | 🔜 قريبًا |
| `scrape_user` | 抓取用户数据 | 🔜 قريبًا |

## 任务状态

| 状态码 | 状态文本 | الوصف |
|--------|----------|------|
| 0 | pending | 任务等待执行 |
| 1 | running | 任务正在执行 |
| 2 | completed | 任务执行成功 |
| 3 | failed | 任务执行失败 |

## 后续

- [API إدارة المهام](./task-management) - 创建、查询和管理任务
- [النشرتكوين البرنامج النصي](./post-script) - التكوينالنشر脚本المعاملات
- [تكوين برنامج المتابعة النصي](./follow-script) - التكوين关注脚本المعاملات
- [取消تكوين برنامج المتابعة النصي](./unfollow-script) - التكوين取消关注脚本المعاملات
- [تكوين برنامج تدفئة الحساب النصي](./account-warmup-script) - التكوينتدفئة الحساب脚本المعاملات
- [تكوين برنامج التعليقات النصي](./comment-script) - التكوين评论脚本المعاملات
- [أمثلة API](./examples) - 不同语言的代码أمثلة
