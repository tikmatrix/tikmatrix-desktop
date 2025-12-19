<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- 应用配置 -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-base-content mb-4 border-l-4 border-primary pl-3">{{ $t('appConfiguration')
      }}</h3>
      <div class="space-y-4">
        <!-- TikTok包名选择 -->
        <div class="flex items-center justify-between py-3 border-b border-base-200"
          v-if="whitelabelConfig.targetApp === 'tiktok'">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('tiktokPackagename') }}</label>
          </div>
          <div class="flex items-center gap-3">
            <label class="flex items-center cursor-pointer">
              <input type="radio" value="com.zhiliaoapp.musically" v-model="packagename"
                class="radio radio-primary radio-md mr-2">
              <span class="text-md">{{ $t('global') }}</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input type="radio" value="com.ss.android.ugc.trill" v-model="packagename"
                class="radio radio-primary radio-md mr-2">
              <span class="text-md">{{ $t('asia') }}</span>
            </label>
          </div>
        </div>

        <!-- 自动唤醒 -->
        <div class="flex items-center justify-between py-3 border-b border-base-200">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('autoWakeUp') }}</label>
          </div>
          <input type="checkbox" class="toggle toggle-primary toggle-md" v-model="localSettings.uiautomator_status"
            true-value="1" false-value="0" @change="update_settings" />
        </div>

        <!-- 随机顺序配置已迁移到任务设置组件 TaskSettings.vue -->

        <!-- 大屏幕模式 已迁移到投屏设置组件 ScreenCastSettings.vue -->


      </div>
    </div>

    <!-- 工具与功能 -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-base-content mb-4 border-l-4 border-secondary pl-3">{{
        $t('toolsAndFeatures') }}</h3>
      <div class="space-y-4">
        <!-- 应用目录 -->
        <div class="flex items-center justify-between py-3 border-b border-base-200">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('openAppDir') }}</label>
            <p class="text-md text-base-content/60 mt-1 font-mono">{{ work_path }}</p>
          </div>
          <button class="btn btn-md btn-outline btn-primary" @click="open_dir('')">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
            </svg>
            {{ $t('open') }}
          </button>
        </div>

        <!-- ADB终端 -->
        <div class="flex items-center justify-between py-3 border-b border-base-200">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('openAdbTerminal') }}</label>
            <p class="text-md text-base-content/60 mt-1">{{ $t('adbTerminalTips') }}</p>
          </div>
          <button class="btn btn-md btn-outline btn-secondary" @click="open_adb_terminal">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2-2v16z" />
            </svg>
            {{ $t('openAdbTerminalBtn') }}
          </button>
        </div>

        <!-- 功能解锁 -->
        <div class="flex items-center justify-between py-3 border-b border-base-200">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('featureUnlock') }}</label>
            <p class="text-md text-base-content/60 mt-1">{{ $t('featureUnlockTips') }}</p>
          </div>
          <div class="flex items-center gap-2">
            <input v-model="featureCode" class="input input-bordered input-md w-32 text-md"
              :placeholder="$t('inputFeatureCode')" />
            <button class="btn btn-md btn-primary" @click="unlockFeature">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v8a2 2 0 002 2z" />
              </svg>
              {{ $t('unlock') }}
            </button>
          </div>
        </div>

        <!-- API文档 -->
        <div class="flex items-center justify-between py-3">
          <div class="flex-1">
            <label class="text-md font-medium text-base-content">{{ $t('apiDocumentation') }}</label>
            <p class="text-md text-base-content/60 mt-1">{{ $t('apiDocumentationTips') }}</p>
          </div>
          <a :href="whitelabelConfig.officialWebsite + '/docs/api/local-api'" target="_blank"
            class="btn btn-md btn-outline btn-accent">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {{ $t('viewDocs') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { invoke } from "@tauri-apps/api/tauri";
import { appDataDir } from '@tauri-apps/api/path';
// bigScreen moved to ScreenCastSettings; storage access removed from this file
import { getUnlockedFeatures, unlockFeature as unlockFeatureFlag } from '@/utils/features.js';
import { getWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';

export default {
  name: 'Settings',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  watch: {
    settings: {
      deep: true,
      immediate: true,
      handler(newVal) {
        const cloned = JSON.parse(JSON.stringify(newVal || {}));
        this.localSettings = cloned;
        const nextPackagename = cloned.packagename || '';
        if (nextPackagename !== this.packagename) {
          this.packagename = nextPackagename;
        }
        if (!this.hasLoadedSettings) {
          this.hasLoadedSettings = true;
        }
      }
    },
    packagename(newVal, oldVal) {
      if (!this.hasLoadedSettings || newVal === oldVal) {
        return;
      }
      if (this.localSettings.packagename !== newVal) {
        this.localSettings = { ...this.localSettings, packagename: newVal };
      }
      this.update_settings();
    },
    // bigScreen migrated to ScreenCastSettings.vue
  },
  data() {
    return {
      localSettings: {},
      hasLoadedSettings: false,
      packagename: '',
      // bigScreen moved to ScreenCastSettings
      work_path: '',
      featureCode: '',
      whitelabelConfig: cloneDefaultWhiteLabelConfig(),
    }
  },
  methods: {
    async open_dir(name) {
      invoke("open_dir", {
        name
      });
    },
    async open_adb_terminal() {
      const dir = (await appDataDir()) + 'platform-tools';
      invoke('open_adb_terminal', { dir });
    },
    async update_settings() {
      if (!this.hasLoadedSettings) {
        return;
      }
      await this.$service.update_settings(this.localSettings)
      //reload settings
      await this.$emiter('reload_settings', {})

    },
    async unlockFeature() {      // 激活码与功能映射，可扩展
      const featureMap = {
        'cGxhbl9rZXk=': 'followPlan', // 'plan_key' base64
        'd2hpdGVsYWJlbA==': 'whiteLabel', // 'whitelabel' base64
        'cmVnaXN0ZXJfa2V5': 'registerScript', // 'register_key' base64
        'dGVzdF9zY3JpcHQ=': 'testScript', // 'test_script' base64
        'YWlfYWdlbnQ=': 'aiAgent', // 'ai_agent' base64
        // 未来可添加更多激活码
      };
      const code = this.featureCode.trim();
      const unlocked = await getUnlockedFeatures();
      if (featureMap[code]) {
        if (!unlocked.includes(featureMap[code])) {
          await unlockFeatureFlag(featureMap[code]);
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('featureUnlocked'),
            timeout: 2000
          });
          await this.$emiter('featureUnlocked', {})
        } else {
          await this.$emiter('NOTIFY', {
            type: 'info',
            message: this.$t('featureAlreadyUnlocked'),
            timeout: 2000
          });
        }
      } else {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('featureCodeInvalid'),
          timeout: 2000
        });
      }
    }
  },
  async mounted() {
    const config = await getWhiteLabelConfig();
    if (config) {
      this.whitelabelConfig = config;
    }
    if (this.localSettings.packagename) {
      this.packagename = this.localSettings.packagename;
    }
    this.work_path = await appDataDir();
    // bigScreen handled by ScreenCastSettings component

  }
}
</script>
