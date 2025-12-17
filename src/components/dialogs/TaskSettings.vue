<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box bg-base-300 max-w-2xl">
      <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-cog" class="h-5 w-5 text-primary" />
        {{ $t('taskSettings') }}
      </h3>
      <p class="text-sm text-base-content/70 mb-6">{{ $t('taskSettingsDesc') }}</p>

      <div class="space-y-6">
        <!-- Auto Retry Setting -->
        <div class="bg-base-200/70 rounded-xl p-4 border border-base-300/60">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <font-awesome-icon icon="fa-solid fa-rotate" class="h-4 w-4 text-primary" />
                <h4 class="font-semibold">{{ $t('autoRetry') }}</h4>
              </div>
              <p class="text-sm text-base-content/60">{{ $t('autoRetryDesc') }}</p>
            </div>
            <input 
              type="checkbox" 
              class="toggle toggle-primary toggle-md mt-1" 
              v-model="localAutoRetry"
              @change="updateAutoRetry"
            />
          </div>
        </div>

        <!-- Max Retry Count Setting -->
        <div class="bg-base-200/70 rounded-xl p-4 border border-base-300/60">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <font-awesome-icon icon="fa-solid fa-hashtag" class="h-4 w-4 text-primary" />
                <h4 class="font-semibold">{{ $t('maxRetryCount') }}</h4>
              </div>
              <p class="text-sm text-base-content/60">{{ $t('maxRetryCountDesc') }}</p>
            </div>
            <div class="flex items-center gap-2">
              <input 
                type="number" 
                min="1" 
                max="10" 
                class="input input-bordered input-md w-20 text-center"
                v-model.number="localMaxRetryCount"
                @change="updateMaxRetryCount"
              />
            </div>
          </div>
        </div>

        <!-- Random Order Setting -->
        <div class="bg-base-200/70 rounded-xl p-4 border border-base-300/60">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <font-awesome-icon icon="fa-solid fa-random" class="h-4 w-4 text-primary" />
                <h4 class="font-semibold">{{ $t('randomOrder') }}</h4>
              </div>
              <p class="text-sm text-base-content/60">{{ $t('randomOrderDesc') }}</p>
            </div>
            <input 
              type="checkbox" 
              class="toggle toggle-primary toggle-md mt-1" 
              v-model="localRandomOrder"
              @change="updateRandomOrder"
            />
          </div>
        </div>
      </div>

      <!-- Close button -->
      <div class="modal-action">
        <button class="btn btn-md" @click="closeDialog">
          {{ $t('close') }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
import { getItem, setItem } from '@/utils/storage.js';

export default {
  name: 'TaskSettings',
  props: {
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localAutoRetry: false,
      localMaxRetryCount: 3,
      localRandomOrder: false
    }
  },
  methods: {
    async showDialog() {
      // Load current values
      await this.loadSettings();
      this.$refs.dialog.showModal();
    },
    closeDialog() {
      this.$refs.dialog.close();
    },
    async loadSettings() {
      try {
        // Load auto retry from storage
        const storedAutoRetry = await getItem('autoRetry');
        if (storedAutoRetry !== null) {
          this.localAutoRetry = storedAutoRetry === 'true';
        }

        // Load max retry count from backend
        const res = await this.$service.get_settings();
        if (res && res.data) {
          if (res.data.max_retry_count !== undefined) {
            this.localMaxRetryCount = res.data.max_retry_count;
          }
          if (res.data.random_order !== undefined) {
            this.localRandomOrder = res.data.random_order;
          }
        }
      } catch (error) {
        console.error('Failed to load task settings:', error);
      }
    },
    async updateAutoRetry() {
      try {
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: `${this.$t('autoRetry')}: ${this.localAutoRetry ? this.$t('enabled') : this.$t('disabled')}`,
          timeout: 2000
        });
        await setItem('autoRetry', this.localAutoRetry ? 'true' : 'false');
        
        // Emit event to reload tasks if auto retry is enabled
        if (this.localAutoRetry) {
          await this.$emiter('reload_tasks', {});
        }
      } catch (error) {
        console.error('Failed to update auto retry:', error);
      }
    },
    async updateMaxRetryCount() {
      try {
        await this.$service.update_settings({
          max_retry_count: this.localMaxRetryCount
        });
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: `${this.$t('maxRetryCount')}: ${this.localMaxRetryCount}`,
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to update max retry count:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('updateFailed'),
          timeout: 2000
        });
      }
    },
    async updateRandomOrder() {
      try {
        await this.$service.update_settings({
          random_order: this.localRandomOrder
        });
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: `${this.$t('randomOrder')}: ${this.localRandomOrder ? this.$t('enabled') : this.$t('disabled')}`,
          timeout: 2000
        });
        // Emit reload settings event
        await this.$emiter('reload_settings', {});
      } catch (error) {
        console.error('Failed to update random order:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('updateFailed'),
          timeout: 2000
        });
      }
    }
  }
}
</script>
