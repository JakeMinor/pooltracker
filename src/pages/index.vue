<template>
  <div class="w-100">
    <div class="flex">
      <StatCard title="General" class="basis-3/5 pr-5">
        Total Wins, Total Loses, Win/Loss Ratio, Total Balls potted, Total Games played
      </StatCard>
      <StatCard title="Last Game" class="basis-2/5">
        Last Game Stats
      </StatCard>
    </div>
    <div class="pt-20">
      <h2 class="text-lg font-semibold pb-2">Some More Stats</h2>
      <div class="flex">
        <StatCard class="basis-1/4 pr-5">
          Average balls potted per game
        </StatCard>
        <StatCard  class="basis-1/4 pr-5">
          Best Location
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
import StatCard from "../components/utility/StatCard.vue";
import { definePage } from "vue-router/auto";

definePage({
  meta: { title: "Dashboard" }
})

</script>