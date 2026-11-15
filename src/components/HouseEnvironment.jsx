// HouseEnvironment.jsx
// Représentation visuelle réaliste d'une maison d'architecte moderne
// Gère l'éclairage par pièce, les stores motorisés, l'air conditionné et les 5 appareils connectés

import React from 'react';
import { Volume2, Coffee, Blinds, Lightbulb, ThermometerSnowflake, Wifi, Radio } from 'lucide-react';

export default function HouseEnvironment({
  houseState = { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
  activeDeviceId = null,
  highlightMulti = false,
  isOffline = false,
  zoomMode = false,
  onDeviceClick = null
}) {
  const { lights, blinds, ac, coffee, speaker } = houseState;

  // Détermination de l'état des stores (ouvert, fermé, mi-hauteur)
  const isBlindsOpen = blinds === "open";
  const isBlindsHalf = blinds === "half";

  return (
    <div className={`house-environment-container ${zoomMode ? 'zoom-focus' : ''} ${isOffline ? 'house-glitch' : ''}`}>
      {/* Ciel nocturne / atmosphère extérieure */}
      <div className="house-sky-backdrop">
        <div className="sky-stars"></div>
        <div className="sky-moon-glow"></div>
      </div>

      {/* Rendu architectural de la maison moderne */}
      <div className="house-architecture">
        {/* Silhouette du toit moderne plat avec casquette architecturale */}
        <div className="house-roofline">
          <div className="roof-accent-light"></div>
        </div>

        {/* Façade principale en béton ciré et bois élégant */}
        <div className="house-facade">
          {/* Étage supérieur : Chambre & Espace Climatisation */}
          <div className={`room room-upper ${lights ? 'lights-active' : 'lights-off'}`}>
            <div className="room-label">
              <span className="room-indicator"></span>
              SUITE & CLIMATISATION
            </div>

            {/* Unité de climatisation murale */}
            <div 
              className={`device-hotspot device-ac ${ac ? 'active' : ''} ${activeDeviceId === 'ac' ? 'focused' : ''}`}
              onClick={() => onDeviceClick && onDeviceClick('ac')}
              title="Climatisation connectée"
            >
              <div className="hotspot-badge">
                <ThermometerSnowflake size={18} className={ac ? 'spin-slow text-cyan' : ''} />
                <span>{ac ? '21.0°C' : 'Veille'}</span>
              </div>
              {ac && (
                <div className="airflow-particles">
                  <div className="airflow-beam beam-1"></div>
                  <div className="airflow-beam beam-2"></div>
                  <div className="airflow-beam beam-3"></div>
                </div>
              )}
            </div>

            {/* Fenêtre supérieure avec stores */}
            <div className="window-frame upper-window">
              <div className={`smart-blinds ${isBlindsOpen ? 'blinds-up' : isBlindsHalf ? 'blinds-half' : 'blinds-down'}`}>
                <div className="blind-slat"></div>
                <div className="blind-slat"></div>
                <div className="blind-slat"></div>
                <div className="blind-slat"></div>
                <div className="blind-slat"></div>
              </div>
              <div className="room-interior-glow"></div>
            </div>
          </div>

          {/* Rez-de-chaussée : Grand Salon & Baies Vitrées & Cuisine */}
          <div className="ground-floor">
            {/* Cuisine : Machine à café */}
            <div className={`room room-kitchen ${lights ? 'lights-active' : 'lights-off'}`}>
              <div className="room-label">
                <span className="room-indicator"></span>
                CUISINE CONNECTÉE
              </div>

              {/* Hotspot Machine à café */}
              <div 
                className={`device-hotspot device-coffee ${coffee ? 'active' : ''} ${activeDeviceId === 'coffee' ? 'focused' : ''}`}
                onClick={() => onDeviceClick && onDeviceClick('coffee')}
                title="Machine à café connectée"
              >
                <div className="hotspot-badge">
                  <Coffee size={18} className={coffee ? 'text-amber' : ''} />
                  <span>{coffee ? 'Café prêt' : 'Prête'}</span>
                </div>
                {coffee && (
                  <div className="steam-container">
                    <div className="steam steam-1"></div>
                    <div className="steam steam-2"></div>
                  </div>
                )}
              </div>

              <div className="kitchen-counter"></div>
            </div>

            {/* Grand Salon : Enceinte connectée, Lumières intelligentes, Stores panoramiques */}
            <div className={`room room-living ${lights ? 'lights-active' : 'lights-off'}`}>
              <div className="room-label">
                <span className="room-indicator"></span>
                SALON PRINCIPAL
              </div>

              {/* Hotspot Lumières connectées */}
              <div 
                className={`device-hotspot device-lights ${lights ? 'active' : ''} ${activeDeviceId === 'lights' ? 'focused' : ''}`}
                onClick={() => onDeviceClick && onDeviceClick('lights')}
                title="Lumières connectées"
              >
                <div className="hotspot-badge">
                  <Lightbulb size={18} className={lights ? 'text-amber-glow' : ''} />
                  <span>{lights ? 'Ambiance 80%' : 'Éteint'}</span>
                </div>
              </div>

              {/* Hotspot Stores électriques panoramiques */}
              <div 
                className={`device-hotspot device-blinds ${isBlindsOpen ? 'active' : ''} ${activeDeviceId === 'blinds' ? 'focused' : ''}`}
                onClick={() => onDeviceClick && onDeviceClick('blinds')}
                title="Stores électriques connectés"
              >
                <div className="hotspot-badge">
                  <Blinds size={18} className={isBlindsOpen ? 'text-cyan' : ''} />
                  <span>{isBlindsOpen ? 'Stores levés' : isBlindsHalf ? '50%' : 'Fermés'}</span>
                </div>
              </div>

              {/* Hotspot Enceinte connectée */}
              <div 
                className={`device-hotspot device-speaker ${speaker ? 'active' : ''} ${activeDeviceId === 'speaker' ? 'focused' : ''}`}
                onClick={() => onDeviceClick && onDeviceClick('speaker')}
                title="Enceinte connectée"
              >
                <div className="hotspot-badge">
                  <Volume2 size={18} className={speaker ? 'text-cyan sound-pulse' : ''} />
                  <span>{speaker ? 'Musique active' : 'Veille'}</span>
                </div>
                {speaker && (
                  <div className="soundwave-spectrum">
                    <span className="bar bar-1"></span>
                    <span className="bar bar-2"></span>
                    <span className="bar bar-3"></span>
                    <span className="bar bar-4"></span>
                    <span className="bar bar-5"></span>
                  </div>
                )}
              </div>

              {/* Grande baie vitrée panoramique avec stores motorisés */}
              <div className="panoramic-glass-wall">
                <div className={`smart-blinds panoramic-blinds ${isBlindsOpen ? 'blinds-up' : isBlindsHalf ? 'blinds-half' : 'blinds-down'}`}>
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div key={idx} className="blind-slat panoramic-slat"></div>
                  ))}
                </div>
                {/* Mobilier minimaliste stylisé */}
                <div className="living-lounge">
                  <div className="lounge-sofa"></div>
                  <div className="lounge-lamp"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Terrasse extérieure et éclairage architectural au sol */}
          <div className="house-patio">
            <div className={`patio-spotlight spot-left ${lights ? 'spot-on' : ''}`}></div>
            <div className={`patio-spotlight spot-center ${lights ? 'spot-on' : ''}`}></div>
            <div className={`patio-spotlight spot-right ${lights ? 'spot-on' : ''}`}></div>
          </div>
        </div>
      </div>

      {/* Halo de commande groupée multi-appareils */}
      {highlightMulti && (
        <div className="multi-device-pulse-ring">
          <div className="pulse-tag">
            <Radio size={16} className="text-cyan animate-pulse" />
            <span>COMMANDE GROUPÉE ACTIVE</span>
          </div>
        </div>
      )}

      {/* Alerte déconnexion Wi-Fi (Scene 6) */}
      {isOffline && (
        <div className="house-offline-overlay">
          <div className="offline-pill">
            <Wifi size={18} className="text-red-400" />
            <span>RÉSEAU HORS-LIGNE — MODE LOCAL LIMITÉ</span>
          </div>
        </div>
      )}
    </div>
  );
}
