<template>
  <div class="flex bg-gray-700 text-white px-12 py-6 drop-shadow-xl text-2xl">
    <div class="basis-1/2 flex" :class="{ 'text-gray-300': !isPlayer1Winner}">
      <div class="ml-auto mr-7 text-lg my-auto flex flex-row ">
        <Image :src="player1Avatar" v-if="player1Avatar" width="50px" class="mr-5"/>
        <div class="my-auto">{{ game.player1Name }}</div>
      </div>
      <div class="mr-10 italic font-black my-auto" :class="{ 'text-lime-300': isPlayer1Winner}">
        {{ game.player1Score }}
      </div>
    </div>
    <span class="text-xs my-auto text-gray-300">VS</span>
    <div class="basis-1/2 flex" :class="{ 'text-gray-300': isPlayer1Winner}" >
      <span class="ml-10 bold italic font-black my-auto" :class="{ 'text-lime-300': !isPlayer1Winner}">
        {{ game.player2Score }}
      </span>
      <div class="ml-7 text-lg my-auto flex flex-row">
        <div class="my-auto">{{ game.player2Name }}</div>
        <Image :src="player2Avatar" v-if="player2Avatar" width="50px" class="ml-5"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Game} from "../../types/types.ts";
import {computed} from "vue";
import {getUser} from "../../utilities";

interface GameDetailsProps {
  game: Game
}

const { game } = defineProps<GameDetailsProps>()

const player1Avatar = computed<string | null>(() => game.player1Id ? getUser(game.player1Id)!.avatar : null)
const player2Avatar = computed<string | null>(() => game.player2Id ? getUser(game.player2Id)!.avatar : null)

const isPlayer1Winner = computed<boolean>(() => game.player1Score > game.player2Score)
</script>