<template>
  <TresPerspectiveCamera
    ref="camera"
    :position="[100, 100, 100]"
    :look-at="[0, 0, 0]"
  />
  <PointerLockControls/>
  <KeyboardControls
    :moveSpeed="1.0"
  />
  <TresPoints v-if="positions.length">
    <!-- <TresBufferGeometry>
      <TresBufferAttribute 
        :args="[positions, 3]" 
        attach="attributes-position" 
      /> 
      <TresBufferAttribute 
        :args="[colors, 3]" 
        attach="attributes-color" 
      />
    </TresBufferGeometry> -->
    <TresBufferGeometry
      :position="[positions, 3]"
    />
    <TresPointsMaterial 
      :vertexColors="true"
      :size="0.5" 
      :size-attenuation="true" 
    />
  </TresPoints>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue"
  import { PointerLockControls, KeyboardControls } from "@tresjs/cientos"
  import { parse } from "papaparse"
  // import { gaiaBP_RPtoRGB } from "~/utils/gaiaColorConversion"

  interface StarData {
    x: string,
    y: string,
    z: string,
    bp_rp: string
  }

  const positions = shallowRef<Float32Array>(new Float32Array(0));
  // const colors = shallowRef<Float32Array>(new Float32Array(0));

  onMounted(async () => {
    const response = await fetch("/brightest_cartesian.csv");
    const csvText = await response.text();

    const tempData = parse<StarData>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data

    let validCount = 0
    for (const row of tempData) {
      const { x, y, z, bp_rp } = row
      if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof z === "number" &&
        typeof bp_rp === "number"
      ) validCount++;
    }

    // preallocate Float32Array
    const coordsArray = new Float32Array(validCount * 3);
    const colorsArray = new Float32Array(validCount * 3)

    // fill by index
    let index = 0;
    for (const row of tempData) {
      const { x, y, z, bp_rp } = row;
      if (
        typeof x !== "number" ||
        typeof y !== "number" ||
        typeof z !== "number" ||
        typeof bp_rp !== "number"
      ) continue;

      coordsArray[index] = x;
      coordsArray[index + 1] = y;
      coordsArray[index + 2] = z;

      // const rgb = gaiaBP_RPtoRGB(bp_rp)
      // // normalize 0-1 for TresJS
      // colorsArray[index] = rgb[0] / 255
      // colorsArray[index + 1] = rgb[1] / 255
      // colorsArray[index + 2] = rgb[2] / 255

      index += 3;
    }

    positions.value = coordsArray;
    // colors.value = colorsArray;
  });
</script>

<style lang="scss" scoped>

</style>