<template>
    <div class="container pt-4">
        <h2 class="text-center mb-4">Efficom - RealTime Chat - Mqtt</h2>

        <div class="row" v-if="mqttConnected">
            <div class="col">
                <div class="card shadow rounded max-vh-80 h-100" id="cardChats">
                    <div class="card-header">
                        Channels
                    </div>

                    <div class="card-body">
                        <div class="d-flex align-items-start">
                            <ChannelTabs :channels="channels" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <UserInfo :username="username" />

                <ConnectedUsers :connected-users="connectedUsers" :current-user-name="username" class="mt-4" />

                <InvitationsSystem :invitations="invitations" class="mt-4" />
            </div>
        </div>

        <div class="row" v-else>
            <p class="text-center">Connexion avec HiveMQ en cours ...</p>
        </div>
    </div>

    <!-- Modal New Channel -->
    <div class="modal fade" id="newChannelModal" tabindex="-1" aria-labelledby="newChannelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newChannelModalLabel">Connexion à un nouveau Channel</h5>
                </div>

                <div class="modal-body">
                    <label for="newChannelName" class="form-label">Nom du channel :</label>
                    <input type="text" id="newChannelName" class="form-control" aria-describedby="newChannelNameHelpBlock">
                    <div id="newChannelNameHelpBlock" class="form-text">
                        Si le channel n'existe pas il sera automatiquement créé.
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-sm btn-success" data-bs-dismiss="modal" @click="connectionNewChannel">Confirmer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Inviation Channel -->
    <div class="modal fade" id="inviteChannelModal" tabindex="-1" aria-labelledby="inviteChannelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="inviteChannelModalLabel">Inviter un utilisateur</h5>
                </div>

                <div class="modal-body">
                    <label for="inviteChannelSelect" class="form-label">Utilisateur :</label>
                    <select id="inviteChannelSelect" class="form-select" aria-describedby="inviteChannelNameHelpBlock" v-model="selectedInvitedUser">
                        <option v-bind:key="user.id" v-for="user in this.connectedUsers" :value="user.username">{{ user.username }}</option>
                    </select>
                    <div id="inviteChannelNameHelpBlock" class="form-text">
                        Utilisateur.
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-sm btn-success" data-bs-dismiss="modal" @click="inviteUserToChannel">Inviter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChannelTabs from './ChannelTabs.vue';
import UserInfo from './UserInfo.vue';
import ConnectedUsers from './ConnectedUsers.vue';
import InvitationsSystem from "./InvitationsSystem.vue";
import mqttService from "@/services/mqttService";

export default {
    name: 'MainPage',
    components: {
        ChannelTabs,
        UserInfo,
        ConnectedUsers,
        InvitationsSystem
    },
    props: ['username'],
    data() {
        return {
            mqttConnected: false,
            connectedUsers: [],
            channels: [
                {
                    id: new Date().getTime(),
                    label: 'Général',
                    topic: 'public/Général',
                    messages: [],
                    allowInvitations: false,
                    allowDisconnection: false,
                    isPrivateChannel: false,
                },
                {
                    id: new Date().getTime() + 1,
                    label: 'Test',
                    topic: 'public/Test',
                    messages: [],
                    allowInvitations: true,
                    allowDisconnection: true,
                    isPrivateChannel: false,
                }
            ],
            selectedInvitedChannel: null,
            selectedInvitedUser: null,
            invitations: [],
        };
    },
    mounted() {
        const clientId = "clientId-" + new Date().getTime();

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
            } else if (message.destinationName === "invitations/" + this.username) {
                this.invitations.push({
                    id: new Date().getTime(),
                    sendBy: data.username,
                    invitedTo: data.invitedTo,
                });
            } else if (message.destinationName === "mp/invite/" + this.username) {
                this.connectToChannel(this.username + "/" + data.username, true);
            } else {
                let channel = this.channels.find((element) => {
                    return element.topic === (message.destinationName)
                })

                channel.messages.push(data);
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
    methods: {
        userConnected(data) {
            this.mqttConnected = true;

            if (data.isUserListResponse && data.clientId === mqttService.clientId) {
                return;
            }

            if (!this.connectedUsers.find((user) => user.username === data.username) && data.username !== this.username) {
                this.connectedUsers.push(data);
            }
        },

        userDisconnected(data) {
            this.connectedUsers = this.connectedUsers.filter((user) => user.username !== data.username);
        },

        connectionNewChannel() {
            let channelName = document.getElementById("newChannelName").value;

            if (channelName.trim() !== "") {
                this.connectToChannel(channelName)
            }
        },

        connectToChannel(channelName, isPrivateChannel = false) {
            const newChannel = {
                id: new Date().getTime(),
                label: channelName,
                topic: (isPrivateChannel ? "private/" : "public/") + channelName,
                messages: [],
                allowInvitations: true,
                allowDisconnection: true,
                isPrivateChannel: isPrivateChannel,
            }

            console.log(newChannel);
            this.channels.push(newChannel);
        },

        disconnectOfChannel(channel) {
            let index = this.channels.findIndex((element) => {return element.id === channel.id});
            this.channels.splice(index, 1);
        },

        setTopicInviteModal(channel) {
            this.selectedInvitedChannel = channel;
        },

        inviteUserToChannel() {
            mqttService.publish("invitations/" + this.selectedInvitedUser, { invitedTo: this.selectedInvitedChannel.topic });
        },

        removeInvitation(invitation) {
            let index = this.invitations.findIndex((element) => {return element.id === invitation.id})
            this.invitations.splice(index, 1);
        },

        checkIfChannelExist(channelName) {
            return this.channels.findIndex((element) => {return element.topic === channelName})!== -1;
        },

        disconnect() {
            // MQTT
            mqttService.publish("users/disconnected", {username: this.username,});

            // Session Storage
            let users = JSON.parse(sessionStorage.getItem('users'));

            let index = users.findIndex((user) => user === this.username)
            users.splice(index, 1);
            sessionStorage.setItem('users', JSON.stringify(users));

            this.$router.push({ name: "UserLogin" });
        }
    }
}
</script>

<style scoped>
.max-vh-80 {
    max-height: 80vh;
}
</style>
