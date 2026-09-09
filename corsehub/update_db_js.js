const fs = require('fs');
let dbjs = fs.readFileSync('database.js', 'utf8');

dbjs = dbjs.replace(/const courses=\[[\s\S]*?\];/, `const courses=[
    {id:'CRS-001',name:'Food and Vegetable Business Development',shortDesc:'Start and scale a profitable fresh produce business. Available Online & Offline.',
     fullDesc:'This 3-day comprehensive program covers sourcing, supply chain logistics, inventory management, and marketing for fresh food and vegetable businesses. You can attend our offline campus or join the interactive online sessions.',
     category:'Business Development',instructor:'Industry Experts',duration:'3 days',level:'Beginner',price:5000,discountPrice:3500,couponCode:'VEGSTART',
     image:'',status:'active',startDate:'2026-10-01',endDate:'2026-10-03',maxStudents:100,
     upiId:'coursehub@upi',paymentInstructions:'Use coupon code VEGSTART during payment submission. Pay via UPI and submit reference.',
     certEligible:true,registrationOpen:true,
     syllabus:['Day 1: Sourcing & Supply Chain','Day 2: Quality Control & Inventory','Day 3: Sales, Marketing & Scaling']}
  ];`);

dbjs = dbjs.replace(/const lessons=\[[\s\S]*?\];/, `const lessons=[
    {id:'L1',courseId:'CRS-001',module:'Day 1',order:1,lessonTitle:'Welcome & Industry Overview',youtubeUrl:'jNQXAC9IVRw',duration:'15 min',enabled:true},
    {id:'L2',courseId:'CRS-001',module:'Day 1',order:2,lessonTitle:'Vendor Negotiation Basics',youtubeUrl:'jNQXAC9IVRw',duration:'20 min',enabled:true},
    {id:'L3',courseId:'CRS-001',module:'Day 2',order:3,lessonTitle:'Quality Control & Freshness',youtubeUrl:'jNQXAC9IVRw',duration:'25 min',enabled:true},
    {id:'L4',courseId:'CRS-001',module:'Day 3',order:4,lessonTitle:'Sales & Scaling Strategies',youtubeUrl:'jNQXAC9IVRw',duration:'30 min',enabled:true}
  ];`);

dbjs = dbjs.replace(/const registrations=\[[\s\S]*?\];/, `const registrations=[
    {id:'REG-1001',studentId:'STU-2026-0001',courseId:'CRS-001',date:'2026-08-10',status:'active',progressPercent:25}
  ];`);

dbjs = dbjs.replace(/const payments=\[[\s\S]*?\];/, `const payments=[
    {id:'PAY-2001',studentId:'STU-2026-0001',courseId:'CRS-001',regId:'REG-1001',amount:3500,date:'2026-08-10',status:'Verified',refId:'UPI2026081099887'}
  ];`);

dbjs = dbjs.replace(/const progress=\[[\s\S]*?\];/, `const progress=[
    {studentId:'STU-2026-0001',courseId:'CRS-001',completed:['L1']}
  ];`);

dbjs = dbjs.replace(/const certificates=\[[\s\S]*?\];/, `const certificates=[];`);

dbjs = dbjs.replace(/const schedules=\[[\s\S]*?\];/, `const schedules=[
    {id:'SCH-1',courseId:'CRS-001',date:'2026-10-01',time:'10:00',title:'Day 1 Live Offline/Online Kickoff',description:'Welcome to the business development course.',instructor:'Industry Experts',link:'https://youtube.com',status:'Upcoming'}
  ];`);

dbjs = dbjs.replace(/level: c.level, price: Number\(c.price\), discountPrice: Number\(c.discount_price\),/, "level: c.level, price: Number(c.price), discountPrice: Number(c.discount_price), couponCode: c.coupon_code || '',");

fs.writeFileSync('database.js', dbjs);
console.log('database.js updated');
