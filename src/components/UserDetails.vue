<template>
  <div class="flex">
    <slot />
    <div class="ml-auto">
      <UsersName v-if="store.isAuthenticated"/>
      <Button v-else label="Sign In" class="bg-lime-300 border-lime-300 text-gray-800" @click="store.authenticate()"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../composables/store/useUserStore.ts";

const store = useUserStore()

</script>