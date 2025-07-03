import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email dan password wajib diisi' }), { status: 400 });
  }

  // Ambil user berdasarkan email
  const result = await pool.query(
    'SELECT id, name, email, password, role FROM "Users" WHERE email = $1',
    [email]
  );
  if (result.rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Email atau password salah' }), { status: 401 });
  }

  const user = result.rows[0];
  // Bandingkan password input dengan hash di database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Email atau password salah' }), { status: 401 });
  }

  // Jangan kirim password ke client
  delete user.password;

  return new Response(JSON.stringify({ success: true, user }), { status: 200 });
}