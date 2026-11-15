// NavigationBar.jsx
// Barre de contrôle supérieure et indicateur de progression

import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, ChevronLeft, ChevronRight, Home, Radio } from 'lucide-react';
import { SCENES, PRESENTATION_INFO } from '../data/presentationData';

export default function NavigationBar({
  currentSceneIndex,
  currentStageIndex,
  totalStages,
  isMuted,
  isFullscreen,
  onPrevStage,
  onNextStage,
  onRestartScene,
  onToggleMute,
  onToggleFullscreen,
  onSelectScene
}) {
  const currentScene = SCENES[currentSceneIndex];

  return (
    <header className="presentation-header">
      {/* Côté gauche : Logo et Titre de la présentation */}
      <div className="header-brand">
        <div className="brand-icon">
          <Home size={18} className="text-cyan" />
        </div>
        <div className="brand-text">
          <span className="brand-title">{PRESENTATION_INFO.title}</span>
          <span className="brand-subtitle">Mahmoud Dammak & Louay Kouki • Niveau A2</span>
        </div>
      </div>

      {/* Centre : Indicateur de scènes (7 scènes) et de sous-étapes */}
      <div className="header-scenes-nav">
        <div className="scenes-progress-pills">
          {SCENES.map((sc, idx) => {
            const isPassed = idx < currentSceneIndex;
            const isCurrent = idx === currentSceneIndex;
            return (
              <button
                key={sc.id}
                type="button"
                className={`scene-pill-btn ${isCurrent ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                onClick={() => onSelectScene(idx)}
                title={`Aller à la scène ${sc.number} : ${sc.name}`}
              >
                <span className="pill-num">{sc.number}</span>
                <span className="pill-name">{sc.shortName || sc.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Petits points d'étapes de la scène active */}
        <div className="stages-indicator">
          {Array.from({ length: totalStages }).map((_, stgIdx) => (
            <span
              key={stgIdx}
              className={`stage-dot ${stgIdx === currentStageIndex ? 'dot-current' : stgIdx < currentStageIndex ? 'dot-done' : ''}`}
              title={`Étape ${stgIdx + 1}/${totalStages}`}
            />
          ))}
        </div>
      </div>

      {/* Côté droit : Contrôles (Son, Plein écran, Recommencer, Suivant/Précédent) */}
      <div className="header-controls">
        <div className="time-badge">
          <Radio size={12} className="text-cyan animate-pulse" />
          <span>{currentScene.duration}</span>
        </div>

        <button
          type="button"
          className="btn-control"
          onClick={onRestartScene}
          title="Recommencer cette scène (Touche R)"
        >
          <RotateCcw size={16} />
          <span className="btn-label">Rejouer</span>
        </button>

        <button
          type="button"
          className={`btn-control ${isMuted ? 'btn-muted' : ''}`}
          onClick={onToggleMute}
          title={isMuted ? "Activer le son" : "Couper le son"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          type="button"
          className="btn-control"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Quitter le plein écran (Échap)" : "Plein écran 16:9 (F)"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </header>
  );
}
