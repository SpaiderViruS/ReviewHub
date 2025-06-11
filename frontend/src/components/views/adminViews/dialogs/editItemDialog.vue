<template>
  <v-dialog     
    :model-value="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    max-width="700">
    <v-card class="edit-item-dialog">
      <v-card-title class="mb-2">
        {{ editedItem?.id ? 'Редактировать контент' : 'Добавить контент' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="form.title"
            label="Название"
            outlined
            class="mb-3"
            required
          />

          <v-textarea
            v-model="form.description"
            label="Описание"
            outlined
            rows="4"
            class="mb-3"
          />

          <v-select
            v-model="form.type_id"
            :items="types"
            item-title="value_full"
            item-value="id"
            label="Тип контента"
            outlined
            class="mb-3"
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
            class="mb-3"
          />

          <v-text-field
            v-model="form.release_year"
            label="Год выпуска"
            type="number"
            outlined
            class="mb-3"
          />

          <v-text-field
            v-model="form.cover_url"
            label="URL обложки"
            @input="updatePreview"
            outlined
            class="mb-3"
          />

          <div v-if="form.cover_url" class="preview-container mb-4">
            <p class="text-grey">Предпросмотр:</p>
            <v-img :src="form.cover_url" height="200" max-width="300" cover />
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('update:modelValue', false)">Отмена</v-btn>
        <v-btn color="var(--color-accent)" @click="submit">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue'
import { useDictionaries } from '@/helpers/useDictionaries'

const $api = inject('$api');

const props = defineProps({
  modelValue: Boolean,
  editedItem: Object
})

const emit = defineEmits(['update:modelValue', 'save'])

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

watch(
  () => props.editedItem,
  (val) => {
    if (val) {
      form.value = {
        title: val.title,
        description: val.description,
        type_id: val.type_id,
        genres: val.genres_ids || [],
        release_year: val.release_year,
        cover_url: val.cover_url
      }
    }
  },
  { immediate: true }
)

const updatePreview = () => {}

const submit = async () => {
  await $api.put(`/item/${props.editedItem?.id}`,{  ...form.value })
  emit('updated', { ...form.value, id: props.editedItem?.id })
  emit('update:modelValue', false)
}
</script>

<style scoped>
.edit-item-dialog {
  background: var(--color-background-soft);
  color: var(--color-text);
  border-radius: 12px;
}

.preview-container {
  border: 1px dashed var(--color-border);
  padding: 8px;
  border-radius: 8px;
  background-color: var(--color-background-mute);
}
</style>
