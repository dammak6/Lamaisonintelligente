// Scene7Conclusion.jsx
// SCÈNE 7 — CONCLUSION ET DÉBAT (25 secondes)
// Les lumières s'éteignent. L'assistante : « Avant de terminer, j'ai une question pour vous… »
// Grand affichage : « Une maison intelligente est-elle vraiment une bonne idée ? »
// Fin : LA MAISON INTELLIGENTE — Merci pour votre attention !

import React, { useEffect } from 'react';
import HouseEnvironment from '../components/HouseEnvironment';
import { HelpCircle, ThumbsUp, ThumbsDown, MessageSquare, Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../audio/audioManager';

export default function Scene7Conclusion({ stageIndex }) {
  useEffect(() => {
    if (stageIndex === 0) {
      // Les lumières s'éteignent doucement
      audioManager.playSleep();
    } else if (stageIndex === 1) {
      // Dernière intervention de l'assistante
      audioManager.playAssistant('assistant_question', "Avant de terminer, j'ai une question pour vous…");
    }
  }, [stageIndex]);

  // État de la maison pour la conclusion : s'éteint
  const houseState = {
    lights: stageIndex === 0 ? false : false,
    blinds: "closed",
    ac: false,
    coffee: false,
    speaker: false
  };

  return (
    <div className="scene-container scene-conclusion">
      {/* Maison en arrière-plan plongée dans la nuit */}
      <div className="conclusion-house-backdrop">
        <HouseEnvironment sceneId={7} stageIndex={stageIndex} houseState={houseState} />
      </div>

      <div className="conclusion-overlay-content">
        {/* Étape 1 & 2 : Grande question de débat */}
        {stageIndex >= 1 && stageIndex <= 2 && (
          <div className="debate-modal-card animate-slide-up">
            <div className="debate-badge">
              <HelpCircle size={20} className="text-cyan animate-pulse" />
              <span>DÉBAT OUVERT AVEC LA CLASSE</span>
            </div>

            <h1 className="debate-question-title">
              « Une maison intelligente est-elle vraiment une bonne idée ? »
            </h1>

            <div className="debate-columns-grid">
              <div className="debate-col col-pour">
                <div className="col-header">
                  <ThumbsUp size={18} className="text-emerald" />
                  <h4>POUR LE PROGRÈS</h4>
                </div>
                <ul>
                  <li>Gain de temps remarquable le matin</li>
                  <li>Économies sur la facture d'électricité</li>
                  <li>Confort et sécurité pour toute la famille</li>
                </ul>
              </div>

              <div className="debate-col col-contre">
                <div className="col-header">
                  <ThumbsDown size={18} className="text-red" />
                  <h4>CONTRE LES EXCÈS</h4>
                </div>
                <ul>
                  <li>Dépendance excessive à Internet et l'électricité</li>
                  <li>Risques pour la vie privée et les données</li>
                  <li>Prix d'achat encore inaccessible</li>
                </ul>
              </div>
            </div>

            <div className="debate-invitation">
              <MessageSquare size={16} className="text-cyan inline mr-2" />
              <span>Dammak et Louay vous invitent à partager vos avis et réflexions !</span>
            </div>
          </div>
        )}

        {/* Étape 3 : Écran final de clôture */}
        {stageIndex >= 3 && (
          <div className="final-credits-card animate-zoom-in">
            <div className="final-tag">
              <Sparkles size={16} className="text-cyan" />
              <span>FIN DE L'EXPÉRIMENTATION DOMOTIQUE</span>
            </div>

            <h1 className="final-title">LA MAISON INTELLIGENTE</h1>
            <p className="final-subtitle">Une maison qui pense, communique et agit.</p>

            <div className="final-thanks-box">
              <h2>Merci pour votre attention !</h2>
              <p>Avez-vous des questions pour Dammak et Louay ?</p>
            </div>

            <div className="final-presenters-row">
              <div className="presenter-card-final">
                <div className="p-avatar">D</div>
                <div>
                  <strong>Dammak</strong>
                  <small>Présentateur 1</small>
                </div>
              </div>
              <div className="presenter-card-final">
                <div className="p-avatar">L</div>
                <div>
                  <strong>Louay</strong>
                  <small>Présentateur 2</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
