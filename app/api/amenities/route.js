import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT id, name FROM "Amenities" ORDER BY id ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    // Ambil nomor terakhir
    const last = await pool.query(
      `SELECT id FROM "Amenities" WHERE id LIKE 'Am-%' ORDER BY id DESC LIMIT 1`
    );
    let nextNumber = 1;
    if (last.rows.length > 0) {
      const lastId = last.rows[0].id;
      const num = parseInt(lastId.replace('Am-', ''), 10);
      if (!isNaN(num)) nextNumber = num + 1;
    }
    const newId = `Am-${nextNumber}`;

    const result = await pool.query(
      'INSERT INTO "Amenities"(id, name) VALUES($1, $2) RETURNING id, name',
      [newId, name]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding amenity:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}