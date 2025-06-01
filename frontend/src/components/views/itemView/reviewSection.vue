<template>
  <v-container class="py-8">
    <v-card class="review-wrapper" elevation="4">
      <v-card-text>
        <h2 class="mb-4">Отзывы</h2>

        <!-- Список отзывов -->
        <div v-if="reviews.length">
          <v-card
            v-for="review in reviews"
            :key="review.id"
            class="mb-3"
            variant="outlined"
          >
            <v-card-title>
              <strong>{{ review.author_nickname }}</strong>
              <span class="ml-auto">⭐ {{ review.rating }}/10</span>
            </v-card-title>
            <v-card-text class="review-text">{{ review.text }}</v-card-text>
          </v-card>
        </div>
        <div v-else class="text-grey text-subtitle-2">
          Пока нет отзывов.
        </div>

        <!-- Добавить отзыв -->
        <v-divider class="my-6" />
        <div v-if="user">
          <h3 class="mb-2">{{ myReview ? 'Редактировать отзыв' : 'Оставить отзыв' }}</h3>
          <v-rating
            v-model="newReview.rating"
            length="10"
            color="yellow darken-3"
            large
          />
          <v-textarea
            v-model="newReview.text"
            label="Ваш отзыв"
            rows="3"
            auto-grow
            outlined
            class="mt-3"
          />
          <v-btn color="primary" class="mt-3" @click="submitReview">Отправить</v-btn>
        </div>
        <div v-else class="text-grey">
          <small>Чтобы оставить отзыв, войдите в аккаунт</small>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import { useUser } from '@/components/store/userStore'

const props = defineProps({
  itemId: {
    type: Number,
    required: true
  }
})

const $api = inject('$api')
const { user } = useUser()

const reviews = ref([])
const newReview = ref({
  rating: 0,
  text: ''
})

const myReview = computed(() =>
  reviews.value.find(r => r.user_login === user.value?.user_login)
);

const fetchReviews = async () => {
  try {
    const res = await $api.get(`/reviews/${props.itemId}`)
    reviews.value = res.data

    const existing = reviews.value.find(r => r.user_login === user.value?.user_login);
    if (existing) {
      newReview.value.rating = existing.rating;
      newReview.value.text = existing.text;
    }
  } catch (err) {
    console.error('Ошибка загрузки отзывов:', err)
  }
}

const submitReview = async () => {
  if (!newReview.value.rating || !newReview.value.text.trim()) return

  try {
    await $api.post('/reviews/', {
      item_id: props.itemId,
      rating: newReview.value.rating,
      text: newReview.value.text
    })

    newReview.value.rating = 0
    newReview.value.text = ''
    await fetchReviews()
  } catch (err) {
    console.error('Ошибка отправки отзыва:', err)
  }
}

onMounted(fetchReviews)
</script>

<style scoped>
.review-wrapper {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 16px;
  background-color: var(--color-background);
  color: var(--color-text);
}
.review-text {
  white-space: pre-wrap;
}
</style>
