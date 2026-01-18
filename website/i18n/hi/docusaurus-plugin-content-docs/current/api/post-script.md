---
sidebar_position: 3
title: Post स्क्रिप्ट कॉन्फ़िगरेशन
description: Post स्क्रिप्ट के लिए पूर्ण कॉन्फ़िगरेशन संदर्भ
---

यह पृष्ठ कार्य निर्माण में उपयोग की जाने वाली `post` स्क्रिप्ट के कॉन्फ़िगरेशन पैरामीटर दस्तावेजित करता है।

## अवलोकन

`post` स्क्रिप्ट का उपयोग TikTok या Instagram पर सामग्री (वीडियो या चित्र) स्वचालित रूप से प्रकाशित करने के लिए किया जाता है। यह कई प्रकाशन विधियों, सामग्री स्रोतों और ऑडियो विकल्पों का समर्थन करता है।

## स्क्रिप्ट कॉन्फ़िगरेशन (`script_config`)

`script_config` ऑब्जेक्ट में प्रकाशन स्क्रिप्ट के लिए पैरामीटर होते हैं। निम्नलिखित उपलब्ध पैरामीटर हैं:

### सामान्य पैरामीटर (TikTok और Instagram)

| पैरामीटर | प्रकार | आवश्यक | डिफ़ॉल्ट मान | विवरण |
|------|------|------|--------|------|
| content_type | integer | नहीं | 0 | सामग्री प्रकार: `0` = वीडियो, `1` = चित्र |
| image_count | integer | नहीं | 1 | चयन करने के लिए चित्रों की संख्या (जब content_type = 1) |
| captions | string | नहीं | "" | पोस्ट शीर्षक पाठ। spintax प्रारूप समर्थित: `{विकल्प1\|विकल्प2\|विकल्प3}` |
| post_way | string | नहीं | "share" | प्रकाशन विधि: `share`, `addButton` या `useSound` |
| material_source | string | नहीं | "materialLibrary" | सामग्री स्रोत: `materialLibrary` (सामग्री लाइब्रेरी) या `localFolder` (स्थानीय फ़ोल्डर), यदि material_list प्रदान की गई है तो इस पैरामीटर को अनदेखा किया जाता है |
| material_path | string | सशर्त आवश्यक | "" | स्थानीय फ़ोल्डर पथ (जब material_source = "localFolder" तो आवश्यक) |
| material_list | string[] | नहीं | [] | **सीधे सामग्री फ़ाइल पथों की सरणी पास करें।** इस पैरामीटर को प्रदान करते समय, material_source और material_path के लॉजिक को छोड़ दिया जाएगा। API स्वचालन परिदृश्यों के लिए अनुशंसित। |
| materials_tags | string | नहीं | "" | सामग्री लाइब्रेरी से फ़िल्टर करने के लिए अल्पविराम से अलग किए गए सामग्री टैग |
| upload_wait_time | integer | नहीं | 30 | अपलोड पूर्ण होने की प्रतीक्षा करने के लिए सेकंड |
| sound_wait_time | integer | नहीं | 10 | ऑडियो लोड होने की प्रतीक्षा करने के लिए सेकंड |
| add_sound | string/integer | नहीं | "-1" | ऑडियो विकल्प: `-1` = डिफ़ॉल्ट, `0` = अक्षम, `1` = सक्षम, `custom` = कस्टम ऑडियो का उपयोग करें |
| sound_name | string | सशर्त आवश्यक | "" | ऑडियो नाम/URL (जब post_way = "useSound" तो आवश्यक) |
| custom_sound_keyword | string | सशर्त आवश्यक | "" | कस्टम ऑडियो खोजने के लिए कीवर्ड (जब add_sound = "custom" तो आवश्यक) |
| origin_sound_volume | integer | नहीं | 50 | मूल ऑडियो वॉल्यूम (0-100) |
| add_sound_volume | integer | नहीं | 50 | जोड़ा गया ऑडियो वॉल्यूम (0-100) |

### TikTok विशिष्ट पैरामीटर

| पैरामीटर | प्रकार | आवश्यक | डिफ़ॉल्ट मान | विवरण |
|------|------|------|--------|------|
| add_product_link | integer | नहीं | 0 | उत्पाद लिंक जोड़ें: `0` = नहीं, `1` = हां |

### Instagram विशिष्ट पैरामीटर

| पैरामीटर | प्रकार | आवश्यक | डिफ़ॉल्ट मान | विवरण |
|------|------|------|--------|------|
| placement | string | नहीं | "reel" | प्रकाशन स्थान: `reel` (रील) या `story` (स्टोरी) |

## उदाहरण

### मूल प्रकाशन कार्य - सीधे सामग्री पथ पास करें

यह API स्वचालन के लिए अनुशंसित तरीका है - सामग्री फ़ाइल पथ सीधे पास करें, सामग्री लाइब्रेरी या फ़ोल्डर स्कैनिंग पर निर्भर होने की आवश्यकता नहीं:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "मेरा नया वीडियो देखें! #trending #recommended",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### सामग्री लाइब्रेरी का उपयोग करके प्रकाशित करें (TikTok)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1", "device_serial_2"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "मेरा नया वीडियो देखें! #trending #recommended",
      "post_way": "share",
      "material_source": "materialLibrary",
      "materials_tags": "trending, dance",
      "upload_wait_time": 60,
      "add_sound": "-1"
    },
    "enable_multi_account": false
  }'
```

### उपयोगकर्ता नाम सूची के माध्यम से प्रकाशन कार्य बनाएं

यह मोड आपको उनके डिवाइस सीरियल नंबर जाने बिना सीधे विशिष्ट खातों के लिए कार्य बनाने की अनुमति देता है:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@user1", "@user2", "@user3"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "मेरा नया वीडियो देखें! #trending #recommended",
      "material_list": [
        "C:/Videos/video1.mp4"
      ],
      "upload_wait_time": 60
    }
  }'
```

### स्थानीय फ़ोल्डर का उपयोग करके प्रकाशित करें (Instagram)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "शानदार सामग्री! #instagram #reels",
      "post_way": "addButton",
      "placement": "reel",
      "material_source": "localFolder",
      "material_path": "C:/Videos/instagram",
      "upload_wait_time": 45
    },
    "enable_multi_account": true
  }'
```

### कस्टम ऑडियो के साथ प्रकाशित करें

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 0,
      "captions": "इस ट्रेंडिंग म्यूजिक के साथ डांस करें!",
      "post_way": "share",
      "add_sound": "custom",
      "custom_sound_keyword": "trending dance 2024",
      "origin_sound_volume": 30,
      "add_sound_volume": 70,
      "material_source": "materialLibrary",
      "upload_wait_time": 60
    }
  }'
```

### निर्दिष्ट ऑडियो URL के साथ प्रकाशित करें

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "post_way": "useSound",
      "sound_name": "https://www.tiktok.com/music/original-sound-7123456789",
      "captions": "इस शानदार म्यूजिक का उपयोग करें!",
      "material_source": "materialLibrary"
    }
  }'
```

### चित्र प्रकाशित करें (कैरोसेल)

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "post",
    "script_config": {
      "content_type": 1,
      "image_count": 5,
      "captions": "ये तस्वीरें देखें! #photoset",
      "material_source": "localFolder",
      "material_path": "C:/Images/carousel",
      "upload_wait_time": 45
    }
  }'
```

## प्रतिक्रिया

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

## संबंधित दस्तावेज़

- [कार्य प्रबंधन API](./task-management.md) - कार्यों को बनाएं, सूचीबद्ध करें और प्रबंधित करें
