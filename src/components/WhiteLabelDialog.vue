<template>
    <dialog ref="whitelabelDialog" class="modal">
        <div class="modal-box max-w-4xl">
            <h3 class="font-bold text-lg mb-4">{{ $t('whitelabelSettings') }}</h3>

            <div class="tabs tabs-boxed mb-6">
                <a class="tab" :class="{ 'tab-active': activeTab === 'basic' }" @click="activeTab = 'basic'">
                    {{ $t('basicSettings') }}
                </a>
                <a class="tab" :class="{ 'tab-active': activeTab === 'branding' }" @click="activeTab = 'branding'">
                    {{ $t('brandingSettings') }}
                </a>

            </div>

            <!-- 基本设置 -->
            <div v-show="activeTab === 'basic'" class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">{{ $t('applicationName') }}</span>
                    </label>
                    <input type="text" v-model="localConfig.appName" class="input input-bordered"
                        :placeholder="$t('enterApplicationName')" />
                </div>

                <!-- Logo显示开关 -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div class="flex flex-col">
                            <span class="label-text font-medium">{{ $t('showLogo') }}</span>
                            <span class="label-text-alt text-base-content/60">{{ $t('showLogoTips') }}</span>
                        </div>
                        <input type="checkbox" v-model="localConfig.showLogo" class="toggle toggle-primary" />
                    </label>
                </div>

                <!-- Logo上传 -->
                <div class="form-control" v-if="localConfig.showLogo">
                    <label class="label">
                        <span class="label-text">{{ $t('mainLogo') }}</span>
                    </label>
                    <div class="flex items-center space-x-4">
                        <img :src="logoPreview" class="w-16 h-16 object-contain border rounded" />
                        <div class="flex flex-col space-y-2">
                            <input type="file" ref="logoFile" @change="handleLogoUpload" accept="image/*"
                                class="file-input file-input-bordered file-input-md" />
                            <div class="text-md text-gray-500">
                                {{ $t('logoSizeHint') }}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <!-- 品牌设置 -->
            <div v-show="activeTab === 'branding'" class="space-y-4">
                <!-- 官网链接显示开关 -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div class="flex flex-col">
                            <span class="label-text font-medium">{{ $t('showOfficialWebsite') }}</span>
                            <span class="label-text-alt text-base-content/60">{{ $t('showOfficialWebsiteTips') }}</span>
                        </div>
                        <input type="checkbox" v-model="localConfig.showOfficialWebsite" class="toggle toggle-primary" />
                    </label>
                </div>

                <div class="form-control" v-if="localConfig.showOfficialWebsite">
                    <label class="label">
                        <span class="label-text">{{ $t('officialWebsite') }}</span>
                    </label>
                    <input type="url" v-model="localConfig.officialWebsite" class="input input-bordered"
                        :placeholder="$t('enterOfficialWebsite')" />
                </div>

                <!-- 品牌配置显示开关 -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <div class="flex flex-col">
                            <span class="label-text font-medium">{{ $t('showBranding') }}</span>
                            <span class="label-text-alt text-base-content/60">{{ $t('showBrandingTips') }}</span>
                        </div>
                        <input type="checkbox" v-model="localConfig.showBranding" class="toggle toggle-primary" />
                    </label>
                </div>

                <div class="form-control" v-if="localConfig.showBranding">
                    <label class="label">
                        <span class="label-text">{{ $t('emailSupport') }}</span>
                    </label>
                    <input type="email" v-model="localConfig.branding.emailSupport" class="input input-bordered"
                        :placeholder="$t('enterSupportEmail')" />
                </div>

                <div class="form-control" v-if="localConfig.showBranding">
                    <label class="label">
                        <span class="label-text">{{ $t('telegramSupport') }}</span>
                    </label>
                    <input type="url" v-model="localConfig.branding.telegramSupport" class="input input-bordered"
                        :placeholder="$t('enterTelegramUrl')" />
                </div>
                <div class="form-control" v-if="localConfig.showBranding">
                    <label class="label">
                        <span class="label-text">{{ $t('whatsappSupport') }}</span>
                    </label>
                    <input type="url" v-model="localConfig.branding.whatsappSupport" class="input input-bordered"
                        :placeholder="$t('enterWhatsappUrl')" />
                </div>
            </div>



            <!-- 操作按钮 -->
            <div class="modal-action">
                <button class="btn btn-ghost" @click="closeDialog">{{ $t('cancel') }}</button>
                <button class="btn btn-warning" @click="resetToDefault">{{ $t('resetToDefault') }}</button>
                <button class="btn btn-success" @click="saveConfig">{{ $t('save') }}</button>
            </div>

            <!-- 隐藏的文件输入 -->
            <input type="file" ref="configFile" @change="handleConfigImport" accept=".json" style="display: none" />
        </div>
    </dialog>
</template>

<script>
import { getWhiteLabelConfig, saveWhiteLabelConfig, resetWhiteLabelConfig, validateWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';

export default {
    name: 'WhiteLabelDialog',
    data() {
        return {
            activeTab: 'basic',
            localConfig: cloneDefaultWhiteLabelConfig(),
            logoPreview: '',
        };
    },
    async mounted() {
        await this.loadConfig();
    },
    methods: {
        async loadConfig() {
            const config = await getWhiteLabelConfig();
            this.localConfig = JSON.parse(JSON.stringify(config));
            this.logoPreview = this.localConfig.logo?.main || '';
        },

        async handleLogoUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // 验证文件类型
            if (!file.type.startsWith('image/')) {
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('invalidImageFile'),
                    timeout: 3000
                });
                return;
            }

            // 验证文件大小 (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('fileTooLarge'),
                    timeout: 3000
                });
                return;
            }

            // 创建预览
            const reader = new FileReader();
            reader.onload = (e) => {
                this.logoPreview = e.target.result;
                // 确保logo对象存在
                if (!this.localConfig.logo) {
                    this.localConfig.logo = {};
                }
                this.localConfig.logo.main = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        async saveConfig() {
            try {
                validateWhiteLabelConfig(this.localConfig);

                const success = await saveWhiteLabelConfig(this.localConfig);
                if (success) {
                    await this.$emiter('NOTIFY', {
                        type: 'success',
                        message: this.$t('configSaved'),
                        timeout: 3000
                    });
                    this.$emit('config-updated', this.localConfig);
                    this.closeDialog();
                } else {
                    await this.$emiter('NOTIFY', {
                        type: 'error',
                        message: this.$t('configSaveFailed'),
                        timeout: 3000
                    });
                }
            } catch (error) {
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: error.message,
                    timeout: 3000
                });
            }
        },

        async resetToDefault() {
            // 使用确认对话框
            try {
                const { ask } = await import('@tauri-apps/api/dialog');
                const confirmed = await ask(this.$t('confirmResetConfig'), {
                    title: this.$t('whitelabelSettings'),
                    type: 'warning'
                });

                if (confirmed) {
                    this.localConfig = JSON.parse(JSON.stringify(await resetWhiteLabelConfig()));
                    this.logoPreview = this.localConfig.logo?.main || '';
                    await this.$emiter('NOTIFY', {
                        type: 'success',
                        message: this.$t('resetToDefault'),
                        timeout: 3000
                    });
                }
            } catch (error) {
                console.error('Reset config error:', error);
            }
        },



        showDialog() {
            this.loadConfig();
            this.$refs.whitelabelDialog.showModal();
        },

        closeDialog() {
            this.$refs.whitelabelDialog.close();
        }
    }
};
</script>
