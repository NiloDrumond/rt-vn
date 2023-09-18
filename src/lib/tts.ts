export function speak(text: string): void {
  const speechSynthesis = window.speechSynthesis;

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Set the language to Brazilian Portuguese
    speechSynthesis.speak(utterance);
  } else {
    console.error('Text-to-speech not supported in this browser.');
  }
}
