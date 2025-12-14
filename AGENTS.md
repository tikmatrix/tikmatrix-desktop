# TikMatrix 生态项目说明

## 本仓库

- 本项目是一个通过电脑软件控制多个(1-100)手机实时投屏, 任务调度, 账号管理, 素材管理等功能组成的的社交媒体运营矩阵管理软件
- TikMatrix 与 IgMatrix 客户端，基于 Tauri v1 + Vue3 开发
- UI样式使用daisyUI + tailwindcss
- 存储数据尽量使用AppData/data 目录
- i18n支持英文、中文、俄文三语
- 通过Github action自动打包Windows和Mac平台的客户端

## 指令要求

- Always respond in 中文，但注释一律用英文
- 不要过度设计，保证代码简洁易懂，简单实用
- 写代码时，要注意圈复杂度，代码尽可能复用
- 写代码时，注意模块设计，尽量使用设计模式
- 改动时最小化修改，尽量不修改到其他模块代码
- 搜索资料时, 要使用英文搜索
- 没有要求的情况下, 不要擅自增加md文档

## 生态项目

1. `tikmatrix-desktop`：TikMatrix 与 IgMatrix 客户端，基于 Tauri v1 开发，支持英文、中文、俄文三语。
2. `tikmatrix-agent`：TikMatrix 与 IgMatrix 客户端共用的本地服务，使用 Rust 开发。`main` 分支同时维护两款客户端的 agent 与自动化脚本，默认在本地启动 50809 端口供客户端调用，并打包自动化脚本可执行文件。
3. `www.tikmatrix.com`：TikMatrix 与 IgMatrix 官网及教程站点，使用 Docusaurus 搭建，支持英文、中文、俄文三语内容。
4. `tikmatrix-android`：TikMatrix 与 IgMatrix 的安卓端应用，用于启动安卓服务并与电脑上的 agent 与脚本通信，让电脑能够远程控制手机执行自动化任务。
5. `tikmatrix-admin-pro`：TikMatrix 与 IgMatrix 的管理后台与 API 服务，基于 Vue Admin 与 Cloudflare Worker 构建。
