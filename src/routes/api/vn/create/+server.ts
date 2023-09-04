

import { openai, responseRegex } from "$lib/openai";
import type { CreateRequest, CreateResponse } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

const systemStr = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história que ele deseja. Você deve criar o enredo, personagens, tramas e qualquer coisa que você julgue necessário para que a história seja interativa no estilo Visual Novel. Para cada prompt, sua resposta deve contar um parágrafo da história, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string: {"Cena: ...."_"Escolha 1"._"Escolha 2".}.`
const assistantStr = `{"Cena: ...."_"Escolha 1:" ...."_"Escolha 2": .... "}`

export const POST: RequestHandler<CreateRequest> = async ({ request }) => {
  const data = await request.json() as CreateRequest;
  const { initialDescription } = data;
  const response = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: systemStr }, { role: 'user', content: initialDescription }, { role: 'assistant', content: assistantStr }], max_tokens: 1024 })
  const result = response.choices[0].message.content;
  if (!result) throw new Error();
  const matches = result.match(responseRegex);
  if (!matches || matches.length < 3) throw new Error();
  const scene = matches[1].trim();
  const choice1 = matches[2].trim();
  const choice2 = matches[3].trim();
  const body: CreateResponse = { scene, choice1, choice2 }

  return json(body, { status: 200 });
}
