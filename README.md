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
