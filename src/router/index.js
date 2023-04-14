import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import MainPage from "@/components/MainPage.vue";

const routes = [
    { path: '/', name: 'UserLogin', component: UserLogin },
    { path: '/main/:username', name: 'MainPage', component: MainPage, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
