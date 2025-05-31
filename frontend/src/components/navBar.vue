<template>
  <nav class="nav">
    <router-link to="/" class="nav-link">Главная</router-link>
    <router-link to="/catalog" class="nav-link">Каталог</router-link>
      
    <div class="mb-0 mt-auto ml-auto authorization">
      <router-link to="/login" class="nav-link">Авторизация</router-link>
    </div>
    <!-- <router-link to="/catalog" class="ml-auto nav-link">Авторизация</router-link> -->
    <div class="changeTheme">
      <v-btn @click="toggleTheme" :color="theme === 'dark' ? 'white' : 'black'" class="ml-auto" icon>
        <v-icon :icon="theme === 'dark' ? 'custom:SunIcon' : 'custom:moonIcon'" />
      </v-btn>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('dark')

onMounted(() => {
  const storedTheme = localStorage.getItem('theme') || 'dark'
  theme.value = storedTheme
  document.documentElement.setAttribute('data-theme', theme.value)
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}
</script>
<style scoped>
.nav {
  display: flex;
  gap: 1.5rem;
  padding: 1.2rem 2rem;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.3s ease, color 0.3s ease;
}

.nav-link {
  font-size: 1.2rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(233, 69, 96, 0.1);
  color: #e94560;
}

.router-link-exact-active {
  background-color: rgba(233, 69, 96, 0.2);
  color: #e94560;
}

.authorization {
  /* background-color: #e94560; */
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
}

/* .changeTheme {
  margin-left: auto;
} */
</style>