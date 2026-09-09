/* ===================== COURSE IMAGE MAPPINGS & AUTO-HEALER ===================== */
const COURSE_IMAGE_MAP = {
  'CRS-001': 'course_images/harvest_storage.jpg',
  'CRS-002': 'course_images/fresh_produce_trading.jpg',
  'CRS-003': 'course_images/value_addition.jpg',
  'CRS-004': 'course_images/organic_farming.jpg',
  'CRS-005': 'course_images/agri_export.jpg',
  'CRS-006': 'course_images/supply_chain.jpg',
  'CRS-007': 'course_images/hydroponic_farming.jpg',
  'CRS-008': 'course_images/urban_vertical_farming.jpg',
  'CRS-009': 'course_images/mushroom_cultivation.jpg',
  'CRS-010': 'course_images/supermarket_retail.jpg',
  'CRS-011': 'course_images/organic_certification.jpg',
  'CRS-012': 'course_images/agri_tech_smart.jpg',
  'CRS-013': 'course_images/leafy_greens_processing.jpg',
  'CRS-014': 'course_images/cold_chain_logistics.jpg',
  'CRS-015': 'course_images/d2c_fresh_produce.jpg'
};

function healCourseImages(dbObj){
  if(!dbObj || !Array.isArray(dbObj.courses)) return false;
  let changed = false;
  dbObj.courses.forEach(c => {
    if(COURSE_IMAGE_MAP[c.id] && c.image !== COURSE_IMAGE_MAP[c.id]){
      c.image = COURSE_IMAGE_MAP[c.id];
      changed = true;
    }
  });
  return changed;
}

/* ===================== 1. DATA MANAGEMENT ===================== */
const DB_KEY='cp_db_v2';
let DB=null;

function pad(n,len){return String(n).padStart(len,'0');}
function uid(p){return p+'_'+Math.random().toString(36).slice(2,10);}

