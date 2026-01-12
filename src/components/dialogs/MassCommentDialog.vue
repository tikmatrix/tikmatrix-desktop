<template>
  <!-- 添加提示信息 -->
  <div class="alert alert-warning mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-6 w-6 mr-2" />
      <span>{{ $t('massCommentWarning') }}</span>
    </div>
  </div>

  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('comments') }}: </span>
    <textarea class="textarea textarea-success w-lg h-32 leading-tight" :placeholder="$t('commentContentTips')"
      autocomplete="off" v-model="comment_contents"> </textarea>
    <div class="flex flex-col gap-2">
      <div class="flex flex-row items-center gap-2">
        <label class="font-bold text-right col-span-1">{{ $t('insertEmoji') }}:</label>
        <input type="checkbox" class="toggle toggle-accent col-span-1" v-model="insert_emoji"
          title="😃, 😄, 😁, 😆, 😅, 😂, 🤣, 😊, 😇, 🙂, 🙃, 😉, 😋, 😛, 😝, 😜, 🤪, 😎, 🤩, 🥳, 😏, 🤗, 🤠, 😍, 😘, 😚, 😙, 😗, 🥰, 🤤, 😻, 😽, 💖, 💗, 💓, 💞, 💕, 💟, ❣️, 💌, 🌟, ✨, 💫, 🎉, 🎊, 🎁, 🎈, 🍾, 🥂, 🍻" />
      </div>
      <div class="flex flex-row items-center gap-2">
        <label class="font-bold text-right col-span-1">{{ $t('insertDeviceNumber') }}:</label>
        <input type="checkbox" class="toggle toggle-accent col-span-1" v-model="insert_device_number" />
      </div>
      <div class="flex flex-row items-center gap-2">
        <label class="font-bold">{{ $t('commentOrder') }}:</label>
        <div class="flex items-center gap-2">
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="commentOrder" value="random" class="radio radio-md radio-primary"
              v-model="comment_order" />
            <span>{{ $t('random') }}</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="commentOrder" value="sequential" class="radio radio-md radio-primary"
              v-model="comment_order" />
            <span>{{ $t('sequential') }}</span>
          </label>
        </div>
      </div>


    </div>
  </div>

  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('targetPostUrls') }}: </span>
    <textarea class="textarea textarea-success w-lg h-32 leading-tight" :placeholder="$t('targetPostUrlTips')"
      autocomplete="off" v-model="target_post_urls"> </textarea>
  </div>

  <!-- 添加任务间隔时间设置 -->
  <div class="flex flex-row items-center mt-8 mb-8">
    <label class="font-bold mr-4">{{ $t('taskInterval') }}:</label>
    <VueSlider v-model="task_interval" :width="500" :min="0" :max="10" :marks="{
      0: '0',
      5: '5',
      10: `10 ${$t('minute')}`
    }" />
  </div>
  <div class="alert alert-info py-2 px-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span class="text-md">{{ $t('taskIntervalTip') }}</span>
  </div>

</template>
<script>
import VueSlider from "vue-3-slider-component";
import { massCommentSettings } from '@/utils/settingsManager';

const massCommentMixin = massCommentSettings.createVueMixin(
  {
    settings: 'custom',
    startOption: 'now',
    scheduledTime: '09:00',
    target_post_urls: 'https://www.tiktok.com/@tikmatrix001/photo/7520819163665911054',
    comment_contents: 'Great video!\nLove this content!\nAmazing!',
    comment_delay_min: 2,
    comment_delay_max: 8,
    insert_emoji: false,
    insert_device_number: false,
    comment_order: 'random',
    task_interval: [0, 0]
  },
  [
    'settings', 'startOption', 'scheduledTime', 'target_post_urls',
    'comment_contents', 'comment_delay_min', 'comment_delay_max',
    'insert_emoji', 'insert_device_number', 'comment_order',
    'task_interval'
  ]
);

export default {
  mixins: [massCommentMixin],
  name: 'MassCommentDialog',
  components: {
    VueSlider
  },
  data() {
    return {
    }
  },
  methods: {
    filterTargetPostUrl() {
      if (this.target_post_urls == '') {
        alert(this.$t('postUrlRequired'))
        return false;
      }
      //filter empty lines
      let lines = this.target_post_urls.split('\n').filter(line => line.trim() != '')
      if (lines.length == 0) {
        alert(this.$t('postUrlRequired'))
        return false;
      }
      //remove query string
      lines = lines.map(line => {
        let url = new URL(line)
        return url.origin + url.pathname
      })
      this.target_post_urls = lines.join('\n')
      return true;
    },

    async runScript(enable_multi_account = false, rotate_proxy = false) {
      if (!this.filterTargetPostUrl()) {
        return false;
      }

      await this.$emiter('massComment', {
        min_interval: Number(this.task_interval[0]),
        max_interval: Number(this.task_interval[1]),
        enable_multi_account: enable_multi_account,
        rotate_proxy: rotate_proxy,
      })
      return true;
    },
  },
}
</script>
