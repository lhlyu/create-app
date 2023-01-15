import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        // 标题
        title?: string
        // 图标
        icon?: string
        // 菜单中隐藏, 默认是false
        hide?: boolean
        // 如果设置为true将会出现在 标签栏中, 默认true
        affix?: boolean
        // 如果设置为false，该项将隐藏在breadcrumb中, 默认true
        breadcrumb?: boolean
    }
}
