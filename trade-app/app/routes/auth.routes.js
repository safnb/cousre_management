/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API для авторизации
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход (возвращает токен)
 *       401:
 *         description: Неверный логин или пароль
 */

module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/login", auth.login);

  app.use('/api/auth', router);
};