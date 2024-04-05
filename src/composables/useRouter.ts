import { createRouter, createWebHistory } from "vue-router/auto";
import { useUserStore } from "./store/useUserStore.ts";

const router = createRouter({
    history: createWebHistory()
})

router.beforeEach(async () => {
    const { isAuthenticated, authenticate } = useUserStore()

    if(!isAuthenticated) {
        await authenticate()
    }
})

export { router }