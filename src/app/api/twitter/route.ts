import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  if (!username) return NextResponse.json({ error: "Username is required" }, { status: 400 });

  try {
    const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    const profile_image_url = response.data.data.profile_image_url.replace("_normal", "");
    return NextResponse.json({ profile_image_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
