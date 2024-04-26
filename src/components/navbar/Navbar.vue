<template>
  <div class="h-lvh bg-gray-800 shadow-lg w-28 flex flex-col">
    <div class="m-auto pt-5">
      <Logo class="mx-auto"/>
    </div>

    <div class="py-24 flex flex-col justify-around basis-full">
      <NavbarIcon route="/" icon="game-icons:pool-table-corner"/>
      <NavbarIcon route="/tournament" icon="iconoir:tournament" v-if="isAuthenticated"/>
      <NavbarIcon route="/leaderboard" icon="ic:round-leaderboard"/>
      <NavbarIcon route="/locations" icon="ph:map-pin-fill"/>
      <NavbarIcon route="/stats" icon="ion:person" v-if="isAuthenticated"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavbarIcon from "./NavbarIcon.vue";
  import {useUserStore} from "../../composables/store/useUserStore.ts";
  import {storeToRefs} from "pinia";

  const { isAuthenticated } = storeToRefs(useUserStore())
</script>