<template>
    <button v-if="isFeatureUnlocked('registerScript') && whitelabelConfig.targetApp === 'tiktok'"
        class="btn btn-md btn-primary ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'register' } })">
        <font-awesome-icon icon="fa-solid fa-user-plus" class="h-3 w-3" />
        {{ $t('register') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'login' } })">
        <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="h-3 w-3" />
        {{ $t('login') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'profile' } })">
        <font-awesome-icon icon="fa-solid fa-user-plus" class="h-3 w-3" />
        {{ $t('fillProfile') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'matchAccount' } })">
        <font-awesome-icon icon="fa-solid fa-user-check" class="h-3 w-3" />
        {{ $t('matchAccount') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'switchAccount' } })">
        <font-awesome-icon icon="fa-solid fa-right-left" class="h-3 w-3" />
        {{ $t('switchAccount') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'accountWarmup' } })">
        <font-awesome-icon icon="robot" class="h-3 w-3 text-success" />
        {{ $t('accountWarmup') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'post' } })">
        <font-awesome-icon icon="paper-plane" class="h-3 w-3 text-success" />
        {{ $t('post') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'tiktok'"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'deletePost' } })">
        <font-awesome-icon icon="fa-solid fa-trash" class="h-3 w-3 text-error" />
        {{ $t('deletePost') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'tiktok'"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'privacySettings' } })">
        <font-awesome-icon icon="fa-solid fa-shield-halved" class="h-3 w-3 text-info" />
        {{ $t('privacySettings') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'instagram'"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'deleteReel' } })">
        <font-awesome-icon icon="fa-solid fa-trash" class="h-3 w-3 text-error" />
        {{ $t('deleteReel') }}
    </button>


    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'tiktok'"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'boostComments' } })">
        <font-awesome-icon icon="fa-solid fa-comment-dots" class="h-3 w-3 text-success" />
        {{ $t('boostComments') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1" v-if="whitelabelConfig.targetApp === 'tiktok'"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'boostLives' } })">
        <font-awesome-icon icon="fa-solid fa-video" class="h-3 w-3 text-success" />
        {{ $t('boostLives') }}
    </button>

    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'scrapeUsers' } })">
        <font-awesome-icon icon="fas fa-spider" class="h-3 w-3 mr-1" />
        {{ $t('scrapeUsers') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'followBack' } })">
        <font-awesome-icon icon="fa-solid fa-user-plus" class="h-3 w-3 mr-1" />
        {{ $t('followBack') }}
    </button>
    <button class="btn btn-md btn-primary  ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'unFollowAll' } })">
        <font-awesome-icon icon="fa-solid fa-user-minus" class="h-3 w-3 mr-1" />
        {{ $t('unFollowAll') }}
    </button>

    <!-- 超级营销脚本 -->
    <button class="btn btn-md btn-success ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'superMarketing' } })">
        <font-awesome-icon icon="fa-solid fa-rocket" class="h-3 w-3 mr-1" />
        {{ $t('superMarketing') }}
    </button>

    <!-- AI 智能代理脚本（需激活码解锁） -->
    <button v-if="isFeatureUnlocked('aiAgent')" class="btn btn-md btn-accent ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'aiAgent' } })">
        <font-awesome-icon icon="fa-solid fa-robot" class="h-3 w-3 mr-1" />
        {{ $t('aiAgent') }}
    </button>

    <!-- 测试脚本（需激活码解锁） -->
    <button class="btn btn-md btn-warning ml-1 mb-1"
        @click="$emiter('showDialog', { name: 'beforeRunScriptDialog', script: { name: 'test' } })">
        <font-awesome-icon icon="fa-solid fa-flask-vial" class="h-3 w-3 mr-1" />
        {{ $t('testScript') }}
    </button>
</template>
<script>
import { getUnlockedFeatures } from '@/utils/features.js';
import { cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';
export default {
    name: 'Scripts',
    props: ['settings'],
    data() {
        return {
            unlocked: [],
            whitelabelConfig: cloneDefaultWhiteLabelConfig(),
        }
    },
    methods: {
        isFeatureUnlocked(key) {
            return Array.isArray(this.unlocked) && this.unlocked.includes(key);
        }
    },
    async mounted() {
        this.unlocked = await getUnlockedFeatures();
        await this.$listen('featureUnlocked', async () => {
            this.unlocked = await getUnlockedFeatures();
        });
    },
}
</script>
