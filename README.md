## Описание

Это веб-приложение для просмотра, оценки и обсуждения фильмов, игр, сериалов и книг. Пользователи могут:

* искать и фильтровать контент по жанру и типу;

* оставлять отзывы и выставлять оценки;

* просматривать мнения других пользователей;

* видеть средний рейтинг по каждому произведению.

Проект разработан на Vue 3 + Vuetify (frontend) и Node.js + PostgreSQL (backend).
Цель — создать удобную платформу для обмена мнениями и рекомендациями между пользователями.

## Первичный запуск

Прописать `npm i` в каждой папке (`frontend` и `backend` соответсвенно)

## Запуск 

Перейти в папку `frontend` и написать команду `npm run dev`, запуск бэка аналогично.

## Требования

* NodeJS v.22.14.0

## Настройка переменных окружения

### frontend

* NODE_ENV - development || production
* VITE_API_BASE_URL - Отвечает за обращение API, на локальном сервере это - `http://localhost:3000`
* VITE_MAINTENANCE - Отвечает за отображение тех работ, при `true` будет только одна надпись, остальные взаимодействия будут недоступны

Настройка `.env.development`
```Properties
NODE_ENV = development
VITE_API_BASE_URL = http://localhost:3000
VITE_MAINTENANCE=false
```

### Backend

* DATABASE_URL - Ссылка для обращение к БД, пример обращение к локальной БД `postgresql://postgres:ваш_пароль@localhost:5432/имя_бд`
* NODE_ENV - development || production
* SECRET_KEY - Ключ для токена

Настойка `.env`
```Properties
DATABASE_URL=postgresql://postgres:ваш_пароль@localhost:5432/имя_бд
NODE_ENV = development
SECRET_KEY=your_super_secret_key_here
```
