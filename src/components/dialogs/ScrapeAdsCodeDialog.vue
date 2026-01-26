<template>
  <!-- Top warning -->
  <div class="alert alert-info mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-spider" class="h-6 w-6 mr-2" />
      <span>{{ $t('scrapeAdsCodeWarning') }}</span>
    </div>
  </div>

  <div class="space-y-4">
    <!-- Parameter 1: Select post links file -->
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body p-4">
        <h3 class="card-title text-lg mb-4 text-primary">
          <font-awesome-icon icon="fa-solid fa-file-lines" class="mr-2" />
          {{ $t('postLinksFile') }}
        </h3>
        
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <button class="btn btn-primary btn-md" @click="selectPostLinksFile">
              <font-awesome-icon icon="fa-solid fa-file-arrow-up" class="mr-2" />
              {{ $t('selectFile') }}
            </button>
            <span v-if="postLinksFilePath" class="text-sm text-base-content/70 break-all">
              {{ postLinksFilePath }}
            </span>
            <span v-else class="text-sm text-base-content/50">
              {{ $t('noFileSelected') }}
            </span>
          </div>
          
          <div v-if="postLinksCount > 0" class="alert alert-success">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="mr-2" />
            <span>{{ $t('postLinksLoaded', { count: postLinksCount }) }}</span>
          </div>
          
          <div class="text-sm text-base-content/60">
            {{ $t('postLinksFileTips') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Parameter 2: Select save directory -->
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body p-4">
        <h3 class="card-title text-lg mb-4 text-primary">
          <font-awesome-icon icon="fa-solid fa-folder-open" class="mr-2" />
          {{ $t('saveDirectory') }}
        </h3>
        
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <button class="btn btn-secondary btn-md" @click="selectSaveDirectory">
              <font-awesome-icon icon="fa-solid fa-folder" class="mr-2" />
              {{ $t('selectDirectory') }}
            </button>
            <button 
              class="btn btn-outline btn-info btn-md" 
              @click="openSaveDirectory"
              :disabled="!saveDirectoryPath">
              <font-awesome-icon icon="fa-solid fa-folder-open" class="mr-2" />
              {{ $t('openDirectory') }}
            </button>
          </div>
          
          <div v-if="saveDirectoryPath" class="p-3 bg-base-200 rounded-lg">
            <div class="text-sm font-mono break-all">{{ saveDirectoryPath }}</div>
          </div>
          <div v-else class="text-sm text-base-content/50">
            {{ $t('noDirectorySelected') }}
          </div>
          
          <div class="text-sm text-base-content/60">
            {{ $t('saveDirectoryTips') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Run button -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t border-base-200">
      <button 
        class="btn btn-success btn-lg" 
        @click="runScript"
        :disabled="isRunning || !canRun">
        <span v-if="isRunning" class="loading loading-spinner loading-sm mr-2"></span>
        <font-awesome-icon v-else icon="fa-solid fa-play" class="mr-2" />
        {{ isRunning ? $t('running') : $t('runNow') }}
      </button>
    </div>
  </div>
</template>

<script>
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { invoke } from "@tauri-apps/api/tauri";
import { SettingsManager } from '@/utils/settingsManager';

const scrapeAdsCodeSettings = new SettingsManager('scrape_ads_code_settings.json');

export default {
  name: 'ScrapeAdsCodeDialog',
  mixins: [
    scrapeAdsCodeSettings.createVueMixin(
      {
        postLinksFilePath: '',
        saveDirectoryPath: '',
        postLinksCount: 0,
      },
      ['postLinksFilePath', 'saveDirectoryPath', 'postLinksCount']
    )
  ],
  data() {
    return {
      postLinksFilePath: '',
      saveDirectoryPath: '',
      postLinksCount: 0,
      isRunning: false,
    }
  },
  computed: {
    canRun() {
      return this.postLinksFilePath && this.saveDirectoryPath && this.postLinksCount > 0;
    }
  },
  methods: {
    async selectPostLinksFile() {
      try {
        const filePath = await open({
          multiple: false,
          directory: false,
          filters: [{ name: 'Text Files', extensions: ['txt'] }]
        });
        
        if (!filePath) return;
        
        // Read file content to count lines
        const content = await readTextFile(filePath);
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        this.postLinksFilePath = filePath;
        this.postLinksCount = lines.length;
        
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('fileLoadedSuccess'),
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to load post links file:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('fileLoadedError'),
          timeout: 3000
        });
      }
    },
    
    async selectSaveDirectory() {
      try {
        const dirPath = await open({
          multiple: false,
          directory: true,
        });
        
        if (!dirPath) return;
        
        this.saveDirectoryPath = dirPath;
        
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('directorySelectedSuccess'),
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to select save directory:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('directorySelectedError'),
          timeout: 3000
        });
      }
    },
    
    async openSaveDirectory() {
      if (!this.saveDirectoryPath) return;
      
      try {
        await invoke('open_path', { path: this.saveDirectoryPath });
      } catch (error) {
        console.error('Failed to open directory:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('directoryOpenError'),
          timeout: 3000
        });
      }
    },
    
    async runScript() {
      if (!this.canRun) {
        await this.$emiter('NOTIFY', {
          type: 'warning',
          message: this.$t('pleaseCompleteAllParameters'),
          timeout: 3000
        });
        return;
      }
      
      this.isRunning = true;
      
      try {
        const res = await this.$service.scrape_ads_code_run_now({
          post_links_file: this.postLinksFilePath,
          save_directory: this.saveDirectoryPath,
        });
        
        if (res && res.code === 0) {
          await this.$emiter('NOTIFY', {
            type: 'success',
            message: this.$t('taskStartedSuccess'),
            timeout: 3000
          });
        } else {
          await this.$emiter('NOTIFY', {
            type: 'error',
            message: res.msg || this.$t('taskStartedError'),
            timeout: 3000
          });
        }
      } catch (error) {
        console.error('Failed to run scrape ads code script:', error);
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('taskStartedError'),
          timeout: 3000
        });
      } finally {
        this.isRunning = false;
      }
    }
  },
  async mounted() {
    await this.ensureSettingsLoaded();
  }
}
</script>
