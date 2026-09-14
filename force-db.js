import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS contacts (id SERIAL PRIMARY KEY, platform VARCHAR(255) NOT NULL, handle VARCHAR(255) NOT NULL, url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    console.log('Table created');
    
    // Add is_clickable column if it doesn't exist
    try {
      await pool.query('ALTER TABLE contacts ADD COLUMN is_clickable BOOLEAN DEFAULT true');
      console.log('Altered is_clickable');
    } catch (e) {
      console.log('is_clickable may already exist or error:', e.message);
    }

    const c = await pool.query('SELECT COUNT(*) FROM contacts');
    if (parseInt(c.rows[0].count) === 0) {
      await pool.query(`INSERT INTO contacts (platform, handle, url, is_clickable) VALUES ('Instagram', '@creov.atestudio', 'https://instagram.com/creov.atestudio', true)`);
      console.log('Seeded');
    }
  } catch(e) {
    console.log(e.message);
  } finally {
    pool.end();
  }
}
run();
