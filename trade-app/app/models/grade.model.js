module.exports = (sequelize, Sequelize) => {
    const Grade = sequelize.define("grade", {
        ID_оценки: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Оценка: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Тип_оценки: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        ID_студента: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ID_занятия: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Оценки',
        timestamps: false
    });
    
    return Grade;
};