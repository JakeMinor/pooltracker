import {createRouter, createWebHistory } from "vue-router/auto";
import {useReferenceDataStore} from "./store/useReferenceDataStore.ts";

const router = createRouter({
    history: createWebHistory()
})

router.beforeEach(async () => {
    const { $state, setLocations, setUsers } = useReferenceDataStore()

    if($state.locations.length === 0) {
        await setLocations()
    }

    if($state.users.length === 0) {
        await setUsers()
    }
})
export { router }