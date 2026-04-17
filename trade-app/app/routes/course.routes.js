/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API для работы с курсами
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создать курс
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Название
 *             properties:
 *               Описание:
 *                 type: string
 *               Название:
 *                 type: string
 *               ID_заявка:
 *                 type: integer
 *               ID_студента:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Курс создан
 *
 *   get:
 *     summary: Получить список курсов
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Список курсов
 *
 *   delete:
 *     summary: Удалить все курсы
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Все курсы удалены
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Получить курс по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Курс найден
 *       404:
 *         description: Курс не найден
 *
 *   put:
 *     summary: Обновить курс по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Курс обновлен
 *
 *   delete:
 *     summary: Удалить курс по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Курс удален
 */

module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Update a Course with id
  router.put("/:id", courses.update);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  // Delete all Courses
  router.delete("/", courses.deleteAll);

  app.use('/api/courses', router);
};