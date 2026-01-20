<template>
  <TresPerspectiveCamera
    ref="camera"
    :position="[100, 100, 100]"
    :look-at="[0, 0, 0]"
  />
  <PointerLockControls/>
  <KeyboardControls
    :moveSpeed="moveSpeed"
  />
  <TresPoints v-if="positions.length">
    <TresBufferGeometry>
      <TresBufferAttribute
        :args="[positions, 3]"
        attach="attributes-position"
      />
      <TresBufferAttribute
        :args="[colors, 4]"
        attach="attributes-color"
      />
    </TresBufferGeometry>
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="{ size: { value: 2.0 } }" 
      :vertex-colors="true"
      :transparent="true"
    />
  </TresPoints>
</template>

<script lang="ts" setup>
  import { parse } from "papaparse"
  import vertexShader from "../shaders/point.vert?raw"
  import fragmentShader from "../shaders/point.frag?raw"
import { bprpToTeff, teffToAlpha, teffToRGB } from "~/utils/gaiaColorConversion";

  const props = defineProps<{
    moveSpeed: number,
    opacity: boolean
  }>()

  const emit = defineEmits<{
    (e: "loaded"): void
  }>()

  interface StarData {
    x: string,
    y: string,
    z: string,
    bp_rp: string
  }

  const positions = shallowRef<Float32Array>(new Float32Array(0));
  const colors = shallowRef<Float32Array>(new Float32Array(0));

  onMounted(async () => {
    const response = await fetch("/shortlist_cartesian.csv");
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
    const colorsArray = new Float32Array(validCount * 4);

    // fill by index
    let coordIndex = 0;
    let colorIndex = 0;

    for (const row of tempData) {
      const { x, y, z, bp_rp } = row;
      if (
        typeof x !== "number" ||
        typeof y !== "number" ||
        typeof z !== "number" ||
        typeof bp_rp !== "number"
      ) continue; // possible NaNs

      coordsArray[coordIndex] = x;
      coordsArray[coordIndex + 1] = y;
      coordsArray[coordIndex + 2] = z;
      coordIndex += 3;

      const teff = bprpToTeff(bp_rp);
      const rgb = teffToRGB(teff);
      const alpha = teffToAlpha(teff);

      colorsArray[colorIndex] = rgb[0];
      colorsArray[colorIndex + 1] = rgb[1];
      colorsArray[colorIndex + 2] = rgb[2];
      if (props.opacity) {
        colorsArray[colorIndex + 3] = alpha;
      } else {
        colorsArray[colorIndex + 3] = 1.0;
      }

      colorIndex += 4;
    }

    positions.value = coordsArray;
    colors.value = colorsArray;

    await nextTick();
    requestAnimationFrame(() => {
      emit("loaded");
    }); // nextTick to ensure threeJS rendered and interactable
  });
</script>

<style lang="scss" scoped>

</style>