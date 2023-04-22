<template>
    <div class="card shadow rounded">
        <!-- En-tête de la carte contenant l'icône de l'utilisateur et le titre -->
        <div class="card-header">
            <font-awesome-icon :icon="['fas', 'user']" /> Compte actuel
        </div>

        <!-- Corps de la carte avec le nom d'utilisateur et le bouton de déconnexion -->
        <div class="card-body text-center">
            <p>Nom d'utilisateur : <span class="fw-bold">{{ username }}</span></p>
            <button class="btn btn-sm btn-danger" @click="disconnect">Déconnexion</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: ['username'],
    methods: {
        // Méthode pour émettre l'événement de déconnexion lors du clic sur le bouton
        disconnect() {
            this.$emit('disconnect');
        }
    }
}
</script>
