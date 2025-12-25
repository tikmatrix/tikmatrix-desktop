<template>
    <div class="tabs tabs-lifted tabs-lg justify-center mb-6 bg-base-200/50 rounded-xl p-2">
        <!-- 月度计划标签 -->
        <input type="radio" name="pricing_tabs"
            class="tab [--tab-bg:hsl(var(--p))] [--tab-color:hsl(var(--pc))] text-base font-semibold"
            :aria-label="$t('monthly')" checked="checked" />
        <div class="tab-content bg-base-100 backdrop-blur border border-base-300 rounded-xl p-6 shadow-xl">
            <PlanSection :plans="plans" plan-type="monthly" :license="license"
                :crypto-payment-methods="cryptoPaymentMethods" @create-stripe-checkout="handleCreateStripeCheckout"
                @create-alipay-checkout="handleCreateAlipayCheckout" @create-order="handleCreateOrder"
                @manage-subscription="$emit('manage-subscription')" />
        </div>

        <!-- 年度计划标签 -->
        <input type="radio" name="pricing_tabs"
            class="tab [--tab-bg:hsl(var(--a))] [--tab-color:hsl(var(--ac))] text-base font-semibold"
            :aria-label="$t('yearlyDiscount', { percent: 30 })" />
        <div class="tab-content bg-base-100 backdrop-blur border border-base-300 rounded-xl p-6 shadow-xl">
            <PlanSection :plans="plans" plan-type="yearly" :license="license"
                :crypto-payment-methods="cryptoPaymentMethods" @create-stripe-checkout="handleCreateStripeCheckout"
                @create-alipay-checkout="handleCreateAlipayCheckout" @create-order="handleCreateOrder"
                @manage-subscription="$emit('manage-subscription')" />
        </div>
    </div>
</template>

<script>
import PlanSection from './PlanSection.vue'

export default {
    name: 'PricingTable',
    components: {
        PlanSection
    },
    props: {
        plans: {
            type: Array,
            required: true
        },
        license: {
            type: Object,
            required: true
        },
        cryptoPaymentMethods: {
            type: Array,
            default: null
        }
    },
    emits: ['create-stripe-checkout', 'create-alipay-checkout', 'create-order', 'manage-subscription'],
    methods: {
        handleCreateOrder(price, planId, planInterval, network, paymentInfo) {
            this.$emit('create-order', price, planId, planInterval, network, paymentInfo)
        },
        handleCreateStripeCheckout(price, planId, planInterval) {
            this.$emit('create-stripe-checkout', price, planId, planInterval)
        },
        handleCreateAlipayCheckout(planId, planInterval) {
            this.$emit('create-alipay-checkout', planId, planInterval)
        }
    }
}
</script>