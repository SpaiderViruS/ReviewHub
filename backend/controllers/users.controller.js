const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

class userController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error("Недостаточно данных");

      const data = await db.query(
        `
          SELECT * FROM users
          WHERE email = $1
        `, [ email ]
      );

      const user = data.rows[0]
      if (!user) return res.status(401).json({ message: "Неверный email или пароль" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ message: "Неверный email или пароль" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.id_role }, // Полезная нагрузка
        SECRET_KEY,
        { expiresIn: '7d' } //Временно время жизни 7d для теста
      );

      res.status(200).json(
        { 
          token, 
          user: {
            user_name: user.name, 
            user_surname: user.surname,
            user_login: user.email, 
            user_nickname: user.nickname,
            user_role: user.id_role
          }
        });
    } catch (err) {
      res.status(400).json(err.message)
    }
  }

  async regisration(req, res, next) {
    try {
      const { name, surname, nickname, email, password } = req.body;

      if (!name || !email || !password) throw new Error("Недостаточно данных");

      const existing = await db.query(
        `
          SELECT id FROM users WHERE email = $1
        `,
        [email]
      );
      if (existing.rows.length > 0) return res.status(409).json({ message: "Пользователь с таким email уже существует" });

      // Шифрование пароля
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      await db.query(
        `
          INSERT INTO users
          (name, surname, nickname, email, password_hash)
          VALUES
          ($1, $2, $3, $4, $5)
        `, [ name, surname, nickname, email, passwordHash ]
      );

      res.status(201).json({ message: "OK" })
    } catch (err) {
      res.status(400).json(err.message)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const data = await db.query(
        `
          SELECT 
            u.id,
            u.name,
            u.surname,
            u.nickname,
            u.email,

            r.id AS id_role,
            r.value_full
          FROM users AS u
          JOIN users_roles AS r ON r.id = u.id_role
        `
      );

      res.status(200).json(data.rows)
    } catch(err) {
      res.status(400).json(err.message)
    }
  }
}

module.exports = new userController();