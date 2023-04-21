<template>
    <div class="row g-3 align-items-center">
        <div class="col-11">
            <input type="text" @keyup.enter="sendMessage" v-model="message" class="form-control" aria-describedby="message" placeholder="Message envoyé dans le chat">
        </div>

        <div class="col-1 text-center">
            <button @click="sendMessage" class="btn btn-sm btn-primary w-100"><font-awesome-icon :icon="['fas', 'paper-plane']" /></button>
        </div>

    </div>
</template>

<script>
import mqttService from "@/services/mqttService";

export default {
    name: 'MessageInput',
    props: ['topic'],
    data() {
        return {
            message: "",
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                mqttService.publish(this.topic, { message: this.message });
                this.message = "";
            }
        },
    },
}
</script>
