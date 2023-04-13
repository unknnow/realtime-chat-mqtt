<template>
    <div>
        <h1>Welcome, {{ username }}!</h1>
        <!-- Le reste de votre code de chat général -->
    </div>
</template>

<script>
export default {
    name: "GeneralChat",
    props: ['username'],
    data() {
        return {
            zzz: "",
        };
    },
    mounted() {
        console.log(this.username);
    },
};
</script>
