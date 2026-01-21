<template>
  <dialog ref="page_dialog" class="modal">
    <div class="modal-box max-w-[80%] w-auto max-h-[90vh] overflow-y-auto">
      <ManageAccounts :devices="devices" v-if="selectedItem.name === 'accounts' && $refs.page_dialog.open" />
      <AccountAnalytics :accounts="accounts"
        v-if="selectedItem.name === 'accountAnalytics' && $refs.page_dialog.open" />
      <ManagePlans :devices="devices" v-if="selectedItem.name === 'plans' && $refs.page_dialog.open" />
      <Settings :settings="settings" v-if="selectedItem.name === 'tiktokSettings' && $refs.page_dialog.open" />
      <AccountWarmupSettings v-if="selectedItem.name === 'accountWarmup' && $refs.page_dialog.open"
        :group="selectedItem.group" />
      <PostSettings v-if="selectedItem.name === 'post' && $refs.page_dialog.open" :group="selectedItem.group" />
      <ManageMaterials :group="selectedItem.group" v-if="selectedItem.name === 'materials' && $refs.page_dialog.open" />
      <ManageTasks :devices="devices" v-if="selectedItem.name === 'tasks' && $refs.page_dialog.open" />
      <BeforeRunScriptDialog :selecedDevices="selecedDevices" :devices="devices" :script="selectedItem.script"
        :settings="settings" v-if="selectedItem.name === 'beforeRunScriptDialog' && $refs.page_dialog.open" />
      <SupportCenter :devices="devices" :seleced-devices="selecedDevices"
        v-if="selectedItem.name === 'support' && $refs.page_dialog.open" />
      <ManageScheduleTemplates v-if="selectedItem.name === 'scheduleTemplates' && $refs.page_dialog.open" />

    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>


</template>

<script>
import ManageAccounts from './components/account/ManageAccounts.vue'
import AccountAnalytics from './components/account/AccountAnalytics.vue'
import ManagePlans from './components/plan/ManagePlans.vue'
import Settings from './components/Settings.vue'
import PostSettings from './components/groups/PostSettings.vue'
import ManageMaterials from './components/material/ManageMaterials.vue'
import ManageTasks from './components/tasks/ManageTasks.vue'
import BeforeRunScriptDialog from './components/dialogs/BeforeRunScriptDialog.vue'
import AccountWarmupSettings from './components/groups/AccountWarmupSettings.vue'
import SupportCenter from './components/support/SupportCenter.vue'
import ManageScheduleTemplates from './components/schedule/ManageScheduleTemplates.vue'
export default {
  name: 'appDialog',
  props: {
    devices: {
      type: Array,
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
    ManageAccounts,
    AccountAnalytics,
    ManagePlans,
    Settings,
    ManageMaterials,
    ManageTasks,
    BeforeRunScriptDialog,
    AccountWarmupSettings,
    PostSettings,
    SupportCenter,
    ManageScheduleTemplates
  },
  data() {
    return {
      selectedItem: {},
      accounts: []
    }
  },
  methods: {
    async loadAccounts() {
      try {
        console.log('Loading accounts...');
        const res = await this.$service.get_accounts();
        this.accounts = res.data || [];
        console.log('Accounts loaded:', this.accounts.length);
      } catch (error) {
        console.error('Failed to load accounts:', error);
        this.accounts = [];
      }
    },
    async menu_selected(item) {
      this.selectedItem = item
      // 如果打开账号分析页面，重新加载账号数据
      if (item.name === 'accountAnalytics') {
        await this.loadAccounts();
      }

      this.$refs.page_dialog.showModal()
      this.$refs.page_dialog.addEventListener('close', () => {
        this.selectedItem = {}
      })
    },



  },
  async mounted() {
    await this.loadAccounts();

    // 监听关闭页面对话框事件
    await this.$listen('closeDialog', () => {
      this.$refs.page_dialog.close();
    });

    // 监听菜单选择事件
    await this.$listen('showDialog', (e) => {
      this.menu_selected(e.payload);
    });
  }
}
</script>
