<template>
    <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
defineProps({
    msg: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped></style>
