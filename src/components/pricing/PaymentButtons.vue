<template>
    <div class="space-y-2">
        <!-- 主要订阅按钮 -->
        <button v-if="license.is_stripe_active == 1" @click="$emit('manage-subscription')"
            class="btn btn-success btn-block btn-md hover:btn-success-focus transition-all duration-200">
            <font-awesome-icon icon="fas fa-cog" class="mr-1 w-3 h-3" />
            {{ $t('manageSubscription') }}
        </button>

        <button v-else @click="handleStripeCheckout"
            class="btn btn-outline btn-block btn-md hover:btn-secondary-focus transition-all duration-200"
            :class="stripeButtonClass">
            <div class="flex items-center justify-center gap-2">
                <font-awesome-icon icon="fas fa-credit-card" class="w-4 h-4" />
                <span>{{ $t('creditCard') }}</span>
            </div>
        </button>

        <!-- 支付宝支付按钮 -->
        <button v-if="license.is_stripe_active == 0" @click="handleAlipayCheckout"
            class="btn btn-outline btn-block btn-md hover:btn-secondary-focus transition-all duration-200">
            <div class="flex items-center justify-center gap-2">
                <font-awesome-icon icon="fab fa-alipay" class="w-4 h-4" />
                <span>{{ $t('alipayPayment') }}</span>
            </div>
        </button>

        <!-- 加密货币支付按钮 (统一入口) -->
        <CryptoPaymentButton v-if="license.is_stripe_active == 0" :amount="amount" :plan-id="planId"
            :plan-interval="planInterval" @create-order="handleCreateOrder" />
    </div>
</template>

<script>
import CryptoPaymentButton from './CryptoPaymentButton.vue'

export default {
    name: 'PaymentButtons',
    components: {
        CryptoPaymentButton
    },
    props: {
        license: {
            type: Object,
            required: true
        },
        priceId: {
            type: String,
            required: true
        },
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
        },
        planType: {
            type: String,
            default: 'monthly'
        }
    },
    emits: ['manage-subscription', 'create-stripe-checkout', 'create-alipay-checkout', 'create-order'],
    computed: {
        stripeButtonClass() {
            // Use outline base style; keep empty so we don't add solid color classes that conflict
            return ''
        }
    },
    methods: {
        handleStripeCheckout() {
            this.$emit('create-stripe-checkout', this.priceId, this.planInterval);
        },
        handleCreateOrder(price, planId, planInterval, network, paymentInfo) {
            this.$emit('create-order', price, planId, planInterval, network, paymentInfo);
        },
        handleAlipayCheckout() {
            this.$emit('create-alipay-checkout', this.planId, this.planInterval);
        }
    }
}
</script>