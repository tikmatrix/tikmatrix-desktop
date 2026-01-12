<template>
    <div class="space-y-6 w-2xl min-w-2xl">
        <!-- 时长设置 -->
        <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-4">
            <div class="flex items-center gap-2 mb-4">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-primary" />
                <span class="font-semibold text-md">{{ $t('viewDuration') }}</span>
            </div>

            <div class="space-y-4">
                <div class="flex flex-col gap-3">
                    <VueSlider v-model="localFormData.view_duration" :width="500" :min="10" :max="180"
                        :marks="{ 10: '10', 90: '90', 180: `180 ${$t('second')}` }" />

                    <div class="alert alert-info py-2 px-3 text-sm mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="stroke-current shrink-0 w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{{ $t('viewDurationTips') }}</span>
                    </div>
                </div>

                <div class="divider my-2"></div>

                <div class="flex items-center gap-2">
                    <font-awesome-icon icon="fa-solid fa-hourglass-half" class="text-primary" />
                    <span class="font-semibold text-md">{{ $t('taskDuration') }}</span>
                </div>

                <VueSlider v-model="localFormData.taskDurationInMinutes" :width="500" :min="5" :max="60" :marks="{
                    5: '5',
                    20: '20',
                    40: '40',
                    60: `60 ${$t('minute')}`
                }" />
            </div>
        </div>

        <!-- 话题设置 -->
        <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-3">
            <div class="flex items-center gap-2">
                <font-awesome-icon icon="fa-solid fa-hashtag" class="text-primary" />
                <span class="font-semibold text-md">{{ $t('topics') }}</span>
            </div>

            <textarea class="textarea textarea-bordered w-full h-24" :placeholder="$t('topicsTips')" autocomplete="off"
                v-model="localFormData.topic"></textarea>
        </div>



        <!-- 互动设置 -->
        <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-4">
            <div class="flex items-center gap-2">
                <font-awesome-icon icon="fa-solid fa-heart" class="text-error" />
                <span class="font-semibold text-md">{{ $t('interact') }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- 关注概率 -->
                <div class="border border-base-200 rounded-lg p-3 bg-base-100 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-user-plus" class="text-success" />
                            <label class="text-sm font-medium">{{ $t('follow') }}</label>
                        </div>
                        <span class="badge badge-success font-semibold">{{ localFormData.floow_probable }}%</span>
                    </div>
                    <VueSlider v-model="localFormData.floow_probable" :width="'100%'" :min="0" :max="100"
                        :marks="{ 0: '0%', 50: '50%', 100: '100%' }" />
                </div>

                <!-- 点赞概率 -->
                <div class="border border-base-200 rounded-lg p-3 bg-base-100 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-thumbs-up" class="text-error" />
                            <label class="text-sm font-medium">{{ $t('like') }}</label>
                        </div>
                        <span class="badge badge-error font-semibold">{{ localFormData.like_probable }}%</span>
                    </div>
                    <VueSlider v-model="localFormData.like_probable" :width="'100%'" :min="0" :max="100"
                        :marks="{ 0: '0%', 50: '50%', 100: '100%' }" />
                </div>

                <!-- 收藏概率 -->
                <div class="border border-base-200 rounded-lg p-3 bg-base-100 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-star" class="text-warning" />
                            <label class="text-sm font-medium">{{ $t('favorite') }}</label>
                        </div>
                        <span class="badge badge-warning font-semibold">{{ localFormData.collect_probable }}%</span>
                    </div>
                    <VueSlider v-model="localFormData.collect_probable" :width="'100%'" :min="0" :max="100"
                        :marks="{ 0: '0%', 50: '50%', 100: '100%' }" />
                </div>

                <!-- 评论概率 -->
                <div class="border border-base-200 rounded-lg p-3 bg-base-100 space-y-3">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-message" class="text-info" />
                            <label class="text-sm font-medium">{{ $t('comment') }}</label>
                        </div>
                        <span class="badge badge-info font-semibold">{{ localFormData.comment_probable }}%</span>
                    </div>
                    <VueSlider v-model="localFormData.comment_probable" :width="'100%'" :min="0" :max="100"
                        :marks="{ 0: '0%', 50: '50%', 100: '100%' }" />
                </div>
            </div>
        </div>
    </div>
    <!-- 评论设置 -->
    <transition name="collapse-fade">
        <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-4 overflow-hidden"
            v-show="localFormData.comment_probable > 0">
            <div class="flex items-center gap-2">
                <font-awesome-icon icon="fa-solid fa-comment" class="text-warning" />
                <span class="font-semibold text-md">{{ $t('comments') }}</span>
            </div>

            <div class="flex items-center gap-3 bg-base-100 rounded-lg p-3 border border-base-200">
                <label class="font-semibold">{{ $t('generateByChatGPT') }}:</label>
                <input type="checkbox" class="toggle toggle-primary" v-model="localFormData.generate_by_chatgpt" />
            </div>

            <transition name="fade">
                <div v-show="localFormData.generate_by_chatgpt" class="space-y-3">
                    <div class="border border-base-200 rounded-lg p-4 bg-base-100 space-y-3">
                        <div class="flex items-center gap-2 mb-2">
                            <font-awesome-icon icon="fa-solid fa-robot" class="text-info" />
                            <span class="font-semibold">{{ $t('chatgptSettings') }}</span>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ $t('url') }}</span>
                            </label>
                            <input type="text" class="input input-bordered w-full"
                                placeholder="https://api.openai.com/v1/chat/completions"
                                v-model="localFormData.chatgpt_settings.url" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ $t('apiKey') }}</span>
                            </label>
                            <input type="password" class="input input-bordered w-full" placeholder="sk-********"
                                v-model="localFormData.chatgpt_settings.api_key" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ $t('model') }}</span>
                            </label>
                            <input type="text" class="input input-bordered w-full" placeholder="gpt-4o-mini"
                                v-model="localFormData.chatgpt_settings.model" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ $t('systemPrompt') }}</span>
                            </label>
                            <textarea class="textarea textarea-bordered w-full h-32"
                                :placeholder="$t('systemPromptTips')" autocomplete="off"
                                v-model="localFormData.chatgpt_settings.system_prompt"></textarea>
                        </div>
                    </div>

                    <button class="btn btn-primary w-full" @click="testChatGPT">
                        <font-awesome-icon icon="fa-solid fa-vial" class="mr-2" />
                        Test ChatGPT
                    </button>

                    <div v-if="testResult" class="alert" :class="{
                        'alert-warning': testResultStyle === 'text-warning',
                        'alert-success': testResultStyle === 'text-success',
                        'alert-error': testResultStyle === 'text-error'
                    }">
                        <span>{{ testResult }}</span>
                    </div>
                </div>
            </transition>

            <transition name="fade">
                <div v-show="!localFormData.generate_by_chatgpt" class="space-y-3">
                    <div class="form-control">
                        <textarea class="textarea textarea-bordered w-full h-32" :placeholder="$t('commentsTips')"
                            autocomplete="off" v-model="localFormData.comment"></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="flex items-center gap-3 bg-base-100 rounded-lg p-3 border border-base-200">
                            <font-awesome-icon icon="fa-solid fa-face-smile" class="text-warning" />
                            <label class="font-semibold">{{ $t('insertEmoji') }}:</label>
                            <input type="checkbox" class="toggle toggle-warning ml-auto"
                                v-model="localFormData.insert_emoji"
                                title="😃, 😄, 😁, 😆, 😅, 😂, 🤣, 😊, 😇, 🙂, 🙃, 😉, 😋, 😛, 😝, 😜, 🤪, 😎, 🤩, 🥳, 😏, 🤗, 🤠, 😍, 😘, 😚, 😙, 😗, 🥰, 🤤, 😻, 😽, 💖, 💗, 💓, 💞, 💕, 💟, ❣️, 💌, 🌟, ✨, 💫, 🎉, 🎊, 🎁, 🎈, 🍾, 🥂, 🍻" />
                        </div>

                        <div class="bg-base-100 rounded-lg p-3 border border-base-200">
                            <label class="font-semibold mb-2 block">{{ $t('commentOrder') }}:</label>
                            <div class="flex items-center gap-4">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="commentOrder" value="random"
                                        class="radio radio-primary radio-sm" v-model="localFormData.comment_order" />
                                    <span>{{ $t('random') }}</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="commentOrder" value="sequential"
                                        class="radio radio-primary radio-sm" v-model="localFormData.comment_order" />
                                    <span>{{ $t('sequential') }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import VueSlider from "vue-3-slider-component";

export default {
    name: 'AccountWarmupFormFields',
    components: {
        VueSlider
    },
    props: {
        formData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localFormData: {},
            testResult: '',
            testResultStyle: 'text-gray-500',
        }
    },
    watch: {
        formData: {
            handler(newVal) {
                this.localFormData = { ...newVal };
            },
            deep: true,
            immediate: true
        },
        localFormData: {
            handler(newVal) {
                this.$emit('update:formData', newVal);
            },
            deep: true
        }
    },
    methods: {
        async testChatGPT() {
            try {
                this.testResult = 'Testing...';
                this.testResultStyle = 'text-warning';
                const response = await this.$service.chatgpt_completion({
                    url: this.localFormData.chatgpt_settings.url,
                    api_key: this.localFormData.chatgpt_settings.api_key,
                    model: this.localFormData.chatgpt_settings.model,
                    system_prompt: this.localFormData.chatgpt_settings.system_prompt,
                    post_caption: 'This is a test post caption for TikTok.',
                });
                console.log(response);
                if (response.code == 0) {
                    this.testResult = response.data;
                    this.testResultStyle = 'text-success';
                } else {
                    this.testResult = response.data;
                    this.testResultStyle = 'text-error';
                }
            } catch (error) {
                this.testResult = 'Error: ' + error.message;
                this.testResultStyle = 'text-error';
            }
        },
    },
}
</script>

<style scoped>
.collapse-fade-enter-from,
.collapse-fade-leave-to {
    max-height: 0;
    opacity: 0;
}

.collapse-fade-enter-to,
.collapse-fade-leave-from {
    max-height: 1200px;
    /* big enough to contain content */
    opacity: 1;
}

.collapse-fade-enter-active,
.collapse-fade-leave-active {
    transition: max-height 320ms ease, opacity 240ms ease;
    overflow: hidden;
    will-change: max-height, opacity;
}

/* small fade/slide for inner sections */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
}
</style>
