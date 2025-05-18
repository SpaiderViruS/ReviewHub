<template>
  <nav class="nav">
    <router-link to="/" class="nav-link">Главная</router-link>
    <router-link to="/catalog" class="nav-link">Каталог</router-link>
  </nav>
</template>
<script setup>

</script>
<style scoped>
.nav {
  display: flex;
  gap: 1.5rem;
  padding: 1.2rem 2rem;
  background: linear-gradient(to right, #2c2c2c, #3a3a3a);
}

.nav-link {
  font-size: 1.2rem;
  color: #d0d0d0;
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: #555;
  color: #fff;
}
</style>