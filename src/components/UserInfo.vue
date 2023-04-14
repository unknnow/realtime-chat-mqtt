<template>
    <div class="card shadow rounded">
        <div class="card-header">
            Compte actuel
        </div>

        <div class="card-body text-center">
            <p>Nom d'utilisateur : <span class="fw-bold">{{ username }}</span></p>
            <button class="btn btn-sm btn-danger">Déconnexion</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: ['username']
}
</script>
