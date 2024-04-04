<template>
  <Layout>
    <template #top>
      <h1 class="my-auto font-bold text-2xl">Dashboard</h1>
    </template>
    <RouterView class="pt-8"/>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue";

</script>
