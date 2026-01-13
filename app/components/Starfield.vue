<template>
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
      :look-at="[0, 0, 0]"
    />
    <TresPoints>
      <TresBufferGeometry :position="[positions, 3]" />
      <TresPointsMaterial :size="0.1" :size-attenuation="true" />
    </TresPoints>
    <TresAxesHelper/>
    <TresGridHelper/>
</template>

<script>
  import { BufferGeometry, BufferAttribute, PointsMaterial, Color } from "three"
  import { shallowRef, onMounted } from "vue"

  const positions = shallowRef<Float32Array | null>(null)

  onMounted(() => {
    positions = new Float32Array([
      0,  0,  0,
      5,  0,  0,
      0,  5, -5,
    ])
  })
</script>

<style lang="scss" scoped>

</style>