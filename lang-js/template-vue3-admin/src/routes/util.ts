import type { RouteRecordRaw } from 'vue-router'
import { createRouterMatcher } from 'vue-router'

// 路由扁平化处理
export const formatFlatteningRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    const matcher = createRouterMatcher(routes, {})
    const routerMap = new Map()
    matcher.getRoutes().map(v => {
        routerMap.set(v.record.name, v.record.path)
    })

    const flatteningRoutes = (rs: RouteRecordRaw[]): RouteRecordRaw[] => {
        const list: RouteRecordRaw[] = []
        rs.forEach(value => {
            const path = routerMap.get(value.name)
            if (path) {
                value.path = path as string
            }
            list.push({
                ...value,
                children: []
            })
            list.push(...flatteningRoutes(value?.children ?? []))
        })
        return list
    }

    return flatteningRoutes(routes)
}
