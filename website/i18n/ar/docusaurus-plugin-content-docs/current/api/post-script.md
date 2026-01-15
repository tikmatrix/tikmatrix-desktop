---
sidebar_position: 3
title: تكوين برنامج النشر النصي
description: مرجع التكوين الكامل لبرنامج النشر النصي
---

本页面记录了إنشاء المهام中استخدام的 `post` النصي المستخدم في إنشاء المهام.

## نظرة عامة

`post` يُستخدم البرنامج النصي لنشر المحتوى تلقائيًا (فيديو أو صور) على TikTok أو Instagram。يدعم طرق نشر متعددة ومصادر مواد وخيارات صوتية.

## تكوين البرنامج النصي (`script_config`)

`script_config` يحتوي كائنالنشر脚本的المعاملات。فيما يلينعم可用المعاملات：

### المعاملات العامة（TikTok 和 Instagram）

| المعاملات | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| content_type | عدد صحيح | لا | 0 | نوع المحتوى：`0` = فيديو，`1` = صور |
| image_count | عدد صحيح | لا | 1 | عدد الصور المراد اختيارها（عندما content_type = 1 时） |
| captions | نص | لا | "" | نص عنوان المنشور. يدعم تنسيق spintax:`{选项1\|选项2\|选项3}` |
| post_way | نص | لا | "share" | طريقة النشر：`share`、`addButton` أو `useSound` |
| material_source | نص | لا | "materialLibrary" | مصدر المواد：`materialLibrary`（مكتبة المواد）أو `localFolder`（مجلد محلي），إذا تم توفير material_list يتم تجاهل هذا المعامل |
| material_path | نص | مطلوب بشروط | "" | مسار المجلد المحلي（عندما material_source = "localFolder" مطلوب） |
| material_list | نص[] | لا | [] | **تمرير مصفوفة مسارات ملفات المواد مباشرة.** عند توفير هذا المعامل، سيتم تخطي منطق material_source 和 material_path . موصى به لسيناريوهات أتمتة API. |
| materials_tags | نص | لا | "" | علامات المواد مفصولة بفواصل للتصفية من مكتبة المواد |
| upload_wait_time | عدد صحيح | لا | 30 | الثواني للانتظار حتى يكتمل التحميل |
| sound_wait_time | عدد صحيح | لا | 10 | الثواني للانتظار حتى يتم تحميل الصوت |
| add_sound | نص/عدد صحيح | لا | "-1" | 音频الخيارات：`-1` = 默认，`0` = 禁用，`1` = 启用，`custom` = استخدام自定义音频 |
| sound_name | نص | مطلوب بشروط | "" | 音频名称/URL（عندما post_way = "useSound" مطلوب） |
| custom_sound_keyword | نص | مطلوب بشروط | "" | بحث自定义音频的关键词（عندما add_sound = "custom" مطلوب） |
| origin_sound_volume | عدد صحيح | لا | 50 | 原始音频音量（0-100） |
| add_sound_volume | عدد صحيح | لا | 50 | 添加音频音量（0-100） |

### TikTok 专属المعاملات

| المعاملات | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| add_product_link | عدد صحيح | لا | 0 | 添加商品链接：`0` = لا，`1` = نعم |

### Instagram 专属المعاملات

| المعاملات | النوع | مطلوب | القيمة الافتراضية | الوصف |
|------|------|------|--------|------|
| placement | نص | لا | "reel" | النشر位置：`reel`（快拍）أو `story`（故事） |

## أمثلة

### 基础النشر任务 - 直接传递素材路径

这نعم API 自动化的موصى به方式 - 直接传递素材文件路径，无需依赖مكتبة الموادأو文件夹扫描：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### استخداممكتبة الموادالنشر（TikTok）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "热门, 舞蹈",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### 通过用户名列表创建النشر任务

此模式允许您لإنشاء مهام مباشرة لحسابات محددة，无需知道它们的设备序列号：

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "看看我的新视频！#热门 #推荐",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### استخداممجلد محليالنشر（Instagram）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "精彩内容！#instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### استخدام自定义音频النشر

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "跟着这首热门音乐跳舞！",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "热门舞曲 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### استخدام指定音频 URL النشر

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "使用这个超棒的音乐！",
      "material_source": "materialLibrary"
    }
  }'
```

### النشرصور（轮播图）

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "看看这些照片！#图集",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## 响应

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

## 相关文档

- [API إدارة المهام](./task-management.md) - 创建、列表和管理任务
