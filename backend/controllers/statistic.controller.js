const db = require("../db");

class statisticContoller {
  async getCounts(req, res) {
    try {
      const [itemsRes, usersRes, ratingsRes] = await Promise.all([
        db.query("SELECT COUNT(*) FROM items"),
        db.query("SELECT COUNT(*) FROM users"),
        db.query("SELECT COUNT(*) FROM ratings"),
      ]);

      res.status(200).json({
        total_items: parseInt(itemsRes.rows[0].count),
        total_users: parseInt(usersRes.rows[0].count),
        total_ratings: parseInt(ratingsRes.rows[0].count),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getTopRated(req, res) {
    try {
      const { rows } = await db.query(`
      SELECT i.id, i.title, ROUND(AVG(r.rating)::numeric, 2) as rating
      FROM ratings r
      JOIN items i ON i.id = r.item_id
      GROUP BY i.id
      HAVING COUNT(r.id) >= 3
      ORDER BY rating DESC
      LIMIT 5
    `);

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getItemsByYear(req, res) {
    try {
      const { rows } = await db.query(`
        SELECT release_year AS year, COUNT(*) AS count
        FROM items
        WHERE release_year IS NOT NULL
        GROUP BY release_year
        ORDER BY release_year
      `);

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async mostDiscosing(req, res) {
    try {
      const { rows } = await db.query(
        `
        SELECT i.title, COUNT(r.id) AS review_count
        FROM items i
        JOIN reviews r ON i.id = r.item_id
        GROUP BY i.id
        ORDER BY review_count DESC
        LIMIT 5;
        `
      );

      res.status(200).json(rows)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getMostFavorites(req, res) {
    try {
      const { rows } = await db.query(`
        SELECT i.title, COUNT(f.id) AS favorites_count
        FROM items i
        JOIN favorites f ON i.id = f.item_id
        GROUP BY i.id
        ORDER BY favorites_count DESC
        LIMIT 5;
      `);

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async typesCountForDiagramm(req, res) {
    try {
      const { rows } = await db.query(`
        SELECT t.value_full, COUNT(*) AS total
        FROM items i
        JOIN item_types t ON i.type_id = t.id
        GROUP BY t.value_full
        ORDER BY total DESC;  
      `);

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new statisticContoller();
