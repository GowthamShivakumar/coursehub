const fs = require('fs');
let html = fs.readFileSync('coursehub.html', 'utf8');

html = html.replace(
  /<div class="course-price-row">\$\{price\}<\/div>/g,
  `<div class="course-price-row">\${price}</div>\${c.couponCode ? '<div class="pill pill-success" style="margin-bottom:14px;background:var(--success-bg);color:var(--success);">🎟️ Coupon: ' + esc(c.couponCode) + '</div>' : ''}`
);

html = html.replace(
  /<div class="course-price-row">\$\{c\.discountPrice&&c\.discountPrice<c\.price\?`<span class="price-old">\$\{fmtMoney\(c\.price\)\}<\/span><span class="price-new">\$\{fmtMoney\(c\.discountPrice\)\}<\/span>`:`<span class="price-new">\$\{fmtMoney\(c\.price\)\}<\/span>`\}<\/div>/g,
  `<div class="course-price-row">\${c.discountPrice&&c.discountPrice<c.price?\`<span class="price-old">\${fmtMoney(c.price)}</span><span class="price-new">\${fmtMoney(c.discountPrice)}</span>\`:\`<span class="price-new">\${fmtMoney(c.price)}</span>\`}</div>\${c.couponCode ? \`<div class="disclaimer" style="margin-top:0;margin-bottom:10px;background:var(--success-bg);color:var(--success);border-color:var(--success);">🎟️ Apply coupon <strong>\${esc(c.couponCode)}</strong> at checkout!</div>\` : ''}`
);

html = html.replace(
  /\$\{fgVal\('discountPrice','Discount Price \(₹\)','number',c\.discountPrice\)\}/g,
  `\${fgVal('discountPrice','Discount Price (₹)','number',c.discountPrice)}\n    \${fgVal('couponCode','Coupon Code','text',c.couponCode)}`
);

html = html.replace(
  /d\.image=imgData\|\|d\.image\|\|'';/g,
  `d.image=imgData||d.image||'';\n      d.couponCode=f.querySelector('[name=couponCode]') ? f.querySelector('[name=couponCode]').value : '';`
);

fs.writeFileSync('coursehub.html', html);
console.log('coursehub.html updated');
