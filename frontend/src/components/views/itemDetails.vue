<template>
  <div v-if="item">
    <h1>{{ item.title }}</h1>
    <img :src="item.cover" alt="Обложка" />
    <p>{{ item.description }}</p>
    <p>Рейтинг: {{ item.average_rating }}</p>
    <!-- и т.д. -->
  </div>
  <p v-else>Загрузка...</p>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

const $api = inject('$api')

const route = useRoute()
const item = ref(null)

onMounted(async () => {
  const { id } = route.params
  const res = await $api.get(`/item/${id}`)
  item.value = res.data
})
</script>
<style>
</style>