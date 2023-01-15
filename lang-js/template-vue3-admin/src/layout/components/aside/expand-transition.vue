<template>
    <transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave">
        <slot />
    </transition>
</template>

<script setup lang="ts">
const onBeforeEnter = (el: HTMLDivElement) => {
    el.style.height = '0'
}

const onEnter = (el: HTMLDivElement) => {
    el.style.height = `${el.scrollHeight}px`
}

const onAfterEnter = (el: HTMLDivElement) => {
    el.style.height = ''
}

const onBeforeLeave = (el: HTMLDivElement) => {
    el.style.height = `${el.scrollHeight}px`
}

const onLeave = (el: HTMLDivElement) => {
    el.style.height = '0'
}

const onAfterLeave = (el: HTMLElement) => {
    el.style.height = ''
}
</script>
