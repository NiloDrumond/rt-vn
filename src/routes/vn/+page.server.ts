
import { OPEN_AI_KEY } from "$env/static/private";
import type { redirect, Actions } from "@sveltejs/kit";
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: OPEN_AI_KEY });


const finishSystem = 'Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve finalizer essa história de acordo com a decisão tomada pelo usuário. VOcê receberá como prompt a história até então, terminada com a última escolha feita pelo usuário. Sua resposta deve ser o último parágrafo dessa história, dando a resposta em uma linha única no formato json: {"Cena": ....}'
const finishAssistant = '{"Cena": ...}'

const system_str = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história até então. Você deve continuar essa história de forma que ela continua uma história interativa estilo visual novel. Você receberá como prompt a história até então, terminada com a ultima escolha feita pelo usuário. Sua resposta deve ser a continuação dessa história de acordo com a escolha do usuário em um parágrafo, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string: {"Cena: ...."_"Escolha 1"._"Escolha 2".}.`
const assistant = `{"Cena: ...."_"Escolha 1:" ...."_"Escolha 2": .... "}`

const sceneRegex = /Cena:\s([^]+?)\n\n/;
const choice1Regex = /Escolha 1:\s([^]+?)\n/;
const choice2Regex = /Escolha 2:\s([^]+?)\n/;


const parseResponse = (message: string) => {
  const sceneMatch = message.match(sceneRegex);
  const choice1Match = message.match(choice1Regex);
  const choice2Match = message.match(choice2Regex);

  if (!sceneMatch || sceneMatch.length === 0 || !choice1Match || choice1Match.length === 0 || !choice2Match || choice2Match.length === 0) throw new Error('Formato da resposta invalido');
  return {
    scene: sceneMatch[0],
    choice1: choice1Match[0],
    choice2: choice2Match[0],
  };
}

export const actions: Actions = {
  finish: async ({ request }) => {
    //TODO: conclude story
  },
  next: async ({ request, cookies }) => {
    const data = await request.formData();
    const story = data.get('story-context');
    if (typeof story !== 'string') return;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: system_str },
          { role: "user", content: story },
          { role: "assistant", content: assistant }
        ],
        temperature: 0,
        max_tokens: 1024,
      });
      console.log(response)


    } catch (error) {
      console.log(error)
      // TODO: handle error
    }

  }
}
