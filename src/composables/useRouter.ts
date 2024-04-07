import { createRouter, createWebHistory } from "vue-router/auto";
import { useUserStore } from "./store/useUserStore.ts";
import {useReferenceDataStore} from "./store/useReferenceDataStore.ts";

const router = createRouter({
    history: createWebHistory()
})

router.beforeEach(async () => {
    const { isAuthenticated, authenticate } = useUserStore()
    const { $state, setLocations, setUsers } = useReferenceDataStore()

    if(!isAuthenticated) {
        await authenticate()
    }

    if($state.locations.length === 0) {
        await setLocations()
    }

    if($state.users.length === 0) {
        await setUsers()
    }
})

export { router }