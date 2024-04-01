import { pocketbase } from "./composables/usePocketbase.ts";

export async function getAll(collection : string, page? : number, perPage? : number) {
    return await pocketbase.collection(collection).getList(page, perPage)
}