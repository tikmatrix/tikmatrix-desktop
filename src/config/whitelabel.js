/**
 * 白标配置管理
 * 支持动态修改应用名称、logo、主题色等
 */

export const DEFAULT_WHITELABEL_CONFIG = {
    // 应用基本信息
    appName: 'TikMatrix', // 应用名称
    officialWebsite: 'https://tikmatrix.com', // 官网域名
    enablePay: true, // 是否启用支付功能
    enableSupportEntry: true, // 是否显示工单支持入口
    targetApp: 'tiktok', // 目标应用，tiktok 或 instagram
    showAppNameInTitle: false, // 是否在窗口标题显示应用名称

    // 显示控制开关
    showOfficialWebsite: true, // 是否显示官网链接
    showLogo: true, // 是否显示Logo配置
    showBranding: true, // 是否显示品牌配置

    // Logo配置
    logo: {
        main: '', // 主logo
        dark: '', // 暗色模式logo
    },

    // 品牌配置
    branding: {
        emailSupport: '',
        telegramSupport: '',
        whatsappSupport: '',
    },


};

import { getJsonItem, removeItem, setJsonItem } from '../utils/storage.js';

/**
 * 获取白标配置
 */
export async function getWhiteLabelConfig() {
    try {
        const stored = await getJsonItem('whitelabel_config', null);
        if (stored) {
            // 深度合并配置，确保所有必需的属性都存在
            return deepMerge(DEFAULT_WHITELABEL_CONFIG, stored);
        }
    } catch (error) {
        console.warn('Failed to load whitelabel config:', error);
    }
    return cloneDefaultWhiteLabelConfig();
}

/**
 * 深度合并对象
 */
function deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * 保存白标配置
 */
export async function saveWhiteLabelConfig(config) {
    try {
        const mergedConfig = deepMerge(DEFAULT_WHITELABEL_CONFIG, config);
        await setJsonItem('whitelabel_config', mergedConfig);
        return true;
    } catch (error) {
        console.error('Failed to save whitelabel config:', error);
        return false;
    }
}

/**
 * 重置白标配置
 */
export async function resetWhiteLabelConfig() {
    await removeItem('whitelabel_config');
    return cloneDefaultWhiteLabelConfig();
}

/**
 * 验证配置格式
 */
export function validateWhiteLabelConfig(config) {
    const required = ['appName'];
    const missing = required.filter(key => !config[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    return true;
}

export function cloneDefaultWhiteLabelConfig() {
    return JSON.parse(JSON.stringify(DEFAULT_WHITELABEL_CONFIG));
}
