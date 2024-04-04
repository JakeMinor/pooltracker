<template>
  <div class="bg-gray-50 flex">
    <Navbar />
    <div class="w-100 py-5 px-10">
      <UserDetails>
        <slot name="top" />
      </UserDetails>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

import Navbar from "./navbar/Navbar.vue";
import UserDetails from "./UserDetails.vue";
</script>