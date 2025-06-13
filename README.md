# 🎮 MediaHub — платформа для отзывов и оценок

**MediaHub** — это современное веб-приложение для просмотра, оценки и обсуждения фильмов, игр, сериалов и книг.

## 🔍 Возможности

🔹 Для пользователей:

- поиск и фильтрация по жанрам и типам
- отзывы и оценки
- средние рейтинги
- избранное
- профиль и история активности

🔹 Для админов:

- управление контентом
- управление пользователями
- просмотр статистики

---

## ⚙️ Стек технологий

| Часть        | Технологии                         |
| ------------ | ---------------------------------- |
| **Frontend** | Vue 3, Vuetify 3, Vite             |
| **Backend**  | Node.js (Express), PostgreSQL, JWT |
| **API**      | RESTful, axios                     |

---

## 🚀 Установка

```bash
git clone https://github.com/your-username/mediahub.git
cd mediahub
```

### Установка зависимостей:

```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## ▶️ Запуск проекта

**Frontend (Vue 3 + Vite):**

```bash
cd frontend
npm run dev
```

**Backend (Node.js):**

```bash
cd backend
npm run dev
```

---

## 🛋️ Переменные окружения

### Frontend (`.env.development`):

```env
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
VITE_MAINTENANCE=false
```

### Backend (`.env`):

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/your_db_name
NODE_ENV=development
SECRET_KEY=your_super_secret_key
```

---

## 💡 Особенности

- JWT-авторизация (с ID, email, ролью)
- Проверка ролей для admin API
- Стилизованные компоненты Vuetify 3
- Статистика для админа: топ-жанры, кол-во контента, пользователей

---

## 👨‍💼 Автор

**(SpaiderViruS)**

---

## 📄 Лицензия

Проект распространяется под лицензией [MIT](./LICENSE).

