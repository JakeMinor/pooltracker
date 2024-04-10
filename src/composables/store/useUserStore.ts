import { defineStore } from "pinia";
import {User} from "../../types/types.ts";

interface State {
    user: User | null,
    authenticated: boolean
}

export const useUserStore = defineStore('user', {
    state: () : State => ({ user: null, authenticated: false }),
    getters: {
      id: (state) : string => state.user?.id ?? '',
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