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
}

module.exports = new itemController();