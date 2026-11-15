// PresentationFrame.jsx
// Conteneur maître 16:9 (1920x1080) avec mise à l'échelle automatique réactive
// Gère les clics gauche/droit, le plein écran, les raccourcis clavier et la navigation sans blocage

import React, { useState, useEffect, useRef } from 'react';
import NavigationBar from './NavigationBar';
import PresenterCues from './PresenterCues';
import AssistantSubtitles from './AssistantSubtitles';
import { SCENES } from '../data/presentationData';
import { audioManager } from '../audio/audioManager';

export default function PresentationFrame({ children, currentSceneIndex, currentStageIndex, onSceneChange, onStageChange }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitleData, setSubtitleData] = useState({ text: '', speaker: '', visible: false });

  // Écoute des sous-titres de l'assistante
  useEffect(() => {
    audioManager.onSubtitleChange((data) => {
      setSubtitleData(data);
    });
  }, []);

  // Calcul du facteur d'échelle dynamique pour maintenir strictement le ratio 16:9 (1920x1080)
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const targetWidth = 1920;
      const targetHeight = 1080;

      const scaleX = windowWidth / targetWidth;
      const scaleY = windowHeight / targetHeight;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Détection du plein écran natif
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const currentScene = SCENES[currentSceneIndex];
  const currentStage = currentScene.stages[currentStageIndex];
  const totalStages = currentScene.stages.length;

  // Passage à l'étape suivante (ou scène suivante)
  const handleNext = () => {
    audioManager.playNavClick();
    if (currentStageIndex < totalStages - 1) {
      onStageChange(currentStageIndex + 1);
    } else if (currentSceneIndex < SCENES.length - 1) {
      audioManager.stop();
      onSceneChange(currentSceneIndex + 1, 0);
    }
  };

  // Retour à l'étape précédente (ou scène précédente)
  const handlePrev = () => {
    audioManager.playNavClick();
    if (currentStageIndex > 0) {
      onStageChange(currentStageIndex - 1);
    } else if (currentSceneIndex > 0) {
      audioManager.stop();
      const prevScene = SCENES[currentSceneIndex - 1];
      onSceneChange(currentSceneIndex - 1, prevScene.stages.length - 1);
    }
  };

  // Recommencer la scène active
  const handleRestart = () => {
    audioManager.stop();
    audioManager.playNavClick();
    onStageChange(0);
  };

  // Bascule du plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Bascule muet / son
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioManager.setMuted(newMuted);
  };

  // Gestion des clics de souris :
  // Clic GAUCHE : Étape suivante
  // Clic DROIT : Étape précédente (menu contextuel désactivé)
  const handleClick = (e) => {
    // Si le clic provient d'un bouton ou d'un contrôle interactif, ne pas intercepter
    if (e.target.closest('button') || e.target.closest('.interactive-clickable') || e.target.closest('.prompter-drawer')) {
      return;
    }
    handleNext();
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Désactive le menu contextuel du navigateur
    handlePrev();
  };

  // Raccourcis clavier (Flèches, Espace, R, F, Échap)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIndex, currentStageIndex, totalStages]);

  return (
    <div 
      className="presentation-viewport-wrapper"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div 
        ref={containerRef}
        className="presentation-stage-canvas"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Barre de navigation supérieure */}
        <NavigationBar
          currentSceneIndex={currentSceneIndex}
          currentStageIndex={currentStageIndex}
          totalStages={totalStages}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          onPrevStage={handlePrev}
          onNextStage={handleNext}
          onRestartScene={handleRestart}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          onSelectScene={(idx) => {
            audioManager.stop();
            onSceneChange(idx, 0);
          }}
        />

        {/* Corps principal de la scène */}
        <main className="presentation-body">
          {children}
        </main>

        {/* Sous-titres cinématiques de l'assistante */}
        <AssistantSubtitles subtitleData={subtitleData} />

        {/* Barre de répliques et souffleur pour Dammak et Louay */}
        <PresenterCues
          currentScene={currentScene}
          currentStage={currentStage}
          onJumpToSceneStage={(scId, stgIdx) => {
            audioManager.stop();
            const scIdx = SCENES.findIndex(s => s.id === scId);
            if (scIdx !== -1) {
              onSceneChange(scIdx, stgIdx);
            }
          }}
        />
      </div>
    </div>
  );
}
