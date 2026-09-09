-- =========================================================================
-- COURSEHUB ACADEMY - SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- Run this entire script in Supabase: Dashboard -> SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. DROP EXISTING TABLES IF RE-RUNNING (Safe clean slate)
DROP VIEW IF EXISTS v_pending_payments CASCADE;
DROP VIEW IF EXISTS v_course_stats CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS student_lesson_progress CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS course_syllabus CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- 2. CREATE TABLES

-- Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    org_name VARCHAR(150) NOT NULL DEFAULT 'CourseHub Academy',
    tagline VARCHAR(255) DEFAULT 'Learn. Build. Grow.',
    admin_username VARCHAR(100) NOT NULL DEFAULT 'admin',
    admin_password VARCHAR(255) NOT NULL DEFAULT 'admin123',
    student_seq INT NOT NULL DEFAULT 2,
    cert_seq INT NOT NULL DEFAULT 1,
    course_seq INT NOT NULL DEFAULT 3,
    welcome_email_template TEXT,
    cert_email_template TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses Table
CREATE TABLE courses (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    category VARCHAR(100) NOT NULL,
    instructor VARCHAR(150) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    price NUMERIC(10,2) NOT NULL DEFAULT 0,
    discount_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    coupon_code VARCHAR(50) DEFAULT '',
    image TEXT DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
    start_date DATE,
    end_date DATE,
    max_students INT DEFAULT 0,
    upi_id VARCHAR(100) DEFAULT 'coursehub@upi',
    payment_instructions TEXT,
    cert_eligible BOOLEAN NOT NULL DEFAULT TRUE,
    registration_open BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Syllabus Table
CREATE TABLE course_syllabus (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    order_num INT NOT NULL DEFAULT 1,
    topic TEXT NOT NULL
);

-- Lessons Table
CREATE TABLE lessons (
    id VARCHAR(32) PRIMARY KEY,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module VARCHAR(150) NOT NULL,
    order_num INT NOT NULL DEFAULT 1,
    lesson_title VARCHAR(255) NOT NULL,
    youtube_url VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students Table
CREATE TABLE students (
    id VARCHAR(32) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    dob DATE,
    gender VARCHAR(20),
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
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registrations Table
CREATE TABLE registrations (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    progress_percent INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- Payments Table
CREATE TABLE payments (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    reg_id VARCHAR(32) REFERENCES registrations(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Submitted', 'Verified', 'Rejected')),
    ref_id VARCHAR(100) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Lesson Progress Table
CREATE TABLE student_lesson_progress (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id VARCHAR(32) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, lesson_id)
);

-- Certificates Table
CREATE TABLE certificates (
    id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    student_name VARCHAR(150) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    completion_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- Schedules Table
CREATE TABLE schedules (
    id VARCHAR(32) PRIMARY KEY,
    course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(150) NOT NULL,
    link VARCHAR(500) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE PUBLIC READ/WRITE FOR SUPABASE (Disable RLS or allow anon access)
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_syllabus DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_lesson_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedules DISABLE ROW LEVEL SECURITY;

-- 4. INSERT INITIAL SEED DATA
INSERT INTO settings (id, org_name, tagline, admin_username, admin_password, student_seq, cert_seq, course_seq, welcome_email_template, cert_email_template)
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 15, 'Subject: Welcome to {{course_name}}!

Hi {{student_name}},
Welcome.', 'Subject: Certificate for {{course_name}}

Hi {{student_name}},
Congrats.') ON CONFLICT(id) DO NOTHING;

INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open) VALUES 
('CRS-001', 'Harvest Management & Storage', 'Learn post-harvest handling, cold storage techniques, and spoilage prevention.', 'Maximize your produce shelf-life with advanced post-harvest techniques. Covers sorting, grading, temperature control, and modern cold storage. Available online and offline.', 'Post-Harvest', 'Dr. Anita Desai', '2 days', 'Beginner', 4000, 2500, 'HARVEST20', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', 'active', '2026-10-10', '2026-10-11', 50, 'coursehub@upi', 'Use coupon HARVEST20 at checkout.', TRUE, TRUE),
('CRS-002', 'Fresh Produce Trading & Distribution', 'Master B2B/B2C trading, logistics, vendor networking, and fresh distribution.', 'A comprehensive guide to the business of moving fresh produce from farm to market. Covers logistics, finding buyers, route optimization, and profit margins. Available online and offline.', 'Logistics', 'Rahul Verma', '3 days', 'Intermediate', 6000, 4500, 'TRADEPRO', 'https://images.unsplash.com/photo-1573486145949-182147241faa?auto=format&fit=crop&w=800&q=80', 'active', '2026-10-15', '2026-10-17', 80, 'coursehub@upi', 'Use coupon TRADEPRO at checkout.', TRUE, TRUE),
('CRS-003', 'Fruit and Vegetable Value Addition', 'Process, package, and brand fresh produce into high-value market products.', 'Transform raw fruits and vegetables into lucrative packaged goods like jams, dried snacks, purees, and cold-pressed juices. Learn food safety and branding. Available online and offline.', 'Value Addition', 'Chef Meera', '4 days', 'Intermediate', 8000, 6000, 'VALUE50', 'https://images.unsplash.com/photo-1601000652516-7242ba434db7?auto=format&fit=crop&w=800&q=80', 'active', '2026-10-20', '2026-10-23', 40, 'coursehub@upi', 'Use coupon VALUE50 at checkout.', TRUE, TRUE),
('CRS-004', 'Organic Farming Business Basics', 'Start a commercial organic farm, get certified, and access premium markets.', 'Learn the business side of organic farming. From soil health and natural pest control to organic certification processes and selling at a premium. Available online and offline.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 3000, 2000, 'ORGANIC', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', 'active', '2026-11-01', '2026-11-02', 100, 'coursehub@upi', 'Use coupon ORGANIC at checkout.', TRUE, TRUE),
('CRS-005', 'Agri-Export & Global Supply Chain', 'Take your fresh produce business global with export training and quality standards.', 'Navigate the complex world of agricultural exports. Understand international compliance, phytosanitary standards, export documentation, and global shipping. Available online and offline.', 'Export', 'GlobalTrade Inc', '3 days', 'Advanced', 10000, 7500, 'GLOBAL', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', 'active', '2026-11-10', '2026-11-12', 30, 'coursehub@upi', 'Use coupon GLOBAL at checkout.', TRUE, TRUE),
('CRS-006', 'Supply Chain Optimization for Fresh Produce', 'Reduce waste and increase profits through lean supply chain strategies.', 'Learn to identify bottlenecks and optimize transportation, packing, and distribution times for perishable goods. Essential for high-volume produce distributors.', 'Logistics', 'Rahul Verma', '2 days', 'Intermediate', 5000, 3500, 'SUPPLY20', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', 'active', '2026-11-15', '2026-11-16', 60, 'coursehub@upi', 'Use coupon SUPPLY20 at checkout.', TRUE, TRUE),
('CRS-007', 'Hydroponic Vegetable Farming for Profit', 'Build a profitable soil-less farming system for high-yield leafy greens.', 'A deep dive into commercial hydroponics. Learn nutrient management, lighting, system design, and the business economics of indoor farming.', 'Farming', 'Dr. Anita Desai', '3 days', 'Advanced', 8500, 6500, 'HYDROPONIC', 'https://images.unsplash.com/photo-1628189874136-1e6878bd6c74?auto=format&fit=crop&w=800&q=80', 'active', '2026-11-20', '2026-11-22', 40, 'coursehub@upi', 'Use coupon HYDROPONIC at checkout.', TRUE, TRUE),
('CRS-008', 'Urban Agriculture & Vertical Farming', 'Maximize limited space by growing fresh produce in urban environments.', 'Learn the techniques and business models for vertical farming in cities. Turn unused urban spaces into profitable fresh produce businesses.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 4500, 3000, 'URBANFARM', 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=800&q=80', 'active', '2026-11-25', '2026-11-26', 50, 'coursehub@upi', 'Use coupon URBANFARM at checkout.', TRUE, TRUE),
('CRS-009', 'Mushroom Cultivation Business', 'Launch a highly profitable, low-footprint commercial mushroom farm.', 'Discover the secrets of commercial mushroom cultivation. Focuses on Oyster, Button, and specialty mushrooms, plus packaging and retail.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 3500, 2500, 'MUSHROOM', 'https://images.unsplash.com/photo-1601053155701-d70c4974f266?auto=format&fit=crop&w=800&q=80', 'active', '2026-12-01', '2026-12-02', 80, 'coursehub@upi', 'Use coupon MUSHROOM at checkout.', TRUE, TRUE),
('CRS-010', 'Supermarket Fresh Produce Retail Management', 'Optimize supermarket vegetable aisles for visual appeal and profitability.', 'Geared toward retail managers. Learn shelf-life management on the floor, visual merchandising, and pricing strategies for fresh food.', 'Retail', 'GlobalTrade Inc', '2 days', 'Intermediate', 5000, 4000, 'RETAILPRO', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', 'active', '2026-12-05', '2026-12-06', 60, 'coursehub@upi', 'Use coupon RETAILPRO at checkout.', TRUE, TRUE),
('CRS-011', 'Organic Certification & Quality Compliance', 'Navigate the paperwork and audits needed for certified organic produce.', 'A dedicated workshop on passing organic audits, keeping proper records, and maintaining quality compliance for premium market access.', 'Quality', 'Dr. Anita Desai', '1 day', 'Beginner', 2000, 1500, 'QUALITY10', 'https://images.unsplash.com/photo-1595856424599-e65dbb8aa9a5?auto=format&fit=crop&w=800&q=80', 'active', '2026-12-10', '2026-12-10', 100, 'coursehub@upi', 'Use coupon QUALITY10 at checkout.', TRUE, TRUE),
('CRS-012', 'Agri-Tech & Smart Farming', 'Integrate IoT and automation into your fresh produce farming business.', 'Learn how to use smart sensors, automated irrigation, and data analytics to dramatically improve your farm''s yield and efficiency.', 'Technology', 'Rahul Verma', '3 days', 'Advanced', 12000, 9000, 'AGRITECH', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', 'active', '2026-12-15', '2026-12-17', 40, 'coursehub@upi', 'Use coupon AGRITECH at checkout.', TRUE, TRUE),
('CRS-013', 'Post-Harvest Processing for Leafy Greens', 'Specialized course on washing, cutting, and bagging fresh leafy greens.', 'Leafy greens are highly profitable but fragile. Learn the exact processing workflows for bagged salads and pre-cut greens.', 'Processing', 'Chef Meera', '2 days', 'Intermediate', 6000, 4500, 'GREENS15', 'https://images.unsplash.com/photo-1601000652516-7242ba434db7?auto=format&fit=crop&w=800&q=80', 'active', '2026-12-20', '2026-12-21', 50, 'coursehub@upi', 'Use coupon GREENS15 at checkout.', TRUE, TRUE),
('CRS-014', 'Cold Chain Logistics & Warehousing', 'Design and manage a temperature-controlled distribution network.', 'A logistical deep-dive into cold chain infrastructure. Protect your fresh produce investments by mastering warehouse temperature zones and refrigerated transport.', 'Logistics', 'Rahul Verma', '3 days', 'Advanced', 8000, 6500, 'COLDCHAIN', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', 'active', '2027-01-05', '2027-01-07', 50, 'coursehub@upi', 'Use coupon COLDCHAIN at checkout.', TRUE, TRUE),
('CRS-015', 'Direct-To-Consumer (D2C) Fresh Produce Sales', 'Bypass middlemen and sell fresh produce directly to households.', 'Build a profitable D2C vegetable subscription box or farm-to-table delivery service. Covers marketing, local logistics, and customer retention.', 'Marketing', 'GlobalTrade Inc', '2 days', 'Intermediate', 5500, 4000, 'D2CSALES', 'https://images.unsplash.com/photo-1573486145949-182147241faa?auto=format&fit=crop&w=800&q=80', 'active', '2027-01-10', '2027-01-11', 70, 'coursehub@upi', 'Use coupon D2CSALES at checkout.', TRUE, TRUE)
ON CONFLICT(id) DO NOTHING;

INSERT INTO course_syllabus (course_id, order_num, topic) VALUES
('CRS-001', 1, 'Day 1: Post-Harvest Physiology'),
('CRS-001', 2, 'Day 1: Sorting and Grading'),
('CRS-001', 3, 'Day 2: Cold Storage Technologies'),
('CRS-001', 4, 'Day 2: Spoilage Prevention'),
('CRS-002', 1, 'Day 1: Produce Trading Basics'),
('CRS-002', 2, 'Day 2: Logistics & Transportation'),
('CRS-002', 3, 'Day 3: Building a Vendor Network'),
('CRS-003', 1, 'Day 1: Intro to Value Addition'),
('CRS-003', 2, 'Day 2: Food Processing Methods'),
('CRS-003', 3, 'Day 3: Packaging & Shelf-life'),
('CRS-003', 4, 'Day 4: Branding & Sales'),
('CRS-004', 1, 'Day 1: Soil Health & Organic Principles'),
('CRS-004', 2, 'Day 2: Certification & Premium Pricing'),
('CRS-005', 1, 'Day 1: International Market Research'),
('CRS-005', 2, 'Day 2: Quality & Phytosanitary Standards'),
('CRS-005', 3, 'Day 3: Export Documentation & Shipping'),
('CRS-006', 1, 'Day 1: Lean Logistics'),
('CRS-006', 2, 'Day 2: Route Optimization and Tech'),
('CRS-007', 1, 'Day 1: System Design Basics'),
('CRS-007', 2, 'Day 2: Nutrient Control'),
('CRS-007', 3, 'Day 3: Yield Optimization'),
('CRS-008', 1, 'Day 1: Intro to Vertical Farming'),
('CRS-008', 2, 'Day 2: Space and Light Management'),
('CRS-009', 1, 'Day 1: Mycology and Substrates'),
('CRS-009', 2, 'Day 2: Harvesting and Marketing'),
('CRS-010', 1, 'Day 1: Visual Merchandising'),
('CRS-010', 2, 'Day 2: Retail Loss Prevention'),
('CRS-011', 1, 'Day 1: Compliance and Auditing'),
('CRS-012', 1, 'Day 1: Intro to Agri-Tech Sensors'),
('CRS-012', 2, 'Day 2: Automated Irrigation'),
('CRS-012', 3, 'Day 3: Data-Driven Farming'),
('CRS-013', 1, 'Day 1: Safe Washing Methods'),
('CRS-013', 2, 'Day 2: Modified Atmosphere Packaging'),
('CRS-014', 1, 'Day 1: Facility Design'),
('CRS-014', 2, 'Day 2: Transportation Management'),
('CRS-014', 3, 'Day 3: Cold Chain Economics'),
('CRS-015', 1, 'Day 1: Building a Subscription Model'),
('CRS-015', 2, 'Day 2: Digital Marketing for Farmers');

INSERT INTO lessons (id, course_id, module, order_num, lesson_title, youtube_url, duration, enabled) VALUES
('L1', 'CRS-001', 'Day 1', 1, 'Post-Harvest Physiology', 'jNQXAC9IVRw', '20 min', TRUE),
('L2', 'CRS-001', 'Day 1', 2, 'Sorting and Grading', 'jNQXAC9IVRw', '20 min', TRUE),
('L3', 'CRS-001', 'Day 2', 3, 'Cold Storage Technologies', 'jNQXAC9IVRw', '20 min', TRUE),
('L4', 'CRS-001', 'Day 2', 4, 'Spoilage Prevention', 'jNQXAC9IVRw', '20 min', TRUE),
('L5', 'CRS-002', 'Day 1', 1, 'Produce Trading Basics', 'jNQXAC9IVRw', '20 min', TRUE),
('L6', 'CRS-002', 'Day 2', 2, 'Logistics & Transportation', 'jNQXAC9IVRw', '20 min', TRUE),
('L7', 'CRS-002', 'Day 3', 3, 'Building a Vendor Network', 'jNQXAC9IVRw', '20 min', TRUE),
('L8', 'CRS-003', 'Day 1', 1, 'Intro to Value Addition', 'jNQXAC9IVRw', '20 min', TRUE),
('L9', 'CRS-003', 'Day 2', 2, 'Food Processing Methods', 'jNQXAC9IVRw', '20 min', TRUE),
('L10', 'CRS-003', 'Day 3', 3, 'Packaging & Shelf-life', 'jNQXAC9IVRw', '20 min', TRUE),
('L11', 'CRS-003', 'Day 4', 4, 'Branding & Sales', 'jNQXAC9IVRw', '20 min', TRUE),
('L12', 'CRS-004', 'Day 1', 1, 'Soil Health & Organic Principles', 'jNQXAC9IVRw', '20 min', TRUE),
('L13', 'CRS-004', 'Day 2', 2, 'Certification & Premium Pricing', 'jNQXAC9IVRw', '20 min', TRUE),
('L14', 'CRS-005', 'Day 1', 1, 'International Market Research', 'jNQXAC9IVRw', '20 min', TRUE),
('L15', 'CRS-005', 'Day 2', 2, 'Quality & Phytosanitary Standards', 'jNQXAC9IVRw', '20 min', TRUE),
('L16', 'CRS-005', 'Day 3', 3, 'Export Documentation & Shipping', 'jNQXAC9IVRw', '20 min', TRUE),
('L17', 'CRS-006', 'Day 1', 1, 'Lean Logistics', 'jNQXAC9IVRw', '20 min', TRUE),
('L18', 'CRS-006', 'Day 2', 2, 'Route Optimization and Tech', 'jNQXAC9IVRw', '20 min', TRUE),
('L19', 'CRS-007', 'Day 1', 1, 'System Design Basics', 'jNQXAC9IVRw', '20 min', TRUE),
('L20', 'CRS-007', 'Day 2', 2, 'Nutrient Control', 'jNQXAC9IVRw', '20 min', TRUE),
('L21', 'CRS-007', 'Day 3', 3, 'Yield Optimization', 'jNQXAC9IVRw', '20 min', TRUE),
('L22', 'CRS-008', 'Day 1', 1, 'Intro to Vertical Farming', 'jNQXAC9IVRw', '20 min', TRUE),
('L23', 'CRS-008', 'Day 2', 2, 'Space and Light Management', 'jNQXAC9IVRw', '20 min', TRUE),
('L24', 'CRS-009', 'Day 1', 1, 'Mycology and Substrates', 'jNQXAC9IVRw', '20 min', TRUE),
('L25', 'CRS-009', 'Day 2', 2, 'Harvesting and Marketing', 'jNQXAC9IVRw', '20 min', TRUE),
('L26', 'CRS-010', 'Day 1', 1, 'Visual Merchandising', 'jNQXAC9IVRw', '20 min', TRUE),
('L27', 'CRS-010', 'Day 2', 2, 'Retail Loss Prevention', 'jNQXAC9IVRw', '20 min', TRUE),
('L28', 'CRS-011', 'Day 1', 1, 'Compliance and Auditing', 'jNQXAC9IVRw', '20 min', TRUE),
('L29', 'CRS-012', 'Day 1', 1, 'Intro to Agri-Tech Sensors', 'jNQXAC9IVRw', '20 min', TRUE),
('L30', 'CRS-012', 'Day 2', 2, 'Automated Irrigation', 'jNQXAC9IVRw', '20 min', TRUE),
('L31', 'CRS-012', 'Day 3', 3, 'Data-Driven Farming', 'jNQXAC9IVRw', '20 min', TRUE),
('L32', 'CRS-013', 'Day 1', 1, 'Safe Washing Methods', 'jNQXAC9IVRw', '20 min', TRUE),
('L33', 'CRS-013', 'Day 2', 2, 'Modified Atmosphere Packaging', 'jNQXAC9IVRw', '20 min', TRUE),
('L34', 'CRS-014', 'Day 1', 1, 'Facility Design', 'jNQXAC9IVRw', '20 min', TRUE),
('L35', 'CRS-014', 'Day 2', 2, 'Transportation Management', 'jNQXAC9IVRw', '20 min', TRUE),
('L36', 'CRS-014', 'Day 3', 3, 'Cold Chain Economics', 'jNQXAC9IVRw', '20 min', TRUE),
('L37', 'CRS-015', 'Day 1', 1, 'Building a Subscription Model', 'jNQXAC9IVRw', '20 min', TRUE),
('L38', 'CRS-015', 'Day 2', 2, 'Digital Marketing for Farmers', 'jNQXAC9IVRw', '20 min', TRUE)
ON CONFLICT(id) DO NOTHING;

INSERT INTO students (id, full_name, dob, gender, email, mobile, whatsapp, address, city, state, pincode, qualification, institution, occupation, password, reg_date) VALUES
('STU-2026-0001', 'Priya Sharma', '2001-05-14', 'Female', 'priya@example.com', '9876543210', '9876543210', '12 Lake View Street', 'Chennai', 'Tamil Nadu', '600028', 'Bachelor''s Degree', 'Anna University', 'Student', 'demo123', '2026-08-10')
ON CONFLICT(id) DO NOTHING;

INSERT INTO registrations (id, student_id, course_id, date, status, progress_percent) VALUES
('REG-1001', 'STU-2026-0001', 'CRS-001', '2026-10-01', 'active', 0)
ON CONFLICT(id) DO NOTHING;

INSERT INTO payments (id, student_id, course_id, reg_id, amount, date, status, ref_id) VALUES
('PAY-2001', 'STU-2026-0001', 'CRS-001', 'REG-1001', 2500.00, '2026-10-01', 'Verified', 'UPI2026081099887')
ON CONFLICT(id) DO NOTHING;

INSERT INTO schedules (id, course_id, date, time, title, description, instructor, link, status) VALUES
('SCH-1', 'CRS-001', '2026-10-10', '10:00', 'Live Kickoff Session', 'Welcome to Harvest Management & Storage', 'Dr. Anita Desai', 'https://youtube.com', 'Upcoming'),
('SCH-2', 'CRS-002', '2026-10-15', '10:00', 'Live Kickoff Session', 'Welcome to Fresh Produce Trading & Distribution', 'Rahul Verma', 'https://youtube.com', 'Upcoming'),
('SCH-3', 'CRS-003', '2026-10-20', '10:00', 'Live Kickoff Session', 'Welcome to Fruit and Vegetable Value Addition', 'Chef Meera', 'https://youtube.com', 'Upcoming'),
('SCH-4', 'CRS-004', '2026-11-01', '10:00', 'Live Kickoff Session', 'Welcome to Organic Farming Business Basics', 'Kisan Partners', 'https://youtube.com', 'Upcoming'),
('SCH-5', 'CRS-005', '2026-11-10', '10:00', 'Live Kickoff Session', 'Welcome to Agri-Export & Global Supply Chain', 'GlobalTrade Inc', 'https://youtube.com', 'Upcoming'),
('SCH-6', 'CRS-006', '2026-11-15', '10:00', 'Live Kickoff Session', 'Welcome to Supply Chain Optimization for Fresh Produce', 'Rahul Verma', 'https://youtube.com', 'Upcoming'),
('SCH-7', 'CRS-007', '2026-11-20', '10:00', 'Live Kickoff Session', 'Welcome to Hydroponic Vegetable Farming for Profit', 'Dr. Anita Desai', 'https://youtube.com', 'Upcoming'),
('SCH-8', 'CRS-008', '2026-11-25', '10:00', 'Live Kickoff Session', 'Welcome to Urban Agriculture & Vertical Farming', 'Kisan Partners', 'https://youtube.com', 'Upcoming'),
('SCH-9', 'CRS-009', '2026-12-01', '10:00', 'Live Kickoff Session', 'Welcome to Mushroom Cultivation Business', 'Kisan Partners', 'https://youtube.com', 'Upcoming'),
('SCH-10', 'CRS-010', '2026-12-05', '10:00', 'Live Kickoff Session', 'Welcome to Supermarket Fresh Produce Retail Management', 'GlobalTrade Inc', 'https://youtube.com', 'Upcoming'),
('SCH-11', 'CRS-011', '2026-12-10', '10:00', 'Live Kickoff Session', 'Welcome to Organic Certification & Quality Compliance', 'Dr. Anita Desai', 'https://youtube.com', 'Upcoming'),
('SCH-12', 'CRS-012', '2026-12-15', '10:00', 'Live Kickoff Session', 'Welcome to Agri-Tech & Smart Farming', 'Rahul Verma', 'https://youtube.com', 'Upcoming'),
('SCH-13', 'CRS-013', '2026-12-20', '10:00', 'Live Kickoff Session', 'Welcome to Post-Harvest Processing for Leafy Greens', 'Chef Meera', 'https://youtube.com', 'Upcoming'),
('SCH-14', 'CRS-014', '2027-01-05', '10:00', 'Live Kickoff Session', 'Welcome to Cold Chain Logistics & Warehousing', 'Rahul Verma', 'https://youtube.com', 'Upcoming'),
('SCH-15', 'CRS-015', '2027-01-10', '10:00', 'Live Kickoff Session', 'Welcome to Direct-To-Consumer (D2C) Fresh Produce Sales', 'GlobalTrade Inc', 'https://youtube.com', 'Upcoming')
ON CONFLICT(id) DO NOTHING;

-- 5. ANALYTICAL VIEWS
CREATE OR REPLACE VIEW v_course_stats AS
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

CREATE OR REPLACE VIEW v_pending_payments AS
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

-- 6. PERMISSION GRANTS FOR PUBLIC ACCESS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
