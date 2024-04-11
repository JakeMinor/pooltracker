<template>
  <Dialog v-model:visible="visible" modal header="Register game" :style="{ width: '25rem' }" :closable="false">
    <span class="p-text-secondary mb-5">Register your game against your opponent!</span>
    <div>
      <div class="mt-7">
        <h2 class="font-semibold">Setting</h2>
        <div class="flex flex-col w-full">
          <FormField label="Location" class="mt-6" :error="errors.location">
            <Dropdown class="w-full" v-model="location" :options="getLocations" option-label="name"
                      :invalid="errors.location"/>
          </FormField>
          <FormField label="Colour of Ball" class="mt-7" :error="errors.player1BallColour">
            <Dropdown class="w-full" v-model="player1BallColour" :disabled="location === undefined" :options="ballColours"
                      :invalid="errors.player1BallColour"/>
          </FormField>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-semibold">Game Details</h2>
        <FormField label="Player 1" class="mt-6 w-full" v-if="!isAuthenticated" :error="errors.player1">
          <Dropdown class="w-full" editable v-model="player1" :options="opponents" option-label="name"
                    :invalid="errors.player1"/>
        </FormField>
        <FormField :label="isAuthenticated ? 'Opponent' : 'Player 2'" class="mt-7 w-full" :error="errors.player2">
          <Dropdown class="w-full" editable v-model="player2" :options="opponents" option-label="name"
                    :invalid="errors.player2"/>
        </FormField>
        <div class="flex mt-8">
          <FormField label="Home" class="mr-5" :error="errors.player1Score">
            <InputNumber v-model="player1Score" input-class="w-1/2" :invalid="errors.player1Score || !validTotal" :min="0" />
          </FormField>
          <span class="text-xl mt-1">:</span>
          <FormField label="Away" class="ml-5" :error="errors.player2Score">
            <InputNumber v-model="player2Score" input-class="w-1/2" :invalid="errors.player2Score || !validTotal" :min="0" />
          </FormField>
        </div>
      </div>
      <div v-if="!validTotal" class="text-xs mt-2 text-center text-red-400">Score must be less than 15</div>
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
import {computed} from "vue";
import {useUserStore} from "../../composables/store/useUserStore.ts";
import {Game, Location} from "../../types/types.ts";
import {useReferenceDataStore} from "../../composables/store/useReferenceDataStore.ts";
import {useGameStore} from "../../composables/store/useGameStore.ts";
import { useForm } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import {storeToRefs} from "pinia";

const { id, user, isAuthenticated } = storeToRefs(useUserStore())
const { setGames, allGames } = useGameStore()
const { getLocations, getUsers } = useReferenceDataStore()

const opponents = getUsers?.filter((opponent) => opponent.id !== id.value)
const visible = defineModel<boolean>()

const validationSchema = toTypedSchema(
    z.object({
      player1: z.string().or(z.object({ id: z.string(), name: z.string(), avatarUrl: z.string(), email: z.string()})),
      player2: z.string().or(z.object({ id: z.string(), name: z.string(), avatarUrl: z.string(), email: z.string()})),
      location: z.string().or(z.object({ id: z.string(), name: z.string(), ballColours: z.array(z.string())})),
      player1BallColour: z.string(),
      player1Score: z.number({ required_error: "Required", invalid_type_error: "Required"}).lte(8, { message: "Score should be between 0-8" }).gte(0, { message: "Score should be between 0-8" }),
      player2Score: z.number({ required_error: "Required", invalid_type_error: "Required" }).lte(8, { message: "Score should be between 0-8"}).gte(0, { message: "Score should be between 0-8" })
    })  .required()
)

const { errors, defineField, validate } = useForm({
  validationSchema
})

const [player1] = defineField('player1')
const [player2] = defineField('player2')
const [location] = defineField('location')
const [player1BallColour] = defineField('player1BallColour')
const [player1Score] = defineField('player1Score')
const [player2Score] = defineField('player2Score')

const ballColours = computed<string[]>(() => location.value !== null ? getLocations.find((loc) => loc.id === location.value?.id)?.ballColours : [])
const validTotal = computed<boolean>(() => (player1Score.value ?? 0) + (player2Score.value ?? 0) <= 15)


const registerGame = async () => {

  console.log("validTotal", validTotal.value)
  console.log("Validate", (await validate()).valid)

  if(!((await validate()).valid || validTotal.value)){
    return false;
  }
  
  const gameToInsert = {
    player1: isAuthenticated.value ? user.value : player1.value,
    player2: player2.value,
    player1BallColour: player1BallColour.value,
    player2BallColour: (location.value! as Location).ballColours!.find(colour => colour !== player1BallColour.value),
    location: location.value,
    player1Score: player1Score.value,
    player2Score: player2Score.value
  } as Game

  if(isAuthenticated.value) {
    await createGame(gameToInsert)
  }

  setGames([...allGames, gameToInsert])
  
  visible.value = false
}
</script>