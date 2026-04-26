const BASE_URL = "http://localhost:8080";

async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

async function register(userData) {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return res.json();
}

// Записаться на курс
async function enrollCourse(userId, courseId, token) {
  const res = await fetch(`${BASE_URL}/api/registrations`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      Дата_записи: new Date().toISOString(),
      Статус: "Одобрено",
      ID_курса: courseId,
      ID_студента: parseInt(userId)
    })
  });
  return res.json();
}

// Получить курсы студента (по его записям)
async function getStudentCourses(userId, token) {
  const regRes = await fetch(`${BASE_URL}/api/registrations`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const registrations = await regRes.json();
  
  const studentRegs = registrations.filter(r => 
    r.ID_студента == userId || r.i_d_студента == userId
  );
  
  const coursesRes = await fetch(`${BASE_URL}/api/courses`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const allCourses = await coursesRes.json();
  
  const courseIds = studentRegs.map(r => r.ID_курса || r.i_d_курса);
  return allCourses.filter(c => courseIds.includes(c.ID_курса || c.i_d_курса));
}

// Получить занятия студента
async function getStudentLessons(userId, token) {
  const res = await fetch(`${BASE_URL}/api/lessons`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const allLessons = await res.json();
  
  return allLessons.filter(l => 
    l.i_d_студента == userId || l.ID_студента == userId
  );
}

async function getStudentGrades(userId, token) {
  const res = await fetch(`${BASE_URL}/api/grades`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const allGrades = await res.json();
  
  return allGrades.filter(g => 
    (g.ID_студента == userId || g.i_d_студента == userId)
  );
}

async function getStudentLessons(userId, token) {
  // Получаем записи студента
  const regRes = await fetch(`${BASE_URL}/api/registrations`);
  const allRegs = await regRes.json();
  const studentRegs = allRegs.filter(r => r.ID_студента == userId);
  const studentCourseIds = studentRegs.map(r => r.ID_курса);
  
  // Получаем все занятия
  const res = await fetch(`${BASE_URL}/api/lessons`);
  const allLessons = await res.json();
  
  // Возвращаем занятия только для курсов студента
  return allLessons.filter(l => studentCourseIds.includes(l.ID_курса));
}