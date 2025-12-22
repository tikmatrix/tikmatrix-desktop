<template>
    <dialog ref="dialog" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ $t('agentStartError') }}</h3>
            <p class="py-4" v-if="errorType === 'port'">{{ $t('agentPortOccupied', { process: processName }) }}</p>
            <p class="py-4" v-else-if="errorType === 'timeout'">{{ $t('agentStartTimeout') }}</p>
            <p class="py-4" v-else-if="errorType === 'notfound'">{{ $t('agentNotFound') }}</p>
            <p class="py-4" v-else-if="errorType === 'runtime'">{{ $t('agentRuntimeMissing') }}</p>
            <div v-if="errorType === 'runtime' && shouldShowLinks"
                class="rounded-lg bg-base-200/70 px-4 py-3 text-sm text-base-content/80">
                <p class="font-medium text-base-content">{{ $t('agentRuntimeHelp') }}</p>
                <a class="link link-primary wrap-break-word" :href="runtimeHelpLink" target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('agentRuntimeLinkText') }}
                </a>
            </div>
            <div v-else-if="shouldShowLinks" class="rounded-lg bg-base-200/70 px-4 py-3 text-sm text-base-content/80">
                <p class="font-medium text-base-content">{{ $t('agentTroubleshootHelp') }}</p>
                <a class="link link-primary wrap-break-word" :href="troubleshootLink" target="_blank"
                    rel="noopener noreferrer">
                    {{ $t('agentTroubleshootLinkText') }}
                </a>
            </div>
            <div class="modal-action">
                <button class="btn btn-error" @click="clearAgentCache">{{ $t('clearAgentCache') }}</button>
                <button class="btn" @click="closeDialog">{{ $t('cancel') }}</button>
                <button class="btn btn-primary" @click="exitApp">{{ $t('exitApp') }}</button>
            </div>
        </div>
    </dialog>
</template>

<script>
import { removeDir } from '@tauri-apps/api/fs';
import { BaseDirectory } from '@tauri-apps/api/fs';
import { message } from '@tauri-apps/api/dialog';

export default {
    name: 'AgentErrorDialog',
    props: {
        processName: {
            type: String,
            default: ''
        },
        errorType: {
            type: String,
            default: 'port' // 'port' | 'timeout' | 'notfound' | 'runtime'
        },
        officialWebsite: {
            type: String,
            default: ''
        },
        showOfficialWebsite: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        baseWebsite() {
            const site = (this.officialWebsite || '').trim();
            if (!site) return 'https://tikmatrix.com';
            return site.replace(/\/+$/g, '');
        },
        shouldShowLinks() {
            return this.showOfficialWebsite && this.officialWebsite;
        },
        troubleshootLink() {
            return `${this.baseWebsite}/docs/troubleshooting/software-startup-error`;
        },
        runtimeHelpLink() {
            return `${this.troubleshootLink}#step-2-check-microsoft-visual-c-redistributable`;
        }
    },
    methods: {
        show() {
            this.$refs.dialog.showModal();
        },
        closeDialog() {
            this.$refs.dialog.close();
        },
        async exitApp() {
            this.closeDialog();
            this.$emit('exit-app', true);
        },
        async clearAgentCache() {
            try {

                // 删除tmp和bin目录
                try {
                    await removeDir('tmp', { dir: BaseDirectory.AppData, recursive: true });
                } catch (e) {
                    console.log('tmp目录删除失败或不存在:', e);
                }

                try {
                    await removeDir('bin', { dir: BaseDirectory.AppData, recursive: true });
                } catch (e) {
                    console.log('bin目录删除失败或不存在:', e);
                }

                await message(this.$t('agentCacheCleared'), { title: this.$t('success'), type: 'info' });
                this.closeDialog();
                // 通知用户重启应用
                await message(this.$t('pleaseRestartApp'), { title: this.$t('notice'), type: 'info' });
                await this.exitApp();
            } catch (error) {
                await message(error.toString(), { title: this.$t('error'), type: 'error' });
            }
        }
    }
}
</script>
