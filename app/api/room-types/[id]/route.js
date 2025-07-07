import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const result = await pool.query('SELECT id, type FROM "RoomType" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Room type not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching room type with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { type } = await request.json();
    if (!type) {
      return NextResponse.json({ message: 'Type is required' }, { status: 400 });
    }
    const result = await pool.query('UPDATE "RoomType" SET type = $1 WHERE id = $2 RETURNING id, type', [type, id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Room type not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating room type with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const result = await pool.query('DELETE FROM "RoomType" WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Room type not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Room type deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting room type with ID ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
