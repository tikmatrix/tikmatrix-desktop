<template>
  <!-- 添加提示信息 -->
  <div class="alert alert-info mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-shield-halved" class="h-6 w-6 mr-2" />
      <span>{{ $t('privacySettingsWarning') }}</span>
    </div>
  </div>

  <!-- 最大观看数过滤参数 -->
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('maxViews') }}: </span>
    <input class="input ring input-md ml-2" type="number" v-model="maxViews" :placeholder="$t('maxViews')" />
  </div>

  <!-- 隐私设置：谁可以观看此视频 -->
  <div class="flex flex-col gap-2 max-w-full w-full mt-4">
    <span class="font-bold">{{ $t('whoCanWatchThisVideo') }}: </span>
    <div class="flex flex-row gap-4 ml-2">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="privacy" class="radio radio-primary" value="Everyone" v-model="whoCanWatchThisVideo" />
        <span>{{ $t('everyone') }}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="privacy" class="radio radio-primary" value="Friends" v-model="whoCanWatchThisVideo" />
        <span>{{ $t('friends') }}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="privacy" class="radio radio-primary" value="Only you" v-model="whoCanWatchThisVideo" />
        <span>{{ $t('onlyYou') }}</span>
      </label>
    </div>
  </div>

  <!-- 允许评论开关 -->
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-4">
    <span class="font-bold">{{ $t('allowComments') }}: </span>
    <input type="checkbox" class="toggle toggle-primary ml-2" v-model="allowComments" />
  </div>

  <!-- 允许内容重用开关 -->
  <div class="flex flex-col gap-2 max-w-full w-full mt-4">
    <div class="flex items-center flex-row gap-2">
      <span class="font-bold">{{ $t('allowReuseContent') }}: </span>
      <input type="checkbox" class="toggle toggle-primary ml-2" v-model="allowReuseContent" />
    </div>
    <span class="text-sm text-gray-500 ml-2">{{ $t('allowReuseContentDesc') }}</span>
  </div>

</template>
<script>
import { privacySettings } from '@/utils/settingsManager';

export default {
  name: 'PrivacySettings',
  mixins: [
    privacySettings.createVueMixin(
      { 
        maxViews: 0,
        whoCanWatchThisVideo: 'Everyone',
        allowComments: true,
        allowReuseContent: true
      },
      ['maxViews', 'whoCanWatchThisVideo', 'allowComments', 'allowReuseContent']
    )
  ],
  data() {
    return {
      maxViews: 0,
      whoCanWatchThisVideo: 'Everyone',
      allowComments: true,
      allowReuseContent: true
    }
  },
  methods: {
    async runScript(enable_multi_account = false, rotate_proxy = false) {
      await this.$emiter('run_now_by_account', {
        name: 'privacy_settings',
        args: { 
          enable_multi_account, 
          rotate_proxy,
          max_views: Number(this.maxViews),
          who_can_watch_this_video: this.whoCanWatchThisVideo,
          allow_comments: this.allowComments,
          allow_reuse_content: this.allowReuseContent
        }
      })
      return true;
    },
  }
}
</script>
