/**
 * =========================================================================
 * COURSEHUB ACADEMY - SUPABASE CONFIGURATION & CLIENT
 * =========================================================================
 * 
 * Instructions:
 * 1. Open your Supabase project dashboard: https://supabase.com/dashboard
 * 2. Go to: Project Settings -> API
 * 3. Copy your "Project URL" and paste it into SUPABASE_URL below.
 * 4. Copy your "anon public" API key and paste it into SUPABASE_ANON_KEY below.
 */

const SUPABASE_CONFIG = {
  url: 'https://pwqgdkjpdwqdbqskrxzn.supabase.co',
  anonKey: 'sb_publishable_xfrpOBh6pPQP6CP8lqRaMA_plXNiVm9'
};

let supabaseClient = null;

// Initialize Supabase Client
function initSupabase() {
  if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey && !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE')) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('✅ Supabase Client initialized successfully!');
      return supabaseClient;
    } catch (e) {
      console.warn('⚠️ Supabase initialization failed:', e);
    }
  }
  return null;
}

// Function to check Supabase connection and display health status
async function checkSupabaseConnection() {
  const client = supabaseClient || initSupabase();
  if (!client) {
    console.warn('ℹ️ Supabase not configured yet. Please enter your SUPABASE_URL and SUPABASE_ANON_KEY in supabase_config.js');
    return { ok: false, error: 'Credentials not configured in supabase_config.js' };
  }

  try {
    console.log('🔄 Checking connection to Supabase...');
    const { data, error, count } = await client
      .from('courses')
      .select('*', { count: 'exact', head: false })
      .limit(5);

    if (error) {
      console.error('❌ Supabase connection error:', error.message);
      return { ok: false, error: error.message };
    }

    console.log('🎉 Connected to Supabase successfully!');
    console.log(`📊 Found ${data.length} sample courses in Supabase database.`);
    return { ok: true, count: data.length, data };
  } catch (err) {
    console.error('❌ Failed to reach Supabase:', err);
    return { ok: false, error: err.message };
  }
}

// Automatically test when script loads if configured
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    if (supabaseClient) {
      checkSupabaseConnection().then(res => {
        if (res.ok && typeof toast === 'function') {
          toast('Connected to Supabase Database', 'success');
        }
      });
    }
  });
}
