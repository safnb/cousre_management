module.exports = (sequelize, Sequelize) => {
    const regist = sequelize.define("regist", {
        ID_заявка: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Дата_записи: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Статус: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        ID_курса: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Курсы_ID_курса: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        ID_студента: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Записи_на_курсы',
        timestamps: false
    });
    
    return regist;
};