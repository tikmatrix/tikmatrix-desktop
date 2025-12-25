<template>
    <div class="card bg-linear-to-br shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border"
        :class="cardClasses">
        <div class="card-body p-4">
            <!-- 最受欢迎标签 -->
            <div v-if="isPopular" class="badge absolute -top-3 left-1/2 transform -translate-x-1/2" :class="badgeClass">
                {{ $t('mostPopular') }}
            </div>

            <!-- 计划标题 -->
            <div class="text-center mb-3">
                <h3 class="card-title justify-center text-lg mb-2" :class="titleClass">
                    {{ plan.name }}
                </h3>

                <!-- 价格显示 -->
                <div class="flex items-baseline justify-center gap-1 mb-2">
                    <span class="text-2xl font-bold" :class="priceTextSize">
                        ${{ displayPrice }}
                    </span>
                    <div class="text-base-content/70 text-md">
                        <span>/ {{ $t('month') }}</span>
                        <span class="block">/ {{ $t('pc') }}</span>
                    </div>
                </div>

                <!-- 年度计划额外信息 -->
                <div v-if="planType === 'yearly'" class="bg-accent/20 rounded-lg p-2 mb-2">
                    <p class="text-md font-semibold text-accent">
                        ${{ plan.price.year.amount }} / {{ $t('year') }}
                    </p>
                    <p class="text-md text-success font-medium">
                        {{ $t('youSave', { amount: `$${yearlySavings}` }) }}
                    </p>
                </div>

                <p class="text-base-content/80 text-md">
                    {{ plan.description[$i18n.locale] }}
                </p>
            </div>

            <!-- 功能列表 -->
            <ul class="space-y-2 mb-4 feature-list">
                <li v-for="feature in plan.includes[$i18n.locale]" :key="feature" class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                        <CheckIcon class="w-2.5 h-2.5 text-success" />
                    </div>
                    <span class="text-md">{{ feature }}</span>
                </li>
            </ul>

            <!-- 支付按钮 -->
            <PaymentButtons :license="license" :price-id="priceId" :amount="planAmount" :plan-id="plan.id"
                :plan-interval="apiPlanInterval" :plan-type="planType"
                @manage-subscription="$emit('manage-subscription')" @create-stripe-checkout="handleStripeCheckout"
                @create-alipay-checkout="handleAlipayCheckout" @create-order="handleCreateOrder" />
        </div>
    </div>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/20/solid'
import PaymentButtons from './PaymentButtons.vue'

export default {
    name: 'PlanCard',
    components: {
        CheckIcon,
        PaymentButtons
    },
    props: {
        plan: {
            type: Object,
            required: true
        },
        planType: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        license: {
            type: Object,
            required: true
        }
    },
    emits: ['create-stripe-checkout', 'create-alipay-checkout', 'create-order', 'manage-subscription'],
    computed: {
        isPopular() {
            return this.index === 1
        },
        cardClasses() {
            const baseClasses = this.planType === 'monthly'
                ? this.monthlyCardClasses
                : this.yearlyCardClasses
            return [baseClasses, this.cardPadding]
        },
        monthlyCardClasses() {
            const colorIndex = this.index % 4
            const colors = [
                'from-primary/15 to-primary/5 border-primary/30',
                'from-secondary/15 to-secondary/5 border-secondary/30',
                'from-accent/15 to-accent/5 border-accent/30',
                'from-info/15 to-info/5 border-info/30'
            ]
            return colors[colorIndex]
        },
        yearlyCardClasses() {
            const colorIndex = this.index % 4
            const colors = [
                'from-accent/15 to-accent/5 border-accent/30',
                'from-warning/15 to-warning/5 border-warning/30',
                'from-success/15 to-success/5 border-success/30',
                'from-error/15 to-error/5 border-error/30'
            ]
            return colors[colorIndex]
        },
        titleClass() {
            if (this.planType === 'monthly') {
                const colors = ['text-primary', 'text-secondary', 'text-accent', 'text-info']
                return colors[this.index % 4]
            } else {
                const colors = ['text-accent', 'text-warning', 'text-success', 'text-error']
                return colors[this.index % 4]
            }
        },
        badgeClass() {
            return this.planType === 'monthly' ? 'badge-secondary' : 'badge-accent'
        },
        cardPadding() {
            // 根据计划数量调整卡片内边距
            return 'p-4' // 默认内边距
        },
        priceTextSize() {
            return 'text-2xl' // 默认文字大小
        },
        displayPrice() {
            return this.planType === 'monthly'
                ? this.plan.price.month.amount
                : Math.round(this.plan.price.year.amount / 12)
        },
        priceId() {
            return this.planType === 'monthly'
                ? this.plan.price.month.id
                : this.plan.price.year.id
        },
        planAmount() {
            return this.planType === 'monthly'
                ? this.plan.price.month.amount
                : this.plan.price.year.amount
        },
        yearlySavings() {
            return Math.round((this.plan.price.month.amount * 12) - this.plan.price.year.amount)
        },
        // 转换 planType 到 API 期望的格式
        apiPlanInterval() {
            return this.planType === 'monthly' ? 'month' : 'year'
        }
    },
    methods: {
        handleStripeCheckout(priceId, planInterval) {
            this.$emit('create-stripe-checkout', priceId, planInterval);
        },
        handleCreateOrder(price, planId, planInterval, network, paymentInfo) {
            this.$emit('create-order', price, planId, planInterval, network, paymentInfo);
        },
        handleAlipayCheckout(planId, planInterval) {
            this.$emit('create-alipay-checkout', planId, planInterval);
        }
    }
}
</script>