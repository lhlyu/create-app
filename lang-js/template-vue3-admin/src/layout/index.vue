<template>
    <section class="layout">
        <aside class="layout-aside" :style="{ width: store.getClientHeight }">
            <button class="collapsed" aria-label="collapsed" @click="store.triggleCollapsed">
                <svg
                    class="collapsed-icon"
                    :style="{ transform: store.collapsed ? 'rotateZ(180deg)' : 'none' }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <section class="aside">
                <Lander></Lander>
                <AppMenu></AppMenu>
            </section>
        </aside>
        <section class="layout-container">
            <header>
                <Breadcrumb></Breadcrumb>
                <Tabsbar></Tabsbar>
            </header>
            <main ref="main">
                <button class="backtop" @click="backtop" v-show="backtopShow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                    </svg>
                </button>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <keep-alive :include="menuStore.keepaliveCaches">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </main>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { Lander, AppMenu, Tabsbar, Breadcrumb } from './components/index'
import useSiteStore from '../stores/site'
import useMenuStore from '../stores/menu'
import useClientHeight from '../hooks/useClientHeight'

const store = useSiteStore()
const menuStore = useMenuStore()

const { clientHeight } = useClientHeight()

const main = ref<HTMLElement>()
const backtopShow = ref<boolean>(false)

const backtop = () => {
    main.value?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

const setBacktopShow = () => {
    const scrollTop = main.value?.scrollTop ?? 0
    const clientHeight = document.documentElement.offsetHeight
    if (scrollTop + 300 > clientHeight) {
        backtopShow.value = true
        return
    }
    backtopShow.value = false
}

onBeforeMount(() => {
    store.setTheme(store.theme)
})

onMounted(() => {
    main.value?.addEventListener('scroll', setBacktopShow)
})

onUnmounted(() => {
    main.value?.removeEventListener('scroll', setBacktopShow)
})
</script>

<style lang="scss" scoped>
.layout {
    width: 100vw;
    height: v-bind(clientHeight);
    overflow: auto;
    display: flex;

    .layout-aside {
        position: relative;
        height: 100%;
        will-change: width;
        background: rgb(var(--admin-aside-bg));
        transition: all 0.4s linear;

        &::-webkit-scrollbar {
            display: none;
        }

        .collapsed {
            position: absolute;
            top: calc(50% - 35px);
            right: -25px;
            width: 25px;
            height: 70px;
            clip-path: polygon(100% 10%, 100% 90%, 0 100%, 0 0);
            z-index: 1;
            outline: none;
            border: 0;
            cursor: pointer;
            background: rgb(var(--admin-aside-bg));
            transition: all 0.4s linear;

            .collapsed-icon {
                color: rgb(var(--admin-collapse-color));
                transition: all 0.4s linear;
            }
        }

        .aside {
            width: 100%;
            overflow: hidden;
        }
    }

    .layout-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-x: auto;
        width: 100%;
        background-color: rgb(var(--admin-bg));
        transition: all 0.4s linear;

        header {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        main {
            position: relative;
            padding: 20px 30px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            overflow: auto;

            .backtop {
                position: fixed;
                bottom: 50px;
                right: 20px;
                padding: 10px 12px;
                border-radius: 100%;
                z-index: 1;
                outline: none;
                border: 0;
                cursor: pointer;
                background: rgb(var(--admin-aside-bg));
                transition: all 0.4s linear;
                opacity: 0.9;

                svg {
                    color: rgb(var(--admin-collapse-color));
                    transition: all 0.4s linear;
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
