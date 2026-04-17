/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для работы со студентами
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать студента
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ФИО
 *               - Дата_Рождения
 *               - Класс
 *               - Телефон
 *             properties:
 *               ФИО:
 *                 type: string
 *               Дата_Рождения:
 *                 type: string
 *                 format: date-time
 *               Класс:
 *                 type: integer
 *               Телефон:
 *                 type: string
 *     responses:
 *       200:
 *         description: Студент создан
 *
 *   get:
 *     summary: Получить список студентов
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список студентов
 *
 *   delete:
 *     summary: Удалить всех студентов
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Все студенты удалены
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить студента по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID студента
 *     responses:
 *       200:
 *         description: Студент найден
 *       404:
 *         description: Студент не найден
 *
 *   put:
 *     summary: Обновить студента по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID студента
 *     responses:
 *       200:
 *         description: Студент обновлен
 *
 *   delete:
 *     summary: Удалить студента по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID студента
 *     responses:
 *       200:
 *         description: Студент удален
 */

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};