<template>
  <!-- 添加提示信息 -->
  <div class="alert alert-warning mb-4 shadow-lg">
    <div>
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-6 w-6 mr-2" />
      <span>{{ $t('profileWarning') }}</span>
    </div>
  </div>
  <div class="flex flex-row items-center gap-2">
    <label class="font-bold">{{ $t('profileOrder') }}:</label>
    <div class="flex items-center gap-2">
      <label class="flex items-center gap-1 cursor-pointer">
        <input type="radio" name="profileOrder" value="random" class="radio radio-md radio-primary"
          v-model="profile_order" />
        <span>{{ $t('random') }}</span>
      </label>
      <label class="flex items-center gap-1 cursor-pointer">
        <input type="radio" name="profileOrder" value="sequential" class="radio radio-md radio-primary"
          v-model="profile_order" />
        <span>{{ $t('sequential') }}</span>
      </label>
    </div>
  </div>
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('nicknames') }}: </span>
    <textarea class="textarea textarea-success grow  h-16 leading-tight" :placeholder="$t('nicknamesTips')"
      autocomplete="off" v-model="nicknames"> </textarea>

  </div>
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('usernames') }}: </span>
    <textarea class="textarea textarea-success grow  h-16 leading-tight" :placeholder="$t('usernamesTips')"
      autocomplete="off" v-model="usernames"> </textarea>

  </div>
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('bios') }}: </span>
    <textarea class="textarea textarea-success grow  h-16 leading-tight" :placeholder="$t('biosTips')"
      autocomplete="off" v-model="bios"> </textarea>

  </div>
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('linkUrl') }}: </span>
    <input type="text" :placeholder="$t('linkUrlTips')" autocomplete="off" v-model="link_url"
      class="input input-md grow input-bordered" />

  </div>
  <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
    <span class="font-bold">{{ $t('avatarsPath') }}: </span>
    <input type="text" placeholder="example: C:/Users/Administrator/Desktop/avatars"
      class="input input-md grow input-bordered" v-model="avatars_path" />
    <button class="btn btn-md btn-info ml-2" @click="selectAvatars">{{ $t('select') }}</button>
  </div>
</template>
<script>
import { open } from '@tauri-apps/api/dialog';
import { profileSettings } from '@/utils/settingsManager';

export default {
  name: 'ProfileDialog',
  mixins: [
    profileSettings.createVueMixin(
      {
        profile_order: 'random',
        nicknames: '',
        usernames: '',
        bios: '',
        link_url: '',
        avatars_path: '',
      }, // 默认设置
      ['profile_order', 'nicknames', 'usernames', 'bios', 'link_url', 'avatars_path'] // 需要监听的属性
    )
  ],
  data() {
    return {
      profile_order: 'random',
      nicknames: '',
      usernames: '',
      bios: '',
      link_url: '',
      avatars_path: '',
    }
  },
  methods: {
    //选择头像目录
    async selectAvatars() {
      const filePath = await open({
        multiple: false, // 是否允许多选文件
        directory: true, // 是否选择目录
        filters: [ // 文件过滤器
        ]
      });
      console.log('Selected file path:', filePath);
      // 将 filePath 用于其他操作
      this.avatars_path = filePath
    },


    async runScript(enable_multi_account = false, rotate_proxy = false) {
      await this.$emiter('run_now_by_account', {
        name: 'profile', args: {
          enable_multi_account: enable_multi_account,
          rotate_proxy: rotate_proxy
        }
      })
      return true;
    },

  }
}
</script>
