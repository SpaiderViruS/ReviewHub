<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    max-width="500"
  >
    <v-card>
      <v-card-title>{{ user?.id ? 'Редактировать пользователя' : 'Добавить пользователя' }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="localUser.name"
            label="Имя"
            required
          />

          <v-text-field
            v-model="localUser.surname"
            label="Фамилия"
            required
          />

          <v-text-field
            v-model="localUser.email"
            label="Email"
            type="email"
            required
          />

          <v-text-field
            v-model="localUser.nickname"
            label="Никнейм"
            type="nickname"
            required
          />

          <v-text-field
            v-model="localUser.password"
            label="Пароль"
            type="password"
            :placeholder="user?.id ? 'Оставьте пустым, чтобы не менять' : ''"
          />

          <v-select
            v-model="localUser.id_role"
            :items="roles"
            label="Роль"
            item-title="label"
            item-value="value"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('update:modelValue', false)">Отмена</v-btn>
        <v-btn color="var(--color-accent)" @click="submitForm">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  user: Object
});

const emit = defineEmits(['update:modelValue', 'save']);

const localUser = ref({
  id: null,
  name: '',
  surname: '',
  email: '',
  nickname: '',
  password: '',
  id_role: 1
});

const roles = [
  { value: 1, label: 'Пользователь' },
  { value: 2, label: 'Модератор' },
  { value: 3, label: 'Администратор' }
];

watch(
  () => props.user,
  (val) => {
    if (val) {
      localUser.value = {
        id: val.id,
        name: val.name,
        surname: val.surname,
        email: val.email,
        nickname: val.nickname,
        password: '',
        id_role: val.id_role
      };
    } else {
      localUser.value = {
        id: null,
        name: '',
        surname: '',
        email: '',
        nickname: '',
        password: '',
        id_role: 1
      };
    }
  },
  { immediate: true }
);

const submitForm = () => {
  emit('save', { ...localUser.value });
  emit('update:modelValue', false);
};
</script>

<style scoped>
.v-card {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.v-text-field input,
.v-select input {
  background: var(--color-input-bg);
  color: var(--color-text);
  border-color: var(--color-input-border);
}

.v-btn[color="var(--color-accent)"] {
  background-color: var(--color-accent);
  color: var(--color-button-text);
}

.v-btn[color="var(--color-accent)"]:hover {
  background-color: var(--color-accent-hover);
}
</style>
