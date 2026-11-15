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
          Le voyage invisible d'un ordre, de votre voix jusqu'à l'objet connecté.
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
            details="Vous donnez un ordre avec votre voix (« Allume le salon ») ou en appuyant sur un bouton de votre smartphone."
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
            subtitle="Le traducteur numérique"
            iconType="assistant"
            details="L'enceinte ou le boîtier central analyse votre voix et transforme les mots en un message binaire compréhensible par les machines."
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
            subtitle="L'autoroute de l'information"
            iconType="network"
            details="Les données voyagent instantanément dans l'air grâce aux ondes radio sécurisées."
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
            title="Objets Connectés"
            subtitle="L'exécution immédiate"
            iconType="devices"
            details="La puce électronique de la lampe, du store ou du climatiseur reçoit le signal et exécute l'action en 0,1 seconde !"
            isActive={stageIndex === 3 || stageIndex === 0}
            isCompleted={stageIndex >= 3}
          />
        </div>
      </div>

      {/* Résumé A2 en bas d'écran */}
      <div className="network-summary-banner">
        <Zap size={16} className="text-cyan animate-pulse" />
        <span>
          <strong>Formule simple à retenir :</strong> Ordre vocal → Signal informatique → Onde sans-fil → Action physique immédiate !
        </span>
      </div>
    </div>
  );
}
