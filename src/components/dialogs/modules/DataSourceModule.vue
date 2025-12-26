<template>
    <div class="card bg-base-100 border border-base-300 mb-4">
        <div class="card-body p-4">
            <h3 class="card-title text-lg mb-4 text-primary">
                <font-awesome-icon icon="fa-solid fa-database" class="mr-2" />
                {{ $t('dataSourceLabel') }}
            </h3>

            <!-- 数据源类型选择 -->
            <div class="form-control mb-4 flex items-center gap-4">
                <div class="grid md:grid-cols-2 gap-3">
                    <label class="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-base-200"
                        :class="{ 'bg-primary/5 border-primary': isUsernameSource }">
                        <input type="radio" class="radio radio-primary mt-1" value="usernames"
                            :checked="dataSourceType === 'usernames'" @change="$emit('update:dataSourceType', 'usernames')">
                        <div>
                            <span class="font-semibold">{{ $t('dataSourceUsernames') }}</span>
                            <p class="text-md text-gray-500 mt-1">{{ $t('dataSourceUsernamesDesc') }}</p>
                        </div>
                    </label>
                    <label class="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-base-200"
                        :class="{ 'bg-info/5 border-info': isPostLinkSource }">
                        <input type="radio" class="radio radio-info mt-1" value="post_links"
                            :checked="dataSourceType === 'post_links'" @change="$emit('update:dataSourceType', 'post_links')">
                        <div>
                            <span class="font-semibold">{{ $t('dataSourcePostLinks') }}</span>
                            <p class="text-md text-gray-500 mt-1">{{ $t('dataSourcePostLinksDesc') }}</p>
                        </div>
                    </label>
                </div>
            </div>

            <div class="space-y-6">
                <div class="grid gap-4 xl:grid-cols-2">
                    <!-- Import Section -->
                    <div class="border border-base-200 rounded-lg p-4 bg-base-50 flex flex-col gap-3">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-file-import" />
                            <h4 class="font-semibold text-md">{{ $t('datasetImportLabel') }}</h4>
                        </div>
                        <textarea class="textarea textarea-bordered textarea-md h-64" :value="datasetInput"
                            @input="$emit('update:datasetInput', $event.target.value)"
                            :placeholder="$t('datasetImportPlaceholder')"></textarea>
                        <div class="flex flex-wrap items-center gap-3">
                            <button class="btn btn-info btn-sm" @click="$emit('selectFile')">
                                <font-awesome-icon icon="fa-solid fa-file-arrow-up" class="mr-1" />
                                {{ $t('selectDatasetFile') }}
                            </button>
                            <button class="btn btn-primary btn-sm" :disabled="importing"
                                @click="$emit('import', 'append')">
                                <span v-if="importing" class="loading loading-spinner loading-sm mr-2"></span>
                                {{ $t('appendImport') }}
                            </button>
                            <button class="btn btn-secondary btn-sm" :disabled="importing"
                                @click="$emit('import', 'replace')">
                                <span v-if="importing" class="loading loading-spinner loading-sm mr-2"></span>
                                {{ $t('replaceImport') }}
                            </button>
                            <button class="btn btn-outline btn-error btn-sm"
                                :disabled="!datasetConfig.id || loading" @click="$emit('clear')">
                                {{ $t('clearDataset') }}
                            </button>
                        </div>
                        <span class="text-xs text-base-content/60">{{ $t('datasetImportHint') }}</span>
                        <div v-if="summary" class="alert alert-info mt-2 text-xs sm:text-sm">
                            <font-awesome-icon icon="fa-solid fa-clipboard-check" class="mr-2" />
                            <div class="flex flex-wrap gap-2">
                                <span>{{ $t('datasetInserted', { count: summary.inserted }) }}</span>
                                <span>{{ $t('datasetDuplicates', { count: summary.duplicates }) }}</span>
                                <span>{{ $t('datasetSkipped', { count: summary.skipped_empty }) }}</span>
                                <span>{{ $t('datasetRemoved', { count: summary.removed }) }}</span>
                                <span>{{ $t('datasetTruncated', { count: summary.truncated }) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Dataset Selection and Preview -->
                    <div class="border border-base-200 rounded-lg bg-base-50 p-4 flex flex-col gap-4">
                        <div class="flex flex-col gap-3">
                            <label class="font-semibold text-sm flex items-center gap-2">
                                <font-awesome-icon icon="fa-solid fa-chart-column" />
                                {{ $t('datasetSelectLabel') }}
                            </label>
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4">
                                <div class="flex items-center gap-2 min-w-[200px] sm:flex-1 sm:min-w-60">
                                    <select class="select select-bordered select-sm w-full"
                                        :value="String(datasetConfig.id || '')"
                                        @change="$emit('selectDataset', $event)" :disabled="optionsLoading">
                                        <option value="">{{ $t('datasetSelectPlaceholder') }}</option>
                                        <option v-for="option in options" :key="option.id" :value="String(option.id)">
                                            {{ formatDatasetOptionLabel(option) }}
                                        </option>
                                    </select>
                                    <span v-if="optionsLoading" class="loading loading-spinner loading-xs"></span>
                                </div>
                                <div v-if="datasetConfig.id"
                                    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 lg:flex-1">
                                    <input class="input input-bordered input-sm flex-1"
                                        :placeholder="$t('datasetLabelPlaceholder')" :value="labelDraft"
                                        @input="$emit('update:labelDraft', $event.target.value)" :disabled="loading" />
                                    <button class="btn btn-sm btn-outline" @click="$emit('saveLabel')"
                                        :disabled="loading">
                                        {{ $t('save') }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="loading" class="flex items-center gap-2 text-md text-base-content/70">
                            <span class="loading loading-spinner loading-sm"></span>
                            <span>{{ $t('datasetLoading') }}</span>
                        </div>

                        <div v-if="!stats" class="alert alert-info py-3 flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-circle-info" />
                            <span>{{ $t('datasetNotConfigured') }}</span>
                        </div>

                        <!-- Strategy Selection -->
                        <div class="border border-dashed border-base-200 rounded-lg bg-base-100">
                            <h4 class="font-semibold text-md mb-3 flex items-center gap-2">
                                <font-awesome-icon icon="fa-solid fa-diagram-project" />
                                {{ $t('datasetStrategyTitle') }}
                            </h4>
                            <div class="flex flex-col gap-3">
                                <label class="cursor-pointer flex items-start gap-2 p-3 rounded-lg border border-base-300"
                                    :class="{ 'border-primary bg-primary/10': strategy === 'shared_pool' }">
                                    <input type="radio" class="radio radio-primary mt-1" value="shared_pool"
                                        :checked="strategy === 'shared_pool'"
                                        @change="$emit('update:strategy', 'shared_pool')">
                                    <div>
                                        <div class="font-semibold">{{ $t('datasetSharedPool') }}</div>
                                        <p class="text-sm text-base-content/70">{{ $t('datasetSharedPoolDesc') }}</p>
                                    </div>
                                </label>
                                <label class="cursor-pointer flex items-start gap-2 p-3 rounded-lg border border-base-300"
                                    :class="{ 'border-secondary bg-secondary/10': strategy === 'consume_once' }">
                                    <input type="radio" class="radio radio-secondary mt-1" value="consume_once"
                                        :checked="strategy === 'consume_once'"
                                        @change="$emit('update:strategy', 'consume_once')">
                                    <div>
                                        <div class="font-semibold">{{ $t('datasetConsumeOnce') }}</div>
                                        <p class="text-sm text-base-content/70">{{ $t('datasetConsumeOnceDesc') }}</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Dataset Preview Table -->
                        <div class="border border-base-200 rounded-lg overflow-hidden">
                            <div class="px-4 py-2 bg-base-200 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                <span class="font-semibold text-md flex items-center gap-2">
                                    <font-awesome-icon icon="fa-solid fa-list" />
                                    {{ $t('datasetPreviewTitle') }}
                                </span>
                                <div v-if="pagination.total"
                                    class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-base-content/70 lg:justify-end">
                                    <span class="hidden md:inline text-xs text-base-content/60 whitespace-nowrap"
                                        v-if="previewRangeText">
                                        {{ previewRangeText }}
                                    </span>
                                    <div class="flex items-center gap-1">
                                        <button class="btn btn-ghost btn-xs px-2"
                                            @click="$emit('changePage', pagination.currentPage - 1)"
                                            :disabled="pagination.currentPage <= 1">
                                            {{ $t('previous') }}
                                        </button>
                                        <span class="font-medium whitespace-nowrap">
                                            {{ pagination.currentPage }} / {{ pageCount }}
                                        </span>
                                        <button class="btn btn-ghost btn-xs px-2"
                                            @click="$emit('changePage', pagination.currentPage + 1)"
                                            :disabled="pagination.currentPage >= pageCount">
                                            {{ $t('next') }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="datasetConfig.id && entries.length" class="overflow-x-auto">
                                <div class="max-h-64 overflow-y-auto">
                                    <table class="table table-zebra table-sm w-full">
                                        <thead>
                                            <tr>
                                                <th class="w-12">#</th>
                                                <th>{{ $t('datasetValue') }}</th>
                                                <th>{{ $t('datasetUpdatedAt') }}</th>
                                                <th class="w-20 text-right">{{ $t('actions') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(entry, idx) in entries" :key="entry.id">
                                                <td>{{ formatRowIndex(idx) }}</td>
                                                <td class="break-all">{{ entry.value }}</td>
                                                <td class="text-sm text-base-content/70">
                                                    {{ formatLocalTime(entry.updated_at) }}
                                                </td>
                                                <td class="text-right">
                                                    <button class="btn btn-ghost btn-xs text-error"
                                                        @click="$emit('deleteEntry', entry)" :disabled="loading">
                                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-else class="p-4 text-sm text-base-content/70">
                                <span v-if="!datasetConfig.id">{{ $t('datasetPreviewUnselected') }}</span>
                                <span v-else>{{ $t('datasetPreviewEmpty') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataSourceModule',
    props: {
        dataSourceType: {
            type: String,
            required: true
        },
        datasetConfig: {
            type: Object,
            required: true
        },
        datasetInput: {
            type: String,
            default: ''
        },
        summary: {
            type: Object,
            default: null
        },
        options: {
            type: Array,
            default: () => []
        },
        optionsLoading: {
            type: Boolean,
            default: false
        },
        labelDraft: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        importing: {
            type: Boolean,
            default: false
        },
        stats: {
            type: Object,
            default: null
        },
        strategy: {
            type: String,
            required: true
        },
        entries: {
            type: Array,
            default: () => []
        },
        pagination: {
            type: Object,
            required: true
        }
    },
    emits: [
        'update:dataSourceType',
        'update:datasetInput',
        'update:labelDraft',
        'update:strategy',
        'selectFile',
        'import',
        'clear',
        'selectDataset',
        'saveLabel',
        'changePage',
        'deleteEntry'
    ],
    computed: {
        isUsernameSource() {
            return this.dataSourceType === 'usernames';
        },
        isPostLinkSource() {
            return this.dataSourceType === 'post_links';
        },
        pageCount() {
            const { total, pageSize } = this.pagination;
            if (!total || !pageSize) {
                return 1;
            }
            return Math.max(1, Math.ceil(total / pageSize));
        },
        pageRange() {
            const { total, pageSize, currentPage } = this.pagination;
            if (!total || !pageSize) {
                return { start: 0, end: 0 };
            }
            const start = (currentPage - 1) * pageSize + 1;
            const end = Math.min(currentPage * pageSize, total);
            return { start, end };
        },
        previewRangeText() {
            const { total } = this.pagination;
            if (!total) {
                return '';
            }
            const { start, end } = this.pageRange;
            return this.$t('datasetPreviewRange', { start, end, total });
        }
    },
    methods: {
        formatDatasetOptionLabel(option) {
            if (!option) {
                return '';
            }
            const label = typeof option.label === 'string' ? option.label.trim() : '';
            const idText = `${this.$t('datasetId')}: ${option.id}`;
            if (label) {
                return `${label} · ${idText}`;
            }
            return idText;
        },
        formatLocalTime(value) {
            if (!value) return '-';
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) {
                return value;
            }
            return new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
        },
        formatRowIndex(idx) {
            const { start } = this.pageRange;
            if (!start) {
                return idx + 1;
            }
            return start + idx;
        }
    }
};
</script>
