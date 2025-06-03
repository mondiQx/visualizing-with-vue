<template>
  <v-data-table
    :headers="headers"
    :items="filteredPokemons"
    :items-per-page="store.pagination.itemsPerPage"
    :page="store.pagination.page"
    :loading="store.loading"
    class="elevation-1"
    :search="search"
    @update:page="store.setPage"
    @update:items-per-page="store.setItemsPerPage"
  >
    <template #top>
        <v-toolbar flat>
            <v-toolbar-title>Pokémon Table</v-toolbar-title>
            <v-spacer />
            <v-text-field
            v-model="search"
            label="Search"
            placeholder="Search name, type, ability..."
            hide-details
            density="compact"
            class="mr-4"
            clearable
            />
            <Filter />
        </v-toolbar>
    </template>

    <template #item.actions="{ item }">
      <v-btn icon @click="openDialog(item)">
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </template>
  </v-data-table>
  

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6">{{ selected?.name }}</v-card-title>
      <v-card-text v-if="selected">
        <v-img :src="selected.image" max-width="200" class="mb-3" />
        <p><strong>Type:</strong> {{ selected.types }}</p>
        <p><strong>Abilities:</strong> {{ selected.abilities }}</p>
        <p><strong>Height:</strong> {{ selected.height }}</p>
        <p><strong>Weight:</strong> {{ selected.weight }}</p>
        <p><strong>Base Experience:</strong> {{ selected.base_experience }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import Filter from './Filter.vue'

const store = usePokemonStore()
const dialog = ref(false)
const selected = ref(null)
const search = ref('')


const headers = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Types', key: 'types', sortable: true },
  { title: 'Abilities', key: 'abilities', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false }
]

const filteredPokemons = computed(() => {
  if (!store.filters.type) return store.pokemons
  return store.pokemons.filter(p =>
    p.types.split(', ').includes(store.filters.type)
  )
})

function openDialog(pokemon) {
  selected.value = pokemon
  dialog.value = true
}
</script>
