<template>
  <div class="flex flex-col items-start p-12 max-w-6xl">
    <h3 class="font-bold text-lg">{{ $t(script.name) }}</h3>

    <!-- 添加选中设备信息 -->
    <div class="mt-2 w-full">
      <div class="flex flex-row gap-2">
        <div class="text-md font-medium">
          {{ $t('selectedDevices') }}: {{ selecedDevices.length }} {{ $t('units') }}
        </div>
        <div class="flex flex-row items-center gap-2" v-if="script.name === 'profile'
          || script.name === 'accountWarmup'
          || script.name === 'post'
          || script.name === 'massDM'
          || script.name === 'followBack'
          || script.name === 'unFollowAll'
          || script.name === 'deletePost'
          || script.name === 'boostUsers'
          || script.name === 'boostPosts'
          || script.name === 'boostLives'
          || script.name === 'massComment'
          || script.name === 'boostComments'
          || script.name === 'superMarketing'">
          <label class="font-bold text-info">{{ $t('enableMultiAccount') }}:</label>
          <input type="checkbox" class="toggle toggle-accent" v-model="enable_multi_account" />
        </div>
        <div class="flex flex-row items-center gap-2">
          <label class="font-bold text-info">{{ $t('rotateProxy') }}:</label>
          <input type="checkbox" class="toggle toggle-accent" v-model="rotate_proxy" />
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mt-1 max-h-24 overflow-y-auto bg-base-200 p-2 rounded-md">
        <div v-for="real_serial in selecedDevices" :key="real_serial" class="badge badge-outline">
          {{devices.find(d => d.real_serial === real_serial).key}}
        </div>
        <div v-if="selecedDevices.length === 0" class="text-error text-md px-2">
          {{ $t('noDevicesSelected') }}
        </div>
      </div>
      <div v-if="licenseLimit !== null && script.name !== 'test'" class="mt-2 text-md" :class="licenseHintClass">
        <span>{{ $t('licenseConcurrencyLimitLabel', { count: licenseLimit }) }}</span>
        <span v-if="licenseLimit === 0" class="ml-1">
          {{ $t('licenseConcurrencyLimitInactiveHint') }}
        </span>
        <span v-else class="ml-1">
          {{ $t('licenseConcurrencyLimitQueueHint') }}
        </span>
        <span v-if="licenseLimit > 0 && selecedDevices.length > licenseLimit" class="ml-1 font-medium">
          {{ $t('licenseConcurrencyLimitOverSelectedHint', { extra: selecedDevices.length - licenseLimit }) }}
        </span>
      </div>
    </div>

    <RegisterDialog v-if="script.name === 'register'" ref="currentDialog" :settings="settings" />
    <ProfileDialog v-if="script.name === 'profile'" ref="currentDialog" />
    <MassDMDialog v-if="script.name === 'massDM'" ref="currentDialog" />
    <FollowBackDialog v-if="script.name === 'followBack'" ref="currentDialog" />
    <UnFollowAllDialog v-if="script.name === 'unFollowAll'" ref="currentDialog" />
    <AccountWarmupDialog v-if="script.name === 'accountWarmup'" ref="currentDialog" />
    <PostDialog v-if="script.name === 'post'" ref="currentDialog" />
    <LoginDialog v-if="script.name === 'login'" ref="currentDialog" />
    <MatchAccounts v-if="script.name === 'matchAccount'" ref="currentDialog" />
    <ScrapeUsersDialog v-if="script.name === 'scrapeUsers'" ref="currentDialog" />
    <DeletePostDialog v-if="script.name === 'deletePost'" ref="currentDialog" />
    <BoostUsersDialog v-if="script.name === 'boostUsers'" ref="currentDialog" />
    <BoostPostsDialog v-if="script.name === 'boostPosts'" ref="currentDialog" />
    <BoostCommentsDialog v-if="script.name === 'boostComments'" ref="currentDialog" />
    <BoostLivesDialog v-if="script.name === 'boostLives'" ref="currentDialog" />
    <MassCommentDialog v-if="script.name === 'massComment'" ref="currentDialog" />
    <SwitchAccountDialog v-if="script.name === 'switchAccount'" ref="currentDialog" />
    <TestScriptDialog v-if="script.name === 'test'" ref="currentDialog" />
    <SuperMarketingDialog v-if="script.name === 'superMarketing'" ref="currentDialog" />
    <AIAgentDialog v-if="script.name === 'aiAgent'" ref="currentDialog" />

    <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
      <div class="flex flex-1"></div>
      <button class="btn btn-success" :disabled="selecedDevices.length === 0 || isRunning" @click="runScript">
        <span v-if="isRunning" class="loading loading-spinner loading-sm mr-2"></span>
        {{ isRunning ? $t('startScript') + '...' : $t('startScript') }}
      </button>
    </div>
  </div>
