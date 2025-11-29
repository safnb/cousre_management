module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        ID_студента: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ФИО: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        Дата_Рождения: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Класс: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Телефон: {
            type: Sequelize.STRING(10),
            allowNull: false
        }
    }, {
        tableName: 'пользователи',
        timestamps: false
    });
    
    return User;
};