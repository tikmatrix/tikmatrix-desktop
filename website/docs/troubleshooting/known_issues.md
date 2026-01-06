---
sidebar_position: 2
---

# Known Issues

## Port Conflict Error

If you see the following error in the logs:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)
```

This indicates a port conflict. To resolve this issue:

1. Fully restart the TikMatrix/IgMatrix application and try again.
2. Avoid running other device-control software simultaneously with TikMatrix/IgMatrix, as they may cause port conflicts.
3. Make sure no other application is using the same communication port.

This error usually occurs when multiple device-control applications run at the same time and conflict over the communication port.

## Cloud Phone Script Failures

Ensure sufficient and stable network bandwidth between your PC and the cloud phone datacenter. For best results, place the PC and the cloud phone datacenter in the same country or region to reduce latency and packet loss, which helps automation tasks run reliably.

## Unstable Script Execution, Random Errors, Inconsistent Results

This is often related to ADB connection quality. If you use USB connection, try a different cable or USB port. If you use wireless ADB, ensure stable network connection and good signal strength between the PC and the device.

## Scripts Broken by TikTok/Instagram App Updates

TikTok and Instagram update frequently and may cause automation scripts to fail. Please submit a support ticket and we will update the scripts to adapt to the latest app versions as soon as possible.
