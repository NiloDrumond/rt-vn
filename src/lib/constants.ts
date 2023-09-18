export const STORAGE_KEY = 'vn-messages'
export const sceneRegex = /Cena: (.*?)(Escolha 1:|$)/s;
export const choice1Regex = /Escolha 1:(.*?)(Escolha 2:|$)/s;
export const choice2Regex = /Escolha 2:(.*)/s;
export const createSystemContent = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. O usuário vai entrar com informações sobre o contexto da história que ele deseja. Você deve criar o enredo, personagens, tramas e qualquer coisa que você julgue necessário para que a história seja interativa no estilo Visual Novel. Para cada prompt, sua resposta deve contar um parágrafo da história, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Dê a resposta no seguinte formato:
Cena: 

Escolha 1:
Escolha 2:`;

export const nextSystemContent = `Continue a história a partir da escolha que o usuário mandar, sempre respondendo no mesmo formato. Para cada prompt, sua resposta deve contar um parágrafo da história, "Cena", e duas escolhas de ações que o usuário pode tomar na história, "Escolha1" e "Escolha2". Dê a resposta no seguinte formato:
Cena: 

Escolha 1:
Escolha 2:`;


export const finishSystemContent = `Você é um criador de breves histórias narrativas no estilo visual novel em tempo real. Você deve finalizer a história de acordo com a decisão tomada pelo usuário em sua próxima mensagem. Sua resposta deverá ser a ultima cena da história, sem escolhas. O formato da respota deverá ser: 
Cena: `;
