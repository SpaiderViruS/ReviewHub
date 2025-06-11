const db = require('../db');

class itemController {
  async getItems(req, res, next) {
    try {
      const data = await db.query(
        `
          SELECT
            f.id,
            f.type_id,
            f.title,
            t.value_full AS type_name,
            f.description,
            f.release_year,
            f.cover_url,
            ROUND(AVG(r.rating), 1) AS average_rating,
            COUNT(r.rating) AS rating_count,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT g.value_short), NULL) AS genres
          FROM items AS f
          JOIN item_types AS t ON t.id = f.type_id
          LEFT JOIN ratings AS r ON r.item_id = f.id
          LEFT JOIN item_genres ig ON ig.item_id = f.id
          LEFT JOIN genres g ON g.id = ig.genre_id
          GROUP BY f.id, t.value_full
          ORDER BY f.title;
        `
      );

      res.status(200).json(data.rows);
    } catch(err) {
      res.status(400).json(err.message);
    }
  }

  async getCurrentItem(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) throw new Error("Отсутвует идентификатор item")

      const data = await db.query(
        `
          SELECT
            f.id,
            f.type_id,
            f.title,
            t.value_full AS type_name,
            f.description,
            f.release_year,
            f.cover_url,
            ROUND(AVG(r.rating), 1) AS average_rating,
            COUNT(r.rating) AS rating_count,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT g.value_short), NULL) AS genres_titles,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT g.id), NULL) AS genres_ids
          FROM items AS f
          JOIN item_types AS t ON t.id = f.type_id
          LEFT JOIN ratings AS r ON r.item_id = f.id
          LEFT JOIN item_genres ig ON ig.item_id = f.id
          LEFT JOIN genres g ON g.id = ig.genre_id
          WHERE f.id = $1
          GROUP BY f.id, t.value_full
          ORDER BY f.title
        `, [ id ])

      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err)
      res.status(400).json(err.message);
    }
  }

  async getPopularsItems(req, res, next) {
    try {
      const data = await db.query(
        `
          SELECT i.id, i.title, i.cover_url,
            COALESCE(AVG(r.rating), 0) AS avg_rating
          FROM items i
          LEFT JOIN ratings r ON r.item_id = i.id
          GROUP BY i.id
          ORDER BY avg_rating DESC
          LIMIT 10
      `);
      res.status(200).json(data.rows);
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message)
    }
  }

  async createItem(req, res, next) {
    try {
      const { title, description, release_year, cover_url, type_id, genres } = req.body;

      if (!title || !type_id || !Array.isArray(genres) || genres.length === 0) throw new Error("Некорректные данные")

      const itemInsert = await db.query(
        `
          INSERT INTO items (title, description, release_year, cover_url, type_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `,
        [ title, description, release_year, cover_url, type_id ]
      );

      const itemId = itemInsert.rows[0].id;

      const insertGenrePromises = genres.map((genreId) => {
        return db.query(
          `INSERT INTO item_genres (item_id, genre_id) VALUES ($1, $2)`,
          [ itemId, genreId ]
        );
      });

      await Promise.all(insertGenrePromises);

      res.status(201).json({ message: "Контент успешно добавлен", id: itemId });
    } catch(err) {
      res.status(400).json(err.message);
    }
  }

  async editItem(req, res, next) {
    try {
      const { title, description, release_year, cover_url, type_id, genres } = req.body;
      const id = req.params.id;

      if (!title || !type_id  || !id || !Array.isArray(genres) || genres.length === 0) throw new Error("Некорректные данные");

      await db.query(
        `
          UPDATE items
          SET
            title = $1,
            description = $2,
            release_year = $3,
            cover_url = $4,
            type_id = $5
          WHERE
            id = $6
        `, [ title, description, release_year, cover_url, type_id, id]
      );

      await db.query(
        `DELETE FROM item_genres WHERE item_id = $1`,
        [id]
      );

      const insertValues = genres.map((genreId, index) => `($1, $${index + 2})`).join(", ");
      const params = [id, ...genres];

      await db.query(
        `INSERT INTO item_genres (item_id, genre_id) VALUES ${insertValues}`,
        params
      );

      res.status(200).json("OK");
    } catch (err) {
      res.status(400).json(err.message)
    }
  }
}

module.exports = new itemController();