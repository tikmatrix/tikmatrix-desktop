<template>
    <div class="card bg-base-100 border border-base-300">
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
                            :checked="mergeSameUsernameTasks"
                            @change="$emit('update:mergeSameUsernameTasks', $event.target.checked)" />
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
                        <VueSlider :modelValue="taskInterval"
                            @update:modelValue="$emit('update:taskInterval', $event)"
                            :width="500" :min="0" :max="10" :marks="{
                                0: '0',
                                5: '5',
                                10: `10 ${$t('minute')}`
                            }" />
                        <div class="text-sm text-base-content/70">
                            {{ $t('taskInterval') }}: {{ taskInterval[0] }} - {{ taskInterval[1] }}
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
    name: 'TaskSettingsModule',
    components: {
        VueSlider
    },
    props: {
        mergeSameUsernameTasks: {
            type: Boolean,
            required: true
        },
        taskInterval: {
            type: Array,
            required: true
        }
    },
    emits: [
        'update:mergeSameUsernameTasks',
        'update:taskInterval'
    ]
};
</script>
