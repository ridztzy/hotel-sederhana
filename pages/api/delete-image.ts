import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { public_id } = req.body;
  if (!public_id) return res.status(400).json({ error: 'public_id is required' });

  try {
    await cloudinary.uploader.destroy(public_id);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error deleting image from Cloudinary:', error);
    return res.status(500).json({ error: 'Failed to delete image', detail: error.message });
  }
}