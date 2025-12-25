<template>
    <div>
        <!-- 计划标题 -->
        <div class="text-center mb-4">
            <div v-if="planType === 'yearly'" class="badge badge-success badge-md gap-1 mb-1">
                <font-awesome-icon icon="fas fa-tag" class="w-3 h-3" />
                {{ $t('savePercent', { percent: 30 }) }}
            </div>
        </div>

        <!-- 计划卡片网格 -->
        <div class="grid gap-4 w-full" :style="gridStyle">
            <PlanCard v-for="(plan, index) in plans" :key="plan.id + '_' + planType" :plan="plan" :plan-type="planType"
                :index="index" :license="license" @create-stripe-checkout="handleCreateStripeCheckout"
                @create-alipay-checkout="handleCreateAlipayCheckout" @create-order="handleCreateOrder"
                @manage-subscription="$emit('manage-subscription')" />
        </div>
    </div>
</template>

<script>
import PlanCard from './PlanCard.vue'

export default {
    name: 'PlanSection',
    components: {
        PlanCard
    },
    props: {
        plans: {
            type: Array,
            required: true
        },
        planType: {
            type: String,
            required: true,
            validator: value => ['monthly', 'yearly'].includes(value)
        },
        license: {
            type: Object,
            required: true
        }
    },
    emits: ['create-stripe-checkout', 'create-alipay-checkout', 'create-order', 'manage-subscription'],
    computed: {
        titleClass() {
            return this.planType === 'monthly' ? 'text-primary' : 'text-accent'
        },
        gridStyle() {
            const plansCount = this.plans?.length || 4
            const columns = Math.min(plansCount, 4)
            return {
                'grid-template-columns': `repeat(${columns}, minmax(0, 1fr))`
            }
        }
    },
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