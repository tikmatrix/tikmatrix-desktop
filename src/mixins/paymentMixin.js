// 支付相关的业务逻辑混入
import { writeText } from '@tauri-apps/api/clipboard';
import { message } from '@tauri-apps/api/dialog';
import { open } from '@tauri-apps/api/shell';

export default {
    methods: {
        async createStripeCheckoutUrl(priceId, planInterval) {
            if (!this.agreePolicy) {
                this.$refs.loadingDialogs.showAgreePolicyDialog();
                return;
            }

            this.$refs.loadingDialogs.showCreateOrderLoadingDialog();

            try {
                const res = await this.$service.get_stripe_checkout_url({
                    price_id: priceId,
                    plan_interval: planInterval
                }); if (res.code !== 0) {
                    await this.$emiter('NOTIFY', {
                        type: 'error',
                        message: res.data,
                        timeout: 2000
                    });
                } else {
                    console.log('get_stripe_checkout_url:', res.data);
                    await open(JSON.parse(res.data));
                }
            } catch (err) {
                console.error('get_stripe_checkout_url error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('getStripeCheckoutUrlErrorMessage'),
                    timeout: 2000
                });
            } finally {
                this.$refs.loadingDialogs.closeCreateOrderLoadingDialog();
            }
        },

        async createAlipayCheckoutUrl(planId, planInterval) {
            if (!this.agreePolicy) {
                this.$refs.loadingDialogs.showAgreePolicyDialog();
                return;
            }

            this.$refs.loadingDialogs.showCreateOrderLoadingDialog();

            try {
                const res = await this.$service.get_alipay_checkout_url({
                    plan_id: planId,
                    plan_interval: planInterval
                });

                if (res.code !== 0) {
                    await this.$emiter('NOTIFY', {
                        type: 'error',
                        message: res.data,
                        timeout: 2000
                    });
                } else {
                    console.log('get_alipay_checkout_url:', res.data);
                    await open(JSON.parse(res.data));
                }
            } catch (err) {
                console.error('get_alipay_checkout_url error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('getAlipayCheckoutUrlErrorMessage'),
                    timeout: 2000
                });
            } finally {
                this.$refs.loadingDialogs.closeCreateOrderLoadingDialog();
            }
        },

        async createOrder(price, planId, planInterval, network, paymentInfo) {
            this.$refs.loadingDialogs.showCreateOrderLoadingDialog(); try {
                // Use payment info if available, otherwise fallback to network only
                const orderData = {
                    network: network,
                    amount: price,
                    plan_id: planId,
                    plan_interval: planInterval
                }
                
                // Add additional payment info if provided
                if (paymentInfo) {
                    if (paymentInfo.chain_id) {
                        orderData.chain_id = paymentInfo.chain_id
                    }
                    if (paymentInfo.contract_address) {
                        orderData.contract_address = paymentInfo.contract_address
                    }
                    if (paymentInfo.token_symbol) {
                        orderData.token_symbol = paymentInfo.token_symbol
                    }
                    if (paymentInfo.token_decimals) {
                        orderData.token_decimals = paymentInfo.token_decimals
                    }
                }
                
                const res = await this.$service.create_order(orderData); if (res.code !== 0) {
                    await message(res.data);
                } else {
                    await this.showOrder(res.data);
                }
            } catch (err) {
                console.error('create_order error:', err);
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('createOrderErrorMessage'),
                    timeout: 2000
                });
            } finally {
                this.$refs.loadingDialogs.closeCreateOrderLoadingDialog();
            }
        },

        async manageStripeSubscription() {
            try {
                this.$refs.loadingDialogs.showManageSubscriptionLoadingDialog();

                const res = await this.$service.get_stripe_portal_url();

                if (res.code === 0) {
                    const portalUrl = JSON.parse(res.data);
                    console.log('portalUrl:', portalUrl);
                    await open(portalUrl);
                } else {
                    await this.$emiter('NOTIFY', {
                        type: 'error',
                        message: res.data,
                        timeout: 2000
                    });
                }
            } catch (error) {
                await this.$emiter('NOTIFY', {
                    type: 'error',
                    message: this.$t('manageSubscriptionErrorMessage'),
                    timeout: 2000
                });
            } finally {
                this.$refs.loadingDialogs.closeManageSubscriptionLoadingDialog();
            }
        },

        async copyText(text) {
            await writeText(text);
            await this.$emiter('NOTIFY', {
                type: 'success',
                message: this.$t('copied'),
                timeout: 2000
            });
        }
    }
};