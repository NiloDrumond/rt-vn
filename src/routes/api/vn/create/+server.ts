

import type { CreateRequest, NextRequest } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";




const system_str = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história que ele deseja. Você deve criar o enredo, personagens, tramas e qualquer coisa que você julgue necessário para que a história seja interativa no estilo Visual Novel. Para cada prompt, sua resposta deve contar um parágrafo da história, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string: {"Cena: ...."_"Escolha 1"._"Escolha 2".}.`
const assistant = `{"Cena: ...."_"Escolha 1:" ...."_"Escolha 2": .... "}`

const response = { scene: 'Primeira cena', choice1: 'Sim', choice2: 'não' }

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json() as CreateRequest;

  return json(response, { status: 200 });
}