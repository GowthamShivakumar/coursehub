const fs = require('fs');

// Fix the images in database.js to use local files for first 6 courses
// and then update the seed.sql to also use the local images

// Local image map (relative paths served by the Node server)
const imageMap = {
  'CRS-001': 'course_images/harvest_storage.jpg',
  'CRS-002': 'course_images/fresh_produce_trading.jpg',
  'CRS-003': 'course_images/value_addition.jpg',
  'CRS-004': 'course_images/organic_farming.jpg',
  'CRS-005': 'course_images/agri_export.jpg',
  'CRS-007': 'course_images/hydroponic_farming.jpg',
};

let seed = fs.readFileSync('seed.sql', 'utf8');

// Replace Unsplash URLs with local paths for these 6 courses
Object.entries(imageMap).forEach(([id, localPath]) => {
  // Match the course row and update the image field (11th param)
  // Each course row: ('CRS-001', 'Name', 'short', 'full', 'cat', 'inst', 'dur', 'lev', price, dprice, 'coup', 'IMAGE', ...
  const re = new RegExp(`('${id}',\\s*'[^']*',\\s*'[^']*',\\s*'[^']*',\\s*'[^']*',\\s*'[^']*',\\s*'[^']*',\\s*'[^']*',\\s*\\d+,\\s*\\d+,\\s*'[^']*',\\s*)'[^']*'`, 'g');
  seed = seed.replace(re, `$1'${localPath}'`);
});

fs.writeFileSync('seed.sql', seed);

// Also update database.js the same way
let dbjs = fs.readFileSync('database.js', 'utf8');
Object.entries(imageMap).forEach(([id, localPath]) => {
  const re = new RegExp(`(id: "${id}"[\\s\\S]{0,800}?image: ")[^"]*(")`, 'g');
  dbjs = dbjs.replace(re, `$1${localPath}$2`);
});
fs.writeFileSync('database.js', dbjs);

console.log('Local image paths injected into seed.sql and database.js for 6 AI-generated courses.');
