import { defineStore } from 'pinia'

export interface SiteOption {
    // 主题
    theme: 'dark' | 'light'
    // 菜单是否折叠
    collapsed: boolean
    // 是否展示topbar, 默认是true
    topbar: boolean
}

// 网页设置
const useSiteStore = defineStore({
    id: 'site',
    state: (): SiteOption => ({
        theme: 'dark',
        collapsed: false,
        topbar: true
    }),
    getters: {
        getClientHeight: state => {
            if (state.collapsed) {
                return '0'
            }
            return '300px'
        }
    },
    actions: {
        setTheme(theme: 'dark' | 'light') {
            this.theme = theme
            document.documentElement.setAttribute('theme', theme)
        },
        triggleCollapsed() {
            this.collapsed = !this.collapsed
        },
        setTopbar(topbar: boolean) {
            this.topbar = topbar
        }
    },
    // 启用持久化
    persist: true
})

export default useSiteStore
