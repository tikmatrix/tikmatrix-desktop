<template>
    <dialog ref="license_management_dialog" class="modal license-management-dialog">
        <div class="modal-box w-11/12 max-w-7xl overflow-y-auto max-h-[90vh] bg-linear-to-br from-base-100 to-base-200">
            <!-- 关闭按钮 -->
            <form method="dialog">
                <button
                    class="btn btn-md btn-circle btn-ghost absolute right-4 top-4 z-10 hover:bg-base-300 transition-all duration-200">
                    <font-awesome-icon icon="fas fa-times" class="text-lg" />
                </button>
            </form>

            <div class="modal-body">
                <div class="relative isolate px-4 py-4 w-full">
                    <!-- 标题 -->
                    <DialogHeader />

                    <!-- 用户信息卡片 -->
                    <UserInfoCard :license="license" @manage-subscription="manageStripeSubscription"
                        @show-license-migration="showLicenseMigration" @activate="activate" @copy-text="copyText"
                        @update-license-code="$emit('update-license-code', $event)" />

                    <!-- 订单显示区域 -->
                    <OrderDisplay v-if="whitelabelConfig.enablePay && order && order.status == 0" :order="order"
                        :remaining-time="remainingTime" @close-order="closeOrder" @copy-text="copyText" />

                    <!-- 定价表加载指示器 -->
                    <div v-else-if="whitelabelConfig.enablePay && isLoadingPriceTable"
                        class="flex justify-center items-center py-12">
                        <span class="loading loading-spinner loading-lg"></span>
                        <span class="ml-4 text-lg">{{ $t('loadingPricingInfo') || 'Loading pricing information...'
                        }}</span>
                    </div>

                    <!-- 定价表 -->
                    <PricingTable
                        v-else-if="whitelabelConfig.enablePay && priceTableInfo && priceTableInfo.plans.length > 0"
                        :plans="priceTableInfo.plans" :license="license"
                        @create-stripe-checkout="createStripeCheckoutUrl"
                        @create-alipay-checkout="createAlipayCheckoutUrl" @create-order="createOrder"
                        @manage-subscription="manageStripeSubscription" />

                    <!-- 隐私协议 -->
                    <PrivacyAgreement v-model="agreePolicy" v-if="whitelabelConfig.enablePay" />
                </div>
            </div>
        </div>

        <!-- 模态框背景 -->
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <!-- 各种加载和提示对话框 -->
    <LoadingDialogs ref="loadingDialogs" />

    <!-- License迁移对话框 -->
    <LicenseMigrationDialog ref="licenseMigrationDialog" :license-info="license"
        @migration-completed="handleMigrationCompleted" />

    <!-- 全局加密货币支付选择器对话框 -->
    <dialog ref="cryptoSelectorDialog" class="modal">
        <div class="modal-box">
            <CryptoPaymentSelector :crypto-payment-methods="cryptoPaymentMethods"
                @select="handleCryptoPaymentSelected" @cancel="hideCryptoSelector" />
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<script>
// 导入子组件
import DialogHeader from './pricing/DialogHeader.vue'
import UserInfoCard from './pricing/UserInfoCard.vue'
import OrderDisplay from './pricing/OrderDisplay.vue'
import PricingTable from './pricing/PricingTable.vue'
import PrivacyAgreement from './pricing/PrivacyAgreement.vue'
import LoadingDialogs from './pricing/LoadingDialogs.vue'
import LicenseMigrationDialog from './LicenseMigrationDialog.vue'
import CryptoPaymentSelector from './pricing/CryptoPaymentSelector.vue'

