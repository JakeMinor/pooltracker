<template>
  <div>
    <Button label="Register your game" class="bg-lime-300 border-lime-300 text-gray-800" @click="registerGameModalVisible = !registerGameModalVisible"/>
    <DataView>

    </DataView>
    <RegisterModal v-model="registerGameModalVisible" />
  </div>
</template>

<script setup lang="ts">
import { definePage } from "vue-router/auto";
import RegisterModal from "../../components/game/RegisterModal.vue";
import {ref} from "vue";

definePage({
  meta: { title: "Games" }
})

const registerGameModalVisible = ref<boolean>(false)

</script>