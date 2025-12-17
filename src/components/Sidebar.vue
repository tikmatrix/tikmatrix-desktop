<template>
  <div ref="sidebarContainer"
    class="sidebar relative bg-base-100 flex flex-col w-full max-w-md lg/max-w-md h-full overflow-y-auto no-scrollbar rounded-xl shadow-lg border border-base-200/70">
    <div class="px-2 pt-3 pb-16 space-y-4">

      <div class="tabs tabs-md tabs-border border border-base-300 bg-base-500 rounded-md shadow-lg p-2">
        <input type="radio" name="my_tabs_3" class="tab" :aria-label="$t('general')" checked="checked" />
        <div class="tab-content mt-2">
          <General :settings="settings" />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" :aria-label="$t('customCommands')" />
        <div class="tab-content mt-2">
          <CustomCommands :settings="settings" />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" :aria-label="$t('scripts')" />
        <div class="tab-content mt-2">
          <Scripts :settings="settings" />
        </div>
      </div>

      <section class="space-y-2">
        <header class="flex items-center justify-between">
          <h2 class="text-md font-semibold tracking-wide uppercase text-base-content/70">{{ $t('tasks') }}</h2>
        </header>
        <div class="flex flex-col gap-2 border border-base-300/60 bg-base-200/60 rounded-2xl shadow-md p-2">
          <Tasks :settings="settings" />
        </div>
      </section>

      <section class="space-y-3">
        <header class="flex items-center justify-between">
          <h2 class="text-md font-semibold tracking-wide uppercase text-base-content/70">{{ $t('groups') }}</h2>
          <button class="btn btn-md btn-primary gap-1 px-3 py-1" @click="addGroup">
            <font-awesome-icon icon="fa-solid fa-plus" class="h-3 w-3" />
            <span class="text-md">{{ $t('addGroup') }}</span>
          </button>
        </header>
        <input ref="groupNameInput" v-if="showAddGroup"
          class="input input-md input-bordered w-full mt-1 rounded-xl border-base-300 focus:ring-2 focus:ring-primary/40"
          type="text" v-model="newGroupName" v-on:keyup.enter="saveGroup" @focus="(event) => event.target.select()" />
        <div class="bg-base-200/70 rounded-2xl shadow-md border border-base-300/60">
          <div class="flex flex-wrap items-center gap-2 p-2">
            <label class="flex items-center gap-1.5 cursor-pointer select-none text-primary text-md font-medium">
              <input type="checkbox" class="checkbox checkbox-md ring-1" @change="selectAll(0, $event)"
                :checked="isSelectAll(0)" />
              <span class="whitespace-nowrap">{{ $t('allDevices') }} ({{ groupDeviceCount(0) }})</span>
            </label>

            <div ref="moveToGroupMenu" class="dropdown dropdown-top ml-auto shrink-0">
              <div tabindex="0" role="button" class="text-primary cursor-pointer flex items-center gap-1">
                <span class="text-md font-medium whitespace-nowrap">{{ $t('moveToGroup') }}</span>
                <font-awesome-icon icon="fa-solid fa-share" class="h-3 w-3"></font-awesome-icon>
              </div>

              <ul tabindex="0"
                class="dropdown-content flex-col bg-base-100 max-h-96 max-w-48 overflow-y-auto text-left p-2 rounded-md shadow-lg ring-1 space-y-1">
                <li @click="moveToGroup(0, item.id)" v-for="(item, index) in groups" :key="item.id"
                  :class="['px-2 py-1 link w-full border-b border-base-300 last:border-none rounded-md', index % 2 == 0 ? 'bg-primary/10' : 'bg-primary/20']">
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <span class="text-md text-base-content/70 select-none shrink-0 whitespace-nowrap">{{ $t('selected') }}
              {{ selectionCount(0) }}
              {{ $t('units') }}
            </span>
          </div>
          <div class="px-2 py-2">
            <drag-select v-model="selection" class="flex flex-wrap gap-2">
              <drag-select-option v-for="(item, index) in devices" :value="item.real_serial" :key="index"
                :class="deviceIndexClasses(item.real_serial)">
                <span class="font-semibold text-md">{{ index + 1 }}</span>
              </drag-select-option>
            </drag-select>
          </div>
        </div>

        <div class="space-y-3 mt-3">
          <div class="bg-base-200/70 rounded-2xl shadow-md border border-base-300/60 scroll-mt-6"
            v-for="item in sortedGroups" :key="item.id">
            <div class="flex flex-wrap items-center gap-2 p-2 border-b border-base-300/50">
              <label class="flex items-center gap-1.5 cursor-pointer select-none text-primary text-md font-medium">
                <input type="checkbox" class="checkbox checkbox-md ring-1" @change="selectAll(item.id, $event)"
                  :checked="isSelectAll(item.id)" />
                <span class="whitespace-nowrap">{{ item.name }} ({{ groupDeviceCount(item.id) }})</span>
              </label>

              <div class="flex items-center gap-2 ml-auto">
                <span class="text-md text-base-content/70 select-none whitespace-nowrap">{{ $t('selected') }}
                  {{ selectionCount(item.id) }}
                  {{ $t('units') }}
                </span>
                <font-awesome-icon icon="fa-solid fa-edit" class="text-primary cursor-pointer h-3 w-3"
                  @click="renameGroup(item)"></font-awesome-icon>
                <div class="tooltip" :data-tip="$t('deleteGroup')">
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-error cursor-pointer h-3 w-3"
                    @click="deleteGroup(item.id)"></font-awesome-icon>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-1.5 px-2 pb-2 pt-1.5 border-b border-base-300/50">
              <button class="btn btn-md btn-primary gap-1 px-2"
                @click="$emiter('showDialog', { name: 'accountWarmup', group: item })">
                <font-awesome-icon icon="cog" class="h-2.5 w-2.5" />
                {{ $t('accountWarmup') }}
              </button>
              <button class="btn btn-md btn-primary gap-1 px-2"
                @click="$emiter('showDialog', { name: 'post', group: item })">
                <font-awesome-icon icon="cog" class="h-2.5 w-2.5" />
                {{ $t('post') }}
              </button>
              <button class="btn btn-md btn-primary gap-1 px-2"
                @click="$emiter('showDialog', { name: 'materials', group: item })">
                <font-awesome-icon icon="fa-solid fa-film" class="h-2.5 w-2.5" />
                {{ $t('materials') }}
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  </div>


