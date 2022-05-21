import { createPinia } from "pinia"
import PersistedstatePlugin from "./plugin_persistedstate"

const pinia = createPinia()

// 持久化插件
pinia.use(PersistedstatePlugin)

export default pinia
