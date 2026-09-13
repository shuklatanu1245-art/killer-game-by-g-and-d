import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        plan_title VARCHAR(255) NOT NULL,
        plan_name VARCHAR(255) NOT NULL,
        price VARCHAR(50),
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    res.status(200).json({ message: "Orders table created successfully!" });
  } catch (error) {
    console.error("DB Init Error:", error);
    res.status(500).json({ error: error.message });
  }
}
