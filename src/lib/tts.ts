import { PUBLIC_VOICE_RSS_KEY } from "$env/static/public";

export function speak(text: string): HTMLAudioElement {
  const apiUrl = `http://api.voicerss.org/?key=${PUBLIC_VOICE_RSS_KEY}&hl=pt-BR&src=${encodeURIComponent(text)}`;
  const audio = new Audio();
  audio.src = apiUrl;
  audio.play();
  return audio;
}
