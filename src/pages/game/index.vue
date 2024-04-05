<template>
  <div>
    <Button label="Register your game" class="bg-lime-300 border-lime-300 text-gray-800" @click="visible = true"/>
    <DataView>
      
    </DataView>
    <RegisterGame v-model="visible"/>
  </div>
</template>

<script setup lang="ts">
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import RegisterGame from "../../components/game/RegisterGame.vue";

definePage({
  meta: { title: "Games" }
})

const visible = ref<boolean>(false)
</script>