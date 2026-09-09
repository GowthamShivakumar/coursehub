const fs = require('fs');

const coursesData = [
  // ORIGINAL 5
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
  },
  
  // NEW 10 COURSES
  {
    id: 'CRS-006', name: 'Supply Chain Optimization for Fresh Produce', shortDesc: 'Reduce waste and increase profits through lean supply chain strategies.', fullDesc: 'Learn to identify bottlenecks and optimize transportation, packing, and distribution times for perishable goods. Essential for high-volume produce distributors.',
    category: 'Logistics', instructor: 'Rahul Verma', duration: '2 days', level: 'Intermediate', price: 5000, discountPrice: 3500, couponCode: 'SUPPLY20',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-11-15', endDate: '2026-11-16', maxStudents: 60, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon SUPPLY20 at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Lean Logistics', 'Day 2: Route Optimization and Tech']
  },
  {
    id: 'CRS-007', name: 'Hydroponic Vegetable Farming for Profit', shortDesc: 'Build a profitable soil-less farming system for high-yield leafy greens.', fullDesc: 'A deep dive into commercial hydroponics. Learn nutrient management, lighting, system design, and the business economics of indoor farming.',
    category: 'Farming', instructor: 'Dr. Anita Desai', duration: '3 days', level: 'Advanced', price: 8500, discountPrice: 6500, couponCode: 'HYDROPONIC',
    image: 'https://images.unsplash.com/photo-1628189874136-1e6878bd6c74?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-11-20', endDate: '2026-11-22', maxStudents: 40, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon HYDROPONIC at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: System Design Basics', 'Day 2: Nutrient Control', 'Day 3: Yield Optimization']
  },
  {
    id: 'CRS-008', name: 'Urban Agriculture & Vertical Farming', shortDesc: 'Maximize limited space by growing fresh produce in urban environments.', fullDesc: 'Learn the techniques and business models for vertical farming in cities. Turn unused urban spaces into profitable fresh produce businesses.',
    category: 'Farming', instructor: 'Kisan Partners', duration: '2 days', level: 'Beginner', price: 4500, discountPrice: 3000, couponCode: 'URBANFARM',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-11-25', endDate: '2026-11-26', maxStudents: 50, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon URBANFARM at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Intro to Vertical Farming', 'Day 2: Space and Light Management']
  },
  {
    id: 'CRS-009', name: 'Mushroom Cultivation Business', shortDesc: 'Launch a highly profitable, low-footprint commercial mushroom farm.', fullDesc: 'Discover the secrets of commercial mushroom cultivation. Focuses on Oyster, Button, and specialty mushrooms, plus packaging and retail.',
    category: 'Farming', instructor: 'Kisan Partners', duration: '2 days', level: 'Beginner', price: 3500, discountPrice: 2500, couponCode: 'MUSHROOM',
    image: 'https://images.unsplash.com/photo-1601053155701-d70c4974f266?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-12-01', endDate: '2026-12-02', maxStudents: 80, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon MUSHROOM at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Mycology and Substrates', 'Day 2: Harvesting and Marketing']
  },
  {
    id: 'CRS-010', name: 'Supermarket Fresh Produce Retail Management', shortDesc: 'Optimize supermarket vegetable aisles for visual appeal and profitability.', fullDesc: 'Geared toward retail managers. Learn shelf-life management on the floor, visual merchandising, and pricing strategies for fresh food.',
    category: 'Retail', instructor: 'GlobalTrade Inc', duration: '2 days', level: 'Intermediate', price: 5000, discountPrice: 4000, couponCode: 'RETAILPRO',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-12-05', endDate: '2026-12-06', maxStudents: 60, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon RETAILPRO at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Visual Merchandising', 'Day 2: Retail Loss Prevention']
  },
  {
    id: 'CRS-011', name: 'Organic Certification & Quality Compliance', shortDesc: 'Navigate the paperwork and audits needed for certified organic produce.', fullDesc: 'A dedicated workshop on passing organic audits, keeping proper records, and maintaining quality compliance for premium market access.',
    category: 'Quality', instructor: 'Dr. Anita Desai', duration: '1 day', level: 'Beginner', price: 2000, discountPrice: 1500, couponCode: 'QUALITY10',
    image: 'https://images.unsplash.com/photo-1595856424599-e65dbb8aa9a5?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-12-10', endDate: '2026-12-10', maxStudents: 100, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon QUALITY10 at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Compliance and Auditing']
  },
  {
    id: 'CRS-012', name: 'Agri-Tech & Smart Farming', shortDesc: 'Integrate IoT and automation into your fresh produce farming business.', fullDesc: 'Learn how to use smart sensors, automated irrigation, and data analytics to dramatically improve your farm\'s yield and efficiency.',
    category: 'Technology', instructor: 'Rahul Verma', duration: '3 days', level: 'Advanced', price: 12000, discountPrice: 9000, couponCode: 'AGRITECH',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-12-15', endDate: '2026-12-17', maxStudents: 40, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon AGRITECH at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Intro to Agri-Tech Sensors', 'Day 2: Automated Irrigation', 'Day 3: Data-Driven Farming']
  },
  {
    id: 'CRS-013', name: 'Post-Harvest Processing for Leafy Greens', shortDesc: 'Specialized course on washing, cutting, and bagging fresh leafy greens.', fullDesc: 'Leafy greens are highly profitable but fragile. Learn the exact processing workflows for bagged salads and pre-cut greens.',
    category: 'Processing', instructor: 'Chef Meera', duration: '2 days', level: 'Intermediate', price: 6000, discountPrice: 4500, couponCode: 'GREENS15',
    image: 'https://images.unsplash.com/photo-1601000652516-7242ba434db7?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2026-12-20', endDate: '2026-12-21', maxStudents: 50, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon GREENS15 at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Safe Washing Methods', 'Day 2: Modified Atmosphere Packaging']
  },
  {
    id: 'CRS-014', name: 'Cold Chain Logistics & Warehousing', shortDesc: 'Design and manage a temperature-controlled distribution network.', fullDesc: 'A logistical deep-dive into cold chain infrastructure. Protect your fresh produce investments by mastering warehouse temperature zones and refrigerated transport.',
    category: 'Logistics', instructor: 'Rahul Verma', duration: '3 days', level: 'Advanced', price: 8000, discountPrice: 6500, couponCode: 'COLDCHAIN',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c152cd?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2027-01-05', endDate: '2027-01-07', maxStudents: 50, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon COLDCHAIN at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Facility Design', 'Day 2: Transportation Management', 'Day 3: Cold Chain Economics']
  },
  {
    id: 'CRS-015', name: 'Direct-To-Consumer (D2C) Fresh Produce Sales', shortDesc: 'Bypass middlemen and sell fresh produce directly to households.', fullDesc: 'Build a profitable D2C vegetable subscription box or farm-to-table delivery service. Covers marketing, local logistics, and customer retention.',
    category: 'Marketing', instructor: 'GlobalTrade Inc', duration: '2 days', level: 'Intermediate', price: 5500, discountPrice: 4000, couponCode: 'D2CSALES',
    image: 'https://images.unsplash.com/photo-1573486145949-182147241faa?auto=format&fit=crop&w=800&q=80', status: 'active', startDate: '2027-01-10', endDate: '2027-01-11', maxStudents: 70, upiId: 'coursehub@upi', paymentInstructions: 'Use coupon D2CSALES at checkout.', certEligible: true, registrationOpen: true,
    syllabus: ['Day 1: Building a Subscription Model', 'Day 2: Digital Marketing for Farmers']
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
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 15, 'Subject: Welcome to {{course_name}}!\n\nHi {{student_name}},\nWelcome.', 'Subject: Certificate for {{course_name}}\n\nHi {{student_name}},\nCongrats.') ON CONFLICT(id) DO NOTHING;

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
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 15, 'Subject: Welcome to {{course_name}}!\n\nHi {{student_name}},\nWelcome.', 'Subject: Certificate for {{course_name}}\n\nHi {{student_name}},\nCongrats.') ON CONFLICT(id) DO NOTHING;

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

console.log("Database update scripts for 15 courses prepared successfully.");
