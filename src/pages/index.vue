<template>
  <div>
    <Button label="Register your game" class="bg-lime-300 border-lime-300 text-gray-800" @click="registerGameModalVisible = !registerGameModalVisible"/>
    <DataView :value="isAuthenticated ? usersGames : allGames" class="mt-6">
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
import {useUserStore} from "../composables/store/useUserStore.ts";
import {storeToRefs} from "pinia";
import { getAll } from "../api.ts";

const store = useGameStore()
const { allGames, usersGames } = storeToRefs(store)
const { setGames } = store
const { isAuthenticated } = storeToRefs(useUserStore())

definePage({
  meta: { title: "Games" }
})

const registerGameModalVisible = ref<boolean>(false)

onMounted(async () => {
  if(isAuthenticated.value) {
    const games = await getAll("games")
    setGames(games)
  }
})

// TODO: Rework Register Game modal to accommodate for non-auth users
// Should be able to select from a list or type depending if they have an account.
</script>