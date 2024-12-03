import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (!query && !state) {
    return Response.json({ error: "Missing query parameter" }, { status: 400 });
  }

  console.log(query, state, code);

  try {
    const data = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&countrycodes=${code}&featureType=${state}`
    );

    return Response.json({
      data: data.data,
      status: 201,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
