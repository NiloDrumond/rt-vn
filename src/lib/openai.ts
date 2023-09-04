import { OPEN_AI_KEY } from "$env/static/private";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

export const responseRegex = /^Cena:\s*(.*?)(?=Escolha 1)Escolha 1:\s*(.*?)(?=Escolha 2)Escolha 2:\s*(.*)/s; 
export const sceneRegex = /^Cena:\s*(.*)/s;
