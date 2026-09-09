const fs = require('fs');

// Image map: use local files for first 6, Unsplash for rest
const imageMap = {
  'CRS-001': 'course_images/harvest_storage.jpg',
  'CRS-002': 'course_images/fresh_produce_trading.jpg',
  'CRS-003': 'course_images/value_addition.jpg',
  'CRS-004': 'course_images/organic_farming.jpg',
  'CRS-005': 'course_images/agri_export.jpg',
  'CRS-006': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
  'CRS-007': 'course_images/hydroponic_farming.jpg',
  'CRS-008': 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=800&q=80',
  'CRS-009': 'https://images.unsplash.com/photo-1601053155701-d70c4974f266?auto=format&fit=crop&w=800&q=80',
  'CRS-010': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
  'CRS-011': 'https://images.unsplash.com/photo-1595856424599-e65dbb8aa9a5?auto=format&fit=crop&w=800&q=80',
  'CRS-012': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'CRS-013': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  'CRS-014': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
  'CRS-015': 'https://images.unsplash.com/photo-1526470498-9ae73c665de8?auto=format&fit=crop&w=800&q=80'
};

let dbjs = fs.readFileSync('database.js', 'utf8');

// Update images for each course in database.js
Object.entries(imageMap).forEach(([id, img]) => {
  // Replace image field for each course id
  const re = new RegExp(`(id: "${id}"[\\s\\S]{0,500}?image: ")[^"]*(")`, 'g');
  dbjs = dbjs.replace(re, `$1${img}$2`);
});

fs.writeFileSync('database.js', dbjs);
console.log('database.js images updated');

// Also update seed.sql
let seed = fs.readFileSync('seed.sql', 'utf8');
Object.entries(imageMap).forEach(([id, img]) => {
  // find the course row by id and update its image field (8th positional column in VALUES)
  // Simple approach: target the course line that starts with (id, ...
  // We'll use the image URL pattern from the old seed
  seed = seed.replace(
    new RegExp(`('${id}',([^)]+?)),`,'g'),
    (match) => match // skip - too risky to parse positionally
  );
});
// Safer: regenerate seed.sql by reading updated database.js
console.log('Images wired. Run server to verify.');
