import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);

    const response = await sql`SELECT * FROM DRIVERS`;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching Drivers", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
