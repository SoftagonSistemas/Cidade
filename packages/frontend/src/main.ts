/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(Vue3Toastify, {
  autoClose: 3000,
  transition: 'flip',
  theme: 'colored',
})
app.mount('#app')
