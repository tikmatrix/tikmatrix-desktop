<template>
    <div class="alert alert-info mb-4 shadow-lg">
        <div>
            <font-awesome-icon icon="fa-solid fa-flask-vial" class="h-6 w-6 mr-2" />
            <span>{{ $t('testScriptWarning') }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TestScriptDialog',
    data() {
        return {
        }
    },
    methods: {
        async runScript(enable_multi_account = false, rotate_proxy = false) {
            enable_multi_account = false;
            await this.$emiter('run_now_by_account', { name: 'test', args: { enable_multi_account, rotate_proxy } })
            return true;
        },
    },
    async mounted() {
    }
}
</script>
