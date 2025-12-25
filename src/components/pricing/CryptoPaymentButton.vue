<template>
    <div>
        <!-- Main Crypto Payment Button -->
        <button @click="showSelector"
            class="btn btn-outline btn-block btn-md hover:btn-secondary transition-all duration-200 flex items-center justify-center gap-2">
            <font-awesome-icon icon="fab fa-bitcoin" class="w-4 h-4" />
            <span>{{ $t('cryptoPayment') }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'CryptoPaymentButton',
    inject: ['showCryptoSelector'],
    props: {
        amount: {
            type: Number,
            required: true
        },
        planId: {
            type: String,
            required: true
        },
        planInterval: {
            type: String,
            required: true
        }
    },
    methods: {
        showSelector() {
            // 调用注入的共享方法打开全局对话框
            this.showCryptoSelector(this.amount, this.planId, this.planInterval);
        }
    }
}
</script>
