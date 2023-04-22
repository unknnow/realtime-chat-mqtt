<template>
    <!-- Carte contenant les invitations -->
    <div class="card shadow rounded">
        <div class="card-header">
            <font-awesome-icon :icon="['fas', 'envelope']" /> Liste des invitations
        </div>

        <div class="card-body">
            <!-- Liste des invitations, avec défilement vertical si nécessaire -->
            <ul v-if="invitations.length > 0" style="max-height: 50vh; overflow-y: auto;">
                <!-- Affiche une ligne pour chaque invitation -->
                <li v-bind:key="invitation.id" v-for="invitation in invitations">
                    Vous avez était invité à rejoindre le channel <span class="fw-bold">{{ invitation.invitedTo }}</span> par <span class="fw-bold">{{ invitation.sendBy }}</span>
                    <!-- Bouton pour accepter l'invitation -->
                    <button class="btn btn-sm btn-success me-2" @click="connectToChannel(invitation)">Accepter</button>
                    <!-- Bouton pour refuser l'invitation -->
                    <button class="btn btn-sm btn-danger" @click="removeInvitation(invitation)">Refuser</button>
                </li>
            </ul>
            <!-- Message affiché si aucune invitation -->
            <p v-else class="fst-italic text-center text-secondary">Aucune invitations</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InvitationsSystem',
    props: ['invitations'],
    methods: {
        // Méthode pour accepter l'invitation et se connecter au channel
        connectToChannel(invitation) {
            this.$emit('connectToChannel', invitation.invitedTo);
            this.removeInvitation(invitation);
        },

        // Méthode pour refuser l'invitation et la supprimer de la liste
        removeInvitation(invitation) {
            this.$emit('removeInvitation', invitation);
        }
    }
}
</script>
