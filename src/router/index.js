import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import MainPage from "@/components/MainPage.vue";

// Définit les routes pour l'application
const routes = [
    // Route pour le composant UserLogin | Page de login
    { path: '/', name: 'UserLogin', component: UserLogin },
    // Route pour le composant MainPage avec un paramètre `username` | Page principale
    { path: '/main/:username', name: 'MainPage', component: MainPage, props: true },
];

// Crée le routeur avec l'historique Web et les routes définies
const router = createRouter({
    history: createWebHistory(),
    routes
});

// Exporte le routeur pour l'utiliser dans l'application principale
export default router;
