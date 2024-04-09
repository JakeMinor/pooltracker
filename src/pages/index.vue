<template>
  <div>
    <Button label="Register your game" class="bg-lime-300 border-lime-300 text-gray-800" @click="registerGameModalVisible = !registerGameModalVisible"/>
    <DataView :value="allGames">
      <template #list="slotProps">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <GameDetails :game="item" />
        </div>
      </template>
    </DataView>
    <RegisterModal v-model="registerGameModalVisible" />
  </div>
</template>

<script setup lang="ts">
import { definePage } from "vue-router/auto";
import RegisterModal from "../components/game/RegisterModal.vue";
import { useGameStore } from "../composables/store/useGameStore.ts";
import {onMounted, ref} from "vue";
import GameDetails from "../components/game/GameDetails.vue";

const { getGames, allGames } = useGameStore()

definePage({
  meta: { title: "Games" }
})

const registerGameModalVisible = ref<boolean>(false)

onMounted(async () => await getGames())
</script>