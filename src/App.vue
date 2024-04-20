<template>
  <Layout>
    <template #top>
      <h1 class="my-auto font-bold text-2xl">{{ title }}</h1>
    </template>
    <RouterView class="pt-8"/>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "./components/Layout.vue";
import { router } from "./composables/useRouter.ts";
import {computed, onMounted} from "vue";
import {useReferenceDataStore} from "./composables/store/useReferenceDataStore.ts";

const title = computed<string>(() => router.currentRoute.value.meta.title)

onMounted(async () => {
  const { setReferenceData } = useReferenceDataStore()

  await setReferenceData()
})
</script>
