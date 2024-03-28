import { createApp } from 'vue'
import './style.css'
//@ts-ignore
import { createRouter, createWebHistory } from 'vue-router/auto'
//@ts-ignore
import App from './App.vue'

const router = createRouter({
    history: createWebHistory()
})

createApp(App).use(router).mount('#app')
