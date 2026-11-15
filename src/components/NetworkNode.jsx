// NetworkNode.jsx
// Nœud interactif pour le schéma réseau pédagogique de la Scène 4

import React from 'react';
import { User, Cpu, Wifi, Smartphone, Radio, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function NetworkNode({
  stepNumber,
  title,
  subtitle,
  iconType,
  details,
  isActive = false,
  isCompleted = false,
  protocols = []
}) {
  const renderIcon = () => {
    switch (iconType) {
      case 'user':
        return <User size={28} />;
      case 'assistant':
        return <Cpu size={28} />;
      case 'network':
        return <Wifi size={28} />;
      case 'devices':
        return <Radio size={28} />;
      default:
        return <Globe size={28} />;
    }
  };

  return (
    <div className={`network-step-card ${isActive ? 'step-active' : ''} ${isCompleted ? 'step-completed' : ''}`}>
      <div className="step-header-tag">
        <span className="step-number-pill">Étape 0{stepNumber}</span>
        {isCompleted && <CheckCircle2 size={16} className="text-cyan ml-auto" />}
      </div>

      <div className={`step-icon-circle ${isActive ? 'icon-pulse' : ''}`}>
        {renderIcon()}
      </div>

      <h3 className="step-title">{title}</h3>
      <span className="step-subtitle">{subtitle}</span>

      <p className="step-details">{details}</p>

      {protocols && protocols.length > 0 && (
        <div className="protocols-tags-list">
          {protocols.map((p, idx) => (
            <span key={idx} className="protocol-badge">
              {p.icon === 'wifi' && <Wifi size={12} />}
              {p.icon === 'bluetooth' && <Radio size={12} />}
              {p.icon === 'globe' && <Globe size={12} />}
              <strong>{p.name}</strong>
              <small>{p.desc}</small>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
