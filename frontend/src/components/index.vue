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
    <v-container class="mt-16 mb-6">
      <h2 class="mb-4 ml-auto mr-auto catalog-title">Популярные по рейтингу</h2>
      <v-row v-if="loading">
        <v-col
          v-for="n in 4"
          :key="n"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader type="card" class="rounded" height="280px" />
        </v-col>
      </v-row>

      <v-slide-group v-else show-arrows class="popular-slide-group">
        <div
          v-for="item in items"
          :key="item.id"
        >
          <router-link :to="`/item/${item.id}`" class="slide-card-link">
            <v-card class="content-card" flat tile>
              <v-img
                :src="item.cover_url"
                height="280px"
                class="card-img"
                cover
              >
                <div class="card-overlay">
                  <div class="card-title">{{ item.title }}</div>
                  <div class="card-rating">⭐ {{ Number(item.avg_rating).toFixed(1) }} / 10</div>
                </div>
              </v-img>
            </v-card>
          </router-link>
        </div>
      </v-slide-group>
    </v-container>

    <!-- Кнопка перехода в каталог -->
    <router-link to="/catalog">
      <v-btn class="mt-10 catalog-btn" flat>Перейти в каталог</v-btn>
    </router-link>
  </v-container>
</template>
<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      items: [],
      loading: true
    }
  },
  computed: {
    categories() {
      return [ 
        {
          label: '🎬 Фильмы',
          route: '#',
          image: '/images/filmCategory.png'
        },
        {
          label: '🎮 Игры',
          route: '#',
          image: '/images/gamesCategory.png'
        },
        {
          label: 'Сериалы',
          route: '#',
          image: '/images/serialCategory.png'
        },
        {
          label: 'Аниме',
          route: '#',
          image: '/images/animeCategory.png'
        } 
      ];
    }
  },
  async mounted() {
    try {
      const res = await this.$api.get('/item/popular');
      this.items = res.data;
    } catch (err) {
      console.error('Ошибка загрузки популярных:', err);
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style scoped>
.headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
}

.subtext {
  color: var(--color-text-secondary);
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

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
  background-color: rgba(0, 0, 0, 0.45);
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
.popular-slide-group {
  padding: 0 12px;
}

.slide-card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  width: 360px;
  margin: 4px;
}

.content-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-color: transparent;
}

.content-card:hover {
  transform: scale(1.04);
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

.card-rating {
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Кнопка "Перейти в каталог" */
.catalog-btn {
  background-color: var(--color-highlight);
  color: var(--color-text-primary);
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