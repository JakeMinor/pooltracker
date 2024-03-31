<template>
  <Button label="Hello!" class="ms-12"/>
</template>

<script setup lang="ts">
import { getAll } from "../api.ts";
import {onMounted, ref} from "vue";

const users = ref<any>()

onMounted(async () => {
  users.value = await getAll("users")
})
</script>