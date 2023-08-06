<template>
    <main></main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const appHeight = ref('100vh')

const isMobile = ref(false)

const calcAppWidth = () => {
    if (window.innerWidth > 1000) {
        isMobile.value = false
    } else {
        isMobile.value = true
    }
}

onMounted(() => {
    appHeight.value = window.innerHeight + 'px'
    calcAppWidth()
    window.addEventListener('resize', useDebounceFn(calcAppWidth, 200))
})

onUnmounted(() => {
    window.removeEventListener('resize', useDebounceFn(calcAppWidth, 200))
})
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    main {
        width: 100%;
        height: v-bind(appHeight);
    }
}
</style>
