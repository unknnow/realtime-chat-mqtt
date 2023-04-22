<template>
    <!-- Affiche la liste des messages si elle n'est pas vide -->
    <ul v-if="messages.length > 0" class="list-inline" style="max-height: 55vh; overflow-y: auto;">
        <!-- Boucle sur chaque message dans 'messages' -->
        <li class="m-1" v-bind:key="message.id" v-for="message in messages">
            <!-- Si le message est de type spécial (par exemple, un message de connexion/déconnexion), affiche le texte en italique et en gris -->
            <span v-if="message.specialMessageType" class="text-secondary fst-italic">{{ message.message }}</span>
            <!-- Sinon, affiche le nom d'utilisateur en gras suivi du message -->
            <span v-else><span class="fw-bold">{{ message.username }}</span> : {{ message.message }}</span>
        </li>
    </ul>
    <!-- Affiche un message indiquant qu'il n'y a pas de messages sur le channel si la liste des messages est vide -->
    <p v-else class="fst-italic text-center text-secondary">Aucun message sur ce channel</p>
</template>

<script>
export default {
    name: 'ChatDisplay',
    // Définit la propriété 'messages' pour recevoir la liste des messages du channel
    props: ['messages'],
}
</script>
