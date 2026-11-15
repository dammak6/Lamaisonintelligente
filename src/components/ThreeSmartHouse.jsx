// ThreeSmartHouse.jsx
// Intégration de la maquette architecturale 3D importée depuis Google AI Studio
// Connectée au système des 7 scènes, aux 5 appareils connectés, au toit rétractable et aux contrôles interactifs

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  CAMERA_PRESETS,
  computeRoofPanelTransforms,
} from '../3d/smart-house/src/scene/architecturalState';
import { createArchitecturalMaterials } from '../3d/smart-house/src/scene/materials';
import { createLightingSystem } from '../3d/smart-house/src/scene/components/LightingSystem';
import { createExteriorGarden } from '../3d/smart-house/src/scene/components/ExteriorGarden';
import { createHouseArchitecture } from '../3d/smart-house/src/scene/components/HouseArchitecture';
import { createRoofSystem } from '../3d/smart-house/src/scene/components/RoofSystem';
import { createFurnitureAndDecor } from '../3d/smart-house/src/scene/components/FurnitureAndDecor';
import { createCameraController } from '../3d/smart-house/src/scene/components/CameraController';
import { Camera, ChevronRight, Eye, Sparkles } from 'lucide-react';

export default function ThreeSmartHouse({
  sceneId = 1,
  stageIndex = 0,
  houseState = { lights: true, blinds: "closed", ac: false, coffee: false, speaker: false },
  activeDeviceId = null,
  highlightMulti = false,
  isOffline = false,
  onDeviceClick = null,
  className = ""
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webGLError, setWebGLError] = useState(false);
  const [currentCameraLabel, setCurrentCameraLabel] = useState('Vue Extérieure');

  // Références d'état Three.js
  const cameraRigRef = useRef(null);
  const lightingRigRef = useRef(null);
  const roofAssemblyRef = useRef(null);
  const interactiveNodesRef = useRef({
    speakerGlowRing: null,
    speakerWaves: [],
    coffeeSteam: [],
    coffeeLed: null,
    blindsSlats: [],
    acAirflow: [],
    acLed: null,
    glitchHubLed: null,
  });

  // Cible d'élévation du toit rétractable (0 = fermé, 1 = ouvert/cutaway)
  const roofTargetRef = useRef(0.0);
  const roofCurrentRef = useRef(0.0);

  // Ambiance d'éclairage active ('evening' par défaut pour correspondre à la charte sombre nocturne)
  const ambianceRef = useRef('evening');

  // Props réactives transmises au loop d'animation
  const stateRef = useRef({
    sceneId,
    stageIndex,
    houseState,
    activeDeviceId,
    highlightMulti,
    isOffline,
  });

  useEffect(() => {
    stateRef.current = {
      sceneId,
      stageIndex,
      houseState,
      activeDeviceId,
      highlightMulti,
      isOffline,
    };
  }, [sceneId, stageIndex, houseState, activeDeviceId, highlightMulti, isOffline]);

  // Synchronisation des caméras et du toit selon la scène et l'appareil actif
  useEffect(() => {
    if (!cameraRigRef.current) return;

    let targetPreset = 'cutaway';
    let targetRoof = 1.0; // Mode intérieur cutaway par défaut

    if (activeDeviceId === 'speaker') {
      targetPreset = 'speaker';
      targetRoof = 1.0;
    } else if (activeDeviceId === 'coffee') {
      targetPreset = 'kitchen';
      targetRoof = 1.0;
    } else if (activeDeviceId === 'blinds') {
      targetPreset = 'bedroom';
      targetRoof = 1.0;
    } else if (activeDeviceId === 'ac') {
      targetPreset = 'bedroom';
      targetRoof = 1.0;
    } else if (activeDeviceId === 'lights') {
      targetPreset = 'living';
      targetRoof = 1.0;
    } else if (highlightMulti) {
      // Commande groupée "Maison, prépare mon arrivée !" : cadrage panoramique deux niveaux
      targetPreset = 'cutaway';
      targetRoof = 1.0;
    } else {
      switch (sceneId) {
        case 1:
          if (stageIndex === 0) {
            // Scène 1 étape 0 : Vue extérieure de nuit, toit fermé
            targetPreset = 'exterior';
            targetRoof = 0.0;
          } else {
            // Scène 1 réveil : Coupe intérieure révélée
            targetPreset = 'cutaway';
            targetRoof = 1.0;
          }
          break;
        case 2:
          targetPreset = 'overview';
          targetRoof = 1.0;
          break;
        case 3:
          targetPreset = 'cutaway';
          targetRoof = 1.0;
          break;
        case 4:
          targetPreset = 'overview';
          targetRoof = 1.0;
          break;
        case 5:
          targetPreset = 'cutaway';
          targetRoof = 1.0;
          break;
        case 6:
          targetPreset = 'cutaway';
          targetRoof = 1.0;
          break;
        case 7:
          if (stageIndex <= 1) {
            targetPreset = 'overview';
            targetRoof = 1.0;
          } else {
            // Clôture finale : Fermeture du toit pour la nuit
            targetPreset = 'exterior';
            targetRoof = 0.0;
          }
          break;
        default:
          targetPreset = 'cutaway';
          targetRoof = 1.0;
      }
    }

    roofTargetRef.current = targetRoof;
    cameraRigRef.current.transitionToPreset(targetPreset);
    setCurrentCameraLabel(CAMERA_PRESETS[targetPreset]?.frenchSubtitle || targetPreset);

    // Ajustement de l'ambiance lumineuse
    if (lightingRigRef.current) {
      const lightsOn = sceneId === 1 && stageIndex === 0 ? false : (sceneId === 7 && stageIndex >= 2 ? false : houseState.lights);
      lightingRigRef.current.applyAmbiance(ambianceRef.current, lightsOn);
    }
  }, [sceneId, stageIndex, activeDeviceId, highlightMulti, houseState.lights]);

  // Initialisation du moteur Three.js
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // 1. Scène Three.js
    const scene = new THREE.Scene();

    // 2. Renderer WebGL avec ACES Filmic Tone Mapping pour un rendu cinématographique
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      setWebGLError(true);
      return;
    }

    // 3. Matériaux et Rigs de la maquette architecturale importée
    const materials = createArchitecturalMaterials(renderer, false, () => {});
    const lightingRig = createLightingSystem(scene, renderer, materials, false);
    lightingRigRef.current = lightingRig;
    scene.add(lightingRig.group);

    const gardenGroup = createExteriorGarden(materials);
    scene.add(gardenGroup);

    const houseGroup = createHouseArchitecture(materials);
    scene.add(houseGroup);

    const roofAssembly = createRoofSystem(materials);
    roofAssemblyRef.current = roofAssembly;
    scene.add(roofAssembly.group);

    const furnitureGroup = createFurnitureAndDecor(materials);
    scene.add(furnitureGroup);

    // 4. Contrôleur de caméra avec presets et amortissement fluide
    const cameraRig = createCameraController(canvas, false, () => {});
    cameraRigRef.current = cameraRig;

    // Position initiale selon la scène 1
    const initialPresetId = sceneId === 1 && stageIndex === 0 ? 'exterior' : 'cutaway';
    cameraRig.transitionToPreset(initialPresetId);

    // =========================================================================
    // 5. AJOUT DES 5 APPAREILS CONNECTÉS INTERACTIFS DANS LA VILLA
    // =========================================================================
    const devicesGroup = new THREE.Group();
    devicesGroup.name = "Interactive_Smart_Devices";

    // -------------------------------------------------------------------------
    // APPAREIL 1 : ENCEINTE CONNECTÉE HAUT DE GAMME (Sur la crédence du salon)
    // Design contemporain premium : maille acoustique 3D, disque tactile supérieur,
    // halo LED électroluminescent, base aluminium biseautée
    // -------------------------------------------------------------------------
    const speakerGroup = new THREE.Group();
    speakerGroup.name = "Device_Speaker";
    speakerGroup.position.set(-4.6, 0.86, -4.0);

    // Ombre de contact douce sous la base de l'enceinte
    const speakerShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.22, 24),
      materials.contactShadowMat
    );
    speakerShadow.rotation.x = -Math.PI / 2;
    speakerShadow.position.y = 0.005;
    speakerGroup.add(speakerShadow);

    // 1. Anneau de base usiné en aluminium anodisé
    const speakerBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.142, 0.146, 0.024, 32),
      materials.charcoalMatteMetal
    );
    speakerBase.position.y = 0.012;
    speakerBase.castShadow = true;
    speakerBase.receiveShadow = true;
    speakerGroup.add(speakerBase);

    // 2. Corps principal en maille acoustique 3D micro-tissée (profil galbé doux)
    const speakerBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.134, 0.142, 0.36, 32),
      materials.smartSpeakerFabric
    );
    speakerBody.position.y = 0.204;
    speakerBody.castShadow = true;
    speakerBody.receiveShadow = true;
    speakerGroup.add(speakerBody);

    // 3. Bague d'épaulement supérieure biseautée
    const speakerShoulder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.126, 0.134, 0.028, 32),
      materials.charcoalMatteMetal
    );
    speakerShoulder.position.y = 0.398;
    speakerGroup.add(speakerShoulder);

    // 4. Halo lumineux LED immersif (anneau guide de lumière)
    const speakerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.124, 0.009, 16, 48),
      materials.smartSpeakerRing
    );
    speakerRing.position.y = 0.412;
    speakerRing.rotation.x = Math.PI / 2;
    speakerGroup.add(speakerRing);
    interactiveNodesRef.current.speakerGlowRing = speakerRing;

    // 5. Surface tactile supérieure en verre noir obsidienne
    const speakerGlassDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.008, 32),
      materials.smartSpeakerControlGlass
    );
    speakerGlassDisc.position.y = 0.414;
    speakerGroup.add(speakerGlassDisc);

    // 6. Icônes tactiles minimalistes intégrées (+, -, point d'état)
    const touchMinus = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.002, 0.005),
      materials.exteriorPlaster
    );
    touchMinus.position.set(-0.045, 0.419, 0);
    speakerGroup.add(touchMinus);

    const touchPlusH = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.002, 0.005),
      materials.exteriorPlaster
    );
    touchPlusH.position.set(0.045, 0.419, 0);
    speakerGroup.add(touchPlusH);

    const touchPlusV = new THREE.Mesh(
      new THREE.BoxGeometry(0.005, 0.002, 0.024),
      materials.exteriorPlaster
    );
    touchPlusV.position.set(0.045, 0.419, 0);
    speakerGroup.add(touchPlusV);

    const touchDot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 0.003, 16),
      materials.warmLightEmissive
    );
    touchDot.position.set(0, 0.419, 0);
    speakerGroup.add(touchDot);

    // 7. Ondes acoustiques rayonnantes quand active (3 anneaux subtils)
    for (let i = 0; i < 3; i++) {
      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(0.2 + i * 0.14, 0.01, 12, 36),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0,
        })
      );
      wave.position.y = 0.415;
      wave.rotation.x = Math.PI / 2;
      speakerGroup.add(wave);
      interactiveNodesRef.current.speakerWaves.push(wave);
    }
    devicesGroup.add(speakerGroup);

    // -------------------------------------------------------------------------
    // APPAREIL 2 : MACHINE À CAFÉ CONNECTÉE (Sur le plan de travail cuisine)
    // -------------------------------------------------------------------------
    const coffeeGroup = new THREE.Group();
    coffeeGroup.name = "Device_CoffeeMachine";
    coffeeGroup.position.set(5.2, 1.25, -4.15);

    const coffeeBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.52, 0.48),
      materials.brushedSteel
    );
    coffeeBase.position.y = 0.26;
    coffeeBase.castShadow = true;

    const coffeeHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.22, 0.42),
      materials.charcoalMatteMetal
    );
    coffeeHead.position.set(0, 0.42, 0.02);

    const portafilter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.26, 8),
      materials.brushedBronze
    );
    portafilter.position.set(0, 0.3, 0.26);
    portafilter.rotation.x = Math.PI / 2;

    const coffeeCup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.08, 0.16, 12),
      materials.exteriorPlaster
    );
    coffeeCup.position.set(0, 0.08, 0.16);

    const coffeeLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 8, 8),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: new THREE.Color(0x10b981),
        emissiveIntensity: 1.2,
      })
    );
    coffeeLed.position.set(0.18, 0.45, 0.22);
    coffeeGroup.add(coffeeBase, coffeeHead, portafilter, coffeeCup, coffeeLed);
    interactiveNodesRef.current.coffeeLed = coffeeLed;

    // Particules de vapeur animées
    for (let p = 0; p < 8; p++) {
      const steam = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 6),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4,
        })
      );
      steam.position.set(
        (Math.random() - 0.5) * 0.06,
        0.18 + p * 0.06,
        0.16 + (Math.random() - 0.5) * 0.05
      );
      steam.visible = false;
      coffeeGroup.add(steam);
      interactiveNodesRef.current.coffeeSteam.push({
        mesh: steam,
        baseY: 0.18,
        speed: 0.007 + Math.random() * 0.005,
        initOffset: p * 0.5,
      });
    }
    devicesGroup.add(coffeeGroup);

    // -------------------------------------------------------------------------
    // APPAREIL 3 : STORES ÉLECTRIQUES CONNECTÉS (Baie vitrée étage)
    // -------------------------------------------------------------------------
    const blindsFrameGroup = new THREE.Group();
    blindsFrameGroup.name = "Device_ElectricBlinds";
    blindsFrameGroup.position.set(-4.65, 5.4, 3.8);

    const shutterBox = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 0.3, 0.25),
      materials.charcoalMatteMetal
    );
    shutterBox.position.set(0, 1.25, 0);
    blindsFrameGroup.add(shutterBox);

    // 14 lames horizontales indépendantes
    for (let s = 0; s < 14; s++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(4.65, 0.15, 0.03),
        materials.charcoalMatteMetal
      );
      slat.position.set(0, 1.05 - s * 0.16, 0.02);
      blindsFrameGroup.add(slat);
      interactiveNodesRef.current.blindsSlats.push(slat);
    }
    devicesGroup.add(blindsFrameGroup);

    // -------------------------------------------------------------------------
    // APPAREIL 5 : CLIMATISATION CONNECTÉE (Split mural suite parentale)
    // -------------------------------------------------------------------------
    const acGroup = new THREE.Group();
    acGroup.name = "Device_AirConditioner";
    acGroup.position.set(-1.8, 6.2, -1.2);
    acGroup.rotation.y = Math.PI / 2;

    const acBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.42, 0.32),
      materials.exteriorPlaster
    );
    const acGrille = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.07, 0.04),
      materials.charcoalMatteMetal
    );
    acGrille.position.set(0, -0.14, 0.15);

    const acLed = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.09, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: new THREE.Color(0x38bdf8),
        emissiveIntensity: 1.2,
      })
    );
    acLed.position.set(0.45, 0.05, 0.16);
    acGroup.add(acBody, acGrille, acLed);
    interactiveNodesRef.current.acLed = acLed;

    // Rubans de flux d'air frais bleutés
    for (let b = 0; b < 5; b++) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.035, 0.65),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.45,
        })
      );
      beam.position.set(-0.35 + b * 0.18, -0.2, 0.35 + b * 0.12);
      beam.rotation.x = Math.PI / 6;
      beam.visible = false;
      acGroup.add(beam);
      interactiveNodesRef.current.acAirflow.push({
        mesh: beam,
        baseZ: 0.2,
        baseY: -0.2,
        speed: 0.014 + b * 0.003,
      });
    }
    devicesGroup.add(acGroup);

    // -------------------------------------------------------------------------
    // APPAREIL 4 : LUMIÈRES CONNECTÉES (Lampadaire salon design interactif)
    // -------------------------------------------------------------------------
    const floorLampGroup = new THREE.Group();
    floorLampGroup.name = "Device_Lights";
    floorLampGroup.position.set(-2.35, 0.25, -1.95);

    const lampShadeTarget = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    lampShadeTarget.position.set(0.12, 2.05, 0.1);
    floorLampGroup.add(lampShadeTarget);
    devicesGroup.add(floorLampGroup);

    // Hub Wi-Fi domotique sur toiture (utilisé pour l'alerte panne Scène 6)
    const hubLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: new THREE.Color(0x38bdf8),
        emissiveIntensity: 1.0,
      })
    );
    hubLed.position.set(0, 7.3, 0);
    devicesGroup.add(hubLed);
    interactiveNodesRef.current.glitchHubLed = hubLed;

    scene.add(devicesGroup);

    // =========================================================================
    // 6. RAYCASTING AU CLIC SUR LES APPAREILS CONNECTÉS
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragDist = 0;

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRig.camera);
      const intersects = raycaster.intersectObjects(devicesGroup.children, true);

      if (intersects.length > 0) {
        let current = intersects[0].object;
        while (current && current !== devicesGroup) {
          if (current.name === "Device_Speaker") {
            onDeviceClick && onDeviceClick("speaker");
            return;
          }
          if (current.name === "Device_CoffeeMachine") {
            onDeviceClick && onDeviceClick("coffee");
            return;
          }
          if (current.name === "Device_ElectricBlinds") {
            onDeviceClick && onDeviceClick("blinds");
            return;
          }
          if (current.name === "Device_AirConditioner") {
            onDeviceClick && onDeviceClick("ac");
            return;
          }
          if (current.name === "Device_Lights") {
            onDeviceClick && onDeviceClick("lights");
            return;
          }
          current = current.parent;
        }
      }
    };

    const onPointerDown = (e) => {
      isPointerDown = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      dragDist = 0;
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isPointerDown) {
        dragDist += Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
      } else {
        raycaster.setFromCamera(mouse, cameraRig.camera);
        const intersects = raycaster.intersectObjects(devicesGroup.children, true);
        canvas.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
      }
    };

    const onPointerUp = (e) => {
      if (isPointerDown && dragDist < 8) {
        handleCanvasClick(e);
      }
      isPointerDown = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 7. Redimensionnement réactif
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && renderer && cameraRig) {
          cameraRig.handleResize(newWidth, newHeight);
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // =========================================================================
    // 8. BOUCLE D'ANIMATION PRINCIPALE À 60 FPS
    // =========================================================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();
      const { sceneId, stageIndex, houseState, isOffline } = stateRef.current;
      const { lights, blinds, ac, coffee, speaker } = houseState;
      const nodes = interactiveNodesRef.current;

      // A. Amortissement fluide de l'articulation du toit
      const roofDiff = Math.abs(roofCurrentRef.current - roofTargetRef.current);
      if (roofDiff > 0.002) {
        roofCurrentRef.current = THREE.MathUtils.damp(
          roofCurrentRef.current,
          roofTargetRef.current,
          6.0,
          delta
        );
        roofAssembly.updateRoofProgress(roofCurrentRef.current);
      } else if (roofDiff > 0) {
        roofCurrentRef.current = roofTargetRef.current;
        roofAssembly.updateRoofProgress(roofCurrentRef.current);
      }

      // B. Transition de caméra fluide
      cameraRig.stepTransition(delta, roofCurrentRef.current);

      // C. Animation des Stores Électriques
      const isBlindsOpen = blinds === "open";
      const isBlindsHalf = blinds === "half";

      nodes.blindsSlats.forEach((slat, idx) => {
        const fullDownY = 1.05 - idx * 0.16;
        const targetY = isBlindsOpen 
          ? 1.15 - idx * 0.015 // Rétractation dans le caisson haut
          : isBlindsHalf 
            ? (idx < 7 ? 1.15 - idx * 0.015 : 1.05 - (idx - 7) * 0.16)
            : fullDownY;

        slat.position.y = THREE.MathUtils.lerp(slat.position.y, targetY, 0.08);
      });

      // D. Animation de l'Enceinte Connectée
      if (nodes.speakerGlowRing) {
        if (speaker) {
          const pulse = 1.0 + Math.sin(elapsedTime * 4.5) * 0.06;
          nodes.speakerGlowRing.scale.set(pulse, pulse, pulse);
          if (nodes.speakerGlowRing.material) {
            nodes.speakerGlowRing.material.emissiveIntensity = 2.4 + Math.sin(elapsedTime * 5.5) * 0.8;
          }

          nodes.speakerWaves.forEach((wave, idx) => {
            const progress = (elapsedTime * 1.2 + idx * 0.33) % 1.0;
            const waveScale = 1.0 + progress * 2.2;
            wave.scale.set(waveScale, waveScale, waveScale);
            wave.material.opacity = (1.0 - progress) * 0.55;
          });
        } else {
          nodes.speakerGlowRing.scale.set(1, 1, 1);
          if (nodes.speakerGlowRing.material) {
            nodes.speakerGlowRing.material.emissiveIntensity = 1.2;
          }
          nodes.speakerWaves.forEach((wave) => {
            wave.material.opacity = 0;
          });
        }
      }

      // E. Animation de la Machine à Café Connectée (Vapeur)
      if (nodes.coffeeSteam && nodes.coffeeLed) {
        if (coffee) {
          nodes.coffeeLed.material.emissive.setHex(0xf59e0b);
          nodes.coffeeSteam.forEach((p) => {
            p.mesh.visible = true;
            p.mesh.position.y += p.speed;
            p.mesh.position.x += Math.sin(elapsedTime * 4 + p.initOffset) * 0.002;
            if (p.mesh.position.y > p.baseY + 0.5) {
              p.mesh.position.y = p.baseY;
            }
          });
        } else {
          nodes.coffeeLed.material.emissive.setHex(0x10b981);
          nodes.coffeeSteam.forEach((p) => {
            p.mesh.visible = false;
          });
        }
      }

      // F. Animation de la Climatisation Connectée (Flux d'air frais)
      if (nodes.acAirflow && nodes.acLed) {
        if (ac) {
          nodes.acAirflow.forEach((beam) => {
            beam.mesh.visible = true;
            beam.mesh.position.z += beam.speed;
            beam.mesh.position.y -= beam.speed * 0.5;
            if (beam.mesh.position.z > beam.baseZ + 1.1) {
              beam.mesh.position.z = beam.baseZ;
              beam.mesh.position.y = beam.baseY;
            }
          });
        } else {
          nodes.acAirflow.forEach((beam) => {
            beam.mesh.visible = false;
          });
        }
      }

      // G. Hub central Wi-Fi & Alerte coupure Scène 6
      if (nodes.glitchHubLed) {
        if (isOffline) {
          nodes.glitchHubLed.material.emissive.setHex(0xef4444);
          nodes.glitchHubLed.material.emissiveIntensity = Math.sin(elapsedTime * 12) > 0 ? 1.8 : 0.2;
        } else {
          nodes.glitchHubLed.material.emissive.setHex(0x38bdf8);
          nodes.glitchHubLed.material.emissiveIntensity = 1.0;
        }
      }

      renderer.render(scene, cameraRig.camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cameraRig.dispose();
      lightingRig.dispose();
      materials.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      renderer.dispose();
    };
  }, []);

  if (webGLError) {
    return (
      <div className={`three-house-fallback ${className}`}>
        <p>Affichage 3D non disponible sur ce navigateur. Mode de secours activé.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`three-smart-house-viewport ${className}`}>
      <canvas ref={canvasRef} className="three-house-canvas" />

      {/* Badge indicateur d'angle architectural */}
      <div className="three-camera-angle-pill">
        <Camera size={13} className="text-cyan inline mr-1.5" />
        <span>{currentCameraLabel}</span>
      </div>

      {/* Halo indicateur de commande groupée 3D */}
      {highlightMulti && (
        <div className="three-multi-command-badge animate-pulse">
          <Sparkles size={13} className="inline mr-1 text-cyan" />
          <span>COMMANDE GROUPÉE ACTIVE</span>
        </div>
      )}

      {/* Alerte déconnexion Wi-Fi 3D */}
      {isOffline && (
        <div className="three-offline-pill-alert animate-glitch">
          <span>RÉSEAU 3D HORS-LIGNE — MODE SECOURS</span>
        </div>
      )}
    </div>
  );
}
