<template>
  <v-container class="privacy-container">
    <v-card class="privacy-card" elevation="2">
      <v-card-title class="headline">Политика обработки персональных данных</v-card-title>
      <v-card-text class="privacy-text">
        <p><strong>1. Общие положения</strong></p>
        <p>
          Настоящая Политика определяет порядок обработки и хранения персональных данных пользователей веб-приложения.
          Использование сайта означает согласие пользователя с настоящей Политикой.
        </p>

        <p><strong>2. Состав собираемых данных</strong></p>
        <p>
          Мы не собираем чувствительные или избыточные персональные данные.
          При регистрации и входе в систему используется только логин (или email) и токен аутентификации.
          Пароли не хранятся на клиентской стороне.
        </p>

        <p><strong>3. Использование токенов</strong></p>
        <p>
          Для авторизации и доступа к закрытым разделам сайта используются JWT-токены.
          Они временно сохраняются в <code>localStorage</code> и используются только для подтверждения подлинности пользователя.
          Токены не передаются третьим лицам и не используются в рекламных целях.
        </p>

        <p><strong>4. Безопасность</strong></p>
        <p>
          Мы применяем технические и организационные меры для защиты пользовательских данных.
          Однако пользователь также несёт ответственность за сохранность своих учётных данных.
        </p>

        <p><strong>5. Третьи лица</strong></p>
        <p>
          Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных законом.
        </p>

        <p><strong>6. Хранение данных</strong></p>
        <p>
          Токены автоматически удаляются по истечении срока действия или при выходе пользователя из системы.
        </p>

        <p><strong>7. Изменения в политике</strong></p>
        <p>
          Мы оставляем за собой право вносить изменения в настоящую политику. Актуальная версия всегда доступна на этой странице.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.privacy-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}

.privacy-card {
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

.privacy-text p {
  margin-bottom: 1em;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
</style>
