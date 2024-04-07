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
        <FormField label="Opponent" class="mt-6 w-full">
          <Dropdown class="w-full" v-model="game.player2" :options="opponents" option-label="name"/>
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
import {computed, reactive} from "vue";
import {useUserStore} from "../../composables/store/useUserStore.ts";
import {Game, Location, User} from "../../types/types.ts";
import {useReferenceDataStore} from "../../composables/store/useReferenceDataStore.ts";

const { user } = useUserStore()
const { getLocations, getUsers } = useReferenceDataStore()

const opponents = getUsers?.filter((opponent) => opponent.id !== user?.id)

const visible = defineModel<boolean>()

interface GameDetails {
  location: Location | null,
  player2: User | null,
  player1BallColour: string | null,
  player1Score: number | null,
  player2Score: number | null,
}

const game = reactive<GameDetails>({
  location: null,
  player2: null,
  player1BallColour: null,
  player1Score: null,
  player2Score: null
})

const ballColours = computed<string[]>(() => game.location !== null ? getLocations.find((loc) => loc.id === game.location?.id)?.ballColours : [])

const registerGame = async () => {
  const gameToInsert = {
    player1: user!.id,
    player2: game.player2!.id,
    player1BallColour: game.player1BallColour,
    player2BallColour: game.location!.ballColours.find(colour => colour !== game.player1BallColour),
    location: game.location!.id,
    player1Score: game.player1Score,
    player2Score: game.player2Score
  } as unknown as Game

  console.log(gameToInsert)

  await createGame(gameToInsert)

  visible.value = false
}
</script>