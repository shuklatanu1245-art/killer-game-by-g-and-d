import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 1. Create Orders Table
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

    // 2. Create Services Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(50),
        color VARCHAR(50),
        bg VARCHAR(50),
        border_color VARCHAR(50),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create Pricing Plans Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pricing_plans (
        id SERIAL PRIMARY KEY,
        service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(50) NOT NULL,
        features JSONB,
        is_popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create Contacts Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(255) NOT NULL,
        handle VARCHAR(255) NOT NULL,
        url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed contacts if empty
    const checkContacts = await pool.query('SELECT COUNT(*) FROM contacts');
    if (parseInt(checkContacts.rows[0].count) === 0) {
      await pool.query(`INSERT INTO contacts (platform, handle, url) VALUES ('Instagram', '@creov.atestudio', 'https://instagram.com/creov.atestudio')`);
    }

    res.status(200).json({ message: "Database tables updated and seeded successfully!" });
  } catch (error) {
    console.error("DB Init Error:", error);
    res.status(500).json({ error: error.message });
  }
}
