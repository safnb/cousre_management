module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        ID_курса: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Описание: {
            type: Sequelize.TEXT(120),
            allowNull: true
        },
        Название: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        ID_заявка: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        ID_студента: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'Курсы',
        timestamps: false
    });
    
    return Course;
};