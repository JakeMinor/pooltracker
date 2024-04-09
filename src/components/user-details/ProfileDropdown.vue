<template>
  <div
      v-show="dropdownOpen"
      class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mr-10"
      role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <a class="text-gray-800 block px-4 py-2 text-sm hover:bg-lime-300 cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-0" @click="signOut">Sign Out</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "../../api.ts"

interface ProfileDropdownProps {
  dropdownOpen: boolean
}

const { dropdownOpen } = defineProps<ProfileDropdownProps>()

</script>