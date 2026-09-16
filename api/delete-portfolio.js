import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'kcfjib2f', 
  api_key: '858717485567525', 
  api_secret: 'CNqoygMBtMmX3wVhG4UNpmK7kCs' 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { public_id, resource_type = 'image' } = req.body;
  if (!public_id) return res.status(400).json({ error: 'public_id is required' });

  try {
    const result = await cloudinary.uploader.destroy(public_id, { resource_type });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    res.status(500).json({ error: error.message });
  }
}
