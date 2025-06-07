<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="8" class="pa-6 profile-card">
          <h2 class="text-center mb-4">Профиль</h2>
          <v-form>
            <v-text-field
              v-model="localUser.user_name"
              label="Имя"
              prepend-inner-icon="mdi-account"
              outlined
              dense
              readonly
              class="mt-2"
            />
            <v-text-field
              v-model="localUser.user_surname"
              label="Фамилия"
              prepend-inner-icon="mdi-account"
              outlined
              dense
              readonly
              class="mt-2"
            />
            <v-text-field
              v-model="localUser.user_nickname"
              label="Никнейм"
              prepend-inner-icon="mdi-face-man-profile"
              outlined
              dense
              readonly
              class="mt-2"
            />
            <v-text-field
              v-model="localUser.user_login"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              outlined
              dense
              readonly
              class="mt-2"
            />
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUser } from '@/components/store/userStore';

const { user } = useUser();

const localUser = ref({
  user_name: '',
  user_surname: '',
  user_nickname: '',
  user_login: ''
});

if (user.value) {
  localUser.value = { ...user.value };
}
</script>

<style scoped>
.profile-card {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 12px;
}
</style>
