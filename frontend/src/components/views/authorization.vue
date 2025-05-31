<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="8" class="pa-6 login-card">
          <h2 class="text-center mb-4">Вход в систему</h2>
          <v-form v-model="formValid" @submit.prevent="handleLogin">
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
              class="mt-4"
              v-model="password"
              label="Пароль"
              type="password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
            />

            <v-btn type="submit" :disabled="!formValid" color="primary" block class="mt-4 auth-btn">
              Войти
            </v-btn>
          </v-form>

          <div class="text-center mt-3">
            <small>Нет аккаунта?
              <router-link to="/register">Зарегистрироваться</router-link>
            </small>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const formValid = ref(false)

const rules = {
  required: v => !!v || 'Поле обязательно',
  email: v => /.+@.+\..+/.test(v) || 'Неверный формат email',
}

async function handleLogin() {
  try {
    const { data } = await $api.post('/auth/login', {
      email: form.login,
      password: form.password
    });

    // TODO: получать токен
    localStorage.setItem('token', data.token);
    
    router.push('/profile');
  } catch (err) {
    console.error('Ошибка входа:', err.response?.data?.message || err.message);
  }
}
</script>

<style scoped>
.login-card {
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
