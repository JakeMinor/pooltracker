import {useReferenceDataStore} from "./composables/store/useReferenceDataStore.ts";

export function getUser(uid : string) {
    const { getUsers } = useReferenceDataStore()

    return  getUsers.find(user => user.id === uid)
}

export function getLocationName(locId : string) {
    const { getLocations } = useReferenceDataStore()

    return  getLocations.find(loc => loc.id === locId)?.name ?? locId
}