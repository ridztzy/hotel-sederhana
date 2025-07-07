// app/api/upload/route.ts
import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { Readable } from 'stream';

export const dynamic = "force-dynamic";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper untuk parsing form-data di App Router
async function parseFormData(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.startsWith('multipart/form-data')) {
    throw new Error('Invalid content-type');
  }

  // Buffer seluruh body
  const buffer = Buffer.from(await req.arrayBuffer());

  // Buat fake IncomingMessage
  const fakeReq: any = new Readable();
  fakeReq.push(buffer);
  fakeReq.push(null);
  fakeReq.headers = { 'content-type': contentType };

  const form = formidable({ multiples: false });

  return await new Promise<{ file?: formidable.File }>((resolve, reject) => {
    form.parse(fakeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files as { file?: formidable.File });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const { file } = await parseFormData(req);

    if (!file) {
      return Response.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    // Upload file ke Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'hotel-rooms',
    });

    return Response.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload API Error:', error);
    return Response.json({ error: 'Gagal mengunggah gambar.' }, { status: 500 });
  }
}
