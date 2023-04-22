<template>
    <!-- Carte contenant la liste des utilisateurs connectés -->
    <div class="card shadow rounded">
        <div class="card-header">
            <font-awesome-icon :icon="['fas', 'users']" /> Utilisateurs connecté
        </div>

        <div class="card-body">
            <!-- Liste des utilisateurs connectés, avec défilement vertical si nécessaire -->
            <ul style="max-height: 50vh; overflow-y: auto;">
                <!-- Affiche une ligne pour chaque utilisateur connecté -->
                <li v-bind:key="user.clientId" v-for="user in connectedUsers">
                    {{ user.username }}
                    <!-- Bouton pour ouvrir un channel privé avec l'utilisateur -->
                    <button type="button" class="btn btn-sm bg-white" title="Ouvrir un channel privé" @click="openPrivateChannel(user.username)">
                        <font-awesome-icon :icon="['fas', 'message']" class="text-primary" />
                    </button>
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
        // Méthode pour ouvrir un channel privé avec un autre utilisateur
        openPrivateChannel(username) {
            // Vérifie si le channel privé existe déjà
            if (this.$parent.checkIfChannelExist("private/" + username + "/" + this.currentUserName) ||
                this.$parent.checkIfChannelExist("private/" + this.currentUserName + "/" + username)) {
                // Envoie un toast pour informer que le channel privé existe déjà
                this.$emit('sendToast', 'info', "Le channel privé avec cette utilisateur existe dèjà");
                return
            }

            // Envoie une invitation à l'utilisateur pour ouvrir un channel privé
            mqttService.publish('mp/invite/' + username, {})
            // Connecte au channel privé
            this.$emit('connectToChannel', username + "/" + this.currentUserName, true);
        }
    }
}
</script>
