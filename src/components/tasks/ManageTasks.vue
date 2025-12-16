<template>
  <div class="w-full">
    <Pagination :items="filter_tasks" :searchKeys="['id', 'device_index', 'script_name']"
      :searchTermPlaceholder="$t('searchTaskPlaceholder')" @refresh="get_tasks">
      <template v-slot:buttons>
        <MyButton @click="retry_all_failed" label="retryAllFaied" icon="fa fa-repeat" />
        <MyButton @click="clearAll" label="clearAll" icon="fa fa-trash" />
        <select v-model="searchStatus" class="select select-md w-32 select-bordered ml-2">
          <option value="">{{ $t('allStatus') }}</option>
          <option value="0">{{ $t('waiting') }}</option>
          <option value="1">{{ $t('execing') }}</option>
          <option value="2">{{ $t('success') }}</option>
          <option value="3">{{ $t('failed') }}</option>
        </select>
      </template>
      <template v-slot:default="slotProps">
        <div class="overflow-x-auto">
          <table class="table table-md">
            <thead>
              <tr>
                <th>{{ $t('id') }}</th>
                <th>{{ $t('scriptName') }}</th>
                <th>{{ $t('startTime') }}</th>
                <th>{{ $t('taskDuration') }}</th>
                <th>{{ $t('status') }}</th>
                <th>{{ $t('retryCount') }}</th>
                <th>{{ $t('username') }}</th>
                <th>{{ $t('device') }}</th>
                <th>{{ $t('actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in slotProps.items" :key="index">
                <td>{{ task.id }}</td>
                <td><span class="badge badge-ghost badge-md">{{ task.script_name }}</span></td>
                <td>
                  <span class="badge badge-ghost badge-md">{{ task.start_time }}</span>
                </td>
                <td>
                  <span class="badge badge-ghost badge-md">{{ getTaskDuration(task) }}</span>
                </td>
                <td>
                  <div class="badge badge-neutral badge-md" v-if="task.status == '0'">{{ $t('waiting') }}</div>
                  <div class="badge badge-primary badge-md" v-else-if="task.status == '1'">{{ $t('execing') }}</div>
                  <div class="badge badge-success badge-md" v-else-if="task.status == '2'">{{ $t('success') }}</div>
                  <div class="badge badge-error badge-md" v-else-if="task.status == '3'">{{ $t('failed') }}</div>
                </td>
                <td>
                  <span class="badge badge-info badge-md">{{ task.retry_count || 0 }}</span>
                </td>
                <td><span class="badge badge-ghost badge-md">{{ getTaskArg(task.script_args, 'username') }}</span></td>
                <td>
                  <a class="link link-primary" @click="show_device(task.serial)" v-if="task.device_index">{{
                    task.device_index }}</a>
                  <span v-else class="text text-error">{{ $t('offline') }}</span>
                </td>
                <td>
                  <div class="space-x-4">
                    <button class="btn btn-md btn-primary rounded" @click="retry(task)" :disabled="!canRetry(task)"
                      :title="retryTooltip(task)">{{
                        $t('retry') }}</button>
                    <button class="btn btn-md btn-error rounded" @click="deleteTask(task)">{{
                      $t('delete') }}</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Pagination>

    <!-- 清空所有任务确认对话框 -->
    <dialog ref="clear_all_confirm_dialog" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-warning">
          <i class="fa fa-exclamation-triangle mr-2"></i>{{ $t('warning') }}
        </h3>
        <div class="py-4">
          <p class="text-lg mb-2">{{ $t('clearAllTasksConfirm') }}</p>
          <p class="text-md text-base-content/70">{{ $t('operationCannotBeUndone') }}</p>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-ghost mr-2">{{ $t('cancel') }}</button>
          </form>
          <button class="btn btn-error" @click="confirmClearAll">
            <i class="fa fa-trash mr-1"></i>{{ $t('confirm') }}
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>


  </div>
</template>
<script>
import MyButton from '../Button.vue'
import Pagination from '../Pagination.vue'
import { formatDuration } from '@/utils/formatDuration.js'

export default {
  name: 'app',
  components: {
    MyButton,
    Pagination
  },
  props: {
    devices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tasks: [],
      currentDevice: null,
      searchStatus: '',
      maxRetryCount: 3,
      timers: {},
      currentTime: Date.now()
    }
  },
  computed: {
    filter_tasks() {
      let tasks = this.tasks
      if (this.searchStatus) {
        tasks = tasks.filter(task => task.status == this.searchStatus)
      }
      return tasks
    },

  },
  methods: {
    async loadMaxRetryCount() {
      try {
        const res = await this.$service.get_settings();
        if (res && res.data && res.data.max_retry_count) {
          this.maxRetryCount = res.data.max_retry_count;
        }
      } catch (error) {
        console.error('Failed to load max retry count:', error);
      }
    },
    getTaskArg(args, key) {
      try {
        console.log(args);
        const obj = typeof args === 'string' ? JSON.parse(args) : args;
        console.log(obj);
        return obj && obj[key] !== undefined ? obj[key] : '';
      } catch (e) {
        return '';
      }
    },
    getTaskDuration(task) {
      // Priority 1: Use duration_seconds if available
      if (task.duration_seconds !== null && task.duration_seconds !== undefined && task.duration_seconds >= 0) {
        return formatDuration(task.duration_seconds);
      }

      // Priority 2: Calculate from started_at and finished_at
      if (task.started_at && task.finished_at) {
        try {
          const start = new Date(task.started_at).getTime();
          const end = new Date(task.finished_at).getTime();
          const durationSeconds = Math.floor((end - start) / 1000);
          return formatDuration(durationSeconds);
        } catch (e) {
          console.error('Error calculating duration from timestamps:', e);
        }
      }

      // Priority 3: Real-time calculation for running tasks
      if (task.status === '1' && task.started_at) {
        try {
          const start = new Date(task.started_at).getTime();
          const durationSeconds = Math.floor((this.currentTime - start) / 1000);
          return formatDuration(durationSeconds);
        } catch (e) {
          console.error('Error calculating real-time duration:', e);
        }
      }

      return '--:--:--';
    },
    startTimer() {
      // Update current time every second for running tasks
      this.timers.mainTimer = setInterval(() => {
        this.currentTime = Date.now();
      }, 1000);
    },
    stopTimer() {
      if (this.timers.mainTimer) {
        clearInterval(this.timers.mainTimer);
        this.timers.mainTimer = null;
      }
    },

    async clearAll() {
      // 显示确认对话框
      this.$refs.clear_all_confirm_dialog.showModal()
    },
    async confirmClearAll() {
      // 关闭确认对话框
      this.$refs.clear_all_confirm_dialog.close()
      // 执行清空操作
      this.$service
        .delete_all_tasks()
        .then(() => {
          this.get_tasks()
        })
    },

    async show_device(serial) {
      let mydevice = this.devices.find(d => d.serial === serial || d.real_serial === serial)
      await this.$emiter('openDevice', mydevice)
    },
    async get_tasks() {
      this.currentTask = null
      this.$service
        .get_tasks()
        .then(async (res) => {
          this.tasks = res.data
          this.tasks.forEach(task => {
            task.device_index = this.devices.find(device => device.serial === task.serial || device.real_serial === task.serial)?.key
          })
          await this.$emiter('reload_tasks', {})
        }).catch(async (err) => {
          await this.$emiter('NOTIFY', {
            type: 'error',
            message: err.message,
            timeout: 2000
          })
        })
    },
    canRetry(task) {
      const retryCount = task?.retry_count ?? 0
      return retryCount < this.maxRetryCount
    },
    retryTooltip(task) {
      if (this.canRetry(task)) {
        return ''
      }
      return this.$t('maxRetryReached', { count: this.maxRetryCount })
    },

    async retry(task) {
      if (!this.canRetry(task)) {
        await this.$emiter('NOTIFY', {
          type: 'warning',
          message: this.$t('maxRetryReachedMessage', { count: this.maxRetryCount }),
          timeout: 2500
        })
        return
      }
      this.$service
        .update_task({
          id: task.id,
          status: 0,
          serial: task.serial
        })
        .then(async (res) => {
          if (!res || res.code !== 0) {
            const message = res?.data || this.$t('retryFailed')
            await this.$emiter('NOTIFY', {
              type: 'error',
              message,
              timeout: 2500
            })
            return
          }
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('retryQueued'),
            timeout: 2000
          })
          this.get_tasks()
        })
    },
    async deleteTask(task) {
      this.$service
        .delete_task({
          id: task.id
        })
        .then(res => {
          console.log(res)
          this.get_tasks()
        })
    },

    async retry_all_failed() {
      this.$service
        .retry_all_failed_tasks()
        .then(async (res) => {
          if (!res || res.code !== 0) {
            const message = res?.data || this.$t('retryAllFailedMessage')
            await this.$emiter('NOTIFY', {
              type: 'error',
              message,
              timeout: 2500
            })
            return
          }
          const resetCount = res.data || 0
          const notifyType = resetCount > 0 ? 'success' : 'info'
          const notifyMessage = resetCount > 0
            ? this.$t('retryAllQueued', { count: resetCount })
            : this.$t('retryAllLimitReached', { count: this.maxRetryCount })
          await this.$emiter('NOTIFY', {
            type: notifyType,
            message: notifyMessage,
            timeout: 2500
          })
          this.get_tasks()
        })
    }
  },
  async mounted() {
    this.loadMaxRetryCount();
    this.get_tasks();
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  }
}
</script>
