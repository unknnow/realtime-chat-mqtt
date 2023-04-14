<template>
    <div class="general-chat container">
        <h5>Utilisateur: {{ username }}</h5>
        <h1 class="text-center">General Chat</h1>
        <ChatChannel />
    </div>
</template>

<script>
import ChatChannel from "@/components/ChatChannel.vue";
import mqttService from "@/services/mqttService";

export default {
    name: "GeneralChat",
    props: ['username'],
    components: {
        ChatChannel,
    },
    data() {
        return {
            connectedUsers: [],
        };
    },
    methods: {
        userConnected(data) {
            if (data.isUserListResponse && data.clientId === mqttService.clientId) {
                return;
            }

            if (!this.connectedUsers.find((user) => user.clientId === data.clientId)) {
                this.connectedUsers.push(data);
            }
        },

        userDisconnected(data) {
            this.connectedUsers = this.connectedUsers.filter((user) => user.clientId !== data.clientId);
        },
    },
    mounted() {
        const clientId = "clientId-" + new Date().getTime();
        console.log(clientId);

        const onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        };

        const onMessageArrived = (message) => {
            const data = JSON.parse(message.payloadString);

            if (message.destinationName === "users/connected") {
                this.userConnected(data);
            } else if (message.destinationName === "users/disconnected") {
                this.userDisconnected(data);
            } else if (message.destinationName === "users/list") {
                mqttService.publish("users/connected", {
                    username: this.username,
                    clientId: mqttService.clientId,
                    isUserListResponse: true,
                });
            }
        };

        mqttService.connect(
            clientId,
            this.username,
            onConnectionLost,
            onMessageArrived,
            this.userConnected,
            this.userDisconnected
        );
    },
    beforeUnmount() {
        const data = {
            username: this.username,
            clientId: this.username,
        };

        mqttService.publish("users/disconnected", data);
        mqttService.disconnect();
    }
};
</script>

<style scoped>
/* Styles pour le chat général */
</style>


