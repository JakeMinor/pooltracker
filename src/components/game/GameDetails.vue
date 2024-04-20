<template>
  <div class="flex bg-gray-700 text-white ps-12 py-6 drop-shadow-xl text-2xl">
    <div class="flex flex-col mx-auto ">
      <div class="flex">
        <div class="flex" :class="{ 'text-gray-300': !isPlayer1Winner}">
          <div class="ml-auto mr-7 text-lg my-auto flex flex-row ">
            <Image :src="player1Avatar" v-if="player1Avatar" width="50px" class="mr-5"/>
            <div class="my-auto">{{ game.player1Name }}</div>
          </div>
          <div class="mr-10 italic font-black my-auto" :class="{ 'text-lime-300': isPlayer1Winner}">
            {{ game.player1Score }}
          </div>
        </div>
        <span class="text-xs my-auto text-gray-300">VS</span>
        <div class="flex" :class="{ 'text-gray-300': isPlayer1Winner}" >
      <span class="ml-10 bold italic font-black my-auto" :class="{ 'text-lime-300': !isPlayer1Winner}">
        {{ game.player2Score }}
      </span>
          <div class="ml-7 text-lg my-auto flex flex-row">
            <div class="my-auto">{{ game.player2Name }}</div>
            <Image :src="player2Avatar" v-if="player2Avatar" width="50px" class="ml-5"/>
          </div>
        </div>
      </div>
      <div class="mx-auto text-xs text-gray-300">
        {{ getLocationName(game.location) }} | {{ dayjs(game.created).format('DD/MM/YYYY @ HH:mm:ss') }}  {{ hasApproved && !isGameVerified ? ' | Approved' : ''}}
      </div>
    </div>
    <Button label="action" class=" bg-transparent border-transparent text-white absolute right-12" @click="toggle" v-if="!hasApproved">
      <Icon icon="bi:three-dots-vertical" height="30px"/>
    </Button>
    <OverlayPanel ref="op" v-if="!hasApproved">
      <div class="flex flex-col">
        <Button link class="text-gray-700 px-1 hover:bg-lime-300" @click="acceptRequest(game, isUserPlayer1 ? 'player1' : 'player2')">
          <Icon icon="bi:check" height="25px"/>Accept
        </Button>
        <Button link class="text-gray-700 px-1 hover:bg-lime-300" @click="denyRequest(game.id)">
          <Icon icon="bi:x" height="25px"/>Deny
        </Button>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import { Game} from "../../types/types.ts";
import {computed, ref} from "vue";
import {getLocationName, getUser} from "../../utilities";
import { useUserStore } from "../../composables/store/useUserStore.ts";
import dayjs from 'dayjs'
import OverlayPanel from 'primevue/overlaypanel'
import { Icon } from "@iconify/vue";
import {acceptRequest, denyRequest} from "../../api.ts";
import {storeToRefs} from "pinia";

interface GameDetailsProps {
  game: Game
}

const { id, verifiedGames } = storeToRefs(useUserStore())

const { game } = defineProps<GameDetailsProps>()

const op = ref()

const toggle = (event : Event) => {
  op.value.toggle(event)
}

const isGameVerified = computed<boolean>(() => verifiedGames.value.some(verifiedGame => verifiedGame.id === game.id))
const hasApproved = computed<boolean>(() => (game.player1Id === id.value && game.player1Verified) || (game.player2Id === id.value && game.player2Verified))

const player1Avatar = computed<string | null>(() => game.player1Id ? getUser(game.player1Id)!.avatar : null)
const player2Avatar = computed<string | null>(() => game.player2Id ? getUser(game.player2Id)!.avatar : null)

const isPlayer1Winner = computed<boolean>(() => game.player1Score > game.player2Score)

const isUserPlayer1 = computed<boolean>(() => game.player1Id === id.value)

</script>