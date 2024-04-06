<template>
  <FloatLabel>
    <slot :id="label" />
    <label :for="label">{{ label}}</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';

interface FormFieldProps {
  label: string
}

const { label } = defineProps<FormFieldProps>()

</script>