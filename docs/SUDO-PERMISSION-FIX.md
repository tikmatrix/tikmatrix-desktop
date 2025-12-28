# Deploy User Sudo Permissions Configuration

## Overview

The `deploy` user needs sudo permissions to manage web deployments, services, and system configurations in the TikMatrix ecosystem. This guide covers how to grant full sudo access to the deploy user.

## Solution

Grant the `deploy` user full sudo access without password. This simplifies permission management and eliminates the need to update specific permissions for each new operation.

**Note:** This configuration is suitable for dedicated VPS servers where the deploy user is controlled via SSH key authentication from GitHub Actions. For higher security environments, consider using specific command permissions instead of `ALL`.

## How to Apply the Fix

### Option 1: Run the Automated Fix Script (Recommended)

SSH into each VPS server and run:

```bash
# Download the fix script from GitHub
curl -O https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/scripts/fix-deploy-permissions.sh

# Run the script as root
sudo bash fix-deploy-permissions.sh
```

### Option 2: Manual Update

SSH into each VPS server and edit the sudoers file:

```bash
sudo nano /etc/sudoers.d/deploy
```

Replace the entire content with:

```
# Allow deploy user full sudo access for web deployments and system management
# This simplifies permission management for the TikMatrix ecosystem
deploy ALL=(ALL) NOPASSWD: ALL
```

Then set proper permissions:

```bash
sudo chmod 440 /etc/sudoers.d/deploy
```

## Verification

After applying the fix on a server, verify the configuration:

```bash
# View the sudoers configuration
sudo cat /etc/sudoers.d/deploy

# Test sudo without password (should not prompt for password)
sudo systemctl daemon-reload
```

## Servers to Update

Apply this fix on all VPS servers:

1. **server-dublin** (172.245.97.215)
2. **server-us** (check deploy-config.json for IP)
3. **server-sgp** (check deploy-config.json for IP)

## After Applying the Fix

Once all servers are updated:

1. Go to GitHub Actions: <https://github.com/tikmatrix/tikmatrix-desktop/actions>
2. Find the "Deploy TikMatrix API Rust Service" workflow
3. Click "Run workflow" to test the deployment
4. The workflow should now complete successfully without sudo password errors

## Security Note

The updated configuration grants full sudo access to the `deploy` user. This is suitable for:

- ✅ Dedicated VPS servers for the TikMatrix ecosystem
- ✅ Environments with SSH key-only authentication
- ✅ Automated deployment workflows via GitHub Actions

This approach simplifies permission management and eliminates the need to update sudo permissions for each new deployment operation. The deploy user is secured through:

- SSH key authentication (no password login)
- Limited to GitHub Actions deployment workflows
- Isolated to dedicated VPS infrastructure

## Related Documentation

- [VPS Management Guide (CN)](./vps-management.md)
- [VPS Management Guide (EN)](./vps-management.en.md)
- See the "Permission Management" and "Troubleshooting" sections for more details

## Questions?

If you encounter any issues or have questions, please:

1. Check the troubleshooting section in vps-management.md
2. Review the GitHub Actions workflow logs for detailed error messages
3. Open an issue in the repository with the error details
