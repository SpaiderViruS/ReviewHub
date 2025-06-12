module.exports = function (req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    if (user.role !== 3) {
      return res.status(403).json({ message: 'Доступ разрешён только администраторам' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Ошибка проверки прав доступа' });
  }
};
