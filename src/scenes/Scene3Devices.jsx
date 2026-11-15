// Scene3Devices.jsx
// SCÈNE 3 — DÉMONSTRATION DES 5 APPAREILS (60 secondes)
// 1. Enceinte connectée 2. Machine à café 3. Stores électriques 4. Lumières 5. Climatisation
// Inclut la grande commande théâtrale groupée : « Maison, prépare mon arrivée ! »

import React, { useState, useEffect } from 'react';
import HouseEnvironment from '../components/HouseEnvironment';
import DeviceCard from '../components/DeviceCard';
import PhoneMessageModal from '../components/PhoneMessageModal';
import { DEVICES } from '../data/presentationData';
import { audioManager } from '../audio/audioManager';
import { Sparkles, Smartphone, Volume2 } from 'lucide-react';

export default function Scene3Devices({ stageIndex }) {
  // État local des appareils dans la scène
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [deviceStates, setDeviceStates] = useState({
    speaker: false,
    coffee: false,
    blinds: "closed",
    lights: false,
    ac: false
  });

  // Gestion des étapes de la scène 3
  useEffect(() => {
    if (stageIndex === 0) {
      // Vue générale
      setActiveDeviceId(null);
      setDeviceStates({
        speaker: false,
        coffee: false,
        blinds: "closed",
        lights: true,
        ac: false
      });
    } else if (stageIndex === 1) {
      // Démonstration Enceinte connectée
      setActiveDeviceId('speaker');
      setDeviceStates(prev => ({ ...prev, speaker: true }));
      audioManager.playDevice();
    } else if (stageIndex === 2) {
      // Démonstration Machine à café
      setActiveDeviceId('coffee');
      setDeviceStates(prev => ({ ...prev, coffee: true }));
      audioManager.playDevice();
    } else if (stageIndex === 3) {
      // Transition accessoire téléphone
      setActiveDeviceId(null);
    } else if (stageIndex === 4) {
      // Envoi du message du présentateur : "Maison, prépare mon arrivée !"
      audioManager.playPhoneSent();
    } else if (stageIndex === 5) {
      // Réponse assistante + commande groupée : Lumières, Stores, Climatisation
      audioManager.playPhoneReceived();
      audioManager.playAssistant('assistant_arrivee', "Bien sûr ! J'allume les lumières, j'ouvre les stores et je règle la climatisation.");
      setDeviceStates({
        speaker: true,
        coffee: true,
        blinds: "open",
        lights: true,
        ac: true
      });
    } else if (stageIndex === 6) {
      // Bilan complet
      setActiveDeviceId(null);
    }
  }, [stageIndex]);

  // Bascule manuelle d'un appareil au clic si souhaité par le présentateur
  const handleToggleDevice = (id) => {
    audioManager.playSwitch();
    setDeviceStates(prev => {
      if (id === 'blinds') {
        return { ...prev, blinds: prev.blinds === 'open' ? 'closed' : 'open' };
      }
      return { ...prev, [id]: !prev[id] };
    });
  };

  const selectedDevice = DEVICES.find(d => d.id === activeDeviceId);

  return (
    <div className="scene-container scene-devices">
      {/* Panneau supérieur de présentation */}
      <div className="devices-scene-header">
        <div>
          <span className="section-pill">SCÈNE 03 • EXPÉRIMENTATION EN DIRECT</span>
          <h2 className="section-title">Les 5 Appareils Connectés de la Maison</h2>
        </div>
        {stageIndex >= 3 && stageIndex <= 5 && (
          <div className="theatrical-callout animate-pulse">
            <Smartphone size={16} className="text-cyan" />
            <span>ACCESSOIRE SCÉNIQUE : Dammak utilise son smartphone</span>
          </div>
        )}
      </div>

      {/* Corps divisé : Maison interactive à gauche, Fiches des appareils à droite */}
      <div className="devices-demo-layout">
        {/* Colonne Maison (rendu réaliste des pièces et appareils) */}
        <div className="devices-house-panel">
          <HouseEnvironment
            sceneId={3}
            stageIndex={stageIndex}
            houseState={deviceStates}
            activeDeviceId={activeDeviceId}
            highlightMulti={stageIndex === 5 || stageIndex === 6}
            onDeviceClick={(id) => {
              setActiveDeviceId(id);
              handleToggleDevice(id);
            }}
          />
        </div>

        {/* Colonne Liste des 5 appareils */}
        <div className="devices-cards-panel">
          <div className="devices-cards-grid">
            {DEVICES.map(device => {
              const isActive = device.id === 'blinds' 
                ? deviceStates.blinds === 'open' 
                : !!deviceStates[device.id];
              return (
                <DeviceCard
                  key={device.id}
                  device={device}
                  isActive={isActive}
                  isSelected={activeDeviceId === device.id}
                  onToggle={handleToggleDevice}
                  onSelect={(id) => setActiveDeviceId(id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal théâtral scénarisé de la commande smartphone (Stage 4 & 5) */}
      <PhoneMessageModal
        isOpen={stageIndex === 4 || stageIndex === 5}
        userMessage="« Maison, prépare mon arrivée ! »"
        assistantReply={stageIndex === 5 ? "« Bien sûr ! J'allume les lumières, j'ouvre les stores et je règle la climatisation. »" : null}
        showDevicesReaction={stageIndex === 5}
      />
    </div>
  );
}
