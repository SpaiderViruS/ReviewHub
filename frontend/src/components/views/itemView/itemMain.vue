<template>
  <itemDetails v-if="item"/>
  <reviewSection v-if="item" :item-id="item.id"/>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import itemDetails from './itemDetails.vue'
import reviewSection from './reviewSection.vue'

const route = useRoute()
const $api = inject('$api')
const item = ref(null)

onMounted(async () => {
  const res = await $api.get(`/item/${route.params.id}`);
  item.value = res.data
})
</script>
<style>
</style>