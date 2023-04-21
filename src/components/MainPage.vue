<template>
    <ToastSystem ref="toasts"/>

    <div class="container pt-4">
        <h2 class="text-center mb-4">Efficom - RealTime Chat - Mqtt</h2>

        <div class="row" v-if="mqttConnected">
            <div class="col">
                <div class="card shadow rounded max-vh-80 h-100" id="cardChats">
                    <div class="card-header">
                        <font-awesome-icon :icon="['fas', 'list']" /> Channels
                    </div>

                    <div class="card-body">
                        <div class="d-flex align-items-start">
                            <ChannelTabs :channels="channels" :user-name="this.username" ref="ChannelTabs" />
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
    <div class="modal fade" data-bs-backdrop="static" id="newChannelModal" tabindex="-1" aria-labelledby="newChannelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newChannelModalLabel">Connexion à un nouveau Channel</h5>
                </div>

                <div class="modal-body">
                    <label for="newChannelName" class="form-label">Nom du channel :</label>
                    <input type="text" id="newChannelName" class="form-control" aria-describedby="newChannelNameHelpBlock" v-no-special-chars>
                    <div id="newChannelNameHelpBlock" class="form-text">
                        Si le channel n'existe pas il sera automatiquement créé.
                        <br>
                        <span class="text-danger">Les caractères spéciaux ne sont pas autorisés !</span>
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
    <div class="modal fade" data-bs-backdrop="static" id="inviteChannelModal" tabindex="-1" aria-labelledby="inviteChannelModalLabel" aria-hidden="true">
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
                        Liste des utilisateur actuellement connecté.
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
import ToastSystem from "@/components/ToastSystem.vue";

export default {
    name: 'MainPage',
    components: {
        ToastSystem,
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
                this.mqttConnected = false;
                this.sendToast('danger', "La connexion avec HiveMQ à était perdu !");
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

                this.sendToast('info', "Vous avez reçu une nouvelle invitation");
            } else if (message.destinationName === "mp/invite/" + this.username) {
                if (this.checkIfChannelExist("private/" + data.username + "/" + this.username) || this.checkIfChannelExist("private/" + this.username + "/" + data.username))
                    return

                this.connectToChannel(this.username + "/" + data.username, true);
            } else {
                let channel = this.channels.find((element) => {
                    return element.topic === (message.destinationName)
                })

                let additionalData = {specialMessageType: false};
                    // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty("isJoinMessage")) {
                    additionalData.specialMessageType = true;
                    // eslint-disable-next-line no-prototype-builtins
                } else if (data.hasOwnProperty("isLeaveMessage")) {
                    additionalData.specialMessageType = true;
                }

                let mergedData = { ...additionalData, ...data };

                channel.messages.push(mergedData);
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
            if (!this.mqttConnected) {
                this.mqttConnected = true;
                this.sendToast('success', "Connexion à HiveMQ réussi !");
            }

            if (data.isUserListResponse && data.clientId === mqttService.clientId) {
                return;
            }

            if (!this.connectedUsers.find((user) => user.username === data.username) && data.username !== this.username) {
                this.connectedUsers.push(data);
                this.sendToast('info', data.username + " est connecté");
            }
        },

        userDisconnected(data) {
            this.connectedUsers = this.connectedUsers.filter((user) => user.username !== data.username);
            this.sendToast('info', data.username + " s'est déconnecté");
        },

        connectionNewChannel() {
            let channelName = document.getElementById("newChannelName").value;

            if (channelName.trim() !== "") {
                let result = this.channels.find((element) => {return element.label === channelName});

                if (result != null) {
                    this.sendToast('danger', "Vous êtes dèjà connecter à ce channel");
                    return
                }

                document.getElementById("newChannelName").value = "";
                this.connectToChannel(channelName)
            } else {
                this.sendToast('danger', "Le nom du channel ne peut pas être vide !");
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

            this.channels.push(newChannel);
            this.sendToast('success', "Connexion au nouveau channel : " + newChannel.label + " réussi !");
        },

        disconnectOfChannel(channel) {
            let index = this.channels.findIndex((element) => {return element.id === channel.id});
            this.channels.splice(index, 1);
            this.sendToast('success', "Déconnexion du channel : " + channel.label + " réussi !");
        },

        setTopicInviteModal(channel) {
            this.selectedInvitedChannel = channel;
        },

        inviteUserToChannel() {
            if (this.selectedInvitedUser != null && this.selectedInvitedChannel != null) {
                mqttService.publish("invitations/" + this.selectedInvitedUser, { invitedTo: this.selectedInvitedChannel.label });

                this.selectedInvitedUser = null;
                this.selectedInvitedChannel = null;

                this.sendToast('success', "Invitation envoyé !");
            } else {
                this.sendToast('danger', "Veuillez sélectionner un utilisateur !");
            }
        },

        removeInvitation(invitation) {
            let index = this.invitations.findIndex((element) => {return element.id === invitation.id})
            this.invitations.splice(index, 1);
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
        },

        checkIfChannelExist(channelName) {
            return this.channels.findIndex((element) => {return element.topic === channelName})!== -1;
        },

        sendToast(type, message) {
            const toast = {
                type: type,
                message: message,
                autoHide: true,
                delay: 2000
            };

            if (this.$refs.toasts) {
                this.$refs.toasts.addToasts(toast);
            }
        }
    }
}
</script>

<style scoped>
.max-vh-80 {
    max-height: 80vh;
}
</style>
