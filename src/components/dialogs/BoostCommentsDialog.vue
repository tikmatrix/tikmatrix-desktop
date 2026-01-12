<template>
    <!-- 添加提示信息 -->
    <div class="alert alert-warning mb-4 shadow-lg">
        <div>
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="h-6 w-6 mr-2" />
            <span>{{ $t('boostCommentsWarning') }}</span>
        </div>
    </div>

    <div class="flex flex-row items-center p-2 w-full">
        <textarea class="textarea textarea-success w-full max-w-xl col-span-3 h-32 leading-tight"
            :placeholder="$t('targetCommentUrlTips')" autocomplete="off" v-model="target_comment_urls"> </textarea>
    </div>

    <div class="flex flex-row items-center p-2 gap-2">
        <label class="font-bold text-right col-span-1">{{ $t('boostOptions') }}:</label>
        <div class="flex flex-wrap gap-4">
            <div class="form-control">
                <label class="label cursor-pointer gap-2">
                    <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_like_comment" />
                    <span class="label-text">{{ $t('likeComment') }}</span>
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer gap-2">
                    <input type="checkbox" class="checkbox checkbox-primary" v-model="enable_reply_comment" />
                    <span class="label-text">{{ $t('replyComment') }}</span>
                </label>
            </div>
        </div>
    </div>

    <!-- 回复评论内容设置 -->
    <div class="flex items-center flex-row gap-2 max-w-full w-full mt-2">
        <span class="font-bold">{{ $t('replyContents') }}: </span>
        <textarea class="textarea textarea-success w-lg h-32 leading-tight" :placeholder="$t('replyContentTips')"
            autocomplete="off" v-model="reply_contents"> </textarea>
        <div class="flex flex-col gap-2">
            <div class="flex flex-row items-center gap-2">
                <label class="font-bold text-right col-span-1">{{ $t('insertEmoji') }}:</label>
                <input type="checkbox" class="toggle toggle-accent col-span-1" v-model="insert_emoji"
                    title="😃, 😄, 😁, 😆, 😅, 😂, 🤣, 😊, 😇, 🙂, 🙃, 😉, 😋, 😛, 😝, 😜, 🤪, 😎, 🤩, 🥳, 😏, 🤗, 🤠, 😍, 😘, 😚, 😙, 😗, 🥰, 🤤, 😻, 😽, 💖, 💗, 💓, 💞, 💕, 💟, ❣️, 💌, 🌟, ✨, 💫, 🎉, 🎊, 🎁, 🎈, 🍾, 🥂, 🍻" />
            </div>
            <div class="flex flex-row items-center gap-2">
                <label class="font-bold">{{ $t('commentOrder') }}:</label>
                <div class="flex items-center gap-2">
                    <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="replyOrder" value="random" class="radio radio-md radio-primary"
                            v-model="reply_order" />
                        <span>{{ $t('random') }}</span>
                    </label>
                    <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="replyOrder" value="sequential" class="radio radio-md radio-primary"
                            v-model="reply_order" />
                        <span>{{ $t('sequential') }}</span>
                    </label>
                </div>
            </div>
        </div>
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
import { boostCommentsSettings } from '@/utils/settingsManager';

export default {
    name: 'BoostComments',
    components: {
        VueSlider
    },
    mixins: [
        boostCommentsSettings.createVueMixin(
            {
                target_comment_urls: '',
                enable_like_comment: false,
                enable_reply_comment: false,
                reply_contents: 'Great point!\nI agree!\nThanks for sharing!',
                insert_emoji: false,
                reply_order: 'random',
                task_interval: [0, 0]
            }, // 默认设置
            ['target_comment_urls', 'enable_like_comment', 'enable_reply_comment', 'reply_contents', 'insert_emoji', 'reply_order', 'task_interval'] // 需要监听的属性
        )
    ],
    data() {
        return {
            target_comment_urls: '',
            enable_like_comment: false,
            enable_reply_comment: false,
            reply_contents: 'Great point!\nI agree!\nThanks for sharing!',
            insert_emoji: false,
            reply_order: 'random',
            task_interval: [0, 0]
        }
    },
    methods: {
        filterTargetCommentUrl() {
            if (this.target_comment_urls == '') {
                alert(this.$t('commentUrlRequired'))
                return false;
            }
            //filter empty lines
            let lines = this.target_comment_urls.split('\n').filter(line => line.trim() != '')
            if (lines.length == 0) {
                alert(this.$t('commentUrlRequired'))
                return false;
            }
            //remove query string and validate comment URLs
            lines = lines.map(line => {
                try {
                    let url = new URL(line)
                    // 检查是否包含评论相关的路径或参数
                    if (url.pathname.includes('/comment/') || url.search.includes('comment') || line.includes('#comment')) {
                        return url.origin + url.pathname + url.search + url.hash
                    } else {
                        // 如果不是评论链接，尝试作为帖子链接处理
                        return url.origin + url.pathname
                    }
                } catch (e) {
                    return line; // 如果不是有效URL，保持原样
                }
            })
            this.target_comment_urls = lines.join('\n')
            return true;
        },

        async runScript(enable_multi_account = false, rotate_proxy = false) {
            if (!this.filterTargetCommentUrl()) {
                return false;
            }

            // 检查是否至少选择了一个提升选项
            if (!this.enable_like_comment && !this.enable_reply_comment) {
                alert(this.$t('selectAtLeastOneOption'))
                return false;
            }

            // 如果启用回复评论，检查回复内容
            if (this.enable_reply_comment && this.reply_contents.trim() === '') {
                alert(this.$t('replyContentsRequired'))
                return false;
            }

            await this.$emiter('run_now_by_account', {
                name: 'boost_comment',
                args: {
                    min_interval: Number(this.task_interval[0]),
                    max_interval: Number(this.task_interval[1]),
                    enable_multi_account: enable_multi_account,
                    rotate_proxy: rotate_proxy,
                }
            })
            return true;
        },
    }
}
</script>
