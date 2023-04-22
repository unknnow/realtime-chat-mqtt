<template>
    <!-- Composant pour afficher les toasts/notifications -->
    <ToastSystem ref="toasts"/>

    <div class="row mt-4">
        <div class="col d-flex justify-content-center">
            <div class="card shadow rounded p-4">
                <div class="card-body">
                    <h1 class="text-center">Connexion</h1>

                    <!-- Formulaire de connexion -->
                    <form @submit.prevent="submitForm" class="mt-5 text-center">
                        <div class="mb-3">
                            <label for="username" class="form-label"><font-awesome-icon :icon="['fas', 'user']" /> Nom d'utilisateur :</label>
                            <!-- Champ de saisie du nom d'utilisateur -->
                            <input type="text" id="username" v-model="username" required class="form-control" />
                        </div>

                        <!-- Bouton d'envoie du formulaire -->
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
        // Fonction pour soumettre le formulaire de connexion
        submitForm() {
            // Récupére la liste des utilisateurs du sessionStorage
            let users = JSON.parse(sessionStorage.getItem('users'));
            if (users === null) {
                users = [];
            }

            // Vérifie si l'utilisateur existe déjà dans la liste
            let result = users.find((user) => user === this.username)

            // Si l'utilisateur n'existe pas, l'ajouter à la liste et sauvegarder dans le sessionStorage
            if (!result) {
                users.push(this.username);
                sessionStorage.setItem('users', JSON.stringify(users));
            } else {
                // Si l'utilisateur existe déjà, afficher un toast d'erreur
                this.sendToast('danger', "Ce nom d'utilisateur existe dèjà !")
            }

            // Redirige vers la page principale avec le nom d'utilisateur en paramètre
            this.$router.push({ name: "MainPage", params: { username: this.username } });
        },

        // Fonction pour envoyer un toast avec le type et le message spécifiés
        sendToast(type, message) {
            const toast = {
                type: type,
                message: message,
                autoHide: true,
                delay: 2000
            };

            // Ajoute le toast à la liste des toasts à afficher
            this.$refs.toasts.addToasts(toast);
        }
    },
};
</script>

<style scoped>
</style>
