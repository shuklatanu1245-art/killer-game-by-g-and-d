import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  try {
    await pool.query('DELETE FROM pricing_plans');
    await pool.query('DELETE FROM services');
    
    const s1 = await pool.query(`INSERT INTO services (title, icon, description) VALUES ('Thumbnail Designing', 'ImageIcon', 'Eye-catching thumbnails that get more clicks.') RETURNING id`);
    const s1Id = s1.rows[0].id;
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Basic', '149', '["1 Thumbnail", "1 Concept", "1 Revision"]', false)`, [s1Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Pro', '299', '["Premium Design", "Advanced Effects", "2 Revisions"]', true)`, [s1Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Creator Pack', '999', '["5 Thumbnails", "Consistent Style", "Priority Delivery"]', false)`, [s1Id]);
    
    const s2 = await pool.query(`INSERT INTO services (title, icon, description) VALUES ('Poster Designing', 'Layout', 'Creative posters that leave a lasting impact.') RETURNING id`);
    const s2Id = s2.rows[0].id;
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Basic', '299', '["1 Professional Poster", "High Quality Design", "1 Revision"]', false)`, [s2Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Premium', '499', '["Custom Design", "Advanced Graphics", "2 Revisions"]', true)`, [s2Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Business Pack', '1,499', '["5 Posters", "Consistent Branding", "Priority Delivery"]', false)`, [s2Id]);
    
    const s3 = await pool.query(`INSERT INTO services (title, icon, description) VALUES ('Website Development', 'Code', 'Modern, responsive and high-performing websites.') RETURNING id`);
    const s3Id = s3.rows[0].id;
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Starter', '2,999+', '["Single Page Website", "Mobile Responsive", "Contact Section", "Basic SEO"]', false)`, [s3Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Business', '5,999+', '["Multi-Section Website", "Responsive Design", "Contact / CTA", "Professional UI"]', true)`, [s3Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Custom', '9,999+', '["Custom Functionality", "Advanced UI/UX", "Multiple Pages", "Priority Support"]', false)`, [s3Id]);
    
    const s4 = await pool.query(`INSERT INTO services (title, icon, description) VALUES ('AI Advertisement Videos', 'Video', 'AI-powered ads that promote and perform.') RETURNING id`);
    const s4Id = s4.rows[0].id;
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Starter', '499', '["15-20 Sec Video", "AI Visuals", "Background Music", "HD Quality"]', false)`, [s4Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Professional', '999', '["30-40 Sec Video", "Voiceover", "Editing", "HD Quality"]', true)`, [s4Id]);
    await pool.query(`INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES ($1, 'Business Ad', '1,999+', '["Custom Concept", "Multiple Scenes", "Professional Editing", "HD Quality"]', false)`, [s4Id]);
    
    console.log('Seeded successfully!');
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

seed();
