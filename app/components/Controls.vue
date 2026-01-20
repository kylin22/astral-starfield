<template>
  <div class="controls">
    <label>
      Move Speed: {{ localSpeed.toFixed(1) }}
      <input type="range" min="0.1" max="10" step="0.1" v-model.number="localSpeed" />
    </label>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    moveSpeed?: number
  }>();

  const emit = defineEmits<{
    (e: "update:moveSpeed", value: number): void
  }>();

  const localSpeed = ref(props.moveSpeed ?? 1.0);

  watch(localSpeed, (newValue) => {
    emit("update:moveSpeed", newValue)
  });
</script>

<style lang="scss">

</style>