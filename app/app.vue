<template>
  <TresCanvas>
    <Starfield_test/>
  </TresCanvas>
</template>

<script setup lang="ts">
  import { TresCanvas } from "@tresjs/core"
  import Starfield from "./components/Starfield.vue";
  import Starfield_test from "./components/Starfield_test.vue";
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