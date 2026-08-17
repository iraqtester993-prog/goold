import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './registerServiceWorker'
import './assets/styles/variables-dark.css'
import './assets/styles/variables-light.css'
import './assets/styles/global.css'
import './assets/styles/rtl.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
