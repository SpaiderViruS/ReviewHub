<template>
  <v-container class="text-center py-16">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="error-code">404</h1>
        <p class="error-message">Страница не найдена</p>
        <router-link to="/">
          <v-btn class="mt-4 back-btn" flat>Вернуться на главную</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: var(--color-heading);
}

.error-message {
  font-size: 1.5rem;
  color: var(--color-text-soft);
}

.back-btn {
  background-color: var(--color-accent);
  color: var(--color-button-text);
  border-radius: 6px;
  font-weight: bold;
  padding: 10px 24px;
  transition: background 0.2s ease;
}

.back-btn:hover {
  background-color: #d73752;
}

</style>
