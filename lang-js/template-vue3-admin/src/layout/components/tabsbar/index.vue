<template>
    <div class="tabsbar">
        <div class="tab" :class="{ active: menuItems[0].name === route.name }" :key="menuItems[0].name" @click="activeTab(menuItems[0].name)">
            <span>{{ menuItems[0].title }}</span>
        </div>
        <div class="tab" @mouseenter="dropmenuShow = true" @mouseleave="dropmenuShow = false">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <ul class="dropmenu" v-show="dropmenuShow">
                <li @click.stop="closeTabs(false)">关闭其他</li>
                <li @click.stop="closeTabs(true)">关闭所有</li>
            </ul>
        </div>
        <div class="tabs">
            <div class="tab" v-for="v in tabs" :key="v.name" :id="v.name" :class="{ active: v.name === route.name }" @click="activeTab(v.name)">
                <span>{{ v.title }}</span>
                <svg
                    @click.stop="closeTab(v.name)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useMenu, { MenuItem } from '../../../hooks/useMenu'
import useMenuStore from '../../../stores/menu'

const route = useRoute()
const router = useRouter()
const store = useMenuStore()
const { menuItems, menuMap } = useMenu()

const tabs = ref<MenuItem[]>([])

const setTabs = () => {
    const items: MenuItem[] = []
    store.keepaliveCaches.forEach(value => {
        if (menuItems.value[0].name === value) {
            return
        }
        items.push(menuMap.value[value])
    })
    tabs.value = items

    document.querySelector(`#${store.current}`)?.scrollIntoView()
}

store.$subscribe(
    (mutation, state) => {
        setTabs()
    },
    { detached: false }
)

onMounted(() => {
    setTabs()
})

const dropmenuShow = ref<boolean>(false)

const closeTabs = async (all: boolean = false) => {
    if (all === true) {
        await router.push({ name: menuItems.value[0].name })
        store.removeAllKeppaliveCaches()
    } else {
        store.removeOtherKeepaliveCaches()
    }
    dropmenuShow.value = false
}

// 关闭tab
const closeTab = async (name: string) => {
    if (route.name === name) {
        const index = store.keepaliveCaches.indexOf(name)
        let nextName = menuItems.value[0].name
        if (index > 0) {
            nextName = store.keepaliveCaches[index - 1]
        }
        await router.push({ name: nextName })
    }
    store.removeKeepaliveCache(name)
}

// 选择tab
const activeTab = (name: string) => {
    if (route.name === name) {
        return
    }
    router.push({ name })
}
</script>

<style lang="scss" scoped>
.tabsbar {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 10px;
    height: 50px;

    @media screen and (max-width: 520px) {
        display: none;
    }

    .tab {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(var(--admin-tab-bg));
        height: 30px;
        padding: 0 10px;
        border-radius: 3px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.4s linear;
        white-space: nowrap;
    }

    .tabs {
        white-space: nowrap;
        overflow-x: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        .tab {
            display: inline-flex;

            span {
                margin-right: 2px;
                transition: all 0.2s linear;
            }
        }
    }

    .active {
        span,
        svg {
            color: rgb(var(--admin-theme-color));
        }
    }

    .dropmenu {
        position: absolute;
        top: 30px;
        left: 0;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        z-index: 1;
        li {
            height: 20px;
            line-height: 20px;
            padding: 6px 20px;
            margin-top: 1px;
            border-radius: 4px;
            background-color: rgb(var(--admin-tab-bg));
            font-size: 14px;
            &:hover {
                color: rgb(var(--admin-theme-color));
            }
        }
    }
}
</style>
