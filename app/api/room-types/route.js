import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT id, type FROM "RoomType" ORDER BY id ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching room types:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type } = await request.json();
    if (!type) {
      return NextResponse.json({ message: 'Type is required' }, { status: 400 });
    }

    // Ambil nomor terakhir
    const last = await pool.query(
      `SELECT id FROM "RoomType" WHERE id LIKE 'Tp-%' ORDER BY id DESC LIMIT 1`
    );
    let nextNumber = 1;
    if (last.rows.length > 0) {
      // Ambil angka setelah 'Tp-'
      const lastId = last.rows[0].id;
      const num = parseInt(lastId.replace('Tp-', ''), 10);
      if (!isNaN(num)) nextNumber = num + 1;
    }
    const newId = `Tp-${nextNumber}`;

    const result = await pool.query(
      'INSERT INTO "RoomType"(id, type) VALUES($1, $2) RETURNING id, type',
      [newId, type]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding room type:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}