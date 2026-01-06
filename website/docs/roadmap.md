---
sidebar_position: 1
title: TikMatrix/IgMatrix Product Positioning & Roadmap
sidebar_label: Roadmap
description: Official roadmap describing TikMatrix/IgMatrix positioning, capability boundaries and rollout recommendations.
slug: roadmap
---

## Full Process Map

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Who we create value for

- **SMBs / MCNs / brands / experiment teams**: need stable execution of daily yet human-like operational actions at 5–100 device scale.
- **Growth & content operations**: need controllable batch (but non-mechanical) orchestration that balances safety and efficiency.

---

## Core value propositions (why choose TikMatrix/IgMatrix)

1. **Composable batch automation**: build reusable pipelines with the model “task → script → data source”, covering warming, publishing, engagement and collection.
2. **Human-like behavior & risk control**: engine supports randomized timing, rhythm control, human gesture simulation and abnormal recovery to resemble real-user behavior.
3. **Scalability & stability**: supports real devices / cloud devices hybrid, USB/TCP ADB, enabling linear scaling from 5→20→50→100 devices with reliable scheduling.
4. **Observability**: task logs, device mirroring, account statistics and exportable result data.

---

## Capability map (scope of step 4)

### 1) Task orchestration & scheduling

- Multi-account / multi-device concurrency strategies, randomized execution order
- Retry on failure, resume from breakpoint, resource management (assets/accounts/proxies)

### 2) Script center

- **Advanced marketing scripts**: includes Boost users/posts, bulk DMs, batch comments
- Account warming scripts: daily browsing, dwell, light interactions
- Content publishing scripts: video/caption/tags/topics management, scheduled publishing
- Data collection scripts: scrape user info and build next target lists

### 3) Human & risk control

- Randomization of touch/slide/pause/view time
- Anomaly detection and rate limits to avoid sudden high-frequency behavior

> **Boundary declaration**: TikMatrix/IgMatrix does NOT provide devices, accounts, or proxies; we focus on automation of operational actions.

---

## Rollout recommendations (from 0 to scale)

1. **Validation (1–5 devices)**: connect devices → accounts → proxies → single-script minimal closed loop
2. **Pilot (10–20 devices)**: introduce advanced marketing scripts + data collection loop; monitor risk thresholds
3. **Expansion (20–50 devices)**: group rate-limiting, randomized strategies, multi-data-source rotation
4. **Scale (50–100 devices)**: batch scheduling, staggered execution

---

## Risks & compliance notes

- Using automation may violate platform terms; use at your own risk and control frequency/behavior patterns
- Device hardware, proxies, account quality and operational strategy significantly affect stability and outcomes

---

## FAQ

**Q: Does TikMatrix provide accounts/proxies?**  
A: No. We focus on the automation engine and script execution.

**Q: Do you provide cloud phones?**  
A: No. Users should prepare device environments themselves.

**Q: Do you support cloud phones?**  
A: Any device that can be stably connected via ADB (USB/TCP) can be scheduled.

---

## Call to action

- Try the Starter plan now and build your minimal viable step-4 closed loop
- Read the script docs to get started with batch operations
