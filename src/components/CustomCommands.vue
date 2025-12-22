<template>
    <div class="custom-commands">
        <div class="flex justify-between items-center mb-4">
            <div>
                <button class="btn btn-md btn-primary" @click="showCreateDialog">
                    <font-awesome-icon icon="fa-plus" class="h-3 w-3 mr-1" />
                    {{ $t('addCommand') }}
                </button>
                <button class="btn btn-md btn-outline btn-warning ml-2" @click="confirmReset">
                    <font-awesome-icon icon="fa-refresh" class="h-3 w-3 mr-1" />
                    {{ $t('resetCommands') }}
                </button>
            </div>
        </div>

        <div class="saved-commands" v-if="commands.length > 0">
            <div v-for="(cmd, index) in commands" :key="index" class="bg-base-300 p-2 rounded-md mb-1">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-md">{{ cmd.name }}</h3>
                    <div>
                        <button class="btn btn-md btn-primary mr-1" @click="executeCommand(cmd)">
                            <font-awesome-icon icon="fa-play" class="h-3 w-3" />
                        </button>
                        <button class="btn btn-md btn-outline mr-1" @click="editCommand(index)">
                            <font-awesome-icon icon="fa-edit" class="h-3 w-3" />
                        </button>
                        <button class="btn btn-md btn-outline btn-error" @click="deleteCommand(index)">
                            <font-awesome-icon icon="fa-trash" class="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center text-md py-4 text-base-content opacity-70">
            {{ $t('noSavedCommands') }}
        </div>

        <!-- 创建/编辑命令对话框 -->
        <dialog ref="commandDialog" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">
                    {{ editing ? $t('updateCommand') : $t('addCommand') }}
                </h3>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">{{ $t('commandName') }}</span>
                    </label>
                    <input type="text" class="input input-bordered input-md w-full" v-model="newCommand.name"
                        :placeholder="$t('enterCommandName')" />

                    <label class="label mt-2">
                        <span class="label-text">{{ $t('commandArgs') }}</span>
                    </label>
                    <textarea class="textarea textarea-bordered h-20 w-full text-md" v-model="newCommand.args"
                        :placeholder="$t('enterCommandArgs')"></textarea>

                    <div class="divider">{{ $t('tips') }}</div>
                    <div class="bg-base-200 p-3 rounded-md text-md mb-4">
                        <p>{{ $t('adbCommandTips') }}</p>
                        <p>{{ $t('multiCommandTips') }}</p>
                        <p class="mt-2">{{ $t('adbCommandExamples') }}:</p>
                        <ul class="list-disc list-inside mt-1">
                            <li>shell pm list packages</li>
                            <li>shell input keyevent 26</li>
                            <li>shell settings put system screen_brightness 100</li>
                        </ul>
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn btn-md btn-primary" @click="addCommand" :disabled="!isValidCommand">
                        {{ editing ? $t('updateCommand') : $t('addCommand') }}
                    </button>
                    <button class="btn btn-md" @click="closeDialog">
                        {{ $t('cancel') }}
                    </button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button @click="closeDialog">close</button>
            </form>
        </dialog>

        <!-- 重置确认对话框 -->
        <dialog ref="resetDialog" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">{{ $t('resetConfirmTitle') }}</h3>
                <p>{{ $t('resetConfirmMessage') }}</p>
                <div class="modal-action">
                    <button class="btn btn-md btn-error" @click="resetCommands">
                        {{ $t('reset') }}
                    </button>
                    <button class="btn btn-md" @click="$refs.resetDialog.close()">
                        {{ $t('cancel') }}
                    </button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script>
