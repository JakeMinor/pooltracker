import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.DATABASE_URL)

export async function getAll(collection : string, page? : number, perPage? : number) {
    return await pb.collection(collection).getList(page, perPage)
}