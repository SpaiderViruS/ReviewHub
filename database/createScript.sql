-- Справочник типов контента
CREATE TABLE item_types (
  id SERIAL PRIMARY KEY,
  value_full TEXT NOT NULL,
  value_short TEXT NOT NULL
);

-- Роли
CREATE TABLE users_roles (
  id SERIAL PRIMARY KEY,
  value_full TEXT NOT NULL,
  value_short TEXT NOT NULL
);

-- Пользователи
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  surname character varying(120),
  nickname character varying(120),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  id_role INTEGER NOT NULL REFERENCES users_roles(id) ON DELETE CASCADE
);

-- Основной каталог (фильмы / игры / книги)
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL REFERENCES item_types(id),
  title TEXT NOT NULL,
  description TEXT,
  release_year INTEGER,
  cover_url TEXT
);

-- Жанры
CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  value_full TEXT NOT NULL,
  value_short TEXT NOT NULL
);

-- Связь items ↔ genres (многие ко многим)
CREATE TABLE item_genres (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  UNIQUE (item_id, genre_id)
);

-- Рейтинги (оценки)
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  UNIQUE (user_id, item_id)
);

-- Отзывы
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Избранное
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  UNIQUE (user_id, item_id)
);


INSERT INTO item_types (id, value_full, value_short) VALUES
(1, 'Фильм', 'Фильм'),
(2, 'Аниме', 'Аниме'),
(3, 'Сериал', 'Сериал'),
(4, 'Игра', 'Игра');

INSERT INTO genres (id, value_full, value_short) VALUES
(1, 'Фантастика', 'Фантастика'),
(2, 'RPG', 'RPG'),
(3, 'Антиутопия', 'Антиутопия'),
(4, 'Драма', 'Драма'),
(5, 'Экшен', 'Экшен'),
(6, 'Триллер', 'Триллер'),
(7, 'Фэнтези', 'Фэнтези');