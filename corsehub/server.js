/**
 * CourseHub Academy - Backend Server & SQLite Bridge
 * Built using native Node.js (http, node:sqlite) - No external npm dependencies required!
 *
 * Provides:
 *  - Static file serving for CourseHub LMS (coursehub.html, database.js, etc.)
 *  - REST API & full database synchronization with coursehub.db SQLite database
 *  - Real-time persistence across multiple browsers and devices
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'coursehub.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');

// Initialize database if missing
function getDbConnection() {
  const needsInit = !fs.existsSync(DB_PATH);
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA foreign_keys = ON;');
  
  if (needsInit) {
    console.log('[Database] Database file not found. Auto-initializing with schema & seed...');
    if (fs.existsSync(SCHEMA_PATH)) db.exec(fs.readFileSync(SCHEMA_PATH, 'utf8'));
    if (fs.existsSync(SEED_PATH)) db.exec(fs.readFileSync(SEED_PATH, 'utf8'));
    console.log('[Database] Initialization complete.');
  }
  return db;
}

const db = getDbConnection();

// Helper to query the whole database in the CourseHub frontend format
function getFullDatabaseFromSqlite() {
  // 1. Settings
  const settingsRow = db.prepare('SELECT * FROM settings WHERE id = 1').get() || {};
  const settings = {
    orgName: settingsRow.org_name || 'CourseHub Academy',
    tagline: settingsRow.tagline || 'Learn. Build. Grow.',
    adminUsername: settingsRow.admin_username || 'admin',
    adminPassword: settingsRow.admin_password || 'admin123',
    studentSeq: settingsRow.student_seq || 2,
    certSeq: settingsRow.cert_seq || 1,
    courseSeq: settingsRow.course_seq || 3,
    welcomeEmailTemplate: settingsRow.welcome_email_template || '',
    certEmailTemplate: settingsRow.cert_email_template || ''
  };

  // 2. Courses with Syllabus
  const courseRows = db.prepare('SELECT * FROM courses ORDER BY id ASC').all();
  const syllabusRows = db.prepare('SELECT * FROM course_syllabus ORDER BY course_id, order_num ASC').all();
  
  const syllabusMap = {};
  for (const s of syllabusRows) {
    if (!syllabusMap[s.course_id]) syllabusMap[s.course_id] = [];
    syllabusMap[s.course_id].push(s.topic);
  }

  const courses = courseRows.map(c => ({
    id: c.id,
    name: c.name,
    shortDesc: c.short_desc,
    fullDesc: c.full_desc,
    category: c.category,
    instructor: c.instructor,
    duration: c.duration,
    level: c.level,
    price: Number(c.price),
    discountPrice: Number(c.discount_price),
    couponCode: c.coupon_code || '',
    image: c.image || '',
    status: c.status,
    startDate: c.start_date,
    endDate: c.end_date,
    maxStudents: Number(c.max_students),
    upiId: c.upi_id,
    paymentInstructions: c.payment_instructions,
    certEligible: Boolean(c.cert_eligible),
    registrationOpen: Boolean(c.registration_open),
    syllabus: syllabusMap[c.id] || []
  }));

  // 3. Lessons
  const lessonRows = db.prepare('SELECT * FROM lessons ORDER BY course_id, order_num ASC').all();
  const lessons = lessonRows.map(l => ({
    id: l.id,
    courseId: l.course_id,
    module: l.module,
    order: Number(l.order_num),
    lessonTitle: l.lesson_title,
    youtubeUrl: l.youtube_url,
    duration: l.duration,
    enabled: Boolean(l.enabled)
  }));

  // 4. Students
  const studentRows = db.prepare('SELECT * FROM students ORDER BY id ASC').all();
  const students = studentRows.map(s => ({
    id: s.id,
    fullName: s.full_name,
    dob: s.dob,
    gender: s.gender,
    email: s.email,
    mobile: s.mobile,
    whatsapp: s.whatsapp,
    address: s.address,
    city: s.city,
    state: s.state,
    pincode: s.pincode,
    qualification: s.qualification,
    institution: s.institution,
    occupation: s.occupation,
    password: s.password,
    regDate: s.reg_date
  }));

  // 5. Registrations
  const regRows = db.prepare('SELECT * FROM registrations ORDER BY id ASC').all();
  const registrations = regRows.map(r => ({
    id: r.id,
    studentId: r.student_id,
    courseId: r.course_id,
    date: r.date,
    status: r.status,
    progressPercent: Number(r.progress_percent)
  }));

  // 6. Payments
  const paymentRows = db.prepare('SELECT * FROM payments ORDER BY id ASC').all();
  const payments = paymentRows.map(p => ({
    id: p.id,
    studentId: p.student_id,
    courseId: p.course_id,
    regId: p.reg_id,
    amount: Number(p.amount),
    date: p.date,
    status: p.status,
    refId: p.ref_id || ''
  }));

  // 7. Progress
  const progressRows = db.prepare('SELECT * FROM student_lesson_progress').all();
  const progressGroup = {};
  for (const row of progressRows) {
    const key = `${row.student_id}___${row.course_id}`;
    if (!progressGroup[key]) {
      progressGroup[key] = { studentId: row.student_id, courseId: row.course_id, completed: [] };
    }
    progressGroup[key].completed.push(row.lesson_id);
  }
  const progress = Object.values(progressGroup);

  // 8. Certificates
  const certRows = db.prepare('SELECT * FROM certificates ORDER BY id ASC').all();
  const certificates = certRows.map(c => ({
    id: c.id,
    studentId: c.student_id,
    courseId: c.course_id,
    studentName: c.student_name,
    courseName: c.course_name,
    completionDate: c.completion_date
  }));

  // 9. Schedules
  const scheduleRows = db.prepare('SELECT * FROM schedules ORDER BY date ASC, time ASC').all();
  const schedules = scheduleRows.map(s => ({
    id: s.id,
    courseId: s.course_id,
    date: s.date,
    time: s.time,
    title: s.title,
    description: s.description,
    instructor: s.instructor,
    link: s.link,
    status: s.status
  }));

  return { courses, lessons, students, registrations, payments, progress, certificates, schedules, settings };
}

// Sync in-memory frontend DB back to SQLite tables
function syncDatabaseToSqlite(data) {
  if (!data) return false;

  db.exec('BEGIN TRANSACTION;');
  try {
    // 1. Settings
    if (data.settings) {
      const s = data.settings;
      const stmt = db.prepare(`
        INSERT INTO settings (id, org_name, tagline, admin_username, admin_password, student_seq, cert_seq, course_seq, welcome_email_template, cert_email_template)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          org_name = excluded.org_name,
          tagline = excluded.tagline,
          admin_username = excluded.admin_username,
          admin_password = excluded.admin_password,
          student_seq = excluded.student_seq,
          cert_seq = excluded.cert_seq,
          course_seq = excluded.course_seq,
          welcome_email_template = excluded.welcome_email_template,
          cert_email_template = excluded.cert_email_template,
          updated_at = CURRENT_TIMESTAMP
      `);
      stmt.run(
        s.orgName || 'CourseHub Academy',
        s.tagline || '',
        s.adminUsername || 'admin',
        s.adminPassword || 'admin123',
        s.studentSeq || 2,
        s.certSeq || 1,
        s.courseSeq || 3,
        s.welcomeEmailTemplate || '',
        s.certEmailTemplate || ''
      );
    }

    // 2. Courses & Syllabus
    if (Array.isArray(data.courses)) {
      const insertCourse = db.prepare(`
        INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          short_desc = excluded.short_desc,
          full_desc = excluded.full_desc,
          category = excluded.category,
          instructor = excluded.instructor,
          duration = excluded.duration,
          level = excluded.level,
          price = excluded.price,
          discount_price = excluded.discount_price,
          coupon_code = excluded.coupon_code,
          image = excluded.image,
          status = excluded.status,
          start_date = excluded.start_date,
          end_date = excluded.end_date,
          max_students = excluded.max_students,
          upi_id = excluded.upi_id,
          payment_instructions = excluded.payment_instructions,
          cert_eligible = excluded.cert_eligible,
          registration_open = excluded.registration_open,
          updated_at = CURRENT_TIMESTAMP
      `);

      const deleteSyllabus = db.prepare('DELETE FROM course_syllabus WHERE course_id = ?');
      const insertSyllabus = db.prepare('INSERT INTO course_syllabus (course_id, order_num, topic) VALUES (?, ?, ?)');

      for (const c of data.courses) {
        insertCourse.run(
          c.id, c.name, c.shortDesc || '', c.fullDesc || '', c.category || 'General',
          c.instructor || '', c.duration || '', c.level || 'Beginner', c.price || 0,
          c.discountPrice || 0, c.couponCode || '', c.image || '', c.status || 'draft', c.startDate || null,
          c.endDate || null, c.maxStudents || 0, c.upiId || '', c.paymentInstructions || '',
          c.certEligible ? 1 : 0, c.registrationOpen ? 1 : 0
        );

        if (Array.isArray(c.syllabus)) {
          deleteSyllabus.run(c.id);
          c.syllabus.forEach((topic, idx) => {
            insertSyllabus.run(c.id, idx + 1, topic);
          });
        }
      }
    }

    // 3. Lessons
    if (Array.isArray(data.lessons)) {
      const insertLesson = db.prepare(`
        INSERT INTO lessons (id, course_id, module, order_num, lesson_title, youtube_url, duration, enabled)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          course_id = excluded.course_id,
          module = excluded.module,
          order_num = excluded.order_num,
          lesson_title = excluded.lesson_title,
          youtube_url = excluded.youtube_url,
          duration = excluded.duration,
          enabled = excluded.enabled
      `);
      for (const l of data.lessons) {
        insertLesson.run(l.id, l.courseId, l.module || '', l.order || 1, l.lessonTitle || '', l.youtubeUrl || '', l.duration || '', l.enabled ? 1 : 0);
      }
    }

    // 4. Students
    if (Array.isArray(data.students)) {
      const insertStudent = db.prepare(`
        INSERT INTO students (id, full_name, dob, gender, email, mobile, whatsapp, address, city, state, pincode, qualification, institution, occupation, password, reg_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          full_name = excluded.full_name,
          dob = excluded.dob,
          gender = excluded.gender,
          email = excluded.email,
          mobile = excluded.mobile,
          whatsapp = excluded.whatsapp,
          address = excluded.address,
          city = excluded.city,
          state = excluded.state,
          pincode = excluded.pincode,
          qualification = excluded.qualification,
          institution = excluded.institution,
          occupation = excluded.occupation,
          password = excluded.password,
          reg_date = excluded.reg_date
      `);
      for (const s of data.students) {
        insertStudent.run(
          s.id, s.fullName, s.dob || null, s.gender || 'Other', s.email, s.mobile,
          s.whatsapp || '', s.address || '', s.city || '', s.state || '',
          s.pincode || '', s.qualification || '', s.institution || '', s.occupation || '',
          s.password, s.regDate
        );
      }
    }

    // 5. Registrations
    if (Array.isArray(data.registrations)) {
      const insertReg = db.prepare(`
        INSERT INTO registrations (id, student_id, course_id, date, status, progress_percent)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          status = excluded.status,
          progress_percent = excluded.progress_percent
      `);
      for (const r of data.registrations) {
        insertReg.run(r.id, r.studentId, r.courseId, r.date, r.status || 'pending', r.progressPercent || 0);
      }
    }

    // 6. Payments
    if (Array.isArray(data.payments)) {
      const insertPay = db.prepare(`
        INSERT INTO payments (id, student_id, course_id, reg_id, amount, date, status, ref_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          status = excluded.status,
          ref_id = excluded.ref_id,
          date = excluded.date
      `);
      for (const p of data.payments) {
        insertPay.run(p.id, p.studentId, p.courseId, p.regId || null, p.amount, p.date, p.status, p.refId || '');
      }
    }

    // 7. Student Lesson Progress
    if (Array.isArray(data.progress)) {
      const insertProg = db.prepare(`
        INSERT INTO student_lesson_progress (student_id, course_id, lesson_id)
        VALUES (?, ?, ?)
        ON CONFLICT(student_id, lesson_id) DO NOTHING
      `);
      for (const prog of data.progress) {
        if (Array.isArray(prog.completed)) {
          for (const lId of prog.completed) {
            insertProg.run(prog.studentId, prog.courseId, lId);
          }
        }
      }
    }

    // 8. Certificates
    if (Array.isArray(data.certificates)) {
      const insertCert = db.prepare(`
        INSERT INTO certificates (id, student_id, course_id, student_name, course_name, completion_date)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING
      `);
      for (const c of data.certificates) {
        insertCert.run(c.id, c.studentId, c.courseId, c.studentName, c.courseName, c.completionDate);
      }
    }

    // 9. Schedules
    if (Array.isArray(data.schedules)) {
      const insertSched = db.prepare(`
        INSERT INTO schedules (id, course_id, date, time, title, description, instructor, link, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          date = excluded.date,
          time = excluded.time,
          title = excluded.title,
          description = excluded.description,
          instructor = excluded.instructor,
          link = excluded.link,
          status = excluded.status
      `);
      for (const sc of data.schedules) {
        insertSched.run(sc.id, sc.courseId, sc.date, sc.time, sc.title, sc.description || '', sc.instructor, sc.link, sc.status || 'Upcoming');
      }
    }

    db.exec('COMMIT;');
    return true;
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('Error syncing database:', err);
    throw err;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.sql': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

// Create HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/db' && req.method === 'GET') {
    try {
      const fullDb = getFullDatabaseFromSqlite();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(fullDb));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (pathname === '/api/sync' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        syncDatabaseToSqlite(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Database synced with SQLite successfully' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/stats' && req.method === 'GET') {
    try {
      const courseStats = db.prepare('SELECT * FROM v_course_stats').all();
      const pendingPayments = db.prepare('SELECT * FROM v_pending_payments').all();
      const totals = db.prepare(`
        SELECT 
          (SELECT COUNT(*) FROM students) AS totalStudents,
          (SELECT COUNT(*) FROM courses WHERE status = 'active') AS activeCourses,
          (SELECT COUNT(*) FROM registrations) AS totalEnrollments,
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'Verified') AS totalVerifiedRevenue
      `).get();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ totals, courseStats, pendingPayments }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (pathname === '/api/reset' && req.method === 'POST') {
    try {
      if (fs.existsSync(SCHEMA_PATH)) db.exec(fs.readFileSync(SCHEMA_PATH, 'utf8'));
      if (fs.existsSync(SEED_PATH)) db.exec(fs.readFileSync(SEED_PATH, 'utf8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Database reset to sample seed' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'coursehub.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'coursehub.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 CourseHub Academy Server & Database Running!`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   SQLite Database: ${DB_PATH}`);
  console.log('====================================================');
});
