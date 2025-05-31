<template>
  <v-container v-if="item" class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6 item-details-card" elevation="6">
          <v-row>
            <v-col cols="12" md="5">
              <v-img
                :src="item.cover_url || fallbackCover"
                height="350"
                class="rounded-lg"
                cover
              />
            </v-col>

            <v-col cols="12" md="7">
              <h2 class="text-h4 font-weight-bold mb-2">{{ item.title }}</h2>
              <p class="text-grey mb-1">{{ item.release_year }} • {{ item.type_name }}</p>
              <p class="mb-3">{{ item.description }}</p>

              <div class="d-flex align-center mb-2">
                <v-icon color="yellow-darken-2" class="mr-1">mdi-star</v-icon>
                <span class="text-subtitle-1 font-weight-medium">
                  {{ item.average_rating }} / 10
                </span>
                <span class="ml-2 text-grey text-caption">({{ item.rating_count }} оценок)</span>
              </div>

              <div class="genre-chips mt-4">
                <v-chip
                  v-for="genre in item.genres"
                  :key="genre"
                  color="primary"
                  variant="outlined"
                  class="ma-1"
                >
                  {{ genre }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="!item" class="text-center py-12">
    <v-progress-circular indeterminate color="primary" size="48" />
    <p class="mt-4">Загрузка...</p>
  </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

const $api = inject('$api')
const route = useRoute()
const item = ref({
  average_rating: null,
  cover_url: null,
  description: null,
  genres: null,
  id: null,
  rating_count: null,
  release_year: null,
  title: null,
  type_id: null,
  type_name: null
})

const fallbackCover = 'https://via.placeholder.com/300x400?text=Нет+обложки'

onMounted(async () => {
  const { id } = route.params
  try {
    const res = await $api.get(`/item/${id}`);
    console.log(res.data)
    item.value = res.data;
  } catch (e) {
    console.error('Ошибка загрузки:', e)
  }
})
</script>

<style scoped>
.item-details-card {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 12px;
}

.genre-chips {
  display: flex;
  flex-wrap: wrap;
}
</style>
