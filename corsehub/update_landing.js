const fs = require('fs');
let html = fs.readFileSync('coursehub.html', 'utf8');

// ============================================================
// 1. HERO SECTION - stack cards
// ============================================================
html = html.replace(
  /(<div class="stack-card c1">)[\s\S]*?(<\/div>)/,
  '$1<h4>🌾 New Lesson Unlocked</h4><small>Harvest Management &amp; Storage</small>$2'
);
html = html.replace(
  /(<div class="stack-card c2">)[\s\S]*?(<\/div>)/,
  '$1<h4>🏆 Certificate Ready</h4><small>Fruit &amp; Vegetable Value Addition</small>$2'
);
html = html.replace(
  /(<div class="stack-card c3">)[\s\S]*?(<\/div>)/,
  '$1<h4>📅 Live Session — Today</h4><small>Fresh Produce Trading</small>$2'
);

// ============================================================
// 2. HERO STATS - update hero badge
// ============================================================
html = html.replace(/Trusted by 2,000\+ learners/, '🌿 Trusted by 2,000+ Agri Entrepreneurs');

// ============================================================
// 3. ABOUT SECTION
// ============================================================
html = html.replace(
  /Practical courses, built for real careers/,
  'Practical agribusiness courses, built for real profits'
);
html = html.replace(
  /We are an online course provider focused on outcomes, not just certificates\. Every course combines structured video lessons, live sessions and hands-on projects [—–] designed by working practitioners so what you learn maps directly to what employers and clients actually need\./,
  'We are an agricultural business academy focused on outcomes, not just certificates. Every course combines structured video lessons, live offline workshops, and hands-on field projects — designed by working agri-entrepreneurs and industry experts.'
);
html = html.replace(
  /Our methodology is simple: learn a concept, apply it immediately in a project, get feedback, and move forward only once you're confident\. Progress is tracked every step of the way\./,
  'Our methodology is simple: learn a concept, apply it in a real business scenario, get feedback, and move forward only once you\'re confident. Whether you\'re a farmer, trader, or food entrepreneur — we have the right course for you.'
);

// ============================================================
// 4. FEATURE CARDS - update icons and text
// ============================================================
// Replace generic feature card text with agri-specific ones
html = html.replace(
  /(<div class="feature-card">[\s\S]*?<div class="ic">)[^<]*([\s\S]*?<h3>)Expert Instructors(<\/h3>[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
  '$1🌾$2Industry-Expert Instructors$3Courses delivered by practising agri-business owners, exporters, and food technologists with real field experience.$4'
);
html = html.replace(
  /(<div class="feature-card">[\s\S]*?<div class="ic">)[^<]*([\s\S]*?<h3>)Hands-on Projects(<\/h3>[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
  '$1🚜$2Practical Field Training$3Every course includes real-world assignments — from farm visits and market walkthroughs to food processing workshops.$4'
);
html = html.replace(
  /(<div class="feature-card">[\s\S]*?<div class="ic">)[^<]*([\s\S]*?<h3>)Lifetime Access(<\/h3>[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
  '$1📱$2Online + Offline Available$3Learn from anywhere — join live offline sessions or attend interactive online classes. Both formats fully supported.$4'
);
html = html.replace(
  /(<div class="feature-card">[\s\S]*?<div class="ic">)[^<]*([\s\S]*?<h3>)Certificate(<\/h3>[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
  '$1🏆$2Verified Certificate$3Earn a recognised certificate on course completion — accepted by agri-businesses, APEDA, and government schemes.$4'
);

// ============================================================
// 5. TESTIMONIALS - replace all 3
// ============================================================
html = html.replace(
  /(<div class="testi"><p>)[\s\S]*?(<\/div><\/div><\/div>[\s\S]*?<div class="testi"><p>)[\s\S]*?(<\/div><\/div><\/div>[\s\S]*?<div class="testi"><p>)[\s\S]*?(<\/div><\/div><\/div>)/,
  `$1"The Harvest Management course transformed my farm. I reduced post-harvest losses by 40% in the first season. The offline workshop was hands-on and incredibly practical."</p><div class="who"><div class="avatar">RS</div><div><strong>Ravi S.</strong><br><small class="muted">Harvest Management &amp; Storage</small></div></div></div>
          $2"The trading course gave me the contacts and knowledge to move from a small vendor to a regional distributor. My revenue doubled in 3 months."</p><div class="who"><div class="avatar">AK</div><div><strong>Ananya K.</strong><br><small class="muted">Fresh Produce Trading &amp; Distribution</small></div></div></div>
          $3"I attended the value addition course offline and launched my own pickle brand within 6 weeks. The packaging and branding module was a game changer."</p><div class="who"><div class="avatar">MP</div><div><strong>Meena P.</strong><br><small class="muted">Fruit &amp; Vegetable Value Addition</small></div></div></div>$4`
);

// ============================================================
// 6. FAQ - update with agriculture questions
// ============================================================
html = html.replace(
  /(<summary>How do I pay for a course\?<\/summary><p>)[\s\S]*?(<\/p><\/details>)/,
  '$1After registering, you\'ll see the course-specific UPI ID and discounted price. Pay via any UPI app, enter your coupon code if you have one, then submit your transaction reference for admin verification.$2'
);
html = html.replace(
  /Are courses available offline\?|Can I access courses on mobile\?/,
  'Are courses available offline?'
);
html = html.replace(
  /(<summary>Are courses available offline\?<\/summary><p>)[\s\S]*?(<\/p><\/details>)/,
  '$1Yes! All our courses are available both online (live Zoom/YouTube sessions) and offline (campus workshops in major cities). Choose the format that works for you.$2'
);
html = html.replace(
  /the entire platform\s*including video lessons is fully responsive and works on any device\./,
  'Yes! All our courses are available both online (live Zoom/YouTube sessions) and offline (campus workshops in major cities). Choose the format that suits you.'
);

// ============================================================
// 7. CONTACT section
// ============================================================
html = html.replace(
  /hello@coursehub\.academy/,
  'hello@agribizacademy.in'
);
html = html.replace(
  /\+91 90000 00000/,
  '+91 98765 43210'
);

fs.writeFileSync('coursehub.html', html);
console.log('Landing page fully updated for agriculture theme!');
