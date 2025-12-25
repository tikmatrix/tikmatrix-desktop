// 订单相关的业务逻辑混入
import QRCode from 'qrcode';
import { message } from '@tauri-apps/api/dialog';

export default {
    methods: {
        async getStripePriceTableInfo() {
            if (!this.license.mid) {
                return;
            }

            if (typeof this.isLoadingPriceTable !== 'undefined') {
                this.isLoadingPriceTable = true;
            }

            try {
                const res = await this.$service.get_stripe_price_table_info();

                if (res.code !== 0) {
                    console.log('get stripe price table info failed:', res.data);
                    this.order = null;
                } else {
                    console.log('get stripe price table info:', res.data);
                    this.priceTableInfo = JSON.parse(res.data);
                }
            } catch (err) {
                console.error('get_stripe_price_table_info error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('getStripePriceTableInfoErrorMessage'),
                    timeout: 2000
                });
            } finally {
                if (typeof this.isLoadingPriceTable !== 'undefined') {
                    this.isLoadingPriceTable = false;
                }
            }
        },

        async getOrder() {
            if (!this.license.mid) {
                return;
            }

            if (typeof this.isLoadingOrder !== 'undefined') {
                this.isLoadingOrder = true;
            }

            try {
                const res = await this.$service.get_order();

                if (res.code !== 0) {
                    console.log('get order failed:', res.data);
                    this.order = null;
                } else {
                    console.log('get order:', res.data);
                    await this.showOrder(res.data);
                }
            } catch (err) {
                console.error('get_order error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('getOrderErrorMessage'),
                    timeout: 2000
                });
            } finally {
                if (typeof this.isLoadingOrder !== 'undefined') {
                    this.isLoadingOrder = false;
                }
            }
        },

        async showOrder(order) {
            const parsedOrder = JSON.parse(order);
            this.orderPaymentHandled = false;
            console.log('showOrder:', parsedOrder);

            if (parsedOrder.status !== 0) {
                console.log('order status is not 0');
                this.order = null;
                return;
            }

            if (this.interval) {
                clearInterval(this.interval);
            }

            let qrCodeData = '';
            if (parsedOrder.to_address) {
                try {
                    qrCodeData = await QRCode.toDataURL(parsedOrder.to_address);
                } catch (error) {
                    console.error('generate qrcode error:', error);
                }
            }
            parsedOrder.qrcode = qrCodeData;

            this.order = parsedOrder;

            const expireAt = this.parseExpireAt(parsedOrder.expire_at);
            if (Number.isNaN(expireAt)) {
                console.warn(`Invalid expire_at received: ${parsedOrder.expire_at}`);
                this.remainingTime = 0;
                return;
            }

            const now = new Date().getTime();
            this.remainingTime = Math.floor((expireAt - now) / 1000);
            this.interval = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime = Math.max(this.remainingTime - 1, 0);
                    return;
                }

                this.remainingTime = 0;
                clearInterval(this.interval);
                this.interval = null;
                this.order = null;
                this.orderPaymentHandled = false;
            }, 1000);
        },

        async closeOrder() {
            try {
                const res = await this.$service.close_order({});
                console.log(`close_order: ${JSON.stringify(res)}`);

                clearInterval(this.interval);
                this.interval = null;
                this.order = null;
                this.orderPaymentHandled = false;
                this.remainingTime = 0;
            } catch (err) {
                console.error('close_order error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('closeOrderErrorMessage'),
                    timeout: 2000
                });
            }
        },

        async handlePaymentStatusEvent(event = {}) {
            if (typeof this.orderPaymentHandled !== 'boolean') {
                this.orderPaymentHandled = false;
            }
            const rawStatus = event?.status;
            const normalizedStatus = typeof rawStatus === 'string'
                ? rawStatus.toLowerCase()
                : rawStatus;
            const isPaid = normalizedStatus === 1 || normalizedStatus === '1'
                || normalizedStatus === 'paid'
                || normalizedStatus === 'success'
                || normalizedStatus === 'completed';

            if (!isPaid) {
                return;
            }

            if (this.orderPaymentHandled) {
                return;
            }

            this.orderPaymentHandled = true;

            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }

            this.order = null;
            this.remainingTime = 0;

            await this.$emiter('LICENSE', { reload: true });

            if (typeof this.paymentSuccess === 'function') {
                await this.paymentSuccess();
            }

            await message(this.$t('paymentSuccess'));
        },

        parseExpireAt(expireAt) {
            if (expireAt === null || expireAt === undefined) {
                return NaN;
            }

            if (typeof expireAt === 'number') {
                if (!Number.isFinite(expireAt)) {
                    return NaN;
                }

                // Support both second and millisecond precision timestamps.
                return expireAt > 1e12 ? expireAt : expireAt * 1000;
            }

            const expireAtString = String(expireAt);
            if (!expireAtString.trim()) {
                return NaN;
            }

            const attempts = new Set();
            attempts.add(expireAtString);

            const normalized = expireAtString.includes(' ')
                ? expireAtString.replace(' ', 'T')
                : expireAtString;
            attempts.add(normalized);

            const timezonePattern = /([zZ])|([+-]\d{2}:?\d{2})$/;
            if (!timezonePattern.test(normalized)) {
                attempts.add(`${normalized}Z`);
            }

            for (const attempt of attempts) {
                const parsed = Date.parse(attempt);
                if (!Number.isNaN(parsed)) {
                    return parsed;
                }
            }

            console.warn(`Unable to parse expire_at value: ${expireAt}`);
            return NaN;
        }
    }
};