function seedDB(){
  const YT='jNQXAC9IVRw';
  const courses=[
  {
    id: "CRS-001",
    name: "Harvest Management & Storage",
    shortDesc: "Learn post-harvest handling, cold storage techniques, and spoilage prevention.",
    fullDesc: "Maximize your produce shelf-life with advanced post-harvest techniques. Covers sorting, grading, temperature control, and modern cold storage. Available online and offline.",
    category: "Post-Harvest",
    instructor: "Dr. Anita Desai",
    duration: "2 days",
    level: "Beginner",
    price: 4000,
    discountPrice: 2500,
    couponCode: "HARVEST20",
    image: "course_images/harvest_storage.jpg",
    status: "active",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    maxStudents: 50,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon HARVEST20 at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Post-Harvest Physiology",
      "Day 1: Sorting and Grading",
      "Day 2: Cold Storage Technologies",
      "Day 2: Spoilage Prevention"
    ]
  },
  {
    id: "CRS-002",
    name: "Fresh Produce Trading & Distribution",
    shortDesc: "Master B2B/B2C trading, logistics, vendor networking, and fresh distribution.",
    fullDesc: "A comprehensive guide to the business of moving fresh produce from farm to market. Covers logistics, finding buyers, route optimization, and profit margins. Available online and offline.",
    category: "Logistics",
    instructor: "Rahul Verma",
    duration: "3 days",
    level: "Intermediate",
    price: 6000,
    discountPrice: 4500,
    couponCode: "TRADEPRO",
    image: "course_images/fresh_produce_trading.jpg",
    status: "active",
    startDate: "2026-10-15",
    endDate: "2026-10-17",
    maxStudents: 80,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon TRADEPRO at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Produce Trading Basics",
      "Day 2: Logistics & Transportation",
      "Day 3: Building a Vendor Network"
    ]
  },
  {
    id: "CRS-003",
    name: "Fruit and Vegetable Value Addition",
    shortDesc: "Process, package, and brand fresh produce into high-value market products.",
    fullDesc: "Transform raw fruits and vegetables into lucrative packaged goods like jams, dried snacks, purees, and cold-pressed juices. Learn food safety and branding. Available online and offline.",
    category: "Value Addition",
    instructor: "Chef Meera",
    duration: "4 days",
    level: "Intermediate",
    price: 8000,
    discountPrice: 6000,
    couponCode: "VALUE50",
    image: "course_images/value_addition.jpg",
    status: "active",
    startDate: "2026-10-20",
    endDate: "2026-10-23",
    maxStudents: 40,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon VALUE50 at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Intro to Value Addition",
      "Day 2: Food Processing Methods",
      "Day 3: Packaging & Shelf-life",
      "Day 4: Branding & Sales"
    ]
  },
  {
    id: "CRS-004",
    name: "Organic Farming Business Basics",
    shortDesc: "Start a commercial organic farm, get certified, and access premium markets.",
    fullDesc: "Learn the business side of organic farming. From soil health and natural pest control to organic certification processes and selling at a premium. Available online and offline.",
    category: "Farming",
    instructor: "Kisan Partners",
    duration: "2 days",
    level: "Beginner",
    price: 3000,
    discountPrice: 2000,
    couponCode: "ORGANIC",
    image: "course_images/organic_farming.jpg",
    status: "active",
    startDate: "2026-11-01",
    endDate: "2026-11-02",
    maxStudents: 100,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon ORGANIC at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Soil Health & Organic Principles",
      "Day 2: Certification & Premium Pricing"
    ]
  },
  {
    id: "CRS-005",
    name: "Agri-Export & Global Supply Chain",
    shortDesc: "Take your fresh produce business global with export training and quality standards.",
    fullDesc: "Navigate the complex world of agricultural exports. Understand international compliance, phytosanitary standards, export documentation, and global shipping. Available online and offline.",
    category: "Export",
    instructor: "GlobalTrade Inc",
    duration: "3 days",
    level: "Advanced",
    price: 10000,
    discountPrice: 7500,
    couponCode: "GLOBAL",
    image: "course_images/agri_export.jpg",
    status: "active",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    maxStudents: 30,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon GLOBAL at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: International Market Research",
      "Day 2: Quality & Phytosanitary Standards",
      "Day 3: Export Documentation & Shipping"
    ]
  },
  {
    id: "CRS-006",
    name: "Supply Chain Optimization for Fresh Produce",
    shortDesc: "Reduce waste and increase profits through lean supply chain strategies.",
    fullDesc: "Learn to identify bottlenecks and optimize transportation, packing, and distribution times for perishable goods. Essential for high-volume produce distributors.",
    category: "Logistics",
    instructor: "Rahul Verma",
    duration: "2 days",
    level: "Intermediate",
    price: 5000,
    discountPrice: 3500,
    couponCode: "SUPPLY20",
    image: "course_images/supply_chain.jpg",
    status: "active",
    startDate: "2026-11-15",
    endDate: "2026-11-16",
    maxStudents: 60,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon SUPPLY20 at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Lean Logistics",
      "Day 2: Route Optimization and Tech"
    ]
  },
  {
    id: "CRS-007",
    name: "Hydroponic Vegetable Farming for Profit",
    shortDesc: "Build a profitable soil-less farming system for high-yield leafy greens.",
    fullDesc: "A deep dive into commercial hydroponics. Learn nutrient management, lighting, system design, and the business economics of indoor farming.",
    category: "Farming",
    instructor: "Dr. Anita Desai",
    duration: "3 days",
    level: "Advanced",
    price: 8500,
    discountPrice: 6500,
    couponCode: "HYDROPONIC",
    image: "course_images/hydroponic_farming.jpg",
    status: "active",
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    maxStudents: 40,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon HYDROPONIC at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: System Design Basics",
      "Day 2: Nutrient Control",
      "Day 3: Yield Optimization"
    ]
  },
  {
    id: "CRS-008",
    name: "Urban Agriculture & Vertical Farming",
    shortDesc: "Maximize limited space by growing fresh produce in urban environments.",
    fullDesc: "Learn the techniques and business models for vertical farming in cities. Turn unused urban spaces into profitable fresh produce businesses.",
    category: "Farming",
    instructor: "Kisan Partners",
    duration: "2 days",
    level: "Beginner",
    price: 4500,
    discountPrice: 3000,
    couponCode: "URBANFARM",
    image: "course_images/urban_vertical_farming.jpg",
    status: "active",
    startDate: "2026-11-25",
    endDate: "2026-11-26",
    maxStudents: 50,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon URBANFARM at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Intro to Vertical Farming",
      "Day 2: Space and Light Management"
    ]
  },
  {
    id: "CRS-009",
    name: "Mushroom Cultivation Business",
    shortDesc: "Launch a highly profitable, low-footprint commercial mushroom farm.",
    fullDesc: "Discover the secrets of commercial mushroom cultivation. Focuses on Oyster, Button, and specialty mushrooms, plus packaging and retail.",
    category: "Farming",
    instructor: "Kisan Partners",
    duration: "2 days",
    level: "Beginner",
    price: 3500,
    discountPrice: 2500,
    couponCode: "MUSHROOM",
    image: "course_images/mushroom_cultivation.jpg",
    status: "active",
    startDate: "2026-12-01",
    endDate: "2026-12-02",
    maxStudents: 80,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon MUSHROOM at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Mycology and Substrates",
      "Day 2: Harvesting and Marketing"
    ]
  },
  {
    id: "CRS-010",
    name: "Supermarket Fresh Produce Retail Management",
    shortDesc: "Optimize supermarket vegetable aisles for visual appeal and profitability.",
    fullDesc: "Geared toward retail managers. Learn shelf-life management on the floor, visual merchandising, and pricing strategies for fresh food.",
    category: "Retail",
    instructor: "GlobalTrade Inc",
    duration: "2 days",
    level: "Intermediate",
    price: 5000,
    discountPrice: 4000,
    couponCode: "RETAILPRO",
    image: "course_images/supermarket_retail.jpg",
    status: "active",
    startDate: "2026-12-05",
    endDate: "2026-12-06",
    maxStudents: 60,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon RETAILPRO at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Visual Merchandising",
      "Day 2: Retail Loss Prevention"
    ]
  },
  {
    id: "CRS-011",
    name: "Organic Certification & Quality Compliance",
    shortDesc: "Navigate the paperwork and audits needed for certified organic produce.",
    fullDesc: "A dedicated workshop on passing organic audits, keeping proper records, and maintaining quality compliance for premium market access.",
    category: "Quality",
    instructor: "Dr. Anita Desai",
    duration: "1 day",
    level: "Beginner",
    price: 2000,
    discountPrice: 1500,
    couponCode: "QUALITY10",
    image: "course_images/organic_certification.jpg",
    status: "active",
    startDate: "2026-12-10",
    endDate: "2026-12-10",
    maxStudents: 100,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon QUALITY10 at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Compliance and Auditing"
    ]
  },
  {
    id: "CRS-012",
    name: "Agri-Tech & Smart Farming",
    shortDesc: "Integrate IoT and automation into your fresh produce farming business.",
    fullDesc: "Learn how to use smart sensors, automated irrigation, and data analytics to dramatically improve your farm's yield and efficiency.",
    category: "Technology",
    instructor: "Rahul Verma",
    duration: "3 days",
    level: "Advanced",
    price: 12000,
    discountPrice: 9000,
    couponCode: "AGRITECH",
    image: "course_images/agri_tech_smart.jpg",
    status: "active",
    startDate: "2026-12-15",
    endDate: "2026-12-17",
    maxStudents: 40,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon AGRITECH at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Intro to Agri-Tech Sensors",
      "Day 2: Automated Irrigation",
      "Day 3: Data-Driven Farming"
    ]
  },
  {
    id: "CRS-013",
    name: "Post-Harvest Processing for Leafy Greens",
    shortDesc: "Specialized course on washing, cutting, and bagging fresh leafy greens.",
    fullDesc: "Leafy greens are highly profitable but fragile. Learn the exact processing workflows for bagged salads and pre-cut greens.",
    category: "Processing",
    instructor: "Chef Meera",
    duration: "2 days",
    level: "Intermediate",
    price: 6000,
    discountPrice: 4500,
    couponCode: "GREENS15",
    image: "course_images/leafy_greens_processing.jpg",
    status: "active",
    startDate: "2026-12-20",
    endDate: "2026-12-21",
    maxStudents: 50,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon GREENS15 at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Safe Washing Methods",
      "Day 2: Modified Atmosphere Packaging"
    ]
  },
  {
    id: "CRS-014",
    name: "Cold Chain Logistics & Warehousing",
    shortDesc: "Design and manage a temperature-controlled distribution network.",
    fullDesc: "A logistical deep-dive into cold chain infrastructure. Protect your fresh produce investments by mastering warehouse temperature zones and refrigerated transport.",
    category: "Logistics",
    instructor: "Rahul Verma",
    duration: "3 days",
    level: "Advanced",
    price: 8000,
    discountPrice: 6500,
    couponCode: "COLDCHAIN",
    image: "course_images/cold_chain_logistics.jpg",
    status: "active",
    startDate: "2027-01-05",
    endDate: "2027-01-07",
    maxStudents: 50,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon COLDCHAIN at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Facility Design",
      "Day 2: Transportation Management",
      "Day 3: Cold Chain Economics"
    ]
  },
  {
    id: "CRS-015",
    name: "Direct-To-Consumer (D2C) Fresh Produce Sales",
    shortDesc: "Bypass middlemen and sell fresh produce directly to households.",
    fullDesc: "Build a profitable D2C vegetable subscription box or farm-to-table delivery service. Covers marketing, local logistics, and customer retention.",
    category: "Marketing",
    instructor: "GlobalTrade Inc",
    duration: "2 days",
    level: "Intermediate",
    price: 5500,
    discountPrice: 4000,
    couponCode: "D2CSALES",
    image: "course_images/d2c_fresh_produce.jpg",
    status: "active",
    startDate: "2027-01-10",
    endDate: "2027-01-11",
    maxStudents: 70,
    upiId: "coursehub@upi",
    paymentInstructions: "Use coupon D2CSALES at checkout.",
    certEligible: true,
    registrationOpen: true,
    syllabus: [
      "Day 1: Building a Subscription Model",
      "Day 2: Digital Marketing for Farmers"
    ]
  }
];
  const lessons=[
  {
    id: "L1",
    courseId: "CRS-001",
    module: "Day 1",
    order: 1,
    lessonTitle: "Post-Harvest Physiology",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L2",
    courseId: "CRS-001",
    module: "Day 1",
    order: 2,
    lessonTitle: "Sorting and Grading",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L3",
    courseId: "CRS-001",
    module: "Day 2",
    order: 3,
    lessonTitle: "Cold Storage Technologies",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L4",
    courseId: "CRS-001",
    module: "Day 2",
    order: 4,
    lessonTitle: "Spoilage Prevention",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L5",
    courseId: "CRS-002",
    module: "Day 1",
    order: 1,
    lessonTitle: "Produce Trading Basics",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L6",
    courseId: "CRS-002",
    module: "Day 2",
    order: 2,
    lessonTitle: "Logistics & Transportation",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L7",
    courseId: "CRS-002",
    module: "Day 3",
    order: 3,
    lessonTitle: "Building a Vendor Network",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L8",
    courseId: "CRS-003",
    module: "Day 1",
    order: 1,
    lessonTitle: "Intro to Value Addition",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L9",
    courseId: "CRS-003",
    module: "Day 2",
    order: 2,
    lessonTitle: "Food Processing Methods",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L10",
    courseId: "CRS-003",
    module: "Day 3",
    order: 3,
    lessonTitle: "Packaging & Shelf-life",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L11",
    courseId: "CRS-003",
    module: "Day 4",
    order: 4,
    lessonTitle: "Branding & Sales",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L12",
    courseId: "CRS-004",
    module: "Day 1",
    order: 1,
    lessonTitle: "Soil Health & Organic Principles",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L13",
    courseId: "CRS-004",
    module: "Day 2",
    order: 2,
    lessonTitle: "Certification & Premium Pricing",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L14",
    courseId: "CRS-005",
    module: "Day 1",
    order: 1,
    lessonTitle: "International Market Research",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L15",
    courseId: "CRS-005",
    module: "Day 2",
    order: 2,
    lessonTitle: "Quality & Phytosanitary Standards",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L16",
    courseId: "CRS-005",
    module: "Day 3",
    order: 3,
    lessonTitle: "Export Documentation & Shipping",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L17",
    courseId: "CRS-006",
    module: "Day 1",
    order: 1,
    lessonTitle: "Lean Logistics",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L18",
    courseId: "CRS-006",
    module: "Day 2",
    order: 2,
    lessonTitle: "Route Optimization and Tech",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L19",
    courseId: "CRS-007",
    module: "Day 1",
    order: 1,
    lessonTitle: "System Design Basics",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L20",
    courseId: "CRS-007",
    module: "Day 2",
    order: 2,
    lessonTitle: "Nutrient Control",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L21",
    courseId: "CRS-007",
    module: "Day 3",
    order: 3,
    lessonTitle: "Yield Optimization",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L22",
    courseId: "CRS-008",
    module: "Day 1",
    order: 1,
    lessonTitle: "Intro to Vertical Farming",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L23",
    courseId: "CRS-008",
    module: "Day 2",
    order: 2,
    lessonTitle: "Space and Light Management",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L24",
    courseId: "CRS-009",
    module: "Day 1",
    order: 1,
    lessonTitle: "Mycology and Substrates",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L25",
    courseId: "CRS-009",
    module: "Day 2",
    order: 2,
    lessonTitle: "Harvesting and Marketing",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L26",
    courseId: "CRS-010",
    module: "Day 1",
    order: 1,
    lessonTitle: "Visual Merchandising",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L27",
    courseId: "CRS-010",
    module: "Day 2",
    order: 2,
    lessonTitle: "Retail Loss Prevention",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L28",
    courseId: "CRS-011",
    module: "Day 1",
    order: 1,
    lessonTitle: "Compliance and Auditing",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L29",
    courseId: "CRS-012",
    module: "Day 1",
    order: 1,
    lessonTitle: "Intro to Agri-Tech Sensors",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L30",
    courseId: "CRS-012",
    module: "Day 2",
    order: 2,
    lessonTitle: "Automated Irrigation",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L31",
    courseId: "CRS-012",
    module: "Day 3",
    order: 3,
    lessonTitle: "Data-Driven Farming",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L32",
    courseId: "CRS-013",
    module: "Day 1",
    order: 1,
    lessonTitle: "Safe Washing Methods",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L33",
    courseId: "CRS-013",
    module: "Day 2",
    order: 2,
    lessonTitle: "Modified Atmosphere Packaging",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L34",
    courseId: "CRS-014",
    module: "Day 1",
    order: 1,
    lessonTitle: "Facility Design",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L35",
    courseId: "CRS-014",
    module: "Day 2",
    order: 2,
    lessonTitle: "Transportation Management",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L36",
    courseId: "CRS-014",
    module: "Day 3",
    order: 3,
    lessonTitle: "Cold Chain Economics",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L37",
    courseId: "CRS-015",
    module: "Day 1",
    order: 1,
    lessonTitle: "Building a Subscription Model",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  },
  {
    id: "L38",
    courseId: "CRS-015",
    module: "Day 2",
    order: 2,
    lessonTitle: "Digital Marketing for Farmers",
    youtubeUrl: "jNQXAC9IVRw",
    duration: "20 min",
    enabled: true
  }
];
  const students=[
    {id:'STU-2026-0001',fullName:'Priya Sharma',dob:'2001-05-14',gender:'Female',email:'priya@example.com',mobile:'9876543210',whatsapp:'9876543210',
     address:'12 Lake View Street',city:'Chennai',state:'Tamil Nadu',pincode:'600028',qualification:"Bachelor's Degree",institution:'Anna University',
     occupation:'Student',password:'demo123',regDate:'2026-08-10'},
    {id:'STU-2026-0002',fullName:'Karthik Rajan',dob:'1999-11-02',gender:'Male',email:'karthik@example.com',mobile:'9123456780',whatsapp:'9123456780',
     address:'45 MG Road',city:'Bengaluru',state:'Karnataka',pincode:'560001',qualification:"Master's Degree",institution:'IIT Madras',
     occupation:'Working Professional',password:'demo123',regDate:'2026-08-05'}
  ];
  const registrations=[{id:'REG-1001',studentId:'STU-2026-0001',courseId:'CRS-001',date:'2026-10-01',status:'active',progressPercent:0}];
  const payments=[{id:'PAY-2001',studentId:'STU-2026-0001',courseId:'CRS-001',regId:'REG-1001',amount:2500,date:'2026-10-01',status:'Verified',refId:'UPI123'}];
  const progress=[{studentId:'STU-2026-0001',courseId:'CRS-001',completed:[]}];
  const certificates=[];
  const schedules=[
  {
    id: "SCH-1",
    courseId: "CRS-001",
    date: "2026-10-10",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Harvest Management & Storage",
    instructor: "Dr. Anita Desai",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-2",
    courseId: "CRS-002",
    date: "2026-10-15",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Fresh Produce Trading & Distribution",
    instructor: "Rahul Verma",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-3",
    courseId: "CRS-003",
    date: "2026-10-20",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Fruit and Vegetable Value Addition",
    instructor: "Chef Meera",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-4",
    courseId: "CRS-004",
    date: "2026-11-01",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Organic Farming Business Basics",
    instructor: "Kisan Partners",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-5",
    courseId: "CRS-005",
    date: "2026-11-10",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Agri-Export & Global Supply Chain",
    instructor: "GlobalTrade Inc",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-6",
    courseId: "CRS-006",
    date: "2026-11-15",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Supply Chain Optimization for Fresh Produce",
    instructor: "Rahul Verma",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-7",
    courseId: "CRS-007",
    date: "2026-11-20",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Hydroponic Vegetable Farming for Profit",
    instructor: "Dr. Anita Desai",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-8",
    courseId: "CRS-008",
    date: "2026-11-25",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Urban Agriculture & Vertical Farming",
    instructor: "Kisan Partners",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-9",
    courseId: "CRS-009",
    date: "2026-12-01",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Mushroom Cultivation Business",
    instructor: "Kisan Partners",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-10",
    courseId: "CRS-010",
    date: "2026-12-05",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Supermarket Fresh Produce Retail Management",
    instructor: "GlobalTrade Inc",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-11",
    courseId: "CRS-011",
    date: "2026-12-10",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Organic Certification & Quality Compliance",
    instructor: "Dr. Anita Desai",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-12",
    courseId: "CRS-012",
    date: "2026-12-15",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Agri-Tech & Smart Farming",
    instructor: "Rahul Verma",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-13",
    courseId: "CRS-013",
    date: "2026-12-20",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Post-Harvest Processing for Leafy Greens",
    instructor: "Chef Meera",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-14",
    courseId: "CRS-014",
    date: "2027-01-05",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Cold Chain Logistics & Warehousing",
    instructor: "Rahul Verma",
    link: "https://youtube.com",
    status: "Upcoming"
  },
  {
    id: "SCH-15",
    courseId: "CRS-015",
    date: "2027-01-10",
    time: "10:00",
    title: "Live Kickoff Session",
    description: "Welcome to Direct-To-Consumer (D2C) Fresh Produce Sales",
    instructor: "GlobalTrade Inc",
    link: "https://youtube.com",
    status: "Upcoming"
  }
];
  const settings={
    orgName:'CourseHub Academy',tagline:'Learn. Build. Grow.',adminUsername:'admin',adminPassword:'admin123',
    studentSeq:2,certSeq:1,courseSeq:3,
    welcomeEmailTemplate:'Subject: Welcome to {{course_name}}!\n\nHi {{student_name}},\n\nWelcome to CourseHub Academy! Your registration for "{{course_name}}" ({{course_duration}}) is confirmed.\n\nYour Student ID: {{student_id}}\nLogin Email: {{login_email}}\n\nYou can log in anytime from the Student Login page using your email/Student ID and password.\n\nHappy learning!\nThe CourseHub Academy Team',
    certEmailTemplate:'Subject: Your Certificate for {{course_name}}\n\nHi {{student_name}},\n\nCongratulations on completing {{course_name}}!\n\nCertificate ID: {{certificate_id}}\nCompletion Date: {{completion_date}}\n\nYou can download your certificate anytime from your Student Dashboard.\n\nBest regards,\nThe CourseHub Academy Team'
  };
  return {courses,lessons,students,registrations,payments,progress,certificates,schedules,settings};
}

