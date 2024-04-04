<template>
  <div class="flex">
    <slot />
    <div class="flex ml-auto">
      <p class="mr-3 my-auto">{{ username }}</p>
      <Image :src="store.avatarUrl" width="50" image-class="rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../composables/store/useUserStore.ts";
import {computed} from "vue";

const store = useUserStore()


const username = computed<string>(() => store.name)
</script>