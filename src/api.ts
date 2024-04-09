import { pocketbase } from "./composables/usePocketbase.ts";
import {User, useUserStore} from "./composables/store/useUserStore.ts";

export async function authenticate() {
    const { setUser, setAuthenticated } = useUserStore()

    const authData = await pocketbase.collection('users').authWithOAuth2({ provider: 'google' });
    await pocketbase.collection("users").update(authData.record.id, { name: authData.meta?.name, avatar: authData.meta?.avatarUrl })

    setUser({ email: authData.meta?.email, name: authData.meta?.name, avatarUrl: authData.meta?.avatarUrl} as User)
    setAuthenticated(pocketbase.authStore.isValid)
}

export async function signOut() {
    const { setUser, setAuthenticated } = useUserStore()

    pocketbase.authStore.clear();
    setUser(null)
    setAuthenticated(pocketbase.authStore.isValid)
}