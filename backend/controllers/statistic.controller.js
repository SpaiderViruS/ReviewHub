const db = require("../db");

class statisticContoller {
  async getCounts(req, res) {
    try {
      const [itemsRes, usersRes, ratingsRes] = await Promise.all([
        db.query("SELECT COUNT(*) FROM items"),
        db.query("SELECT COUNT(*) FROM users"),
        db.query("SELECT COUNT(*) FROM ratings"),
      ]);

      res.json({
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

      res.json(rows);
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

      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new statisticContoller();
