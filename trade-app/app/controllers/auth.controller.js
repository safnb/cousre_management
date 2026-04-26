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
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.ID_студента, role: user.Роль },
      'my_super_secret_key_123',
      { expiresIn: "24h" }
    );

    res.send({
      id: user.ID_студента,
      email: user.email,
      role: user.Роль,
      token: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
