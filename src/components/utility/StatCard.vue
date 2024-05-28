<template>
  <div>
    <h2 class="text-lg font-semibold pb-2" v-if="title">{{ title }}</h2>
    <div class="bg-gray-700 text-white rounded h-full drop-shadow-xl">
      <slot />
    </div>
  </div>

</template>

<script setup lang="ts">

interface StatCardProps {
  title?: string
}

const { title } = defineProps<StatCardProps>()
</script>