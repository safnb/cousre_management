exports.create = (req, res) => {
  console.log("Registration create called");
  res.json({ message: "Registration created successfully", data: req.body });
};

exports.findAll = (req, res) => {
  console.log("Registration findAll called");
  res.json([{ id: 1, student_id: 1, course_id: 1, registration_date: "2024-01-01" }]);
};

exports.findOne = (req, res) => {
  console.log("Registration findOne called with id:", req.params.id);
  res.json({ id: req.params.id, student_id: 1, course_id: 1, registration_date: "2024-01-01" });
};

exports.update = (req, res) => {
  console.log("Registration update called with id:", req.params.id);
  res.json({ message: "Registration updated successfully", id: req.params.id });
};

exports.delete = (req, res) => {
  console.log("Registration delete called with id:", req.params.id);
  res.json({ message: "Registration deleted successfully", id: req.params.id });
};

exports.deleteAll = (req, res) => {
  console.log("Registration deleteAll called");
  res.json({ message: "All registrations deleted successfully" });
};
