import { onBeforeMount, ref, VNode } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { menuRoutes } from '../routes/routes'

export interface MenuItem {
    name: string
    title: string
    icon?: VNode
    // 父级
    parents: string[]

    meta?: RouteMeta
    childrens: MenuItem[]
}
const useMenu = () => {
    const menuMap = ref<Record<string, MenuItem>>({})
    const menuItems = ref<MenuItem[]>([])

    // 将 menuRoutes 转换成 MenuItem[]
    const routesToMenus = (routes: RouteRecordRaw[] = [], partents: string[] = []): MenuItem[] => {
        const items: MenuItem[] = []
        routes.forEach(value => {
            if (value.meta?.hide) {
                return
            }
            if (!value.name) {
                throw 'route must have a name!'
            }
            if (menuMap.value.hasOwnProperty(value.name)) {
                throw 'route name must be unique!'
            }
            // TODO：图标设置
            const item = {
                name: value.name.toString(),
                title: value.meta?.title ?? value.name.toString(),
                parents: partents,
                meta: value.meta,
                childrens: []
            }

            menuMap.value[item.name] = item

            items.push({
                ...item,
                childrens: routesToMenus(value.children, [...partents, item.name])
            })
        })
        return items
    }

    onBeforeMount(() => {
        menuItems.value = routesToMenus(menuRoutes)
    })

    return {
        menuMap,
        menuItems
    }
}

export default useMenu
