
import { openai, responseRegex } from "$lib/openai";
import type { NextRequest, NextResponse } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";


const finishSystemStr = 'Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve finalizer essa história de acordo com a decisão tomada pelo usuário. VOcê receberá como prompt a história até então, terminada com a última escolha feita pelo usuário. Sua resposta deve ser o último parágrafo dessa história'

const systemStr = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve continuar essa história de forma que ela continua uma história interativa estilo visual novel. Você receberá como prompt a história até então, terminada com a ultima escolha feita pelo usuário. Sua resposta deve ser a continuação dessa história de acordo com a escolha do usuário em um parágrafo, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string: {"Cena: ...."_"Escolha 1"._"Escolha 2".}.`
const assistantStr = `{"Cena: ...."_"Escolha 1:" ...."_"Escolha 2": .... "}`

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json() as NextRequest;
  const { vnContext, finish } = data;
  if (finish) {
    const response = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: finishSystemStr }, { role: 'user', content: vnContext }], max_tokens: 1024 })
    const result = response.choices[0].message.content;
    if (!result) throw new Error();
    const body: NextResponse = { scene: result }

    return json(body, { status: 200 });
  }
  const response = await openai.chat.completions.create({ model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: systemStr }, { role: 'user', content: vnContext }, { role: 'assistant', content: assistantStr }], max_tokens: 1024 })
  const result = response.choices[0].message.content;
  if (!result) throw new Error();
  const matches = result.match(responseRegex);
  if (!matches || matches.length < 3) throw new Error();
  const scene = matches[1].trim();
  const choice1 = matches[2].trim();
  const choice2 = matches[3].trim();
  const body: NextResponse = { scene, choice1, choice2 }

  return json(body, { status: 200 });
}
