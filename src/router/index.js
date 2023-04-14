import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import MainPage from "@/components/MainPage.vue";
import GeneralChat from '../components/GeneralChat.vue';
import PrivateChat from '../components/PrivateChat.vue';
import ChatChannel from '../components/ChatChannel.vue';

const routes = [
    { path: '/', name: 'UserLogin', component: UserLogin },
    { path: '/main', name: 'MainPage', component: MainPage },
    { path: '/general-chat/:username', name: 'GeneralChat', component: GeneralChat, props: true },
    { path: '/private-chat/:username', name: 'PrivateChat', component: PrivateChat, props: true },
    { path: '/chat-channel/:username/:channel', name: 'ChatChannel', component: ChatChannel, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
