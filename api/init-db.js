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

    // 4. Seed initial default data if services table is empty
    const checkServices = await pool.query('SELECT COUNT(*) FROM services');
    if (parseInt(checkServices.rows[0].count) === 0) {
      console.log("Seeding initial data...");
      
      const s1 = await pool.query(`INSERT INTO services (title, icon, color, bg, border_color, description) VALUES ('Thumbnail Designing', 'ImageIcon', 'text-[#8A2BE2]', 'bg-[#8A2BE2]/10', 'border-[#8A2BE2]', 'Eye-catching thumbnails that get more clicks.') RETURNING id`);
      const s1Id = s1.rows[0].id;
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Basic', '149', '["1 Thumbnail", "1 Concept", "1 Revision"]', false)`, [s1Id]);
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Pro', '299', '["Premium Design", "Advanced Effects", "2 Revisions"]', true)`, [s1Id]);
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Creator Pack', '999', '["5 Thumbnails", "Consistent Style", "Priority Delivery"]', false)`, [s1Id]);

      const s2 = await pool.query(`INSERT INTO services (title, icon, color, bg, border_color, description) VALUES ('Poster Designing', 'Layout', 'text-[#00E5FF]', 'bg-[#00E5FF]/10', 'border-[#00E5FF]', 'Creative posters that leave a lasting impact.') RETURNING id`);
      const s2Id = s2.rows[0].id;
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Basic', '299', '["1 Professional Poster", "High Quality Design", "1 Revision"]', false)`, [s2Id]);
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Premium', '499', '["Custom Design", "Advanced Graphics", "2 Revisions"]', true)`, [s2Id]);

      const s3 = await pool.query(`INSERT INTO services (title, icon, color, bg, border_color, description) VALUES ('Website Development', 'Code', 'text-green-400', 'bg-green-400/10', 'border-green-400', 'Modern, responsive and high-performing websites.') RETURNING id`);
      const s3Id = s3.rows[0].id;
      await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Starter', '2,999+', '["Single Page Website", "Mobile Responsive"]', false)`, [s3Id]);
    }

    res.status(200).json({ message: "Database tables updated and seeded successfully!" });
  } catch (error) {
    console.error("DB Init Error:", error);
    res.status(500).json({ error: error.message });
  }
}
