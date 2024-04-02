import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import PrimeVue from 'primevue/config'
import tailwindPt from './pt/tailwind-pt.ts'
//@ts-ignore
import { createRouter, createWebHistory } from 'vue-router/auto'
//@ts-ignore
import App from './App.vue'
import { router } from "./composables/useRouter.ts";


createApp(App)
    .use(createPinia())
    .use(router)
    .use(PrimeVue, { unstyled: true, pt: tailwindPt })
    .mount('#app')
