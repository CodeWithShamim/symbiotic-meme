import { NextResponse } from "next/server";
import axios from "axios";
const requests = new Map<string, { count: number; firstRequest: number }>();

export async function POST(req: Request) {
  try {
    // Get client IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    console.log({ ip });

    // Initialize or get existing
    const now = Date.now();
    const record = requests.get(ip) || { count: 0, firstRequest: now };

    // Reset counter after 24h
    if (now - record.firstRequest > 24 * 60 * 60 * 1000) {
      record.count = 0;
      record.firstRequest = now;
    }

    if (record.count >= 2) {
      const errMsg = "You can only generate 2 memes per IP per day.";
      console.log({ Error: errMsg });
      return NextResponse.json({ error: errMsg }, { status: 429 });
    }

    // Increment count
    record.count += 1;
    requests.set(ip, record);

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
