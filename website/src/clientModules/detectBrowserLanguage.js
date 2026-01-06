/**
 * 自动检测浏览器语言并重定向到对应的语言版本
 */
export function onRouteDidUpdate() {
    // 只在客户端运行
    if (typeof window === 'undefined') {
        return;
    }
    console.log('detectBrowserLanguage:', window.sessionStorage.getItem('languageDetected'));
    // 只在初始加载页面时运行一次
    if (window.sessionStorage.getItem('languageDetected')) {
        return;
    }
    window.sessionStorage.setItem('languageDetected', 'true');

    // 获取浏览器语言
    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log('browserLanguage:', browserLanguage);
    // 当前URL路径
    const currentPath = window.location.pathname;

    // 如果已经在语言特定路径，则不重定向
    if (currentPath.startsWith('/zh-Hans') || currentPath.includes('/zh-Hans/')) {
        return;
    }

    // 检测是否为中文
    if (browserLanguage.startsWith('zh') && !currentPath.startsWith('/zh-Hans')) {
        // 转换当前路径到中文版本
        const newPath = currentPath === '/' ? '/zh-Hans/' : `/zh-Hans${currentPath}`;
        console.log('newPath:', newPath);
        window.location.replace(newPath);
    }
} 