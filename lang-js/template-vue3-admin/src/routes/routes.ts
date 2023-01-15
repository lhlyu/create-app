import type { RouteRecordRaw } from 'vue-router'
import { formatFlatteningRoutes } from './util'

// 布局
const IndexLayout = () => import('../layout/index.vue')
const BlankLayout = () => import('../layout/blank.vue')
// 页面
const LoginView = () => import('../views/login/index.vue')

const DashboardView = () => import('../views/dashboard/index.vue')
const RoleView = () => import('../views/role/index.vue')
const LogView = () => import('../views/setting/log/index.vue')
const SiteView = () => import('../views/setting/site/index.vue')
const AccountView = () => import('../views/setting/user/account/index.vue')
const ProfileView = () => import('../views/setting/user/profile/index.vue')

/**
 * Note: 会根据menuRoutes自动生成左侧的菜单列表
 * 1.会取menuRoutes列表中的第一个元素作为首页
 */
export const menuRoutes: RouteRecordRaw[] = [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: DashboardView,
        meta: {
            title: '仪表板',
            icon: 'dashboard'
        }
    },
    {
        name: 'role',
        path: '/role',
        component: RoleView,
        meta: {
            title: '角色管理',
            icon: 'role'
        }
    },
    {
        name: 'setting',
        path: '/setting',
        redirect: '/setting/site',
        component: BlankLayout,
        meta: {
            title: '设置',
            icon: 'setting'
        },
        children: [
            {
                name: 'site',
                path: 'site',
                component: SiteView,
                meta: {
                    title: '网站设置',
                    icon: 'site',
                    affix: false
                }
            },
            {
                name: 'log',
                path: 'log',
                component: LogView,
                meta: {
                    title: '网站日志',
                    icon: 'log'
                }
            },
            {
                name: 'user',
                path: 'user',
                component: BlankLayout,
                meta: {
                    title: '用户管理',
                    icon: 'user'
                },
                children: [
                    {
                        name: 'account',
                        path: 'account',
                        component: AccountView,
                        meta: {
                            title: '账号中心',
                            icon: 'account'
                        }
                    },
                    {
                        name: 'profile',
                        path: 'profile',
                        component: ProfileView,
                        meta: {
                            title: '个人中心',
                            icon: 'profile'
                        }
                    }
                ]
            }
        ]
    }
]

export const routes: RouteRecordRaw[] = [
    {
        name: 'login',
        path: '/',
        component: LoginView,
        meta: {
            title: '登陆'
        }
    },
    {
        name: 'home',
        path: '/',
        redirect: 'dashboard',
        component: IndexLayout,
        children: formatFlatteningRoutes(menuRoutes)
    }
]
