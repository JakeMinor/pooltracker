import {defineStore} from "pinia";
import {Location, User} from "../../types/types.ts";
import {pocketbase} from "../usePocketbase.ts";

interface State {
    locations: Location[],
    users: User[]
}

export const useReferenceDataStore = defineStore('referenceData', {
    state: () : State => ({ locations: [] as Location[], users: [] as User[] }),
    getters: {
        getLocations: state => state.locations,
        getUsers: state => state.users,
    },
    actions: {
        async setLocations() {
            this.$state.locations = (await pocketbase.collection('locations').getList()).items as unknown as Location[]
        },
        async setUsers() {
            this.$state.users = (await pocketbase.collection('users').getList()).items as unknown as User[]
        },
        async setReferenceData() {
            if(this.getUsers.length === 0){
                await this.setUsers()
            }

            if(this.getLocations.length === 0){
                await this.setLocations()
            }
        }
    }
})