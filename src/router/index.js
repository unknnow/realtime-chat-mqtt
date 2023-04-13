import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import GeneralChat from '../components/GeneralChat.vue';
import ChatChannel from '../components/ChatChannel.vue';
import PrivateChat from '../components/PrivateChat.vue';

const routes = [
    { path: '/', component: UserLogin },
    { path: '/chat/:username', name: 'GeneralChat', component: GeneralChat, props: true },
    { path: '/channel/:channelName', component: ChatChannel },
    { path: '/private-chat/:username', component: PrivateChat },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
