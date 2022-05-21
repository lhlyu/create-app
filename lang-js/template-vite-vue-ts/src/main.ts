import { createApp } from 'vue'
import store from "./stores"
import router from "./routes"
import "./styles/index.scss"

import App from "./App.vue"

const app = createApp(App)


app.use(store)
app.use(router)

app.mount("#app")
