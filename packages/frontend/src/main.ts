/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { maskito } from '@maskito/vue'
// Composables
import { createApp } from 'vue'
import Vue3Toastify from 'vue3-toastify'
// Components
import App from './App.vue'

import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.directive('maskito', maskito)
registerPlugins(app)
app.use(Vue3Toastify, {
  autoClose: 3000,
  transition: 'flip',
  theme: 'colored',
})
app.mount('#app')
