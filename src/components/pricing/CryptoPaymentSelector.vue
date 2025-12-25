<template>
    <div class="space-y-3">
        <h3 class="font-semibold text-lg">{{ $t('selectCryptoPaymentMethod') }}</h3>

        <div v-if="loading" class="flex justify-center py-4">
            <span class="loading loading-spinner loading-md"></span>
        </div>

        <div v-else-if="error" class="alert alert-error">
            <span>{{ error }}</span>
        </div>

        <div v-else-if="cryptoPaymentMethods && cryptoPaymentMethods.length === 0" class="alert alert-warning">
            <span>{{ $t('noCryptoPaymentMethodsAvailable') }}</span>
        </div>

        <div v-else-if="cryptoPaymentMethods" class="space-y-2">
            <button v-for="payment in cryptoPaymentMethods" :key="`${payment.network}-${payment.token_symbol}`"
                @click="selectPaymentMethod(payment)" :disabled="!payment.available"
                class="btn btn-outline btn-block btn-md hover:btn-secondary transition-all duration-200 flex items-center justify-start gap-2"
                :class="{ 'btn-disabled opacity-50': !payment.available }">
                <div class="flex items-center gap-2 flex-1">
                    <span class="font-semibold">{{ payment.token_symbol }}</span>
                    <span class="text-sm opacity-70">({{ payment.network_name }})</span>
                </div>
                <div v-if="!payment.available" class="badge badge-error badge-sm">
                    {{ $t('unavailable') }}
                </div>
            </button>
        </div>
        <div v-else class="flex justify-center py-4">
            <span>{{ $t('loading') }}...</span>
        </div>

        <div class="flex justify-end gap-2 mt-4">
            <button @click="$emit('cancel')" class="btn btn-ghost btn-sm">
                {{ $t('cancel') }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CryptoPaymentSelector',
    emits: ['select'],
    props: {
        cryptoPaymentMethods: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            loading: false,
            error: null,
        }
    },
    methods: {

        selectPaymentMethod(payment) {
            if (!payment.available) {
                return
            }
            this.$emit('select', payment)
        }
    }
}
</script>
