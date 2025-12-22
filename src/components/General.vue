<template>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$emiter('openTikTok', {})"
        v-if="whitelabelConfig.targetApp === 'tiktok'">
        <font-awesome-icon icon="fa-brands fa-tiktok" class="h-3 w-3 text-primary-content" />
        {{ $t('openTiktok') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'instagram'"
        @click="$emiter('adbEventData', { args: ['shell', 'am', 'start', '-n', settings.packagename + '/com.instagram.android.activity.MainTabActivity'] })">
        <font-awesome-icon icon="fa-brands fa-instagram" class="h-3 w-3 text-primary-content" />
        {{ $t('openInstagram') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$emiter('stopTiktok', {})"
        v-if="whitelabelConfig.targetApp === 'tiktok'">
        <font-awesome-icon icon="fa-brands fa-tiktok" class="h-3 w-3 text-yellow-500" />
        {{ $t('stopTiktok') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'instagram'"
        @click="$emiter('adbEventData', { args: ['shell', 'am', 'force-stop', settings.packagename] })">
        <font-awesome-icon icon="fa-brands fa-instagram" class="h-3 w-3 text-yellow-500" />
        {{ $t('stopInstagram') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$refs.clear_cache_dialog.showModal()"
        v-if="whitelabelConfig.targetApp === 'tiktok'">
        <font-awesome-icon icon="fa-brands fa-tiktok" class="h-3 w-3 text-pink-500" />
        {{ $t('clearData') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$refs.clear_cache_dialog.showModal()"
        v-if="whitelabelConfig.targetApp === 'instagram'">
        <font-awesome-icon icon="fa-brands fa-instagram" class="h-3 w-3 text-pink-500" />
        {{ $t('clearData') }}
    </button>

    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="grantPermissions"
        v-if="whitelabelConfig.targetApp === 'tiktok'">
        <font-awesome-icon icon="fa fa-hand-holding-usd" class="h-3 w-3 text-success" />
        {{ $t('grantTikTok') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="grantPermissions"
        v-if="whitelabelConfig.targetApp === 'instagram'">
        <font-awesome-icon icon="fa fa-hand-holding-usd" class="h-3 w-3 text-success" />
        {{ $t('grantInstagram') }}
    </button>

    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="app_install">
        <font-awesome-icon icon="fa fa-download" class="h-3 w-3 text-primary-content" />
        {{ $t('installApk') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$refs.uninstall_dialog.showModal()">
        <font-awesome-icon icon="fa-brands fa-android" class="h-3 w-3 text-primary-content" />
        {{ $t('uninstallApk') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="uploadVideo">
        <font-awesome-icon icon="fa fa-upload" class="h-3 w-3 text-primary-content" />
        {{ $t('uploadToGallery') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="clearGallery">
        <font-awesome-icon icon="fa fa-eraser" class="h-3 w-3 text-primary-content" />
        {{ $t('clearGallery') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$emiter('initDevice')">
        <font-awesome-icon icon="fa fa-undo" class="h-3 w-3 text-pink-500" />
        {{ $t('initAppAgent') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('adbEventData', { args: ['shell', 'am', 'start', '-n', agent_package_name + '/.MainActivity'] })">
        <font-awesome-icon icon="fa fa-play" class="h-3 w-3 text-success" />
        {{ $t('openAppAgent') }}
    </button>

    <button class="btn btn-md btn-primary  ml-1 mb-1" @click="$refs.proxy_dialog.show()">
        <font-awesome-icon icon="fa fa-server" class="h-3 w-3" />
        {{ $t('setProxy') }}
    </button>



    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="isFeatureUnlocked('followPlan')"
        @click="$emiter('showDialog', { name: 'plans' })">
        <font-awesome-icon icon="fa-solid fa-calendar-check" class="h-3 w-3 mr-1" />
        {{ $t('followPlan') }}
    </button>
    <dialog ref="uninstall_dialog" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ $t('inputPackageName') }}</h3>
            <div class="flex flex-row items-center p-2">
                <input class="input input-bordered input-md" type="text" v-model="uninstall_package" />
            </div>
            <button class="btn btn-md btn-success ml-2" @click="uninstallApk">{{
                $t('confirm') }}</button>

        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    <dialog ref="proxy_dialog" class="modal">
        <div class="modal-box bg-base-300">
            <h3 class="font-bold text-lg">{{ $t('proxyServer') }}</h3>
            <div class="flex flex-row items-center p-2">
                <input class="input input-bordered input-md w-40" type="text" v-model="proxy_host" />
                <span class="font-bold p-1">:</span>
                <input class="input input-bordered input-md w-20" type="number" v-model="proxy_port" />
            </div>
            <button class="btn btn-md btn-success ml-2" @click="enableProxy">{{ $t('enableProxy') }}</button>
            <button class="btn btn-md btn-warning ml-2" @click="disableProxy">{{ $t('disableProxy') }}</button>

        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>



    <dialog ref="clear_cache_dialog" class="modal">
        <div class="modal-box bg-base-300">
            <h3 class="font-bold text-lg">{{ $t('clearData') }}</h3>
            <p class="py-4">{{ $t('clearCacheConfirm') }}</p>
            <div class="modal-action">
                <button class="btn btn-md btn-success" @click="confirmClearCache">{{ $t('confirm') }}</button>
                <button class="btn btn-md" @click="$refs.clear_cache_dialog.close()">{{ $t('cancel') }}</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
<script>
import { invoke } from "@tauri-apps/api/tauri";
import { getItem, setItem } from '@/utils/storage.js';
import { getUnlockedFeatures } from '@/utils/features.js';
import { cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';
export default {
    name: 'General',
    props: ['settings'],
    data() {
        return {
            proxy_host: 'localhost',
            proxy_port: '8080',
            uninstall_package: '',
            agent_package_name: '',
            unlocked: [],
            whitelabelConfig: cloneDefaultWhiteLabelConfig(),
        }
    },
    computed: {
    },
    methods: {
        isFeatureUnlocked(key) {
            try {

                return this.unlocked.includes(key);
            } catch (e) {
                return false;
            }
        },
        async app_install() {
            await this.$emiter('installApks', {})
        },
        async uploadVideo() {
            await this.$emiter('uploadFiles', {})
        },
        async uninstallApk() {
            this.$refs.uninstall_dialog.close()
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'uninstall', this.uninstall_package] })
        },
        async clearGallery() {
            await this.$emiter('clearGallery', {})
        },
        async clearCache() {
            this.$refs.clear_cache_dialog.showModal();
        },
        async confirmClearCache() {
            this.$refs.clear_cache_dialog.close();
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'clear', this.settings.packagename] });
        },


        async grantPermissions() {
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'grant', this.settings.packagename, 'android.permission.READ_EXTERNAL_STORAGE'] })
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'grant', this.settings.packagename, 'android.permission.WRITE_EXTERNAL_STORAGE'] })
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'grant', this.settings.packagename, 'android.permission.RECORD_AUDIO'] })
            await this.$emiter('adbEventData', { args: ['shell', 'pm', 'grant', this.settings.packagename, 'android.permission.CAMERA'] })
        },
        async enableProxy() {
            await setItem('proxy_host', this.proxy_host || '');
            await setItem('proxy_port', this.proxy_port || '');
            await this.$emiter('adbEventData', { args: ['shell', 'settings', 'put', 'global', 'http_proxy', `${this.proxy_host}:${this.proxy_port}`] })
        },
        async disableProxy() {
            await this.$emiter('adbEventData', { args: ['shell', 'settings', 'put', 'global', 'http_proxy', ':0'] })
        },
        async open_dir(name) {
            invoke("open_dir", {
                name
            });
        },

    },
    async mounted() {
        const [storedHost, storedPort, features] = await Promise.all([
            getItem('proxy_host'),
            getItem('proxy_port'),
            getUnlockedFeatures()
        ]);

        if (storedHost) {
            this.proxy_host = storedHost;
        }
        if (storedPort) {
            this.proxy_port = storedPort;
        }
        if (Array.isArray(features)) {
            this.unlocked = features;
        }

        // Prefer package name provided by agent (saved from login); fallback to settings.packagename
        try {
            const apkPkg = await getItem('apk_package_name');
            if (apkPkg) {
                this.agent_package_name = apkPkg;
            }
        } catch (e) {
            // ignore
        }

        //featureUnlocked
        await this.$listen('featureUnlocked', async () => {
            this.unlocked = await getUnlockedFeatures();
        })
    },
}
</script>
