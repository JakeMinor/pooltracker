<template>
  <Dialog v-model:visible="visible" modal header="Register game" :style="{ width: '25rem' }" :closable="false">
    <span class="p-text-secondary mb-5">Register your game against your opponent!</span>
    <div>
      <div class="mt-7">
        <h2 class="font-semibold">Setting</h2>
        <div class="flex flex-col w-full">
          <FormField label="Location" class="mt-6">
            <Dropdown class="w-full" v-model="game.location" :options="getLocations" option-label="name"/>
          </FormField>
          <FormField label="Colour of Ball" class="mt-7">
            <Dropdown class="w-full" v-model="game.player1BallColour" :disabled="game.location === null" :options="ballColours"/>
          </FormField>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-semibold">Game Details</h2>
        <FormField label="Player 1" class="mt-6 w-full" v-if="!isAuthenticated">
          <Dropdown class="w-full" editable v-model="game.player1" :options="opponents" option-label="name"/>
        </FormField>
        <FormField :label="isAuthenticated ? 'Opponent' : 'Player 2'" class="mt-7 w-full">
          <Dropdown class="w-full" editable v-model="game.player2" :options="opponents" option-label="name"/>
        </FormField>
        <div class="flex mt-8">
          <FormField label="Home" class="mr-5">
            <InputNumber v-model="game.player1Score" input-class="w-1/2"/>
          </FormField>
          <span class="text-xl my-auto">:</span>
          <FormField label="Away" class="ml-5">
            <InputNumber v-model="game.player2Score" input-class="w-1/2" />
          </FormField>
        </div>
      </div>
      <Divider class="mt-8" />
      <div class="flex">
        <Button class="ml-auto mr-2" type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button class="bg-lime-300 border-lime-300 text-gray-800" type="button" label="Save" @click="registerGame"></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { createGame } from "../../api.ts";
import FormField from "../utility/FormField.vue";
import {computed, ref} from "vue";
import {useUserStore} from "../../composables/store/useUserStore.ts";
import {Game, Location, User} from "../../types/types.ts";
import {useReferenceDataStore} from "../../composables/store/useReferenceDataStore.ts";
import {useGameStore} from "../../composables/store/useGameStore.ts";
import {storeToRefs} from "pinia";

const { id, user, isAuthenticated } = storeToRefs(useUserStore())
const { setGames, allGames } = useGameStore()
const { getLocations, getUsers } = useReferenceDataStore()

const opponents = getUsers?.filter((opponent) => opponent.id !== id.value)

const visible = defineModel<boolean>()

interface GameDetails {
  location: Location | null,
  player1: User | string |null,
  player2: User | string | null,
  player1BallColour: string | null,
  player1Score: number | null,
  player2Score: number | null,
}

const game = ref<GameDetails>({
  location: null,
  player1: null,
  player2: null,
  player1BallColour: null,
  player1Score: null,
  player2Score: null
})

const ballColours = computed<string[]>(() => game.value.location !== null ? getLocations.find((loc) => loc.id === game.value.location?.id)?.ballColours : [])

const registerGame = async () => {
  const gameToInsert = {
    player1: isAuthenticated.value ? user.value : game.value.player1,
    player2: game.value.player2,
    player1BallColour: game.value.player1BallColour,
    player2BallColour: game.value.location!.ballColours.find(colour => colour !== game.value.player1BallColour),
    location: game.value.location,
    player1Score: game.value.player1Score,
    player2Score: game.value.player2Score
  } as Game

  if(isAuthenticated.value) {
    await createGame(gameToInsert)
  }

  setGames([...allGames, gameToInsert])

  game.value = {
    location: null,
    player1: null,
    player2: null,
    player1BallColour: null,
    player1Score: null,
    player2Score: null
  }

  visible.value = false
}
</script>