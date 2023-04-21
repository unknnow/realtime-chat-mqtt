<template>
    <div class="card shadow rounded">
        <div class="card-header">
            Liste des invitations
        </div>

        <div class="card-body">
            <ul v-if="invitations.length > 0" style="max-height: 50vh; overflow-y: auto;">
                <li v-bind:key="invitation.id" v-for="invitation in invitations">
                    Vous avez était invité à rejoindre le channel <span class="fw-bold">{{ invitation.invitedTo }}</span> par <span class="fw-bold">{{ invitation.sendBy }}</span>
                </li>
            </ul>
            <p v-else class="fst-italic text-center text-secondary">Aucune invitations</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'InvitationsSystem',
    props: ['invitations'],
}
</script>
