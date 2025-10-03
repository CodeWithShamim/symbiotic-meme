import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await axios.post(
      "https://api.x.ai/v1/images/generations",
      {
        model: "grok-2-image",
        prompt,
        n: 1,
        // size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ response });

    return NextResponse.json({ images: response.data.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Grok image API error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data || "Something went wrong" },
      { status: 500 }
    );
  }
}
