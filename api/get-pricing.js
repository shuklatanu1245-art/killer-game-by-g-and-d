import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const servicesRes = await pool.query(`SELECT * FROM services ORDER BY id ASC`);
    const plansRes = await pool.query(`SELECT * FROM pricing_plans ORDER BY id ASC`);
    
    let contactsRows = [];
    try {
      const contactsRes = await pool.query(`SELECT * FROM contacts ORDER BY id ASC`);
      contactsRows = contactsRes.rows;
    } catch (err) {
      console.log("Contacts table not found or error:", err.message);
    }
    
    const services = servicesRes.rows.map(s => {
      const plans = plansRes.rows.filter(p => p.service_id === s.id).map(p => ({
        ...p,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
      }));
      return { ...s, plans };
    });
    
    res.status(200).json({ success: true, services, contacts: contactsRows });
  } catch (error) {
    console.error("Fetch Pricing Error:", error);
    res.status(500).json({ error: error.message });
  }
}