</template>
<style scoped></style>
<script>

import General from './General.vue'
import Scripts from './Scripts.vue'
import Tasks from './Tasks.vue'
import CustomCommands from './CustomCommands.vue';
import { open, ask } from '@tauri-apps/api/dialog';
import { readText } from '@tauri-apps/api/clipboard';

export default {
  name: 'Sidebar',
  props: {
    devices: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },

  },
  components: {
    General,
    Tasks,
    Scripts,
    CustomCommands
  },
  computed: {
    sortedGroups() {
      //sort by device count
      return [...this.groups].sort((a, b) => this.groupDevices[b.id]?.length - this.groupDevices[a.id]?.length)
    }
  },
  data() {
    return {
      menuItems: [],
      fullMenuItems: [
      ],
      selection: [],
      newGroupName: '',
      showAddGroup: false,
      updateGroup: null,
      selections: {
        0: [],
      },
      selectedTab: 'general',
      groupDevices: {
        0: [],
      },
      port: -1,
      listeners: [],
      adImage: '',
      adLink: '',
      adTitle: '',
      isRefreshingSelections: false,
    }
  },

  watch: {

    selection(newVal) {
      this.$emiter('selecedDevices', newVal)
      this.refreshSelections()
    },
    groups: {
      handler: function () {
        this.refreshSelections()
      },
      deep: true
    },
    devices: {
      handler: function () {
        this.refreshSelections()
      },
      deep: true
    },
  },
  methods: {
    setActiveTab(tab) {
      this.selectedTab = tab
    },
    tabClasses(tab) {
      const isActive = this.selectedTab === tab
      return [
        'rounded-xl shadow-md',
        isActive
          ? 'bg-linear-to-r from-primary via-secondary to-primary/80 text-primary-content shadow-md ring-1 ring-primary/50 scale-[1.02]'
          : 'text-base-content/70 hover:text-base-content hover:bg-primary/10'
      ]
    },
    deviceIndexClasses(serial) {
      const isSelected = this.selection.includes(serial)
      return [
        'inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-150 select-none',
        isSelected
          ? 'bg-primary text-primary-content border-primary shadow-md scale-[1.05]'
          : 'bg-base-100/80 text-base-content/70 border-base-300 hover:border-primary/60 hover:text-base-content'
      ]
    },

    async renameGroup(item) {
      if (this.showAddGroup) {
        this.showAddGroup = false
        return
      }
      this.updateGroup = item
      this.showAddGroup = true
      this.newGroupName = item.name
      //get focus
      this.$nextTick(() => {
        this.$refs.groupNameInput.focus()
      })

    },
    async addGroup() {
      if (this.showAddGroup) {
        this.showAddGroup = false
        return
      }
      this.updateGroup = null
      this.showAddGroup = true
      this.newGroupName = 'New Group'
      //get focus
      this.$nextTick(() => {
        this.$refs.groupNameInput.focus()
      })
    },
    async saveGroup() {
      if (this.updateGroup) {
        this.updateGroup.name = this.newGroupName
        this.$service
          .update_group(this.updateGroup)
          .then(async () => {
            this.newGroupName = ''
            this.showAddGroup = false
            await this.$emiter('reload_groups', {})
          })
      } else {
        this.$service
          .add_group({
            name: this.newGroupName,
          })
          .then(async () => {
            this.newGroupName = ''
            this.showAddGroup = false
            await this.$emiter('reload_groups', {})

          })
      }

    },
    async deleteGroup(id) {
      const yes = await ask(this.$t('deleteGroupConfirm'), this.$t('confirm'));
      if (yes) {
        this.$service
          .delete_group({
            id: id
          })
          .then(async () => {
            await this.$emiter('reload_groups', {})
          })
      }

    },
    async moveToGroup(src_id, dst_id) {
      this.$refs.moveToGroupMenu.classList.remove('dropdown-open')
      let serials = []
      for (let i = 0; i < this.selections[src_id].length; i++) {
        serials.push(this.selections[src_id][i])
      }
      if (serials.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service.move_to_group({ serials: serials, dst_id: dst_id }).then(async () => {
        this.devices.map(device => {
          if (serials.includes(device.real_serial)) {
            device.group_id = dst_id
          }
        })
        this.refreshSelections()
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('moveSuccess'),
          timeout: 2000
        });
      })
    },

    async uploadFiles() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      const filePath = await open({
        multiple: true, // 是否允许多选文件
        directory: false, // 是否选择目录
        filters: [ // 文件过滤器
          { name: 'Upload Files', extensions: ['mp4', 'jpg', 'png', 'jpeg'] },
        ]
      });
      if (!filePath) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noFilesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .upload_video({
          files: filePath,
          serials: this.selection
        })
        .then(res => {
          console.log(res)
        })
    },
    async selectApkFile() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      const filePath = await open({
        multiple: false, // 是否允许多选文件
        directory: false, // 是否选择目录
        filters: [ // 文件过滤器
          { name: 'Apk Files', extensions: ['apk'] },
        ]
      });
      if (!filePath) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noFilesSelected'),
          timeout: 2000
        });
        return
      }
      let args = {
        apk_path: filePath,
      }
      await this.run_now_by_account('install', args)
    },
    async adb_command(args) {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .adb_command({
          serials: this.selection,
          args: args
        })
        .then(async res => {
          console.log(res)
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('commandSendSuccess'),
            timeout: 2000
          });
        })
    },

    async run_now_by_account(name, args = {}) {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }

      this.$service
        .run_now_by_account({
          script_name: name,
          serials: this.selection,
          script_args: JSON.stringify(args)
        })
        .then(async (res) => {
          if (res.code == 40004) {
            await this.$emiter('NOTIFY', {
              type: 'error',
              message: this.$t('noAccount'),
              timeout: 2000
            });
            return
          }
          await this.$emiter('reload_tasks', {})
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: `${res.data} ${this.$t('taskCreated')}`,
            timeout: 2000
          });
        })
    },

    isSelectAll(id) {
      const devices = this.groupDevices[id] || []
      const selected = this.selections[id] || []
      return devices.length > 0 && selected.length === devices.length
    },
    groupDeviceCount(id) {
      return this.groupDevices[id]?.length ?? 0
    },
    selectionCount(id) {
      return this.selections[id]?.length ?? 0
    },
    async selectAll(id, event) {
      const isCtrlPressed = event?.ctrlKey || event?.metaKey // metaKey for Mac
      const groupDeviceSerials = id === 0
        ? this.devices.map(device => device.real_serial)
        : this.devices
            .filter(device => device.group_id === id)
            .map(device => device.real_serial)
      
      if (isCtrlPressed) {
        // Multi-select mode with Ctrl key
        if (this.isSelectAll(id)) {
          // Remove all devices from this group from selection
          this.selection = this.selection.filter(serial => !groupDeviceSerials.includes(serial))
        } else {
          // Add all devices from this group to selection
          const newSerials = groupDeviceSerials.filter(serial => !this.selection.includes(serial))
          this.selection = [...this.selection, ...newSerials]
        }
      } else {
        // Single-select mode (original behavior)
        if (!this.isSelectAll(id)) {
          this.selection = groupDeviceSerials
        } else {
          this.selection = []
        }
      }
      this.refreshSelections()
    },
    async refreshSelections() {
      if (this.isRefreshingSelections) {
        return
      }

      this.isRefreshingSelections = true
      try {
        const selectionSet = new Set(this.selection)
        const activeGroupIds = new Set([0])

        this.groupDevices[0] = [...this.devices]
        this.selections[0] = this.devices
          .filter(device => selectionSet.has(device.real_serial))
          .map(device => device.real_serial)

        for (let i = 0; i < this.groups.length; i++) {
          const groupId = this.groups[i].id
          activeGroupIds.add(groupId)

          const devicesInGroup = this.devices.filter(device => device.group_id === groupId)
          this.groupDevices[groupId] = devicesInGroup
          this.selections[groupId] = devicesInGroup
            .filter(device => selectionSet.has(device.real_serial))
            .map(device => device.real_serial)
        }

        Object.keys(this.groupDevices).forEach((key) => {
          const numericKey = Number(key)
          if (!activeGroupIds.has(numericKey)) {
            delete this.groupDevices[numericKey]
            delete this.selections[numericKey]
          }
        })

        await this.$nextTick()
      } finally {
        this.isRefreshingSelections = false
      }
    },
    async get_menus() {
      this.$service.get_menus().then(res => {
        this.menuItems = this.fullMenuItems.filter(item => res.data.includes(item.name))
      })
    },



    async setText(text) {
      this.$service.set_text({
        text: text,
        serials: this.selection,
      }).then(res => {
        console.log(res)
      })
    },
    async initDevice() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      // Create init task through task scheduler instead of direct execution
      await this.run_now_by_account('init', {})
    },


    async massDM(args) {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }

      this.$service
        .message_now({
          serials: this.selection,
          ...args
        })
        .then(async (res) => {
          await this.$emiter('reload_tasks', {})
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: `${res.data} ${this.$t('taskCreated')}`,
            timeout: 2000
          });
        })
    },
    async massComment(args) {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }

      this.$service
        .comment_now({
          serials: this.selection,
          ...args
        })
        .then(async (res) => {
          await this.$emiter('reload_tasks', {})
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: `${res.data} ${this.$t('taskCreated')}`,
            timeout: 2000
          });
        })
    },

    async massFO() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }

      this.$service
        .follow_now({
          serials: this.selection,
        })
        .then(async (res) => {
          await this.$emiter('reload_tasks', {})
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: `${res.data} ${this.$t('taskCreated')}`,
            timeout: 2000
          });

        })
    },

    async stop_task() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .stop_task({
          serials: this.selection,
        })
        .then(async () => {
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('commandSendSuccess'),
            timeout: 2000
          });
          await this.$emiter('reload_running_tasks', {})
        })
    },
    async send_keycode(keycode) {
      await this.$emiter('eventData', JSON.stringify({
        type: 'keycode',//type=keycode
        operation: 'd',//operation=down
        keycode,
      }));
      setTimeout(async () => {
        await this.$emiter('eventData', JSON.stringify({
          type: 'keycode',//type=keycode
          operation: 'u',//operation=up
          keycode,
        }));
      }, 100);
    },




    async clearGallery() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      await this.$emiter('NOTIFY', {
        type: 'info',
        message: this.$t('clearGalleryStart'),
        timeout: 2000
      });
      this.$service
        .clear_gallery({
          serials: this.selection,
        })
        .then(async () => {
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('clearGallerySuccess'),
            timeout: 2000
          });
        })
    },


    async pasteToPhone() {
      //check visibility
      if (!document.hasFocus()) {
        return
      }
      // 检查是否有对话框打开
      const activeDialog = document.querySelector('dialog.modal[open]');
      if (activeDialog) {
        return;
      }
      if (this.selection.length == 0) {
        return
      }
      const text = await readText()
      this.setText(text)
      await this.$emiter('NOTIFY', {
        type: 'success',
        message: this.$t('pasteSuccess'),
        timeout: 2000
      });
    },
    async massScrape(args) {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .scrape_now({
          serials: this.selection,
          ...args
        })
        .then(async (res) => {
          await this.$emiter('reload_tasks', {})
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: `${res.data} ${this.$t('taskCreated')}`,
            timeout: 2000
          });
        })
    },
    //openTiktok
    async openTikTok() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .open_tiktok({
          serials: this.selection,
          args: []
        })
        .then(async () => {
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('commandSendSuccess'),
            timeout: 2000
          });
        })
    },
    //stopTiktok
    async stopTiktok() {
      if (this.selection.length == 0) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('noDevicesSelected'),
          timeout: 2000
        });
        return
      }
      this.$service
        .stop_tiktok({
          serials: this.selection,
          args: []
        })
        .then(async () => {
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('commandSendSuccess'),
            timeout: 2000
          });
        })
    },

  },
  async mounted() {
    this.refreshSelections()
    this.listeners.push(await this.$listen('openDevice', async (e) => {
      console.log("receive openDevice: ", e.payload)
      // this.selection = [...this.selection.filter(serial => serial !== e.payload.real_serial), e.payload.real_serial]
      //only select one device
      this.selection = [e.payload.real_serial]
      this.refreshSelections()
    }))
    this.listeners.push(await this.$listen('closeDevice', (e) => {
      this.selection = this.selection.filter(serial => serial !== e.payload.real_serial)
      this.refreshSelections()
    }))
    this.listeners.push(await this.$listen('adbEventData', (e) => {
      this.adb_command(e.payload.args)

    }))

    this.listeners.push(await this.$listen('run_now_by_account', (e) => {
      console.log("receive run_now_by_account: ", e.payload)
      this.run_now_by_account(e.payload.name, e.payload.args)
    }))
    this.listeners.push(await this.$listen('uploadFiles', () => {
      this.uploadFiles()
    }))
    this.listeners.push(await this.$listen('installApks', () => {
      this.selectApkFile()
    }))
    this.listeners.push(await this.$listen('initDevice', () => {
      this.initDevice()
    }))
    this.listeners.push(await this.$listen('setText', (e) => {
      this.setText(e.payload)
    }))
    this.listeners.push(await this.$listen('eventData', async (e) => {
      let new_data = {
        devices: [...this.selection],
        data: e.payload
      }

      await this.$emiter('syncEventData', new_data)
    }))


    this.listeners.push(await this.$listen('massDM', (e) => {
      this.massDM(e.payload);
    }))
    this.listeners.push(await this.$listen('massComment', (e) => {
      this.massComment(e.payload);
    }))
    this.listeners.push(await this.$listen('massFO', () => {
      this.massFO();
    }))

    this.listeners.push(await this.$listen('stop_task', () => {
      this.stop_task();
    }))
    this.listeners.push(await this.$listen('send_keycode', (e) => {
      this.send_keycode(e.payload)
    }))

    this.listeners.push(await this.$listen('clearGallery', () => {
      this.clearGallery()
    }))

    this.listeners.push(document.addEventListener('paste', () => {
      console.log("paste event triggered")
      this.pasteToPhone()
    }))

    this.listeners.push(await this.$listen('massScrape', (e) => {
      this.massScrape(e.payload);
    }))
    //openTiktok
    this.listeners.push(await this.$listen('openTikTok', () => {
      this.openTikTok();
    }))
    //stopTiktok
    this.listeners.push(await this.$listen('stopTiktok', () => {
      this.stopTiktok();
    }))

  },
  unmounted() {
    this.listeners.forEach(listener => {
      if (listener) {
        listener()
      }
    })
    this.listeners = []
  }
}
</script>
