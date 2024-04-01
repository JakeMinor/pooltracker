import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({ authenticated: false }),
    getters: {
      isAuthenticated: (state) => state.authenticated
    },
    actions: {
        authenticate() {
            this.authenticated = true
        }
    }
})