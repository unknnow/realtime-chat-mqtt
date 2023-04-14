<template>
    <div class="container pt-4">
        <h2 class="text-center mb-4">Efficom - RealTime Chat - Mqtt</h2>

        <div class="row">
            <div class="col">
                <div class="card shadow rounded max-vh-80 h-100" id="cardChats">
                    <div class="card-header">
                        Channels
                    </div>

                    <div class="card-body">
                        <div class="d-flex align-items-start">
                            <ChannelTabs />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <UserInfo :username="username" />

                <ConnectedUsers class="mt-4" />
            </div>
        </div>
    </div>
</template>

<script>
import ChannelTabs from './ChannelTabs.vue';
import UserInfo from './UserInfo.vue';
import ConnectedUsers from './ConnectedUsers.vue';
import mqttService from "@/services/mqttService";

export default {
    name: 'MainPage',
    components: {
        ChannelTabs,
        UserInfo,
        ConnectedUsers
    },
    props: ['username'],
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
}
</script>

<style scoped>
.max-vh-80 {
    max-height: 80vh;
}
</style>
