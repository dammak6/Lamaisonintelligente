// Scene5Advantages.jsx
// SCÈNE 5 — LES 5 GRANDS AVANTAGES (45 secondes)
// 1. Gain de temps 2. Confort 3. Économie d'énergie 4. Contrôle à distance 5. Sécurité
// Question interactive à la classe : « Qui aimerait vivre dans une maison comme celle-ci ? »

import React, { useState } from 'react';
import { Clock, Sofa, Leaf, Smartphone, ShieldCheck, Hand, Sparkles } from 'lucide-react';

export default function Scene5Advantages({ stageIndex }) {
  const [handCount, setHandCount] = useState(0);

  const advantages = [
    {
      id: "time",
      title: "1. Gain de temps",
      short: "Moins de corvées quotidiennes",
      desc: "Les lumières s'éteignent seules et le café coule tout seul au réveil.",
      example: "Exemple : 15 minutes gagnées chaque matin.",
      icon: Clock,
      color: "text-cyan",
      stage: 1
    },
    {
      id: "comfort",
      title: "2. Confort",
      short: "La maison s'adapte à nous",
      desc: "La bonne température et les lumières idéales dès votre retour.",
      example: "Exemple : Un salon toujours à 21°C.",
      icon: Sofa,
      color: "text-blue",
      stage: 1
    },
    {
      id: "energy",
      title: "3. Économie d'énergie",
      short: "Moins de gaspillage",
      desc: "Le chauffage et les lampes se coupent seuls dans les pièces vides.",
      example: "Exemple : Moins d'électricité sur la facture.",
      icon: Leaf,
      color: "text-emerald",
      stage: 2
    },
    {
      id: "remote",
      title: "4. Contrôle à distance",
      short: "Vérifier avec le téléphone",
      desc: "Vérifiez sur votre smartphone si les appareils sont bien éteints.",
      example: "Exemple : Éteindre une lampe depuis l'école ou le travail.",
      icon: Smartphone,
      color: "text-indigo",
      stage: 2
    },
    {
      id: "security",
      title: "5. Sécurité",
      short: "Protection de la maison",
      desc: "Détecteurs de fumée et alertes automatiques sur le téléphone.",
      example: "Exemple : Notification immédiate en cas de problème.",
      icon: ShieldCheck,
      color: "text-amber",
      stage: 3
    }
  ];

  return (
    <div className="scene-container scene-advantages">
      <div className="scene-header-section">
        <span className="section-pill">SCÈNE 05 • LES BÉNÉFICES DU QUOTIDIEN</span>
        <h2 className="section-title">Pourquoi choisir une maison intelligente ?</h2>
        <p className="section-lead">
          Cinq atouts majeurs pour transformer notre vie à la maison.
        </p>
      </div>

      {/* Grille des 5 cartes avantages */}
      <div className="advantages-grid">
        {advantages.map((adv) => {
          const isHighlighted = stageIndex === adv.stage || stageIndex >= 4;
          const Icon = adv.icon;
          return (
            <div 
              key={adv.id} 
              className={`advantage-card ${isHighlighted ? 'advantage-active' : 'advantage-dimmed'}`}
            >
              <div className="advantage-icon-wrapper">
                <Icon size={24} className={adv.color} />
              </div>
              <h3 className="advantage-title">{adv.title}</h3>
              <span className="advantage-short">{adv.short}</span>
              <p className="advantage-desc">{adv.desc}</p>
              <div className="advantage-example">
                <Sparkles size={12} className="inline mr-1 text-cyan" />
                {adv.example}
              </div>
            </div>
          );
        })}
      </div>

      {/* Question interactive pour la classe (Stage 4) */}
      {stageIndex >= 4 && (
        <div className="audience-question-banner animate-slide-up">
          <div className="question-content">
            <div className="question-badge">
              <Hand size={18} className="text-cyan animate-bounce" />
              <span>QUESTION INTERACTIVE À LA CLASSE</span>
            </div>
            <h3 className="question-text">
              « Qui aimerait vivre dans une maison comme celle-ci ? »
            </h3>
            <p className="question-hint">
              Levez la main dans la salle ! Les présentateurs comptent vos réponses en direct :
            </p>
          </div>

          <div className="hands-counter-box">
            <span className="counter-number">{handCount}</span>
            <span className="counter-label">mains levées</span>
            <div className="counter-buttons">
              <button 
                type="button" 
                className="btn-counter" 
                onClick={() => setHandCount(prev => Math.max(0, prev - 1))}
              >
                -
              </button>
              <button 
                type="button" 
                className="btn-counter btn-primary-counter" 
                onClick={() => setHandCount(prev => prev + 1)}
              >
                + Lever la main
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
