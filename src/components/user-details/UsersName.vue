<template>
  <div class="flex cursor-pointer" @click="dropdownOpen = !dropdownOpen">
    <Icon :icon="dropdownOpen ? 'ion:chevron-up-outline' : 'ion:chevron-down-outline'" class="my-auto mr-1" />
    <div class="mr-5 my-auto">{{ name }}</div>
    <Image :src="avatarUrl" v-if="avatarUrl" width="50" image-class="rounded-full" />
  </div>
  <ProfileDropdown :dropdown-open="dropdownOpen" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useUserStore } from "../../composables/store/useUserStore.ts";
import ProfileDropdown from "./ProfileDropdown.vue";
import {storeToRefs} from "pinia";

const dropdownOpen = ref(false)
const { avatarUrl, name } = storeToRefs(useUserStore())

</script>