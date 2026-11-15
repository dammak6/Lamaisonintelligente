// Scene1Opening.jsx
// SCÈNE 1 — OUVERTURE (30 secondes)
// Écran noir initial, la maison apparaît, les lumières s'allument une à une, l'assistante salue la classe

import React, { useEffect } from 'react';
import HouseEnvironment from '../components/HouseEnvironment';
import { Sparkles, Radio, CheckCircle } from 'lucide-react';
import { audioManager } from '../audio/audioManager';

export default function Scene1Opening({ stageIndex, onTriggerAction }) {
  // Déclenchement automatique des sons et voix selon l'étape de la scène 1
  useEffect(() => {
    if (stageIndex === 0) {
      // Écran sombre, son discret d'ambiance
      audioManager.stop();
    } else if (stageIndex === 1) {
      // Réveil de la maison : carillon Web Audio API + voix de l'assistante
      audioManager.playWakeup();
      setTimeout(() => {
        audioManager.playAssistant('assistant_bonjour', 'Bonjour ! Votre maison est prête.');
      }, 600);
    } else if (stageIndex === 2) {
      audioManager.playSwitch();
    }
  }, [stageIndex]);

  // État de la maison selon le sous-stade
  const houseState = {
    lights: stageIndex >= 1,
    blinds: stageIndex >= 3 ? "half" : "closed",
    ac: false,
    coffee: false,
    speaker: false
  };

  return (
    <div className="scene-container scene-opening">
      {/* Rendu principal de la maison moderne */}
      <div className={`scene-house-viewport ${stageIndex === 0 ? 'house-sleep-mode' : 'house-awake-mode'}`}>
        <HouseEnvironment sceneId={1} stageIndex={stageIndex} houseState={houseState} />
      </div>

      {/* Titre et introduction scénique */}
      <div className="scene-content-overlay">
        {stageIndex >= 1 && (
          <div className="main-title-block animate-slide-up">
            <div className="title-status-tag">
              <span className="live-dot"></span>
              SYSTÈME EN LIGNE • EXPÉRIMENTATION EN DIRECT
            </div>
            <h1 className="hero-presentation-title">
              LA MAISON INTELLIGENTE
            </h1>
            <p className="hero-presentation-subtitle">
              Une maison qui pense, communique et agit.
            </p>

            <div className="presenters-badge-row">
              <span className="presenter-chip chip-dammak">
                <span className="chip-avatar">D</span>
                Dammak (Présentateur 1)
              </span>
              <span className="chip-separator">+</span>
              <span className="presenter-chip chip-louay">
                <span className="chip-avatar">L</span>
                Louay (Présentateur 2)
              </span>
            </div>
          </div>
        )}

        {/* Message d'aide au premier clic si au tout début */}
        {stageIndex === 0 && (
          <div className="click-start-prompt animate-pulse">
            <div className="prompt-pill">
              <Sparkles size={16} className="text-cyan" />
              <span>Cliquez avec la souris pour réveiller la maison et démarrer la présentation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
