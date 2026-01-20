<template>
  <div id="controls">
    <label>
      Move Speed: {{ localSpeed.toFixed(1) }}
      <input type="range" min="0.1" max="10" step="0.1" v-model.number="localSpeed" />
    </label>
    <label>
      <input type="checkbox" v-model="localOpacity" />
      Enable Opacity
    </label>
    <span id="guide">placeholder css</span>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    moveSpeed?: number,
    opacity?: boolean
  }>();

  const emit = defineEmits<{
    (e: "update:moveSpeed", value: number): void,
    (e: "update:opacity", value: boolean): void
  }>();

  const localSpeed = ref(props.moveSpeed ?? 1.0);
  const localOpacity = ref(props.opacity ?? false);

  watch(localSpeed, (newValue) => {
    emit("update:moveSpeed", newValue)
  });

  watch(localOpacity, (newValue) => {
    emit("update:opacity", newValue)
  });
</script>

<style lang="scss">
  #controls {
    position: absolute;
    top: 1em;
    left: 1em;
    color: white;
    font-family: "Roboto Mono", "JetBrains Mono", monospace;
    z-index: 5;
    user-select: none;

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;

      input[type="range"] {
        width: 150px;
      }
    }

    #guide {
      display: block;
      margin-top: 0.5em;
      font-size: 0.8rem;
      opacity: 0.7;
    }
  }
</style>