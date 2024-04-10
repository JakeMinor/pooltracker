import {defineStore, storeToRefs} from "pinia";
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
            const { id} = storeToRefs(useUserStore())

            return state.games.filter(game => game.player1!.id === id.value || game.player2!.id === id.value)
        }
    },
    actions: {
        setGames(games : Game[]) {
            this.games = games
        }
    }
})