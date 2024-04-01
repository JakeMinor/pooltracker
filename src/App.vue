<template>
  <Menubar>
    <template #start>
      Pool Tracker
    </template>
    <template #end>
      <div class="flex" v-if="username && profilePhotoUrl">
        <span class="my-auto">{{ username }}</span>
        <img :alt="`${username}'s google profile photo`" :src="profilePhotoUrl" width="50px" height="50px" class="ms-3"/>
      </div>

    </template>
  </Menubar>
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from "./composables/store/useUserStore.ts";
import {computed} from "vue";

const store = useUserStore()

const username = computed<string>(() => store.name)
const profilePhotoUrl = computed<string>(() => store.avatarUrl)

</script>
