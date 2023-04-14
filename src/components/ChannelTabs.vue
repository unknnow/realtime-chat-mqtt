<template>
    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button v-bind:key="channel.id" v-for="(channel, index) in channels"
            :class="'nav-link ' + (index === 0 ? 'active' : '')" :id="'tabs-channel-' + channel.id"
            data-bs-toggle="pill" :data-bs-target="'#channel-' + channel.id"
            type="button" role="tab" :aria-controls="'channel-' + channel.id" aria-selected="false">
            {{ channel.topic }}
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
    data() {
        return {
            channels: [{id: 1, topic:"Général"}, {id: 2, topic:"Discord"}, {id: 3, topic:"Boisson"}, {id: 4, topic:"Autre"}],
        };
    },
}
</script>
