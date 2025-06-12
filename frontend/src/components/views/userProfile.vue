<template>
  <v-container class="py-8 profile-container">
    <v-row>
      <!-- Левая панель с данными пользователя  -->
      <v-col cols="12">
        <v-card class="pa-6 mb-6 profile-card">
          <v-row>
            <v-col cols="12" md="4">
              <h3 class="text-h5 font-weight-bold mb-4">Профиль</h3>
              <p><strong>Имя:</strong> {{ user.user_name }}</p>
              <p><strong>Фамилия:</strong> {{ user.user_surname }}</p>
              <p><strong>Никнейм:</strong> {{ user.user_nickname }}</p>
              <p><strong>Почта:</strong> {{ user.user_login }}</p>
              <p><strong>Роль:</strong> {{ getRoleName(user.user_role) }}</p>
            </v-col>
            <v-col cols="12" md="8">
              <v-tabs v-model="tab" background-color="var(--color-background-soft)" class="mb-4">
                <v-tab value="reviews">Отзывы</v-tab>
                <v-tab value="favorites">Избранное</v-tab>
              </v-tabs>

              <v-window v-model="tab" class="favorites">
                <v-window-item value="reviews">
                  <v-card v-if="reviews.length" class="pa-4">
                    <h3 class="mb-4">Ваши отзывы</h3>
                    <v-list class="favorites">
                      <v-list-item v-for="review in reviews" :key="review.id">
                        <v-list-item-content class="review">
                          <v-list-item-title class="font-weight-bold">{{ review.item_title }}</v-list-item-title>
                          <v-list-item-subtitle class="text-grey">{{ review.created_at }}</v-list-item-subtitle>
                          <div class="mt-2">{{ review.text }}</div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                  <p v-else class="text-grey">Вы ещё не оставляли отзывов.</p>
                </v-window-item>

                <v-window-item value="favorites" class="favorites">
                  <v-card v-if="favorites.length" class="pa-4">
                    <h3 class="mb-4">Избранное</h3>
                    <v-row>
                      <v-col cols="12" sm="6" md="4" v-for="item in favorites" :key="item.id">
                        <v-card class="h-100 favorite-card">
                          <v-img :src="item.cover_url" height="250px" cover></v-img>
                          <v-card-title class="text-wrap">{{ item.title }}</v-card-title>
                          <v-card-subtitle>{{ item.type_name }} • {{ item.release_year }}</v-card-subtitle>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card>
                  <p v-else class="text-grey">У вас пока нет избранного.</p>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useUser } from '@/components/store/userStore';

const $api = inject('$api');
const { user } = useUser();

const tab = ref('reviews');
const reviews = ref([]);
const favorites = ref([]);

const getRoleName = (roleId) => {
  const roles = {
    1: 'Пользователь',
    2: 'Модератор',
    3: 'Администратор'
  };
  return roles[roleId] || 'Неизвестно';
};

onMounted(async () => {
  try {
    const [resReviews, resFavorites] = await Promise.all([
      $api.get(`/reviews/profile/`),
      $api.get(`/item/favorites`)
    ]);
    reviews.value = resReviews.data;
    favorites.value = resFavorites.data;
  } catch (err) {
    console.log(err)
    console.error('Ошибка при загрузке профиля:', err);
  }
});
</script>

<style scoped>
.profile-container {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 12px;
}

.profile-card,
.favorite-card,
.favorites {
  color: var(--color-text);
}
:deep(.v-card) {
  background-color: var(--color-background-soft);
  color: var(--color-text);
}
.profile-card {
  background-color: var(--color-background-soft);
  border-radius: 12px;
}

.favorite-card {
  background-color: var(--color-background-mute);
  border-radius: 10px;
}

.favorites {
  background-color: var(--color-background-mute);
}

.review {
  border: 1px;
  border-radius: 16px;
}
</style>
