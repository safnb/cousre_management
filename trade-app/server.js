const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course Management API",
      version: "1.0.0",
      description: "Документация API для проекта управления курсами"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ["./app/routes/*.js"]
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-app application." });
});

// Database connection and sync
const db = require("./app/models");

// Проверка подключения и синхронизация БД
async function initializeDatabase() {
  try {
    console.log("Waiting 5 seconds for database to be ready...");
    // Ждем 5 секунд чтобы БД успела запуститься
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Проверка подключения к БД
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Синхронизация моделей с БД (создание таблиц)
    await db.sequelize.sync({ force: false, alter: true });
    console.log("Database synchronized successfully. Tables should be created.");
    
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
}// Инициализация базы данных
initializeDatabase();

// Добавляем маршруты
require("./app/routes/user.routes.js")(app);
require("./app/routes/course.routes.js")(app);
require("./app/routes/regist.routes.js")(app);
require("./app/routes/lesson.routes.js")(app);
require("./app/routes/grade.routes.js")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
