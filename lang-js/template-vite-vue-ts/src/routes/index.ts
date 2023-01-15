import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
    history: createWebHistory('/'),
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0, behavior: 'smooth' }
    },
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    next()
})

export default router
