import { defineStore } from "pinia";

export interface User {
    name: string,
    email: string,
    avatarUrl: string
}

interface State {
    user: User | null,
    authenticated: boolean,
}

export const useUserStore = defineStore('user', {
    state: () : State => ({ authenticated: false, user: null }),
    getters: {
      name: (state) : string => state.user?.name ?? '',
      avatarUrl: (state) : string => state.user?.avatarUrl ?? '',
      isAuthenticated: (state) : boolean => state.authenticated
    },
    actions: {
        authenticate(user : User) {
            this.authenticated = true
            this.user = user
        }
    }
})