import { ref } from "vue";

const itemTypes = ref([])
const genres = ref([])

// Прогрузка справочников в LocalStorage
// Если в LocalStorage есть данные то не грузить иначе загрузить
export async function useDictionaries($api) {
  if (itemTypes.value.length === 0) {
    const cached = localStorage.getItem('item_types')
    if (cached) {
      itemTypes.value = JSON.parse(cached)
    } else {
      const { data } = await $api.get('/dictionary/item_types')
      itemTypes.value = data.data
      localStorage.setItem('item_types', JSON.stringify(data.data))
    }
  }

  if (genres.value.length === 0) {
    const cached = localStorage.getItem('genres')
    if (cached) {
      genres.value = JSON.parse(cached)
    } else {
      const { data } = await $api.get('/dictionary/genres')
      genres.value = data.data
      localStorage.setItem('genres', JSON.stringify(data.data))
    }
  }

  return {
    itemTypes: itemTypes.value,
    genres: genres.value
  }
}
