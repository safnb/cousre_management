const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD
, {
host: dbConfig.HOST,
dialect: dbConfig.dialect,
port: dbConfig.port,
operatorsAliases: false,
pool: {
max: dbConfig.pool.max,
min: dbConfig.pool.min,
acquire: dbConfig.pool.acquire,
idle: dbConfig.pool.idle
}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.goodGroup = require("./user.model.js")(sequelize, Sequelize)
db.goodGroup = require("./courses.model.js")(sequelize, Sequelize)
db.CourseRegistration = require("./regist.model.js")(sequelize, Sequelize);
db.Lesson = require("./lesson.model.js")(sequelize, Sequelize);
db.Grade = require("./grade.model.js")(sequelize, Sequelize);


require('./references.model.js')(db);


module.exports = db;