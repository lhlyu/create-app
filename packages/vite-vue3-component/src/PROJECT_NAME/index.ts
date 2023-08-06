import type { App } from 'vue'
import COMPONENT_NAME_PASCAL_CASE from './COMPONENT_NAME.vue'

export { COMPONENT_NAME_PASCAL_CASE }

export default {
    install(app: App) {
        app.component(COMPONENT_NAME_PASCAL_CASE.name, COMPONENT_NAME_PASCAL_CASE)
    }
}

declare module 'vue' {
    export interface GlobalComponents {
        COMPONENT_NAME_PASCAL_CASE: typeof COMPONENT_NAME_PASCAL_CASE
    }
}