// 导入业务逻辑混入
import paymentMixin from '../mixins/paymentMixin'
import licenseMixin from '../mixins/licenseMixin'
import orderMixin from '../mixins/orderMixin'
import { getWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../config/whitelabel.js';
import { getItem, setItem } from '@/utils/storage.js';

export default {
    name: 'LicenseManagementDialog',
    emits: ['update-license-code'],
    components: {
        DialogHeader,
        UserInfoCard,
        OrderDisplay,
        PricingTable,
        PrivacyAgreement,
        LoadingDialogs,
        LicenseMigrationDialog,
        CryptoPaymentSelector
    },
    mixins: [paymentMixin, licenseMixin, orderMixin],
    props: {
        license: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            remainingTime: 0,
            order: null,
            interval: null,
            agreePolicy: false,
            currentLocale: 'en',
            priceTableInfo: null,
            whitelabelConfig: cloneDefaultWhiteLabelConfig(),
            orderPaymentHandled: false,
            cryptoPaymentMethods: null, // Cache crypto payment methods
            isLoadingPriceTable: false,
            isLoadingOrder: false,
            // 用于存储加密货币支付的上下文信息
            cryptoPaymentContext: null
        };
    },
    provide() {
        return {
            // 提供打开加密货币选择器的方法
            showCryptoSelector: this.showCryptoSelector
        };
    },
    watch: {
        async agreePolicy(newVal) {
            await setItem('agreePolicy', newVal ? 'true' : 'false');
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor((this.remainingTime % 3600) / 60).toString().padStart(2, '0');
            const seconds = (this.remainingTime % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
    },
    async created() {
        const [storedAgree, storedLocale, config] = await Promise.all([
            getItem('agreePolicy'),
            getItem('locale'),
            getWhiteLabelConfig()
        ]);

        if (storedAgree !== null) {
            this.agreePolicy = storedAgree === 'true';
        }
        if (storedLocale) {
            this.currentLocale = storedLocale.replace(/"/g, '');
        }
        if (config) {
            this.whitelabelConfig = config;
        }
    },
    async mounted() {
        await this.setupEventListeners();
    },
    methods: {
        async show() {
            // Reload license first
            await this.$emiter('LICENSE', { reload: true });
            const storedLocale = await getItem('locale');
            this.currentLocale = storedLocale ? storedLocale.replace(/"/g, '') : 'en';

            // Show dialog immediately without waiting for network requests
            this.$refs.license_management_dialog.showModal();
            this.$refs.license_management_dialog.addEventListener('close', () => {
                this.close();
            })
            this.orderPaymentHandled = false;

            // Load data asynchronously in the background
            if (this.whitelabelConfig.enablePay) {
                // Execute all network requests in parallel
                Promise.all([
                    this.getStripePriceTableInfo(),
                    this.getOrder(),
                    this.getCryptoPaymentMethods()
                ]).catch(err => {
                    console.error('Error loading payment data:', err);
                });
            }
        },

        async getCryptoPaymentMethods() {
            // Only fetch if not already cached
            if (this.cryptoPaymentMethods !== null) {
                return;
            }

            try {
                const res = await this.$service.get_crypto_payment_methods();

                if (res.code !== 0) {
                    console.error('Failed to load crypto payment methods:', res.data);
                    this.cryptoPaymentMethods = [];
                } else {
                    const data = JSON.parse(res.data);
                    this.cryptoPaymentMethods = data || [];
                    console.log('Loaded crypto payment methods:', this.cryptoPaymentMethods);
                }
            } catch (err) {
                console.error('Error loading crypto payment methods:', err);
                this.cryptoPaymentMethods = [];
            }
        },

        async close() {
            console.log('Closing License Management Dialog');
            clearInterval(this.interval);
            this.interval = null;
            this.order = null;
            this.orderPaymentHandled = false;
            this.$refs.license_management_dialog.close();
            this.cryptoPaymentMethods = null; // Clear cached crypto payment methods
            this.cryptoPaymentContext = null; // Clear context
        },

        // 显示加密货币选择器
        showCryptoSelector(amount, planId, planInterval) {
            // 保存上下文信息，以便在选择支付方式后使用
            this.cryptoPaymentContext = { amount, planId, planInterval };
            this.$refs.cryptoSelectorDialog.showModal();
        },

        // 隐藏加密货币选择器
        hideCryptoSelector() {
            this.$refs.cryptoSelectorDialog.close();
            this.cryptoPaymentContext = null;
        },

        // 处理加密货币支付方式选择
        handleCryptoPaymentSelected(payment) {
            if (!this.cryptoPaymentContext) {
                console.error('Crypto payment context missing. Please try selecting the payment method again.');
                return;
            }

            const { amount, planId, planInterval } = this.cryptoPaymentContext;
            this.hideCryptoSelector();
            
            // 调用 orderMixin 中的 createOrder 方法
            this.createOrder(amount, planId, planInterval, payment.network, payment);
        }
    }
}
</script>

<style scoped>
/* 导入许可证管理对话框专用样式 */
@import './styles/license-management-dialog.css';
</style>
