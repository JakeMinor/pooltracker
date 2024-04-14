import {defineStore} from "pinia";
import {Game } from "../../types/types.ts";
import {useUserStore} from "./useUserStore.ts";

interface State {
    games: Game[]
}

export const useGameStore = defineStore('games', {
    state: () : State => ({ games: [] as Game[] }),
    getters: {
        allGames: state => state.games,
        usersGames: (state) => {
            const { id} = useUserStore()

            return state.games.filter(game => game.player1Id === id || game.player2Id === id)
        }
    },
    actions: {
        setGames(games : Game[]) {
            this.games = games
        }
    }
})