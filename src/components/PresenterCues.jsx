// PresenterCues.jsx
// Barre de répliques et souffleur pour Mahmoud Dammak et Louay Kouki
// Permet aux deux élèves de répéter et de suivre leur texte en direct

import React, { useState } from 'react';
import { User, Volume2, Sparkles, BookOpen, ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { PRESENTATION_INFO, SCENES } from '../data/presentationData';

export default function PresenterCues({
  currentScene,
  currentStage,
  onJumpToSceneStage = null
}) {
  const [showDrawer, setShowDrawer] = useState(false);

  const speaker = currentStage?.speaker || 'system';
  const dialogue = currentStage?.dialogue;
  const cue = currentStage?.cue;

  const getSpeakerBadge = () => {
    switch (speaker) {
      case 'dammak':
        return {
          name: 'Mahmoud Dammak',
          label: 'Présentateur 1',
          classes: 'badge-dammak',
          color: '#38bdf8'
        };
      case 'louay':
        return {
          name: 'Louay Kouki',
          label: 'Présentateur 2',
          classes: 'badge-louay',
          color: '#818cf8'
        };
      case 'assistant':
        return {
          name: 'Assistante Vocale',
          label: 'Maison Intelligente',
          classes: 'badge-assistant',
          color: '#60a5fa'
        };
      default:
        return {
          name: 'Action de scène',
          label: 'Transition',
          classes: 'badge-system',
          color: '#94a3b8'
        };
    }
  };

  const badge = getSpeakerBadge();

  return (
    <>
      {/* Barre de réplique active en bas de l'écran */}
      <aside aria-label="Souffleur des présentateurs" className="presenter-cue-bar">
        <div className="cue-content">
          <div className="speaker-identity">
            <span className={`speaker-tag ${badge.classes}`}>
              {speaker === 'assistant' ? <Volume2 size={15} /> : <User size={15} />}
              <strong>{badge.name}</strong>
              <small className="speaker-subrole">({badge.label})</small>
            </span>
          </div>

          <div className="speech-prompter">
            {dialogue ? (
              <p className="spoken-text">{dialogue}</p>
            ) : (
              <p className="spoken-text stage-direction">
                <Sparkles size={14} className="inline mr-1 text-cyan" />
                {cue || "Transition de scène…"}
              </p>
            )}
            {cue && dialogue && (
              <span className="action-hint">
                <strong>Conseil de jeu :</strong> {cue}
              </span>
            )}
          </div>
        </div>

        <div className="cue-controls">
          <button 
            type="button"
            className="prompter-toggle-btn"
            onClick={() => setShowDrawer(!showDrawer)}
            title="Ouvrir le carnet de texte complet"
            aria-expanded={showDrawer}
          >
            <BookOpen size={15} />
            <span>Texte A2</span>
            {showDrawer ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </aside>

      {/* Tiroir déroulant du texte intégral pour répétition */}
      {showDrawer && (
        <div className="prompter-drawer-overlay" onClick={() => setShowDrawer(false)}>
          <div className="prompter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h3>Livret des Présentateurs — {PRESENTATION_INFO.title}</h3>
                <p className="text-muted">Répartition équilibrée 50/50 entre Mahmoud Dammak et Louay Kouki (Niveau A2)</p>
              </div>
              <button 
                type="button"
                className="btn-close-drawer"
                onClick={() => setShowDrawer(false)}
              >
                ✕ Fermer
              </button>
            </div>

            <div className="drawer-scenes-list">
              {SCENES.map((scene) => (
                <div 
                  key={scene.id} 
                  className={`drawer-scene-card ${scene.id === currentScene.id ? 'active-scene-card' : ''}`}
                >
                  <div className="drawer-scene-title">
                    <span className="scene-num">Scène {scene.number}</span>
                    <h4>{scene.name}</h4>
                    <span className="scene-time"><Clock size={12} /> {scene.duration}</span>
                  </div>

                  <div className="drawer-stages">
                    {scene.stages.map((stg) => {
                      const isCurrent = scene.id === currentScene.id && stg.stageIndex === currentStage.stageIndex;
                      return (
                        <div 
                          key={stg.stageIndex} 
                          className={`drawer-stage-item ${isCurrent ? 'current-step' : ''}`}
                          onClick={() => {
                            if (onJumpToSceneStage) {
                              onJumpToSceneStage(scene.id, stg.stageIndex);
                              setShowDrawer(false);
                            }
                          }}
                        >
                          <div className="drawer-stage-speaker">
                            <span className={`mini-badge badge-${stg.speaker}`}>
                              {stg.speaker.toUpperCase()}
                            </span>
                            <span className="stage-title-text">{stg.title}</span>
                          </div>
                          {stg.dialogue && <div className="drawer-dialogue">{stg.dialogue}</div>}
                          {stg.cue && <div className="drawer-cue">→ {stg.cue}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
