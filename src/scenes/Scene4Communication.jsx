// Scene4Communication.jsx
// SCÈNE 4 — COMMENT COMMUNIQUENT-ILS ? (45 secondes)
// Schéma réseau pédagogique A2 : Utilisateur → Assistant → Réseau → Objets connectés

import React from 'react';
import NetworkNode from '../components/NetworkNode';
import { ArrowRight, Wifi, Radio, Globe, Zap, Cpu } from 'lucide-react';

export default function Scene4Communication({ stageIndex }) {
  // Protocoles de transmission détaillés pour l'étape Réseau
  const networkProtocols = [
    {
      name: "Wi-Fi",
      icon: "wifi",
      desc: "Portée dans toute la maison • Grand débit de données"
    },
    {
      name: "Bluetooth",
      icon: "bluetooth",
      desc: "Courte distance (10 mètres) • Direct et sans fil"
    },
    {
      name: "Internet & Cloud",
      icon: "globe",
      desc: "Connexion à l'extérieur • Contrôle depuis le travail ou l'école"
    }
  ];

  return (
    <div className="scene-container scene-communication">
      <div className="scene-header-section">
        <span className="section-pill">SCÈNE 04 • RÉSEAU ET TECHNOLOGIE</span>
        <h2 className="section-title">Comment communiquent les appareils ?</h2>
        <p className="section-lead">
          Le voyage invisible d'un ordre, de notre voix jusqu'à l'appareil.
        </p>
      </div>

      {/* Chaîne visuelle de communication à 4 maillons */}
      <div className="network-flow-container">
        {/* Nœud 1 : Utilisateur */}
        <div className="flow-step-wrapper">
          <NetworkNode
            stepNumber={1}
            title="L'Utilisateur"
            subtitle="La source de l'ordre"
            iconType="user"
            details="Nous donnons un ordre avec notre voix (« Allume le salon ») ou avec notre téléphone."
            isActive={stageIndex === 1 || stageIndex === 0}
            isCompleted={stageIndex > 1}
          />
        </div>

        <div className={`flow-connector ${stageIndex >= 1 ? 'connector-active' : ''}`}>
          <div className="signal-particle"></div>
          <ArrowRight size={22} className="connector-arrow" />
        </div>

        {/* Nœud 2 : Assistant / Cerveau */}
        <div className="flow-step-wrapper">
          <NetworkNode
            stepNumber={2}
            title="L'Assistant"
            subtitle="Le cerveau numérique"
            iconType="assistant"
            details="L'assistante écoute notre voix et prépare le message pour les appareils."
            isActive={stageIndex === 1 || stageIndex === 0}
            isCompleted={stageIndex > 1}
          />
        </div>

        <div className={`flow-connector ${stageIndex >= 2 ? 'connector-active' : ''}`}>
          <div className="signal-particle"></div>
          <ArrowRight size={22} className="connector-arrow" />
        </div>

        {/* Nœud 3 : Le Réseau sans-fil (Wi-Fi, Bluetooth, Internet) */}
        <div className="flow-step-wrapper flow-step-highlight">
          <NetworkNode
            stepNumber={3}
            title="Le Réseau"
            subtitle="La route sans fil"
            iconType="network"
            details="Le message voyage très vite dans l'air avec le Wi-Fi ou Internet."
            isActive={stageIndex === 2 || stageIndex === 0}
            isCompleted={stageIndex > 2}
            protocols={networkProtocols}
          />
        </div>

        <div className={`flow-connector ${stageIndex >= 3 ? 'connector-active' : ''}`}>
          <div className="signal-particle"></div>
          <ArrowRight size={22} className="connector-arrow" />
        </div>

        {/* Nœud 4 : Objets connectés */}
        <div className="flow-step-wrapper">
          <NetworkNode
            stepNumber={4}
            title="Appareils de la Maison"
            subtitle="L'action immédiate"
            iconType="devices"
            details="L'appareil reçoit le message et agit tout de suite : allumer, ouvrir, chauffer !"
            isActive={stageIndex === 3 || stageIndex === 0}
            isCompleted={stageIndex >= 3}
          />
        </div>
      </div>

      {/* Résumé A2 en bas d'écran */}
      <div className="network-summary-banner">
        <Zap size={16} className="text-cyan animate-pulse" />
        <span>
          <strong>Formule simple :</strong> Notre voix → L'assistante → Le réseau sans fil → L'appareil agit !
        </span>
      </div>
    </div>
  );
}
