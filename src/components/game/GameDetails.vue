<template>
  <div class="flex bg-gray-700 text-white rounded px-12 py-6 drop-shadow-xl text-2xl">
    <div class="basis-1/2 flex" :class="{ 'text-gray-300': !isPlayer1Winner}">
      <div class="ml-auto mr-7 text-lg my-auto">
        <Image :src="(game.player1 as User).avatarUrl" v-if="isAuthenticated"/>
        {{ player1Name }}
      </div>
      <div class="mr-10 italic font-black" :class="{ 'text-lime-300': isPlayer1Winner}">
        {{ game.player1Score }}
      </div>
    </div>
    <span class="text-xs my-auto text-gray-300">VS</span>
    <div class="basis-1/2 flex" :class="{ 'text-gray-300': isPlayer1Winner}" >
      <span class="ml-10 bold italic font-black" :class="{ 'text-lime-300': !isPlayer1Winner}">
        {{ game.player2Score }}
      </span>
      <div class="ml-7 text-lg my-auto">
        <Image :src="(game.player2 as User).avatarUrl" v-if="isAuthenticated"/>
        <span>{{ player2Name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Game, User} from "../../types/types.ts";
import {useUserStore} from "../../composables/store/useUserStore.ts";
import {storeToRefs} from "pinia";
import {computed} from "vue";

interface GameDetailsProps {
  game: Game
}

const { isAuthenticated } = storeToRefs(useUserStore())

const { game } = defineProps<GameDetailsProps>()

const player1Name = computed<string>(() => typeof game.player1 === "object" ? game.player1.name : game.player1)
const player2Name = computed<string>(() => typeof game.player2 === "object" ? game.player2.name : game.player2)

const isPlayer1Winner = computed<boolean>(() => game.player1Score > game.player2Score)
const isDraw = computed<boolean>(() => game.player1Score === game.player2Score)
</script>