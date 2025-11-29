const db = require("../models");
const Grade = db.Grade;
const Op = db.Sequelize.Op;

// Create and Save a new Grade
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Оценка || !req.body.Тип_оценки) {
    res.status(400).send({
      message: "Оценка and Тип оценки cannot be empty!"
    });
    return;
  }

  // Create a Grade
  const grade = {
    Оценка: req.body.Оценка,
    Тип_оценки: req.body.Тип_оценки,
    ID_студента: req.body.ID_студента,
    ID_занятия: req.body.ID_занятия
  };

  // Save Grade in the database
  Grade.create(grade)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Grade."
      });
    });
};

// Retrieve all Grades from the database.
exports.findAll = (req, res) => {
  const тип_оценки = req.query.тип_оценки;
  var condition = тип_оценки ? { Тип_оценки: { [Op.like]: `%${тип_оценки}%` } } : null;

  Grade.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving grades."
      });
    });
};

// Find a single Grade with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Grade.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Grade with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Grade with id=" + id
      });
    });
};

// Update a Grade by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Grade.update(req.body, {
    where: { ID_оценки: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Grade was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Grade with id=${id}. Maybe Grade was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Grade with id=" + id
      });
    });
};

// Delete a Grade with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Grade.destroy({
    where: { ID_оценки: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Grade was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Grade with id=${id}. Maybe Grade was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Grade with id=" + id
      });
    });
};

// Delete all Grades from the database.
exports.deleteAll = (req, res) => {
  Grade.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Grades were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all grades."
      });
    });
};