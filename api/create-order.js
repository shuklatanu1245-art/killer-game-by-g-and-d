import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  const { name, email, plan_title, plan_name, price, details } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO orders (name, email, plan_title, plan_name, price, details) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, plan_title, plan_name, price, details]
    );
    res.status(200).json({ success: true, order: result.rows[0] });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: error.message });
  }
}
