import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  const { id } = req.body;
  
  try {
    await pool.query(`DELETE FROM orders WHERE id = $1`, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ error: error.message });
  }
}
