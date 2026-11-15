// Scene6Disadvantages.jsx
// SCÈNE 6 — LES INCONVÉNIENTS ET LES RISQUES (55 secondes)
// 1. Dépendance à Internet 2. Protection de la vie privée 3. Risques de piratage 4. Prix élevé
// Simulation réaliste de coupure Wi-Fi temporaire (sans danger excessif)

import React, { useEffect, useState } from 'react';
import { WifiOff, EyeOff, ShieldAlert, DollarSign, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { audioManager } from '../audio/audioManager';

export default function Scene6Disadvantages({ stageIndex }) {
  const [isSimulatingGlitch, setIsSimulatingGlitch] = useState(false);

  useEffect(() => {
    if (stageIndex === 1) {
      // Déclenchement de la simulation de coupure Wi-Fi
      setIsSimulatingGlitch(true);
      audioManager.playGlitch();
      const timer = setTimeout(() => {
        setIsSimulatingGlitch(false);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setIsSimulatingGlitch(false);
    }
  }, [stageIndex]);

  const risks = [
    {
      id: "internet",
      title: "1. Dépendance à Internet",
      subtitle: "Pas de réseau = pas de commandes à distance",
      desc: "Si votre box Internet tombe en panne ou s'il y a une coupure électrique générale, certains objets cessent de répondre.",
      example: "Exemple : Impossible d'ouvrir le portail avec le smartphone sans réseau.",
      icon: WifiOff,
      color: "text-red",
      stage: 1
    },
    {
      id: "privacy",
      title: "2. Protection de la vie privée",
      subtitle: "Nos données personnelles et nos habitudes",
      desc: "Les enceintes et caméras écoutent et enregistrent des informations sur nos horaires et notre vie de famille.",
      example: "Exemple : Les grandes entreprises savent à quelle heure vous vous levez.",
      icon: EyeOff,
      color: "text-amber",
      stage: 2
    },
    {
      id: "hack",
      title: "3. Risques de piratage",
      subtitle: "La sécurité informatique à domicile",
      desc: "Si les appareils ont des mots de passe trop simples, un pirate informatique peut tenter de s'y connecter.",
      example: "Exemple : Un individu malveillant qui tente d'éteindre les lumières.",
      icon: ShieldAlert,
      color: "text-orange",
      stage: 3
    },
    {
      id: "cost",
      title: "4. Prix encore très élevé",
      subtitle: "Un investissement important",
      desc: "Acheter des ampoules connectées, des moteurs de stores et faire installer le réseau par un technicien coûte cher.",
      example: "Exemple : Une ampoule connectée coûte 5 fois plus cher qu'une ampoule classique.",
      icon: DollarSign,
      color: "text-yellow",
      stage: 3
    }
  ];

  return (
    <div className="scene-container scene-disadvantages">
      <div className="scene-header-section">
        <span className="section-pill section-pill-amber">SCÈNE 06 • PRUDENCE ET VIGILANCE</span>
        <h2 className="section-title">Les 4 Inconvénients et Risques</h2>
        <p className="section-lead">
          Une technologie formidable mais qui exige de la responsabilité et de bonnes habitudes.
        </p>
      </div>

      {/* Bannière de simulation de coupure Wi-Fi (Stage 1) */}
      {isSimulatingGlitch && (
        <div className="network-glitch-banner animate-glitch">
          <div className="glitch-icon">
            <WifiOff size={22} className="text-red animate-pulse" />
          </div>
          <div className="glitch-text">
            <strong>SIMULATION EN DIRECT : Perte du signal Wi-Fi !</strong>
            <small>Les appareils passent en mode autonome local temporaire… Rétablissement du réseau en cours.</small>
          </div>
          <div className="glitch-badge">
            <RefreshCw size={14} className="spin-fast" />
            <span>Reconnexion…</span>
          </div>
        </div>
      )}

      {/* Grille des 4 inconvénients */}
      <div className="disadvantages-grid">
        {risks.map((risk) => {
          const isHighlighted = stageIndex === risk.stage || stageIndex >= 4;
          const Icon = risk.icon;
          return (
            <div 
              key={risk.id}
              className={`risk-card ${isHighlighted ? 'risk-active' : 'risk-dimmed'}`}
            >
              <div className="risk-header-row">
                <div className="risk-icon-box">
                  <Icon size={24} className={risk.color} />
                </div>
                <div className="risk-number-badge">RISQUE 0{risk.stage}</div>
              </div>

              <h3 className="risk-title">{risk.title}</h3>
              <span className="risk-subtitle">{risk.subtitle}</span>
              <p className="risk-desc">{risk.desc}</p>

              <div className="risk-example-box">
                {risk.example}
              </div>
            </div>
          );
        })}
      </div>

      {/* Panneau de conseils pratiques (Stage 4) */}
      {stageIndex >= 4 && (
        <div className="security-tips-banner animate-slide-up">
          <div className="tips-badge">
            <CheckCircle size={18} className="text-cyan" />
            <span>LE CONSEIL PRATIQUE DE DAMMAK & LOUAY</span>
          </div>
          <p className="tips-text">
            « Pour profiter de la maison intelligente en toute tranquillité : créez des <strong>mots de passe complexes</strong>, mettez toujours vos <strong>appareils à jour</strong> et gardez des <strong>interrupteurs manuels</strong> ! »
          </p>
        </div>
      )}
    </div>
  );
}
