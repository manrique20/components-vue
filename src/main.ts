import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'

import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark',
    },
  },
  ripple: true,
})
app.use(ToastService)
app.directive('ripple', Ripple)

app.mount('#app')
