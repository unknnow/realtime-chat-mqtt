import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, far, fab);

const app = createApp(App);

// main.js ou index.js
app.directive('no-special-chars', {
    beforeMount(el) {
        el.addEventListener('input', () => {
            const oldValue = el.value;
            const newValue = oldValue.replace(/[^a-zA-Z0-9\s]/g, '');
            if (oldValue !== newValue) {
                el.value = newValue;
                el.dispatchEvent(new Event('input'));
            }
        });
    }
});


app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
