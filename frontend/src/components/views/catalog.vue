<template>
  <v-container class="py-8">
    <h1 class="catalog-title mb-4">Каталог контента</h1>
    <p class="catalog-subtext mb-8">Просматривайте, фильтруйте и оценивайте фильмы, игры и книги</p>

    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Поиск по названию"
          prepend-inner-icon="mdi-magnify"
          hide-details
          dense
          outlined
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedGenre"
          :items="genres"
          item-title="value_short"
          item-value="id"
          label="Жанр"
          hide-details
          dense
          outlined
          return-object
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="sortOption"
          :items="sortOptions"
          label="Сортировка"
          hide-details
          dense
          outlined
        />
      </v-col>
    </v-row>

    <!-- Карточки -->
    <v-row>
      <template v-if="filteredItems.length">
        <v-col
          v-for="item in filteredItems"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="content-card" :to="`/item/${item.id}`" flat tile>
            <v-img
              :src="item.cover_url"
              height="250px"
              class="card-img"
              cover
            >
              <div class="card-overlay">
                <div class="card-title">{{ item.title }}</div>
                <div class="card-subtitle">{{ item.release_year }} • {{ item.genres.join(', ') }}</div>
                <div class="card-rating">⭐ {{ item.average_rating }} / 10</div>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </template>

      <template v-else>
        <v-col cols="12" class="text-center">
          <p>Ничего не найдено</p>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useDictionaries } from '@/helpers/useDictionaries';

const $api = inject('$api')

// Примеры данных
const items = ref([])

const genres = ref([]);

const search = ref('');
const selectedGenre = ref(null);
const sortOption = ref(null);

const sortOptions = [ 'По рейтингу', 'По году', 'По алфавиту' ]

const filteredItems = computed(() => {
  let result = items.value

  if (search.value) {
    result = result.filter(i => i.title.toLowerCase().includes(search.value.toLowerCase()))
  }

  if (selectedGenre.value) {
    result = result.filter(i =>
      i.genres?.includes(selectedGenre.value.value_short)
    )
  }

  if (sortOption.value === 'По рейтингу') {
    result = result.sort((a, b) => b.rating - a.rating)
  } else if (sortOption.value === 'По году') {
    result = result.sort((a, b) => b.year - a.year)
  } else if (sortOption.value === 'По алфавиту') {
    result = result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

onMounted(async () => {
  const result = await useDictionaries($api)
  genres.value = result.genres

  const allItems = await $api.get('/item/');
  items.value = allItems.data;
})
</script>

<style scoped>
.catalog-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-heading);
}

.catalog-subtext {
  color: var(--color-text-secondary);
}

.content-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-color: transparent;
}

.content-card:hover {
  transform: scale(1.03);
}

.card-img {
  border-radius: 12px;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.card-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
}

.card-rating {
  font-size: 0.9rem;
  margin-top: 4px;
}


.text-center {
  font-size: 1.5rem;
  color: var(--color-text-secondary)
}
</style>
