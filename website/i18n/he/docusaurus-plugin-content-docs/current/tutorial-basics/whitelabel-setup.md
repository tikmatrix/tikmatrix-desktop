---
sidebar_position: 9
---

# הגדרת White Label

:::info דורש מנוי שנתי
פונקציונליות White Label פתוחה רק למשתמשי **מנוי שנתי**. לאחר רכישת תוכנית שנתית, אנא צור קשר עם שירות הלקוחות דרך [Telegram](https://t.me/tikmatrix_agent_bot) כדי לקבל קוד ביטול נעילה.
:::

פונקציונליות White Label מאפשרת לך להתאים אישית את זהות המותג של TikMatrix כך שתתאים לתדמית החברה שלך. ניתן לשנות את שם האפליקציה, הלוגו ומידע המותג כדי ליצור גרסה מותאמת אישית של TikMatrix.

## תכונות

### הגדרות בסיסיות

- **שם אפליקציה**: התאמה אישית של שם התצוגה של האפליקציה
- **העלאת לוגו**: העלאת הלוגו המותאם אישית שלך (מומלץ 128x128px)
- **סמל אתר**: הגדרת סמל מותאם אישית לאפליקציה

### הגדרות מותג

- **אימייל תמיכה**: כתובת אימייל לתמיכת לקוחות
- **קישור מדריכים**: קישור למדריכים/תיעוד מותאם אישית
- **קישור Telegram**: הגדרת קישור לקבוצת או ערוץ Telegram שלך

### מתגי תכונות

- **הצגת קישור למדריכים**: שליטה בהצגת קישור למדריכים
- **הצגת מידע מותג**: שליטה בהצגת מידע המותג

## שיטות הגדרה

### שיטה 1: תצורת ממשק

1. הפעל את אפליקציית TikMatrix
2. לחץ על סמל הפלטה 🎨 בשורת הכותרת
3. הגדר פרמטרים בחלון הגדרות White Label:
   - **שם אפליקציה**: הזן את שם האפליקציה המותאם אישית שלך
   - **לוגו ראשי**: העלה את קובץ הלוגו שלך (PNG/JPG, מומלץ 128x128px)
   - **אימייל תמיכה**: הזן את כתובת אימייל התמיכה שלך
   - **קישור מדריכים**: הזן את קישור המדריכים המותאם אישית שלך
   - **קישור Telegram**: הזן את קישור קבוצת/ערוץ Telegram שלך
   - **מתגי תכונות**: הפעלה/השבתה של הצגת קישור למדריכים ומידע מותג
4. לחץ על "שמור" כדי להחיל את ההגדרות

### שיטה 2: קובץ תצורה

1. העתק את קובץ התצורה לדוגמה:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. ערוך את קובץ התצורה:

   ```json
   {
     "appName": "שם האפליקציה שלך",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. שמור את הקובץ והפעל מחדש את האפליקציה

### שיטה 3: כלי שורת פקודה

1. היכנס לספריית הפרויקט:

   ```bash
   cd tikmatrix-desktop
   ```

2. הפעל את כלי התצורה:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. עקוב אחר ההנחיות כדי להגדיר כל פרמטר שלב אחר שלב

## בניית גרסה מותאמת אישית

### 1. הכנת קבצי משאבים

```bash
# מקם את קובצי הלוגו שלך במיקום הנכון
src/assets/your-logo.webp       # לוגו ראשי
public/your-favicon.ico        # סמל אתר
src-tauri/icons/               # סמלי אפליקציה (גדלים שונים)
```

### 2. הגדרת פרמטרי בנייה

השתמש בכלי שורת הפקודה או ערוך ידנית את התצורה:

```bash
# השתמש בכלי שורת פקודה
node scripts/whitelabel-config.js

# או ערוך ידנית
src/config/whitelabel-build.json
```

### 3. בניית האפליקציה

```bash
# מצב פיתוח
npm run dev

# בנייה לייצור
npm run build

# בניית אפליקציית Tauri
npm run tauri build
```

## עדיפות תצורה

המערכת משתמשת בתצורה לפי סדר עדיפות הבא:

1. **תצורת זמן ריצה**: `whitelabel_config` ב-LocalStorage של הדפדפן
2. **תצורת בנייה**: `src/config/whitelabel-build.json` (משמש בעת בנייה)
3. **תצורת דוגמה**: `examples/whitelabel-config.json`
4. **תצורת ברירת מחדל**: ערכי ברירת מחדל מובנים

## דרישות לוגו

### לוגו ראשי

- **פורמט**: PNG, JPG או SVG
- **גודל**: 128x128px (מומלץ)
- **רקע**: רקע שקוף (פורמט PNG)
- **שימוש**: שורת כותרת, מסך אתחול, חלון אודות

### סמל אתר

- **פורמט**: ICO או PNG
- **גודל**: 32x32px או 16x16px
- **שימוש**: לשונית דפדפן, סמל חלון

### סמלי אפליקציה (לבנייה)

- **פורמט**: PNG, ICO, ICNS
- **גודל**: 32x32, 128x128, 256x256, 512x512
- **מיקום**: ספריית `src-tauri/icons/`

## אינטגרציית API

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// קבלת התצורה הנוכחית
const config = getWhiteLabelConfig();

// שמירת תצורה חדשה
saveWhiteLabelConfig(newConfig);

// איפוס לברירת מחדל
resetWhiteLabelConfig();

// אימות תצורה
validateWhiteLabelConfig(config);
```

### פונקציות עזר

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// אתחול white label בעת הפעלת האפליקציה
initWhiteLabel();

// עדכון כותרת המסמך
updateDocumentTitle('שם האפליקציה שלך');

// עדכון סמל
updateFavicon('/path/to/favicon.ico');
```

## שיטות עבודה מומלצות

### עיצוב לוגו

- השתמש בתמונות ברזולוציה גבוהה לתצוגה ברורה
- שמור על זהות מותג עקבית בכל גדלי הלוגו
- בדוק את הלוגו על רקעים בהירים וכהים
- ודא שהלוגו קריא בגדלים קטנים

### עקביות מותג

- השתמש בצבעים וגופנים עקביים לאורך כל הממשק
- שמור על עקביות עם הנחיות המותג הקיימות שלך
- בדוק את הממשק המותאם אישית בגדלי מסך שונים
- שמור על מראה מקצועי

### תצורת קישורים

- השתמש ב-HTTPS לכל הקישורים החיצוניים
- בדוק את כל הקישורים לפני הפריסה
- ודא שערוצי התמיכה מנוטרים כהלכה
- שמור על עדכניות קישורי התיעוד

## פתרון בעיות

### בעיות נפוצות

**הלוגו לא מוצג:**

- בדוק את נתיב הקובץ והרשאות
- אמת שפורמט התמונה נתמך
- ודא שגודל התמונה מתאים
- נקה את מטמון הדפדפן והפעל מחדש את האפליקציה

**התצורה לא נשמרת:**

- בדוק הרשאות מערכת הקבצים
- אמת שתחביר ה-JSON נכון
- ודא שספריית התצורה קיימת
- נסה להפעיל כמנהל (במידת הצורך)

**כשל בנייה:**

- אמת שכל קבצי המשאבים קיימים
- בדוק תחביר קובץ התצורה
- ודא שפורמט קבצי הסמלים נכון
- עיין ביומני הבנייה לשגיאות ספציפיות

### קבלת עזרה

אם אתה נתקל בבעיות בהגדרת white label:

1. עיין בחלק פתרון הבעיות לעיל
2. בדוק את תחביר קובץ התצורה
3. צור קשר עם התמיכה הטכנית דרך [Telegram](https://t.me/tikmatrix_agent_bot)
4. כלול את קובץ התצורה והודעות השגיאה שלך בעת דיווח על בעיות

## רישיון ושימוש

- פונקציונליות White Label פתוחה רק למשתמשי מנוי שנתי
- זכויות מיתוג מותאם אישית כלולות במנוי שלך
- הפצת גרסאות מותאמות אישית עשויה לדרוש רישיון נוסף
- לאפשרויות רישיון ארגוני צור קשר עם שירות הלקוחות

---

**צריך קוד ביטול נעילה?** אנא צור קשר עם צוות שירות הלקוחות דרך [Telegram](https://t.me/tikmatrix_agent_bot) עם פרטי המנוי השנתי שלך.
