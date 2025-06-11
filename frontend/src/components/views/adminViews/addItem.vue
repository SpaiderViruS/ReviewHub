<template>
  <v-container class="py-6 add-item-container">
    <h2 class="mb-6">Добавление нового контента</h2>
    <v-form @submit.prevent="submitItem" ref="formRef">
      <v-text-field
        v-model="form.title"
        label="Название"
        required
        outlined
        class="mb-4"
      />

      <v-textarea
        v-model="form.description"
        label="Описание"
        rows="4"
        outlined
        class="mb-4"
      />

      <v-select
        v-model="form.type_id"
        :items="types"
        item-title="value_full"
        item-value="id"
        label="Тип контента"
        outlined
        class="mb-4"
        required
      />

      <v-select
        v-model="form.genres"
        :items="genres"
        item-title="value_full"
        item-value="id"
        label="Жанры"
        multiple
        chips
        outlined
        class="mb-4"
      />

      <v-text-field
        v-model="form.release_year"
        label="Год выпуска"
        type="number"
        outlined
        class="mb-4"
      />

      <v-text-field
        v-model="form.cover_url"
        label="URL обложки"
        @input="updatePreview"
        outlined
        class="mb-4"
      />

      <div v-if="form.cover_url" class="preview-container mb-4">
        <p class="text-grey">Предпросмотр:</p>
        <v-img :src="form.cover_url" height="200" max-width="300" cover />
      </div>

      <v-btn color="var(--color-accent)" type="submit" class="mt-2">Сохранить</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useDictionaries } from '@/helpers/useDictionaries'

const $api = inject('$api')
const formRef = ref(null)

const form = ref({
  title: '',
  description: '',
  type_id: null,
  genres: [],
  release_year: null,
  cover_url: ''
})

const types = ref([])
const genres = ref([])

onMounted(async () => {
  const { itemTypes, genres: loadedGenres } = await useDictionaries()
  types.value = itemTypes
  genres.value = loadedGenres
})

const updatePreview = () => {
  
}

const submitItem = async () => {
  try {
    await $api.post('/item/', {
      ...form.value
    })
    
    formRef.value.reset()
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.add-item-container {
  max-width: 700px;
  margin: 0 auto;
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-container {
  border: 1px dashed var(--color-border);
  padding: 8px;
  border-radius: 8px;
  background-color: var(--color-background-mute);
}
</style>
