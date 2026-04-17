/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: API для работы с записями на курсы
 */

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Создать запись на курс
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Дата_записи
 *               - Статус
 *               - ID_курса
 *               - ID_студента
 *             properties:
 *               Дата_записи:
 *                 type: string
 *                 format: date-time
 *               Статус:
 *                 type: string
 *               ID_курса:
 *                 type: integer
 *               Курсы_ID_курса:
 *                 type: integer
 *               ID_студента:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Запись создана
 *
 *   get:
 *     summary: Получить список записей на курсы
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: Список записей
 *
 *   delete:
 *     summary: Удалить все записи на курсы
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: Все записи удалены
 */

/**
 * @swagger
 * /api/registrations/{id}:
 *   get:
 *     summary: Получить запись на курс по ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи
 *     responses:
 *       200:
 *         description: Запись найдена
 *       404:
 *         description: Запись не найдена
 *
 *   put:
 *     summary: Обновить запись на курс по ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи
 *     responses:
 *       200:
 *         description: Запись обновлена
 *
 *   delete:
 *     summary: Удалить запись на курс по ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи
 *     responses:
 *       200:
 *         description: Запись удалена
 */

module.exports = app => {
  const registrations = require("../controllers/regist.controller.js");

  var router = require("express").Router();

  // Create a new Registration
  router.post("/", registrations.create);

  // Retrieve all Registrations
  router.get("/", registrations.findAll);

  // Retrieve a single Registration with id
  router.get("/:id", registrations.findOne);

  // Update a Registration with id
  router.put("/:id", registrations.update);

  // Delete a Registration with id
  router.delete("/:id", registrations.delete);

  // Delete all Registrations
  router.delete("/", registrations.deleteAll);

  app.use('/api/registrations', router);
};
