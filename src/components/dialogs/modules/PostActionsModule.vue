<template>
    <div class="card bg-base-100 border border-base-300 mb-4">
        <div class="card-body p-4">
            <h3 class="card-title text-lg mb-4 text-primary">
                <font-awesome-icon icon="fa-solid fa-photo-film" class="mr-2" />
                {{ $t('postRelatedActions') }}
            </h3>

            <!-- 帖子处理设置 -->
            <div :class="['border border-base-200 rounded-lg p-3 transition-all', 'bg-base-50']" class="mb-4">
                <div class="space-y-3 flex flex-row flex-wrap gap-4">
                    <div class="flex items-center gap-4" v-if="isUsernameSource">
                        <span class="text-md font-bold">{{ $t('maxPostsToProcess') }}:</span>
                        <input type="number" class="input input-md input-bordered w-20"
                            :value="postSettings.max_posts_count"
                            @input="$emit('updatePostSettings', 'max_posts_count', Number($event.target.value))"
                            min="1" max="50" />
                        <span class="text-md">{{ $t('posts') }}</span>
                        <div class="alert alert-info py-2 px-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="stroke-current shrink-0 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-md">{{ $t('maxPostsPerUser') }}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <span class="text-md font-bold min-w-[100px]">{{ $t('repeatTimes') }}:</span>
                        <input type="number" class="input input-md input-bordered w-20"
                            :value="postSettings.repeat_times"
                            @input="$emit('updatePostSettings', 'repeat_times', Number($event.target.value))"
                            min="1" max="20" />
                        <span class="text-md">{{ $t('times') }}</span>
                        <div class="alert alert-info py-2 px-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="stroke-current shrink-0 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-md">{{ helpRepeatTimes }}</span>
                        </div>
                    </div>
                </div>

                <!-- 观看时长 -->
                <div class="flex w-full items-center gap-2 mt-8 mb-8">
                    <label class="font-bold mr-4">{{ $t('viewDuration') }}:</label>
                    <VueSlider :modelValue="postSettings.view_durations"
                        @update:modelValue="$emit('updatePostSettings', 'view_durations', $event)"
                        :width="500" :min="0" :max="300"
                        :marks="{ 0: '0', 60: '60', 120: '120', 180: '180', 240: '240', 300: `300 ${$t('second')}` }" />
                </div>
                <div class="alert alert-info py-2 px-3 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="stroke-current shrink-0 w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-md">{{ $t('viewDurationTips') }}</span>
                </div>
            </div>

            <div class="divider my-2"></div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <!-- 帖子互动操作 - with UI/UX improvement -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all',
                    features.boostPosts ? 'bg-error/10 border-error shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center mb-4">
                        <input type="checkbox" class="checkbox checkbox-primary mr-3"
                            :checked="features.boostPosts"
                            @change="$emit('updateFeature', 'boostPosts', $event.target.checked)" />
                        <font-awesome-icon icon="fa-solid fa-heart" class="text-error mr-2" />
                        <span class="font-semibold text-lg">{{ $t('postInteractionAction') }}</span>
                    </div>

                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <!-- UI/UX improvement: disable when boostPosts is not enabled -->
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    :checked="postSettings.enable_like"
                                    @change="$emit('updatePostSettings', 'enable_like', $event.target.checked)"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('like') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    :checked="postSettings.enable_favorite"
                                    @change="$emit('updatePostSettings', 'enable_favorite', $event.target.checked)"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('favorite') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    :checked="postSettings.enable_repost"
                                    @change="$emit('updatePostSettings', 'enable_repost', $event.target.checked)"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('repost') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    :checked="postSettings.enable_share"
                                    @change="$emit('updatePostSettings', 'enable_share', $event.target.checked)"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('share') }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 评论操作 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all',
                    features.massComment ? 'bg-warning/10 border-warning shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center mb-4">
                        <input type="checkbox" class="checkbox checkbox-primary mr-3"
                            :checked="features.massComment"
                            @change="$emit('updateFeature', 'massComment', $event.target.checked)" />
                        <font-awesome-icon icon="fa-solid fa-comment" class="text-warning mr-2" />
                        <span class="font-semibold text-lg">{{ $t('commentAction') }}</span>
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-row items-center gap-2 mb-3">
                            <label class="font-bold text-md">{{ $t('generateByChatGPT') }}:</label>
                            <input type="checkbox" class="toggle toggle-accent toggle-md"
                                :checked="commentSettings.generate_by_chatgpt"
                                @change="$emit('updateCommentSettings', 'generate_by_chatgpt', $event.target.checked)" />
                        </div>

                        <div v-if="commentSettings.generate_by_chatgpt" class="space-y-3">
                            <div class="border border-base-200 rounded-lg p-3 bg-base-50">
                                <h4 class="font-semibold text-md mb-2">{{ $t('chatgptSettings') }}</h4>

                                <div class="grid grid-cols-1 gap-2">
                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('url') }}</span>
                                        </label>
                                        <input type="text" class="input input-md w-full"
                                            placeholder="https://api.openai.com/v1/chat/completions"
                                            :value="commentSettings.chatgpt_settings.url"
                                            @input="$emit('updateCommentChatgpt', 'url', $event.target.value)" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('apiKey') }}</span>
                                        </label>
                                        <div class="flex items-center gap-2">
                                            <input :type="commentApiKeyVisible ? 'text' : 'password'"
                                                class="input input-md w-full" placeholder="sk-********"
                                                :value="commentSettings.chatgpt_settings.api_key"
                                                @input="$emit('updateCommentChatgpt', 'api_key', $event.target.value)" />
                                            <button type="button" class="btn btn-ghost btn-square btn-sm"
                                                @click="$emit('toggleCommentApiKeyVisibility')"
                                                :title="commentApiKeyVisible ? $t('hide') : $t('show')">
                                                <font-awesome-icon
                                                    :icon="commentApiKeyVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('model') }}</span>
                                        </label>
                                        <input type="text" class="input input-md" placeholder="gpt-4o-mini"
                                            :value="commentSettings.chatgpt_settings.model"
                                            @input="$emit('updateCommentChatgpt', 'model', $event.target.value)" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('systemPrompt') }}</span>
                                        </label>
                                        <textarea class="textarea textarea-md h-12"
                                            :placeholder="$t('systemPromptTips')"
                                            :value="commentSettings.chatgpt_settings.system_prompt"
                                            @input="$emit('updateCommentChatgpt', 'system_prompt', $event.target.value)"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <button class="btn btn-md btn-primary" @click="$emit('testChatGPT', 'comment')">
                                    {{ $t('testChatGPT') }}
                                </button>
                                <span :class="testResultStyle" class="text-md">{{ testResult }}</span>
                            </div>
                        </div>

                        <div v-else class="space-y-3">
                            <div class="form-control">
                                <label class="label py-1">
                                    <span class="label-text text-md">{{ $t('comments') }}</span>
                                </label>
                                <textarea class="textarea textarea-md textarea-bordered h-16"
                                    :value="commentSettings.comment_content"
                                    @input="$emit('updateCommentSettings', 'comment_content', $event.target.value)"
                                    :placeholder="$t('commentContentTips')"></textarea>
                            </div>

                            <div class="flex gap-4">
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="commentOrder" value="random"
                                        class="radio radio-md radio-primary"
                                        :checked="commentSettings.comment_order === 'random'"
                                        @change="$emit('updateCommentSettings', 'comment_order', 'random')" />
                                    <span class="text-md">{{ $t('random') }}</span>
                                </label>
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="commentOrder" value="sequential"
                                        class="radio radio-md radio-primary"
                                        :checked="commentSettings.comment_order === 'sequential'"
                                        @change="$emit('updateCommentSettings', 'comment_order', 'sequential')" />
                                    <span class="text-md">{{ $t('sequential') }}</span>
                                </label>
                            </div>

                            <label class="cursor-pointer flex items-center gap-2">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-accent"
                                    :checked="commentSettings.insert_emoji"
                                    @change="$emit('updateCommentSettings', 'insert_emoji', $event.target.checked)" />
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
import VueSlider from "vue-3-slider-component";

export default {
    name: 'PostActionsModule',
    components: {
        VueSlider
    },
    props: {
        isUsernameSource: {
            type: Boolean,
            required: true
        },
        features: {
            type: Object,
            required: true
        },
        postSettings: {
            type: Object,
            required: true
        },
        commentSettings: {
            type: Object,
            required: true
        },
        commentApiKeyVisible: {
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
        },
        helpRepeatTimes: {
            type: String,
            required: true
        }
    },
    emits: [
        'updateFeature',
        'updatePostSettings',
        'updateCommentSettings',
        'updateCommentChatgpt',
        'toggleCommentApiKeyVisibility',
        'testChatGPT'
    ]
};
</script>
