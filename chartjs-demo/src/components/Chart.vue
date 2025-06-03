<template>
  <div class="chart-wrapper">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios'

const props = defineProps({ type: String })
const canvasEl = ref(null)
let chart

const fetchPokemonByType = async (type) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
  const pokemons = res.data.pokemon.slice(0, 10)  // Limit to 10
  const details = await Promise.all(
    pokemons.map(p => axios.get(p.pokemon.url))
  )
  return details.map(d => ({
    name: d.data.name,
    height: d.data.height || 0,
  }))
}

const renderChart = async () => {
  const data = await fetchPokemonByType(props.type)
  const labels = data.map(d => d.name)
  const dataToShow = data.map(d => d.height)


  if (chart) chart.destroy()
  chart = new Chart(canvasEl.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Weight of ${props.type} type Pokémon`, 
        data: dataToShow,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  })
}

onMounted(renderChart)
watch(() => props.type, renderChart)
</script>

<style scoped>
.chart-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

canvas {
  width: 100% !important;
  height: 400px !important;
}
</style>
