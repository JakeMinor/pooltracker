import { pocketbase } from "./composables/usePocketbase.ts";
import {useUserStore} from "./composables/store/useUserStore.ts";
import {Game, User} from "./types/types.ts";
import {useGameStore} from "./composables/store/useGameStore.ts";

async function getAll(collection : string, page? : number, perPage? : number) {
    return (await pocketbase.collection(collection).getList(page, perPage)).items
}

export async function getAllGames() {
    const { setGames } = useGameStore()
    try {
        const games = await getAll('games') as unknown as Game[]
        setGames(games)
    } catch(e){
        console.log(e)
    }
}

export async function createGame(item : Game) {
    try {
        await pocketbase.collection("games").create(item)
    } catch(e){
        console.log(e)
    }
}


export async function authenticate() {
    const { setUser, setAuthenticated } = useUserStore()

    const authData = await pocketbase.collection('users').authWithOAuth2({ provider: 'google' });
    await pocketbase.collection("users").update(authData.record.id, { name: authData.meta?.name, avatar: authData.meta?.avatarUrl })

    setUser({ id: authData.record.id, email: authData.meta?.email, name: authData.meta?.name, avatarUrl: authData.meta?.avatarUrl} as User)
    setAuthenticated(pocketbase.authStore.isValid)
}

export async function signOut() {
    const { setGames } = useGameStore()
    const { setUser, setAuthenticated } = useUserStore()

    pocketbase.authStore.clear();
    setUser(null)
    setGames([])
    setAuthenticated(pocketbase.authStore.isValid)
}