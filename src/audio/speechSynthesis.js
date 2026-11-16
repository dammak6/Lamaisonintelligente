// speechSynthesis.js
// Synthèse vocale de secours native dans le navigateur pour l'assistante

class FrenchSpeechSynthesizer {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.frenchVoice = null;
    this.initVoices();
    if (this.synth && typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Recherche prioritaire d'une voix française naturelle chaleureuse (Julie / Natural / Neural)
    this.frenchVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('Julie') || v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Denise'))) ||
                       voices.find(v => v.lang === 'fr-FR' && !v.name.includes('Google') && v.localService) ||
                       voices.find(v => v.lang.startsWith('fr')) ||
                       null;
  }

  speak(text, onStart = null, onEnd = null) {
    if (!this.synth) {
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 2500);
      return;
    }

    // Arrête toute parole en cours
    this.stop();

    const cleanText = text.replace(/[«»"]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95; // Rythme posé pour le niveau A2
    utterance.pitch = 1.0;

    if (this.frenchVoice) {
      utterance.voice = this.frenchVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
      if (onEnd) onEnd();
    }
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

export const speechSynthesizer = new FrenchSpeechSynthesizer();
