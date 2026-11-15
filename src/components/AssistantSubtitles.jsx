// AssistantSubtitles.jsx
// Bandeau de sous-titres cinématiques pour l'assistante vocale invisible

import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';

export default function AssistantSubtitles({ subtitleData }) {
  if (!subtitleData || !subtitleData.visible || !subtitleData.text) {
    return null;
  }

  const { text, speaker = "Assistant" } = subtitleData;

  return (
    <div className="assistant-subtitles-wrapper animate-fade-in">
      <div className="assistant-subtitles-pill">
        <div className="subtitles-avatar">
          <div className="voice-pulse-ring"></div>
          <Volume2 size={18} className="text-cyan animate-pulse" />
        </div>
        <div className="subtitles-content">
          <div className="subtitles-label">
            <span>{speaker.toUpperCase()}</span>
            <small>Système domotique</small>
          </div>
          <div className="subtitles-text">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
