export function speak(text: string): void {
    const apiKey = 'API_KEY';
    const apiUrl = `http://api.voicerss.org/?key=${apiKey}&hl=pt-BR&src=${encodeURIComponent(text)}`;
    const audio = new Audio();
    audio.src = apiUrl;
    audio.play();
  }
