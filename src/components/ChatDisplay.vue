<template>
    <ul class="list-inline" style="max-height: 55vh; overflow-y: auto;">
        <li class="m-1" v-bind:key="message.id" v-for="message in messages">
            <span class="fw-bold">{{ message.username }}</span> : {{ message.message }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ChatDisplay',
    props: ['channel'],
    data() {
        return {
            messages: [
                {id: 1, username:"Unknow", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 1, username:"Hugo", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                {id: 1, username:"Julien", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            ],
        };
    },
}
</script>
