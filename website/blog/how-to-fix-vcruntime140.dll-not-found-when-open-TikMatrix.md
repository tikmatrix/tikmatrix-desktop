---
slug: how-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: How to fix vcruntime140.dll not found when open TikMatrix
authors: tikMatrix
tags: [vcruntime140.ddl not found,fixed,tikmatrix]
---

The "vcruntime140.dll not found" error typically occurs because the Microsoft Visual C++ Redistributable package is not installed or is corrupted. Here are the steps to fix this issue:
<!--truncate-->
---

1. **Download the Microsoft Visual C++ Redistributable**:
   - Go to the [Microsoft Visual C++ Redistributable download page](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
   - Download the appropriate version for your system (usually the 64-bit version for modern computers, but you might need the 32-bit version if your application specifically requires it).

2. **Install the Redistributable Package**:
   - Run the downloaded installer and follow the on-screen instructions to install it.
   - If you already have it installed, you might want to repair the installation by selecting the "Repair" option during the installation process.

3. **Restart Your Computer**:
   - After installing or repairing the package, restart your computer to ensure all changes take effect.

4. **Check for Updates**:
   - Make sure your Windows is up to date. Go to `Settings > Update & Security > Windows Update` and check for updates.

5. **Reinstall TikMatrix**:
   - If the above steps don't work, try uninstalling and then reinstalling TikMatrix. Make sure to download the latest version from the official website.

If the error persists after trying these steps, you may need to check for further issues, such as corrupted system files, by running the System File Checker tool:

1. **Run System File Checker (SFC)**:
   - Open Command Prompt as an administrator (right-click on the Start button and select "Command Prompt (Admin)" or "Windows PowerShell (Admin)").
   - Type `sfc /scannow` and press Enter.
   - Wait for the process to complete. If SFC finds any issues, it will attempt to fix them.

These steps should help resolve the "vcruntime140.dll not found" error and allow TikMatrix to run properly.
