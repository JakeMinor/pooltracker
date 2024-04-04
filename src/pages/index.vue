<template>
  <div class="flex w-100">
    <StatCard title="Stat" class="basis-3/5 pr-5">
      I am a stat
    </StatCard>
    <StatCard title="Some Stat" class="basis-2/5">
      I am another Stat :)
    </StatCard>
  </div>
</template>

<script setup lang="ts">
import { getAll } from "../api.ts";
import {onMounted, ref} from "vue";
import StatCard from "../components/StatCard.vue";

const users = ref<any>()

onMounted(async () => {
  users.value = await getAll("test")
})
</script>