const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-app application." });
});

// Database connection and sync
const db = require("./app/models");

// Проверка подключения и синхронизация БД
async function initializeDatabase() {
  try {
    // Проверка подключения к БД
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Синхронизация моделей с БД (создание таблиц)
    await db.sequelize.sync({ force: false, alter: true });
    console.log("Database synchronized successfully. Tables should be created.");
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Инициализация базы данных
initializeDatabase();

// require("dotenv").config();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});