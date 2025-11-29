module.exports = (db) => {
    const { User, Course, CourseRegistration, Lesson, Grade } = db;
    
    // Связи для пользователей (User)
    User.hasMany(CourseRegistration, {
        foreignKey: 'ID_студента',
        as: 'courseRegistrations'
    });
    
    User.hasMany(Lesson, {
        foreignKey: 'ID_студента',
        as: 'lessons'
    });
    
    User.hasMany(Grade, {
        foreignKey: 'ID_студента',
        as: 'grades'
    });
    
    // Связи для курсов (Course)
    Course.hasMany(CourseRegistration, {
        foreignKey: 'ID_курса',
        as: 'registrations'
    });
    
    Course.hasMany(Lesson, {
        foreignKey: 'ID_курса',
        as: 'lessons'
    });
    
    Course.belongsTo(User, {
        foreignKey: 'ID_студента',
        as: 'student'
    });
    
    // Связи для записей на курсы (CourseRegistration)
    CourseRegistration.belongsTo(User, {
        foreignKey: 'ID_студента',
        as: 'student'
    });
    
    CourseRegistration.belongsTo(Course, {
        foreignKey: 'ID_курса',
        as: 'course'
    });
    
    // Связи для занятий (Lesson)
    Lesson.belongsTo(User, {
        foreignKey: 'ID_студента',
        as: 'student'
    });
    
    Lesson.belongsTo(Course, {
        foreignKey: 'ID_курса',
        as: 'course'
    });
    
    Lesson.hasMany(Grade, {
        foreignKey: 'ID_занятия',
        as: 'grades'
    });
    
    // Связи для оценок (Grade)
    Grade.belongsTo(User, {
        foreignKey: 'ID_студента',
        as: 'student'
    });
    
    Grade.belongsTo(Lesson, {
        foreignKey: 'ID_занятия',
        as: 'lesson'
    });
    
    console.log('All model associations have been set up successfully');
};