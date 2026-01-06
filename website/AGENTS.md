# TikMatrix 生态项目说明

## 本仓库

`tikmatrix-desktop/website`：TikMatrix 与 IgMatrix 官网及教程站点，使用 Docusaurus 搭建，支持英文、中文、俄文三语内容。

## 生态项目

1. `tikmatrix-desktop`：TikMatrix 与 IgMatrix 客户端，基于 Tauri v1 开发，支持英文、中文、俄文三语。
2. `tikmatrix-agent`：TikMatrix 与 IgMatrix 客户端共用的本地服务，使用 Rust 开发。`main` 分支同时维护两款客户端的 agent 与自动化脚本，默认在本地启动 50809 端口供客户端调用，并打包自动化脚本可执行文件。
3. `tikmatrix-desktop/website`：TikMatrix 与 IgMatrix 官网及教程站点，使用 Docusaurus 搭建，支持英文、中文、俄文三语内容。
4. `tikmatrix-android`：TikMatrix 与 IgMatrix 的安卓端应用，用于启动安卓服务并与电脑上的 agent 与脚本通信，让电脑能够远程控制手机执行自动化任务。
5. `tikmatrix-admin-pro`：TikMatrix 与 IgMatrix 的管理后台与 API 服务，基于 Vue Admin 与 Cloudflare Worker 构建。

以上项目共同构成 TikMatrix 生态。开发者日常交流使用中文，代码中的注释与日志默认采用英文，同时保持三语国际化配置。所有仓库统一使用 GitHub CLI 进行日常管理与协作操作。
