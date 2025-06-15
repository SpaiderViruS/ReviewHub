<template>
  <v-container class="about-container">
    <v-card class="about-card" elevation="2">
      <v-card-title class="headline">О проекте</v-card-title>
      <v-card-text class="about-text">
        Этот веб-приложение представляет собой интерактивный каталог фильмов, игр, сериалов и аниме.
        Пользователи могут просматривать контент, оставлять отзывы, оценивать и формировать собственное мнение.
        <br /><br />
        Проект разработан с использованием <strong>Vue 3</strong> и <strong>Vuetify 3</strong> во фронтенде, а на серверной части — <strong>Node.js</strong> с <strong>PostgreSQL</strong>.
        <br /><br />
        Цель проекта — создать удобную платформу для обмена мнениями о медиа-контенте, основанную на честных пользовательских оценках.
        <br /><br />
        Разработка и дизайн — <strong>SpaiderViruS (Аллагулов Э.Р.)</strong>, <strong>DragonNill (Сафин И.М.)</strong>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.about-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}

.about-card {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--color-background);
  color: var(--color-text);
}

.headline {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--color-heading);
}

.about-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
</style>
