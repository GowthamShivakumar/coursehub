const fs = require('fs');

const coursesData = [
  {
    id: 'CRS-001', name: 'Harvest Management & Storage', shortDesc: 'Learn post-harvest handling, cold storage techniques, and spoilage prevention.', fullDesc: 'Maximize your produce shelf-life with advanced post-harvest techniques. Covers sorting, grading, temperature control, and modern cold storage. Available online and offline.',
    category: 'Post-Harvest', instructor: 'Dr. Anita Desai', duration: '2 days', level: 'Beginner', price: 4000, discountPrice: 2500, couponCode: 'HARVEST20',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-10-10', endDate: '2026-10-11', maxStudents: 50, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon HARVEST20 at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Post-Harvest Physiology', 'Day 1: Sorting and Grading', 'Day 2: Cold Storage Technologies', 'Day 2: Spoilage Prevention']
  },
  {
    id: 'CRS-002', name: 'Fresh Produce Trading & Distribution', shortDesc: 'Master B2B/B2C trading, logistics, vendor networking, and fresh distribution.', fullDesc: 'A comprehensive guide to the business of moving fresh produce from farm to market. Covers logistics, finding buyers, route optimization, and profit margins. Available online and offline.',
    category: 'Logistics', instructor: 'Rahul Verma', duration: '3 days', level: 'Intermediate', price: 6000, discountPrice: 4500, couponCode: 'TRADEPRO',
    image: 'https://images.unsplash.com/photo-1573486145949-182147241faa?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-10-15', endDate: '2026-10-17', maxStudents: 80, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon TRADEPRO at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Produce Trading Basics', 'Day 2: Logistics & Transportation', 'Day 3: Building a Vendor Network']
  },
  {
    id: 'CRS-003', name: 'Fruit and Vegetable Value Addition', shortDesc: 'Process, package, and brand fresh produce into high-value market products.', fullDesc: 'Transform raw fruits and vegetables into lucrative packaged goods like jams, dried snacks, purees, and cold-pressed juices. Learn food safety and branding. Available online and offline.',
    category: 'Value Addition', instructor: 'Chef Meera', duration: '4 days', level: 'Intermediate', price: 8000, discountPrice: 6000, couponCode: 'VALUE50',
    image: 'https://images.unsplash.com/photo-1601000652516-7242ba434db7?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-10-20', endDate: '2026-10-23', maxStudents: 40, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon VALUE50 at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Intro to Value Addition', 'Day 2: Food Processing Methods', 'Day 3: Packaging & Shelf-life', 'Day 4: Branding & Sales']
  },
  {
    id: 'CRS-004', name: 'Organic Farming Business Basics', shortDesc: 'Start a commercial organic farm, get certified, and access premium markets.', fullDesc: 'Learn the business side of organic farming. From soil health and natural pest control to organic certification processes and selling at a premium. Available online and offline.',
    category: 'Farming', instructor: 'Kisan Partners', duration: '2 days', level: 'Beginner', price: 3000, discountPrice: 2000, couponCode: 'ORGANIC',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-11-01', endDate: '2026-11-02', maxStudents: 100, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon ORGANIC at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Soil Health & Organic Principles', 'Day 2: Certification & Premium Pricing']
  },
  {
    id: 'CRS-005', name: 'Agri-Export & Global Supply Chain', shortDesc: 'Take your fresh produce business global with export training and quality standards.', fullDesc: 'Navigate the complex world of agricultural exports. Understand international compliance, phytosanitary standards, export documentation, and global shipping. Available online and offline.',
    category: 'Export', instructor: 'GlobalTrade Inc', duration: '3 days', level: 'Advanced', price: 10000, discountPrice: 7500, couponCode: 'GLOBAL',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-11-10', endDate: '2026-11-12', maxStudents: 30, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon GLOBAL at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: International Market Research', 'Day 2: Quality & Phytosanitary Standards', 'Day 3: Export Documentation & Shipping']
  }
];

let lessonsData = [];
let lId = 1;
coursesData.forEach(c => {
  c.syllabus.forEach((topic, idx) => {
    lessonsData.push({
      id: 'L' + lId++,
      courseId: c.id,
      module: topic.split(':')[0],
      order: idx + 1,
      lessonTitle: topic.split(': ')[1] || topic,
      youtubeUrl: 'jNQXAC9IVRw',
      duration: '20 min',
      enabled: true
    });
  });
});

let schedulesData = coursesData.map((c, i) => ({
  id: 'SCH-' + (i+1),
  courseId: c.id,
  date: c.startDate,
  time: '10:00',
  title: 'Live Kickoff Session',
  description: 'Welcome to ' + c.name,
  instructor: c.instructor,
  link: 'https://youtube.com',
  status: 'Upcoming'
}));

// ========================
// 1. UPDATE database.js
// ========================
let dbjs = fs.readFileSync('database.js', 'utf8');

// Serialize objects cleanly
const coursesStr = 'const courses=' + JSON.stringify(coursesData, null, 2).replace(/"([^"]+)":/g, '$1:') + ';';
const lessonsStr = 'const lessons=' + JSON.stringify(lessonsData, null, 2).replace(/"([^"]+)":/g, '$1:') + ';';
const schedulesStr = 'const schedules=' + JSON.stringify(schedulesData, null, 2).replace(/"([^"]+)":/g, '$1:') + ';';

dbjs = dbjs.replace(/const courses=\[[\s\S]*?\];/, coursesStr);
dbjs = dbjs.replace(/const lessons=\[[\s\S]*?\];/, lessonsStr);
dbjs = dbjs.replace(/const schedules=\[[\s\S]*?\];/, schedulesStr);

