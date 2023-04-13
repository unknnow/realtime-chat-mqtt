<template>
    <div class="login container">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="submitForm" class="mt-5">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" id="username" v-model="username" required class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "UserLogin",
    data() {
        return {
            username: "",
        };
    },
    methods: {
        submitForm() {
            this.$router.push({ name: "GeneralChat", params: { username: this.username } });
        },
    },
};
</script>

<style scoped>
.login {
    /* Styles pour le formulaire de connexion */
}
</style>
