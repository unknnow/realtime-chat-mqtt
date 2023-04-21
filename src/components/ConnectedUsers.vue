<template>
    <div class="card shadow rounded">
        <div class="card-header">
            Utilisateurs connecté
        </div>

        <div class="card-body">
            <ul style="max-height: 50vh; overflow-y: auto;">
                <li v-bind:key="user.clientId" v-for="user in connectedUsers">
                    {{ user.username }} <button type="button" class="btn btn-sm btn-primary" @click="openPrivateChannel(user.username)">&rightarrow;</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import mqttService from "@/services/mqttService";

export default {
    name: 'ConnectedUsers',
    props: ['connectedUsers', 'currentUserName'],
    methods: {
        openPrivateChannel(username) {
            if (this.$parent.checkIfChannelExist("private/" + username + "/" + this.currentUserName) || this.$parent.checkIfChannelExist("private/" + this.currentUserName + "/" + username))
                return

            mqttService.publish('mp/invite/' + username, {})
            this.$parent.connectToChannel(username + "/" + this.currentUserName, true);
        }
    }
}
</script>
