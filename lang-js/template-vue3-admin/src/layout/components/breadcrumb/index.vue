<template>
    <nav class="breadcrumb">
        <ul>
            <li v-for="(v, i) in list" :key="v.name" v-show="v?.meta?.breadcrumb !== false">
                <span class="title">{{ v.title }}</span>
                <span class="separator" v-show="list.length !== i + 1">/</span>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import useMenu, { MenuItem } from '../../../hooks/useMenu'
import { onMounted, ref } from 'vue'

const route = useRoute()
const { menuMap } = useMenu()

const list = ref<MenuItem[]>([])

const setBreadcrumb = (name: string) => {
    const items: MenuItem[] = []
    const current = menuMap.value[name]
    current.parents.forEach(value => {
        items.push(menuMap.value[value])
    })
    items.push(current)
    list.value = items
}

onMounted(() => {
    if (route.name) {
        setBreadcrumb(route.name.toString())
    }
})

onBeforeRouteUpdate(u => {
    if (u.name) {
        setBreadcrumb(u.name.toString())
    }
})
</script>

<style lang="scss" scoped>
.breadcrumb {
    padding: 0 20px;
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    background: rgb(var(--admin-aside-bg));
    transition: all 0.4s linear;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    ul {
        list-style-type: none;
        display: flex;
        line-height: 50px;
        width: 100%;
        li {
            margin-right: 8px;
            color: rgba(var(--admin-font-color), 0.7);

            .title {
                max-width: 120px;
                margin-right: 8px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
