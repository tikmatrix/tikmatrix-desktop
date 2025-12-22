<template>
    <div class="bg-base-100 rounded-lg shadow-md p-3 border border-base-300">
        <div class="flex items-center justify-center">
            <div class="form-control">
                <label class="label cursor-pointer flex items-center gap-2">
                    <input type="checkbox" id="agreePolicy" :checked="modelValue"
                        @change="$emit('update:modelValue', $event.target.checked)"
                        class="checkbox checkbox-primary checkbox-md" />
                    <span class="label-text text-md">
                        {{ $t('iAgreeWith') }}
                        <a v-if="whitelabelConfig.showOfficialWebsite && whitelabelConfig.officialWebsite" :href="whitelabelConfig.officialWebsite + '/privacy-policy'" target="_blank"
                            class="link link-primary font-medium hover:link-hover transition-all duration-200">
                            {{ $t('privacyPolicy') }}
                        </a>
                        <span v-else>{{ $t('privacyPolicy') }}</span>
                        {{ $t('and') }}
                        <a v-if="whitelabelConfig.showOfficialWebsite && whitelabelConfig.officialWebsite" :href="whitelabelConfig.officialWebsite + '/terms-of-service'" target="_blank"
                            class="link link-primary font-medium hover:link-hover transition-all duration-200">
                            {{ $t('termsOfService') }}
                        </a>
                        <span v-else>{{ $t('termsOfService') }}</span>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { getWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../../config/whitelabel.js';
export default {
    name: 'PrivacyAgreement',
    props: {
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            whitelabelConfig: cloneDefaultWhiteLabelConfig(),
        }
    },
    async created() {
        const config = await getWhiteLabelConfig();
        if (config) {
            this.whitelabelConfig = config;
        }
    }
}
</script>
