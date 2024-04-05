<template>
  <Sidebar v-model:visible="visible" position="right" class="md:w-20rem lg:w-30rem">
    <h2 class="text-lg font-semibold pb-2">Register your game</h2>
  </Sidebar>
</template>

<script setup lang="ts">
  const visible = defineModel<boolean>()
</script>