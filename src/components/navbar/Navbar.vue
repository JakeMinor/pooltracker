<template>
  <div class="h-lvh bg-gray-800 shadow-lg w-28 flex flex-col">
    <div class="m-auto pt-5">
      <Logo class="mx-auto"/>
    </div>

    <div class="py-24 flex flex-col justify-around basis-full">
      <NavbarIcon route="/" icon="ion:home"/>
      <NavbarIcon route="/game" icon="game-icons:pool-table-corner"/>
      <NavbarIcon route="/leagues" icon="ic:round-leaderboard"/>
      <NavbarIcon route="/profile" icon="ion:person"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavbarIcon from "./NavbarIcon.vue";
</script>