</template>
<script>
import RegisterDialog from './RegisterDialog.vue'
import ProfileDialog from './ProfileDialog.vue'
import MassDMDialog from './MassDMDialog.vue'
import FollowBackDialog from './FollowBackDialog.vue'
import UnFollowAllDialog from './UnFollowAllDialog.vue'
import LoginDialog from './LoginDialog.vue'
import AccountWarmupDialog from './AccountWarmupDialog.vue'
import PostDialog from './PostDialog.vue'
import ScrapeUsersDialog from './ScrapeUsersDialog.vue'
import DeletePostDialog from './DeletePostDialog.vue'
import BoostUsersDialog from './BoostUsersDialog.vue'
import BoostPostsDialog from './BoostPostsDialog.vue'
import BoostCommentsDialog from './BoostCommentsDialog.vue'
import MatchAccounts from './MatchAccounts.vue'
import MassCommentDialog from './MassCommentDialog.vue'
import BoostLivesDialog from './BoostLivesDialog.vue'
import SwitchAccountDialog from './SwitchAccountDialog.vue'
import TestScriptDialog from './TestScriptDialog.vue'
import SuperMarketingDialog from './SuperMarketingDialog.vue'
import AIAgentDialog from './AIAgentDialog.vue'
import { beforeRunScriptSettings } from '@/utils/settingsManager';

const beforeRunScriptMixin = beforeRunScriptSettings.createVueMixin(
  {
    enable_multi_account: false,
    rotate_proxy: false,
    selected_accounts: [],
    account_filters: {
      proxy_status: 'all',
      login_status: 'all',
      account_status: 'all'
    }
  },
  [
    'enable_multi_account', 'rotate_proxy', 'selected_accounts', 'account_filters'
  ]
);
export default {
  mixins: [beforeRunScriptMixin],
  name: 'BeforeRunScript',
  props: {
    devices: {
      type: Array,
      required: true
    },
    script: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    selecedDevices: {
      type: Array,
      required: true
    }
  },
  components: {
    RegisterDialog,
    ProfileDialog,
    MassDMDialog,
    FollowBackDialog,
    UnFollowAllDialog,
    LoginDialog,
    AccountWarmupDialog,
    PostDialog,
    ScrapeUsersDialog,
    DeletePostDialog,
    BoostUsersDialog,
    BoostPostsDialog,
    BoostCommentsDialog,
    MatchAccounts,
    MassCommentDialog,
    BoostLivesDialog,
    SwitchAccountDialog,
    TestScriptDialog,
    SuperMarketingDialog,
    AIAgentDialog
  },

  data() {
    return {
      // 其他非设置相关的数据可以保留在这里
      licenseLimit: null,
      // 标记脚本是否正在启动，防止重复点击
      isRunning: false,
    }
  },
  methods: {
    async update_settings() {
      await this.$service.update_settings(this.settings)
      //reload settings
      await this.$emiter('reload_settings', {})
    },
    async fetchLicenseLimit() {
      try {
        const res = await this.$service.get_license_concurrency_limit()
        if (res && res.code === 0 && typeof res.data !== 'undefined') {
          this.licenseLimit = Number(res.data)
        }
      } catch (error) {
        console.warn('Failed to load license concurrency limit', error)
      }
    },
    async runScript() {
      // 防止重复点击
      if (this.isRunning) return

      if (this.selecedDevices.length === 0) {
        return;
      }

      // 保证只会执行一次
      this.isRunning = true
      try {
        if (this.$refs.currentDialog && typeof this.$refs.currentDialog.runScript === 'function') {
          const success = await this.$refs.currentDialog.runScript(this.enable_multi_account, this.rotate_proxy, this.selecedDevices);
          if (success) {
            // 关闭对话框（组件可能会被卸载）
            await this.$emiter('closeDialog', {})
          }
        }
      } catch (err) {
        // 保持原有行为，记录错误以便排查
        console.error('runScript error', err)
        throw err
      } finally {
        // 若组件已被卸载，设置 isRunning 无意义但不会报错；保守地恢复状态
        try { this.isRunning = false } catch (e) { /* ignore */ }
      }
    },
  },
  computed: {
    licenseHintClass() {
      if (this.licenseLimit === null) {
        return ''
      }
      if (this.licenseLimit === 0) {
        return 'text-error'
      }
      if (this.selecedDevices.length > this.licenseLimit) {
        return 'text-warning'
      }
      return 'text-info'
    }
  },
  async mounted() {
    // test 脚本不受 license 限制，避免不必要的请求
    if (this.script && this.script.name === 'test') return
    await this.fetchLicenseLimit()
  }
}
</script>