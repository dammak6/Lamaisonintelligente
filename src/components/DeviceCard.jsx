// DeviceCard.jsx
// Carte interactive pour la présentation des 5 objets connectés

import React from 'react';
import { Volume2, Coffee, Blinds, Lightbulb, ThermometerSnowflake, Power, CheckCircle2 } from 'lucide-react';

const ICONS = {
  Volume2,
  Coffee,
  Blinds,
  Lightbulb,
  ThermometerSnowflake
};

export default function DeviceCard({
  device,
  isActive = false,
  isSelected = false,
  onToggle = null,
  onSelect = null
}) {
  const IconComponent = ICONS[device.icon] || Lightbulb;

  return (
    <div 
      className={`device-card-component ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}`}
      onClick={() => onSelect && onSelect(device.id)}
    >
      <div className="card-top-row">
        <div className={`device-icon-box ${isActive ? 'active-glow' : ''}`}>
          <IconComponent size={24} />
        </div>
        <div className="device-status-badge">
          <span className={`status-dot ${isActive ? 'dot-active' : 'dot-inactive'}`}></span>
          <span className="status-label">{isActive ? 'EN FONCTION' : 'EN VEILLE'}</span>
        </div>
      </div>

      <div className="card-titles">
        <span className="device-category">{device.frenchCategory}</span>
        <h3 className="device-name">{device.name}</h3>
        <span className="device-room">Localisation : {device.room}</span>
      </div>

      <p className="device-desc">{device.shortDesc}</p>

      <div className="card-footer-action">
        <div className="status-text-live">
          {isActive ? device.statusTextActive : device.statusTextInactive}
        </div>

        <button 
          className={`btn-device-toggle ${isActive ? 'btn-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggle) onToggle(device.id);
          }}
          title={device.actionName}
        >
          <Power size={14} />
          <span>{isActive ? 'Désactiver' : 'Activer'}</span>
        </button>
      </div>

      <div className="card-metric-footer">
        <span className="badge-tag">{device.badge}</span>
        <span className="stat-value">{device.detailStat}</span>
      </div>
    </div>
  );
}
