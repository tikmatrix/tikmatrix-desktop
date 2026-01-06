# Work Profile Configuration

TikMatrix supports configuring Work Profile users for each device individually, which is very useful for enterprise-managed devices or dual-app environments.

## What is Work Profile

Work Profile is an Android feature that allows creating an independent work environment on the same device. By configuring different user IDs, you can:

- Use TikMatrix normally on enterprise-managed devices
- Set different user configurations for different app environments
- Achieve more granular device management and permission control

## Using Shelter Tool to Clone Applications

Before configuring Work Profile, you need to use the Shelter tool to clone TikTok and TikMatrix applications:

### What is Shelter

Shelter is an open-source application that creates and manages Work Profile on Android devices. It allows you to run duplicate applications in an isolated work environment.

### Installing Shelter

1. Download Shelter from [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) or [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Install and open Shelter on your device
3. Follow the setup wizard to create a Work Profile

### Cloning Required Applications

After setting up Shelter, you need to clone both TikTok and TikMatrix applications:

1. **Clone TikTok Application**:
   - Open Shelter and go to the "Main" tab
   - Find TikTok in the application list
   - Tap the "Clone to Work Profile" button
   - Wait for the cloning process to complete

2. **Clone TikMatrix Application**:
   - In Shelter, locate TikMatrix in the application list
   - Tap the "Clone to Work Profile" button
   - Confirm the cloning operation

### Verify Cloning Success

After successful cloning:

- You'll see both TikTok and TikMatrix with a briefcase icon in your app drawer
- These are the Work Profile versions of the applications
- The original applications remain unchanged in the main profile

## How to Configure Work Profile

### 1. Open Device Toolbar

When your device is connected and displayed in the TikMatrix main interface:

1. Double-click the device card to enter fullscreen mode
2. A toolbar will appear on the right side of the device screen
3. The toolbar is collapsed by default and will expand automatically when you hover over it

### 2. Find the Work Profile Button

At the bottom of the toolbar, you'll see a briefcase icon button, which is the Work Profile configuration button.

### 3. Set User ID

1. Click the briefcase icon button
2. Enter the user ID in the popup dialog (e.g., 10)
3. Click the "Save" button

### 4. Confirm Configuration

After successful configuration, the system will display a "Work Profile user settings saved" notification.

## User ID Description

### Common User IDs

- **0**: Primary user (default user)
- **10**: First work profile user
- **11**: Second work profile user
- Additional user IDs follow this pattern

### How to Find User ID

If you're unsure about the user IDs on your device, you can find them using:

```bash
adb shell pm list users
```

Or execute in TikMatrix debug tools:

```bash
pm list users
```

Example output:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Configuration File Storage

Work Profile configurations are automatically saved to the `data/work_profile_user.json` file with the following format:

```json
{
  "device_serial_1": "10",
  "device_serial_2": "0",
  "device_serial_3": "11"
}
```

## Managing Device Configurations

### View Current Configuration

Each device's Work Profile configuration is independent. You can:

1. Set different user IDs for each device
2. Modify existing device user configurations at any time
3. Clear configuration (enter empty value and save to delete configuration)

### Batch Management

If you need to manage a large number of devices, you can directly edit the `data/work_profile_user.json` file:

1. Close the TikMatrix application
2. Open the configuration file
3. Add or modify device configurations in JSON format
4. Restart TikMatrix

## Troubleshooting

### Common Issues

#### Q: Commands fail after setting Work Profile

A: Please confirm:

- Whether the user ID is correct
- Whether the corresponding user exists on the device
- Whether you have sufficient permissions to access that user

#### Q: How to cancel Work Profile configuration

A: Clear the user ID input field in the configuration dialog and click save.

#### Q: What to do if configuration is lost

A: Configurations are stored in a local JSON file. If lost, you can reconfigure or restore the `data/work_profile_user.json` file from backup.

#### Q: Shelter-related issues

A: If you encounter issues with Shelter:

- **Cloning fails**: Ensure you have administrator permissions and sufficient storage space
- **Cloned apps not visible**: Check if Work Profile is properly activated in Shelter
- **Apps crash in Work Profile**: Try re-cloning the applications or updating Shelter
- **Can't find cloned apps**: Look for apps with briefcase icons in your app drawer

## Best Practices

### Enterprise Environment

1. **Unified Management**: Set the same user ID for all enterprise devices
2. **Permission Separation**: Use different user IDs to distinguish different permission levels
3. **Backup Configuration**: Regularly backup the `work_profile_user.json` file

### Personal Use

1. **App Isolation**: Set different user environments for different purposes
2. **Testing Environment**: Use independent user IDs for app testing
3. **Privacy Protection**: Improve privacy security through user separation

### Shelter Tool Management

1. **Regular Updates**: Keep Shelter application updated to ensure compatibility
2. **Application Synchronization**: Ensure both TikTok and TikMatrix are cloned before configuring Work Profile
3. **Backup Shelter Settings**: Export and backup Shelter configurations for easy recovery
4. **Monitor App Updates**: When TikTok or TikMatrix updates, you may need to update the cloned versions as well

## Technical Details

The Work Profile function is implemented by adding the `--user` parameter to ADB commands:

```bash
# Without Work Profile
adb shell input tap 100 200

# With Work Profile (User ID: 10)
adb shell --user 10 input tap 100 200
```

This ensures commands execute in the correct user environment, avoiding permission issues and environment conflicts.

---

By properly configuring Work Profile, you can smoothly use TikMatrix in various complex device environments, improving work efficiency and management convenience.
