const fs = require('fs');
let html = fs.readFileSync('coursehub.html', 'utf8');

// The projects made everything click...
html = html.replace(/"The projects made everything click\. I built my first real website in the second[\s\S]*?week\."/g, '"The hands-on training made everything click. I built my first commercial farm in the second month."');

// Web Development Bootcamp
html = html.replace(/Web[\s\S]*?Development Bootcamp/g, 'Hydroponic Vegetable Farming');

// Clear explanations...
html = html.replace(/"Clear explanations and a genuinely supportive instructor\. Worth every rupee\."/g, '"Clear explanations on B2B logistics and a genuinely supportive instructor. Worth every rupee."');

// Data Science with Python
html = html.replace(/Data Science with[\s\S]*?Python/g, 'Fresh Produce Trading');

// I could learn on my own schedule...
html = html.replace(/"I could learn on my own schedule and still get help whenever I needed it\."/g, '"I could learn organic certification on my own schedule and start applying it to my farm."');

// Digital Marketing Mastery
html = html.replace(/Digital Marketing[\s\S]*?Mastery/g, 'Organic Farming Business');

// lead text
html = html.replace(/CourseHub Academy helps you gain real, job-ready skills through expert-led courses, hands-on[\s\S]*?projects and a supportive learning community [^]+? at your own pace\./g, 'Grow your agricultural enterprise with industry-leading offline and online courses covering farming, logistics, value addition, and direct-to-consumer sales.');

fs.writeFileSync('coursehub.html', html);
console.log('Testimonials and descriptions updated.');
