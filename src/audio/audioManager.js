// audioManager.js
// Gestionnaire audio centralisé
// Gère la lecture des fichiers audio locaux, le fallback synthèse vocale et les effets sonores

import { AUDIO_MANIFEST } from '../data/presentationData';
import { soundEffects } from './soundEffects';
import { speechSynthesizer } from './speechSynthesis';

class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.subtitleCallback = null;
    this.isMuted = false;
  }

  onSubtitleChange(cb) {
    this.subtitleCallback = cb;
  }

  setMuted(muted) {
    this.isMuted = muted;
    soundEffects.setMuted(muted);
    if (muted) {
      this.stop();
    }
  }

  showSubtitle(text, speaker = "Assistant", duration = 4000) {
    if (this.subtitleCallback) {
      this.subtitleCallback({ text, speaker, visible: true });
    }
    if (duration > 0) {
      clearTimeout(this.subTimer);
      this.subTimer = setTimeout(() => {
        this.clearSubtitle();
      }, duration);
    }
  }

  clearSubtitle() {
    if (this.subtitleCallback) {
      this.subtitleCallback({ text: "", speaker: "", visible: false });
    }
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    speechSynthesizer.stop();
  }

  // Joue la réponse de l'assistante (avec gestion gracieuse des fichiers locaux et fallback synthèse vocale)
  playAssistant(key, textFallback = null) {
    this.stop();

    const manifestItem = AUDIO_MANIFEST[key];
    const text = (manifestItem && manifestItem.text) || textFallback || "";
    const filename = manifestItem ? manifestItem.filename : null;

    if (!text && !filename) return;

    // Affichage immédiat du sous-titre
    this.showSubtitle(text, "Assistant", 5000);

    if (this.isMuted) return;

    if (filename) {
      const audioPath = `/audio/${filename}`;
      const audio = new Audio(audioPath);
      this.currentAudio = audio;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.onended = () => {
              this.currentAudio = null;
            };
          })
          .catch((err) => {
            // Le fichier local n'existe pas encore ou lecture bloquée -> fallback élégant synthèse vocale
            console.info(`Fichier audio local ${audioPath} non trouvé, bascule sur la synthèse vocale intégrée.`);
            this.currentAudio = null;
            speechSynthesizer.speak(text);
          });
      }
    } else {
      speechSynthesizer.speak(text);
    }
  }

  // Effet d'éveil de la maison
  playWakeup() {
    soundEffects.playWakeupChime();
  }

  // Effet d'interrupteur / lumière
  playSwitch() {
    soundEffects.playLightSwitch();
  }

  // Effet activation appareil
  playDevice() {
    soundEffects.playDeviceActivate();
  }

  // Effet envoi message smartphone
  playPhoneSent() {
    soundEffects.playPhoneMessageSent();
  }

  // Effet réponse message
  playPhoneReceived() {
    soundEffects.playPhoneMessageReceived();
  }

  // Effet coupure Internet / bug Wi-Fi
  playGlitch() {
    soundEffects.playOfflineGlitch();
  }

  // Effet extinction fin de présentation
  playSleep() {
    soundEffects.playSleepChime();
  }

  // Effet clic
  playNavClick() {
    soundEffects.playClick();
  }
}

export const audioManager = new AudioManager();
