<template>
  <Dialog v-model:visible="visible" modal header="Register game" :style="{ width: '25rem' }" >
    <span class="p-text-secondary mb-5">Register your game against your opponent!</span>
    <div>
      <div class="mt-5">
        <h2 class="font-semibold">Setting</h2>
        <div class="flex flex-col w-full">
          <FormField label="Location" class="mt-6">
            <Dropdown class="w-full"/>
          </FormField>
          <FormField label="Colour of Ball" class="mt-7">
            <Dropdown class="w-full"/>
          </FormField>
        </div>
      </div>

      <div class="mt-5">
        <h2 class="font-semibold">Final Score</h2>
        <FormField label="Opponent" class="mt-6 w-full">
          <Dropdown class="w-full"/>
        </FormField>
        <div class="flex mt-8">
          <FormField label="Home" class="mr-5">
            <InputNumber v-model="score.home" input-class="w-1/2"/>
          </FormField>
          <span class="text-xl my-auto">:</span>
          <FormField label="Away" class="ml-5">
            <InputNumber v-model="score.away" input-class="w-1/2" />
          </FormField>
        </div>
      </div>

      <div class="flex mt-8">
        <Button class="ml-auto mr-2" type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button class="bg-lime-300 border-lime-300 text-gray-800" type="button" label="Save" @click="visible = false"></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import FormField from "../utility/FormField.vue";
import {ref} from "vue";

interface Score {
  home: number,
  away: number
}

const visible = defineModel<boolean>()

const score = ref<Score>({})
</script>