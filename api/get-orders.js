import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const result = await pool.query(`SELECT * FROM orders ORDER BY created_at DESC`);
    res.status(200).json({ orders: result.rows });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: error.message });
  }
}
