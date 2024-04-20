import {defineStore} from "pinia";
import {Game } from "../../types/types.ts";

interface State {
    games: Game[]
}

export const useGameStore = defineStore('games', {
    state: () : State => ({ games: [] as Game[] }),
    getters: {
        allGames: state => state.games
    },
    actions: {
        setGames(games : Game[]) {
            this.games = games
        }
    }
})