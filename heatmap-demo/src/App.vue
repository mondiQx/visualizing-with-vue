<template>
  <div class="app-container">
    <h1>US Population Data {{ selectedYear }}</h1>
    <div class="button-group">
      <button 
      v-for="year in availableYears" 
        :key="year" 
        @click="changeYear(year)"
        :class="{ active: year === selectedYear }">
        {{ year }}
      </button>
    </div>
    <div v-if="isLoading" class="uk-flex uk-flex-center uk-flex-middle" style="height: 600px;">
        <span uk-spinner="ratio: 4"></span>
    </div>
    <HeatmapChart v-else :data="chartData" :year="year" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import HeatmapChart from './components/HeatmapChart.vue'

const selectedYear = ref(2021)
const isLoading = ref(true)
const chartData = ref([])
const availableYears = [2020, 2021]
const fipsToStateAbbr = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY"
}

const fetchPopulationData = async (year) => {
  let url = ''
  let metricKey = ''
  if (year === 2020) {
    url = 'https://api.census.gov/data/2020/dec/pl'
    metricKey = 'P1_001N'
  } else if (year === 2021) {
    url = 'https://api.census.gov/data/2021/pep/population'
    metricKey = 'POP_2021'
  } else return

  isLoading.value = true
  try {
    const res = await axios.get(url, {
      params: {
        get: `NAME,${metricKey}`,
        for: 'state:*',
        key: import.meta.env.VITE_CENSUS_API_KEY
      }
    })
    const [headers, ...rows] = res.data
    chartData.value = rows.map(([name, pop, fips]) => {
      const abbr = fipsToStateAbbr[fips.padStart(2, '0')] || 'NA'
      return {
        id: `US-${abbr}`,
        name,
        value: parseInt(pop, 10)
      }
    })
  } catch (error) {
    console.error('Error fetching population data:', error)
  } finally {
    isLoading.value = false
  }
}

const changeYear = (year) => {
  selectedYear.value = year
}

watch(selectedYear, (newYear) => {
  fetchPopulationData(newYear)
})

onMounted(() => {
  fetchPopulationData(selectedYear.value)
})

</script>

<style>
.app-container {
  width: 80vw;
}
</style>