import { getJsonItem, setJsonItem, getItem, setItem, removeItem } from '@/utils/storage.js';
export default {
    name: 'CustomCommands',
    props: ['settings'],
    data() {
        return {
            commands: [],
            newCommand: {
                name: '',
                args: ''
            },
            editing: false,
            editIndex: -1,
            presetCommands: [
                {
                    name: 'Home',
                    args: ['shell', 'input', 'keyevent', '3']
                },
                {
                    name: 'Back',
                    args: ['shell', 'input', 'keyevent', '4']
                },
                //enableTCP
                {
                    name: 'Enable TCP',
                    args: ['tcpip', '5555']
                },
                // package-specific preset will be built dynamically in loadCommands()
                {
                    name: 'Open Gallery',
                    args: ['shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-t', 'image/*']
                },
                {
                    name: 'Open Settings',
                    args: ['shell', 'am', 'start', '-a', 'android.settings.SETTINGS']
                },
                {
                    name: 'Open NekoBox ',
                    args: ['shell', 'am', 'start', '-n', 'moe.nb4a/io.nekohasekai.sagernet.ui.MainActivity']
                }
            ]
        }
    },
    computed: {
        isValidCommand() {
            return this.newCommand.name.trim() !== '' && this.newCommand.args.trim() !== '';
        }
    },
    methods: {
        async loadCommands() {
            const savedCommands = await getJsonItem('tikmatrix_custom_commands', null);
            const presetsLoaded = await getItem('tikmatrix_presets_loaded');

            if (Array.isArray(savedCommands)) {
                this.commands = savedCommands;
            }

            // 构建预置命令，优先使用 agent 存储的 apk_package_name，否则使用 settings.packagename，最后回退到默认
            let mainPkg = await getItem('apk_package_name');
            if (!mainPkg) {
                mainPkg = 'com.github.tikmatrix';
            }

            const dynamicPresets = [
                {
                    name: 'Home',
                    args: ['shell', 'input', 'keyevent', '3']
                },
                {
                    name: 'Back',
                    args: ['shell', 'input', 'keyevent', '4']
                },
                {
                    name: 'Enable TCP',
                    args: ['tcpip', '5555']
                },
                {
                    name: 'Enable Fast Input',
                    args: ['shell', 'ime', 'set', `${mainPkg}/.FastInputIME`]
                },
                {
                    name: 'Open Gallery',
                    args: ['shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-t', 'image/*']
                },
                {
                    name: 'Open Settings',
                    args: ['shell', 'am', 'start', '-a', 'android.settings.SETTINGS']
                },
                {
                    name: 'Open NekoBox ',
                    args: ['shell', 'am', 'start', '-n', 'moe.nb4a/io.nekohasekai.sagernet.ui.MainActivity']
                }
            ];

            // 如果预置命令尚未加载，则添加它们
            if (!presetsLoaded) {
                this.commands = [...this.commands, ...dynamicPresets];
                await setItem('tikmatrix_presets_loaded', 'true');
                await this.saveCommands();
            }
        },
        async saveCommands() {
            await setJsonItem('tikmatrix_custom_commands', this.commands);
        },
        showCreateDialog() {
            this.editing = false;
            this.resetForm();
            this.$refs.commandDialog.showModal();
        },
        closeDialog() {
            this.$refs.commandDialog.close();
        },
        async addCommand() {
            if (!this.isValidCommand) return;

            if (this.editing) {
                this.commands[this.editIndex] = {
                    name: this.newCommand.name,
                    args: this.newCommand.args
                };
                this.editing = false;
                this.editIndex = -1;
            } else {
                this.commands.push({
                    name: this.newCommand.name,
                    args: this.newCommand.args
                });
            }

            await this.saveCommands();
            this.closeDialog();

            this.$emiter('NOTIFY', {
                type: 'success',
                message: this.editing ? this.$t('commandUpdated') : this.$t('commandAdded'),
                timeout: 2000
            });
        },
        editCommand(index) {
            const cmd = this.commands[index];
            this.newCommand.name = cmd.name;
            this.newCommand.args = typeof cmd.args === 'string' ? cmd.args : this.formatArgs(cmd.args);
            this.editing = true;
            this.editIndex = index;
            this.$refs.commandDialog.showModal();
        },
        async deleteCommand(index) {
            this.commands.splice(index, 1);
            await this.saveCommands();

            this.$emiter('NOTIFY', {
                type: 'success',
                message: this.$t('commandDeleted'),
                timeout: 2000
            });
        },
        resetForm() {
            this.newCommand = {
                name: '',
                args: ''
            };
        },
        executeCommand(cmd) {
            // 检查命令参数是否是字符串格式（从表单编辑时可能是字符串）
            const argsStr = typeof cmd.args === 'string' ? cmd.args : this.formatArgs(cmd.args);

            // 按行分割命令
            const commandLines = argsStr.split('\n').filter(line => line.trim() !== '');

            if (commandLines.length === 0) {
                this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('noValidCommands'),
                    timeout: 2000
                });
                return;
            }

            // 显示开始执行的通知
            this.$emiter('NOTIFY', {
                type: 'info',
                message: commandLines.length > 1
                    ? this.$t('executingMultipleCommands', { count: commandLines.length })
                    : this.$t('commandExecuting'),
                timeout: 2000
            });

            // 依次执行每行命令
            commandLines.forEach((line, index) => {
                // 将每行命令解析为参数数组
                const args = this.parseArgs(line);

                // 使用setTimeout增加一点延迟，防止命令执行太快
                setTimeout(() => {
                    this.$emiter('adbEventData', { args: args });
                }, index * 300); // 每条命令间隔300毫秒
            });
        },
        parseArgs(argsString) {
            // 将命令字符串分割成数组
            return argsString.split(/\s+/).filter(arg => arg.trim() !== '');
        },
        formatArgs(argsArray) {
            // 将命令数组格式化为字符串
            return Array.isArray(argsArray) ? argsArray.join(' ') : argsArray;
        },
        // 显示重置确认对话框
        confirmReset() {
            this.$refs.resetDialog.showModal();
        },

        // 重置命令
        async resetCommands() {
            // 清除持久化存储中的命令数据
            await removeItem('tikmatrix_custom_commands');
            await removeItem('tikmatrix_presets_loaded');

            // 清空当前命令列表
            this.commands = [];

            // 重新加载预设命令
            this.commands = [...this.presetCommands];

            // 保存到本地存储
            await setItem('tikmatrix_presets_loaded', 'true');
            await this.saveCommands();

            // 关闭对话框
            this.$refs.resetDialog.close();

            // 显示成功通知
            this.$emiter('NOTIFY', {
                type: 'success',
                message: this.$t('commandsResetSuccess'),
                timeout: 2000
            });
        }
    },
    async mounted() {
        await this.loadCommands();
    }
}
</script>

<style scoped>
.custom-commands {
    padding: 8px;
}
</style>
