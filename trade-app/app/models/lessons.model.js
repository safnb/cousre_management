module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lesson", {
        ID_занятия: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Тема: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        Дата_и_время: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ID_студента: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ID_курса: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Занятия',
        timestamps: false
    });
    
    return Lesson;
};