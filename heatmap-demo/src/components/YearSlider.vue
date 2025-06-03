<template>
  <div class="slider-container">
    <label>Year: {{ year }}</label>
    <input type="range" min="2000" max="2024" v-model="internalYear" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ year: Number })
const emit = defineEmits(['update:year'])

const internalYear = computed({
  get: () => props.year,
  set: val => emit('update:year', Number(val))
})
</script>

<style>
.slider-container {
  text-align: center;
}
input[type="range"] {
  width: 80%;
}
</style>
