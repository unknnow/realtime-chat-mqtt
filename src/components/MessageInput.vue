<template>
    <div class="row g-3 align-items-center">
        <div class="col-10">
            <input type="text" id="message" class="form-control" aria-describedby="message" placeholder="Message">
        </div>

        <div class="col-2 text-center">
            <button @click="sendMessage" class="btn btn-sm btn-primary w-100">Envoyer</button>
        </div>

    </div>
</template>

<script>
import mqttService from "@/services/mqttService";

export default {
    name: 'MessageInput',
    props: ['topic'],
    methods: {
        sendMessage() {
            const message = document.getElementById("message").value;
            if (message.trim() !== "") {
                mqttService.publish("chats/" + this.topic, { message: message });
                document.getElementById("message").value = "";
            }
        },
    },
}
</script>
