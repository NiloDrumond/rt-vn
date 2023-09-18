import { OPEN_AI_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

export const config = {
  runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();
  const response = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', stream: true, messages, max_tokens: 1024 })
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
