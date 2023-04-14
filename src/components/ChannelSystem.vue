<template>
    <div :class="'tab-pane fade  ' + (index === 0 ? 'show active' : '')" :id="'channel-' + channel.id"
         role="tabpanel" :aria-labelledby="'tabs-channel-' + channel.id">

        <ChatDisplay :channel="channel" />

        <hr>

        <div class="row" id="chatInput">
            <div class="col">
                <MessageInput :channel="channel" />
            </div>
        </div>
    </div>
</template>

<script>
import ChatDisplay from "@/components/ChatDisplay.vue";
import MessageInput from "@/components/MessageInput.vue";

export default {
    name: "ChannelSystem",
    components: {MessageInput, ChatDisplay},
    props: ['index', 'channel'],
}
</script>

<style scoped>

</style>
