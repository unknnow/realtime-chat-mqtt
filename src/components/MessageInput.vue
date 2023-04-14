<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto">
            <label for="message" class="col-form-label">Message :</label>
        </div>

        <div class="col-12">
            <input type="text" id="message" class="form-control" aria-describedby="message">
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageInput',
    props: ['channel'],
}
</script>
