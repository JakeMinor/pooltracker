<template>
  <div class="flex">
    <slot />
    <div class="ml-auto">
      <UsersName v-if="isAuthenticated"/>
      <Button v-else label="Sign In" class="bg-lime-300 border-lime-300 text-gray-800" @click="signIn"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {authenticate, getAllGames} from "../api.ts"
import UsersName from "./user-details/UsersName.vue";
import { useUserStore } from "../composables/store/useUserStore.ts";
import {storeToRefs} from "pinia";

const { isAuthenticated } = storeToRefs(useUserStore())
const signIn = async () => {
  await authenticate()

  await getAllGames()
}
</script>