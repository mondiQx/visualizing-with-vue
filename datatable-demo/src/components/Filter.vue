<template>
  <v-select
    v-model="store.filters.type"
    :items="types"
    label="Filter by Type"
    clearable
    density="compact"
  />
</template>

<script setup>
import { computed } from 'vue'
import { usePokemonStore } from '../stores/pokemon'

const store = usePokemonStore()

const types = computed(() => {
  const allTypes = store.pokemons.flatMap(p => p.types.split(', '))
  return [...new Set(allTypes)].sort()
})
</script>
