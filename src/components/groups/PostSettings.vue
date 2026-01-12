<template>
  <div class="bg-base-100 flex flex-col items-start p-4">
    <div class="flex w-full items-center gap-2 mb-2">
      <label class="font-bold w-40">{{ $t('enableSchedule') }}:</label>
      <input type="checkbox" class="toggle toggle-accent" v-model="mygroup.auto_publish" true-value="1"
        false-value="0" />
      <div role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ $t('enableScheduleTips') }}</span>
      </div>
    </div>
    <div>
      <div class="flex w-full items-center gap-2 mb-2" v-if="mygroup.auto_publish == 1">
        <label class="font-bold w-40">{{ $t('scheduleTime') }}:</label>
        <div class="flex flex-wrap gap-2">
          <div v-for="(time, index) in publishTimes" :key="index" class="flex items-center">
            <input type="time" class="border-2 border-gray-300 p-2 rounded" v-model="publishTimes[index]"
              :placeholder="'00:00'" />
            <button @click="removeTime(index)" class="ml-1 p-1 text-red-500 hover:text-red-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="addTime" class="p-2 text-primary hover:text-primary-focus">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 使用公共表单组件 -->
      <PostFormFields :formData="formDataForFields" @update:formData="updateFormData" />
    </div>

    <!-- other fields... -->
    <div class="mt-8 w-full flex justify-end">
      <button class="btn btn-primary mr-2" @click="update">
        {{ $t('update') }}
      </button>
    </div>
  </div>
</template>

<script>
import PostFormFields from '@/components/common/PostFormFields.vue';
import { SettingsManager } from '@/utils/settingsManager';

const createDefaultPostSettings = () => ({
  auto_publish: 0,
  publish_start_time: '',
  startOption: 'now',
  scheduledTime: '09:00',
  post_way: 'share',
  placement: 'reel',
  videos_folder: '',
  captions_folder: '',
  schedule_type: 'interval',
  interval_minutes: 30,
  specific_times: ['09:00', '12:00', '18:00'],
  repeat_times: 1,
  shuffle_videos: false,
  video_delay_min: 5,
  video_delay_max: 15,
  post_caption: '',
  insert_emoji: false,
  comment_on_own_post: false,
  comment_on_own_post_delay_min: 1,
  comment_on_own_post_delay_max: 5,
  own_post_comment: '',
  own_post_comment_emoji: false,
  generate_by_chatgpt: false,
  chatgpt_settings: {
    url: 'https://api.openai.com/v1/chat/completions',
    api_key: '',
    model: 'gpt-4o-mini',
    system_prompt: 'Generate a casual, engaging TikTok caption for this video. Keep it under 150 characters, use relevant hashtags, and make it trendy.'
  },
  sound_name: '',
  custom_sound_keyword: '',
  content_type: 0,
  image_count: 1,
  add_sound: '-1',
  sound_wait_time: 10,
  upload_wait_time: 30,
  origin_sound_volume: 50,
  add_sound_volume: 50,
  add_product_link: 0,
  ai_label: false,
  captions: '',
  caption_format: 'multiline',
  materials_tags: '',
  material_source: 'materialLibrary',
  material_path: ''
});

const DEFAULT_POST_SETTINGS_TEMPLATE = createDefaultPostSettings();

const POST_SETTING_KEYS = [
  'auto_publish', 'publish_start_time',
  'startOption', 'scheduledTime', 'post_way', 'placement', 'videos_folder',
  'captions_folder', 'schedule_type', 'interval_minutes', 'specific_times',
  'repeat_times', 'shuffle_videos', 'video_delay_min', 'video_delay_max',
  'post_caption', 'insert_emoji', 'comment_on_own_post',
  'comment_on_own_post_delay_min', 'comment_on_own_post_delay_max',
  'own_post_comment', 'own_post_comment_emoji', 'generate_by_chatgpt',
  'chatgpt_settings', 'sound_name', 'content_type', 'image_count',
  'custom_sound_keyword', 'add_sound', 'sound_wait_time', 'upload_wait_time',
  'origin_sound_volume', 'add_sound_volume', 'add_product_link', 'ai_label', 'captions',
  'caption_format', 'materials_tags', 'material_source', 'material_path'
];

