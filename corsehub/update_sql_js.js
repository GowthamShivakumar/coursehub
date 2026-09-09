const fs = require('fs');

// Update schema.sql
let schema = fs.readFileSync('schema.sql', 'utf8');
schema = schema.replace(/discount_price DECIMAL\(10,2\) NOT NULL DEFAULT 0,/g, "discount_price DECIMAL(10,2) NOT NULL DEFAULT 0,\n    coupon_code VARCHAR(50) DEFAULT '',");
fs.writeFileSync('schema.sql', schema);

// Update supabase_schema.sql
let supabase = fs.readFileSync('supabase_schema.sql', 'utf8');
supabase = supabase.replace(/discount_price NUMERIC\(10,2\) NOT NULL DEFAULT 0,/g, "discount_price NUMERIC(10,2) NOT NULL DEFAULT 0,\n    coupon_code VARCHAR(50) DEFAULT '',");

// Replace courses insert
supabase = supabase.replace(/INSERT INTO courses \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open)
VALUES 
('CRS-001', 'Food and Vegetable Business Development', 'Start and scale a profitable fresh produce business. Available Online & Offline.', 'This 3-day comprehensive program covers sourcing, supply chain logistics, inventory management, and marketing for fresh food and vegetable businesses. You can attend our offline campus or join the interactive online sessions.', 'Business Development', 'Industry Experts', '3 days', 'Beginner', 5000.00, 3500.00, 'VEGSTART', '', 'active', '2026-10-01', '2026-10-03', 100, 'coursehub@upi', 'Use coupon code VEGSTART during payment submission. Pay via UPI and submit reference.', TRUE, TRUE)
ON CONFLICT(id) DO NOTHING;`);

// Replace syllabus insert
supabase = supabase.replace(/INSERT INTO course_syllabus \([\s\S]*?('CRS-003', 4, 'Paid advertising & analytics');/g, `INSERT INTO course_syllabus (course_id, order_num, topic) VALUES
('CRS-001', 1, 'Day 1: Sourcing & Supply Chain'),
('CRS-001', 2, 'Day 2: Quality Control & Inventory'),
('CRS-001', 3, 'Day 3: Sales, Marketing & Scaling');`);

// Replace lessons insert
supabase = supabase.replace(/INSERT INTO lessons \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `INSERT INTO lessons (id, course_id, module, order_num, lesson_title, youtube_url, duration, enabled) VALUES
('L1', 'CRS-001', 'Day 1', 1, 'Welcome & Industry Overview', 'jNQXAC9IVRw', '15 min', TRUE),
('L2', 'CRS-001', 'Day 1', 2, 'Vendor Negotiation Basics', 'jNQXAC9IVRw', '20 min', TRUE),
('L3', 'CRS-001', 'Day 2', 3, 'Quality Control & Freshness', 'jNQXAC9IVRw', '25 min', TRUE),
('L4', 'CRS-001', 'Day 3', 4, 'Sales & Scaling Strategies', 'jNQXAC9IVRw', '30 min', TRUE)
ON CONFLICT(id) DO NOTHING;`);

// Replace registrations
supabase = supabase.replace(/INSERT INTO registrations \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `INSERT INTO registrations (id, student_id, course_id, date, status, progress_percent) VALUES
('REG-1001', 'STU-2026-0001', 'CRS-001', '2026-08-10', 'active', 25)
ON CONFLICT(id) DO NOTHING;`);

// Replace payments
supabase = supabase.replace(/INSERT INTO payments \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `INSERT INTO payments (id, student_id, course_id, reg_id, amount, date, status, ref_id) VALUES
('PAY-2001', 'STU-2026-0001', 'CRS-001', 'REG-1001', 3500.00, '2026-08-10', 'Verified', 'UPI2026081099887')
ON CONFLICT(id) DO NOTHING;`);

// Replace progress
supabase = supabase.replace(/INSERT INTO student_lesson_progress \([\s\S]*?ON CONFLICT\(student_id, lesson_id\) DO NOTHING;/g, `INSERT INTO student_lesson_progress (student_id, course_id, lesson_id) VALUES
('STU-2026-0001', 'CRS-001', 'L1')
ON CONFLICT(student_id, lesson_id) DO NOTHING;`);

// Replace certificates
supabase = supabase.replace(/INSERT INTO certificates \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `/* No initial certificates */`);

// Replace schedules
supabase = supabase.replace(/INSERT INTO schedules \([\s\S]*?ON CONFLICT\(id\) DO NOTHING;/g, `INSERT INTO schedules (id, course_id, date, time, title, description, instructor, link, status) VALUES
('SCH-1', 'CRS-001', '2026-10-01', '10:00', 'Day 1 Live Offline/Online Kickoff', 'Welcome to the business development course.', 'Industry Experts', 'https://youtube.com', 'Upcoming')
ON CONFLICT(id) DO NOTHING;`);

fs.writeFileSync('supabase_schema.sql', supabase);

// Update seed.sql identically
let seed = fs.readFileSync('seed.sql', 'utf8');
seed = seed.replace(/INSERT INTO courses \([\s\S]*?\);/g, `INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open)
VALUES 
('CRS-001', 'Food and Vegetable Business Development', 'Start and scale a profitable fresh produce business. Available Online & Offline.', 'This 3-day comprehensive program covers sourcing, supply chain logistics, inventory management, and marketing for fresh food and vegetable businesses. You can attend our offline campus or join the interactive online sessions.', 'Business Development', 'Industry Experts', '3 days', 'Beginner', 5000.00, 3500.00, 'VEGSTART', '', 'active', '2026-10-01', '2026-10-03', 100, 'coursehub@upi', 'Use coupon code VEGSTART during payment submission. Pay via UPI and submit reference.', 1, 1);`);

// Update server.js
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(/discountPrice: Number\(c\.discount_price\),/g, "discountPrice: Number(c.discount_price),\n    couponCode: c.coupon_code || '',");
server = server.replace(/discount_price = excluded\.discount_price,/g, "discount_price = excluded.discount_price,\n          coupon_code = excluded.coupon_code,");
server = server.replace(/discount_price, image, status/g, "discount_price, coupon_code, image, status");
server = server.replace(/\?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?, \?/g, "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?");
server = server.replace(/c\.discountPrice \|\| 0, c\.image/g, "c.discountPrice || 0, c.couponCode || '', c.image");
fs.writeFileSync('server.js', server);

console.log('SQL and server updated');
