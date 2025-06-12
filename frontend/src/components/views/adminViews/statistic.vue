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
    <v-card class="pa-4 my-6 stat-card">
      <h3 class="mb-3">Распределение по годам</h3>
      <canvas id="yearChart" height="250"></canvas>
    </v-card>

    <!-- Круговая диаграмма типов контента (распределение по категориям) -->
    <v-card class="pa-4 stat-card">
      <h3 class="mb-3">Круговая диаграмма типов контента (распределение по категориям)</h3>
      <canvas id="total_types" height="250"></canvas>
    </v-card>

    <!-- Самое обсуждаемое произведение (по количеству отзывов) -->
    <v-card class="pa-4 my-6 stat-card">
      <h3 class="mb-3">Самое обсуждаемое произведение (по количеству отзывов)</h3>
      <canvas id="mostDiscussedChart" height="250"></canvas>
    </v-card>

    <!-- Самое обсуждаемое произведение (по количеству отзывов) -->
    <v-card class="pa-4 my-6 stat-card">
      <h3 class="mb-3">Самое добавляемое в избранное</h3>
      <canvas id="mostFavoriteChart" height="250"></canvas>
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
  const [counts, topRated, years, mostDisc, mostFav, typePie] = await Promise.all([
    $api.get('/stats/counts'), 
    $api.get('/stats/top-rated'),
    $api.get('/stats/by-year'),
    $api.get('/stats/most-disc'),
    $api.get('/stats/most-favorite'),
    $api.get('/stats/counting-types'),
  ])

  stats.value[0].value = counts.data.total_items
  stats.value[1].value = counts.data.total_users
  stats.value[2].value = counts.data.total_ratings

  renderTopRatedChart(topRated.data)
  renderYearChart(years.data)
  renderTypePieChart(typePie.data)
  renderMostDiscussedChart(mostDisc.data)
  renderMostFavoriteChart(mostFav.data)
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

function renderTypePieChart(data) {
  const ctx = document.getElementById('total_types')
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.map(i => i.value_full),
      datasets: [{
        data: data.map(i => i.total),
        backgroundColor: [
          '#e94560', '#0f3460', '#03c988', '#ffc93c', '#845ec2', '#2c73d2'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.parsed}`
          }
        }
      }
    }
  })
}

function renderMostDiscussedChart(data) {
  const ctx = document.getElementById('mostDiscussedChart')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(i => i.title),
      datasets: [{
        label: 'Отзывы',
        data: data.map(i => i.review_count),
        backgroundColor: '#845ec2'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      indexAxis: 'y'
    }
  })
}

function renderMostFavoriteChart(data) {
  const ctx = document.getElementById('mostFavoriteChart')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(i => i.title),
      datasets: [{
        label: 'Избранное',
        data: data.map(i => i.favorites_count),
        backgroundColor: '#03c988'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      indexAxis: 'y'
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
