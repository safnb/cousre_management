/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: API для работы с занятиями
 */

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Создать занятие
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Тема
 *               - Дата_и_время
 *             properties:
 *               Тема:
 *                 type: string
 *               Дата_и_время:
 *                 type: string
 *                 format: date-time
 *               ID_студента:
 *                 type: integer
 *               ID_курса:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Занятие создано
 *
 *   get:
 *     summary: Получить список занятий
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Список занятий
 */

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Получить занятие по ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Занятие найдено
 *       404:
 *         description: Занятие не найдено
 */

/**
 * @swagger
 * /api/lessons/{id}/coursename:
 *   get:
 *     summary: Получить название курса по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Название курса
 *       404:
 *         description: Курс не найден
 *
 * /api/lessons/{id}/course:
 *   get:
 *     summary: Получить объект курса по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Объект курса
 *       404:
 *         description: Курс не найден
 *
 * /api/lessons/{id}/studentname:
 *   get:
 *     summary: Получить ФИО студента по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: ФИО студента
 *
 * /api/lessons/{id}/student:
 *   get:
 *     summary: Получить объект студента по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Объект студента
 *
 * /api/lessons/{id}/grades:
 *   get:
 *     summary: Получить список оценок по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Список оценок
 *
 * /api/lessons/{id}/average-grade:
 *   get:
 *     summary: Получить среднюю оценку по ID занятия
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID занятия
 *     responses:
 *       200:
 *         description: Средняя оценка
 */

module.exports = app => {
  const lessons = require("../controllers/lesson.controller.js");
  const lessonQuery = require("../controllers/lessonQuery.controller.js");

  var router = require("express").Router();

  // Create a new Lesson
  router.post("/", lessons.create);

  // Retrieve all Lessons
  router.get("/", lessons.findAll);

  // Retrieve a single Lesson with id
  router.get("/:id", lessons.findOne);

  // Custom query methods
  router.get("/:id/coursename", lessonQuery.getCourseName);
  router.get("/:id/course", lessonQuery.getCourse);
  router.get("/:id/studentname", lessonQuery.getStudentName);
  router.get("/:id/student", lessonQuery.getStudent);
  router.get("/:id/grades", lessonQuery.getGrades);
  router.get("/:id/average-grade", lessonQuery.getAverageGrade);

  // Update a Lesson with id
  router.put("/:id", lessons.update);

  // Delete a Lesson with id
  router.delete("/:id", lessons.delete);

  // Delete all Lessons
  router.delete("/", lessons.deleteAll);

  app.use('/api/lessons', router);
};