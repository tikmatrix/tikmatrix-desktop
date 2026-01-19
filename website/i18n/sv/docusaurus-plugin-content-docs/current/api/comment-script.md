---
sidebar_position: 5
title: Konfiguration av comment-script
description: Komplett konfigurationsreferens för comment-scriptet
---

Den här sidan dokumenterar konfigurationsparametrarna för `comment`-scriptet som används vid skapande av uppgifter.

## Översikt

`comment`-scriptet används för att automatiskt posta kommentarer på TikTok- eller Instagram-inlägg. När du tillhandahåller flera målinläggs-URL:er via API skapas **en uppgift per målinläggs-URL**. Du kan styra när varje uppgift körs genom att använda parametern `start_time`.

## Scriptkonfiguration (`script_config`)

Objektet `script_config` innehåller parametrarna för comment-scriptet. Nedan finns tillgängliga parametrar:

### Parametrar

| Parameter | Typ | Krävs | Standard | Beskrivning |
|-----------|------|----------|---------|-------------|
| target_post_urls | string[] | Ja* | [] | Array av målinläggs-URL:er att kommentera på (en uppgift per URL) |
| target_post_url | string | Ja* | "" | Enskild målinläggs-URL eller flera URL:er separerade med radbrytningar/kommatecken |
| comment_content | string | Ja | "" | Kommentarstextinnehåll. Kan innehålla flera kommentarer separerade med radbrytningar |
| comment_order | string | Nej | "random" | Hur kommentarer väljs: `random` eller `sequential` |
| insert_emoji | boolean | Nej | false | Om slumpmässiga emoji ska infogas i kommentaren |
| comment_image_path | string | Nej | "" | Sökväg till bildfil för bildkommentar (endast TikTok). Stöder absolut sökväg eller relativ sökväg till work_dir/upload/ |

:::note
Antingen `target_post_urls`-array eller `target_post_url`-sträng måste anges. Om båda anges har `target_post_urls` prioritet.
:::

:::tip Bildkommentar (endast TikTok)
Parametern `comment_image_path` gör det möjligt att bifoga en bild till din kommentar. Denna funktion **stöds endast på TikTok** - Instagram-kommentarer stöder inte bildbilagor. Bilden kommer att skickas till enheten och väljas som den första bilden i galleriet.
:::

:::info Uppgiftsskapande
När flera målinläggs-URL:er tillhandahålls skapar API:et **en uppgift per målinläggs-URL**. Till exempel, om du anger 3 inläggs-URL:er och 2 enheter kommer 6 uppgifter att skapas. Använd parametern `start_time` för att styra när uppgifter börjar köras.
:::

## Exempel

### Kommentera på ett enskilt inlägg

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Great content! 🔥"
    }
  }'
```

### Kommentera med flera kommentarsalternativ

Tillhandahåll flera kommentarer separerade med radbrytningar. Systemet kommer att välja en baserat på `comment_order`:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Amazing video!\nLove this content!\nKeep it up! 👏\nThis is so good!",
      "comment_order": "random"
    }
  }'
```

### Kommentera på flera inlägg

När flera inlägg kommenteras skapas en uppgift per inlägg:

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
      "comment_content": "Great video!\nAwesome!\nLove it!",
      "comment_order": "sequential"
    }
  }'
```

Detta skapar 3 separata uppgifter som körs omedelbart.

### Schemalägg kommentarer med starttid

Använd `start_time` för att schemalägga när uppgifter ska starta:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Scheduled comment!"
    },
    "start_time": "14:30"
  }'
```

### Kommentera med emoji-infogning

Aktivera automatisk emoji-infogning för att göra kommentarer mer engagerande:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "This is amazing",
      "insert_emoji": true
    }
  }'
```

### Kommentera efter användarnamnslista

Skapa kommentarsuppgifter direkt för specifika konton:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["@my_account1", "@my_account2"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@target/video/123",
      "comment_content": "Nice video!"
    }
  }'
```

### Batch-kommentera på flera enheter

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_1", "device_2", "device_3"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@viral/video/999",
      "comment_content": "Great content!\nAmazing work!\nLove this!",
      "comment_order": "random"
    },
    "enable_multi_account": true
  }'
```

### Instagram-kommentarsexempel

Samma API fungerar för Instagram-inlägg:

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.instagram.com/p/ABC123/",
      "comment_content": "Beautiful photo! 📸",
      "insert_emoji": true
    }
  }'
```

### TikTok-bildkommentarsexempel

Bifoga en bild till din TikTok-kommentar (stöds inte på Instagram):

```bash
curl -X POST http://localhost:50809/api/v1/task \
  -H "Content-Type: application/json" \
  -d '{
    "serials": ["device_serial_1"],
    "script_name": "comment",
    "script_config": {
      "target_post_url": "https://www.tiktok.com/@username/video/1234567890",
      "comment_content": "Check out this image!",
      "comment_image_path": "C:/images/my_image.jpg"
    }
  }'
```

:::info Bildsökväg
`comment_image_path` kan vara:

- **Absolut sökväg**: `C:/images/my_image.jpg` eller `/home/user/images/my_image.jpg`
- **Relativ sökväg**: `my_image.jpg` (relativ till `work_dir/upload/`)

:::

## Svar

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

## Kommentarsordning

### Slumpmässig ordning (`random`)

- Väljer slumpmässigt en kommentar från den tillhandahållna listan
- Bra för att få kommentarer att verka mer naturliga
- Standardbeteende

### Sekventiell ordning (`sequential`)

- Väljer kommentarer i ordning baserat på `job_count`
- Första uppgiften använder första kommentaren, andra uppgiften använder andra kommentaren, etc.
- Återgår till början när slutet av listan nås
- Bra för att distribuera olika kommentarer över flera uppgifter

## Inläggs-URL-format

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

## Bästa praxis

1. **Variera dina kommentarer**: Tillhandahåll flera kommentarsalternativ för att undvika att verka spammig.

2. **Använd sekventiell ordning för variation**: När du kommenterar på flera inlägg med samma enhet, använd `sequential`-ordning för att distribuera olika kommentarer.

3. **Aktivera emoji-infogning**: Sätt `insert_emoji: true` för att få kommentarer att verka mer naturliga och engagerande.

4. **Schemalägg uppgifter**: Använd parametern `start_time` för att sprida ut kommentarer över tid och minska risken för hastighetsbegränsning.

5. **Respektera plattformsgränser**: Skapa inte för många kommentarsuppgifter samtidigt. De flesta plattformar har hastighetsgränser för kommentering.

## Felkoder

| Kod | Beskrivning |
|------|-------------|
| 40001 | Saknar målinläggs-URL eller kommentarsinnehåll |
| 40003 | Script stöds inte via API |
| 40301 | API-åtkomst kräver Pro+ plan |

## Se även

- [API för uppgiftshantering](./task-management.md) - Skapa, lista och hantera uppgifter
- [Konfiguration av post-script](./post-script.md) - Konfigurera parametrar för post-script
- [Konfiguration av follow-script](./follow-script.md) - Konfigurera parametrar för follow-script
- [Översikt över lokalt API](./local-api.md) - API-översikt och snabbstart