function loadDB(){
  const raw=localStorage.getItem(DB_KEY);
  if(raw){
    try{
      DB=JSON.parse(raw);
      if(healCourseImages(DB)) saveDB();
    }catch(e){
      DB=seedDB();
      saveDB();
    }
  } else {
    DB=seedDB();
    saveDB();
  }

  // 1. Try syncing from Supabase if configured
  if(typeof loadFromSupabase === 'function'){
    loadFromSupabase().then(() => {
      if(healCourseImages(DB)) saveDB();
    }).catch(()=>{});
  }

  // 2. Otherwise if connected to local Node server, fetch from SQLite
  if(typeof window !== 'undefined' && (location.protocol === 'http:' || location.protocol === 'https:')){
    fetch('/api/db')
      .then(res => res.ok ? res.json() : null)
      .then(remoteDb => {
        if(remoteDb && remoteDb.courses && remoteDb.courses.length > 0){
          DB = remoteDb;
          healCourseImages(DB);
          localStorage.setItem(DB_KEY, JSON.stringify(DB));
          if(typeof route === 'function') route();
        }
      })
      .catch(() => {});
  }
}

function saveDB(){
  localStorage.setItem(DB_KEY,JSON.stringify(DB));

  // Sync to Supabase if configured
  if(typeof saveToSupabase === 'function'){
    saveToSupabase().catch(()=>{});
  }

  // Sync to local server if running
  if(typeof window !== 'undefined' && typeof fetch === 'function' && (location.protocol === 'http:' || location.protocol === 'https:')){
    fetch('/api/sync', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(DB)
    }).catch(()=>{});
  }
}

