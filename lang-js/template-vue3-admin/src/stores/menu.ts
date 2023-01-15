import { defineStore } from 'pinia'

export interface MenuOption {
    // 当前路由
    current: string
    // 展开的菜单
    expands: string[]
    // keepalive 缓存
    keepaliveCaches: string[]
}

const initCurrent = 'dashboard'

// 菜单配置
const useMenuStore = defineStore({
    id: 'menu',
    state: (): MenuOption => ({
        current: initCurrent,
        expands: [],
        keepaliveCaches: [initCurrent]
    }),
    getters: {},
    actions: {
        // 展开指定菜单菜单
        expandMenu(...names: string[]) {
            names.forEach(value => {
                if (this.expands.includes(value)) {
                    return
                }
                this.expands.push(value)
            })
        },
        // 折叠某个菜单
        collapseMenu(name: string) {
            const index = this.expands.indexOf(name)
            if (index > -1) {
                this.expands.splice(index, 1)
            }
        },
        // 激活菜单
        activeMenu(name: string) {
            this.current = name
        },
        // 添加缓存
        addKeepaliveCache(name: string) {
            const index = this.keepaliveCaches.indexOf(name)
            if (index === -1) {
                this.keepaliveCaches.push(name)
            }
        },
        // 移除缓存
        removeKeepaliveCache(name: string) {
            const index = this.keepaliveCaches.indexOf(name)
            if (index > -1) {
                this.keepaliveCaches.splice(index, 1)
            }
        },
        // 移除其他缓存
        removeOtherKeepaliveCaches() {
            this.keepaliveCaches = [initCurrent, this.current]
        },
        // 移除所有缓存
        removeAllKeppaliveCaches() {
            this.keepaliveCaches = [initCurrent]
        }
    },
    // 启用持久化
    persist: {
        storage: sessionStorage
    }
})

export default useMenuStore
