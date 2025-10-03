import { NextResponse } from "next/server";

interface Props {
  params: { username: string };
}

export async function GET(req: Request, { params }: Props) {
  const { username } = params;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Twitter user" },
        { status: res.status }
      );
    }

    const data = await res.json();

    console.log({ data });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
