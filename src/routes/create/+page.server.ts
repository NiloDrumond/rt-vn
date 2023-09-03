import { redirect, type Actions } from "@sveltejs/kit";
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration);


const system_str = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história que ele deseja. Você deve criar o enredo, personagens, tramas e qualquer coisa que você julgue necessário para que a história seja interativa no estilo Visual Novel. Para cada prompt, sua resposta deve contar um parágrafo da história, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Mantenha as DUAS escolhas e a cena entre as mesmas chaves, em linha única, para que eu possa tratar a string): {"Escolha 1"._"Escolha 2".}.`
const assistant  = `{"Escolha 1:" ...."_"Escolha 2": .... "}`

const sceneRegex   = /Cena:\s([^]+?)\n\n/;
const choice1Regex = /Escolha 1:\s([^]+?)\n/;
const choice2Regex = /Escolha 2:\s([^]+?)\n/;


const parseResponse= (content) => {
  const sceneMatch = message.match(sceneRegex);
  const choice1Match = message.match(choice1Regex);
  const choice2Match = message,match(choice2Regex);

  return {
    scene: sceneMatch ? sceneMatch[1] : "",
    choice1: choice1Match ? choice1Match[1] : "",
    choice2: choice2Match ? choice2Match[1] : "",
  };
}

/** Formato de uma requisicao de escolha
 * 
 * try {
 *    const response = await openai.chat.completions.create({
 *      model: "gpt-3.5-turbo",
 *      messages: [
 *        { role: "user", content: choice },
 *        { role: "assistant", content: assistant}
 *        ],
 *      temperature: 0,
 *      max_tokens: 1024,
 *    });
 *
 *    if (response.choices.length <= 0)
 *      // TODO: handle error
 *
 *    const message = response.choices[0].message.content
 *    const vnScene = parseResponse(message);
 *  
 *  } catch (error) {
 *    // TODO: handle error
 *  }
 * 
 */

export const actions: Actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const story = data.get('story-context');

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: system_str},
          { role: "user", content: story },
          { role: "assistant", content: assistant}
          ],
        temperature: 0,
        max_tokens: 1024,
      });

      if (response.choices.length <= 0)
        // TODO: handle error

      const message = response.choices[0].message.content
      const vnScene = parseResponse(message);
    
    } catch (error) {
      // TODO: handle error
    }

    if (typeof story === 'string' && story.length > 0) {
      throw redirect(303, '/vn')
    }
  }
}
