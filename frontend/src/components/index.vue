<template>
  <v-container class="py-12 text-center">
    <!-- Заголовок -->
    <h1 class="headline">Добро пожаловать в каталог контента</h1>
    <p class="subtext">Здесь вы можете искать, оценивать и сохранять любимые фильмы, игры и книги.</p>

    <!-- Категории -->
    <v-row class="mt-10" justify="center">
      <v-col cols="12" sm="4" md="3" v-for="category in categories" :key="category.label">
        <router-link :to="category.route">
          <v-card class="category-card" flat :style="{ backgroundImage: `url(${category.image})` }">
            <v-card-text class="category-text">{{ category.label }}</v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

    <!-- Популярное -->
    <h2 class="mt-16 mb-6">Популярное сейчас</h2>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3" v-for="i in 4" :key="i">
        <v-card class="popular-card" height="200px">
          <v-card-text class="text-grey">Карточка #{{ i }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Кнопка перехода в каталог -->
    <router-link to="/catalog">
      <v-btn class="mt-10 catalog-btn" flat>Перейти в каталог</v-btn>
    </router-link>
  </v-container>
</template>
<script>
export default {
  name: 'MainComponent',

  computed: {
    categories() {
      // Пример для роута /catalog?type=movie
      const categories = [
        {
          label: '🎬 Фильмы',
          route: '#',
          image: '/images/filmCategory.jpg'
        },
        {
          label: '🎮 Игры',
          route: '#',
          image: '/images/gamesCategory.jpg'
        },
        {
          label: 'Сериалы',
          route: '#',
          image: '/images/serialCategory.jpg'
        },
        {
          label: 'Аниме',
          route: '#',
          image: '/images/animeCategory.jpg'
        }
      ];
      return categories;
    }
  }
}
</script>
<style scoped>
.headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: #d0d0d0;
}

.subtext {
  color: #aaa;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

/* Категории с фоновым изображением */
.category-card {
  background-size: cover;
  background-position: center 25%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  color: #fff;
  transition: transform 0.2s ease;
}

.category-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45); /* затемнение изображения */
}

.category-card:hover {
  transform: scale(1.02);
}

.category-text {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow:
    0 0 3px rgba(0, 0, 0, 0.8),
    0 0 6px rgba(0, 0, 0, 0.6);
}
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.25);
}

/* Популярное */
.popular-card {
  background-color: #3a3a3a;
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

/* Кнопка "Перейти в каталог" */
.catalog-btn {
  background-color: #444;
  color: #ddd;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.catalog-btn:hover {
  background-color: #666;
}

router-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>