// Supabase Async Load Helper
async function loadFromSupabase(){
  const client = (typeof supabaseClient !== 'undefined' && supabaseClient) || (typeof initSupabase === 'function' ? initSupabase() : null);
  if(!client) return false;
  try{
    const [coursesRes, syllabusRes, lessonsRes, studentsRes, regRes, payRes, progRes, certRes, schedRes, setRes] = await Promise.all([
      client.from('courses').select('*'),
      client.from('course_syllabus').select('*').order('order_num', { ascending: true }),
      client.from('lessons').select('*').order('order_num', { ascending: true }),
      client.from('students').select('*'),
      client.from('registrations').select('*'),
      client.from('payments').select('*'),
      client.from('student_lesson_progress').select('*'),
      client.from('certificates').select('*'),
      client.from('schedules').select('*'),
      client.from('settings').select('*').eq('id', 1).maybeSingle()
    ]);

    if(coursesRes.error || !coursesRes.data || coursesRes.data.length === 0) return false;

    const syllabusMap = {};
    (syllabusRes.data || []).forEach(s => {
      if(!syllabusMap[s.course_id]) syllabusMap[s.course_id] = [];
      syllabusMap[s.course_id].push(s.topic);
    });

    DB.courses = coursesRes.data.map(c => ({
      id: c.id, name: c.name, shortDesc: c.short_desc, fullDesc: c.full_desc,
      category: c.category, instructor: c.instructor, duration: c.duration,
      level: c.level, price: Number(c.price), discountPrice: Number(c.discount_price), couponCode: c.coupon_code || '',
      image: c.image || '', status: c.status, startDate: c.start_date, endDate: c.end_date,
      maxStudents: Number(c.max_students), upiId: c.upi_id, paymentInstructions: c.payment_instructions,
      certEligible: !!c.cert_eligible, registrationOpen: !!c.registration_open,
      syllabus: syllabusMap[c.id] || []
    }));

    if(lessonsRes.data) {
      DB.lessons = lessonsRes.data.map(l => ({
        id: l.id, courseId: l.course_id, module: l.module, order: Number(l.order_num),
        lessonTitle: l.lesson_title, youtubeUrl: l.youtube_url, duration: l.duration,
        enabled: !!l.enabled
      }));
    }

    if(studentsRes.data) {
      DB.students = studentsRes.data.map(s => ({
        id: s.id, fullName: s.full_name, dob: s.dob, gender: s.gender, email: s.email,
        mobile: s.mobile, whatsapp: s.whatsapp, address: s.address, city: s.city,
        state: s.state, pincode: s.pincode, qualification: s.qualification,
        institution: s.institution, occupation: s.occupation, password: s.password, regDate: s.reg_date
      }));
    }

    if(regRes.data) {
      DB.registrations = regRes.data.map(r => ({
        id: r.id, studentId: r.student_id, courseId: r.course_id, date: r.date,
        status: r.status, progressPercent: Number(r.progress_percent)
      }));
    }

    if(payRes.data) {
      DB.payments = payRes.data.map(p => ({
        id: p.id, studentId: p.student_id, courseId: p.course_id, regId: p.reg_id,
        amount: Number(p.amount), date: p.date, status: p.status, refId: p.ref_id || ''
      }));
    }

    if(progRes.data) {
      const progressGroup = {};
      progRes.data.forEach(r => {
        const k = `${r.student_id}___${r.course_id}`;
        if(!progressGroup[k]) progressGroup[k] = { studentId: r.student_id, courseId: r.course_id, completed: [] };
        progressGroup[k].completed.push(r.lesson_id);
      });
      DB.progress = Object.values(progressGroup);
    }

    if(certRes.data) {
      DB.certificates = certRes.data.map(c => ({
        id: c.id, studentId: c.student_id, courseId: c.course_id,
        studentName: c.student_name, courseName: c.course_name, completionDate: c.completion_date
      }));
    }

    if(schedRes.data) {
      DB.schedules = schedRes.data.map(s => ({
        id: s.id, courseId: s.course_id, date: s.date, time: s.time,
        title: s.title, description: s.description, instructor: s.instructor,
        link: s.link, status: s.status
      }));
    }

    if(setRes.data) {
      const s = setRes.data;
      DB.settings = {
        orgName: s.org_name, tagline: s.tagline, adminUsername: s.admin_username,
        adminPassword: s.admin_password, studentSeq: s.student_seq, certSeq: s.cert_seq,
        courseSeq: s.course_seq, welcomeEmailTemplate: s.welcome_email_template,
        certEmailTemplate: s.cert_email_template
      };
    }

    localStorage.setItem(DB_KEY, JSON.stringify(DB));
    if(typeof route === 'function') route();
    return true;
  }catch(err){
    console.warn('⚠️ Supabase load error:', err);
    return false;
  }
}

