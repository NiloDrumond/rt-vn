
import type { NextRequest } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";


const finishSystem = 'Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve finalizer essa história de acordo com a decisão tomada pelo usuário. VOcê receberá como prompt a história até então, terminada com a última escolha feita pelo usuário. Sua resposta deve ser o último parágrafo dessa história, dando a resposta em uma linha única no formato json: {"Cena": ....}'
const finishAssistant = '{"Cena": ...}'

const system_str = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve continuar essa história de forma que ela continua uma história interativa estilo visual novel. Você receberá como prompt a história até então, terminada com a ultima escolha feita pelo usuário. Sua resposta deve ser a continuação dessa história de acordo com a escolha do usuário em um parágrafo, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string: {"Cena: ...."_"Escolha 1"._"Escolha 2".}.`
const assistant = `{"Cena: ...."_"Escolha 1:" ...."_"Escolha 2": .... "}`

const sceneRegex = /Cena:\s([^]+?)\n\n/;
const choice1Regex = /Escolha 1:\s([^]+?)\n/;
const choice2Regex = /Escolha 2:\s([^]+?)\n/;


const response = {
  scene: 'Uma história de pirata',
  choice1: 'pirataria',
  choice2: 'não pirataria'
}
const finishResponse = {
  scene: 'cabo'
}
export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json() as NextRequest;
  if (data.finish) {
    return json(finishResponse, { status: 200 });

  }

  return json(response, { status: 200 });
}
