<template>
  <div>
    <Button label="Register your game" class="bg-lime-300 border-lime-300 text-gray-800" @click="registerGameModalVisible = !registerGameModalVisible"/>
    <TabView class="mt-5" :pt="tabViewPt">
      <TabPanel header="Results" :pt="tabPanelPt">
        <DataView :value="isAuthenticated ? verifiedGames : allGames" class="mt-6">
          <template #empty>
            <div class="flex bg-gray-700 text-white rounded px-12 py-6 drop-shadow-xl text-lg justify-center">
              No verified games! Click the 'Register Your Game' button to log a result.
            </div>
          </template>
          <template #list="slotProps">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <GameDetails :game="item" :class="{ 'rounded-t': index === 0, 'rounded-b': index === (slotProps.items.length - 1) }"/>
            </div>
          </template>
        </DataView>
      </TabPanel>
      <TabPanel header="Requests" v-if="isAuthenticated" :pt="tabPanelPt">
        <DataView :value="gameRequests" class="mt-6">
          <template #empty>
            <div class="flex bg-gray-700 text-white rounded px-12 py-6 drop-shadow-xl text-lg justify-center">
              No game requests! Register a game against another user by clicking 'Register Your Game' button.
            </div>
          </template>
          <template #list="slotProps">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <GameDetails :game="item" :key="item" :class="{ 'rounded-t': index === 0, 'rounded-b': index === (slotProps.items.length - 1) }"/>
            </div>
          </template>
        </DataView>
      </TabPanel>
    </TabView>

    <RegisterModal v-model="registerGameModalVisible" />
  </div>
</template>

<script setup lang="ts">
import { definePage } from "vue-router/auto";
import RegisterModal from "../components/game/RegisterModal.vue";
import { useGameStore } from "../composables/store/useGameStore.ts";
import {computed, onBeforeMount, ref} from "vue";
import GameDetails from "../components/game/GameDetails.vue";
import {useUserStore} from "../composables/store/useUserStore.ts";
import {storeToRefs} from "pinia";
import {getAllGames} from "../api.ts";

const store = useGameStore()
const { allGames } = storeToRefs(store)
const { isAuthenticated, verifiedGames, gameRequests } = storeToRefs(useUserStore())

definePage({
  meta: { title: "Games" }
})

const registerGameModalVisible = ref<boolean>(false)

const tabPanelPt = computed(() => ({
  headerAction: () => ({
      class: 'bg-gray-50 text-gray-700'
  })
}))

const tabViewPt = computed(() => ({
  nav: 'bg-gray-50',
  panelContainer: 'bg-gray-50'
}))

onBeforeMount(async () => {
  if(isAuthenticated.value){
    await getAllGames()
  }
})
</script>