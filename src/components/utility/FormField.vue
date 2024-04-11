<template>
  <div class="flex flex-col">
    <FloatLabel>
      <slot :id="label" />
      <label :for="label">{{ label }}</label>
    </FloatLabel>
    <span class="text-xs mt-2 ml-3 text-red-400">{{ error }}</span>
  </div>

</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';

interface FormFieldProps {
  label: string,
  error?: string | undefined
}

const { label } = defineProps<FormFieldProps>()

</script>