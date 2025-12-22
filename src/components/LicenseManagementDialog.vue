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
        LicenseMigrationDialog
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
            await this.$emiter('LICENSE', { reload: true });
            const storedLocale = await getItem('locale');
            this.currentLocale = storedLocale ? storedLocale.replace(/"/g, '') : 'en';
            this.$refs.license_management_dialog.showModal();
            this.orderPaymentHandled = false;
            if (this.whitelabelConfig.enablePay) {
                await this.getStripePriceTableInfo();
                await this.getOrder();
            }
        },

        async close() {
            clearInterval(this.interval);
            this.interval = null;
            this.order = null;
            this.orderPaymentHandled = false;
            this.$refs.license_management_dialog.close();
        }
    }
}
</script>

<style scoped>
/* 导入许可证管理对话框专用样式 */
@import './styles/license-management-dialog.css';
</style>
