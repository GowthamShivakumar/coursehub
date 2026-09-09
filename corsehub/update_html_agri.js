const fs = require('fs');
let html = fs.readFileSync('coursehub.html', 'utf8');

html = html.replace(/<h1>Learn\. Build\. Grow\.<\/h1>/, '<h1>Master the Food & Agriculture Business</h1>');
html = html.replace(/<p class="lead">CourseHub Academy helps you gain real, job-ready skills through expert-led courses, hands-on projects and a supportive learning community — at your own pace\.<\/p>/, '<p class="lead">Grow your agricultural enterprise with industry-leading offline and online courses covering farming, logistics, value addition, and direct-to-consumer sales.</p>');
html = html.replace(/CourseHub Academy helps you gain real, job-ready skills through expert-led courses, hands-on \nprojects and a supportive learning community \?" at your own pace\./, 'Grow your agricultural enterprise with industry-leading offline and online courses covering farming, logistics, value addition, and direct-to-consumer sales.');

// Update stack cards
html = html.replace(/JavaScript Essentials/, 'Hydroponic Basics');
html = html.replace(/Digital Marketing Mastery/, 'Food Value Addition');
html = html.replace(/Project Review/, 'Fresh Produce Trading');

// Update About Section
html = html.replace(/Practical courses, built for real careers/, 'Practical agriculture courses, built for real growth');
html = html.replace(/We are an online course provider focused on outcomes, not just certificates\./, 'We are an agricultural academy focused on outcomes, not just certificates.');

// Update testimonials
html = html.replace(/"The projects made everything click\. I built my first real website in the second \nweek\."/, '"The hands-on training made everything click. I built my first commercial farm in the second month."');
html = html.replace(/Web \nDevelopment Bootcamp/, 'Hydroponic Vegetable Farming');
html = html.replace(/"Clear explanations and a genuinely supportive instructor\. Worth every rupee\."/, '"Clear explanations on B2B logistics and a genuinely supportive instructor. Worth every rupee."');
html = html.replace(/Data Science with \nPython/, 'Fresh Produce Trading');
html = html.replace(/"I could learn on my own schedule and still get help whenever I needed it\."/, '"I could learn organic certification on my own schedule and start applying it to my farm."');
html = html.replace(/Digital Marketing \nMastery/, 'Organic Farming Business');

// Since strings might have weird newlines, let's do a more robust regex or direct text replacement
// I'll just write a custom script using string replaces to be safe

fs.writeFileSync('coursehub.html', html);
console.log('coursehub.html replaced.');
