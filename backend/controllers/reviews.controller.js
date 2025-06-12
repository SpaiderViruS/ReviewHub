const db = require("../db");

class reviewController {
  async getItemReviews(req, res, next) {
    try {
      const itemId = req.params.id;

      if (!itemId) throw new Error("Отсутсвует идентификатор");

      const data = await db.query(
        `
          SELECT
            u.nickname AS author_nickname,
            u.email AS user_login,
            rv.text,
            rv.id AS review_id,
            rtg.rating
          FROM reviews AS rv
          LEFT JOIN users AS u ON u.id = rv.user_id
          LEFT JOIN ratings AS rtg ON rtg.user_id = rv.user_id AND rtg.item_id = rv.item_id
          WHERE rv.item_id = $1
          ORDER BY rv.created_at;
        `,
        [itemId]
      );

      res.status(200).json(data.rows);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async createItemReview(req, res, next) {
    try {
      const { rating, text, item_id } = req.body;
      const user_id = req.user.id;

      if (!rating || !text || !user_id || !item_id)
        throw new Error("Недостаточно данных");

      const existingReview = await db.query(
        `SELECT * FROM reviews WHERE user_id = $1 AND item_id = $2`,
        [user_id, item_id]
      );

      // Если отзыв существует, то редактируем
      if (existingReview.rows.length > 0) {
        await db.query(
          `UPDATE reviews SET text = $1, updated_at = NOW() WHERE user_id = $2 AND item_id = $3`,
          [text, user_id, item_id]
        );

        await db.query(
          `UPDATE ratings SET rating = $1 WHERE user_id = $2 AND item_id = $3`,
          [rating, user_id, item_id]
        );
      } else {
        // Создание нового отзыва
        await db.query(
          `INSERT INTO reviews (user_id, item_id, text) VALUES ($1, $2, $3)`,
          [user_id, item_id, text]
        );

        await db.query(
          `INSERT INTO ratings (user_id, item_id, rating) VALUES ($1, $2, $3)`,
          [user_id, item_id, rating]
        );
      }

      res.status(201).json("OK");
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async getUserReview(req, res, next) {
    try {
      const id = req.user.id;

      if (!id) throw new Error("Недостаточно данных");

      const data = await db.query(
        `
            SELECT 
              i.title AS item_title,
              r.text,
              r.created_at
            FROM reviews AS r
            JOIN items AS i ON i.id = r.item_id
            WHERE r.user_id = $1
          `,
        [id]
      );

      res.status(200).json(data.rows);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}

module.exports = new reviewController();