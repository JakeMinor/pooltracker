<template>
  <Dialog v-model:visible="visible" modal header="Register game" :style="{ width: '25rem' }" :closable="false">
    <span class="p-text-secondary mb-5">Register your game against your opponent!</span>
    <div>
      <div class="mt-7">
        <h2 class="font-semibold">Setting</h2>
        <div class="flex flex-col w-full">
          <FormField label="Location" class="mt-6" :error="errors.location">
            <Dropdown class="w-full" v-model="location" :options="getLocations" option-label="name"
                      :invalid="!!errors.location"/>
          </FormField>
          <FormField label="Colour of Ball" class="mt-7" :error="errors.player1BallColour">
            <Dropdown class="w-full" v-model="player1BallColour" :disabled="location === undefined" :options="ballColours"
                      :invalid="!!errors.player1BallColour"/>
          </FormField>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-semibold">Game Details</h2>
        <FormField label="Player 1" class="mt-6 w-full" v-if="!isAuthenticated" :error="errors.player1">
          <Dropdown class="w-full" editable v-model="player1" :options="player1Opponents" option-label="name"
                    :invalid="!!errors.player1"/>
        </FormField>
        <FormField :label="isAuthenticated ? 'Opponent' : 'Player 2'" class="mt-7 w-full" :error="errors.player2">
          <Dropdown class="w-full" editable v-model="player2" :options="player2Opponents" option-label="name"
                    :invalid="!!errors.player2"/>
        </FormField>
        <div class="flex mt-8">
          <FormField label="Home" class="mr-5" :error="errors.player1Score">
            <InputNumber v-model="player1Score" input-class="w-1/2" :invalid="!!errors.player1Score || !!errors.scoresValid" :min="0" />
          </FormField>
          <span class="text-xl mt-1">:</span>
          <FormField label="Away" class="ml-5" :error="errors.player2Score">
            <InputNumber v-model="player2Score" input-class="w-1/2" :invalid="!!errors.player2Score || !!errors.scoresValid" :min="0" />
          </FormField>
        </div>
      </div>
      <div class="text-xs mt-1 text-center text-red-400">{{ errors.scoresValid }}</div>
      <Divider class="mt-8" />
      <div class="flex">
        <Button class="ml-auto mr-2" type="button" label="Cancel" severity="secondary" @click="visible = false" />
        <Button class="bg-lime-300 border-lime-300 text-gray-800" type="button" label="Save" @click="registerGame" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { createGame } from "../../api.ts";
import FormField from "../utility/FormField.vue";
import {computed} from "vue";
import {useUserStore} from "../../composables/store/useUserStore.ts";
import {Game, Location, User} from "../../types/types.ts";
import {useReferenceDataStore} from "../../composables/store/useReferenceDataStore.ts";
import {useGameStore} from "../../composables/store/useGameStore.ts";
import { useForm } from "vee-validate";
import { string, number, mixed, object} from 'yup'
import {storeToRefs} from "pinia";

const { id, user,isAuthenticated } = storeToRefs(useUserStore())
const { setGames, allGames } = useGameStore()
const { getLocations, getUsers } = useReferenceDataStore()

const visible = defineModel<boolean>()

const validationSchema = computed(() => object().shape({
  player2: mixed<User | string>().required("Please select a player or type their name."),
  location: object<Location>().required("Please select where the game was played."),
  player1BallColour: string().required("Please choose your ball colour."),
  player1Score: number().min(0, { message: "Score should be between 0-8" }).max(8, { message: "Score should be between 0-8" }).required("Please add the players score."),
  player2Score: number().min(0, { message: "Score should be between 0-8" }).max(8, { message: "Score should be between 0-8" }).required("Please add the players score."),
  player1: isAuthenticated.value ? mixed<User | string>().optional() : mixed<User | string>().required(),
  scoresValid: string()
})
    .test({
      name: "total-of-scores",
      skipAbsent: true,
      test(value, context) {
        if((value.player2Score ?? 0) + (value.player1Score ?? 0) > 15) {
          return context.createError({ path: "scoresValid", message: "Too many balls! Scores should total 15." })
        }
        return true
      }}))

const { errors, defineField, validate } = useForm({
  validationSchema
})

const [player1] = defineField('player1')
const [player2] = defineField('player2')
const [location] = defineField('location')
const [player1BallColour] = defineField('player1BallColour')
const [player1Score] = defineField('player1Score')
const [player2Score] = defineField('player2Score')

const player1Opponents = computed(() => getUsers?.filter((opponent) => opponent.id !== id.value && opponent.id !== (player2.value as User)?.id))
const player2Opponents = computed(() => getUsers?.filter((opponent) => opponent.id !== id.value && opponent.id !== (player1.value as User)?.id))

const ballColours = computed<string[]>(() => (location.value as Location)?.ballColours)

const registerGame = async () => {
  if(!(await validate()).valid){
    return;
  }
  
  let game = {
    player1Id: isAuthenticated.value ? user.value?.id : player1.value.id,
    player1Name: isAuthenticated.value ? user.value?.name: typeof player1.value === "object" ? player1.value.name : player1.value,
    player2Id: player2.value.id,
    player2Name: typeof player2.value === "object" ? player2.value.name : player2.value,
    player1BallColour: player1BallColour.value,
    player2BallColour: (location.value! as Location).ballColours!.find(colour => colour !== player1BallColour.value),
    location: location.value!.id,
    player1Score: player1Score.value,
    player2Score: player2Score.value,
    player1Verified: isAuthenticated.value && typeof player2.value === "object" ? true : !(typeof player1.value === "object"),
    player2Verified: !(typeof player2.value === "object")
  } as Game



  if(game.player1Id || game.player2Id) {
    game = await createGame(game) ?? game
  }

  setGames([...allGames, game])
  
  visible.value = false
}
</script>