import { defineStore } from "pinia";
import { pocketbase } from "../usePocketbase.ts";

export interface User {
    name: string,
    email: string,
    avatarUrl: string
}

interface State {
    user: User | null,
    authenticated: boolean
}

export const useUserStore = defineStore('user', {
    state: () : State => ({ user: null, authenticated: false }),
    getters: {
      name: (state) : string => state.user?.name ?? '',
      avatarUrl: (state) : string => state.user?.avatarUrl ?? '',
      isAuthenticated: (state) : boolean => state.authenticated
    },
    actions: {
        async authenticate() {
            const authData = await pocketbase.collection('users').authWithOAuth2({ provider: 'google' });
            await pocketbase.collection("users").update(authData.record.id, { name: authData.meta?.name, avatar: authData.meta?.avatarUrl })
            
            
            this.authenticated = pocketbase.authStore.isValid
            this.user = { email: authData.meta?.email, name: authData.meta?.name, avatarUrl: authData.meta?.avatarUrl }
        },
        signOut() {
            pocketbase.authStore.clear();
            this.authenticated = pocketbase.authStore.isValid
        }
    }
})