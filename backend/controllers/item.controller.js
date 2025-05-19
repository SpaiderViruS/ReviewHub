const db = require('../db');

class itemController {
  async getFilm(req, res, next) {
    try {
      const data = db.query(
        `
          SELECT
            f.id,
            f.type_id,
            f.title,
            t.value_full AS type_name,
            f.description,
            f.release_year,
            f.cover_url
          FROM items AS f
          JOIN item_types AS t ON t.id = f.type_id;
        `
      );

      res.status(200).json(data.rows);
    } catch(err) {
      res.status(400).json(err.message);
    }
  }
}

module.exports = new itemController();