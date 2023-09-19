import { PUBLIC_VOICE_RSS_KEY } from "$env/static/public";

export function speak(audio: HTMLAudioElement, text: string): HTMLAudioElement {
  const apiUrl = `http://api.voicerss.org/?key=${PUBLIC_VOICE_RSS_KEY}&hl=pt-BR&src=${encodeURIComponent(text)}`;
  audio.src = apiUrl;
  return audio;
}
