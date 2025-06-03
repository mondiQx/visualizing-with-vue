<template>
  <div ref="chartDiv" class="chart-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import * as am5 from "@amcharts/amcharts5"
import * as am5map from "@amcharts/amcharts5/map"
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark"
import am5themes_Frozen from "@amcharts/amcharts5/themes/Frozen"
import am5themes_Kelly from "@amcharts/amcharts5/themes/Kelly"
import am5themes_Material from "@amcharts/amcharts5/themes/Material"
import am5themes_Micro from "@amcharts/amcharts5/themes/Micro"


const props = defineProps({
  year: Number,
  data: {
    type: Array,
    required: true
  }
})
const chartDiv = ref(null)
let root, chart

const createChart = (data) => {
  // 🧱 Create root
  root = am5.Root.new(chartDiv.value)

  // 🎨 Theme options — try changing or adding any of these
  root.setThemes([
    am5themes_Animated.new(root),
    // am5themes_Responsive.new(root),
    // am5themes_Dark.new(root),
    // am5themes_Kelly.new(root),
    am5themes_Frozen.new(root),
    // am5themes_Material.new(root),
    // am5themes_Micro.new(root)
  ])

  // 🗺️ Create map chart
  chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "none",
      panY: "none",
      projection: am5map.geoAlbersUsa()
    })
  )

  // 🧩 US states layer
  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_usaLow,
      valueField: "value",
      calculateAggregates: true
    })
  )

  // 📦 Set chart data
  polygonSeries.data.setAll(data)

  // 🧰 Tooltip and interactivity
  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}",
    interactive: true,
    // cursorOverStyle: "pointer", // shows pointer on hover
  })

  // 🌡️ Heatmap coloring
  polygonSeries.set("heatRules", [{
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    // Try other palettes like:
    min: am5.color(0x74B3CE), // Light blue (low)
    // min: am5.color(0xffe0b2), // light orange
    max: am5.color(0x083D77), // Dark blue (high)
    // max: am5.color(0xf4511e), // deep orange
    key: "fill"
  }])

  // ✨ Hover effect styling
  polygonSeries.mapPolygons.template.states.create("hover", {
    stroke: am5.color(0xffffff),
    strokeWidth: 1
  })

  // 🎬 Optional: Animate chart load
  chart.appear(1000, 100)

  // 🧭 Optional: Enable mouse wheel zooming
  chart.setAll({
    wheelY: "zoom", //or none
    pinchZoom: true
  })

  // 🖼 Optional: Add chart title
  // chart.children.unshift(
  //   am5.Label.new(root, {
  //     text: "US Population Heatmap",
  //     fontSize: 24,
  //     centerX: am5.percent(50),
  //     x: am5.percent(50)
  //   })
  // )

  // 📜 Optional: Custom tooltip HTML
  // polygonSeries.mapPolygons.template.setAll({
  //   tooltipHTML: `
  //     <div style="padding:4px;text-align:left">
  //       <div><strong>{name}</strong></div>
  //       <div>Population: {value}</div>
  //     </div>
  //   `
  // })
}



onMounted(() => {
  if (props.data.length > 0) {
    createChart(props.data)
  }
})


watch(() => props.data, (newData) => {
  if (root) {
    root.dispose()
  }
  if (newData.length > 0) {
    createChart(newData)
  }
})


onBeforeUnmount(() => {
  if (root) root.dispose()
})
</script>

<style>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
