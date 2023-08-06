<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'COMPONENT_NAME_PASCAL_CASE'
})

const props = withDefaults(defineProps(), {})

const slot = defineSlots<{
    default(props: {}): any
}>()

const emit = defineEmits([])
</script>

<style lang="scss" scoped>
.container {
}
</style>
