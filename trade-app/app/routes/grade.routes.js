/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API для работы с оценками
 */

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Создать оценку
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Оценка
 *               - Тип_оценки
 *             properties:
 *               Оценка:
 *                 type: integer
 *               Тип_оценки:
 *                 type: string
 *               ID_студента:
 *                 type: integer
 *               ID_занятия:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Оценка создана
 *
 *   get:
 *     summary: Получить список оценок
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Список оценок
 *
 *   delete:
 *     summary: Удалить все оценки
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Все оценки удалены
 */

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Получить оценку по ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID оценки
 *     responses:
 *       200:
 *         description: Оценка найдена
 *       404:
 *         description: Оценка не найдена
 *
 *   put:
 *     summary: Обновить оценку по ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID оценки
 *     responses:
 *       200:
 *         description: Оценка обновлена
 *
 *   delete:
 *     summary: Удалить оценку по ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID оценки
 *     responses:
 *       200:
 *         description: Оценка удалена
 */

module.exports = app => {
  const grades = require("../controllers/grade.controller.js");

  var router = require("express").Router();

  // Create a new Grade
  router.post("/", grades.create);

  // Retrieve all Grades
  router.get("/", grades.findAll);

  // Retrieve a single Grade with id
  router.get("/:id", grades.findOne);

  // Update a Grade with id
  router.put("/:id", grades.update);

  // Delete a Grade with id
  router.delete("/:id", grades.delete);

  // Delete all Grades
  router.delete("/", grades.deleteAll);

  app.use('/api/grades', router);
};