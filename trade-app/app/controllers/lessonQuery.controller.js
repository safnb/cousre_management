const db = require("../models");
const Course = db.Course;
const User = db.User;
const Grade = db.Grade;

// Get course name by lesson id (raw query)
exports.getCourseName = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.sequelize.query(
      `SELECT c."Название"
       FROM "Курсы" c
       LEFT JOIN "Занятия" l ON c."ID_курса" = l."ID_курса"
       WHERE l."ID_занятия" = ${id}`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    if (!result) {
      return res.status(404).send({
        message: `Course for Lesson with id=${id} was not found.`
      });
    }

    return res.send({ Название: result.Название });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving course name."
    });
  }
};

// Get full course object by lesson id (raw query with replacements + model mapping)
exports.getCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const [course] = await db.sequelize.query(
      'SELECT c.* FROM "Курсы" c LEFT JOIN "Занятия" l ON c."ID_курса" = l."ID_курса" WHERE l."ID_занятия" = :lessonId',
      {
        replacements: { lessonId: id },
        type: db.Sequelize.QueryTypes.SELECT,
        model: Course,
        mapToModel: true
      }
    );

    if (!course) {
      return res.status(404).send({
        message: `Course for Lesson with id=${id} was not found.`
      });
    }

    return res.send(course);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving course."
    });
  }
};

// Get student name by lesson id (raw query)
exports.getStudentName = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.sequelize.query(
      `SELECT u."ФИО"
       FROM "пользователи" u
       LEFT JOIN "Занятия" l ON u."ID_студента" = l."ID_студента"
       WHERE l."ID_занятия" = ${id}`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );

    if (!result) {
      return res.status(404).send({
        message: `Student for Lesson with id=${id} was not found.`
      });
    }

    return res.send({ ФИО: result.ФИО });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving student name."
    });
  }
};

// Get full student object by lesson id (raw query with replacements + model mapping)
exports.getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const [student] = await db.sequelize.query(
      'SELECT u.* FROM "пользователи" u LEFT JOIN "Занятия" l ON u."ID_студента" = l."ID_студента" WHERE l."ID_занятия" = :lessonId',
      {
        replacements: { lessonId: id },
        type: db.Sequelize.QueryTypes.SELECT,
        model: User,
        mapToModel: true
      }
    );

    if (!student) {
      return res.status(404).send({
        message: `Student for Lesson with id=${id} was not found.`
      });
    }

    return res.send(student);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving student."
    });
  }
};

// Get grades list by lesson id (raw query with replacements + model mapping)
exports.getGrades = async (req, res) => {
  try {
    const id = req.params.id;
    const grades = await db.sequelize.query(
      'SELECT g.* FROM "Оценки" g WHERE g."ID_занятия" = :lessonId ORDER BY g."ID_оценки"',
      {
        replacements: { lessonId: id },
        type: db.Sequelize.QueryTypes.SELECT,
        model: Grade,
        mapToModel: true
      }
    );

    return res.send(grades);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving grades."
    });
  }
};

// Get average grade by lesson id (raw query)
exports.getAverageGrade = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.sequelize.query(
      'SELECT ROUND(AVG(g."Оценка")::numeric, 2) AS "Средняя_оценка" FROM "Оценки" g WHERE g."ID_занятия" = :lessonId',
      {
        replacements: { lessonId: id },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );

    return res.send({
      ID_занятия: Number(id),
      Средняя_оценка: result ? result.Средняя_оценка : null
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving average grade."
    });
  }
};
