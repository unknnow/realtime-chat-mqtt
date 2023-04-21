<template>
    <div :class="'tab-pane fade  ' + (index === 0 ? 'show active' : '')" :id="'channel-' + channel.id"
         role="tabpanel" :aria-labelledby="'tabs-channel-' + channel.id">

        <ChatDisplay :messages="channel.messages" />

        <hr>

        <div class="row" id="chatInput">
            <div class="col">
                <MessageInput :topic="channel.topic" />
            </div>
        </div>

        <div class="row mt-3">
            <div class="col">
                <h6>Channel {{ channel.isPrivateChannel ? "privé" : "publique" }} : {{ channel.label }}</h6>
            </div>

            <div class="col text-end">
                <button v-if="channel.allowInvitations && !channel.isPrivateChannel" type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#inviteChannelModal" @click="setTopicInviteModal">Inviter</button>
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
    props: ['index', 'channel'],
    data() {
        return {
            topic: this.channel.topic,
        };
    },
    mounted() {
        mqttService.subscribe(this.topic);
    },
    beforeUnmount() {
        mqttService.unsubscribe(this.topic);
    },
    methods: {
        setTopicInviteModal() {
            this.$parent.setTopicInviteModal(this.channel);
        },

        disconnectOfChannel() {
            this.$parent.disconnectOfChannel(this.channel);
        }
    }
};
</script>

<style scoped>

</style>
