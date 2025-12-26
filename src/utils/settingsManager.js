import { invoke } from '@tauri-apps/api/tauri';

/**
 * 通用设置管理工具
 * 用于简化设置文件的读写操作
 */
export class SettingsManager {
    constructor(filename) {
        this.filename = filename;
    }

    /**
     * 从文件加载设置
     * @param {Object} defaultSettings - 默认设置对象
     * @returns {Promise<Object>} 加载的设置对象
     */
    async loadSettings(defaultSettings = {}) {
        // 文件存在且有效，正常加载
        try {
            const settingsJson = await invoke('read_settings_file_generic', {
                filename: this.filename
            });
            const settings = JSON.parse(settingsJson);

            // 合并默认设置和文件设置
            return { ...defaultSettings, ...settings };
        } catch (error) {
            console.error(`Failed to load settings from ${this.filename}:`, error);
            return defaultSettings;
        }
    }



    /**
     * 保存设置到文件
     * @param {Object} settings - 要保存的设置对象
     * @returns {Promise<void>}
     */
    async saveSettings(settings) {
        try {
            await invoke('write_settings_file_generic', {
                filename: this.filename,
                content: JSON.stringify(settings, null, 2)
            });
        } catch (error) {
            console.error(`Failed to save settings to ${this.filename}:`, error);
            throw error;
        }
    }

    /**
     * 重置设置文件
     * @param {Object} defaultSettings - 默认设置对象
     * @returns {Promise<void>}
     */
    async resetSettings(defaultSettings = {}) {
        try {
            console.log(`重置设置文件 ${this.filename} 为默认设置`);
            await this.saveSettings(defaultSettings);
            return defaultSettings;
        } catch (error) {
            console.error(`重置设置文件 ${this.filename} 失败:`, error);
            throw error;
        }
    }

    /**
     * 创建一个 Vue 组件的 mixin，用于自动管理设置
     * @param {Object} defaultSettings - 默认设置对象
     * @param {Array<string>} watchedProperties - 需要监听的属性列表
     * @returns {Object} Vue mixin 对象
     */
    createVueMixin(defaultSettings, watchedProperties = []) {
        const settingsManager = this;

        return {
            data() {
                // 创建响应式数据属性
                const data = {};
                Object.keys(defaultSettings).forEach(key => {
                    data[key] = defaultSettings[key];
                });
                return data;
            },

            created() {
                // 在组件创建时启动加载流程，并保存 Promise 供后续等待
                this.__settingsReadyPromise = this.loadComponentSettings();
            },

            methods: {
                loadComponentSettings() {
                    const load = async () => {
                        console.log(`=== Loading component settings for ${settingsManager.filename} ===`);
                        try {
                            const settings = await settingsManager.loadSettings(defaultSettings);
                            // 将设置应用到组件数据，同时确保对象类型正确
                            Object.keys(settings).forEach(key => {
                                if (key in this.$data) {
                                    // 判断默认值和加载值的类型是否匹配
                                    const defaultType = typeof defaultSettings[key];
                                    const loadedValue = settings[key];
                                    const loadedType = typeof loadedValue;

                                    // 如果默认值是对象但加载值不是，则使用默认值
                                    if (defaultType === 'object' && defaultType !== loadedType) {
                                        console.warn(`Type mismatch for setting ${key}: expected object but got ${loadedType}. Using default value.`);
                                        // 在 Vue 3 中直接赋值即可触发响应式代理
                                        this[key] = JSON.parse(JSON.stringify(defaultSettings[key]));
                                    } else {
                                        this[key] = loadedValue;
                                    }
                                }
                            });

                            console.log('Component settings loaded successfully');
                        } catch (error) {
                            console.error('Failed to load component settings:', error);
                        }
                    };

                    const promise = load();
                    this.__settingsReadyPromise = promise;
                    return promise;
                },

                async ensureSettingsLoaded() {
                    if (!this.__settingsReadyPromise) {
                        this.__settingsReadyPromise = this.loadComponentSettings();
                    }
                    try {
                        await this.__settingsReadyPromise;
                    } catch (error) {
                        // loadComponentSettings 已处理错误日志，这里保持静默
                    }
                },

                async saveComponentSettings() {
                    try {
                        const settings = {};

                        // 收集需要保存的属性
                        watchedProperties.forEach(prop => {
                            if (prop in this.$data) {
                                settings[prop] = this[prop];
                            }
                        });

                        await settingsManager.saveSettings(settings);
                    } catch (error) {
                        console.error('Failed to save component settings:', error);
                    }
                },

                // 添加手动保存设置的方法
                async saveSettings() {
                    await this.saveComponentSettings();
                }
            },

            watch: (() => {
                const watchers = {};

                // 为每个监听的属性创建 watcher
                watchedProperties.forEach(prop => {
                    watchers[prop] = {
                        handler() {
                            this.saveComponentSettings();
                        },
                        deep: true
                    };
                });

                return watchers;
            })()
        };
    }
}

// 预定义的设置管理器
export const accountWarmupSettings = new SettingsManager('account_warmup_settings.json');
export const postSettings = new SettingsManager('post_settings.json');
export const scrapeUsersSettings = new SettingsManager('scrape_users_settings.json');
export const unfollowAllSettings = new SettingsManager('unfollow_all_settings.json');
export const boostPostsSettings = new SettingsManager('boost_posts_settings.json');
export const deletePostSettings = new SettingsManager('delete_post_settings.json');
export const boostUsersSettings = new SettingsManager('boost_users_settings.json');
export const profileSettings = new SettingsManager('profile_settings.json');
export const massDMSettings = new SettingsManager('mass_dm_settings.json');
export const beforeRunScriptSettings = new SettingsManager('before_run_script_settings.json');
export const boostLivesSettings = new SettingsManager('boost_lives_settings.json');
export const massCommentSettings = new SettingsManager('mass_comment_settings.json');
export const followBackSettings = new SettingsManager('follow_back_settings.json');
export const superMarketingSettings = new SettingsManager('super_marketing_settings.json');
export const boostCommentsSettings = new SettingsManager('boost_comments_settings.json');
export const aiAgentSettings = new SettingsManager('ai_agent_settings.json');
export const deleteReelSettings = new SettingsManager('delete_reel_settings.json');

// 导出常用函数
export async function loadSettings(filename, defaultSettings = {}) {
    const manager = new SettingsManager(filename);
    return await manager.loadSettings(defaultSettings);
}

export async function saveSettings(filename, settings) {
    const manager = new SettingsManager(filename);
    return await manager.saveSettings(settings);
}
