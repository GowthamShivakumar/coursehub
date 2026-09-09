/**
 * CourseHub Database Initializer & Validator
 * Uses Node.js built-in `node:sqlite` module (Node 22+)
 * Creates and populates coursehub.db from schema.sql and seed.sql
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const DB_PATH = path.join(__dirname, 'coursehub.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');

console.log('====================================================');
console.log('       COURSEHUB DATABASE INITIALIZATION            ');
console.log('====================================================\n');

// 1. Check schema and seed files
if (!fs.existsSync(SCHEMA_PATH)) {
  console.error('Error: schema.sql not found at', SCHEMA_PATH);
  process.exit(1);
}
if (!fs.existsSync(SEED_PATH)) {
  console.error('Error: seed.sql not found at', SEED_PATH);
  process.exit(1);
}

// 2. Open or create SQLite database
console.log(`[1/4] Connecting to SQLite database at: ${DB_PATH}`);
const db = new DatabaseSync(DB_PATH);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// 3. Execute Schema
console.log('[2/4] Applying schema (tables, constraints, indexes, views)...');
const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schemaSql);
console.log('      ✓ Schema applied successfully.');

// 4. Execute Seed Data
console.log('[3/4] Seeding initial data...');
const seedSql = fs.readFileSync(SEED_PATH, 'utf8');
db.exec(seedSql);
console.log('      ✓ Initial data seeded successfully.');

// 5. Verification & Statistics
console.log('\n[4/4] Verifying database integrity and row counts:');
console.log('----------------------------------------------------');

const tables = [
  'settings',
  'courses',
  'course_syllabus',
  'lessons',
  'students',
  'registrations',
  'payments',
  'student_lesson_progress',
  'certificates',
  'schedules'
];

for (const tbl of tables) {
  const query = db.prepare(`SELECT COUNT(*) AS count FROM ${tbl}`);
  const result = query.get();
  console.log(`  • Table '${tbl.padEnd(24)}': ${result.count} records`);
}

console.log('----------------------------------------------------');

// Test Views
console.log('\nTesting Analytical Views:');
const courseStats = db.prepare('SELECT * FROM v_course_stats').all();
console.log('  v_course_stats output:');
console.table(courseStats);

const pendingPayments = db.prepare('SELECT * FROM v_pending_payments').all();
console.log('  v_pending_payments output:');
console.table(pendingPayments);

console.log('\n====================================================');
console.log(' Database coursehub.db initialized and verified!   ');
console.log('====================================================\n');

db.close();
