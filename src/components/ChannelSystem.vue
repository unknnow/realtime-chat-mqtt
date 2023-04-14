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
    mounted() {
        mqttService.subscribe("chats/" + this.channel.topic);
    },
    beforeUnmount() {
        mqttService.unsubscribe("chats/" + this.channel.topic);
    },
};
</script>

<style scoped>

</style>
