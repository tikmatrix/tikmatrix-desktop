# TikMatrix

📱 TikMatrix- is a PC desktop software for automating TikTok on Android phones.

Download: <https://tikmatrix.com/Download/>
Tutorial: <https://tikmatrix.com/docs/intro>

💪Features:

- Multi-account switching: One phone can log in to 8 TikTok accounts simultaneously for all tasks.
- Auto registration (with email) and auto login (with email/password or username/password). *Note: Captcha solving and email verification must be done manually.*
- Auto profile filling: Avatar, nickname, bio, and username.
- Automatic recognition of the TikTok account logged in on the phone.
- Auto account warming: Search keywords, view videos, like videos, follow users, comment on videos, and favorite videos.
- Auto posting: Post videos or images (supports sorting and count) with text, hashtags, music, and product links.
- Auto delete posts by view count.
- Mass boosting (User): Follow/unfollow users in bulk.
- Mass boosting (Post): Like, comment, favorite, share, and follow posts in bulk.
- Mass boosting (Live): Like and comment on live streams in bulk.
- Mass direct messaging: Send bulk messages to users.
- Consume-once dataset protection: Cap how many usernames or links each Super Marketing run consumes to preserve data for multi-account rotations.
- Scrape TikTok user followers.
- Mass follow back: Follow all followers and send a hello direct message.
- Minute-level task scheduling: Automate tasks with minute-level precision.
- Import/export accounts.
- Custom functionality: Add any feature on request.
- Multilingual support: TikMatrix supports EN/RU/CN.
Note: The TikTok app on the phone must be in English for all features to work properly.

⚙️Requirements:

- 💻Windows PC running Windows 7 or later OR 📱Mac computer running macOS
- 🤖📱Android phones/devices with Android 5.0+ (API 21) Phones do not require root access.
🏷Offers flexible pricing plans for every need:

- Starter: $29/month/PC — Manage up to 5 phones, all features included, dedicated support.
- Pro: $59/month/PC — Manage up to 20 phones, all features included, dedicated support.
- Business: $149/month/PC — Manage up to 100 phones, all features included, dedicated support.

- All plans include unlimited feature access and 1:1 Telegram support.
- Annual billing enjoys a 30% discount.🔣
- Payment methods: Card/Credit Card/USDT (TRC20/BEP20).💳💳🪙

🔧Common troubleshooting and solutions
<https://tikmatrix.com/docs/category/troubleshooting>

## Quick start

[Official website](https://www.tikmatrix.com)

[Video Tutorial](https://www.youtube.com/@tikmatrix)

## Discussions

[Join our Telegram](https://t.me/tikmatrix_agent_bot)

## Development

### Requirements

1. Node.js 18.x or higher
2. Rust 1.67.x or higher

### Install

```shell
npm install --global @tauri-apps/cli
npm install
npm run tauri dev
```

## FAQ

### How to run TikMatrix Agent on phone by adb?

You can check the reason why the agent is not running by the following command.

```shell
# You can find the device id by the following command.
adb devices
# Start the agent on the phone.
adb -s <device_id> shell am instrument -w -r -e debug false -e class com.github.tikmatrix.stub.Stub com.github.tikmatrix.test/androidx.test.runner.AndroidJUnitRunner
```

### How to customize TikMatrix Brand?

- src/src-tauri/tauri.conf.json

```shell
"package": {
    "productName": "TikMatrix",
    "version": "1.8.1"
  }
```

### How to fix vcruntime140_1.dll not found?

Need to install Visual C++ Redistributable for Visual Studio 2015, 2017 and 2019.
<https://tikmatrix.com/blog/how-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix>

### How to fix The application was unable to start correctly (0xc000007b)?

Need to install Visual C++ Redistributable for Visual Studio 2015, 2017 and 2019.
<https://tikmatrix.com/blog/how-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix>

### Fix unable to start TikMatrix on Mac

```shell
xattr -cr /Applications/TikMatrix.app
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tikmatrix/tikmatrix-desktop&type=Date)](https://star-history.com/#tikmatrix/tikmatrix-desktop&Date)
