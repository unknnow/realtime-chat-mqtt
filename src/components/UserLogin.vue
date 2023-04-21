<template>
    <ToastSystem ref="toasts"/>

    <div class="row mt-4">
        <div class="col d-flex justify-content-center">
            <div class="card shadow rounded p-4">
                <div class="card-body">
                    <h1 class="text-center">Connexion</h1>

                    <form @submit.prevent="submitForm" class="mt-5 text-center">
                        <div class="mb-3">
                            <label for="username" class="form-label"><font-awesome-icon :icon="['fas', 'user']" /> Nom d'utilisateur :</label>
                            <input type="text" id="username" v-model="username" required class="form-control" />
                        </div>

                        <button type="submit" class="btn btn-primary">Connexion</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ToastSystem from "@/components/ToastSystem.vue";

export default {
    name: "UserLogin",
    components: {ToastSystem},
    data() {
        return {
            username: "",
        };
    },
    methods: {
        submitForm() {
            let users = JSON.parse(sessionStorage.getItem('users'));
            if (users === null) {
                users = [];
            }

            let result = users.find((user) => user === this.username)

            if (!result) {
                users.push(this.username);
                sessionStorage.setItem('users', JSON.stringify(users));
            } else {
                this.sendToast('danger', "Ce nom d'utilisateur existe dèjà !")
            }

            this.$router.push({ name: "MainPage", params: { username: this.username } });
        },

        sendToast(type, message) {
            const toast = {
                type: type,
                message: message,
                autoHide: true,
                delay: 2000
            };

            this.$refs.toasts.addToasts(toast);
        }
    },
};
</script>

<style scoped>
</style>
