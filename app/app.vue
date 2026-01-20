<template>
  <div v-if="loading" class="loading-overlay">
    <span class="loading-text">
      LOADING<span class="dots"></span>
    </span>
  </div>
  <Controls v-model:moveSpeed="moveSpeed" v-model:opacity="opacity"/>
  <TresCanvas>
    <Starfield :moveSpeed="moveSpeed" :opacity="opacity" @loaded="loading = false"/>
  </TresCanvas>
</template> 

<script setup lang="ts">
  import { TresCanvas } from "@tresjs/core";
  import Starfield from "./components/Starfield.vue";
  import Controls from "./components/Controls.vue";

  const loading = ref(true);  
  const moveSpeed = ref(1.0);
  const opacity = ref(false);
</script>

<style lang="scss">
  $background-color: #000000;
  $foreground-color: #ffffff;
  $dot-width: 1.5em;
  $font-size: 1.1rem;
  $letter-spacing: 0.15em;
  $dot-speed: 1.4s;

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

  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $background-color;
    z-index: 10;

    .loading-text {
      color: $foreground-color;
      font-family: "Roboto Mono", "JetBrains Mono", monospace;
      font-size: $font-size;
      letter-spacing: $letter-spacing;

      .dots {
        &::after {
          content: "";
          display: inline-block;
          width: $dot-width;
          text-align: left;
          animation: dots $dot-speed steps(4, end) infinite;
        }
      }
    }
  }

  @keyframes dots {
    0%   { content: ""; }
    25%  { content: "."; }
    50%  { content: ".."; }
    75%  { content: "..."; }
    100% { content: ""; }
  }
</style>