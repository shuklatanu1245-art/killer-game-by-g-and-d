import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  const { action, payload } = req.body;
  
  try {
    if (action === 'ADD_SERVICE') {
      const r = await pool.query(INSERT INTO services (title, icon, color, bg, border_color, description) VALUES (, , , , , ) RETURNING *, [payload.title, payload.icon, payload.color, payload.bg, payload.border_color, payload.description]);
      res.status(200).json({ success: true, data: r.rows[0] });
    } else if (action === 'DELETE_SERVICE') {
      await pool.query(DELETE FROM services WHERE id = , [payload.id]);
      res.status(200).json({ success: true });
    } else if (action === 'EDIT_SERVICE') {
      await pool.query(`UPDATE services SET title = $1, description = $2, icon = $3 WHERE id = $4`, [payload.title, payload.description, payload.icon, payload.id]);
      res.status(200).json({ success: true });
    } else if (action === 'ADD_PLAN') {
      const r = await pool.query(INSERT INTO pricing_plans (service_id, name, price, features, is_popular) VALUES (, , , , ) RETURNING *, [payload.service_id, payload.name, payload.price, JSON.stringify(payload.features), payload.is_popular]);
      res.status(200).json({ success: true, data: r.rows[0] });
    } else if (action === 'DELETE_PLAN') {
      await pool.query(DELETE FROM pricing_plans WHERE id = , [payload.id]);
      res.status(200).json({ success: true });
    } else if (action === 'EDIT_PLAN') {
      await pool.query(`UPDATE pricing_plans SET name = $1, price = $2, features = $3, is_popular = $4 WHERE id = $5`, [payload.name, payload.price, JSON.stringify(payload.features), payload.is_popular, payload.id]);
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
