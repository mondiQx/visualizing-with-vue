<template>
  <div class="uk-margin">
    <select class="uk-select" v-model="selected" @change="$emit('update-type', selected)">
      <option disabled value="">Select Pokémon Type</option>
      <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('fire')
const types = [
  'fire', 'water', 'grass', 'electric', 'psychic', 'rock', 'ground', 'bug', 'poison'
]
</script>
