<template>
    <div class="space-y-2 w-full max-w-xl">
        <div class="alert alert-error py-2" v-if="network !== 'STRIPE'">
            <font-awesome-icon icon="fas fa-exclamation-triangle" class="w-4 h-4" />
            <span class="text-md">{{ $t('cryptoTip', { network: network, amount: amount, token: tokenSymbol }) }}</span>
        </div>
        <div class="alert alert-error py-2" v-if="network === 'STRIPE'">
            <font-awesome-icon icon="fas fa-exclamation-triangle" class="w-4 h-4" />
            <span class="text-md">{{ $t('stripeTip') }}</span>
        </div>
        <div class="alert alert-success py-2">
            <font-awesome-icon icon="fas fa-check-circle" class="w-4 h-4" />
            <span class="text-md">{{ $t('afterPayTip') }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentTips',
    props: {
        network: {
            type: String,
            required: true
        },
        amount: {
            type: [Number, String],
            required: true
        },
        tokenSymbol: {
            type: String,
            default: 'USDT'
        }
    }
}
</script>