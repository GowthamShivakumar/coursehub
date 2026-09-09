/**
 * Quick Terminal Checker for Supabase Connection
 * Usage: node test_supabase.js
 */

const fs = require('node:fs');
const path = require('node:path');

const CONFIG_PATH = path.join(__dirname, 'supabase_config.js');

console.log('====================================================');
console.log('       SUPABASE DATABASE CONNECTION TESTER          ');
console.log('====================================================\n');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('❌ supabase_config.js not found!');
  process.exit(1);
}

const content = fs.readFileSync(CONFIG_PATH, 'utf8');
const urlMatch = content.match(/url:\s*'([^']+)'/);
const keyMatch = content.match(/anonKey:\s*'([^']+)'/);

const url = urlMatch ? urlMatch[1] : '';
const key = keyMatch ? keyMatch[1] : '';

if (!url || url === 'YOUR_SUPABASE_PROJECT_URL' || !key || key === 'YOUR_SUPABASE_ANON_KEY') {
  console.log('⚠️ Supabase credentials have NOT been filled in yet.');
  console.log('----------------------------------------------------');
  console.log('To connect your Supabase database:');
  console.log('1. Open "supabase_config.js" in this folder.');
  console.log('2. Set SUPABASE_CONFIG.url to your Project URL.');
  console.log('3. Set SUPABASE_CONFIG.anonKey to your Project anon key.');
  console.log('4. Run "node test_supabase.js" again.');
  console.log('====================================================\n');
  process.exit(0);
}

console.log(`Connecting to: ${url}`);

async function testConnection() {
  try {
    const res = await fetch(`${url}/rest/v1/courses?select=*&limit=3`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ Connection failed with HTTP ${res.status}:`);
      console.error(errText);
      console.log('\n💡 Hint: Make sure you ran "supabase_schema.sql" in your Supabase SQL Editor.');
      return;
    }

    const data = await res.json();
    console.log('🎉 SUCCESS! Connected to your Supabase database!');
    console.log(`Found ${data.length} courses:`);
    console.table(data.map(c => ({ ID: c.id, Name: c.name, Category: c.category, Price: c.price })));
  } catch (err) {
    console.error('❌ Network error reaching Supabase:', err.message);
  }
}

testConnection();
