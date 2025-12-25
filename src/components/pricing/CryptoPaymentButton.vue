<template>
    <div>
        <!-- Main Crypto Payment Button -->
        <button @click="showSelector"
            class="btn btn-outline btn-block btn-md hover:btn-secondary transition-all duration-200 flex items-center justify-center gap-2">
            <font-awesome-icon icon="fab fa-bitcoin" class="w-4 h-4" />
            <span>{{ $t('cryptoPayment') }}</span>
        </button>

        <!-- Crypto Payment Selector Modal -->
        <dialog ref="cryptoSelectorDialog" class="modal">
            <div class="modal-box">
                <CryptoPaymentSelector 
                    @select="handlePaymentMethodSelected" 
                    @cancel="hideSelector" 
                />
            </div>
            <form method="dialog" class="modal-backdrop">
                <button @click="hideSelector">close</button>
            </form>
        </dialog>
    </div>
</template>

<script>
import CryptoPaymentSelector from './CryptoPaymentSelector.vue'

export default {
    name: 'CryptoPaymentButton',
    components: {
        CryptoPaymentSelector
    },
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
    emits: ['create-order'],
    methods: {
        showSelector() {
            this.$refs.cryptoSelectorDialog.showModal()
        },

        hideSelector() {
            this.$refs.cryptoSelectorDialog.close()
        },

        handlePaymentMethodSelected(payment) {
            this.hideSelector()
            // Emit with the selected network
            this.$emit('create-order', this.amount, this.planId, this.planInterval, payment.network, payment)
        }
    }
}
</script>
