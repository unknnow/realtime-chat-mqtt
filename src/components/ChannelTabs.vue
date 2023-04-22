<template>
    <!-- Crée une liste verticale d'onglets pour les channels -->
    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <!-- Crée un bouton d'onglet pour chaque channel -->
        <button v-bind:key="channel.id" v-for="(channel, index) in channels"
                :class="'nav-link ' + (index === 0 ? 'active' : '')" :id="'tabs-channel-' + channel.id"
                data-bs-toggle="pill" :data-bs-target="'#channel-' + channel.id"
                type="button" role="tab" :aria-controls="'channel-' + channel.id" aria-selected="false">
            <div class="d-flex align-items-center">
                <!-- Affiche une icône de cadenas ouvert si le channel n'est pas privé, sinon affiche une icône de cadenas fermé -->
                <font-awesome-icon :icon="['fas', 'lock-open']" class="text-success d-inline me-2"  v-if="!channel.isPrivateChannel"/>
                <font-awesome-icon :icon="['fas', 'lock']" class="text-danger d-inline me-2" v-else />
                <!-- Affiche le nom du channel -->
                <span>{{ channel.label }}</span>
            </div>
        </button>

        <!-- Bouton pour ajouter un nouveau channel -->
        <button type="button" class="btn btn-sm btn-secondary mt-4" data-bs-toggle="modal" data-bs-target="#newChannelModal">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
    </div>

    <!-- Contenu des onglets pour les channels -->
    <div class="tab-content ms-4 w-100" id="v-pills-tabContent">
        <!-- Charge le composant ChannelSystem pour chaque channel -->
        <ChannelSystem
            v-bind:key="channel.id" v-for="(channel, index) in channels" :index="index" :channel="channel" :user-name="this.userName"
            @setTopicInviteModal="setTopicInviteModal" @disconnectOfChannel="disconnectOfChannel"
        ></ChannelSystem>
    </div>
</template>

<script>
import ChannelSystem from "@/components/ChannelSystem.vue";

export default {
    name: 'ChannelTabs',
    components: {ChannelSystem},
    props: ['channels', 'userName'],
    methods: {
        // Émet un événement pour SET le topic du channel dans le modal d'invitation
        setTopicInviteModal(channel) {
            this.$emit('setTopicInviteModal', channel);
        },

        // Émet un événement pour se déconnecter d'un channel
        disconnectOfChannel(channel) {
            this.$emit('disconnectOfChannel', channel);
        },
    }
}
</script>
