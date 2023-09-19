
import { OPEN_AI_KEY } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

export const config = {
  runtime: 'edge'
}

export const GET: RequestHandler = async ({ url }) => {
  const keywords = url.searchParams.get('keywords');
  if (!keywords) throw error(400);

  const response = await openai.images.generate({
    prompt: keywords,
    n: 1,
    size: "512x512",
  });

  const imageUrl = response.data[0].url;
  return json(imageUrl);
}