// Reset registrations and progress to empty or just CRS-001
dbjs = dbjs.replace(/const registrations=\[[\s\S]*?\];/, `const registrations=[{id:'REG-1001',studentId:'STU-2026-0001',courseId:'CRS-001',date:'2026-10-01',status:'active',progressPercent:0}];`);
dbjs = dbjs.replace(/const payments=\[[\s\S]*?\];/, `const payments=[{id:'PAY-2001',studentId:'STU-2026-0001',courseId:'CRS-001',regId:'REG-1001',amount:2500,date:'2026-10-01',status:'Verified',refId:'UPI123'}];`);
dbjs = dbjs.replace(/const progress=\[[\s\S]*?\];/, `const progress=[{studentId:'STU-2026-0001',courseId:'CRS-001',completed:[]}];`);

fs.writeFileSync('database.js', dbjs);


// ========================
// 2. UPDATE seed.sql
// ========================
const escapeSql = (str) => str.replace(/'/g, "''");
let coursesSql = coursesData.map(c => `('${c.id}', '${escapeSql(c.name)}', '${escapeSql(c.shortDesc)}', '${escapeSql(c.fullDesc)}', '${escapeSql(c.category)}', '${escapeSql(c.instructor)}', '${escapeSql(c.duration)}', '${escapeSql(c.level)}', ${c.price}, ${c.discountPrice}, '${escapeSql(c.couponCode)}', '${escapeSql(c.image)}', '${c.status}', '${c.startDate}', '${c.endDate}', ${c.maxStudents}, '${escapeSql(c.upiId)}', '${escapeSql(c.paymentInstructions)}', 1, 1)`).join(',\n');
let syllabusSql = [];
coursesData.forEach(c => c.syllabus.forEach((t, i) => syllabusSql.push(`('${c.id}', ${i+1}, '${escapeSql(t)}')`)));
let lessonsSql = lessonsData.map(l => `('${l.id}', '${l.courseId}', '${escapeSql(l.module)}', ${l.order}, '${escapeSql(l.lessonTitle)}', '${escapeSql(l.youtubeUrl)}', '${escapeSql(l.duration)}', 1)`).join(',\n');
let schedulesSql = schedulesData.map(s => `('${s.id}', '${s.courseId}', '${s.date}', '${s.time}', '${escapeSql(s.title)}', '${escapeSql(s.description)}', '${escapeSql(s.instructor)}', '${escapeSql(s.link)}', '${s.status}')`).join(',\n');

const seedSqlContent = `-- =========================================================================
-- COURSEHUB ACADEMY - SEED DATA SCRIPT
-- =========================================================================

INSERT INTO settings (id, org_name, tagline, admin_username, admin_password, student_seq, cert_seq, course_seq, welcome_email_template, cert_email_template)
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 5, 'Subject: Welcome to {{course_name}}!\n\nHi {{student_name}},\nWelcome.', 'Subject: Certificate for {{course_name}}\n\nHi {{student_name}},\nCongrats.') ON CONFLICT(id) DO NOTHING;

INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open) VALUES 
${coursesSql};

INSERT INTO course_syllabus (course_id, order_num, topic) VALUES
${syllabusSql.join(',\n')};

INSERT INTO lessons (id, course_id, module, order_num, lesson_title, youtube_url, duration, enabled) VALUES
${lessonsSql};

INSERT INTO students (id, full_name, dob, gender, email, mobile, whatsapp, address, city, state, pincode, qualification, institution, occupation, password, reg_date) VALUES
('STU-2026-0001', 'Priya Sharma', '2001-05-14', 'Female', 'priya@example.com', '9876543210', '9876543210', '12 Lake View Street', 'Chennai', 'Tamil Nadu', '600028', 'Bachelor''s Degree', 'Anna University', 'Student', 'demo123', '2026-08-10');

INSERT INTO registrations (id, student_id, course_id, date, status, progress_percent) VALUES
('REG-1001', 'STU-2026-0001', 'CRS-001', '2026-10-01', 'active', 0);

INSERT INTO payments (id, student_id, course_id, reg_id, amount, date, status, ref_id) VALUES
('PAY-2001', 'STU-2026-0001', 'CRS-001', 'REG-1001', 2500.00, '2026-10-01', 'Verified', 'UPI2026081099887');

INSERT INTO schedules (id, course_id, date, time, title, description, instructor, link, status) VALUES
${schedulesSql};
`;
fs.writeFileSync('seed.sql', seedSqlContent);

// ========================
// 3. UPDATE supabase_schema.sql
// ========================
let supabase = fs.readFileSync('supabase_schema.sql', 'utf8');

// Replace everything after '-- 4. INSERT INITIAL SEED DATA'
const supabasePrefix = supabase.split('-- 4. INSERT INITIAL SEED DATA')[0];

const supabaseSeed = `-- 4. INSERT INITIAL SEED DATA
INSERT INTO settings (id, org_name, tagline, admin_username, admin_password, student_seq, cert_seq, course_seq, welcome_email_template, cert_email_template)
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 5, 'Subject: Welcome to {{course_name}}!\n\nHi {{student_name}},\nWelcome.', 'Subject: Certificate for {{course_name}}\n\nHi {{student_name}},\nCongrats.') ON CONFLICT(id) DO NOTHING;

INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open) VALUES 
${coursesSql}
ON CONFLICT(id) DO NOTHING;

INSERT INTO course_syllabus (course_id, order_num, topic) VALUES
${syllabusSql.join(',\n')};

INSERT INTO lessons (id, course_id, module, order_num, lesson_title, youtube_url, duration, enabled) VALUES
${lessonsSql}
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
${schedulesSql}
ON CONFLICT(id) DO NOTHING;
`;

fs.writeFileSync('supabase_schema.sql', supabasePrefix + supabaseSeed);

console.log("Database update scripts prepared successfully.");