// Supabase Async Save Helper
async function saveToSupabase(){
  const client = (typeof supabaseClient !== 'undefined' && supabaseClient) || (typeof initSupabase === 'function' ? initSupabase() : null);
  if(!client) return;
  try{
    if(DB.students && DB.students.length){
      const payload = DB.students.map(s => ({
        id: s.id, full_name: s.fullName, dob: s.dob || null, gender: s.gender, email: s.email,
        mobile: s.mobile, whatsapp: s.whatsapp || '', address: s.address || '', city: s.city || '',
        state: s.state || '', pincode: s.pincode || '', qualification: s.qualification || '',
        institution: s.institution || '', occupation: s.occupation || '', password: s.password, reg_date: s.regDate
      }));
      await client.from('students').upsert(payload, { onConflict: 'id' });
    }
    if(DB.registrations && DB.registrations.length){
      const payload = DB.registrations.map(r => ({
        id: r.id, student_id: r.studentId, course_id: r.courseId, date: r.date,
        status: r.status, progress_percent: r.progressPercent
      }));
      await client.from('registrations').upsert(payload, { onConflict: 'id' });
    }
    if(DB.payments && DB.payments.length){
      const payload = DB.payments.map(p => ({
        id: p.id, student_id: p.studentId, course_id: p.courseId, reg_id: p.regId,
        amount: p.amount, date: p.date, status: p.status, ref_id: p.refId || ''
      }));
      await client.from('payments').upsert(payload, { onConflict: 'id' });
    }
  }catch(e){
    console.warn('⚠️ Supabase save error:', e);
  }
}

function nextStudentId(){const y=new Date().getFullYear();DB.settings.studentSeq++;return `STU-${y}-${pad(DB.settings.studentSeq,4)}`;}
function nextCertId(){const y=new Date().getFullYear();DB.settings.certSeq++;return `CERT-${y}-${pad(DB.settings.certSeq,5)}`;}
function nextCourseId(){DB.settings.courseSeq++;return `CRS-${pad(DB.settings.courseSeq,3)}`;}
