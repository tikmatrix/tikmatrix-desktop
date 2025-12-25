<template>
  <div data-tauri-drag-region
    class="h-12 bg-base-100 select-none flex items-center justify-between fixed top-0 left-0 right-0 z-50 px-4 shadow-md">
    <!-- 左侧:应用图标、名称、版本和检查更新 -->
    <div class="flex items-center space-x-2">
      <img ref="logo" :src="currentLogoSrc" class="h-10 w-auto logo" alt="TikMatrix Logo" />
      <span class="text-2xl text-base-content font-bold" v-if="whitelabelConfig.showAppNameInTitle">{{
        whitelabelConfig.appName }}</span>
      <!-- 检查更新按钮 -->
      <button @click="check_update()" :class="[
        'relative flex items-center space-x-1 text-md ml-2 hover:underline cursor-pointer',
        tauriUpdateAvailable ? 'text-error' : 'text-info'
      ]">
        <span v-if="tauriUpdateAvailable"
          class="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-error animate-pulse" />
        <font-awesome-icon icon="fa-solid fa-sync" class="h-4 w-4" />
        <span>v{{ version }}</span>
      </button>
    </div>
    <!-- 官网 -->
    <a v-if="whitelabelConfig.showOfficialWebsite && whitelabelConfig.officialWebsite"
      class="flex items-center space-x-1 text-md text-info ml-2 hover:underline"
      :href="whitelabelConfig.officialWebsite + '/docs/intro'" target="_blank">
      <font-awesome-icon icon="fa-solid fa-file-lines" class="h-4 w-4" />
      <span>{{ $t('tutorial') }}</span>
    </a>

    <!-- 中间：灵活空间 -->
    <div class="flex-1"></div>

    <!-- 帮助区域 - 与系统控制分开 -->
    <div class="flex items-center gap-3 mr-4 pr-4 border-r-2 border-base-300/60">
      <!-- 支持工单入口 - Enhanced with text label and visual styling -->
      <button v-if="showSupportEntry" @click="openSupportDialog" :class="[
        'relative flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 font-medium',
        'border-2 hover:shadow-lg',
        hasSupportUnread
          ? 'border-error/40 bg-error/10 hover:bg-error/20 hover:border-error text-error'
          : 'border-primary/30 bg-linear-to-r from-primary/5 to-secondary/5 hover:border-primary hover:from-primary/10 hover:to-secondary/10 text-base-content'
      ]" :title="$t('supportEntryTitle')">
        <font-awesome-icon icon="fa-solid fa-headset"
          :class="['h-5 w-5 transition-colors', hasSupportUnread ? 'text-error animate-pulse' : '']" />
        <span class="text-sm">{{ $t('support') }}</span>
        <span v-if="hasSupportUnread"
          class="ml-1 px-2 py-0.5 rounded-full bg-error text-error-content text-xs font-bold shadow-md">
          {{ supportBadgeText }}
        </span>
      </button>
    </div>

    <!-- 右侧：功能按钮和控制按钮 -->
    <div class="flex items-center gap-2">
      <LicenseLifecycle :is-loading="isLoadingLicense" :licenseData="licenseData" @open-license="showLicenseDialog" />
      <!-- 侧边栏切换 -->
      <label class="swap swap-rotate" :title="$t('toggleSidebar')">
        <input type="checkbox" value="true" v-model="sidebarVisible" />
        <svg class="swap-off fill-current w-6 h-6 text-base-content" fill="#000000" viewBox="0 0 64 64" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
          xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect id="Icons" x="0" y="-64" width="1280" height="800" style="fill:none;"></rect>
            <g id="Icons1" serif:id="Icons">
              <g id="Strike"> </g>
              <g id="H1"> </g>
              <g id="H2"> </g>
              <g id="H3"> </g>
              <g id="list-ul"> </g>
              <g id="hamburger-1"> </g>
              <g id="hamburger-2"> </g>
              <g id="list-ol"> </g>
              <g id="list-task"> </g>
              <g id="trash"> </g>
              <g id="vertical-menu"> </g>
              <g id="horizontal-menu"> </g>
              <g id="sidebar-2"> </g>
              <g id="Pen"> </g>
              <g id="Pen1" serif:id="Pen"> </g>
              <g id="clock"> </g>
              <g id="external-link"> </g>
              <g id="hr"> </g>
              <g id="info"> </g>
              <g id="warning"> </g>
              <g id="plus-circle"> </g>
              <g id="minus-circle"> </g>
              <g id="vue"> </g>
              <g id="cog"> </g>
              <g id="logo"> </g>
              <g id="radio-check"> </g>
              <g id="eye-slash"> </g>
              <g id="eye"> </g>
              <g id="toggle-off"> </g>
              <path id="sidebar"
                d="M50.01,56.074l-35.989,0c-3.309,0 -5.995,-2.686 -5.995,-5.995l0,-36.011c0,-3.308 2.686,-5.994 5.995,-5.994l35.989,0c3.309,0 5.995,2.686 5.995,5.994l0,36.011c0,3.309 -2.686,5.995 -5.995,5.995Zm-25.984,-4l0,-40l-9.012,0c-1.65,0.001 -2.989,1.34 -2.989,2.989l0,34.022c0,1.649 1.339,2.989 2.989,2.989l9.012,0Zm24.991,-40l-20.991,0l0,40l20.991,0c1.65,0 2.989,-1.34 2.989,-2.989l0,-34.022c0,-1.649 -1.339,-2.988 -2.989,-2.989Z">
              </path>
              <g id="shredder"> </g>
              <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g>
              <g id="react"> </g>
              <g id="check-selected"> </g>
              <g id="turn-off"> </g>
              <g id="code-block"> </g>
              <g id="user"> </g>
              <g id="coffee-bean"> </g>
              <g id="coffee-beans">
                <g id="coffee-bean1" serif:id="coffee-bean"> </g>
              </g>
              <g id="coffee-bean-filled"> </g>
              <g id="coffee-beans-filled">
                <g id="coffee-bean2" serif:id="coffee-bean"> </g>
              </g>
              <g id="clipboard"> </g>
              <g id="clipboard-paste"> </g>
              <g id="clipboard-copy"> </g>
              <g id="Layer1"> </g>
            </g>
          </g>
        </svg>
        <svg class="swap-on fill-current w-6 h-6 text-base-content" fill="#000000" viewBox="0 0 64 64" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
          xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect id="Icons" x="-128" y="-192" width="1280" height="800" style="fill:none;"></rect>
            <g id="Icons1" serif:id="Icons">
              <g id="Strike"> </g>
              <g id="H1"> </g>
              <g id="H2"> </g>
              <g id="H3"> </g>
              <g id="list-ul"> </g>
              <g id="hamburger-1"> </g>
              <g id="hamburger-2"> </g>
              <g id="list-ol"> </g>
              <g id="list-task"> </g>
              <g id="trash"> </g>
              <g id="vertical-menu"> </g>
              <g id="horizontal-menu"> </g>
              <g id="sidebar-2">
                <path
                  d="M50.008,56.043l-35.989,0c-3.309,0 -5.995,-2.686 -5.995,-5.995l0,-36.011c0,-3.308 2.686,-5.994 5.995,-5.995l35.989,0c3.309,0.001 5.995,2.687 5.995,5.995l0,36.011c0,3.309 -2.686,5.995 -5.995,5.995Zm-25.984,-4.001l0,-39.999l-9.012,0c-1.65,0 -2.989,1.339 -2.989,2.989l0,34.021c0,1.65 1.339,2.989 2.989,2.989l9.012,0Zm24.991,-39.999l-20.991,0l0,39.999l20.991,0c1.65,0 2.989,-1.339 2.989,-2.989l0,-34.021c0,-1.65 -1.339,-2.989 -2.989,-2.989Z">
                </path>
                <rect x="14.611" y="16.042" width="6.569" height="2" style="fill-rule:nonzero;"></rect>
                <rect x="14.611" y="24.042" width="6.569" height="2" style="fill-rule:nonzero;"></rect>
                <rect x="14.611" y="20.042" width="6.569" height="2" style="fill-rule:nonzero;"></rect>
              </g>
              <g id="Pen"> </g>
              <g id="Pen1" serif:id="Pen"> </g>
              <g id="clock"> </g>
              <g id="external-link"> </g>
              <g id="hr"> </g>
              <g id="info"> </g>
              <g id="warning"> </g>
              <g id="plus-circle"> </g>
              <g id="minus-circle"> </g>
              <g id="vue"> </g>
              <g id="cog"> </g>
              <g id="logo"> </g>
              <g id="radio-check"> </g>
              <g id="eye-slash"> </g>
              <g id="eye"> </g>
              <g id="toggle-off"> </g>
              <g id="shredder"> </g>
              <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g>
              <g id="react"> </g>
              <g id="check-selected"> </g>
              <g id="turn-off"> </g>
              <g id="code-block"> </g>
              <g id="user"> </g>
              <g id="coffee-bean"> </g>
              <g id="coffee-beans">
                <g id="coffee-bean1" serif:id="coffee-bean"> </g>
              </g>
              <g id="coffee-bean-filled"> </g>
              <g id="coffee-beans-filled">
                <g id="coffee-bean2" serif:id="coffee-bean"> </g>
              </g>
              <g id="clipboard"> </g>
              <g id="clipboard-paste"> </g>
              <g id="clipboard-copy"> </g>
              <g id="Layer1"> </g>
            </g>
          </g>
        </svg>
      </label>

      <!-- 白标设置按钮 - 仅在解锁后显示 -->
      <button v-if="isWhiteLabelUnlocked" @click="openWhiteLabelDialog"
        class="p-1 rounded cursor-pointer transition-colors duration-150 bg-transparent hover:bg-base-200/80 hover:text-primary dark:hover:bg-base-300/60 dark:hover:text-primary"
        :title="$t('whitelabelSettings')">
        <font-awesome-icon icon="fa-solid fa-palette" class="h-6 w-6 text-base-content" />
      </button>
      <!-- 全局设置 -->
      <button @click="$emiter('showDialog', { name: 'tiktokSettings' })"
        class="p-1 rounded cursor-pointer transition-colors duration-150 bg-transparent hover:bg-base-200/80 hover:text-primary dark:hover:bg-base-300/60 dark:hover:text-primary"
        :title="$t('settings')">
        <font-awesome-icon icon="fa-solid fa-gear" class="h-6 w-6 text-base-content" />
      </button>
      <!-- 语言选择 -->
      <select class="select select-info select-md" v-model="currentLocale" @change="changeLocale">
        <option selected value="en">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="ru">Русский</option>
      </select>

      <!-- 主题切换 -->
      <label class="swap swap-rotate">
        <input type="checkbox" class="theme-controller" value="dark" v-model="darkMode" />
        <font-awesome-icon icon="fa-solid fa-sun" class="swap-off fill-current w-6 h-6 text-base-content" />
        <font-awesome-icon icon="fa-solid fa-moon" class="swap-on fill-current w-6 h-6 text-base-content" />
      </label>

      <!-- 窗口控制按钮 -->
      <div class="flex space-x-2">
        <button @click="minimizeWindow"
          class="p-1 rounded cursor-pointer transition-colors duration-150 bg-transparent hover:bg-base-200/80 hover:text-primary dark:hover:bg-base-300/60 dark:hover:text-primary"
          :title="$t('minimize')" :aria-label="$t('minimize')">
          <font-awesome-icon icon="fa-solid fa-minus" class="h-5 w-5 text-base-content" />
        </button>
        <button @click="maximizeWindow"
          class="p-1 rounded cursor-pointer transition-colors duration-150 bg-transparent hover:bg-base-200/80 hover:text-primary dark:hover:bg-base-300/60 dark:hover:text-primary"
          :title="$t('maximize')" :aria-label="$t('maximize')">
          <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" class="h-5 w-5 text-base-content" />
        </button>
        <button @click="closeWindow"
          class="p-1 rounded cursor-pointer transition-colors duration-150 bg-transparent hover:bg-base-200/80 hover:text-error dark:hover:bg-base-300/60 dark:hover:text-error"
          :title="$t('close')" :aria-label="$t('close')">
          <font-awesome-icon icon="fa-solid fa-xmark" class="h-5 w-5 text-base-content" />
        </button>
      </div>
    </div>
  </div>

  <!-- 白标设置弹窗 -->
  <WhiteLabelDialog ref="whitelabelDialog" @config-updated="onWhiteLabelConfigUpdated" />

  <!-- 许可证管理弹窗 -->
  <LicenseManagementDialog ref="licenseManagementDialog" :license="licenseData"
    @update-license-code="updateLicenseCode" />


  <!-- 下载进度弹窗 -->
  <dialog ref="download_dialog" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ check_update_dialog_title }}</h3>
      <div class="modal-body">
        <div class="flex flex-row justify-between text-center items-center" v-if="download_progress.filesize > 0">
          <progress class="progress progress-success w-full" :value="download_progress.transfered"
            :max="download_progress.filesize"></progress>
          <span class="text-md ml-1">{{ (download_progress.transfered / 1024 / 1024).toFixed(2) }}Mb</span> /
          <span class="text-md">{{ (download_progress.filesize / 1024 / 1024).toFixed(2) }}Mb</span>
        </div>
        <div class="flex flex-row justify-between text-center items-center" v-else>
          <progress class="progress progress-success w-full"></progress>
        </div>

        <div class="flex justify-between">
          <div class="text-md" v-if="download_progress.transfer_rate > 0">
            {{ $t('transferRate') }}:
            <span class="text-md">{{ (download_progress.transfer_rate / 1024).toFixed(2) }} KB/s</span>
          </div>
          <div class="text-md" v-if="download_progress.percentage > 0">
            {{ $t('percentage') }}:
            <span class="text-md">{{ download_progress.percentage }} %</span>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <!-- Agent错误弹窗 -->
  <AgentErrorDialog ref="agentErrorDialog" :process-name="agentProcessName" :error-type="agentErrorType"
    :official-website="whitelabelConfig && whitelabelConfig.officialWebsite"
    :show-official-website="whitelabelConfig && whitelabelConfig.showOfficialWebsite" @exit-app="closeApp" />

  <!-- 更新对话框 -->
  <UpdateDialog ref="updateDialog" :current-version="version" :new-version="tauriUpdateInfo?.version || ''"
    :update-body="tauriUpdateInfo?.body || ''" :is-mac="isMac" @confirm="handleUpdateConfirm"
    @cancel="handleUpdateCancel" />
