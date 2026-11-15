# LA MAISON INTELLIGENTE
## Présentation Interactive de Classe (Français A2 — 5 minutes)
*Une maison qui pense, communique et agit.*

---

### 👥 Les Rôles
- **Dammak** : Présentateur 1 (Badges cyan, temps de parole 50%)
- **Louay** : Présentateur 2 (Badges indigo, temps de parole 50%)
- **Assistante Domotique** : Voix neutre invisible (Audio local + synthèse vocale intégrée + sous-titres cinématiques)

---

### 🚀 1. Comment lancer la présentation

1. Ouvrez un terminal dans le dossier du projet :
   ```bash
   npm run dev
   ```
2. Ouvrez votre navigateur sur :
   ```
   http://127.0.0.1:3000/
   ```

---

### 🖥️ 2. Contrôles et Mode Plein Écran (1920 × 1080)

- **Clic GAUCHE** ou **Touche Espace / Flèche Droite** : Avancer à l'étape suivante.
- **Clic DROIT** ou **Flèche Gauche** : Reculer à l'étape précédente *(le menu contextuel clic-droit du navigateur est automatiquement désactivé)*.
- **Mode Plein Écran** :
  - Cliquez sur l'icône **Plein Écran** en haut à droite.
  - Ou appuyez sur la touche **`F`**.
  - Pour quitter : appuyez sur **`Échap`** (Escape).
- **Rejouer la scène** : Bouton **« Rejouer »** en haut à droite ou touche **`R`**.
- **Couper / Activer le son** : Bouton volume en haut à droite.
- **Souffleur & Livret A2** : Bouton **« Texte A2 »** en bas à droite pour ouvrir le livret complet des dialogues de Dammak et Louay pour les répétitions.

---

### 📁 3. Architecture des fichiers

```
├── public/
│   └── audio/
│       ├── assistant_bonjour.mp3 & .wav
│       ├── assistant_arrivee.mp3 & .wav
│       └── assistant_question.mp3 & .wav
├── src/
│   ├── assets/
│   ├── audio/
│   │   ├── audioManager.js      (Gestionnaire central, fallback gracieux)
│   │   ├── soundEffects.js      (Synthèse Web Audio API sans dépendance)
│   │   └── speechSynthesis.js  (Synthèse vocale française native)
│   ├── components/
│   │   ├── PresentationFrame.jsx  (Conteneur 16:9 dynamique réactif)
│   │   ├── HouseEnvironment.jsx  (Maison architecturale avec lumières, stores, hotspots)
│   │   ├── PresenterCues.jsx     (Barre de texte et de jeu pour Dammak & Louay)
│   │   ├── AssistantSubtitles.jsx (Sous-titres cinématiques)
│   │   ├── PhoneMessageModal.jsx (Scénario smartphone théâtral)
│   │   ├── DeviceCard.jsx        (Fiche interactive des 5 objets)
│   │   ├── NetworkNode.jsx       (Nœuds du schéma réseau pédagogique)
│   │   └── NavigationBar.jsx     (Barre de progression et contrôles)
│   ├── data/
│   │   └── presentationData.js   (Textes A2, découpage des 7 scènes, manifest audio)
│   ├── scenes/
│   │   ├── Scene1Opening.jsx        (Scène 1 : Éveil de la maison)
│   │   ├── Scene2Definition.jsx     (Scène 2 : Définition & 3 Piliers)
│   │   ├── Scene3Devices.jsx        (Scène 3 : Démonstrations des 5 appareils & Commande groupée)
│   │   ├── Scene4Communication.jsx  (Scène 4 : Schéma réseau pédagogique)
│   │   ├── Scene5Advantages.jsx     (Scène 5 : 5 Avantages & Sondage interactif de classe)
│   │   ├── Scene6Disadvantages.jsx  (Scène 6 : 4 Risques & Simulation coupure Wi-Fi)
│   │   └── Scene7Conclusion.jsx     (Scène 7 : Extinction, Débat ouvert & Clôture)
│   └── styles/
│       ├── index.css
│       ├── presentation.css
│       ├── house.css
│       └── devices.css
```
