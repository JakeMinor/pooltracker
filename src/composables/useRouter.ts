import { createRouter, createWebHistory } from "vue-router/auto";
import { pocketbase } from "./usePocketbase.ts";
import { useUserStore } from "./store/useUserStore.ts";

const router = createRouter({
    history: createWebHistory()
})

router.beforeEach(async () => {
    const { isAuthenticated, authenticate } = useUserStore()

    if(!isAuthenticated) {
        const authData = await pocketbase.collection('users').authWithOAuth2({ provider: 'google' });
        await pocketbase.collection("users").update(authData.record.id, { name: authData.meta?.name, avatar: authData.meta?.avatarUrl })
        authenticate({ email: authData.meta?.email, name: authData.meta?.name, avatarUrl: authData.meta?.avatarUrl })
    }
})

export { router }