</template>

<script>
import { appWindow } from '@tauri-apps/api/window';
import { getAll } from '@tauri-apps/api/window';
import { ask } from '@tauri-apps/api/dialog'; // Used for exit confirmation in closeWindow() only
import { getVersion, getName } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/api/shell';
import { os } from '@tauri-apps/api';
import LicenseManagementDialog from './LicenseManagementDialog.vue';
import WhiteLabelDialog from './WhiteLabelDialog.vue';
import AgentErrorDialog from './AgentErrorDialog.vue';
import UpdateDialog from './dialogs/UpdateDialog.vue';
import { getWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';
import { isFeatureUnlocked } from '../utils/features.js';
import { getItem, setItem } from '@/utils/storage.js';
import LicenseLifecycle from './LicenseLifecycle.vue';
import { useUpdateManager } from '../composables/useUpdateManager.js';
import { computed } from 'vue';

export default {
  name: 'TitleBar',
  components: {
    LicenseManagementDialog,
    WhiteLabelDialog,
    AgentErrorDialog,
    LicenseLifecycle,
    UpdateDialog
  },
  props: {
    supportUnreadCount: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const updateManager = useUpdateManager();
    return {
      updateManager,
      // Expose computed properties directly to avoid nested computed execution
      tauriUpdateAvailable: updateManager.hasUpdateAvailable,
      tauriUpdateInfo: computed(() => updateManager.updateState.value.tauriUpdateInfo),
      download_progress: computed(() => updateManager.updateState.value.downloadProgress),
    };
  },
  data() {
    return {
      version: '',
      name: '',
      sidebarVisible: true,
      darkMode: false,
      currentLocale: 'en',
      licenseData: {},
      check_update_dialog_title: '',
      isLoadingLicense: false,
      agentProcessName: '',
      agentErrorType: 'port',
      whitelabelConfig: cloneDefaultWhiteLabelConfig(),
      isWhiteLabelUnlocked: false,
      platform: 'windows',
    }
  },

  watch: {
    sidebarVisible(val) {
      this.$emiter('sidebarChange', val);
    },
    async darkMode(val) {
      await setItem('isDark', val ? 'true' : 'false');
    },
    async currentLocale(val) {
      await setItem('locale', val);
      this.$i18n.locale = val;
    }
  },
  computed: {
    currentLogoSrc() {
      if (this.whitelabelConfig.logo?.main) {
        const logoPath = this.whitelabelConfig.logo.main;
        if (this.darkMode) {
          if (this.whitelabelConfig.logo?.dark) {
            return this.whitelabelConfig.logo.dark;
          }
          if (typeof logoPath === 'string') {
            return logoPath.replace(/(\.[^.]+)$/, '_dark$1');
          }
        }
        return logoPath;
      }
      if (this.darkMode) {
        return new URL('../assets/logo_dark.png', import.meta.url).href;
      }
      return new URL('../assets/logo.png', import.meta.url).href;
    },
    hasSupportUnread() {
      return Number(this.supportUnreadCount) > 0;
    },
    supportBadgeText() {
      const count = Number(this.supportUnreadCount) || 0;
      if (count > 99) {
        return '99+';
      }
      return String(count);
    },
    showSupportEntry() {
      const flag = this.whitelabelConfig?.enableSupportEntry;
      if (typeof flag === 'boolean') {
        return flag;
      }
      return true;
    },
    isMac() {
      return this.platform === 'mac-arm' || this.platform === 'mac-intel';
    }
  },
  async created() {
    const [storedDark, storedLocale, config, unlocked] = await Promise.all([
      getItem('isDark'),
      getItem('locale'),
      getWhiteLabelConfig(),
      isFeatureUnlocked('whiteLabel'),
    ]);

    if (storedDark !== null) {
      this.darkMode = storedDark === 'true' || storedDark === true;
    }

    if (storedLocale) {
      const sanitizedLocale = String(storedLocale).replace(/"/g, '').trim();
      this.currentLocale = sanitizedLocale || 'en';
      this.$i18n.locale = this.currentLocale;
    }

    if (config) {
      this.whitelabelConfig = config;
    }

    this.isWhiteLabelUnlocked = Boolean(unlocked);
  },
  methods: {
    updateLicenseCode(value) {
      this.licenseData = {
        ...this.licenseData,
        license_code: value
      }
    },
    isLicensed() {
      return this.licenseData.leftdays > 0 || this.licenseData.is_stripe_active == 1;
    },
    async minimizeWindow() {
      appWindow.minimize();
    },
    async maximizeWindow() {
      appWindow.toggleMaximize();
    },
    async closeWindow() {
      const yes = await ask(this.$t('exitConfirm'), this.$t('confirm'));
      await this.closeApp(yes);
    },
    changeLocale() {
      this.$i18n.locale = this.currentLocale;
    },
    async closeApp(result) {
      if (result === true) {
        // Agent shutdown is handled automatically on window close
        getAll().forEach((win) => {
          win.close();
        });
      }
    },
    showLicenseDialog() {
      this.$refs.licenseManagementDialog.show()
    },
    async loadLicense() {
      this.isLoadingLicense = true;
      try {
        const res = await this.$service.get_license();
        if (res.code === 0) {
          this.licenseData = JSON.parse(res.data);
          await this.$emiter('LICENSE_STATUS_CHANGED', this.licenseData);
        } else {
          await this.$emiter('NOTIFY', {
            type: 'error',
            message: res.data,
            timeout: 2000
          });
        }
      } catch (error) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: error,
          timeout: 2000
        });
      } finally {
        this.isLoadingLicense = false;
      }
    },
    /**
     * Check for updates with improved logic and error handling
     * @param {Object|boolean} arg - Check options or legacy boolean silent parameter
     */
    async check_update(arg = {}) {
      // Parse arguments (support both legacy boolean and new object format)
      const options = this.parseCheckUpdateArgs(arg);
      const { silent, checkTauriUpdate, checkLibraries } = options;

      // Show checking dialog if not silent
      if (!silent) {
        this.check_update_dialog_title = this.$t('checkingUpdate') || 'Checking update...';
        this.$refs.download_dialog.showModal();
      }

      try {
        // Use the unified update manager
        const result = await this.updateManager.checkForUpdates({
          silent,
          checkTauriUpdate,
          checkLibraries
        });

        // Handle Tauri update if available
        if (checkTauriUpdate && result.tauri_update?.should_update) {
          if (!silent) {
            this.$refs.download_dialog.close();
          }
          // Show update dialog
          this.$refs.updateDialog.show();
          return;
        }

        // Close checking dialog if no update
        if (!silent) {
          this.$refs.download_dialog.close();
        }

        // Handle initialization errors
        if (!result.success) {
          await this.handleInitializationError(result, silent);
        }
      } catch (error) {
        console.error('Update check failed:', error);
        if (!silent) {
          this.$refs.download_dialog.close();
        }
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('updateCheckFailed'),
          timeout: 4000
        });
      }
    },

    /**
     * Parse check_update arguments to support both legacy and new formats
     * @param {Object|boolean} arg - Arguments to parse
     * @returns {Object} - Parsed options
     */
    parseCheckUpdateArgs(arg) {
      let silent = false;
      let checkTauriUpdate = true;
      let checkLibraries = true;

      if (typeof arg === 'boolean') {
        // Legacy format: check_update(true) means silent
        silent = arg;
        checkTauriUpdate = !silent;
      } else if (arg && typeof arg === 'object') {
        // New format: check_update({ silent: true, checkTauriUpdate: false })
        silent = arg.silent ?? false;
        checkTauriUpdate = arg.checkTauriUpdate ?? arg.includeTauri ?? !silent;
        checkLibraries = arg.checkLibraries ?? true;
      }

      return { silent, checkTauriUpdate, checkLibraries };
    },

    /**
     * Handle initialization errors with appropriate UI feedback
     * @param {Object} result - Initialization result
     * @param {boolean} silent - Whether running in silent mode
     */
    async handleInitializationError(result, silent) {
      const errorHandlers = {
        'Port 50809 is occupied': () => {
          const pname = result.agent_status?.process_name || 'Unknown';
          if (!silent) {
            this.agentProcessName = pname;
            this.agentErrorType = 'port';
            this.$refs.agentErrorDialog.show();
          } else {
            this.$emiter('NOTIFY', {
              type: 'info',
              message: this.$t('agentPortOccupied', { process: pname }),
              timeout: 3000
            });
          }
        },
        'missing_vc_runtime': () => {
          if (!silent) {
            this.agentErrorType = 'runtime';
            this.$refs.agentErrorDialog.show();
          } else {
            this.$emiter('NOTIFY', {
              type: 'error',
              message: this.$t('agentRuntimeMissing'),
              timeout: 5000
            });
          }
        },
        'not found': () => {
          if (!silent) {
            this.agentErrorType = 'notfound';
            this.$refs.agentErrorDialog.show();
          } else {
            this.$emiter('NOTIFY', {
              type: 'error',
              message: this.$t('agentNotFound'),
              timeout: 4000
            });
          }
        },
        'timeout': () => {
          if (!silent) {
            this.agentErrorType = 'timeout';
            this.$refs.agentErrorDialog.show();
          } else {
            this.$emiter('NOTIFY', {
              type: 'error',
              message: this.$t('agentStartTimeout'),
              timeout: 4000
            });
          }
        }
      };

      // Find and execute appropriate error handler
      const errorType = Object.keys(errorHandlers).find(key =>
        result.error?.includes(key)
      );

      if (errorType) {
        await errorHandlers[errorType]();
      } else {
        // Generic error handling
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: result.error || 'Unknown error',
          timeout: 4000
        });
      }
    },

    openWhiteLabelDialog() {
      this.$refs.whitelabelDialog.showDialog();
    },

    openSupportDialog() {
      this.$emiter('showDialog', { name: 'support' })
    },

    onWhiteLabelConfigUpdated(config) {
      this.whitelabelConfig = config;
      document.title = config.appName || 'TikMatrix';
      this.$emit('whitelabel-updated', config);
    },

    async getPlatform() {
      const osType = await os.type();
      const arch = await os.arch();
      let platform = 'windows';
      if (osType === 'Darwin') {
        if (arch === 'aarch64') {
          platform = 'mac-arm';
        } else {
          platform = 'mac-intel';
        }
      }
      return platform;
    },

    /**
     * Handle update confirmation from dialog
     */
    handleUpdateConfirm() {
      if (this.isMac) {
        this.performMacUpdate();
      } else {
        this.performWindowsUpdate();
      }
    },

    handleUpdateCancel() {
      console.log('Update cancelled by user');
    },

    /**
     * Perform Windows update installation
     */
    async performWindowsUpdate() {
      this.check_update_dialog_title = this.$t('downloadingUpdate');
      this.$refs.download_dialog.showModal();

      let unlistenProgress = null;
      try {
        // Listen for download progress updates
        // $listen returns an unlisten function — keep and call it in finally to avoid leaking listeners
        unlistenProgress = await this.$listen('tauri://update-download-progress', (event) => {
          const { chunk_length, content_length } = event.payload;
          if (content_length && content_length > 0) {
            const currentTransferred = (this.download_progress.transfered || 0) + chunk_length;
            this.updateManager.updateDownloadProgress({
              filesize: content_length,
              transfered: currentTransferred,
              transfer_rate: chunk_length,
              percentage: Math.round((currentTransferred / content_length) * 100)
            });
          }
        });

        // Install update using the composable
        await this.updateManager.installTauriUpdate();
      } catch (error) {
        console.error('Update installation failed:', error);
        this.$refs.download_dialog.close();
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('updateFailed'),
          timeout: 4000
        });
      } finally {
        if (unlistenProgress) {
          try {
            // call the unlisten function to remove the listener
            await unlistenProgress();
          } catch (e) {
            // swallow errors from unlisten but keep a log for debugging
            // ...existing code...
            console.warn('Failed to unlisten tauri update progress', e);
          }
        }
      }
    },

    /**
     * Perform Mac update (open download page)
     */
    async performMacUpdate() {
      const downloadUrl = this.whitelabelConfig.targetApp === 'instagram'
        ? `${this.whitelabelConfig.officialWebsite}/Download-IgMatrix`
        : `${this.whitelabelConfig.officialWebsite}/Download`;

      console.log('Opening download page:', downloadUrl);
      await open(downloadUrl);
    },
  },
  async mounted() {
    // Version & Name
    this.version = await getVersion();
    this.name = await getName();

    // Language
    this.$i18n.locale = this.currentLocale;
    console.log('currentLocale:', this.currentLocale);

    // Check whitelabel feature
    this.isWhiteLabelUnlocked = await isFeatureUnlocked('whiteLabel');

    await this.$listen("DOWNLOAD_PROGRESS", async (e) => {
      this.updateManager.updateDownloadProgress(e.payload);
    });

    await this.$listen("DOWNLOAD_FINISHED", async () => {
      console.log("download finished");
      this.updateManager.resetDownloadProgress();
    });

    await this.$listen("UPDATE_STATUS", async (e) => {
      // Handle update status from Rust backend
      const status = e.payload;
      console.log("Update status:", status);

      if (status.lib_name) {
        this.check_update_dialog_title = status.message;
      }

      if (status.status === 'error') {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: status.message,
          timeout: 4000
        });
      }
    });

    await this.$listen("INIT_STATUS", async (e) => {
      // Handle initialization status from Rust backend
      const status = e.payload;
      console.log("Init status:", status);

      // Update dialog title based on stage
      const stageMessages = {
        'started': 'Initializing...',
        'checking_updates': 'Checking for updates...',
        'starting_agent': 'Starting agent...',
        'completed': 'Initialization completed'
      };

      if (status.stage && stageMessages[status.stage]) {
        this.check_update_dialog_title = stageMessages[status.stage];
      } else if (status.message) {
        this.check_update_dialog_title = status.message;
      }

    });


    await this.$listen("LICENSE", async (e) => {
      if (e.payload.reload) await this.loadLicense();
      if (e.payload.show) this.showLicenseDialog();
    });



    await this.$listen('featureUnlocked', async () => {
      this.isWhiteLabelUnlocked = await isFeatureUnlocked('whiteLabel');
    });

    await this.$listen('TAURI_UPDATE_STATUS', async (event) => {
      const payload = event.payload || {};
      this.updateManager.setTauriUpdateInfo(payload);
    });

    // Initialize platform
    this.platform = await this.getPlatform();

    this.check_update({ includeTauri: true });
  }
}
</script>
