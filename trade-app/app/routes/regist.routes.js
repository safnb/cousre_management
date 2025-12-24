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
