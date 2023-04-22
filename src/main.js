// Import les bibliothèques nécessaires
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import les styles et fonctionnalités de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Import les icônes de la bibliothèque FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ajoute les icônes de FontAwesome à la bibliothèque
library.add(fas, far, fab);

// Créer l'instance de l'application Vue
const app = createApp(App);

// Créer une directive personnalisée pour empêcher les caractères spéciaux dans les inputs
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

// Enregistre le composant FontAwesomeIcon pour une utilisation globale
app.component('font-awesome-icon', FontAwesomeIcon);
// Utilise le routeur dans l'application Vue
app.use(router);
// Monte l'application Vue sur l'élément HTML ayant l'ID 'app'
app.mount('#app');
