<template>
  <v-container class="py-6 dashboard-container">
    <h2 class="mb-6">Панель статистики</h2>

    <!-- Общая статистика -->
    <v-row>
      <v-col cols="12" md="4" v-for="stat in stats" :key="stat.label">
        <v-card class="pa-4 stat-card">
          <h3 class="text-h6">{{ stat.label }}</h3>
          <p class="text-h4 font-weight-bold">{{ stat.value }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Топ-5 по рейтингу -->
    <v-card class="pa-4 my-6 stat-card">
      <h3 class="mb-3">ТОП-5 по рейтингу</h3>
      <canvas id="topRatedChart" height="250"></canvas>
    </v-card>

    <!-- Распределение по годам -->
    <v-card class="pa-4 stat-card">
      <h3 class="mb-3">Распределение по годам</h3>
      <canvas id="yearChart" height="250"></canvas>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import Chart from 'chart.js/auto'

const $api = inject('$api')

const stats = ref([
  { label: 'Всего контента', value: 0 },
  { label: 'Всего пользователей', value: 0 },
  { label: 'Всего оценок', value: 0 },
])

onMounted(async () => {
  const [counts, topRated, years] = await Promise.all([
    $api.get('/stats/counts'), 
    $api.get('/stats/top-rated'),
    $api.get('/stats/by-year')
  ])

  stats.value[0].value = counts.data.total_items
  stats.value[1].value = counts.data.total_users
  stats.value[2].value = counts.data.total_ratings

  renderTopRatedChart(topRated.data)
  renderYearChart(years.data)
})

function renderTopRatedChart(data) {
  const ctx = document.getElementById('topRatedChart')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(i => i.title),
      datasets: [{
        label: 'Рейтинг',
        data: data.map(i => i.rating),
        backgroundColor: '#e94560'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })
}

function renderYearChart(data) {
  const ctx = document.getElementById('yearChart')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(i => i.year),
      datasets: [{
        label: 'Количество',
        data: data.map(i => i.count),
        fill: false,
        borderColor: '#0f3460',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })
}
</script>
<style scoped>
.dashboard-container {
  max-width: 1000px;
  margin: 0 auto;
}
.stat-card {
  background: var(--color-background-soft);
  color: var(--color-text);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
