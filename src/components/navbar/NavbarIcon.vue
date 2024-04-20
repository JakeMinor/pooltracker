<template>
  <div
      class="cursor-pointer py-8"
      :class="{ 'border-r-lime-300 border-r-4': isActive}"
      @click="router.push(route)"
  >
    <Icon
        :icon="icon"
        :class="isActive ? 'text-lime-300' : 'text-white'"
        class="mx-auto"
        height="40px"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from "vue-router/auto";
import {computed} from "vue";

const router = useRouter()

interface NavbarIconProps {
  route: string,
  icon: string
}

const { route, icon } = defineProps<NavbarIconProps>()

const isActive = computed<boolean>(() => router.currentRoute.value.path == route)
</script>