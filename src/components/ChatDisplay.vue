<template>
    <ul v-if="messages.length > 0" class="list-inline" style="max-height: 55vh; overflow-y: auto;">
        <li class="m-1" v-bind:key="message.id" v-for="message in messages">
            <span v-if="message.specialMessageType" class="text-secondary fst-italic">{{ message.message }}</span>
            <span v-else><span class="fw-bold">{{ message.username }}</span> : {{ message.message }}</span>
        </li>
    </ul>
    <p v-else class="fst-italic text-center text-secondary">Aucun message sur ce channel</p>
</template>

<script>
export default {
    name: 'ChatDisplay',
    props: ['messages'],
}
</script>
