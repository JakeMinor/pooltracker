<template>
  <div class="flex">
    <div class="basis-1/2">
      <div>
        <Image :src="game.player1?.avatarUrl" />
        {{ getUsers.find(s => s.id === game.player1).name }}
      </div>
      <div class="mr-auto">
        {{ game.player1Score }}
      </div>
    </div>
    :
    <div class="basis-1/2">
      <div class="ml-auto">
        {{ game.player2Score }}
      </div>
      <div>
        <Image :src="game.player2?.avatarUrl" />
        {{ getUsers.find(s => s.id === game.player2).name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Game} from "../../types/types.ts";
import {useReferenceDataStore} from "../../composables/store/useReferenceDataStore.ts";

interface GameDetailsProps {
  game: Game
}

const { getUsers } = useReferenceDataStore()


const { game } = defineProps<GameDetailsProps>()

</script>