export default {
  components: {
    PostFormFields
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    const defaults = createDefaultPostSettings();
    return {
      ...defaults,
      mygroup: {
        custom_sound_keyword: '',
        auto_publish: '0',
        publish_start_time: ''
      },
      publishTimes: [],
      postSettingsManager: null,
      postSettingsUnwatchFns: []
    }
  },
  computed: {
    // 为 PostFormFields 组件准备数据（改为使用 mixin 注入的字段）
    formDataForFields() {
      return {
        post_way: this.post_way,
        placement: this.placement || 'reel',
        sound_name: this.sound_name,
        custom_sound_keyword: this.custom_sound_keyword,
        content_type: this.content_type,
        image_count: this.image_count,
        add_sound: this.add_sound,
        sound_wait_time: this.sound_wait_time,
        upload_wait_time: this.upload_wait_time,
        origin_sound_volume: this.origin_sound_volume,
        add_sound_volume: this.add_sound_volume,
        add_product_link: this.add_product_link,
        ai_label: this.ai_label,
        captions: this.captions,
        caption_format: this.caption_format && (this.caption_format === 'multiline' || this.caption_format === 'spintax') ? this.caption_format : 'multiline',
        material_source: this.material_source,
        material_path: this.material_path,
        materials_tags: this.materials_tags
      };
    }
  },
  watch: {
    'mygroup.auto_publish'(val) {
      const numeric = Number(val);
      this.auto_publish = Number.isNaN(numeric) ? 0 : numeric;
    },
    auto_publish(val) {
      const normalized = Number.isNaN(Number(val)) ? '0' : String(Number(val));
      if (this.mygroup.auto_publish !== normalized) {
        this.mygroup.auto_publish = normalized;
      }
    },
    'mygroup.publish_start_time'(val) {
      const normalized = typeof val === 'string' ? val : '';
      if (this.publish_start_time !== normalized) {
        this.publish_start_time = normalized;
      }
      this.publishTimes = normalized
        ? normalized.split(',').map(time => time.trim()).filter(Boolean)
        : [];
    },
    publish_start_time(val) {
      const normalized = typeof val === 'string' ? val : '';
      if (this.mygroup.publish_start_time !== normalized) {
        this.mygroup.publish_start_time = normalized;
      }
      this.publishTimes = normalized
        ? normalized.split(',').map(time => time.trim()).filter(Boolean)
        : [];
    }
  },
  methods: {
    async initializeGroupPostSettings() {
      this.postSettingsManager = new SettingsManager(`group_${this.group.id}_post_settings.json`);
      await this.loadLocalPostSettings();
      this.applyGroupOverrides();
      this.setupPostSettingsWatchers();
    },

    async loadLocalPostSettings() {
      if (!this.postSettingsManager) {
        return;
      }

      const defaults = createDefaultPostSettings();
      try {
        const settings = await this.postSettingsManager.loadSettings(defaults);
        Object.keys(defaults).forEach(key => {
          if (!(key in this.$data)) {
            return;
          }

          const defaultValue = defaults[key];
          const loadedValue = settings[key];
          this[key] = this.cloneSettingValue(defaultValue, loadedValue);
        });
      } catch (error) {
        console.error('Failed to load local group post settings:', error);
      }
    },

    cloneSettingValue(defaultValue, loadedValue) {
      if (Array.isArray(defaultValue)) {
        if (Array.isArray(loadedValue)) {
          return [...loadedValue];
        }
        return [...defaultValue];
      }

      if (defaultValue !== null && typeof defaultValue === 'object') {
        const source = loadedValue && typeof loadedValue === 'object'
          ? loadedValue
          : defaultValue;
        return JSON.parse(JSON.stringify(source));
      }

      return loadedValue !== undefined ? loadedValue : defaultValue;
    },

    applyGroupOverrides() {
      // 将 group 数据中的字段覆盖当前组件的设置，用于初次加载兼容数据库记录
      const overrideKeys = [
        'auto_publish', 'publish_start_time',
        'post_way', 'sound_name', 'custom_sound_keyword', 'content_type', 'image_count',
        'add_sound', 'sound_wait_time', 'upload_wait_time', 'origin_sound_volume', 'add_sound_volume',
        'add_product_link', 'ai_label', 'captions', 'caption_format', 'material_source', 'material_path', 'materials_tags', 'placement'
      ];

      const preserveLocalOnEmpty = new Set(['custom_sound_keyword']);

      overrideKeys.forEach(key => {
        const value = this.mygroup[key];
        const shouldSkipEmptyOverride = preserveLocalOnEmpty.has(key)
          && (value === '' || value === null || value === undefined)
          && this[key] !== undefined
          && this[key] !== null
          && this[key] !== '';

        if (shouldSkipEmptyOverride) {
          return;
        }

        if (value !== undefined && value !== null) {
          if (key === 'auto_publish') {
            const numeric = Number(value);
            this.auto_publish = Number.isNaN(numeric) ? 0 : numeric;
          } else if (key === 'publish_start_time') {
            const normalized = typeof value === 'string' ? value : '';
            this.publish_start_time = normalized;
          } else {
            this[key] = Array.isArray(value) || (value !== null && typeof value === 'object')
              ? JSON.parse(JSON.stringify(value))
              : value;
          }
        }
      });

      if (this.mygroup.publish_type !== undefined && this.mygroup.publish_type !== null) {
        this.content_type = this.mygroup.publish_type;
      }
      if (this.mygroup.title !== undefined && this.mygroup.title !== null) {
        this.captions = this.mygroup.title;
      }

      if (!this.publish_start_time && typeof this.mygroup.publish_start_time === 'string') {
        this.publish_start_time = this.mygroup.publish_start_time;
      }
    },

    setupPostSettingsWatchers() {
      this.teardownPostSettingsWatchers();
      if (!this.postSettingsManager) {
        return;
      }

      POST_SETTING_KEYS.forEach(key => {
        const defaultValue = DEFAULT_POST_SETTINGS_TEMPLATE[key];
        const needsDeepWatch = Array.isArray(defaultValue) || (defaultValue !== null && typeof defaultValue === 'object');
        const unwatch = this.$watch(key, () => {
          this.saveLocalPostSettings();
        }, { deep: needsDeepWatch });
        this.postSettingsUnwatchFns.push(unwatch);
      });
    },

    teardownPostSettingsWatchers() {
      if (!this.postSettingsUnwatchFns || !this.postSettingsUnwatchFns.length) {
        return;
      }
      this.postSettingsUnwatchFns.forEach(unwatch => {
        if (typeof unwatch === 'function') {
          unwatch();
        }
      });
      this.postSettingsUnwatchFns = [];
    },

    async saveLocalPostSettings() {
      if (!this.postSettingsManager) {
        return false;
      }

      const payload = {};
      POST_SETTING_KEYS.forEach(key => {
        const value = this[key];
        if (Array.isArray(value)) {
          payload[key] = [...value];
        } else if (value !== null && typeof value === 'object') {
          payload[key] = JSON.parse(JSON.stringify(value));
        } else {
          payload[key] = value;
        }
      });

      try {
        await this.postSettingsManager.saveSettings(payload);
        return true;
      } catch (error) {
        console.error('Failed to save local group post settings:', error);
        return false;
      }
    },

    // 更新表单数据，写入组件中的发布设置字段
    updateFormData(newData) {
      Object.keys(newData).forEach(key => {
        if (this[key] !== undefined) {
          this[key] = newData[key];
        } else if (this.mygroup[key] !== undefined) {
          // 兼容旧逻辑：如果字段在 mygroup 中，写入 mygroup
          this.mygroup[key] = newData[key];
        }
      });
    },
    addTime() {
      const currentTime = new Date();
      this.publishTimes.push(currentTime.toTimeString().slice(0, 5));
    },
    removeTime(index) {
      this.publishTimes.splice(index, 1)
    },
    async update() {
      const normalizedTimes = this.publishTimes
        .map(time => (typeof time === 'string' ? time.trim() : ''))
        .filter(Boolean);
      this.publishTimes = normalizedTimes;
      this.publish_start_time = normalizedTimes.join(',');
      this.auto_publish = Number(this.auto_publish ?? this.mygroup.auto_publish ?? 0);

      if (this.auto_publish === 1 && !this.publish_start_time.match(/^(\d{2}:\d{2},)*\d{2}:\d{2}$/)) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('publishStartTimeFormatError'),
          timeout: 2000
        });
        return
      }
      if (this.post_way === 'useSound' && !this.sound_name) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('soundNameRequired'),
          timeout: 2000
        });
        return
      }

      if (this.add_sound === 'custom' && !this.custom_sound_keyword) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('customSoundInputRequired'),
          timeout: 2000
        });
        return
      }

      // 验证素材配置
      if (this.material_source === 'localFolder' && !this.material_path) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('selectFolderFailed'),
          timeout: 2000
        });
        return
      }

      const saved = await this.saveLocalPostSettings();
      if (!saved) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('saveConfigError') || 'Error saving configuration file',
          timeout: 2000
        });
        return;
      }

      // 保存成功后关闭对话框
      await this.$emiter('NOTIFY', {
        type: 'success',
        message: this.$t('configFileSaved') || 'Configuration saved successfully',
        timeout: 2000
      });
      await this.$emiter('closeDialog', {})
      await this.$emiter('reload_groups', {})
    },
  },
  async created() {
    this.mygroup = { ...this.group };
    if (this.mygroup.custom_sound_keyword === undefined || this.mygroup.custom_sound_keyword === null) {
      this.mygroup.custom_sound_keyword = '';
    }
    if (this.mygroup.auto_publish === undefined || this.mygroup.auto_publish === null) {
      this.mygroup.auto_publish = '0';
    }
    if (this.mygroup.publish_start_time === undefined || this.mygroup.publish_start_time === null) {
      this.mygroup.publish_start_time = '';
    }

    await this.initializeGroupPostSettings();
  },
  async mounted() {
    // 设置默认的素材源
    if (!this.material_source) {
      this.material_source = 'materialLibrary';
    }

    if (this.publish_start_time) {
      this.publishTimes = this.publish_start_time.split(',').map(time => time.trim()).filter(Boolean);
    }
  },
  beforeUnmount() {
    this.teardownPostSettingsWatchers();
  }
}
</script>
