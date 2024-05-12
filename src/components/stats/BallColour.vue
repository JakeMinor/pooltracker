<template>
  <img :alt="altTag" :src="`/src/assets/${ballColour}-ball.png`"  width="25px"/>
</template>

<script setup lang="ts">

import {computed} from "vue";

interface BallColourProps {
  ballColour: "red" | "yellow" | "spots" | "stripes"
}

const { ballColour } = defineProps<BallColourProps>()

const altTag = computed<string>(() => {
  switch (ballColour) {
    case "yellow":
      return "Ball one icons created by Boris farias - Flaticon (https://www.flaticon.com/free-icons/ball-one)"
    case "spots":
      return "Ball two icons created by Boris farias - Flaticon (https://www.flaticon.com/free-icons/ball-two)"
    case "stripes":
      return "Ball thirteen icons created by Boris farias - Flaticon (https://www.flaticon.com/free-icons/ball-thirteen)"
    default:
    case "red":
      return "Ball three icons created by Boris farias - Flaticon (https://www.flaticon.com/free-icons/ball-three)"
  }
})

</script>