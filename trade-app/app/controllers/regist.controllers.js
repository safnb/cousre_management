const db = require("../models");
const Regist = db.regist;
const Op = db.Sequelize.Op;

// Create and Save a new Regist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Дата_записи || !req.body.Статус) {
    res.status(400).send({
      message: "Дата записи and Статус cannot be empty!"
    });
    return;
  }

  // Create a Regist
  const regist = {
    Дата_записи: req.body.Дата_записи,
    Статус: req.body.Статус,
    ID_курса: req.body.ID_курса,
    Курсы_ID_курса: req.body.Курсы_ID_курса,
    ID_студента: req.body.ID_студента
  };

  // Save Regist in the database
  Regist.create(regist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Regist."
      });
    });
};

// Retrieve all Regists from the database.
exports.findAll = (req, res) => {
  const статус = req.query.статус;
  var condition = статус ? { Статус: { [Op.like]: `%${статус}%` } } : null;

  Regist.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving registrations."
      });
    });
};

// Find a single Regist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Regist.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Regist with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Regist with id=" + id
      });
    });
};

// Update a Regist by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Regist.update(req.body, {
    where: { ID_заявка: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Regist was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Regist with id=${id}. Maybe Regist was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Regist with id=" + id
      });
    });
};

// Delete a Regist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Regist.destroy({
    where: { ID_заявка: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Regist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Regist with id=${id}. Maybe Regist was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Regist with id=" + id
      });
    });
};

// Delete all Regists from the database.
exports.deleteAll = (req, res) => {
  Regist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Regists were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all registrations."
      });
    });
};