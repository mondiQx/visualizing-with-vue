<template>
  <div class="uk-container uk-padding">
    <h2 class="uk-heading-line"><span>Pokemon Chart by Type</span></h2>
    <FilterControl @update-type="selectedType = $event" />
    <SimpleChart :type="selectedType" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SimpleChart from './components/Chart.vue'
import FilterControl from './components/Filter.vue'

const selectedType = ref('fire')
</script>
