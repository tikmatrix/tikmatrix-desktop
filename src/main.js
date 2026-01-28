import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import * as service from './service';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* add some free styles */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
/* add icons to the library */
library.add(fas, fab);
import { i18n, loadLocaleAsync } from './i18n/index';
import VueDragSelect from '@coleqiu/vue-drag-select';
import VueDraggableResizable from 'vue-draggable-resizable';
import { emit, listen } from '@tauri-apps/api/event';
import { initWhiteLabel } from './utils/whiteLabelHelpers.js';
import { initStorage, getItem } from './utils/storage.js';

async function bootstrap() {
    try {
        await initStorage();
        const whitelabelConfig = await initWhiteLabel();

        const app = createApp(App);
        app.use(i18n);
        app.use(VueDragSelect);

        // 全局错误处理器，捕获Vue组件中的错误
        app.config.errorHandler = (err, vm, info) => {
            console.error('Vue错误:', err);
            console.error('错误信息:', info);
            console.error('错误堆栈:', err.stack);
            emit('NOTIFY', {
                type: 'error',
                message: `Vue Error: ${err.message}, Info: ${info}`,
                timeout: 2000
            });
        };

        // 全局属性配置
        app.config.globalProperties.$service = service;
        app.config.globalProperties.$emiter = emit;
        app.config.globalProperties.$listen = listen;
        app.config.globalProperties.$whitelabel = whitelabelConfig;
        app.component('font-awesome-icon', FontAwesomeIcon);
        app.component('vue-draggable-resizable', VueDraggableResizable);
        
        // Mount app immediately without waiting for locale
        app.mount('#app');

        // Load saved locale asynchronously after mount (non-blocking)
        const storedLocale = await getItem('locale');
        if (storedLocale) {
            const sanitizedLocale = String(storedLocale).replace(/"/g, '').trim();
            if (sanitizedLocale && sanitizedLocale !== 'en') {
                loadLocaleAsync(sanitizedLocale);
            }
        }

        // 捕获未被Vue捕获的全局JS错误
        window.onerror = function (message, source, lineno, colno, error) {
            console.error('全局JS错误:', error);
            emit('NOTIFY', {
                type: 'error',
                message: `Global JS Error: ${message}, Source: ${source}, Line: ${lineno}, Column: ${colno}, Error: ${error}`,
                timeout: 2000
            });
        };

        // 捕获未处理的Promise错误
        window.addEventListener('unhandledrejection', event => {
            console.error('未处理的Promise错误:', event.reason);
            emit('NOTIFY', {
                type: 'error',
                message: `Unhandled Promise Error: ${event.reason?.message || 'Unknown Promise Error'}`,
                timeout: 2000
            });
        });
    } catch (error) {
        console.error('应用初始化失败:', error);
    }
}

bootstrap();
