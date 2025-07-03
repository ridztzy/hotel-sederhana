export const dynamic = "force-dynamic";
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Validasi sederhana
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), { status: 400 });
  }

  // Simpan ke tabel Users (public schema)
  try {
    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO "Users" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, hashedPassword]
    );
    const user = result.rows[0];
    return new Response(JSON.stringify({ success: true, user }), { status: 201 });
  } catch (err) {
    console.error('REGISTER ERROR:', err); // Tambahkan ini
    return new Response(JSON.stringify({ error: 'Email sudah terdaftar atau error lain' }), { status: 500 });
  }
}