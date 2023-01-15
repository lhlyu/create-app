import { createApp } from 'vue'
import pinia from './stores'
import router from './routes'
import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('body')
