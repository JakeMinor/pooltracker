import {defineStore} from "pinia";
import {Game } from "../../types/types.ts";
import {pocketbase} from "../usePocketbase.ts";

interface State {
    games: Game[]
}

export const useGameStore = defineStore('games', {
    state: () : State => ({ games: [] as Game[] }),
    getters: {
        allGames: state => state.games,
    },
    actions: {
        async getGames() {
            this.$state.games = (await pocketbase.collection('games').getList()).items as unknown as Game[]
        },
    }
})