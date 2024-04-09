import { defineStore } from "pinia";

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
        setUser(user : User | null) {
            this.user = user
        },
        setAuthenticated(authenticated : boolean) {
            this.authenticated = authenticated
        }
    }
})