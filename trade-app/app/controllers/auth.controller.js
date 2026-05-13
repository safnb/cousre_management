const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.ID_студента, role: user.Роль },
      'my_super_secret_key_123',
      { expiresIn: "24h" }
    );

    // Всегда возвращаем JSON (и для основной формы, и для скрытой)
    res.json({
      id: user.ID_студента,
      email: user.email,
      role: user.Роль,
      token: token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};