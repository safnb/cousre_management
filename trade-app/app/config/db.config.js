module.exports = {
  HOST: "postgresdb",  // Должно быть имя сервиса, а не IP
  USER: "trade-app",
  PASSWORD: "123456", 
  DB: "docker_db",
  dialect: "postgres",
  port: 5432,          // Внутренний порт контейнера
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};