<template>
  <div class="w-100">
    <div class="flex">
      <StatCard title="General" class="basis-3/5 pr-5 h-10">
        <div class="px-12 py-6">
          <div class="flex justify-around">
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Games played</span>
              <span class="mx-auto">{{ totalGamesPlayed }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Wins</span>
              <span class="mx-auto">{{ wins.length }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Loses</span>
              <span class="mx-auto">{{ losses.length }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Win percentage</span>
              <span class="mx-auto">{{ isNaN(winPercentage) ? 0 : winPercentage }}%</span>
            </div>
          </div>
          <div class="flex mt-10 justify-around">
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Balls Potted</span>
              <span class="mx-auto">{{ totalBallsPotted }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-300 text-sm">Balls Potted</span>
              <span class="mx-auto">{{ totalBallsPotted }}</span>
            </div>
          </div>
        </div>
      </StatCard>
      <StatCard title="Last Game" class="basis-2/5 overflow-hidden">
        <div class="px-12 py-10">
          <div class="flex">
            <div class="flex ms-auto">
              <div>
                <BallColour class="mx-auto" :ball-colour="lastGame.player1BallColour"/>
                <p class="mt-2">{{ lastGame.player1Name }}</p>
              </div>

              <span class="ms-7 my-auto">{{ lastGame.player1Score }}</span>
            </div>
            <span class="mx-5 my-auto">vs</span>
            <span class="me-7 my-auto">{{ lastGame.player2Score }}</span>
            <div class="flex me-auto">
              <div>
                <BallColour class="mx-auto" :ball-colour="lastGame.player2BallColour"/>
                <p class="mt-2">{{ lastGame.player2Name }}</p>
              </div>
            </div>
          </div>
          <div class="mt-4 flex">
            <span class="mx-auto text-gray-300">{{ getLocationName(lastGame.location) }} - {{ dayjs(lastGame.created).format('DD/MM/YYYY @ HH:mm') }}</span>
          </div>

        </div>

      </StatCard>
      </div>
      <div class="pt-20">
        <h2 class="text-lg font-semibold pb-2">Some More Stats</h2>
        <div class="flex">
          <StatCard class="basis-1/4 pr-5">
            <div class="px-12 py-6">
              Average balls potted per game = {{ isNaN(averageBallPottedPerGame) ? 0 : averageBallPottedPerGame }}
            </div>
          </StatCard>
          <StatCard  class="basis-1/4 pr-5">
            <div class="px-12 py-6">
              Best Location = {{ getLocationName(bestLocation) }}
            </div>
          </StatCard>
          <StatCard  class="basis-1/4 pr-5">
            <div class="px-12 py-6">
              Best Ball Colour = {{ bestBallColour }}
            </div>
          </StatCard>
          <StatCard class="basis-1/4">
            <div class="px-12 py-6">
              Nemesis = {{ nemesis }}<br />
              Best Friend = {{ bestFriend }}
            </div>
          </StatCard>
      </div>
    </div>
    <div class="flex pt-20">
      <StatCard title="Current Form" class="basis-3/5 pr-5">
        <div class="px-12 py-6">
          Current Form
          {{ last5Games }}
        </div>
      </StatCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from "../../components/utility/StatCard.vue";
import { useUserStore } from '../../composables/store/useUserStore.ts'
import { definePage } from "vue-router/auto";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import dayjs from "dayjs";
import {getLocationName} from "../../utilities.ts";
import { Game } from "../../types/types.ts";
import BallColour from "../../components/stats/BallColour.vue";

const { verifiedGames, id } = storeToRefs(useUserStore())

definePage({
  name: "Your Stats",
  meta: { title: "Your Stats" }
})

const wins = computed(() => verifiedGames.value.filter(game => game.player1Id === id.value ? game.player1Score > game.player2Score : game.player2Score > game.player1Score))
const losses = computed(() => verifiedGames.value.filter(game => game.player1Id === id.value ? game.player1Score < game.player2Score : game.player2Score < game.player1Score))
const totalBallsPotted = computed<number>(() => verifiedGames.value.map(game => game.player1Id === id.value ? game.player1Score : game.player2Score).reduce((a, b) => a + b, 0) ?? 0)
const totalGamesPlayed = computed<number>(() => verifiedGames.value.length ?? 0)

const winPercentage = computed<number>(() => Math.round(wins.value.length / totalGamesPlayed.value * 100))
const averageBallPottedPerGame = computed<number>(() => Math.round(totalBallsPotted.value / totalGamesPlayed.value))
const bestLocation = computed<string>(() => mode(wins.value.map(game => game.location)) ?? "None")
const bestBallColour = computed<string>(() => mode(wins.value.map(game => game.player1Id === id.value ? game.player1BallColour : game.player2BallColour)) ?? "None")

const nemesis = computed<string>(() => mode(losses.value.map(game =>  game.player1Id === id.value ? game.player2Name : game.player1Name)) ?? "None")
const bestFriend = computed<string>(() => mode(wins.value.map(game =>  game.player1Id === id.value ? game.player2Name : game.player1Name)) ?? "None")

const last5Games = computed<Game[]>(() => verifiedGames.value.sort((a, b) => dayjs(a.created).toDate().getTime() - dayjs(b.created).toDate().getTime()).slice(0, 5))
const lastGame = computed<Game>(() => verifiedGames.value.sort((a, b) => dayjs(a.created).toDate().getTime() - dayjs(b.created).toDate().getTime())[0])
function mode(array : string[]) : string | null {
  if(array.length == 0)
    return null;
  var modeMap = {} as any;
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++)
  {
    var el = array[i];
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

</script>
