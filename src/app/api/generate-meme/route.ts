import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL is required" },
      { status: 400 }
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Create a funny meme using this profile picture: ${imageUrl}. it's a symbiotic.fi crypto project, image items color green, Add Symbiotic text.`,
      size: "1024x1024",
    });

    const memeUrl = response.data[0].url;
    return NextResponse.json({ memeUrl });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.error(error.error);
    return NextResponse.json({ error: error.error }, { status: 500 });
  }
}
