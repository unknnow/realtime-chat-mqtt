<template>
    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button v-bind:key="channel.id" v-for="(channel, index) in channels"
            :class="'nav-link ' + (index === 0 ? 'active' : '')" :id="'tabs-channel-' + channel.id"
            data-bs-toggle="pill" :data-bs-target="'#channel-' + channel.id"
            type="button" role="tab" :aria-controls="'channel-' + channel.id" aria-selected="false">
            {{ channel.label }}
        </button>

        <button type="button" class="btn btn-sm btn-secondary mt-4" data-bs-toggle="modal" data-bs-target="#newChannelModal">
            &plus;
        </button>
    </div>

    <div class="tab-content ms-4 w-100" id="v-pills-tabContent">
        <ChannelSystem v-bind:key="channel.id" v-for="(channel, index) in channels" :index="index" :channel="channel"></ChannelSystem>
    </div>
</template>

<script>
import ChannelSystem from "@/components/ChannelSystem.vue";

export default {
    name: 'ChannelTabs',
    components: {ChannelSystem},
    props: ['channels'],
    methods: {
        setTopicInviteModal(channel) {
            this.$parent.setTopicInviteModal(channel);
        },

        disconnectOfChannel(channel) {
            this.$parent.disconnectOfChannel(channel);
        },
    }
}
</script>
