<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="8" class="pa-6 register-card">
          <h2 class="text-center mb-4">Регистрация</h2>
          <v-form v-model="formValid" @submit.prevent="handleRegister">
            <v-text-field
              class="mt-2"
              v-model="name"
              label="Имя"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account"
              outlined
              dense
            />

            <v-text-field
              class="mt-2"
              v-model="surname"
              label="Фамилия"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account"
              outlined
              dense
            />

            <v-text-field
              class="mt-2"
              v-model="nickname"
              label="Никнейм"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-face-man-profile"
              outlined
              dense
            />

            <v-text-field
              class="mt-2"
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              outlined
              dense
            />

            <v-text-field
              class="mt-2"
              v-model="password"
              label="Пароль"
              type="password"
              :rules="[rules.required, rules.min]"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
            />

            <v-btn type="submit" :disabled="!formValid" color="primary" block class="mt-4 auth-btn">
              Зарегистрироваться
            </v-btn>
          </v-form>

          <div class="text-center mt-3">
            <small>Уже есть аккаунт?
              <router-link to="/login">Войти</router-link>
            </small>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $api = inject('$api');

const name = ref('');
const surname = ref('');
const nickname = ref('');
const email = ref('');
const password = ref('');
const formValid = ref(false);

const rules = {
  required: v => !!v || 'Поле обязательно',
  email: v => /.+@.+\..+/.test(v) || 'Неверный формат email',
  min: v => v.length >= 6 || 'Минимум 6 символов',
};

async function handleRegister() {
  try {
    const { data } = await $api.post('/users/registration', {
      name: name.value,
      surname: surname.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value
    });

    if (data?.message === 'OK') {
      router.push('/login');
    }
  } catch (err) {
    console.error('Ошибка регистрации:', err.response?.data || err.message);
  }
}
</script>

<style scoped>
.register-card {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 12px;
}

h2 {
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--color-heading);
}

small {
  color: var(--color-text-secondary);
}

.auth-btn {
  background-color: var(--color-accent) !important;
  color: white !important;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.auth-btn.v-btn--disabled {
  background-color: #ccc !important;
  color: #666 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
  opacity: 1 !important;
}
</style>
