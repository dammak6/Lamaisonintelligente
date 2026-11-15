// Scene2Definition.jsx
// SCÈNE 2 — DÉFINITION (40 secondes)
// « Une maison intelligente utilise des objets connectés pour faciliter notre vie. »
// 3 Piliers visuels clairs : Capteurs, Réseau de communication, Contrôle & Automatisation

import React from 'react';
import { Cpu, Wifi, Smartphone, Check, Sparkles, Layers, Sliders } from 'lucide-react';

export default function Scene2Definition({ stageIndex }) {
  return (
    <div className="scene-container scene-definition">
      <div className="scene-header-section">
        <span className="section-pill">SCÈNE 02 • COMPRENDRE LA NOTION</span>
        <h2 className="section-title">Qu'est-ce qu'une maison intelligente ?</h2>
        <p className="section-lead">
          Une explication simple et claire pour comprendre cette révolution technologique.
        </p>
      </div>

      {/* Bannière de définition centrale (affichée dès le stage 1) */}
      <div className={`central-definition-banner ${stageIndex >= 1 ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="quote-mark">“</div>
        <p className="definition-quote">
          Une maison intelligente utilise des <strong>objets connectés</strong> pour <strong>faciliter notre vie</strong>.
        </p>
        <span className="definition-subquote">
          Les appareils sont connectés. Ils peuvent communiquer entre eux.
        </span>
      </div>

      {/* Les 3 piliers visuels de la maison connectée (stage 2 & 3) */}
      <div className="definition-pillars-grid">
        {/* Pilier 1 : Objets & Capteurs */}
        <div className={`pillar-card ${stageIndex >= 2 ? 'animate-slide-up-1 active-pillar' : ''}`}>
          <div className="pillar-icon-box">
            <Cpu size={26} className="text-cyan" />
          </div>
          <div className="pillar-tag">PILIER 1</div>
          <h3 className="pillar-title">Les Objets Connectés</h3>
          <p className="pillar-desc">
            Des appareils avec des capteurs simples (lumières, stores, chauffage, musique).
          </p>
          <div className="pillar-badge">
            <Check size={14} className="text-cyan" />
            <span>Capteurs de présence & température</span>
          </div>
        </div>

        {/* Pilier 2 : Le Réseau sans-fil */}
        <div className={`pillar-card ${stageIndex >= 2 ? 'animate-slide-up-2 active-pillar' : ''}`}>
          <div className="pillar-icon-box">
            <Wifi size={26} className="text-indigo" />
          </div>
          <div className="pillar-tag">PILIER 2</div>
          <h3 className="pillar-title">Le Réseau sans fil</h3>
          <p className="pillar-desc">
            Une connexion sans fil (Wi-Fi, Bluetooth) qui relie les appareils entre eux et à Internet.
          </p>
          <div className="pillar-badge">
            <Check size={14} className="text-cyan" />
            <span>Transmission rapide et invisible</span>
          </div>
        </div>

        {/* Pilier 3 : Contrôle & Automatisation */}
        <div className={`pillar-card ${stageIndex >= 3 ? 'animate-slide-up-3 active-pillar' : ''}`}>
          <div className="pillar-icon-box">
            <Smartphone size={26} className="text-blue" />
          </div>
          <div className="pillar-tag">PILIER 3</div>
          <h3 className="pillar-title">Contrôle à Distance</h3>
          <p className="pillar-desc">
            Avec une maison intelligente, je peux contrôler mes appareils avec mon téléphone ou ma voix.
          </p>
          <div className="pillar-badge">
            <Check size={14} className="text-cyan" />
            <span>Par smartphone ou à la voix</span>
          </div>
        </div>
      </div>
    </div>
  );
}
