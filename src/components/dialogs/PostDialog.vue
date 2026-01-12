<template>
  <!-- 添加提示信息 -->
  <div class="alert alert-warning mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-6 w-6 mr-2" />
      <span>{{ $t('postWarning') }}</span>
    </div>
  </div>
  <div class="bg-base-100 flex flex-col items-start p-4">
    <div class="flex w-full items-center gap-2 mb-2">
      <label class="font-bold w-40">{{ $t('taskArgs') }}:</label>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="settingsOption" value="group" class="radio radio-primary" v-model="settings" />
          <span>{{ $t('group') }}</span>
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="settingsOption" value="custom" class="radio radio-primary" v-model="settings" />
          <span>{{ $t('custom') }}</span>
        </label>
      </div>
    </div>
    <template v-if="settings === 'custom'">
      <div class="flex w-full items-center gap-2 mb-2">
        <label class="font-bold w-40">{{ $t('startTime') }}:</label>
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="startOption" value="now" class="radio radio-primary" v-model="startOption" />
            <span>{{ $t('startNow') }}</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="startOption" value="scheduled" class="radio radio-primary"
              v-model="startOption" />
            <span>{{ $t('scheduleTime') }}</span>
          </label>
        </div>
        <div v-if="startOption === 'scheduled'" class="flex items-center">
          <input type="time" class="border-2 border-gray-300 p-2 rounded" v-model="scheduledTime" />
        </div>
      </div>

      <!-- 使用公共表单组件 -->
      <PostFormFields :formData="formDataForFields" @update:formData="updateFormData" />
    </template>

  </div>
</template>
<script>
import { postSettings } from '@/utils/settingsManager';
import PostFormFields from '@/components/common/PostFormFields.vue';

const postMixin = postSettings.createVueMixin(
  {
    settings: 'custom',
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
    // 添加素材相关字段
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
  },
  [
    'settings', 'startOption', 'scheduledTime', 'post_way', 'videos_folder',
    'captions_folder', 'schedule_type', 'interval_minutes', 'specific_times',
    'repeat_times', 'shuffle_videos', 'video_delay_min', 'video_delay_max',
    'post_caption', 'insert_emoji', 'comment_on_own_post',
    'comment_on_own_post_delay_min', 'comment_on_own_post_delay_max',
    'own_post_comment', 'own_post_comment_emoji', 'generate_by_chatgpt',
    'chatgpt_settings', 'sound_name', 'content_type', 'image_count',
    'custom_sound_keyword', 'add_sound', 'sound_wait_time', 'upload_wait_time', 'origin_sound_volume', 'add_sound_volume',
    'add_product_link', 'ai_label', 'captions', 'caption_format', 'materials_tags', 'material_source', 'material_path', 'placement'
  ]
);

export default {
  mixins: [postMixin],
  components: {
    PostFormFields
  },
  name: 'PostDialog',
  data() {
    return {
    }
  },
  computed: {
    // 为 PostFormFields 组件准备数据
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
  methods: {
    // 更新表单数据
    updateFormData(newData) {
      Object.keys(newData).forEach(key => {
        if (this[key] !== undefined) {
          this[key] = newData[key];
        }
      });
    },

    async runScript(enable_multi_account = false, rotate_proxy = false) {
      if (this.post_way === 'useSound' && !this.sound_name) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('soundInputRequired'),
          timeout: 2000
        });
        return false;
      }

      if (this.add_sound === 'custom' && !this.custom_sound_keyword) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('customSoundInputRequired'),
          timeout: 2000
        });
        return false;
      }

      // 验证素材配置
      if (this.material_source === 'localFolder' && !this.material_path) {
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('selectFolderFailed'),
          timeout: 2000
        });
        return false;
      }

      await this.$emiter('run_now_by_account', {
        name: 'post', args: {
          start_time: this.startOption === 'scheduled' ? this.scheduledTime : '',
          enable_multi_account: enable_multi_account,
          rotate_proxy: rotate_proxy
        }
      })
      return true;
    },
  },
}
</script>

<style scoped>
/* 可选:添加额外样式 */
.badge {
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 1;
}
</style>
