// PhoneMessageModal.jsx
// Interaction théâtrale smartphone scénarisée
// Le présentateur utilise un vrai téléphone en accessoire, la présentation affiche les bulles pré-écrites

import React from 'react';
import { Smartphone, CheckCheck, Bot, Sparkles, Lightbulb, Blinds, ThermometerSnowflake } from 'lucide-react';

export default function PhoneMessageModal({
  isOpen = false,
  userMessage = null,
  assistantReply = null,
  showDevicesReaction = false,
  onClose = null
}) {
  if (!isOpen) return null;

  return (
    <div className="phone-modal-backdrop" onClick={onClose}>
      <div className="phone-frame-mockup" onClick={(e) => e.stopPropagation()}>
        {/* Barre d'état du smartphone */}
        <div className="phone-notch-bar">
          <span className="phone-time">19:42</span>
          <div className="phone-camera-hole"></div>
          <div className="phone-icons-right">
            <span>5G</span>
            <div className="phone-battery"></div>
          </div>
        </div>

        {/* En-tête de la messagerie domotique */}
        <div className="phone-chat-header">
          <div className="phone-chat-avatar">
            <Bot size={20} className="text-cyan" />
            <span className="online-indicator"></span>
          </div>
          <div className="phone-chat-info">
            <h4>Maison Intelligente</h4>
            <small>En ligne • Répond instantanément</small>
          </div>
          <div className="phone-prop-tag">
            <Smartphone size={14} />
            Accessoire Scénique
          </div>
        </div>

        {/* Fil des messages animés */}
        <div className="phone-chat-body">
          <div className="chat-date-separator">Aujourd'hui</div>

          {/* Bulle envoyée par le présentateur (slide-in depuis la droite) */}
          {userMessage && (
            <div className="message-row row-user animate-slide-in-right">
              <div className="message-bubble bubble-user">
                <p className="bubble-text">{userMessage}</p>
                <div className="bubble-meta">
                  <span>19:42</span>
                  <CheckCheck size={14} className="text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Bulle réponse de l'assistante (slide-in depuis la gauche) */}
          {assistantReply && (
            <div className="message-row row-assistant animate-slide-in-left">
              <div className="assistant-avatar-mini">
                <Bot size={14} className="text-cyan" />
              </div>
              <div className="message-bubble bubble-assistant">
                <p className="bubble-text">{assistantReply}</p>
                <div className="bubble-meta">
                  <span>19:42</span>
                </div>
              </div>
            </div>
          )}

          {/* Panneau de confirmation des 3 appareils synchronisés */}
          {showDevicesReaction && (
            <div className="devices-reaction-panel animate-fade-in">
              <div className="panel-title">
                <Sparkles size={14} className="text-cyan" />
                <span>3 APPAREILS SYNCHRONISÉS :</span>
              </div>
              <div className="reaction-pills-grid">
                <div className="reaction-pill pill-lights">
                  <Lightbulb size={16} />
                  <div>
                    <strong>Lumières</strong>
                    <small>Allumées 80%</small>
                  </div>
                </div>
                <div className="reaction-pill pill-blinds">
                  <Blinds size={16} />
                  <div>
                    <strong>Stores</strong>
                    <small>Ouverts 100%</small>
                  </div>
                </div>
                <div className="reaction-pill pill-ac">
                  <ThermometerSnowflake size={16} />
                  <div>
                    <strong>Clim</strong>
                    <small>21.0°C</small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pied de faux clavier smartphone */}
        <div className="phone-chat-footer">
          <span className="fake-input">Message vocal envoyé via l'application domotique</span>
        </div>
      </div>
    </div>
  );
}
