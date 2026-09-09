-- =========================================================================
-- COURSEHUB ACADEMY - RELATIONAL DATABASE SCHEMA
-- Compatible with: SQLite 3, PostgreSQL, MySQL (ANSI SQL standard)
-- =========================================================================

PRAGMA foreign_keys = ON;

-- 1. SYSTEM SETTINGS & CONFIGURATION
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    org_name VARCHAR(150) NOT NULL DEFAULT 'CourseHub Academy',
    tagline VARCHAR(255) DEFAULT 'Learn. Build. Grow.',
    admin_username VARCHAR(100) NOT NULL DEFAULT 'admin',
    admin_password VARCHAR(255) NOT NULL DEFAULT 'admin123',
    student_seq INTEGER NOT NULL DEFAULT 2,
    cert_seq INTEGER NOT NULL DEFAULT 1,
    course_seq INTEGER NOT NULL DEFAULT 3,
    welcome_email_template TEXT,
    cert_email_template TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    category VARCHAR(100) NOT NULL,
    instructor VARCHAR(150) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    coupon_code VARCHAR(50) DEFAULT '',
    image TEXT DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
    start_date DATE,
    end_date DATE,
    max_students INTEGER DEFAULT 0,
    upi_id VARCHAR(100) DEFAULT 'coursehub@upi',
    payment_instructions TEXT,
    cert_eligible BOOLEAN NOT NULL DEFAULT 1,
    registration_open BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. COURSE SYLLABUS TABLE
CREATE TABLE IF NOT EXISTS course_syllabus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id VARCHAR(32) NOT NULL,
    order_num INTEGER NOT NULL DEFAULT 1,
    topic TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(32) PRIMARY KEY,
    course_id VARCHAR(32) NOT NULL,
    module VARCHAR(150) NOT NULL,
    order_num INTEGER NOT NULL DEFAULT 1,
    lesson_title VARCHAR(255) NOT NULL,
    youtube_url VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 5. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(32) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    dob DATE,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other', 'Rather not say')),
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    qualification VARCHAR(100),
    institution VARCHAR(200),
    occupation VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    reg_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. REGISTRATIONS TABLE (Course Enrollments)
CREATE TABLE IF NOT EXISTS registrations (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL,
    course_id VARCHAR(32) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    progress_percent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);

-- 7. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL,
    course_id VARCHAR(32) NOT NULL,
    reg_id VARCHAR(32),
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Submitted', 'Verified', 'Rejected')),
    ref_id VARCHAR(100) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (reg_id) REFERENCES registrations(id) ON DELETE SET NULL
);

-- 8. STUDENT LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS student_lesson_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(32) NOT NULL,
    course_id VARCHAR(32) NOT NULL,
    lesson_id VARCHAR(32) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE(student_id, lesson_id)
);

-- 9. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL,
    course_id VARCHAR(32) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    completion_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);

-- 10. SCHEDULES TABLE (Live Sessions / Events)
CREATE TABLE IF NOT EXISTS schedules (
    id VARCHAR(32) PRIMARY KEY,
    course_id VARCHAR(32) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(150) NOT NULL,
    link VARCHAR(500) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Completed', 'Cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_lessons_course_order ON lessons(course_id, order_num);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_registrations_student ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_registrations_course ON registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_reg ON payments(reg_id);
CREATE INDEX IF NOT EXISTS idx_progress_student_course ON student_lesson_progress(student_id, course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_schedules_course_date ON schedules(course_id, date);

-- =========================================================================
-- CONVENIENCE VIEWS FOR ANALYTICS AND REPORTING
-- =========================================================================

-- View: Course Overview with registration counts, verified earnings, lesson count
CREATE VIEW IF NOT EXISTS v_course_stats AS
SELECT 
    c.id AS course_id,
    c.name AS course_name,
    c.category,
    c.price,
    c.discount_price,
    c.status,
    (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS total_lessons,
    (SELECT COUNT(*) FROM registrations r WHERE r.course_id = c.id) AS total_enrolled,
    (SELECT COALESCE(SUM(p.amount), 0) FROM payments p WHERE p.course_id = c.id AND p.status = 'Verified') AS total_revenue
FROM courses c;

-- View: Pending Payment Verifications
CREATE VIEW IF NOT EXISTS v_pending_payments AS
SELECT 
    p.id AS payment_id,
    p.date AS payment_date,
    p.amount,
    p.ref_id,
    p.status,
    s.id AS student_id,
    s.full_name AS student_name,
    s.email AS student_email,
    s.mobile AS student_mobile,
    c.id AS course_id,
    c.name AS course_name
FROM payments p
JOIN students s ON p.student_id = s.id
JOIN courses c ON p.course_id = c.id
WHERE p.status = 'Submitted' OR p.status = 'Pending';
