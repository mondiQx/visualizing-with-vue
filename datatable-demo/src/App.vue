<template>
  <v-app>
    <v-container class="wide-table-container">
      <PokemonTable
        :pokemons="filteredPokemons"
        :items-per-page="itemsPerPage"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        @update:pagination="onUpdatePagination"
        @view-details="showDetails"
      />

      <v-dialog v-model="dialog" max-width="400">
        <v-card v-if="selected">
          <v-img :src="selected.image" height="200" cover />
          <v-card-title>{{ selected.name }}</v-card-title>
          <v-card-text>
            <p><strong>Type:</strong> {{ selected.types }}</p>
            <p><strong>Abilities:</strong> {{ selected.abilities }}</p>
            <p><strong>Height:</strong> {{ selected.height }}</p>
            <p><strong>Weight:</strong> {{ selected.weight }}</p>
            <p><strong>Base Experience:</strong> {{ selected.base_experience }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from './stores/pokemon'
import PokemonTable from './components/Table.vue'

const store = usePokemonStore()
const dialog = ref(false)
const selected = ref(null)
const filters = ref({ type: '' })
const sortBy = ref('name')
const sortDesc = ref(false)
const itemsPerPage = ref(10)

onMounted(() => {
  store.fetchPokemons()
})

const types = computed(() => {
  const set = new Set(store.pokemons.flatMap(p => p.types.split(', ')))
  return Array.from(set)
})

const filteredPokemons = computed(() => {
  return store.pokemons.filter(p => {
    return !filters.value.type || p.types.includes(filters.value.type)
  })
})

function showDetails(pokemon) {
  selected.value = pokemon
  dialog.value = true
}

function onUpdatePagination({ itemsPerPage: ipp, sortBy: sb, sortDesc: sd }) {
  itemsPerPage.value = ipp
  sortBy.value = sb
  sortDesc.value = sd
}
</script>
<style>
.wide-table-container {
  width: 100%;
  max-width: 80vw;
  min-width: 60vw;
}
</style>