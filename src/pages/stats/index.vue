<template>
  <div class="w-100">
    <div class="flex">
      <StatCard title="General" class="basis-3/5 pr-5">
        Total Wins = {{ totalWins }}, Total Loses = {{ totalLoss }}, Win percentage = {{ Math.round(totalWins / verifiedGames.length * 100) }}%, Total Balls potted = {{ totalBallsPotted }}, Total Games played = {{ totalGamesPlayed }}
      </StatCard>
      <StatCard title="Last Game" class="basis-2/5">
        Last Game Stats
      </StatCard>
    </div>
    <div class="pt-20">
      <h2 class="text-lg font-semibold pb-2">Some More Stats</h2>
      <div class="flex">
        <StatCard class="basis-1/4 pr-5">
          Average balls potted per game = {{ Math.round(totalBallsPotted / totalGamesPlayed) }}
        </StatCard>
        <StatCard  class="basis-1/4 pr-5">
          Best Location = {{ }}
        </StatCard>
        <StatCard  class="basis-1/4 pr-5">
          Best Ball Colour
        </StatCard>
        <StatCard class="basis-1/4">
          Nemesis
          Best Friend
        </StatCard>
      </div>
    </div>
    <div class="flex pt-20">
      <StatCard title="Current Form" class="basis-3/5 pr-5">
        Current Form
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

const { verifiedGames, id } = storeToRefs(useUserStore())

definePage({
  name: "Your Stats",
  meta: { title: "Your Stats" }
})

const totalWins = computed<number>(() => verifiedGames.value.filter(game => game.player1Id === id.value ? game.player1Score > game.player2Score : game.player2Score > game.player1Score).length)
const totalLoss = computed<number>(() => verifiedGames.value.filter(game => game.player1Id === id.value ? game.player1Score < game.player2Score : game.player2Score < game.player1Score).length)
const totalBallsPotted = computed<number>(() => verifiedGames.value.map(game => game.player1Id === id.value ? game.player1Score : game.player2Score).reduce((a, b) => a + b, 0))
const totalGamesPlayed = computed<number>(() => verifiedGames.value.length)
</script>