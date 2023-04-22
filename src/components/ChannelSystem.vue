<template>
    <!-- Crée un onglet pour chaque channel -->
    <div :class="'tab-pane fade  ' + (index === 0 ? 'show active' : '')" :id="'channel-' + channel.id"
         role="tabpanel" :aria-labelledby="'tabs-channel-' + channel.id">

        <!-- Composant pour l'affichage du chat -->
        <ChatDisplay :messages="channel.messages" />

        <hr>

        <!-- Composant pour l'envoi de messages -->
        <div class="row" id="chatInput">
            <div class="col">
                <MessageInput :topic="channel.topic" />
            </div>
        </div>

        <!-- Affichage des informations et boutons d'action du channel -->
        <div class="row mt-3">
            <div class="col">
                <h6>
                    <!-- Affiche une icône de cadenas ouvert si le channel n'est pas privé, sinon affiche une icône de cadenas fermé -->
                    <font-awesome-icon :icon="['fas', 'lock-open']" class="text-success d-inline"  v-if="!channel.isPrivateChannel"/>
                    <font-awesome-icon :icon="['fas', 'lock']" class="text-danger d-inline" v-else />
                    <!-- Affiche le type de channel (privé ou public) et le nom du channel -->
                    Channel {{ channel.isPrivateChannel ? "privé" : "publique" }} : {{ channel.label }}
                </h6>
            </div>

            <!-- Boutons d'action du channel -->
            <div class="col text-end">
                <!-- Bouton pour inviter des utilisateurs au channel (si les invitations sont autorisées et le channel n'est pas privé) -->
                <button v-if="channel.allowInvitations && !channel.isPrivateChannel" type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#inviteChannelModal" @click="setTopicInviteModal"><font-awesome-icon :icon="['fas', 'user-plus']" /> Inviter</button>
                <!-- Bouton pour quitter le channel (si la déconnexion est autorisée) -->
                <button v-if="channel.allowDisconnection" type="button" class="btn btn-sm btn-danger ms-2" @click="disconnectOfChannel">Quitter le channel</button>
            </div>
        </div>
    </div>
</template>

<script>
import ChatDisplay from "@/components/ChatDisplay.vue";
import MessageInput from "@/components/MessageInput.vue";
import mqttService from "@/services/mqttService";

export default {
    name: "ChannelSystem",
    components: { MessageInput, ChatDisplay },
    props: ['index', 'channel', 'userName'],
    data() {
        return {
            topic: this.channel.topic,
        };
    },
    mounted() {
        // S'abonne au topic MQTT lors de la connexion au channel
        mqttService.subscribe(this.topic);
        mqttService.publish(this.topic, {isJoinMessage: true, message: this.userName + " s'est connecté dans le channel"});
    },
    beforeUnmount() {
        // Se désabonne du topic MQTT lors de la déconnexion du channel
        mqttService.publish(this.topic, {isLeaveMessage: true, message: this.userName + " s'est déconnecté du channel"});
        mqttService.unsubscribe(this.topic);
    },
    methods: {
        // Émet un événement pour définir le channel actif pour l'invitation
        setTopicInviteModal() {
            this.$emit('setTopicInviteModal', this.channel);
        },

        // Émet un événement pour se déconnecter du channel
        disconnectOfChannel() {
            this.$emit('disconnectOfChannel', this.channel);
        }
    }
};
</script>

<style scoped>

</style>
