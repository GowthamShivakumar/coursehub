-- =========================================================================
-- COURSEHUB ACADEMY - SEED DATA SCRIPT
-- =========================================================================

INSERT INTO settings (id, org_name, tagline, admin_username, admin_password, student_seq, cert_seq, course_seq, welcome_email_template, cert_email_template)
VALUES (1, 'CourseHub Academy', 'Learn. Build. Grow.', 'admin', 'admin123', 2, 1, 15, 'Subject: Welcome to {{course_name}}!

Hi {{student_name}},
Welcome.', 'Subject: Certificate for {{course_name}}

Hi {{student_name}},
Congrats.') ON CONFLICT(id) DO NOTHING;

INSERT INTO courses (id, name, short_desc, full_desc, category, instructor, duration, level, price, discount_price, coupon_code, image, status, start_date, end_date, max_students, upi_id, payment_instructions, cert_eligible, registration_open) VALUES 
('CRS-001', 'Harvest Management & Storage', 'Learn post-harvest handling, cold storage techniques, and spoilage prevention.', 'Maximize your produce shelf-life with advanced post-harvest techniques. Covers sorting, grading, temperature control, and modern cold storage. Available online and offline.', 'Post-Harvest', 'Dr. Anita Desai', '2 days', 'Beginner', 4000, 2500, 'HARVEST20', 'course_images/harvest_storage.jpg', 'active', '2026-10-10', '2026-10-11', 50, 'coursehub@upi', 'Use coupon HARVEST20 at checkout.', 1, 1),
('CRS-002', 'Fresh Produce Trading & Distribution', 'Master B2B/B2C trading, logistics, vendor networking, and fresh distribution.', 'A comprehensive guide to the business of moving fresh produce from farm to market. Covers logistics, finding buyers, route optimization, and profit margins. Available online and offline.', 'Logistics', 'Rahul Verma', '3 days', 'Intermediate', 6000, 4500, 'TRADEPRO', 'course_images/fresh_produce_trading.jpg', 'active', '2026-10-15', '2026-10-17', 80, 'coursehub@upi', 'Use coupon TRADEPRO at checkout.', 1, 1),
('CRS-003', 'Fruit and Vegetable Value Addition', 'Process, package, and brand fresh produce into high-value market products.', 'Transform raw fruits and vegetables into lucrative packaged goods like jams, dried snacks, purees, and cold-pressed juices. Learn food safety and branding. Available online and offline.', 'Value Addition', 'Chef Meera', '4 days', 'Intermediate', 8000, 6000, 'VALUE50', 'course_images/value_addition.jpg', 'active', '2026-10-20', '2026-10-23', 40, 'coursehub@upi', 'Use coupon VALUE50 at checkout.', 1, 1),
('CRS-004', 'Organic Farming Business Basics', 'Start a commercial organic farm, get certified, and access premium markets.', 'Learn the business side of organic farming. From soil health and natural pest control to organic certification processes and selling at a premium. Available online and offline.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 3000, 2000, 'ORGANIC', 'course_images/organic_farming.jpg', 'active', '2026-11-01', '2026-11-02', 100, 'coursehub@upi', 'Use coupon ORGANIC at checkout.', 1, 1),
('CRS-005', 'Agri-Export & Global Supply Chain', 'Take your fresh produce business global with export training and quality standards.', 'Navigate the complex world of agricultural exports. Understand international compliance, phytosanitary standards, export documentation, and global shipping. Available online and offline.', 'Export', 'GlobalTrade Inc', '3 days', 'Advanced', 10000, 7500, 'GLOBAL', 'course_images/agri_export.jpg', 'active', '2026-11-10', '2026-11-12', 30, 'coursehub@upi', 'Use coupon GLOBAL at checkout.', 1, 1),
('CRS-006', 'Supply Chain Optimization for Fresh Produce', 'Reduce waste and increase profits through lean supply chain strategies.', 'Learn to identify bottlenecks and optimize transportation, packing, and distribution times for perishable goods. Essential for high-volume produce distributors.', 'Logistics', 'Rahul Verma', '2 days', 'Intermediate', 5000, 3500, 'SUPPLY20', 'course_images/supply_chain.jpg', 'active', '2026-11-15', '2026-11-16', 60, 'coursehub@upi', 'Use coupon SUPPLY20 at checkout.', 1, 1),
('CRS-007', 'Hydroponic Vegetable Farming for Profit', 'Build a profitable soil-less farming system for high-yield leafy greens.', 'A deep dive into commercial hydroponics. Learn nutrient management, lighting, system design, and the business economics of indoor farming.', 'Farming', 'Dr. Anita Desai', '3 days', 'Advanced', 8500, 6500, 'HYDROPONIC', 'course_images/hydroponic_farming.jpg', 'active', '2026-11-20', '2026-11-22', 40, 'coursehub@upi', 'Use coupon HYDROPONIC at checkout.', 1, 1),
('CRS-008', 'Urban Agriculture & Vertical Farming', 'Maximize limited space by growing fresh produce in urban environments.', 'Learn the techniques and business models for vertical farming in cities. Turn unused urban spaces into profitable fresh produce businesses.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 4500, 3000, 'URBANFARM', 'course_images/urban_vertical_farming.jpg', 'active', '2026-11-25', '2026-11-26', 50, 'coursehub@upi', 'Use coupon URBANFARM at checkout.', 1, 1),
('CRS-009', 'Mushroom Cultivation Business', 'Launch a highly profitable, low-footprint commercial mushroom farm.', 'Discover the secrets of commercial mushroom cultivation. Focuses on Oyster, Button, and specialty mushrooms, plus packaging and retail.', 'Farming', 'Kisan Partners', '2 days', 'Beginner', 3500, 2500, 'MUSHROOM', 'course_images/mushroom_cultivation.jpg', 'active', '2026-12-01', '2026-12-02', 80, 'coursehub@upi', 'Use coupon MUSHROOM at checkout.', 1, 1),
('CRS-010', 'Supermarket Fresh Produce Retail Management', 'Optimize supermarket vegetable aisles for visual appeal and profitability.', 'Geared toward retail managers. Learn shelf-life management on the floor, visual merchandising, and pricing strategies for fresh food.', 'Retail', 'GlobalTrade Inc', '2 days', 'Intermediate', 5000, 4000, 'RETAILPRO', 'course_images/supermarket_retail.jpg', 'active', '2026-12-05', '2026-12-06', 60, 'coursehub@upi', 'Use coupon RETAILPRO at checkout.', 1, 1),
('CRS-011', 'Organic Certification & Quality Compliance', 'Navigate the paperwork and audits needed for certified organic produce.', 'A dedicated workshop on passing organic audits, keeping proper records, and maintaining quality compliance for premium market access.', 'Quality', 'Dr. Anita Desai', '1 day', 'Beginner', 2000, 1500, 'QUALITY10', 'course_images/organic_certification.jpg', 'active', '2026-12-10', '2026-12-10', 100, 'coursehub@upi', 'Use coupon QUALITY10 at checkout.', 1, 1),
('CRS-012', 'Agri-Tech & Smart Farming', 'Integrate IoT and automation into your fresh produce farming business.', 'Learn how to use smart sensors, automated irrigation, and data analytics to dramatically improve your farm''s yield and efficiency.', 'Technology', 'Rahul Verma', '3 days', 'Advanced', 12000, 9000, 'AGRITECH', 'course_images/agri_tech_smart.jpg', 'active', '2026-12-15', '2026-12-17', 40, 'coursehub@upi', 'Use coupon AGRITECH at checkout.', 1, 1),
('CRS-013', 'Post-Harvest Processing for Leafy Greens', 'Specialized course on washing, cutting, and bagging fresh leafy greens.', 'Leafy greens are highly profitable but fragile. Learn the exact processing workflows for bagged salads and pre-cut greens.', 'Processing', 'Chef Meera', '2 days', 'Intermediate', 6000, 4500, 'GREENS15', 'course_images/leafy_greens_processing.jpg', 'active', '2026-12-20', '2026-12-21', 50, 'coursehub@upi', 'Use coupon GREENS15 at checkout.', 1, 1),
('CRS-014', 'Cold Chain Logistics & Warehousing', 'Design and manage a temperature-controlled distribution network.', 'A logistical deep-dive into cold chain infrastructure. Protect your fresh produce investments by mastering warehouse temperature zones and refrigerated transport.', 'Logistics', 'Rahul Verma', '3 days', 'Advanced', 8000, 6500, 'COLDCHAIN', 'course_images/cold_chain_logistics.jpg', 'active', '2027-01-05', '2027-01-07', 50, 'coursehub@upi', 'Use coupon COLDCHAIN at checkout.', 1, 1),
('CRS-015', 'Direct-To-Consumer (D2C) Fresh Produce Sales', 'Bypass middlemen and sell fresh produce directly to households.', 'Build a profitable D2C vegetable subscription box or farm-to-table delivery service. Covers marketing, local logistics, and customer retention.', 'Marketing', 'GlobalTrade Inc', '2 days', 'Intermediate', 5500, 4000, 'D2CSALES', 'course_images/d2c_fresh_produce.jpg', 'active', '2027-01-10', '2027-01-11', 70, 'coursehub@upi', 'Use coupon D2CSALES at checkout.', 1, 1);

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
('L1', 'CRS-001', 'Day 1', 1, 'Post-Harvest Physiology', 'jNQXAC9IVRw', '20 min', 1),
('L2', 'CRS-001', 'Day 1', 2, 'Sorting and Grading', 'jNQXAC9IVRw', '20 min', 1),
('L3', 'CRS-001', 'Day 2', 3, 'Cold Storage Technologies', 'jNQXAC9IVRw', '20 min', 1),
('L4', 'CRS-001', 'Day 2', 4, 'Spoilage Prevention', 'jNQXAC9IVRw', '20 min', 1),
('L5', 'CRS-002', 'Day 1', 1, 'Produce Trading Basics', 'jNQXAC9IVRw', '20 min', 1),
('L6', 'CRS-002', 'Day 2', 2, 'Logistics & Transportation', 'jNQXAC9IVRw', '20 min', 1),
('L7', 'CRS-002', 'Day 3', 3, 'Building a Vendor Network', 'jNQXAC9IVRw', '20 min', 1),
('L8', 'CRS-003', 'Day 1', 1, 'Intro to Value Addition', 'jNQXAC9IVRw', '20 min', 1),
('L9', 'CRS-003', 'Day 2', 2, 'Food Processing Methods', 'jNQXAC9IVRw', '20 min', 1),
('L10', 'CRS-003', 'Day 3', 3, 'Packaging & Shelf-life', 'jNQXAC9IVRw', '20 min', 1),
('L11', 'CRS-003', 'Day 4', 4, 'Branding & Sales', 'jNQXAC9IVRw', '20 min', 1),
('L12', 'CRS-004', 'Day 1', 1, 'Soil Health & Organic Principles', 'jNQXAC9IVRw', '20 min', 1),
('L13', 'CRS-004', 'Day 2', 2, 'Certification & Premium Pricing', 'jNQXAC9IVRw', '20 min', 1),
('L14', 'CRS-005', 'Day 1', 1, 'International Market Research', 'jNQXAC9IVRw', '20 min', 1),
('L15', 'CRS-005', 'Day 2', 2, 'Quality & Phytosanitary Standards', 'jNQXAC9IVRw', '20 min', 1),
('L16', 'CRS-005', 'Day 3', 3, 'Export Documentation & Shipping', 'jNQXAC9IVRw', '20 min', 1),
('L17', 'CRS-006', 'Day 1', 1, 'Lean Logistics', 'jNQXAC9IVRw', '20 min', 1),
('L18', 'CRS-006', 'Day 2', 2, 'Route Optimization and Tech', 'jNQXAC9IVRw', '20 min', 1),
('L19', 'CRS-007', 'Day 1', 1, 'System Design Basics', 'jNQXAC9IVRw', '20 min', 1),
('L20', 'CRS-007', 'Day 2', 2, 'Nutrient Control', 'jNQXAC9IVRw', '20 min', 1),
('L21', 'CRS-007', 'Day 3', 3, 'Yield Optimization', 'jNQXAC9IVRw', '20 min', 1),
('L22', 'CRS-008', 'Day 1', 1, 'Intro to Vertical Farming', 'jNQXAC9IVRw', '20 min', 1),
('L23', 'CRS-008', 'Day 2', 2, 'Space and Light Management', 'jNQXAC9IVRw', '20 min', 1),
('L24', 'CRS-009', 'Day 1', 1, 'Mycology and Substrates', 'jNQXAC9IVRw', '20 min', 1),
('L25', 'CRS-009', 'Day 2', 2, 'Harvesting and Marketing', 'jNQXAC9IVRw', '20 min', 1),
('L26', 'CRS-010', 'Day 1', 1, 'Visual Merchandising', 'jNQXAC9IVRw', '20 min', 1),
('L27', 'CRS-010', 'Day 2', 2, 'Retail Loss Prevention', 'jNQXAC9IVRw', '20 min', 1),
('L28', 'CRS-011', 'Day 1', 1, 'Compliance and Auditing', 'jNQXAC9IVRw', '20 min', 1),
('L29', 'CRS-012', 'Day 1', 1, 'Intro to Agri-Tech Sensors', 'jNQXAC9IVRw', '20 min', 1),
('L30', 'CRS-012', 'Day 2', 2, 'Automated Irrigation', 'jNQXAC9IVRw', '20 min', 1),
('L31', 'CRS-012', 'Day 3', 3, 'Data-Driven Farming', 'jNQXAC9IVRw', '20 min', 1),
('L32', 'CRS-013', 'Day 1', 1, 'Safe Washing Methods', 'jNQXAC9IVRw', '20 min', 1),
('L33', 'CRS-013', 'Day 2', 2, 'Modified Atmosphere Packaging', 'jNQXAC9IVRw', '20 min', 1),
('L34', 'CRS-014', 'Day 1', 1, 'Facility Design', 'jNQXAC9IVRw', '20 min', 1),
('L35', 'CRS-014', 'Day 2', 2, 'Transportation Management', 'jNQXAC9IVRw', '20 min', 1),
('L36', 'CRS-014', 'Day 3', 3, 'Cold Chain Economics', 'jNQXAC9IVRw', '20 min', 1),
('L37', 'CRS-015', 'Day 1', 1, 'Building a Subscription Model', 'jNQXAC9IVRw', '20 min', 1),
('L38', 'CRS-015', 'Day 2', 2, 'Digital Marketing for Farmers', 'jNQXAC9IVRw', '20 min', 1);

INSERT INTO students (id, full_name, dob, gender, email, mobile, whatsapp, address, city, state, pincode, qualification, institution, occupation, password, reg_date) VALUES
('STU-2026-0001', 'Priya Sharma', '2001-05-14', 'Female', 'priya@example.com', '9876543210', '9876543210', '12 Lake View Street', 'Chennai', 'Tamil Nadu', '600028', 'Bachelor''s Degree', 'Anna University', 'Student', 'demo123', '2026-08-10');

INSERT INTO registrations (id, student_id, course_id, date, status, progress_percent) VALUES
('REG-1001', 'STU-2026-0001', 'CRS-001', '2026-10-01', 'active', 0);

INSERT INTO payments (id, student_id, course_id, reg_id, amount, date, status, ref_id) VALUES
('PAY-2001', 'STU-2026-0001', 'CRS-001', 'REG-1001', 2500.00, '2026-10-01', 'Verified', 'UPI2026081099887');

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
('SCH-15', 'CRS-015', '2027-01-10', '10:00', 'Live Kickoff Session', 'Welcome to Direct-To-Consumer (D2C) Fresh Produce Sales', 'GlobalTrade Inc', 'https://youtube.com', 'Upcoming');
