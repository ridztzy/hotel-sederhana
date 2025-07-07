import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const result = await pool.query('SELECT id, name FROM "Amenities" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Amenity not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching amenity with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }
    const result = await pool.query('UPDATE "Amenities" SET name = $1 WHERE id = $2 RETURNING id, name', [name, id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Amenity not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating amenity with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const result = await pool.query('DELETE FROM "Amenities" WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Amenity not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Amenity deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting amenity with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}