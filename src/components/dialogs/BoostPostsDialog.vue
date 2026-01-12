<template>
  <!-- 添加提示信息 -->
  <div class="alert alert-warning mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-6 w-6 mr-2" />
      <span>{{ $t('boostPostsWarning') }}</span>
    </div>
  </div>
  <div class="flex flex-row items-center p-2 w-full">
    <textarea class="textarea textarea-success w-full max-w-xl col-span-3 h-32 leading-tight"
      :placeholder="$t('targetPostUrlTips')" autocomplete="off" v-model="target_post_urls"> </textarea>
  </div>
  <div class="flex flex-row items-center p-2 gap-2">
    <label class="font-bold text-right col-span-1">{{ $t('boostOptions') }}:</label>
    <div class="flex flex-wrap gap-4">
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_like" />
          <span class="label-text">{{ $t('like') }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_favorite" />
          <span class="label-text">{{ $t('favorite') }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_repost" />
          <span class="label-text">{{ $t('repost') }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_share" />
          <span class="label-text">{{ $t('share') }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_follow" />
          <span class="label-text">{{ $t('follow') }}</span>
        </label>
      </div>
    </div>
  </div>

  <div class="flex flex-row items-center p-2 gap-2">
    <label class="font-bold text-right">{{ $t('viewDuration') }}:</label>
    <input type="number" class="input input-bordered w-24" v-model.number="view_duration" min="1" max="300" />
    <span class="ml-2">{{ $t('seconds') }}</span>
  </div>
  <div class="flex flex-row items-center">
    <label class="font-bold mr-4">{{ $t('boostPostInterval') }}:</label>
    <VueSlider v-model="boost_post_interval" :width="200" :min="0" :max="10"
      :marks="{ 0: `0${$t('minute')}`, 5: `5${$t('minute')}`, 10: `10${$t('minute')}` }" />
  </div>
</template>
<script>
import VueSlider from "vue-3-slider-component";
import { boostPostsSettings } from '@/utils/settingsManager';

export default {
  name: 'BoostPosts',
  components: {
    VueSlider
  },
  mixins: [
    boostPostsSettings.createVueMixin(
      {
        target_post_urls: '',
        enable_like: false,
        enable_favorite: false,
        enable_repost: false,
        enable_share: false,
        enable_follow: false,
        view_duration: 10,
        boost_post_interval: [0, 0]
      }, // 默认设置
      ['target_post_urls', 'enable_like', 'enable_favorite', 'enable_repost', 'enable_share', 'enable_follow', 'view_duration', 'boost_post_interval'] // 需要监听的属性
    )
  ],
  data() {
    return {
      target_post_urls: '',
      enable_like: false,
      enable_favorite: false,
      enable_repost: false,
      enable_share: false,
      enable_follow: false,
      view_duration: 10,
      boost_post_interval: [0, 0]
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
      await this.$emiter('run_now_by_account', {
        name: 'boost_post',
        args: {
          min_interval: Number(this.boost_post_interval[0]),
          max_interval: Number(this.boost_post_interval[1]),
          enable_multi_account: enable_multi_account,
          rotate_proxy: rotate_proxy
        }
      })
      return true;
    },
  }
}
</script>