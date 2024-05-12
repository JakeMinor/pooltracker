<template>
  <div class="w-100">
    <div class="flex">
      <StatCard title="General" class="basis-3/5 pr-5">
        Total Wins = {{ wins.length }}, Total Loses = {{ losses.length }}, Win percentage = {{ isNaN(winPercentage) ? 0 : winPercentage }}%, Total Balls potted = {{ totalBallsPotted }}, Total Games played = {{ totalGamesPlayed }}
      </StatCard>
      <StatCard title="Last Game" class="basis-2/5">
        Last Game Stats
        {{ lastGame }}
      </StatCard>
    </div>
    <div class="pt-20">
      <h2 class="text-lg font-semibold pb-2">Some More Stats</h2>
      <div class="flex">
        <StatCard class="basis-1/4 pr-5">
          Average balls potted per game = {{ isNaN(averageBallPottedPerGame) ? 0 : averageBallPottedPerGame }}
        </StatCard>
        <StatCard  class="basis-1/4 pr-5">
          Best Location = {{ bestLocation }}
        </StatCard>
        <StatCard  class="basis-1/4 pr-5">
          Best Ball Colour = {{ bestBallColour }}
        </StatCard>
        <StatCard class="basis-1/4">
          Nemesis = {{ nemesis }}<br />
          Best Friend = {{ bestFriend }}
        </StatCard>
      </div>
    </div>
    <div class="flex pt-20">
      <StatCard title="Current Form" class="basis-3/5 pr-5">
        Current Form
        {{ last5Games }}
      </StatCard>
      <StatCard title="Leagues" class="basis-2/5">
        League table? All users leagues?
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

const last5Games = computed(() => verifiedGames.value.sort((a, b) => dayjs(a.created).toDate().getTime() - dayjs(b.created).toDate().getTime()).slice(0, 5))
const lastGame = computed(() => verifiedGames.value.sort((a, b) => dayjs(a.created).toDate().getTime() - dayjs(b.created).toDate().getTime())[0])
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