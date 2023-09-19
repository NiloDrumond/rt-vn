
import { OPEN_AI_KEY } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

export const config = {
  runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
  const {prompt} = await request.json();

	const response = await openai.images.generate({
		prompt,
		n: 1,
		size: "512x512",
	});

	const imageUrl = response.data[0].url;
	return json(imageUrl);
}
