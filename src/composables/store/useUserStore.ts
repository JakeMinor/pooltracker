import { defineStore } from "pinia";
import {User} from "../../types/types.ts";
import {useGameStore} from "./useGameStore.ts";

interface State {
    user: User | null,
    authenticated: boolean
}

export const useUserStore = defineStore('user', {
    state: () : State => ({ user: null, authenticated: false }),
    getters: {
        id: (state) : string => state.user?.id ?? '',
        name: (state) : string => state.user?.name ?? '',
        avatarUrl: (state) : string => state.user?.avatar ?? '',
        isAuthenticated: (state) : boolean => state.authenticated,
        verifiedGames: (state) => {
          const { allGames } = useGameStore()
          return allGames.filter(game => (game.player1Id === state.user?.id || game.player2Id === state.user?.id) && game.player1Verified && game.player2Verified)
        },
        gameRequests: (state) => {
            const { allGames } = useGameStore()
            return allGames.filter(game => (game.player1Id === state.user?.id || game.player2Id === state.user?.id) && (!game.player1Verified || !game.player2Verified))
        }
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
