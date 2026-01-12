<template>
    <!-- 顶部说明 -->
    <div class="alert alert-info mb-4 shadow-lg">
        <div>
            <font-awesome-icon icon="fa-solid fa-rocket" class="h-6 w-6 mr-2" />
            <span>{{ $t('superMarketingWarning') }}</span>
        </div>
    </div>

    <!-- 流程导航：横向 Tab -->
    <div class="bg-base-100 border border-base-300 rounded-2xl shadow-sm mb-6">
        <div class="px-4 py-3 overflow-x-auto">
            <div class="tabs tabs-lifted tabs-lg min-w-max">
                <button v-for="(tab, index) in availableTabs()" :key="tab.key" type="button"
                    class="tab flex items-center gap-3 whitespace-nowrap transition" :class="[
                        tab.key === activeTab ? 'tab-active text-primary' : 'opacity-70 hover:opacity-100',
                        'px-4'
                    ]" @click="setActiveTab(tab.key)">
                    <span class="badge badge-sm"
                        :class="tab.key === activeTab ? 'badge-primary' : 'badge-ghost text-base-content/70'">
                        {{ index + 1 }}
                    </span>
                    <font-awesome-icon :icon="tab.icon" class="text-base" />
                    <span class="font-semibold">{{ tab.label }}</span>
                </button>
            </div>
        </div>
    </div>

    <!-- 模块1：输入用户数据源 -->
    <div v-show="activeTab === 'data_source'" class="card bg-base-100 border border-base-300 mb-4">
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
                        <input type="radio" class="radio radio-primary mt-1" value="usernames" v-model="dataSourceType">
                        <div>
                            <span class="font-semibold">{{ $t('dataSourceUsernames') }}</span>
                            <p class="text-md text-gray-500 mt-1">{{ $t('dataSourceUsernamesDesc') }}</p>
                        </div>
                    </label>
                    <label class="cursor-pointer flex items-start gap-3 p-3 rounded-lg border border-base-200"
                        :class="{ 'bg-info/5 border-info': isPostLinkSource }">
                        <input type="radio" class="radio radio-info mt-1" value="post_links" v-model="dataSourceType">
                        <div>
                            <span class="font-semibold">{{ $t('dataSourcePostLinks') }}</span>
                            <p class="text-md text-gray-500 mt-1">{{ $t('dataSourcePostLinksDesc') }}</p>
                        </div>
                    </label>
                </div>
            </div>
            <div class="space-y-6">
                <div class="grid gap-4 xl:grid-cols-2">
                    <div class="border border-base-200 rounded-lg p-4 bg-base-50 flex flex-col gap-3">
                        <div class="flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-file-import" />
                            <h4 class="font-semibold text-md">{{ $t('datasetImportLabel') }}</h4>
                        </div>
                        <textarea class="textarea textarea-bordered textarea-md h-64" v-model="activeDatasetInput"
                            :placeholder="$t('datasetImportPlaceholder')"></textarea>
                        <div class="flex flex-wrap items-center gap-3">
                            <button class="btn btn-info btn-sm" @click="selectDatasetFile">
                                <font-awesome-icon icon="fa-solid fa-file-arrow-up" class="mr-1" />
                                {{ $t('selectDatasetFile') }}
                            </button>
                            <button class="btn btn-primary btn-sm" :disabled="activeDatasetImporting"
                                @click="handleDatasetImport('append')">
                                <span v-if="activeDatasetImporting"
                                    class="loading loading-spinner loading-sm mr-2"></span>
                                {{ $t('appendImport') }}
                            </button>
                            <button class="btn btn-secondary btn-sm" :disabled="activeDatasetImporting"
                                @click="handleDatasetImport('replace')">
                                <span v-if="activeDatasetImporting"
                                    class="loading loading-spinner loading-sm mr-2"></span>
                                {{ $t('replaceImport') }}
                            </button>
                            <button class="btn btn-outline btn-error btn-sm"
                                :disabled="!activeDatasetConfig.id || activeDatasetLoading" @click="clearActiveDataset">
                                {{ $t('clearDataset') }}
                            </button>
                        </div>
                        <span class="text-xs text-base-content/60">{{ $t('datasetImportHint') }}</span>
                        <div v-if="activeDatasetSummary" class="alert alert-info mt-2 text-xs sm:text-sm">
                            <font-awesome-icon icon="fa-solid fa-clipboard-check" class="mr-2" />
                            <div class="flex flex-wrap gap-2">
                                <span>{{ $t('datasetInserted', { count: activeDatasetSummary.inserted }) }}</span>
                                <span>{{ $t('datasetDuplicates', { count: activeDatasetSummary.duplicates })
                                    }}</span>
                                <span>{{ $t('datasetSkipped', { count: activeDatasetSummary.skipped_empty })
                                    }}</span>
                                <span>{{ $t('datasetRemoved', { count: activeDatasetSummary.removed }) }}</span>
                                <span>{{ $t('datasetTruncated', { count: activeDatasetSummary.truncated }) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="border border-base-200 rounded-lg bg-base-50 p-4 flex flex-col gap-4">
                        <div class="flex flex-col gap-3">
                            <label class="font-semibold text-sm flex items-center gap-2">
                                <font-awesome-icon icon="fa-solid fa-chart-column" />
                                {{ $t('datasetSelectLabel') }}
                            </label>
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4">
                                <div class="flex items-center gap-2 min-w-[200px] sm:flex-1 sm:min-w-60">
                                    <select class="select select-bordered select-sm w-full"
                                        :value="String(activeDatasetConfig.id || '')" @change="handleDatasetSelect"
                                        :disabled="datasetOptionsLoading[activeDatasetKey]">
                                        <option value="">{{ $t('datasetSelectPlaceholder') }}</option>
                                        <option v-for="option in activeDatasetOptions" :key="option.id"
                                            :value="String(option.id)">
                                            {{ formatDatasetOptionLabel(option) }}
                                        </option>
                                    </select>
                                    <span v-if="datasetOptionsLoading[activeDatasetKey]"
                                        class="loading loading-spinner loading-xs"></span>
                                </div>
                                <div v-if="activeDatasetConfig.id"
                                    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 lg:flex-1">
                                    <input class="input input-bordered input-sm flex-1"
                                        :placeholder="$t('datasetLabelPlaceholder')" v-model="activeDatasetLabelDraft"
                                        :disabled="activeDatasetLoading" />
                                    <button class="btn btn-sm btn-outline" @click="saveActiveDatasetLabel"
                                        :disabled="activeDatasetLoading">
                                        {{ $t('save') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-if="activeDatasetLoading" class="flex items-center gap-2 text-md text-base-content/70">
                            <span class="loading loading-spinner loading-sm"></span>
                            <span>{{ $t('datasetLoading') }}</span>
                        </div>
                        <div v-if="!activeDatasetStats" class="alert alert-info py-3 flex items-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-circle-info" />
                            <span>{{ $t('datasetNotConfigured') }}</span>
                        </div>
                        <div class="border border-dashed border-base-200 rounded-lg  bg-base-100">
                            <h4 class="font-semibold text-md mb-3 flex items-center gap-2">
                                <font-awesome-icon icon="fa-solid fa-diagram-project" />
                                {{ $t('datasetStrategyTitle') }}
                            </h4>
                            <div class="flex flex-col gap-3">
                                <label
                                    class="cursor-pointer flex items-start gap-2 p-3 rounded-lg border border-base-300"
                                    :class="{ 'border-primary bg-primary/10': dataSourceStrategy === 'shared_pool' }">
                                    <input type="radio" class="radio radio-primary mt-1" value="shared_pool"
                                        :checked="dataSourceStrategy === 'shared_pool'"
                                        @change="changeActiveDatasetStrategy('shared_pool')">
                                    <div>
                                        <div class="font-semibold">{{ $t('datasetSharedPool') }}</div>
                                        <p class="text-sm text-base-content/70">{{ $t('datasetSharedPoolDesc') }}</p>
                                    </div>
                                </label>
                                <label
                                    class="cursor-pointer flex items-start gap-2 p-3 rounded-lg border border-base-300"
                                    :class="{ 'border-secondary bg-secondary/10': dataSourceStrategy === 'consume_once' }">
                                    <input type="radio" class="radio radio-secondary mt-1" value="consume_once"
                                        :checked="dataSourceStrategy === 'consume_once'"
                                        @change="changeActiveDatasetStrategy('consume_once')">
                                    <div>
                                        <div class="font-semibold">{{ $t('datasetConsumeOnce') }}</div>
                                        <p class="text-sm text-base-content/70">{{ $t('datasetConsumeOnceDesc') }}</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="border border-base-200 rounded-lg overflow-hidden">
                            <div
                                class="px-4 py-2 bg-base-200 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                <span class="font-semibold text-md flex items-center gap-2">
                                    <font-awesome-icon icon="fa-solid fa-list" />
                                    {{ $t('datasetPreviewTitle') }}
                                </span>
                                <div v-if="activeDatasetPagination.total"
                                    class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-base-content/70 lg:justify-end">

                                    <span class="hidden md:inline text-xs text-base-content/60 whitespace-nowrap"
                                        v-if="datasetPreviewRangeText()">
                                        {{ datasetPreviewRangeText() }}
                                    </span>
                                    <div class="flex items-center gap-1">
                                        <button class="btn btn-ghost btn-xs px-2"
                                            @click="changeActiveDatasetPage(activeDatasetPagination.currentPage - 1)"
                                            :disabled="activeDatasetPagination.currentPage <= 1">
                                            {{ $t('previous') }}
                                        </button>
                                        <span class="font-medium whitespace-nowrap">
                                            {{ activeDatasetPagination.currentPage }} / {{ activeDatasetPageCount }}
                                        </span>
                                        <button class="btn btn-ghost btn-xs px-2"
                                            @click="changeActiveDatasetPage(activeDatasetPagination.currentPage + 1)"
                                            :disabled="activeDatasetPagination.currentPage >= activeDatasetPageCount">
                                            {{ $t('next') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="activeDatasetConfig.id && activeDatasetEntries.length" class="overflow-x-auto">
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
                                            <tr v-for="(entry, idx) in activeDatasetEntries" :key="entry.id">
                                                <td>{{ formatDatasetRowIndex(idx) }}</td>
                                                <td class="break-all">{{ entry.value }}</td>
                                                <td class="text-sm text-base-content/70">
                                                    {{ formatLocalTime(entry.updated_at) }}
                                                </td>
                                                <td class="text-right">
                                                    <button class="btn btn-ghost btn-xs text-error"
                                                        @click="deleteDatasetEntry(entry)"
                                                        :disabled="activeDatasetLoading">
                                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div v-else class="p-4 text-sm text-base-content/70">
                                <span v-if="!activeDatasetConfig.id">{{ $t('datasetPreviewUnselected') }}</span>
                                <span v-else>{{ $t('datasetPreviewEmpty') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 模块2：用户相关操作 -->
    <template v-if="isUsernameSource">
        <div v-show="activeTab === 'user_actions'" class="card bg-base-100 border border-base-300 mb-4">
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
                                        v-model="accessMethod" />
                                    <span>{{ $t('searchUser') }}</span>
                                </label>
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="accessMethod" class="radio radio-primary" value="direct"
                                        v-model="accessMethod" />
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
                                v-model="features.followUsers" />
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
                                v-model="features.unfollowUsers" />
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
                                v-model="features.reportAccount" />
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
                            <input type="checkbox" class="toggle toggle-info toggle-md" v-model="features.sendDM" />
                        </div>

                        <div v-if="features.sendDM" class="space-y-3">
                            <div class="flex flex-row items-center gap-2 mb-3">
                                <label class="font-bold text-md">{{ $t('generateByChatGPT') }}:</label>
                                <input type="checkbox" class="toggle toggle-accent toggle-md"
                                    v-model="dmSettings.generate_by_chatgpt" />
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
                                                v-model="dmChatgptUrl" />
                                        </div>

                                        <div>
                                            <label class="label py-1">
                                                <span class="label-text text-md">{{ $t('apiKey') }}</span>
                                            </label>
                                            <div class="flex items-center gap-2">
                                                <input :type="dmApiKeyVisible ? 'text' : 'password'"
                                                    class="input input-md w-full" placeholder="sk-********"
                                                    v-model="dmChatgptApiKey" />
                                                <button type="button" class="btn btn-ghost btn-square btn-sm"
                                                    @click="dmApiKeyVisible = !dmApiKeyVisible"
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
                                                v-model="dmChatgptModel" />
                                        </div>

                                        <div>
                                            <label class="label py-1">
                                                <span class="label-text text-md">{{ $t('systemPrompt') }}</span>
                                            </label>
                                            <textarea class="textarea textarea-md h-12"
                                                :placeholder="$t('systemPromptTips')"
                                                v-model="dmChatgptSystemPrompt"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2">
                                    <button class="btn btn-md btn-primary" @click="testChatGPT('dm')">{{
                                        $t('testChatGPT') }}</button>
                                    <span :class="testResultStyle" class="text-md">{{ testResult }}</span>
                                </div>
                            </div>

                            <div v-else class="space-y-3">
                                <div class="form-control">
                                    <label class="label py-1">
                                        <span class="label-text text-md">{{ $t('messageContents') }}</span>
                                    </label>
                                    <textarea class="textarea textarea-md textarea-bordered h-16"
                                        v-model="dmSettings.message_contents"
                                        :placeholder="$t('messageContentsTips')"></textarea>
                                </div>

                                <div class="flex gap-4">
                                    <label class="cursor-pointer flex items-center gap-2">
                                        <input type="radio" name="dmMessageOrder" value="random"
                                            class="radio radio-md radio-primary" v-model="dmSettings.message_order" />
                                        <span class="text-md">{{ $t('random') }}</span>
                                    </label>
                                    <label class="cursor-pointer flex items-center gap-2">
                                        <input type="radio" name="dmMessageOrder" value="sequential"
                                            class="radio radio-md radio-primary" v-model="dmSettings.message_order" />
                                        <span class="text-md">{{ $t('sequential') }}</span>
                                    </label>
                                </div>

                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="checkbox" class="checkbox checkbox-md checkbox-accent"
                                        v-model="dmSettings.insert_emoji" />
                                    <span class="text-md">{{ $t('insertEmoji') }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <!-- 模块3：帖子相关操作 -->
    <div v-show="activeTab === 'post_actions'" class="card bg-base-100 border border-base-300 mb-4">
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
                            v-model.number="postSettings.max_posts_count" min="1" max="50" />
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
                            v-model.number="postSettings.repeat_times" min="1" max="20" />
                        <span class="text-md">{{ $t('times') }}</span>
                        <div class="alert alert-info py-2 px-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="stroke-current shrink-0 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-md">{{ helpRepeatTimes() }}</span>
                        </div>
                    </div>


                </div>
                <!-- 观看时长 -->
                <div class="flex w-full items-center gap-2 mt-8 mb-8">
                    <label class="font-bold mr-4">{{ $t('viewDuration') }}:</label>
                    <VueSlider v-model="postSettings.view_durations" :width="500" :min="0" :max="300"
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

                <!-- 帖子互动操作 -->
                <div :class="[
                    'border border-base-200 rounded-lg p-3 transition-all',
                    features.boostPosts ? 'bg-error/10 border-error shadow' : 'bg-base-50'
                ]">
                    <div class="flex items-center mb-4">
                        <input type="checkbox" class="checkbox checkbox-primary mr-3" v-model="features.boostPosts" />
                        <font-awesome-icon icon="fa-solid fa-heart" class="text-error mr-2" />
                        <span class="font-semibold text-lg">{{ $t('postInteractionAction') }}</span>
                    </div>

                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    v-model="postSettings.enable_like"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('like') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    v-model="postSettings.enable_favorite"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('favorite') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    v-model="postSettings.enable_repost"
                                    :disabled="!features.boostPosts" />
                                <span class="text-md">{{ $t('repost') }}</span>
                            </label>
                            <label class="cursor-pointer flex items-center gap-2"
                                :class="{ 'opacity-50 cursor-not-allowed': !features.boostPosts }">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-primary"
                                    v-model="postSettings.enable_share"
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
                        <input type="checkbox" class="checkbox checkbox-primary mr-3" v-model="features.massComment" />
                        <font-awesome-icon icon="fa-solid fa-comment" class="text-warning mr-2" />
                        <span class="font-semibold text-lg">{{ $t('commentAction') }}</span>
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-row items-center gap-2 mb-3">
                            <label class="font-bold text-md">{{ $t('generateByChatGPT') }}:</label>
                            <input type="checkbox" class="toggle toggle-accent toggle-md"
                                v-model="commentSettings.generate_by_chatgpt" />
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
                                            v-model="commentSettings.chatgpt_settings.url" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('apiKey') }}</span>
                                        </label>
                                        <div class="flex items-center gap-2">
                                            <input :type="commentApiKeyVisible ? 'text' : 'password'"
                                                class="input input-md w-full" placeholder="sk-********"
                                                v-model="commentSettings.chatgpt_settings.api_key" />
                                            <button type="button" class="btn btn-ghost btn-square btn-sm"
                                                @click="commentApiKeyVisible = !commentApiKeyVisible"
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
                                            v-model="commentSettings.chatgpt_settings.model" />
                                    </div>

                                    <div>
                                        <label class="label py-1">
                                            <span class="label-text text-md">{{ $t('systemPrompt') }}</span>
                                        </label>
                                        <textarea class="textarea textarea-md h-12"
                                            :placeholder="$t('systemPromptTips')"
                                            v-model="commentSettings.chatgpt_settings.system_prompt"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <button class="btn btn-md btn-primary" @click="testChatGPT">{{ $t('testChatGPT')
                                    }}</button>
                                <span :class="testResultStyle" class="text-md">{{ testResult }}</span>
                            </div>
                        </div>

                        <div v-else class="space-y-3">
                            <div class="form-control">
                                <label class="label py-1">
                                    <span class="label-text text-md">{{ $t('comments') }}</span>
                                </label>
                                <textarea class="textarea textarea-md textarea-bordered h-16"
                                    v-model="commentSettings.comment_content"
                                    :placeholder="$t('commentContentTips')"></textarea>
                            </div>

                            <div class="flex gap-4">
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="commentOrder" value="random"
                                        class="radio radio-md radio-primary" v-model="commentSettings.comment_order" />
                                    <span class="text-md">{{ $t('random') }}</span>
                                </label>
                                <label class="cursor-pointer flex items-center gap-2">
                                    <input type="radio" name="commentOrder" value="sequential"
                                        class="radio radio-md radio-primary" v-model="commentSettings.comment_order" />
                                    <span class="text-md">{{ $t('sequential') }}</span>
                                </label>
                            </div>

                            <label class="cursor-pointer flex items-center gap-2">
                                <input type="checkbox" class="checkbox checkbox-md checkbox-accent"
                                    v-model="commentSettings.insert_emoji" />
                                <span class="text-md">{{ $t('insertEmoji') }}</span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- 模块4：任务设置 -->
    <div v-show="activeTab === 'task_interval'" class="card bg-base-100 border border-base-300">
        <div class="card-body p-4 space-y-6">
            <div class="space-y-2">
                <h3 class="card-title text-lg text-primary">
                    <font-awesome-icon icon="fa-solid fa-clock" class="mr-2" />
                    {{ $t('taskSettings') }}
                </h3>
                <p class="text-sm text-base-content/70">
                    {{ $t('taskSettingsTip') }}
                </p>
            </div>

            <div class="space-y-6">
                <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-3">
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div class="space-y-2">
                            <div class="font-semibold text-md flex items-center gap-2">
                                <font-awesome-icon icon="fa-solid fa-diagram-project" class="text-primary" />
                                <span>{{ $t('mergeSameUsernameTasks') }}</span>
                            </div>
                            <p class="text-sm text-base-content/70 leading-relaxed">
                                {{ $t('mergeSameUsernameTasksOnDesc') }}
                            </p>
                            <p class="text-sm text-base-content/70 leading-relaxed">
                                {{ $t('mergeSameUsernameTasksOffDesc') }}
                            </p>
                        </div>
                        <input type="checkbox" class="toggle toggle-primary toggle-lg self-start"
                            v-model="merge_same_username_tasks" />
                    </div>
                    <div class="alert alert-info text-xs sm:text-sm">
                        <font-awesome-icon icon="fa-solid fa-circle-info" class="mr-2" />
                        <span>{{ $t('mergeSameUsernameTasksInfo') }}</span>
                    </div>
                </div>

                <div class="border border-base-200 rounded-lg p-4 bg-base-50 space-y-4">
                    <div class="flex items-center gap-2">
                        <font-awesome-icon icon="fa-solid fa-clock" class="text-primary" />
                        <span class="font-semibold text-md">{{ $t('taskInterval') }}</span>
                    </div>
                    <p class="text-sm text-base-content/70">
                        {{ $t('taskIntervalTip') }}
                    </p>
                    <div class="flex flex-col gap-4">
                        <VueSlider v-model="task_interval" :width="500" :min="0" :max="10" :marks="{
                            0: '0',
                            5: '5',
                            10: `10 ${$t('minute')}`
                        }" />
                        <div class="text-sm text-base-content/70">
                            {{ $t('taskInterval') }}: {{ task_interval[0] }} - {{ task_interval[1] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { superMarketingSettings } from '@/utils/settingsManager';
import VueSlider from "vue-3-slider-component";

const DATASET_KEYS = ['usernames', 'post_links'];
const DEFAULT_DATASET_PAGE_SIZE = 50;
const DATASET_PAGE_SIZE_OPTIONS = [20, 50, 100, 200];

const createDefaultPaginationState = () => ({
    currentPage: 1,
    pageSize: DEFAULT_DATASET_PAGE_SIZE,
    total: 0
});

const createInitialPaginationState = () =>
    DATASET_KEYS.reduce((acc, key) => {
        acc[key] = createDefaultPaginationState();
        return acc;
    }, {});

const DEFAULT_DATASET_CONFIG = () => ({
    usernames: { id: 0, strategy: 'shared_pool', label: '' },
    post_links: { id: 0, strategy: 'shared_pool', label: '' }
});

function cloneDefaultDatasetConfig() {
    return JSON.parse(JSON.stringify(DEFAULT_DATASET_CONFIG()));
}

export default {
    name: 'SuperMarketingDialog',
    components: {
        VueSlider
    },
    mixins: [
        superMarketingSettings.createVueMixin(
            {
                dataSourceType: 'usernames',
                dataSourceStrategy: 'shared_pool',
                datasetId: 0,
                datasetConfig: cloneDefaultDatasetConfig(),
                accessMethod: 'search',
                features: {
                    followUsers: false,
                    unfollowUsers: false,
                    reportAccount: false,
                    sendDM: false,
                    boostPosts: false,
                    massComment: false
                },
                followSettings: {
                    boost_type: 'follow'
                },
                dmSettings: {
                    message_contents: '',
                    message_order: 'random',
                    insert_emoji: false,
                    generate_by_chatgpt: false,
                    chatgpt_prompt: '',
                    chatgpt_settings: {
                        url: 'https://api.openai.com/v1/chat/completions',
                        api_key: '',
                        model: 'gpt-4o-mini',
                        system_prompt: 'Craft a friendly, concise Instagram direct message that encourages engagement. Keep it under 200 characters and include a clear call-to-action.'
                    }
                },
                merge_same_username_tasks: false,
                postSettings: {
                    max_posts_count: 1,
                    enable_like: false,
                    enable_favorite: false,
                    enable_repost: false,
                    enable_share: false,
                    repeat_times: 1,
                    view_durations: [5, 30]
                },
                commentSettings: {
                    comment_content: '',
                    insert_emoji: false,
                    comment_order: 'random',
                    generate_by_chatgpt: false,
                    chatgpt_settings: {
                        url: 'https://api.openai.com/v1/chat/completions',
                        api_key: '',
                        model: 'gpt-4o-mini',
                        system_prompt: 'Generate a casual, relevant comment for this TikTok post. Keep it under 50 characters, use emojis, and make it sound natural and engaging.'
                    }
                },
                task_interval: [0, 0]
            },
            [
                'dataSourceType',
                'dataSourceStrategy',
                'datasetId',
                'datasetConfig',
                'accessMethod',
                'features',
                'followSettings',
                'dmSettings',
                'merge_same_username_tasks',
                'postSettings',
                'commentSettings',
                'task_interval'
            ]
        )
    ],
    data() {
        return {
            dataSourceType: 'usernames',
            dataSourceStrategy: 'shared_pool',
            datasetId: 0,
            datasetConfig: cloneDefaultDatasetConfig(),
            datasetStats: {
                usernames: null,
                post_links: null
            },
            datasetEntries: {
                usernames: [],
                post_links: []
            },
            datasetInputs: {
                usernames: '',
                post_links: ''
            },
            datasetSummaries: {
                usernames: null,
                post_links: null
            },
            datasetOptions: {
                usernames: [],
                post_links: []
            },
            datasetOptionsLoading: {
                usernames: false,
                post_links: false
            },
            datasetLabelDrafts: {
                usernames: '',
                post_links: ''
            },
            datasetLoading: {
                usernames: false,
                post_links: false
            },
            datasetImporting: {
                usernames: false,
                post_links: false
            },
            datasetPagination: createInitialPaginationState(),
            datasetPageSizeOptions: DATASET_PAGE_SIZE_OPTIONS,
            testResult: '',
            testResultStyle: 'text-gray-500',
            features: {
                followUsers: false,
                unfollowUsers: false,
                sendDM: false,
                boostPosts: false,
                massComment: false
            },
            followSettings: {
                boost_type: 'follow'
            },
            dmSettings: {
                message_contents: '',
                message_order: 'random',
                insert_emoji: false,
                generate_by_chatgpt: false,
                chatgpt_prompt: '',
                chatgpt_settings: {
                    url: 'https://api.openai.com/v1/chat/completions',
                    api_key: '',
                    model: 'gpt-4o-mini',
                    system_prompt: 'Craft a friendly, concise Instagram direct message that encourages engagement. Keep it under 200 characters and include a clear call-to-action.'
                }
            },
            // 控制 API Key 明文显示
            dmApiKeyVisible: false,
            postSettings: {
                max_posts_count: 1,
                enable_like: false,
                enable_favorite: false,
                enable_repost: false,
                enable_share: false,
                repeat_times: 1,
                view_durations: [5, 30]
            },
            commentSettings: {
                comment_content: '',
                insert_emoji: false,
                comment_order: 'random',
                generate_by_chatgpt: false,
                chatgpt_settings: {
                    url: 'https://api.openai.com/v1/chat/completions',
                    api_key: '',
                    model: 'gpt-4o-mini',
                    system_prompt: 'Generate a casual, relevant comment for this TikTok post. Keep it under 50 characters, use emojis, and make it sound natural and engaging.'
                }
            },
            // 控制评论 API Key 明文显示
            commentApiKeyVisible: false,
            accessMethod: 'search',
            merge_same_username_tasks: false,
            task_interval: [0, 0],
            activeTab: 'data_source'
        };
    },
    async mounted() {
        await this.ensureSettingsLoaded();
        this.ensureDatasetConfig();


        if (this.dataSourceType === 'post_links') {
            this.features.followUsers = false;
            this.features.unfollowUsers = false;
            this.features.sendDM = false;
        }

        if (typeof this.features.unfollowUsers === 'undefined') {
            this.features.unfollowUsers = false;
        }

        await this.validateComplexSettingsStructure();
        await this.initializeDatasets();
        this.ensureActiveTab();
    },
    computed: {
        isUsernameSource() {
            return this.dataSourceType === 'usernames';
        },
        isPostLinkSource() {
            return this.dataSourceType === 'post_links';
        },
        // availableTabs moved to methods to avoid calling composables (like i18n) inside computed getters
        activeDatasetKey() {
            return this.isUsernameSource ? 'usernames' : 'post_links';
        },
        activeDatasetConfig() {
            return this.datasetConfig[this.activeDatasetKey] || {
                id: 0,
                strategy: 'shared_pool',
                label: ''
            };
        },
        activeDatasetStats() {
            return this.datasetStats[this.activeDatasetKey];
        },
        activeDatasetEntries() {
            return this.datasetEntries[this.activeDatasetKey] || [];
        },
        activeDatasetInput: {
            get() {
                return this.datasetInputs[this.activeDatasetKey] || '';
            },
            set(value) {
                this.datasetInputs[this.activeDatasetKey] = value;
            }
        },
        activeDatasetSummary() {
            return this.datasetSummaries[this.activeDatasetKey];
        },
        activeDatasetImporting() {
            return this.datasetImporting[this.activeDatasetKey];
        },
        activeDatasetLoading() {
            return this.datasetLoading[this.activeDatasetKey];
        },
        activeDatasetPagination() {
            return this.datasetPagination[this.activeDatasetKey] || createDefaultPaginationState();
        },
        activeDatasetOptions() {
            return this.datasetOptions[this.activeDatasetKey] || [];
        },
        activeDatasetLabelDraft: {
            get() {
                const value = this.datasetLabelDrafts[this.activeDatasetKey];
                return typeof value === 'string' ? value : '';
            },
            set(value) {
                this.datasetLabelDrafts[this.activeDatasetKey] = value;
            }
        },
        activeDatasetPageCount() {
            const { total, pageSize } = this.activeDatasetPagination;
            if (!total || !pageSize) {
                return 1;
            }
            return Math.max(1, Math.ceil(total / pageSize));
        },
        activeDatasetPageRange() {
            const { total, pageSize, currentPage } = this.activeDatasetPagination;
            if (!total || !pageSize) {
                return { start: 0, end: 0 };
            }
            const start = (currentPage - 1) * pageSize + 1;
            const end = Math.min(currentPage * pageSize, total);
            return { start, end };
        },
        // NOTE: moved dataset preview helpers to methods to avoid calling composables/getCurrentInstance
        // from inside computed getters which can trigger Vue warning in some plugin/composable usage.

        // Safe accessors for DM ChatGPT nested settings to avoid render errors when
        // the persisted settings object doesn't include `chatgpt_settings` yet.
        dmChatgptUrl: {
            get() {
                return (this.dmSettings && this.dmSettings.chatgpt_settings && this.dmSettings.chatgpt_settings.url) || 'https://api.openai.com/v1/chat/completions';
            },
            set(value) {
                if (!this.dmSettings) this.dmSettings = {};
                if (!this.dmSettings.chatgpt_settings) this.dmSettings.chatgpt_settings = {};
                this.dmSettings.chatgpt_settings.url = value;
            }
        },
        dmChatgptApiKey: {
            get() {
                return (this.dmSettings && this.dmSettings.chatgpt_settings && this.dmSettings.chatgpt_settings.api_key) || '';
            },
            set(value) {
                if (!this.dmSettings) this.dmSettings = {};
                if (!this.dmSettings.chatgpt_settings) this.dmSettings.chatgpt_settings = {};
                this.dmSettings.chatgpt_settings.api_key = value;
            }
        },
        dmChatgptModel: {
            get() {
                return (this.dmSettings && this.dmSettings.chatgpt_settings && this.dmSettings.chatgpt_settings.model) || 'gpt-4o-mini';
            },
            set(value) {
                if (!this.dmSettings) this.dmSettings = {};
                if (!this.dmSettings.chatgpt_settings) this.dmSettings.chatgpt_settings = {};
                this.dmSettings.chatgpt_settings.model = value;
            }
        },
        dmChatgptSystemPrompt: {
            get() {
                return (this.dmSettings && this.dmSettings.chatgpt_settings && this.dmSettings.chatgpt_settings.system_prompt) || 'Craft a friendly, concise Instagram direct message that encourages engagement. Keep it under 200 characters and include a clear call-to-action.';
            },
            set(value) {
                if (!this.dmSettings) this.dmSettings = {};
                if (!this.dmSettings.chatgpt_settings) this.dmSettings.chatgpt_settings = {};
                this.dmSettings.chatgpt_settings.system_prompt = value;
            }
        }

    },
    watch: {
        async dataSourceType(newValue) {
            if (newValue === 'post_links') {
                if (this.features.followUsers) this.features.followUsers = false;
                if (this.features.unfollowUsers) this.features.unfollowUsers = false;
                if (this.features.sendDM) this.features.sendDM = false;
            }
            this.syncActiveDatasetState();
            this.ensureActiveTab();
            await this.refreshDatasetOptions(this.activeDatasetKey, { silent: true });
        },

    },
    methods: {
        setActiveTab(key) {
            if (this.activeTab === key) {
                return;
            }
            const target = this.availableTabs().find((tab) => tab.key === key);
            if (target) {
                this.activeTab = key;
            }
        },
        ensureActiveTab() {
            const current = this.availableTabs().find((tab) => tab.key === this.activeTab);
            const tabs = this.availableTabs();
            if (!current && tabs.length) {
                this.activeTab = tabs[0].key;
            }
        },
        availableTabs() {
            const tabs = [
                {
                    key: 'data_source',
                    label: this.$t('dataSourceLabel'),
                    icon: 'fa-solid fa-database'
                }
            ];
            if (this.isUsernameSource) {
                tabs.push({
                    key: 'user_actions',
                    label: this.$t('userRelatedActions'),
                    icon: 'fa-solid fa-users'
                });
            }
            tabs.push({
                key: 'post_actions',
                label: this.$t('postRelatedActions'),
                icon: 'fa-solid fa-photo-film'
            });
            tabs.push({
                key: 'task_interval',
                label: this.$t('taskSettings'),
                icon: 'fa-solid fa-clock'
            });
            return tabs;
        },
        // moved from computed to avoid composable/getCurrentInstance usage inside computed getters
        datasetPreviewSummaryText() {
            const { total, currentPage } = this.activeDatasetPagination;
            if (!total) {
                return '';
            }
            return this.$t('datasetPreviewHint', {
                page: currentPage,
                pages: this.activeDatasetPageCount,
                total
            });
        },
        datasetPreviewRangeText() {
            const { total } = this.activeDatasetPagination;
            if (!total) {
                return '';
            }
            const { start, end } = this.activeDatasetPageRange;
            return this.$t('datasetPreviewRange', { start, end, total });
        },
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
        async refreshDatasetOptions(key, { silent = false } = {}) {
            if (!silent) {
                this.datasetOptionsLoading[key] = true;
            }
            try {
                const response = await this.$service.list_super_marketing_datasets({ data_type: key });
                if (response.code === 0 && Array.isArray(response.data)) {
                    const normalized = response.data.map((item) => ({
                        id: Number(item.id) || 0,
                        data_type: item.data_type,
                        label: typeof item.label === 'string' ? item.label : '',
                        total: Number(item.total) || 0,
                        consumed: Number(item.consumed) || 0,
                        remaining: Number(item.remaining) || 0,
                        updated_at: item.updated_at || null
                    }));
                    this.datasetOptions[key] = normalized;
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to load dataset options', error);
                if (!silent) {
                    this.notify('error', this.$t('datasetOptionsLoadFailed'));
                }
            } finally {
                if (!silent) {
                    this.datasetOptionsLoading[key] = false;
                }
            }
        },
        async handleDatasetSelect(event) {
            const key = this.activeDatasetKey;
            const value = Number(event?.target?.value || 0);
            const option = this.activeDatasetOptions.find((item) => Number(item.id) === value);
            this.setDatasetConfig(key, {
                id: value,
                label: option ? option.label || '' : ''
            });
            await this.saveComponentSettings();
            if (value > 0) {
                await this.refreshDataset(key, { page: 1 });
            } else {
                this.datasetStats[key] = null;
                this.datasetEntries[key] = [];
                this.datasetSummaries[key] = null;
                this.updateDatasetPagination(key, { total: 0, currentPage: 1 });
            }
        },
        async saveActiveDatasetLabel() {
            const datasetId = this.activeDatasetConfig.id;
            if (!datasetId) {
                this.notify('warning', this.$t('selectDatasetRequired'));
                return;
            }
            const label = (this.activeDatasetLabelDraft || '').trim();
            try {
                const pagination = this.getDatasetPagination(this.activeDatasetKey);
                const response = await this.$service.update_super_marketing_dataset({
                    dataset_id: datasetId,
                    label
                });
                if (response.code === 0) {
                    await this.refreshDataset(this.activeDatasetKey, {
                        page: pagination.currentPage,
                        pageSize: pagination.pageSize
                    });
                    await this.refreshDatasetOptions(this.activeDatasetKey, { silent: true });
                    await this.saveComponentSettings();
                    this.notify('success', this.$t('datasetLabelUpdateSuccess'));
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to update dataset label', error);
                this.notify('error', `${this.$t('datasetLabelUpdateFailed')}: ${error.message || error}`);
            }
        },
        getActiveDatasetPaginationParams() {
            const pagination = this.getDatasetPagination(this.activeDatasetKey);
            const limit = Number(pagination.pageSize) > 0 ? Number(pagination.pageSize) : DEFAULT_DATASET_PAGE_SIZE;
            const currentPage = Number(pagination.currentPage) > 0 ? Number(pagination.currentPage) : 1;
            const offset = (currentPage - 1) * limit;
            return { limit, offset, currentPage };
        },
        async deleteDatasetEntry(entry) {
            const datasetId = this.activeDatasetConfig.id;
            if (!datasetId || !entry || !entry.id) {
                return;
            }

            try {
                const { limit, offset, currentPage } = this.getActiveDatasetPaginationParams();
                const response = await this.$service.delete_super_marketing_dataset_entry({
                    dataset_id: datasetId,
                    entry_id: entry.id,
                    limit,
                    offset
                });
                if (response.code === 0) {
                    const { stats, entries } = response.data;
                    this.applyDatasetDetail(this.activeDatasetKey, stats, entries || [], {
                        page: currentPage,
                        pageSize: limit,
                        total: stats?.total
                    });
                    await this.refreshDatasetOptions(this.activeDatasetKey, { silent: true });
                    this.notify('success', this.$t('datasetEntryDeleteSuccess'));
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to delete dataset entry', error);
                this.notify('error', `${this.$t('datasetEntryDeleteFailed')}: ${error.message || error}`);
            }
        },
        getDatasetPagination(key) {
            if (!this.datasetPagination[key]) {
                this.datasetPagination = {
                    ...this.datasetPagination,
                    [key]: createDefaultPaginationState()
                };
            }
            return this.datasetPagination[key];
        },
        updateDatasetPagination(key, updates = {}) {
            const current = this.getDatasetPagination(key);
            this.datasetPagination = {
                ...this.datasetPagination,
                [key]: {
                    ...current,
                    ...updates
                }
            };
        },
        async changeActiveDatasetPage(page) {
            const key = this.activeDatasetKey;
            const pagination = this.getDatasetPagination(key);
            const totalPages = pagination.total && pagination.pageSize
                ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
                : 1;
            const targetPage = Math.min(Math.max(1, page), totalPages);
            if (targetPage === pagination.currentPage) {
                return;
            }
            await this.refreshDataset(key, { page: targetPage, pageSize: pagination.pageSize });
        },
        async changeActiveDatasetPageSize(size) {
            const pageSize = Number(size);
            if (!Number.isFinite(pageSize) || pageSize <= 0) {
                return;
            }
            const key = this.activeDatasetKey;
            const pagination = this.getDatasetPagination(key);
            if (pagination.pageSize === pageSize) {
                return;
            }
            await this.refreshDataset(key, { page: 1, pageSize });
        },
        onDatasetPageSizeChange(event) {
            this.changeActiveDatasetPageSize(event.target.value);
        },
        ensureDatasetConfig() {
            if (!this.datasetConfig || typeof this.datasetConfig !== 'object') {
                this.datasetConfig = cloneDefaultDatasetConfig();
            }
            DATASET_KEYS.forEach((key) => {
                let current = this.datasetConfig[key];
                if (!current || typeof current !== 'object') {
                    current = { id: 0, strategy: 'shared_pool', label: '' };
                } else {
                    if (typeof current.id === 'string') {
                        current.id = Number(current.id) || 0;
                    }
                    if (!['shared_pool', 'consume_once'].includes(current.strategy)) {
                        current.strategy = 'shared_pool';
                    }
                    if (typeof current.label !== 'string') {
                        current.label = '';
                    }
                }
                this.datasetConfig[key] = {
                    id: Number(current.id) || 0,
                    strategy: current.strategy,
                    label: typeof current.label === 'string' ? current.label : ''
                };
            });
        },
        normalizeStrategy(strategy) {
            return ['shared_pool', 'consume_once'].includes(strategy) ? strategy : 'shared_pool';
        },
        getDatasetKeyConfig(key) {
            const config = this.datasetConfig[key];
            if (!config || typeof config !== 'object') {
                return { id: 0, strategy: 'shared_pool', label: '' };
            }
            return config;
        },
        setDatasetConfig(key, updates) {
            const current = { ...this.getDatasetKeyConfig(key) };
            if (updates.id !== undefined) {
                current.id = Number(updates.id) || 0;
            }
            if (updates.strategy !== undefined) {
                current.strategy = this.normalizeStrategy(updates.strategy);
            }
            if (updates.label !== undefined) {
                current.label = typeof updates.label === 'string' ? updates.label : '';
            }
            this.datasetConfig[key] = current;
            this.datasetLabelDrafts[key] = current.label || '';
            if (this.activeDatasetKey === key) {
                this.datasetId = current.id || 0;
                this.dataSourceStrategy = current.strategy;
            }
        },
        syncActiveDatasetState() {
            this.ensureDatasetConfig();
            const config = this.getDatasetKeyConfig(this.activeDatasetKey);
            this.datasetId = Number(config.id) || 0;
            this.dataSourceStrategy = this.normalizeStrategy(config.strategy);
            this.datasetLabelDrafts[this.activeDatasetKey] = typeof config.label === 'string' ? config.label : '';
        },
        async initializeDatasets() {
            this.syncActiveDatasetState();
            await Promise.all(
                DATASET_KEYS.map(async (key) => {
                    await this.refreshDatasetOptions(key, { silent: true });
                    await this.refreshDataset(key, { silent: true });
                })
            );
        },
        async refreshDataset(key, { silent = false, page, pageSize } = {}) {
            const config = this.getDatasetKeyConfig(key);
            if (!config.id) {
                this.datasetStats[key] = null;
                this.datasetEntries[key] = [];
                this.updateDatasetPagination(key, { total: 0, currentPage: 1 });
                this.datasetLabelDrafts[key] = '';
                return;
            }

            const pagination = this.getDatasetPagination(key);
            const effectivePageSize = Number(pageSize) > 0 ? Number(pageSize) : pagination.pageSize || DEFAULT_DATASET_PAGE_SIZE;
            const requestedPage = Number(page) > 0 ? Number(page) : pagination.currentPage || 1;
            const offset = (requestedPage - 1) * effectivePageSize;

            if (!silent) {
                this.datasetLoading[key] = true;
            }
            try {
                const response = await this.$service.get_super_marketing_dataset({
                    dataset_id: config.id,
                    limit: effectivePageSize,
                    offset
                });
                if (response.code === 0) {
                    const { stats, entries } = response.data;
                    const entriesList = Array.isArray(entries) ? entries : [];
                    const total = stats && typeof stats.total === 'number' ? stats.total : pagination.total;

                    if (entriesList.length === 0 && total > 0 && requestedPage > 1) {
                        const lastPage = Math.max(1, Math.ceil(total / effectivePageSize));
                        if (lastPage !== requestedPage) {
                            await this.refreshDataset(key, { silent, page: lastPage, pageSize: effectivePageSize });
                            return;
                        }
                    }

                    this.applyDatasetDetail(key, stats, entriesList, {
                        page: requestedPage,
                        pageSize: effectivePageSize,
                        total: typeof total === 'number' ? total : entriesList.length
                    });
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to load dataset', error);
                this.notify('error', this.$t('datasetLoadFailed'));
            } finally {
                if (!silent) {
                    this.datasetLoading[key] = false;
                }
            }
        },
        applyDatasetDetail(key, stats, entries = [], pagination = {}) {
            if (!stats) {
                return;
            }
            const normalizedStrategy = this.normalizeStrategy(stats.strategy);
            const updates = {
                id: stats.id,
                strategy: normalizedStrategy,
                label: typeof stats.label === 'string' ? stats.label : ''
            };
            this.setDatasetConfig(key, updates);
            this.datasetStats[key] = {
                ...stats,
                strategy: normalizedStrategy,
                label: updates.label
            };
            this.datasetEntries[key] = entries;
            const currentPagination = this.getDatasetPagination(key);
            const pageSize = Number(pagination.pageSize) > 0 ? Number(pagination.pageSize) : currentPagination.pageSize;
            const total = typeof pagination.total === 'number'
                ? pagination.total
                : (typeof stats.total === 'number' ? stats.total : currentPagination.total);
            const requestedPage = Number(pagination.page) > 0 ? Number(pagination.page) : currentPagination.currentPage;
            const pageCount = pageSize > 0 && total > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
            const currentPage = Math.min(Math.max(1, requestedPage || 1), pageCount);
            this.updateDatasetPagination(key, {
                pageSize,
                total,
                currentPage
            });
            if (this.activeDatasetKey === key) {
                this.datasetId = Number(stats.id) || 0;
                this.dataSourceStrategy = normalizedStrategy;
            }
            const options = this.datasetOptions[key] || [];
            const optionPayload = {
                id: Number(stats.id) || 0,
                data_type: stats.data_type,
                label: updates.label,
                total: Number(stats.total) || 0,
                consumed: Number(stats.consumed) || 0,
                remaining: Number(stats.remaining) || 0,
                updated_at: stats.updated_at || null
            };
            const existingIndex = options.findIndex((item) => Number(item.id) === optionPayload.id);
            if (existingIndex >= 0) {
                const next = [...options];
                next.splice(existingIndex, 1, optionPayload);
                this.datasetOptions[key] = next;
            } else if (optionPayload.id > 0) {
                this.datasetOptions[key] = [...options, optionPayload];
            }
        },
        async handleDatasetImport(mode) {
            const key = this.activeDatasetKey;
            const config = this.getDatasetKeyConfig(key);
            const raw = (this.activeDatasetInput || '').trim();
            if (!raw) {
                this.notify('warning', this.$t('datasetImportEmpty'));
                return;
            }

            this.datasetImporting[key] = true;
            try {
                const response = await this.$service.import_super_marketing_dataset({
                    dataset_id: config.id > 0 ? config.id : null,
                    data_type: key,
                    strategy: this.dataSourceStrategy,
                    raw_text: raw,
                    mode,
                    label: this.activeDatasetLabelDraft
                });
                if (response.code === 0) {
                    const { dataset, summary } = response.data;
                    const currentPagination = this.getDatasetPagination(key);
                    this.applyDatasetDetail(key, dataset.stats, dataset.entries || [], {
                        page: 1,
                        pageSize: currentPagination.pageSize,
                        total: dataset?.stats?.total
                    });
                    this.datasetSummaries[key] = summary;
                    this.datasetInputs[key] = '';
                    await this.refreshDatasetOptions(key, { silent: true });
                    await this.saveComponentSettings();
                    this.notify('success', this.$t('datasetImportSuccess'));
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to import dataset', error);
                this.notify('error', `${this.$t('datasetImportFailed')}: ${error.message || error}`);
            } finally {
                this.datasetImporting[key] = false;
            }
        },
        async selectDatasetFile() {
            const filePath = await open({
                multiple: false,
                directory: false,
                filters: [{ name: 'Text Files', extensions: ['txt', 'csv'] }]
            });
            if (!filePath) return;
            try {
                const content = await readTextFile(filePath);
                this.activeDatasetInput = content;
                this.notify('success', this.$t('datasetFileLoaded'));
            } catch (error) {
                console.error('Failed to load dataset file', error);
                this.notify('error', this.$t('datasetFileLoadFailed'));
            }
        },
        async clearActiveDataset() {
            const key = this.activeDatasetKey;
            const config = this.getDatasetKeyConfig(key);
            if (!config.id) {
                this.datasetStats[key] = null;
                this.datasetEntries[key] = [];
                this.datasetSummaries[key] = null;
                this.updateDatasetPagination(key, { total: 0, currentPage: 1 });
                return;
            }
            this.datasetLoading[key] = true;
            try {
                const response = await this.$service.clear_super_marketing_dataset({ dataset_id: config.id });
                if (response.code === 0) {
                    const { stats, entries } = response.data;
                    const currentPagination = this.getDatasetPagination(key);
                    this.applyDatasetDetail(key, stats, entries || [], {
                        page: 1,
                        pageSize: currentPagination.pageSize,
                        total: stats?.total
                    });
                    this.datasetSummaries[key] = null;
                    await this.refreshDatasetOptions(key, { silent: true });
                    await this.saveComponentSettings();
                    this.notify('success', this.$t('datasetCleared'));
                } else {
                    throw new Error(response.error || response.data || 'Unknown error');
                }
            } catch (error) {
                console.error('Failed to clear dataset', error);
                this.notify('error', `${this.$t('datasetClearFailed')}: ${error.message || error}`);
            } finally {
                this.datasetLoading[key] = false;
            }
        },
        async changeActiveDatasetStrategy(strategy) {
            const normalized = this.normalizeStrategy(strategy);
            if (this.dataSourceStrategy === normalized) {
                return;
            }

            const key = this.activeDatasetKey;
            const previous = this.dataSourceStrategy;
            this.dataSourceStrategy = normalized;
            this.setDatasetConfig(key, { strategy: normalized });

            if (this.datasetId > 0) {
                try {
                    const pagination = this.getDatasetPagination(key);
                    const response = await this.$service.update_super_marketing_dataset({
                        dataset_id: this.datasetId,
                        strategy: normalized
                    });
                    if (response.code === 0) {
                        await this.refreshDataset(key, {
                            page: pagination.currentPage,
                            pageSize: pagination.pageSize
                        });
                        await this.refreshDatasetOptions(key, { silent: true });
                        await this.saveComponentSettings();
                        this.notify('success', this.$t('datasetStrategyUpdateSuccess'));
                    } else {
                        throw new Error(response.error || response.data || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Failed to update dataset strategy', error);
                    this.dataSourceStrategy = previous;
                    this.setDatasetConfig(key, { strategy: previous });
                    this.notify('error', `${this.$t('datasetStrategyUpdateFailed')}: ${error.message || error}`);
                }
            } else {
                await this.saveComponentSettings();
            }
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
        formatDatasetRowIndex(idx) {
            const { start } = this.activeDatasetPageRange;
            if (!start) {
                return idx + 1;
            }
            return start + idx;
        },
        helpRepeatTimes() {
            return this.isPostLinkSource ? this.$t('repeatTimesHelpPostLinks') : this.$t('repeatTimesHelp');
        },
        async validateComplexSettingsStructure() {
            let needsReset = false;

            if (typeof this.postSettings === 'string' || !this.postSettings) {
                needsReset = true;
            } else {
                if (typeof this.postSettings.enable_share === 'undefined') {
                    this.postSettings.enable_share = false;
                }
                if (!this.postSettings.repeat_times || this.postSettings.repeat_times < 1) {
                    this.postSettings.repeat_times = 1;
                }
            }

            if (typeof this.commentSettings === 'string' || !this.commentSettings) {
                needsReset = true;
            } else if (!this.commentSettings.chatgpt_settings) {
                this.commentSettings.chatgpt_settings = {
                    url: 'https://api.openai.com/v1/chat/completions',
                    api_key: '',
                    model: 'gpt-4o-mini',
                    system_prompt: 'Generate a casual, relevant comment for this TikTok post. Keep it under 50 characters, use emojis, and make it sound natural and engaging.'
                };
            }

            if (needsReset) {
                console.warn('检测到设置异常，尝试修复...');
                await this.resetSettingsFile();
                console.log('设置已重置并重新加载');
            }
        },
        async resetSettingsFile() {
            try {
                const defaultSettings = {
                    dataSourceType: 'usernames',
                    dataSourceStrategy: 'shared_pool',
                    datasetId: 0,
                    datasetConfig: cloneDefaultDatasetConfig(),
                    accessMethod: 'search',
                    features: {
                        followUsers: false,
                        unfollowUsers: false,
                        sendDM: false,
                        boostPosts: false,
                        massComment: false
                    },
                    followSettings: {
                        boost_type: 'follow'
                    },
                    dmSettings: {
                        message_contents: '',
                        message_order: 'random',
                        insert_emoji: false,
                        generate_by_chatgpt: false,
                        chatgpt_prompt: '',
                        chatgpt_settings: {
                            url: 'https://api.openai.com/v1/chat/completions',
                            api_key: '',
                            model: 'gpt-4o-mini',
                            system_prompt: 'Craft a friendly, concise Instagram direct message that encourages engagement. Keep it under 200 characters and include a clear call-to-action.'
                        }
                    },
                    postSettings: {
                        max_posts_count: 1,
                        enable_like: false,
                        enable_favorite: false,
                        enable_repost: false,
                        enable_share: false,
                        repeat_times: 1,
                        view_durations: [5, 30]
                    },
                    commentSettings: {
                        comment_content: '',
                        insert_emoji: false,
                        comment_order: 'random',
                        generate_by_chatgpt: false,
                        chatgpt_settings: {
                            url: 'https://api.openai.com/v1/chat/completions',
                            api_key: '',
                            model: 'gpt-4o-mini',
                            system_prompt: 'Generate a casual, relevant comment for this TikTok post. Keep it under 50 characters, use emojis, and make it sound natural and engaging.'
                        }
                    },
                    task_interval: [0, 0]
                };

                await superMarketingSettings.resetSettings(defaultSettings);
                await this.loadComponentSettings();
                this.datasetInputs = {
                    usernames: '',
                    post_links: ''
                };
                this.datasetSummaries = {
                    usernames: null,
                    post_links: null
                };
                this.datasetStats = {
                    usernames: null,
                    post_links: null
                };
                this.datasetEntries = {
                    usernames: [],
                    post_links: []
                };
                this.datasetPagination = createInitialPaginationState();
                this.ensureDatasetConfig();
                await this.initializeDatasets();
                return true;
            } catch (error) {
                console.error('重置设置文件失败:', error);
                return false;
            }
        },
        async testChatGPT(scope = 'comment') {
            try {
                this.testResult = 'Testing...';
                this.testResultStyle = 'text-warning';

                let url, api_key, model, system_prompt, post_caption;
                if (scope === 'dm') {
                    url = this.dmChatgptUrl;
                    api_key = this.dmChatgptApiKey;
                    model = this.dmChatgptModel;
                    system_prompt = this.dmChatgptSystemPrompt;
                    post_caption = 'This is a test DM generation.';
                } else {
                    url = this.commentSettings.chatgpt_settings.url;
                    api_key = this.commentSettings.chatgpt_settings.api_key;
                    model = this.commentSettings.chatgpt_settings.model;
                    system_prompt = this.commentSettings.chatgpt_settings.system_prompt;
                    post_caption = 'This is a test post caption for TikTok.';
                }

                const response = await this.$service.chatgpt_completion({
                    url,
                    api_key,
                    model,
                    system_prompt,
                    post_caption,
                });

                if (response.code == 0) {
                    this.testResult = response.data;
                    this.testResultStyle = 'text-success';
                } else {
                    this.testResult = response.data;
                    this.testResultStyle = 'text-error';
                }
            } catch (error) {
                this.testResult = 'Error: ' + (error && error.message ? error.message : String(error));
                this.testResultStyle = 'text-error';
            }
        },
        validateSettings() {
            const errors = [];


            if (!this.activeDatasetConfig.id) {
                errors.push(this.$t('selectDatasetRequired'));
            }


            if (this.features.sendDM) {
                const hasMessageContent = (this.dmSettings.message_contents || '').trim().length > 0;
                if (this.dmSettings.generate_by_chatgpt) {
                    const hasPrompt = (this.dmSettings.chatgpt_prompt || '').trim().length > 0;
                    if (!hasPrompt && !hasMessageContent) {
                        errors.push(this.$t('enterChatGPTPromptOrMessage'));
                    }
                } else if (!hasMessageContent) {
                    errors.push(this.$t('enterMessageContent'));
                }
            }

            if (this.features.boostPosts && (!Number.isInteger(this.postSettings.repeat_times) || this.postSettings.repeat_times < 1)) {
                this.postSettings.repeat_times = 1;
            }

            if (this.features.massComment && !this.commentSettings.generate_by_chatgpt && !this.commentSettings.comment_content.trim()) {
                errors.push(this.$t('enterCommentContent'));
            }

            return errors;
        },
        async runScript(enable_multi_account = false, rotate_proxy = false, selecedDevices = []) {
            const errors = this.validateSettings();
            if (errors.length > 0) {
                this.notify('error', errors[0]);
                return false;
            }

            await this.saveComponentSettings();

            // Build script_args object
            const scriptArgs = {
                enable_multi_account: enable_multi_account,
                rotate_proxy: rotate_proxy,
                min_interval: Number(this.task_interval[0]),
                max_interval: Number(this.task_interval[1]),
                merge_same_username_tasks: this.merge_same_username_tasks
            };

            // Call the dedicated super_marketing API and mirror Sidebar's behavior
            try {
                const res = await this.$service.super_marketing_run_now({
                    serials: selecedDevices,
                    script_name: 'super_marketing',
                    script_args: JSON.stringify(scriptArgs),
                    dataset_id: this.activeDatasetConfig.id,
                    merge_same_username_tasks: this.merge_same_username_tasks
                });

                if (res && res.code === 40004) {
                    // No account available
                    this.notify('error', this.$t('noAccount'));
                    return;
                }

                // reload task list in UI
                await this.$emiter('reload_tasks', {});

                if (res && typeof res.code !== 'undefined' && res.code !== 0) {
                    // non-success code
                    this.notify('error', res.data || this.$t('taskCreateFailed') || 'Failed to create tasks');
                } else {
                    // success: use same success message format as Sidebar
                    const successMsg = `${res && res.data ? res.data : ''} ${this.$t('taskCreated')}`.trim();
                    this.notify('success', successMsg, 2000);
                }
            } catch (error) {
                console.error('Failed to run super marketing script:', error);
                this.notify('error', `Failed to start tasks: ${error.message || error}`);
                return false;
            }
            return true;
        },
        notify(type, message, timeout = 2000) {
            if (this.$emiter) {
                this.$emiter('NOTIFY', { type, message, timeout });
            } else {
                const logger = type === 'error' ? console.error : console.log;
                logger(message);
            }
        }
    }
}
</script>

<style scoped>
/* 移除Tailwind @apply指令，使用标准CSS */
</style>
