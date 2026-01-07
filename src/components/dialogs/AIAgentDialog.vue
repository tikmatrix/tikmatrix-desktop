<template>
    <div class="w-full">
        <!-- 顶部说明 -->
        <div class="alert alert-info mb-4 shadow-lg">
            <div>
                <font-awesome-icon icon="fa-solid fa-robot" class="h-5 w-5" />
                <span>{{ $t('aiAgentDescription') }}</span>
            </div>
        </div>

        <!-- 任务目标输入 -->
        <div class="card bg-base-100 border border-base-300 mb-4">
            <div class="card-body p-4">
                <h3 class="card-title text-md">
                    <font-awesome-icon icon="fa-solid fa-bullseye" class="h-4 w-4 text-primary" />
                    {{ $t('taskGoal') }}
                </h3>
                <textarea class="textarea textarea-bordered w-full h-24" :placeholder="$t('aiAgentGoalPlaceholder')"
                    v-model="goal"></textarea>
                <div class="text-sm text-base-content/60 mt-1">
                    {{ $t('aiAgentGoalHint') }}
                </div>
            </div>
        </div>

        <!-- OpenAI API 设置 -->
        <div class="card bg-base-100 border border-base-300 mb-4">
            <div class="card-body p-4">
                <h3 class="card-title text-md">
                    <font-awesome-icon icon="fa-solid fa-gear" class="h-4 w-4 text-primary" />
                    {{ $t('chatgptSettings') }}
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- API URL -->
                    <div class="form-control">
                        <label class="label py-1">
                            <span class="label-text text-md">{{ $t('url') }}</span>
                        </label>
                        <input type="text" class="input input-bordered w-full"
                            placeholder="https://api.openai.com/v1/chat/completions" v-model="chatgpt_settings.url" />
                    </div>

                    <!-- Model -->
                    <div class="form-control">
                        <label class="label py-1">
                            <span class="label-text text-md">{{ $t('model') }}</span>
                        </label>
                        <input type="text" class="input input-bordered w-full" placeholder="gpt-4o-mini"
                            v-model="chatgpt_settings.model" />
                    </div>

                    <!-- API Key -->
                    <div class="form-control md:col-span-2">
                        <label class="label py-1">
                            <span class="label-text text-md">{{ $t('apiKey') }}</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <input :type="apiKeyVisible ? 'text' : 'password'" class="input input-bordered w-full"
                                placeholder="sk-********" v-model="chatgpt_settings.api_key" />
                            <button type="button" class="btn btn-ghost btn-square btn-sm"
                                @click="apiKeyVisible = !apiKeyVisible"
                                :title="apiKeyVisible ? $t('hide') : $t('show')">
                                <font-awesome-icon
                                    :icon="apiKeyVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 高级设置 -->
        <div class="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
            <input type="checkbox" v-model="showAdvanced" />
            <div class="collapse-title text-md font-medium">
                <font-awesome-icon icon="fa-solid fa-sliders" class="h-4 w-4 text-primary mr-2" />
                {{ $t('advancedSettings') }}
            </div>
            <div class="collapse-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <!-- Max Steps -->
                    <div class="form-control">
                        <label class="label py-1">
                            <span class="label-text text-md">{{ $t('maxSteps') }}</span>
                            <span class="label-text-alt text-base-content/60">{{ $t('maxStepsHint') }}</span>
                        </label>
                        <input type="number" class="input input-bordered w-full" min="5" max="100"
                            v-model.number="max_steps" />
                    </div>



                    <!-- System Prompt -->
                    <div class="form-control md:col-span-2">
                        <label class="label py-1">
                            <span class="label-text text-md">{{ $t('systemPrompt') }}</span>
                        </label>
                        <textarea class="textarea textarea-bordered w-full h-32" :placeholder="$t('systemPromptTips')"
                            v-model="chatgpt_settings.system_prompt"></textarea>
                        <div class="text-sm text-base-content/60 mt-1">
                            {{ $t('aiAgentSystemPromptHint') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 测试连接 -->
        <div class="flex items-center gap-2 mb-4">
            <button class="btn btn-md btn-outline btn-primary" @click="testConnection" :disabled="testing">
                <span v-if="testing" class="loading loading-spinner loading-sm"></span>
                <font-awesome-icon v-else icon="fa-solid fa-plug" class="h-4 w-4" />
                {{ $t('testConnection') }}
            </button>
            <span :class="testResultClass" class="text-md">{{ testResult }}</span>
        </div>
    </div>
</template>

<script>
import { aiAgentSettings } from '@/utils/settingsManager';

const DEFAULT_SYSTEM_PROMPT = `You are an Android automation agent. Your job is to achieve the user's goal by navigating the phone UI.

You will receive:
1. The user's goal.
2. A sanitized UI hierarchy (XML format) showing interactive elements with their bounds [left,top][right,bottom].

You must output ONLY a valid JSON object with your next action.

Available Actions:
- {"action": "tap", "coordinates": [x, y], "reason": "Why you are tapping this element"}
- {"action": "type", "text": "Hello World", "reason": "Why you are typing this text"}
- {"action": "swipe", "direction": "up|down|left|right", "reason": "Why you are swiping"}
- {"action": "home", "reason": "Go to home screen"}
- {"action": "back", "reason": "Go back to previous screen"}
- {"action": "wait", "reason": "Wait for loading/animation"}
- {"action": "done", "reason": "Task completed successfully"}
- {"action": "failed", "reason": "Task cannot be completed"}`;

export default {
    name: 'AIAgentDialog',
    mixins: [
        aiAgentSettings.createVueMixin(
            {
                goal: '',
                max_steps: 50,
                chatgpt_settings: {
                    url: 'https://api.openai.com/v1/chat/completions',
                    api_key: '',
                    model: 'gpt-4o-mini',
                    system_prompt: '',
                }
            },
            ['goal', 'max_steps', 'chatgpt_settings']
        )
    ],
    data() {
        return {
            apiKeyVisible: false,
            showAdvanced: false,
            testing: false,
            testResult: '',
            testResultClass: ''
        };
    },
    async mounted() {
        await this.ensureSettingsLoaded();
        // Set default system prompt if empty
        if (!this.chatgpt_settings.system_prompt) {
            this.chatgpt_settings.system_prompt = DEFAULT_SYSTEM_PROMPT;
        }
    },
    methods: {
        async testConnection() {
            if (!this.chatgpt_settings.api_key) {
                this.testResult = this.$t('apiKeyRequired');
                this.testResultClass = 'text-error';
                return;
            }

            this.testing = true;
            this.testResult = '';
            this.testResultClass = '';

            try {
                const response = await fetch(this.chatgpt_settings.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.chatgpt_settings.api_key}`
                    },
                    body: JSON.stringify({
                        model: this.chatgpt_settings.model,
                        messages: [
                            { role: 'user', content: 'Say "OK" if you can receive this message.' }
                        ],
                        max_completion_tokens: 10
                    })
                });

                const data = await response.json();

                if (data.error) {
                    this.testResult = `❌ ${data.error.message || 'API Error'}`;
                    this.testResultClass = 'text-error';
                } else if (data.choices && data.choices[0]) {
                    this.testResult = `✅ ${this.$t('connectionSuccess')}`;
                    this.testResultClass = 'text-success';
                } else {
                    this.testResult = `❌ ${this.$t('unexpectedResponse')}`;
                    this.testResultClass = 'text-error';
                }
            } catch (error) {
                this.testResult = `❌ ${error.message}`;
                this.testResultClass = 'text-error';
            } finally {
                this.testing = false;
            }
        },

        getScriptArgs() {
            return {
                goal: this.goal,
                max_steps: this.max_steps,
                chatgpt_settings: JSON.stringify(this.chatgpt_settings)
            };
        },

        async runScript(enable_multi_account = false, rotate_proxy = false) {
            // Validate inputs
            if (!this.goal || !this.goal.trim()) {
                alert(this.$t('goalRequired'));
                return false;
            }

            if (!this.chatgpt_settings.api_key) {
                alert(this.$t('apiKeyRequired'));
                return false;
            }

            await this.$emiter('run_now_by_account', {
                name: 'ai_agent', args: {
                    start_time: this.startOption === 'scheduled' ? this.scheduledTime : '',
                    min_duration: Number(this.min_duration),
                    max_duration: Number(this.max_duration),
                    enable_multi_account: enable_multi_account,
                    rotate_proxy: rotate_proxy,
                }
            })
            return true;

        }
    }
};
</script>
