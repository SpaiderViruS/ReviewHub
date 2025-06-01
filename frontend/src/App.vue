<template>
  <!-- Техи -->
  <div v-if="isMaintenance" class="maintenance">
    <h1>Сайт временно недоступен</h1>
    <p>Мы проводим технические работы. Пожалуйста, зайдите позже </p>
  </div>
  <div v-else id="app">
    <navBar />
    <main>
      <router-view />
    </main>
    <Footer class="footer"/>
  </div>
</template>
<script setup>
import { onMounted, inject } from 'vue'
import { useDictionaries } from '@/helpers/useDictionaries'
import MainComponent from './components/index.vue';
import navBar from './components/navBar.vue';
import Footer from './components/footer.vue';

// Техи
const isMaintenance = import.meta.env.VITE_MAINTENANCE === 'true';

// Загрузка справочников
const $api = inject('$api')
onMounted(async () => {
  await useDictionaries($api)
})
</script>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */

.maintenance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: #f5f5f5;
  color: #444;
}

.v-container {
  background-color: transparent !important;
}
</style>
