const db = require("../models");
const Registration = db.CourseRegistration;
const Op = db.Sequelize.Op;

// Create and Save a new Registration
exports.create = (req, res) => {
  if (!req.body.Дата_записи || !req.body.Статус || !req.body.ID_курса || !req.body.ID_студента) {
    res.status(400).send({
      message: "Дата_записи, Статус, ID_курса and ID_студента cannot be empty!"
    });
    return;
  }

  const registration = {
    Дата_записи: req.body.Дата_записи,
    Статус: req.body.Статус,
    ID_курса: req.body.ID_курса,
    Курсы_ID_курса: req.body.Курсы_ID_курса,
    ID_студента: req.body.ID_студента
  };

  Registration.create(registration)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Registration."
      });
    });
};

// Retrieve all Registrations from the database.
exports.findAll = (req, res) => {
  const статус = req.query.статус;
  const condition = статус ? { Статус: { [Op.like]: `%${статус}%` } } : null;

  Registration.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving registrations."
      });
    });
};

// Find a single Registration with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Registration.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Registration with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Registration with id=" + id
      });
    });
};

// Update a Registration by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Registration.update(req.body, {
    where: { ID_заявка: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Registration was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Registration with id=${id}. Maybe Registration was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Registration with id=" + id
      });
    });
};

// Delete a Registration with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Registration.destroy({
    where: { ID_заявка: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Registration was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Registration with id=${id}. Maybe Registration was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Registration with id=" + id
      });
    });
};

// Delete all Registrations from the database.
exports.deleteAll = (req, res) => {
  Registration.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Registrations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all registrations."
      });
    });
};
