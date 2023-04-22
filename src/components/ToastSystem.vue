<template>
    <!-- Conteneur pour les toasts, positionné en haut à droite de la page -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <!-- Un toast pour chaque élément du tableau 'toasts' -->
        <div class="toast align-items-center text-white border-0" role="alert" aria-live="assertive" aria-atomic="true"
             v-for="(toast, index) in toasts"
             :key="index"
             :class="'bg-' + toast.type"
             :data-autohide="toast.autoHide"
             :data-delay="toast.delay">
            <div class="d-flex">
                <!-- Corps du toast contenant le message -->
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <!-- Bouton pour fermer le toast -->
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="removeToast(index)"></button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast as BootstrapToast } from 'bootstrap';

export default {
    name: "ToastSystem",
    data() {
        return {
            toasts: [], // Tableau pour stocker les toasts
        }
    },
    methods: {
        // Ajoute un toast au tableau et affiche le toast
        addToasts(toast) {
            this.toasts.push(toast);
            this.showToast(this.toasts.length - 1);
        },
        // Affiche le toast à l'index spécifié
        showToast(index) {
            this.$nextTick(() => {
                const toastEl = this.$el.querySelectorAll('.toast')[index];
                const toastInstance = new BootstrapToast(toastEl);
                toastInstance.show();
            });
        },
        // Supprime le toast à l'index spécifié
        removeToast(index) {
            this.toasts.splice(index, 1);
        },
    },
}
</script>

<style scoped>

</style>
