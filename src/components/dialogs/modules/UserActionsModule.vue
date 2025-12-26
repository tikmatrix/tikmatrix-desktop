<template>
    <div class="card bg-base-100 border border-base-300 mb-4">
        <div class="card-body p-4">
            <h3 class="card-title text-lg mb-4 text-primary">
                <font-awesome-icon icon="fa-solid fa-users" class="mr-2" />
                {{ $t('userRelatedActions') }}
            </h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <!-- 进入用户主页方式（全宽） -->
                <div class="col-span-1 lg:col-span-2 xl:col-span-3">
                    <div class="form-control flex items-center gap-4">
                        <label class="font-bold text-md">
                            <span>{{ $t('userProfileAccessMethod') }}</span>
                        </label>
                        <div class="flex flex-wrap gap-4">
                            <label class="cursor-pointer flex items-center gap-2">
                                <input type="radio" name="accessMethod" class="radio radio-primary" value="search"
                                    :checked="accessMethod === 'search'"
                                    @change="$emit('update:accessMethod', 'search')" />
                                <span>{{ $t('searchUser') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2">
                                <input type="radio" name="accessMethod" class="radio radio-primary" value="direct"
                                    :checked="accessMethod === 'direct'"
                                    @change="$emit('update:accessMethod', 'direct')" />
                                <span>{{ $t('directOpenProfile') }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 关注操作配置 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all',
                    features.followUsers ? 'bg-success/10 border-success shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-user-plus" class="text-success" />
                            <span class="font-semibold">{{ $t('followUsersAction') }}</span>
                        </div>
                        <input type="checkbox" class="toggle toggle-success toggle-md"
                            :checked="features.followUsers" @change="$emit('updateFeature', 'followUsers', $event.target.checked)" />
                    </div>
                </div>

                <!-- 取消关注配置 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all',
                    features.unfollowUsers ? 'bg-error/10 border-error shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-user-minus" class="text-error" />
                            <span class="font-semibold">{{ $t('unfollowUsersAction') }}</span>
                        </div>
                        <input type="checkbox" class="toggle toggle-error toggle-md"
                            :checked="features.unfollowUsers" @change="$emit('updateFeature', 'unfollowUsers', $event.target.checked)" />
                    </div>
                </div>

                <!-- 举报账号操作配置 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all space-y-2',
                    features.reportAccount ? 'bg-warning/10 border-warning shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-flag" class="text-warning" />
                            <span class="font-semibold">{{ $t('reportAccountAction') }}</span>
                        </div>
                        <input type="checkbox" class="toggle toggle-warning toggle-md"
                            :checked="features.reportAccount" @change="$emit('updateFeature', 'reportAccount', $event.target.checked)" />
                    </div>
                    <div v-if="features.reportAccount" class="text-xs text-base-content/70 mt-1">
                        <p>{{ $t('reportAccountPath') }}</p>
                        <p class="text-warning">{{ $t('reportAccountPathNote') }}</p>
                    </div>
                </div>

                <!-- 私信操作配置 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all space-y-3',
                    features.sendDM ? 'bg-info/10 border-info shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-envelope" class="text-info" />
                            <span class="font-semibold">{{ $t('sendDMAction') }}</span>
                        </div>
                        <input type="checkbox" class="toggle toggle-info toggle-md"
                            :checked="features.sendDM" @change="$emit('updateFeature', 'sendDM', $event.target.checked)" />
                    </div>

                    <div v-if="features.sendDM" class="space-y-3">
                        <div class="flex flex-row items-center gap-2 mb-3">
                            <label class="font-bold text-md">{{ $t('generateByChatGPT') }}:</label>
                            <input type="checkbox" class="toggle toggle-accent toggle-md"
                                :checked="dmSettings.generate_by_chatgpt"
                                @change="$emit('updateDmSettings', 'generate_by_chatgpt', $event.target.checked)" />
                        </div>

                        <div v-if="dmSettings.generate_by_chatgpt" class="space-y-3">
                            <div class="border border-base-200 rounded-lg p-3 bg-base-50">
                                <h4 class="font-semibold text-md mb-2">{{ $t('chatgptSettings') }}</h4>

                                <div class="grid grid-cols-1 gap-2">
                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('url') }}</span>
                                        </label>
                                        <input type="text" class="input input-md w-full"
                                            placeholder="https://api.openai.com/v1/chat/completions"
                                            :value="dmChatgptUrl"
                                            @input="$emit('updateDmChatgpt', 'url', $event.target.value)" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('apiKey') }}</span>
                                        </label>
                                        <div class="flex items-center gap-2">
                                            <input :type="dmApiKeyVisible ? 'text' : 'password'"
                                                class="input input-md w-full" placeholder="sk-********"
                                                :value="dmChatgptApiKey"
                                                @input="$emit('updateDmChatgpt', 'api_key', $event.target.value)" />
                                            <button type="button" class="btn btn-ghost btn-square btn-sm"
                                                @click="$emit('toggleDmApiKeyVisibility')"
                                                :title="dmApiKeyVisible ? $t('hide') : $t('show')">
                                                <font-awesome-icon
                                                    :icon="dmApiKeyVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('model') }}</span>
                                        </label>
                                        <input type="text" class="input input-md" placeholder="gpt-4o-mini"
                                            :value="dmChatgptModel"
                                            @input="$emit('updateDmChatgpt', 'model', $event.target.value)" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('systemPrompt') }}</span>
                                        </label>
                                        <textarea class="textarea textarea-md h-12"
                                            :placeholder="$t('systemPromptTips')"
                                            :value="dmChatgptSystemPrompt"
                                            @input="$emit('updateDmChatgpt', 'system_prompt', $event.target.value)"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <button class="btn btn-md btn-primary" @click="$emit('testChatGPT', 'dm')">
                                    {{ $t('testChatGPT') }}
                                </button>
                                <span :class="testResultStyle" class="text-md">{{ testResult }}</span>
                            </div>
                        </div>

                        <div v-else class="space-y-3">
                            <div class="form-control">
                                <label class="label py-1">
                                    <span class="label-text text-md">{{ $t('messageContents') }}</span>
                                </label>
                                <textarea class="textarea textarea-md textarea-bordered h-16"
                                    :value="dmSettings.message_contents"
                                    @input="$emit('updateDmSettings', 'message_contents', $event.target.value)"
                                    :placeholder="$t('messageContentsTips')"></textarea>
                            </div>

                            <div class="flex gap-4">
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="dmMessageOrder" value="random"
                                        class="radio radio-md radio-primary"
                                        :checked="dmSettings.message_order === 'random'"
                                        @change="$emit('updateDmSettings', 'message_order', 'random')" />
                                    <span class="text-md">{{ $t('random') }}</span>
                                </label>
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="dmMessageOrder" value="sequential"
                                        class="radio radio-md radio-primary"
                                        :checked="dmSettings.message_order === 'sequential'"
                                        @change="$emit('updateDmSettings', 'message_order', 'sequential')" />
                                    <span class="text-md">{{ $t('sequential') }}</span>
                                </label>
                            </div>

                            <label class="cursor-pointer flex items-center gap-2">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-accent"
                                    :checked="dmSettings.insert_emoji"
                                    @change="$emit('updateDmSettings', 'insert_emoji', $event.target.checked)" />
                                <span class="text-md">{{ $t('insertEmoji') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserActionsModule',
    props: {
        accessMethod: {
            type: String,
            required: true
        },
        features: {
            type: Object,
            required: true
        },
        dmSettings: {
            type: Object,
            required: true
        },
        dmChatgptUrl: {
            type: String,
            required: true
        },
        dmChatgptApiKey: {
            type: String,
            required: true
        },
        dmChatgptModel: {
            type: String,
            required: true
        },
        dmChatgptSystemPrompt: {
            type: String,
            required: true
        },
        dmApiKeyVisible: {
            type: Boolean,
            default: false
        },
        testResult: {
            type: String,
            default: ''
        },
        testResultStyle: {
            type: String,
            default: 'text-gray-500'
        }
    },
    emits: [
        'update:accessMethod',
        'updateFeature',
        'updateDmSettings',
        'updateDmChatgpt',
        'toggleDmApiKeyVisibility',
        'testChatGPT'
    ]
};
</script>
