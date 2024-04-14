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
import {onBeforeMount, ref} from "vue";
import GameDetails from "../components/game/GameDetails.vue";
import {useUserStore} from "../composables/store/useUserStore.ts";
import {storeToRefs} from "pinia";
import {getAllGames} from "../api.ts";

const store = useGameStore()
const { allGames, usersGames } = storeToRefs(store)
const { isAuthenticated } = storeToRefs(useUserStore())

definePage({
  meta: { title: "Games" }
})

const registerGameModalVisible = ref<boolean>(false)

onBeforeMount(async () => {
  if(isAuthenticated.value){
    await getAllGames()
  }
})
</script>