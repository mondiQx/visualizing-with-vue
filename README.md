# Visualizing with Vue

This repository contains three Vue projects demonstrating different data visualization techniques:

1. **chartjs-demo** — Using Chart.js to display line, bar, and pie charts  
2. **heatmap-demo** — Using amCharts to display a US population heatmap  
3. **datatable-demo** — A Pokémon datatable with Vuetify, Pinia, and Axios, including filters, sorting, pagination, and a detail modal

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm (comes with Node.js)
- A text editor or IDE (e.g., VSCode)
---

## Setup & Run Instructions

Each project is self-contained in its own subfolder. You can run them individually.

---

### 1. chart-demo
⚠️ This project uses an API key from [ api.census.gov.](https://api.census.gov/data/key_signup.html).

After signing up, create a .env file in the root of heatmap-demo:
```
VITE_CENSUS_API_KEY=your_api_key_here
```

Then run:
```
cd chartjs-demo
npm install
npm run dev
```

### 2. heatmap-demo
```
cd heatmap-demo
npm install
npm run dev
```

### 3. datatable-demo
```
cd datatable-demo
npm install
npm run dev
```

## Project Structure
```
visualizing-with-vue/
├── chart-demo/
├── heatmap-demo/
└── datatable-demo/
```

## Tech Stack and References

| Tool | Purpose |
|------|---------|
| [Vue 3 (Composition API)](https://vuejs.org/) | Core frontend framework |
| [Chart.js](https://www.chartjs.org/docs/latest/) | For rendering line, bar, and pie charts |
| [amCharts](https://www.amcharts.com/docs/v5/) | For building the US population heatmap |
| [Vuetify](https://vuetifyjs.com/en/components/data-tables/basics/#usage) | For the data table component (sortable, paginated, responsive) |
| [Pinia](https://pinia.vuejs.org/introduction.html) | State management for filters and pagination |
| [Axios](https://axios-http.com/docs/intro) | HTTP client for fetching data from APIs |


## Optional: Data Sources Used

These APIs were used as sample data sources for the course demos.

| API / Dataset | Description |
|---------------|-------------|
| [PokeAPI](https://pokeapi.co/) | Public Pokémon RESTful API used for the data table demo |
| [US Census API](https://api.census.gov/data.html) | Used to fetch population data for the amCharts heatmap |

> **Note**: The US Census API requires a free API key. You can [request one here](https://api.census.gov/data/key_signup.html).


