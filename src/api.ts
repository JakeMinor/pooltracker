import { pocketbase } from "./composables/usePocketbase.ts";
import {Game} from "./types/types.ts";

export async function getAll(collection : string, page? : number, perPage? : number) {
    return await pocketbase.collection(collection).getList(page, perPage)
}

export async function createGame(item : Game) {
    await pocketbase.collection("games").create(item)
}