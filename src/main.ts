import type { Breakpoints } from '@/state/stores/base/useBreakpointsStore'
import { resetStore } from '@/state/stores/base/resetStore'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import { createApp, markRaw } from 'vue'
import type { Router } from 'vue-router'
import App from './App.vue'
import { router } from './router'
import './styles/app.scss'

const pinia = createPinia()
const app = createApp(App)

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
    $breakpoints: Breakpoints
  }
}

app.use(router)
app.use(pinia)
pinia.use(resetStore)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.mount('#app')
