module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    ID_студента: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_студента'           
    },
    ФИО: {
      type: Sequelize.STRING(45),
      allowNull: false,
      field: 'ФИО'                  
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Дата_Рождения: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'Дата_Рождения'       
    },
    Класс: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'Класс'               
    },
    Телефон: {
      type: Sequelize.STRING(10),
      allowNull: false,
      field: 'Телефон'               
    },
    Роль: {
      type: Sequelize.ENUM('student', 'teacher', 'admin'),
      defaultValue: 'student',
      field: 'Роль'                  
    }
  }, {
    tableName: 'пользователи',
    timestamps: false
  });

  return User;
};