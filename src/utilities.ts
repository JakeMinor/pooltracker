import {useReferenceDataStore} from "./composables/store/useReferenceDataStore.ts";

export function getUser(uid : string) {
    const { getUsers } = useReferenceDataStore()

    return  getUsers.find(user => user.id === uid)
}