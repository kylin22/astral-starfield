<template>
  <TresCanvas>
    <Starfield/>
  </TresCanvas>
</template>

<script lang="ts" setup>
  import { TresCanvas } from "@tresjs/core";
  import Starfield from "./components/Starfield.vue";
</script>

<style lang="scss">
html, body, #__nuxt, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>