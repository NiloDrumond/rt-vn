import { OPEN_AI_KEY } from "$env/static/private";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: OPEN_AI_KEY });
