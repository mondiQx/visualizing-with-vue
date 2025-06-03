import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref([])
  const loading = ref(false)
  const error = ref(null)

  const filters = ref({
    type: ''
  })

  const pagination = ref({
    itemsPerPage: 10,
    page: 1
  })

  async function fetchPokemons() {
    loading.value = true
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=300')
      const results = response.data.results

      const detailed = await Promise.all(
        results.map(async p => {
          const detail = await axios.get(p.url)
          const data = detail.data
          return {
            name: data.name,
            types: data.types.map(t => t.type.name).join(', '),
            abilities: data.abilities.map(a => a.ability.name).join(', '),
            height: data.height,
            weight: data.weight,
            base_experience: data.base_experience,
            image: data.sprites.front_default
          }
        })
      )

      pokemons.value = detailed
    } catch (e) {
      error.value = e.message || 'Failed to load Pokémon data.'
    } finally {
      loading.value = false
    }
  }

  function setItemsPerPage(n) {
    pagination.value.itemsPerPage = n
  }

  function setPage(p) {
    pagination.value.page = p
  }

  return {
    pokemons,
    filters,
    pagination,
    loading,
    error,
    fetchPokemons,
    setItemsPerPage,
    setPage
  }
})
