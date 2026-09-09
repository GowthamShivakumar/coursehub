/**
 * CourseHub SQLite Database Inspector CLI
 * Usage:
 *   node check_db.js                  -> Shows summary of all tables and record counts
 *   node check_db.js <table_name>     -> Dumps records from a specific table (e.g., node check_db.js courses)
 *   node check_db.js query "<SQL>"    -> Runs any custom SQL query (e.g., node check_db.js query "SELECT * FROM students")
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const DB_PATH = path.join(__dirname, 'coursehub.db');

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ Error: coursehub.db not found. Please run "node init_db.js" first.');
  process.exit(1);
}

const db = new DatabaseSync(DB_PATH);
const args = process.argv.slice(2);

console.log('====================================================');
console.log('         COURSEHUB DATABASE INSPECTOR               ');
console.log(` Database: ${DB_PATH}`);
console.log('====================================================\n');

if (args.length === 0) {
  // Summary mode
  console.log('📊 TABLES SUMMARY:');
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

  const summary = tables.map(tbl => {
    try {
      const res = db.prepare(`SELECT COUNT(*) as count FROM ${tbl}`).get();
      return { Table: tbl, Records: res.count };
    } catch (e) {
      return { Table: tbl, Records: 'Error' };
    }
  });

  console.table(summary);

  console.log('\n💡 Tip: To inspect a specific table, run:');
  console.log('   node check_db.js courses');
  console.log('   node check_db.js students');
  console.log('   node check_db.js payments');
  console.log('   node check_db.js query "SELECT * FROM v_course_stats"');
} else if (args[0] === 'query') {
  const sql = args.slice(1).join(' ');
  if (!sql) {
    console.log('Please provide a SQL query. Example: node check_db.js query "SELECT * FROM courses"');
    process.exit(0);
  }
  console.log(`Executing SQL: ${sql}\n`);
  try {
    const results = db.prepare(sql).all();
    if (results.length === 0) {
      console.log('No rows returned.');
    } else {
      console.table(results);
      console.log(`Total rows: ${results.length}`);
    }
  } catch (err) {
    console.error('❌ SQL Error:', err.message);
  }
} else {
  const tableName = args[0];
  console.log(`Viewing table: ${tableName}\n`);
  try {
    const results = db.prepare(`SELECT * FROM ${tableName} LIMIT 25`).all();
    if (results.length === 0) {
      console.log(`Table '${tableName}' is empty.`);
    } else {
      console.table(results);
      const total = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get();
      console.log(`Showing ${results.length} of ${total.count} records.`);
    }
  } catch (err) {
    console.error(`❌ Error reading table '${tableName}':`, err.message);
  }
}

db.close();
