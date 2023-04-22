<template>
    <div class="row g-3 align-items-center">
        <!-- Crée un champ de saisie pour entrer le message à envoyer -->
        <div class="col-11">
            <input type="text" @keyup.enter="sendMessage" v-model="message" class="form-control" aria-describedby="message" placeholder="Message envoyé dans le chat">
        </div>
        <!-- Crée un bouton pour envoyer le message -->
        <div class="col-1 text-center">
            <button @click="sendMessage" class="btn btn-sm btn-primary w-100"><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
        </div>
    </div>
</template>

<script>
import mqttService from "@/services/mqttService";

export default {
    name: 'MessageInput',
    // Définit la propriété 'topic' pour recevoir le topic du channel
    props: ['topic'],
    data() {
        return {
            message: "",
        };
    },
    methods: {
        // Méthode pour envoyer le message
        sendMessage() {
            // Vérifie que le message n'est pas vide
            if (this.message.trim() !== "") {
                // Publie le message sur le topic du channel
                mqttService.publish(this.topic, { message: this.message });
                // Réinitialise le message
                this.message = "";
            }
        },
    },
}
</script>
