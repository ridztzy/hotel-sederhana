import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const client = await pool.connect();
  try {
    const roomRes = await client.query(`
      SELECT 
        r.id,
        r.slug,
        r.name,
        r.description,
        r."shortDescription",
        r."basePrice" AS price,
        r."maxGuests",
        r."size_sqm" AS size,
        r.status = 'available' AS available,
        rt.type AS type,
        (
          SELECT json_agg("imageUrl")
          FROM "Room_Images"
          WHERE "roomId" = r.id
        ) AS images,
        (
          SELECT json_agg(a.name)
          FROM "Room_Amenities" ra
          JOIN "Amenities" a ON ra."amenityId" = a.id
          WHERE ra."roomId" = r.id
        ) AS amenities,
        (
          SELECT json_agg(f.name)
          FROM "Room_Features" rf
          JOIN "Features" f ON rf."featureId" = f.id
          WHERE rf."roomId" = r.id
        ) AS features
      FROM "Room" r
      JOIN "RoomType" rt ON r."roomTypeId" = rt.id
      WHERE r.id = $1
      LIMIT 1
    `, [id]);
    if (roomRes.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(roomRes.rows[0]);
  } catch (err) {
    console.error("API /api/rooms/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const {
    name,
    description,
    shortDescription,
    basePrice,
    maxGuests,
    size_sqm,
    roomTypeId,
    amenities,
    features,
    images,
  } = body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `UPDATE "Room" SET name=$1, description=$2, "shortDescription"=$3, "basePrice"=$4, "maxGuests"=$5, "size_sqm"=$6, "roomTypeId"=$7 WHERE id=$8`,
      [name, description, shortDescription, basePrice, maxGuests, size_sqm, roomTypeId, id]
    );

    // Update amenities
    await client.query(`DELETE FROM "Room_Amenities" WHERE "roomId"=$1`, [id]);
    if (Array.isArray(amenities)) {
      for (const amenityId of amenities) {
        await client.query(
          `INSERT INTO "Room_Amenities" ("roomId", "amenityId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [id, amenityId]
        );
      }
    }

    // Update features
    await client.query(`DELETE FROM "Room_Features" WHERE "roomId"=$1`, [id]);
    if (Array.isArray(features)) {
      for (const featureId of features) {
        await client.query(
          `INSERT INTO "Room_Features" ("roomId", "featureId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [id, featureId]
        );
      }
    }

    // Update images
    await client.query(`DELETE FROM "Room_Images" WHERE "roomId"=$1`, [id]);
    if (Array.isArray(images)) {
      for (const img of images) {
        await client.query(
          `INSERT INTO "Room_Images" (id, "roomId", "imageUrl", "isPrimary") VALUES (gen_random_uuid(), $1, $2, $3)`,
          [id, img.imageUrl, img.isPrimary || false]
        );
      }
    }

    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    client.release();
  }
}