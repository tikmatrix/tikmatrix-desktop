<template>
    <div class="space-y-6">
        <div class="card bg-base-100 border border-base-200 shadow-md">
            <div class="card-body space-y-6">
                <h3 class="card-title text-lg font-semibold">{{ $t('postBasicSettings') }}</h3>
                <div class="space-y-4">
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start"
                        v-if="whitelabelConfig.targetApp === 'instagram'">
                        <span
                            class="text-md font-semibold uppercase tracking-wide text-base-content/70 md:text-right md:pt-1">{{
                                $t('placement') }}</span>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2">
                                <input type="radio" id="reel" value="reel" v-model="localFormData.placement"
                                    class="form-radio text-primary">
                                <span>Reel</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="story" value="story" v-model="localFormData.placement"
                                    class="form-radio text-primary">
                                <span>Story</span>
                            </label>

                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <span
                            class="text-md font-semibold uppercase tracking-wide text-base-content/70 md:text-right md:pt-1">{{
                                $t('postWay') }}</span>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2" v-if="whitelabelConfig.targetApp === 'tiktok'">
                                <input type="radio" id="share" value="share" v-model="localFormData.post_way"
                                    class="form-radio text-primary">
                                <span>{{ $t('share') }}</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="addButton" value="addButton" v-model="localFormData.post_way"
                                    class="form-radio text-primary">
                                <span>{{ $t('addButton') }}</span>
                            </label>
                            <label class="flex items-center gap-2" v-if="localFormData.placement !== 'story'">
                                <input type="radio" id="useSound" value="useSound" v-model="localFormData.post_way"
                                    class="form-radio text-primary">
                                <span>{{ $t('useSound') }}</span>
                            </label>
                        </div>
                    </div>
                    <div v-if="localFormData.post_way === 'useSound'"
                        class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('soundName') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('soundInputTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <input type="text" v-model="localFormData.sound_name"
                            :placeholder="$t('soundNameOrUrlPlaceholder')" class="input input-md input-bordered" />
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <span
                            class="text-md font-semibold uppercase tracking-wide text-base-content/70 md:text-right md:pt-1">{{
                                $t('contentType') }}</span>
                        <div class="flex flex-wrap items-center gap-4">
                            <label class="flex items-center gap-2">
                                <input type="radio" id="video" value="0" v-model="localFormData.content_type"
                                    class="form-radio text-primary">
                                <span>{{ $t('video') }}</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="image" value="1" v-model="localFormData.content_type"
                                    class="form-radio text-primary">
                                <span>{{ $t('image') }}</span>
                            </label>
                            <div v-if="localFormData.content_type == 1" class="flex items-center gap-2">
                                <input class="input input-md input-bordered w-24"
                                    v-model.number="localFormData.image_count" :placeholder="$t('imageCount')"
                                    type="number" min="1" />
                                <span class="text-md text-base-content/70">{{ $t('imageCount') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 border border-base-200 shadow-md">
            <div class="card-body space-y-6">
                <h3 class="card-title text-lg font-semibold">{{ $t('soundSettings') }}</h3>
                <div class="space-y-4">
                    <div v-if="localFormData.post_way !== 'useSound' && whitelabelConfig.targetApp === 'tiktok'"
                        class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('addSound') }}</span>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2">
                                <input type="radio" id="default" value="-1" v-model="localFormData.add_sound"
                                    class="form-radio text-primary">
                                <span>{{ $t('default') }}</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="disable" value="0" v-model="localFormData.add_sound"
                                    class="form-radio text-primary">
                                <span>{{ $t('disable') }}</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="enable" value="1" v-model="localFormData.add_sound"
                                    class="form-radio text-primary">
                                <span>{{ $t('enable') }}</span>
                            </label>
                            <div class="tooltip tooltip-right" :data-tip="$t('addSoundTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="customSound" value="custom" v-model="localFormData.add_sound"
                                    class="form-radio text-primary">
                                <span>{{ $t('customSound') }}</span>
                            </label>
                        </div>
                    </div>
                    <div v-if="localFormData.post_way !== 'useSound' && localFormData.add_sound === 'custom'"
                        class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('customSound') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('customSoundTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <input type="text" v-model="localFormData.custom_sound_keyword"
                            :placeholder="$t('soundNameOrUrlPlaceholder')" class="input input-md input-bordered" />
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('loadingTime') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('loadingTimeTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <VueSlider class="md:w-[500px] max-w-full" v-model="localFormData.sound_wait_time" :width="500"
                            :min="5" :max="30" :step="1" :marks="{
                                5: '5',
                                10: '10',
                                15: '15',
                                20: '20',
                                25: '25',
                                30: '30' + ' ' + $t('second')
                            }" />
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('uploadWaitTime') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('uploadWaitTimeTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <VueSlider class="md:w-[500px] max-w-full" v-model="localFormData.upload_wait_time" :width="500"
                            :min="30" :max="300" :step="30" :marks="{
                                30: '30',
                                150: '150',
                                300: '300' + ' ' + $t('second')
                            }" />
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start"
                        v-if="localFormData.add_sound == 1 || localFormData.post_way == 'useSound' || localFormData.add_sound === 'custom'">
                        <span
                            class="text-md font-semibold uppercase tracking-wide text-base-content/70 md:text-right md:pt-1">{{
                                $t('soundVolume') }}</span>
                        <div class="flex flex-wrap items-center gap-6">
                            <div class="flex items-center gap-3">
                                <span class="text-md text-base-content/70">{{ $t('originSound') }}</span>
                                <VueSlider class="w-28" v-model="localFormData.origin_sound_volume" :width="100"
                                    :min="0" :max="100" :step="25" :marks="{ 0: '0', 100: '100' }" />
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-md text-base-content/70">{{ $t('addSound') }}</span>
                                <VueSlider class="w-28" v-model="localFormData.add_sound_volume" :width="100" :min="0"
                                    :max="100" :step="25" :marks="{ 0: '0', 100: '100' }" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 border border-base-200 shadow-md">
            <div class="card-body space-y-6">
                <h3 class="card-title text-lg font-semibold">{{ $t('postOptions') }}</h3>
                <div class="space-y-4">
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1"
                            v-if="whitelabelConfig.targetApp === 'tiktok'">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('addProductLink') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('addProductLinkTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-4" v-if="whitelabelConfig.targetApp === 'tiktok'">
                            <label class="flex items-center gap-2">
                                <input type="radio" id="disable" value="0" v-model="localFormData.add_product_link"
                                    class="form-radio text-primary">
                                <span>{{ $t('disable') }}</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" id="enable" value="1" v-model="localFormData.add_product_link"
                                    class="form-radio text-primary">
                                <span>{{ $t('enable') }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('aiLabel') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('aiLabelDescription')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <input type="checkbox" class="toggle toggle-primary" v-model="localFormData.ai_label" />
                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <div class="flex items-center gap-1 md:justify-end md:pt-1">
                            <span class="text-md font-semibold uppercase tracking-wide text-base-content/70">{{
                                $t('captions') }}</span>
                            <div class="tooltip tooltip-right" :data-tip="$t('captionsTips')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="stroke-info shrink-0 w-5 h-5 cursor-help">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <textarea class="textarea textarea-bordered h-32 leading-tight"
                            :placeholder="$t('captionsTips')" autocomplete="off"
                            v-model="localFormData.captions"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 border border-base-200 shadow-md">
            <div class="card-body space-y-6">
                <h3 class="card-title text-lg font-semibold">{{ $t('materialsSettings') }}</h3>
                <div class="space-y-4">
                    <div class="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] items-start">
                        <span
                            class="text-md font-semibold uppercase tracking-wide text-base-content/70 md:text-right md:pt-1">{{
                                $t('materials') }}</span>
                        <div class="space-y-4">
                            <div class="flex flex-wrap gap-4">
                                <label class="flex items-center gap-2">
                                    <input type="radio" id="localFolder" value="localFolder"
                                        v-model="localFormData.material_source" class="form-radio text-primary">
                                    <span>{{ $t('localFolder') }}</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="radio" id="materialLibrary" value="materialLibrary"
                                        v-model="localFormData.material_source" class="form-radio text-primary">
                                    <span>{{ $t('materialLibrary') }}</span>
                                </label>
                            </div>
                            <div v-if="localFormData.material_source === 'localFolder'">
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="text-md text-base-content/70">{{ $t('materialPath') }}</span>
                                    <div class="tooltip tooltip-right" :data-tip="$t('materialsPathTips')">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            class="stroke-info shrink-0 w-4 h-4 cursor-help">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <input type="text" :placeholder="$t('clickToSelectMaterialsPath')"
                                    class="input input-md input-bordered w-full" readonly @click="selectMaterials"
                                    v-model="localFormData.material_path" />
                            </div>
                            <div v-if="localFormData.material_source === 'materialLibrary'">
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="text-md text-base-content/70">{{ $t('selectTags') }}</span>
                                    <div class="tooltip tooltip-right" :data-tip="$t('materialsTagsTips')">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            class="stroke-info shrink-0 w-4 h-4 cursor-help">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="relative">
                                    <div class="min-h-[42px] w-full border border-base-300 rounded-lg px-3 py-2 cursor-pointer flex flex-wrap items-center gap-1"
                                        @click.stop="toggleTagsDropdown">
                                        <template v-if="selectedTags.length > 0">
                                            <div v-for="(tag, index) in selectedTags" :key="index"
                                                class="badge badge-info gap-1 px-2 py-3 text-white">
                                                <span>{{ tag }}</span>
                                                <span class="cursor-pointer hover:text-error"
                                                    @click.stop="removeTag(index)">×</span>
                                            </div>
                                        </template>
                                        <span v-else class="text-gray-400 text-md">{{ $t('clickToSelectTags') }}</span>
                                    </div>

                                    <div v-if="showTagsDialog"
                                        class="absolute top-full left-0 right-0 mt-1 bg-base-100 border border-base-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto p-2">
                                        <div v-for="tag in tags" :key="tag.id" class="mb-1">
                                            <label
                                                class="flex items-center p-1 hover:bg-base-200 rounded cursor-pointer"
                                                @click.stop>
                                                <input type="checkbox" :id="'tag-' + tag.id"
                                                    class="checkbox checkbox-primary checkbox-md mr-2"
                                                    :checked="selectedTags.includes(tag.name)" @change="toggleTag(tag)"
                                                    @click.stop />
                                                <span class="truncate">{{ tag.name }}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from "vue-3-slider-component";
import { open } from '@tauri-apps/api/dialog';
import { cloneDefaultWhiteLabelConfig } from '../../config/whitelabel.js';

export default {
    name: 'PostFormFields',
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
            localFormData: {
                custom_sound_keyword: ''
            },
            tags: [],
            showTagsDialog: false,
            whitelabelConfig: cloneDefaultWhiteLabelConfig(),
        }
    },
    computed: {
        selectedTags() {
            return this.localFormData.materials_tags
                ? this.localFormData.materials_tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                : [];
        },
    },
    watch: {
        formData: {
            handler(newVal) {
                this.localFormData = {
                    custom_sound_keyword: '',
                    ...newVal
                };
                if (this.localFormData.add_sound !== 'custom' && !this.localFormData.custom_sound_keyword) {
                    this.localFormData.custom_sound_keyword = newVal?.custom_sound_keyword || '';
                }
                // For Instagram, auto migrate 'share' to 'addButton' for backward compatibility
                if (this.whitelabelConfig.targetApp === 'instagram' && this.localFormData.post_way === 'share') {
                    this.localFormData.post_way = 'addButton';
                }
                if (this.whitelabelConfig.targetApp === 'instagram' && this.localFormData.placement === 'story') {
                    this.localFormData.post_way = 'addButton';
                }
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
        // 获取所有标签
        async getTags() {
            try {
                const res = await this.$service.get_tags();
                this.tags = res.data || [];
            } catch (err) {
                console.error('获取标签失败', err);
            }
        },

        // 移除特定索引的标签
        removeTag(index) {
            const tags = [...this.selectedTags];
            tags.splice(index, 1);
            this.localFormData.materials_tags = tags.join(', ');
        },

        // 切换标签下拉框状态
        toggleTagsDropdown() {
            if (this.showTagsDialog) {
                this.closeTagsDropdown();
            } else {
                this.showTagsDropdown();
            }
        },

        // 显示下拉框
        showTagsDropdown() {
            this.showTagsDialog = true;
            setTimeout(() => {
                document.removeEventListener('click', this.handleOutsideClick);
                document.addEventListener('click', this.handleOutsideClick);
            }, 10);
        },

        // 处理点击外部区域
        handleOutsideClick(event) {
            const isOutside = !event.target.closest('.relative');
            if (isOutside && this.showTagsDialog) {
                this.closeTagsDropdown();
            }
        },

        // 关闭标签下拉框
        closeTagsDropdown() {
            this.showTagsDialog = false;
            document.removeEventListener('click', this.handleOutsideClick);
        },

        // 切换标签选择状态
        toggleTag(tag) {
            const tags = [...this.selectedTags];
            const index = tags.indexOf(tag.name);
            if (index === -1) {
                tags.push(tag.name);
            } else {
                tags.splice(index, 1);
            }
            this.localFormData.materials_tags = tags.join(', ');
        },

        // 选择本地素材文件夹
        async selectMaterials() {
            try {
                const filePath = await open({
                    multiple: false,
                    directory: true,
                    filters: []
                });
                if (filePath && typeof filePath === 'string') {
                    this.localFormData.material_path = filePath;
                } else {
                    await this.$emiter('NOTIFY', {
                        type: 'info',
                        message: this.$t('clickToSelectMaterialsPath'),
                        timeout: 2000
                    });
                }
            } catch (error) {
                console.error('选择文件夹失败:', error);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('selectFolderFailed'),
                    timeout: 2000
                });
            }
        },
    },
    async mounted() {
        // For Instagram, auto migrate 'share' to 'addButton' for backward compatibility
        if (this.whitelabelConfig.targetApp === 'instagram' && this.localFormData.post_way === 'share') {
            this.localFormData.post_way = 'addButton';
        }
        if (this.whitelabelConfig.targetApp === 'instagram' && this.localFormData.placement === 'story') {
            this.localFormData.post_way = 'addButton';
        }
        await this.getTags();
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }
}
</script>

<style scoped>
.badge {
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1;
}
</style>
