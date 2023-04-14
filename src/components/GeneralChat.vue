<template>
    <div class="general-chat container">
        <h1>Welcome, {{ username }}!</h1>
        <h1 class="text-center">General Chat</h1>
        <ChatChannel />
    </div>
</template>

<script>
import ChatChannel from "@/components/ChatChannel.vue";

export default {
    name: "GeneralChat",
    props: ['username'],
    components: {
        ChatChannel,
    },
    mounted() {
        console.log(this.username);
    },
};
</script>

<style scoped>
/* Styles pour le chat général */
</style>


