<template>
    <div class="card shadow rounded">
        <div class="card-header">
            Utilisateurs connecté
        </div>

        <div class="card-body">
            <ul style="max-height: 50vh; overflow-y: auto;">
                <li v-bind:key="user.clientId" v-for="user in connectedUsers">
                    {{ user.username }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConnectedUsers',
    data() {
        return {
            connectedUsers: [{username:"Unknow", clientId: "53456413123"}, {username:"Hugo", clientId: "4127865782"}, {username:"Julien", clientId: "154747324"}],
        };
    },
}
</script>
