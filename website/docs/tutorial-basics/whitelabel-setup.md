---
sidebar_position: 9
---

# White Label Setup

:::info Annual Subscription Required
White Label functionality is available exclusively for **Annual Subscription** users. Contact our support team via [Telegram](https://t.me/tikmatrix_agent_bot) to obtain your unlock code after purchasing an annual plan.
:::

The White Label feature allows you to customize TikMatrix's branding to match your company identity. You can modify the app name, logo, and brand information to create a personalized version of TikMatrix.

## Features

### Basic Settings

- **App Name**: Customize the application display name
- **Logo Upload**: Upload your custom main logo (recommended 128x128px)
- **Favicon**: Set custom favicon for the application

### Brand Settings

- **Support Email**: Customer support email address
- **Tutorial URL**: Custom tutorial/documentation link
- **Telegram URL**: Set your Telegram group or channel link

### Feature Toggles

- **Show Tutorial Link**: Control tutorial link visibility
- **Show Brand Info**: Control brand information display

## Setup Methods

### Method 1: UI Configuration

1. Launch TikMatrix application
2. Click the palette icon 🎨 in the title bar
3. Configure parameters in the White Label Settings dialog:
   - **App Name**: Enter your custom application name
   - **Main Logo**: Upload your logo file (PNG/JPG, 128x128px recommended)
   - **Support Email**: Enter your support email address
   - **Tutorial URL**: Enter your custom tutorial URL
   - **Telegram URL**: Enter your Telegram group/channel URL
   - **Feature Toggles**: Enable/disable tutorial links and brand info display
4. Click "Save" to apply settings

### Method 2: Configuration File

1. Copy the example configuration file:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Edit the configuration file:

   ```json
   {
     "appName": "Your App Name",
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

3. Save the file and restart the application

### Method 3: Command Line Tool

1. Navigate to the project directory:

   ```bash
   cd tikmatrix-desktop
   ```

2. Run the configuration tool:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Follow the prompts to configure each parameter step by step

## Building Custom Version

### 1. Prepare Resource Files

```bash
# Place your logo files in the correct locations
src/assets/your-logo.webp       # Main logo
public/your-favicon.ico        # Web favicon
src-tauri/icons/               # Application icons (various sizes)
```

### 2. Configure Build Parameters

Use the command line tool or manually edit the configuration:

```bash
# Using command line tool
node scripts/whitelabel-config.js

# Or manually edit
src/config/whitelabel-build.json
```

### 3. Build Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Build Tauri application
npm run tauri build
```

## Configuration Priority

The system uses the following priority order for configuration:

1. **Runtime Config**: Browser LocalStorage `whitelabel_config`
2. **Build Config**: `src/config/whitelabel-build.json` (used during build)
3. **Example Config**: `examples/whitelabel-config.json`
4. **Default Config**: Built-in default values

## Logo Requirements

### Main Logo

- **Format**: PNG, JPG, or SVG
- **Size**: 128x128px (recommended)
- **Background**: Transparent (for PNG)
- **Usage**: Header, splash screen, about dialog

### Favicon

- **Format**: ICO or PNG
- **Size**: 32x32px or 16x16px
- **Usage**: Browser tab, window icon

### Application Icons (for builds)

- **Formats**: PNG, ICO, ICNS
- **Sizes**: 32x32, 128x128, 256x256, 512x512
- **Location**: `src-tauri/icons/` directory

## API Integration

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Get current configuration
const config = getWhiteLabelConfig();

// Save new configuration
saveWhiteLabelConfig(newConfig);

// Reset to defaults
resetWhiteLabelConfig();

// Validate configuration
validateWhiteLabelConfig(config);
```

### Utility Functions

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Initialize white label on app start
initWhiteLabel();

// Update document title
updateDocumentTitle('Your App Name');

// Update favicon
updateFavicon('/path/to/favicon.ico');
```

## Best Practices

### Logo Design

- Use high-resolution images for crisp display
- Maintain consistent branding across all logo sizes
- Test logos on both light and dark backgrounds
- Ensure logos are readable at small sizes

### Brand Consistency

- Use consistent colors and fonts throughout
- Align with your existing brand guidelines
- Test the customized interface across different screen sizes
- Maintain professional appearance

### URL Configuration

- Use HTTPS URLs for all external links
- Test all links before deployment
- Ensure support channels are properly monitored
- Keep documentation URLs up to date

## Troubleshooting

### Common Issues

**Logo not displaying:**

- Check file path and permissions
- Verify image format is supported
- Ensure image size is appropriate
- Clear browser cache and restart app

**Configuration not saving:**

- Check file system permissions
- Verify JSON syntax is correct
- Ensure configuration directory exists
- Try running as administrator (if needed)

**Build failing:**

- Verify all resource files exist
- Check configuration file syntax
- Ensure icon files are in correct format
- Review build logs for specific errors

### Getting Help

If you encounter issues with White Label setup:

1. Check the troubleshooting section above
2. Review configuration file syntax
3. Contact support via [Telegram](https://t.me/tikmatrix_agent_bot)
4. Include your configuration file and error messages when reporting issues

## License and Usage

- White Label functionality is available for Annual Subscription users only
- Custom branding rights are included with your subscription
- Redistribution of customized versions may require additional licensing
- Contact support for enterprise licensing options

---

**Need the unlock code?** Contact our support team via [Telegram](https://t.me/tikmatrix_agent_bot) with your annual subscription details.
