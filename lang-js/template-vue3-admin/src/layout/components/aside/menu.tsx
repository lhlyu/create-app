import { defineComponent, onBeforeMount } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import ExpandTransition from './expand-transition.vue'
import useMenu from '../../../hooks/useMenu'
import useMenuStore from '../../../stores/menu'
import type { MenuItem } from '../../../hooks/useMenu'
import './menu.scss'

const AppMenu = defineComponent({
    setup: function () {
        const store = useMenuStore()
        const route = useRoute()
        const router = useRouter()
        const { menuMap, menuItems } = useMenu()

        // 展开或则折叠菜单
        const triggleMenu = (name: string) => {
            if (store.expands.includes(name) && !menuMap.value[store.current].parents.includes(name)) {
                // 折叠
                store.collapseMenu(name)
                return
            }
            store.expandMenu(name)
        }

        // 选择菜单
        const selectMenu = async (name: string, init: boolean = false) => {
            if (!init) {
                await router.push({ name })
            }
            const m = menuMap.value[name]
            store.expandMenu(...m.parents)
            store.activeMenu(name)
            if (m?.meta?.affix === false) {
                return
            }
            store.addKeepaliveCache(name)
        }

        onBeforeMount(() => {
            if (route.name) {
                selectMenu(route.name.toString(), true)
            }
        })

        onBeforeRouteUpdate(u => {
            if (u.name) {
                selectMenu(u.name.toString(), true)
            }
        })

        // 渲染子元素
        const renderItem = (childrens: MenuItem[]) => {
            return childrens.map(v => {
                const indent = (v.parents.length + 1) * 1.5 + 'rem'
                if (v.childrens.length) {
                    return (
                        <li>
                            <div onClick={() => triggleMenu(v.name)} class={{ 'menu-item': true, expand: store.expands.includes(v.name) }} style={{ paddingLeft: indent }}>
                                {v?.icon} <span class="title">{v.title}</span>
                                <span class="menu-expand"></span>
                            </div>
                            <ExpandTransition>
                                <ul v-show={store.expands.includes(v.name)}>{renderItem(v.childrens)}</ul>
                            </ExpandTransition>
                        </li>
                    )
                }
                return (
                    <li>
                        <div onClick={() => selectMenu(v.name)} class={{ 'menu-item': true, active: store.current === v.name }} style={{ paddingLeft: indent }}>
                            {v?.icon} <span class="title">{v.title}</span>
                        </div>
                    </li>
                )
            })
        }

        // 渲染菜单
        const renderMenu = () => {
            if (!menuItems.value.length) {
                return
            }
            return (
                <ul>
                    {menuItems.value.map(v => {
                        if (v.childrens.length) {
                            return (
                                <li>
                                    <div onClick={() => triggleMenu(v.name)} class={{ 'menu-item': true, expand: store.expands.includes(v.name) }}>
                                        {v?.icon} <span class="title">{v.title}</span>
                                        <span class="menu-expand"></span>
                                    </div>
                                    <ExpandTransition>
                                        <ul v-show={store.expands.includes(v.name)}>{renderItem(v.childrens)}</ul>
                                    </ExpandTransition>
                                </li>
                            )
                        }
                        return (
                            <li>
                                <div onClick={() => selectMenu(v.name)} class={{ 'menu-item': true, active: store.current === v.name }}>
                                    {v?.icon} <span class="title">{v.title}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )
        }

        return () => <menu>{renderMenu()}</menu>
    }
})

export default AppMenu
