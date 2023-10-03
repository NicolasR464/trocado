import { NextRequest, NextResponse } from "next/server";

// Get specific address with query
export async function GET(
  req: NextRequest,
  { params }: { params: { query: string } }
) {
  console.log("ADDRESS API 📍");
  const address: any = req.nextUrl.searchParams.get("query");

  const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    address
  )}&type=housenumber&autocomplete=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Sending back the address data with CORS headers
    return NextResponse.json(data.features);
  } catch (error) {
    return NextResponse.json({ message: "Address not found" });
  }
}
