// ThreeSmartHouse.jsx
// Composant maître Three.js — Rendu 3D temps-réel de la maison intelligente de qualité architecturale
// Anime les 5 appareils connectés, le système de toiture rétractable (cutaway), les lumières et la caméra

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createHouseMaterials } from './three/houseMaterials';
import { buildHouseGeometry } from './three/buildHouseGeometry';

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

  // Références d'état pour la boucle d'animation Three.js
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const houseDataRef = useRef(null);
  const materialsRef = useRef(null);

  // Cible de la caméra interpolée
  const cameraTargetPos = useRef(new THREE.Vector3(14.0, 10.5, 15.5));
  const cameraLookAt = useRef(new THREE.Vector3(0, 3.5, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 3.5, 0));

  // Props réactives transmises à la boucle d'animation
  const stateRef = useRef({
    sceneId,
    stageIndex,
    houseState,
    activeDeviceId,
    highlightMulti,
    isOffline
  });

  useEffect(() => {
    stateRef.current = {
      sceneId,
      stageIndex,
      houseState,
      activeDeviceId,
      highlightMulti,
      isOffline
    };
  }, [sceneId, stageIndex, houseState, activeDeviceId, highlightMulti, isOffline]);

  // Définition des angles de caméra et cibles de focalisation
  useEffect(() => {
    if (activeDeviceId === 'speaker') {
      // Zoom sur l'enceinte connectée dans le salon
      cameraTargetPos.current.set(-1.8, 3.2, 5.2);
      cameraLookAt.current.set(-5.6, 1.2, -0.2);
    } else if (activeDeviceId === 'coffee') {
      // Zoom sur la machine à café dans la cuisine
      cameraTargetPos.current.set(3.2, 3.6, 0.8);
      cameraLookAt.current.set(4.2, 1.9, -4.5);
    } else if (activeDeviceId === 'blinds') {
      // Zoom sur les stores électriques à l'étage
      cameraTargetPos.current.set(-1.2, 7.0, 7.8);
      cameraLookAt.current.set(-3.6, 5.6, 3.2);
    } else if (activeDeviceId === 'ac') {
      // Zoom sur la climatisation dans la chambre
      cameraTargetPos.current.set(2.2, 7.6, 4.0);
      cameraLookAt.current.set(6.4, 6.2, -1.0);
    } else if (activeDeviceId === 'lights') {
      // Zoom sur l'ambiance lumineuse du salon et le lampadaire
      cameraTargetPos.current.set(1.5, 4.5, 6.0);
      cameraLookAt.current.set(-4.0, 1.8, -1.0);
    } else if (highlightMulti) {
      // Commande groupée "Maison, prépare mon arrivée !" : cadrage panoramique où toute la maison s'illumine
      cameraTargetPos.current.set(13.8, 10.8, 15.5);
      cameraLookAt.current.set(0.0, 3.6, 0.0);
    } else {
      // Angles généraux par scène
      switch (sceneId) {
        case 1:
          if (stageIndex === 0) {
            // Scène 1 début : Toit fermé, vue extérieure complète
            cameraTargetPos.current.set(17.5, 13.5, 20.0);
            cameraLookAt.current.set(0, 3.2, 0);
          } else {
            // Scène 1 réveil : Toit glisse vers le haut, intérieur révélé
            cameraTargetPos.current.set(13.8, 10.2, 15.2);
            cameraLookAt.current.set(0, 3.5, 0);
          }
          break;
        case 2:
          cameraTargetPos.current.set(13.8, 10.5, 15.2);
          cameraLookAt.current.set(0, 3.5, 0);
          break;
        case 3:
          cameraTargetPos.current.set(13.5, 10.0, 14.8);
          cameraLookAt.current.set(0, 3.4, 0);
          break;
        case 4:
          cameraTargetPos.current.set(14.5, 11.2, 16.0);
          cameraLookAt.current.set(0, 3.6, 0);
          break;
        case 5:
          cameraTargetPos.current.set(13.5, 10.0, 14.8);
          cameraLookAt.current.set(0, 3.4, 0);
          break;
        case 6:
          cameraTargetPos.current.set(13.8, 10.5, 15.0);
          cameraLookAt.current.set(0, 3.5, 0);
          break;
        case 7:
          if (stageIndex <= 1) {
            cameraTargetPos.current.set(14.5, 10.8, 16.0);
            cameraLookAt.current.set(0, 3.5, 0);
          } else {
            // Conclusion finale : Vue reculée nocturne
            cameraTargetPos.current.set(17.5, 13.5, 20.0);
            cameraLookAt.current.set(0, 3.2, 0);
          }
          break;
        default:
          cameraTargetPos.current.set(13.8, 10.5, 15.2);
          cameraLookAt.current.set(0, 3.5, 0);
      }
    }
  }, [sceneId, stageIndex, activeDeviceId, highlightMulti]);

  // Initialisation du moteur Three.js
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // 1. Scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Caméra perspective (FOV 36 pour un rendu architectural isométrique naturel)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 150);
    camera.position.copy(cameraTargetPos.current);
    camera.lookAt(cameraLookAt.current);
    currentLookAt.current.copy(cameraLookAt.current);
    cameraRef.current = camera;

    // 3. Renderer WebGL avec ACES Filmic Tone Mapping pour un rendu cinématographique
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      rendererRef.current = renderer;
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      setWebGLError(true);
      return;
    }

    // 4. Éclairage architectural cinématographique
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.75);
    scene.add(ambientLight);

    const warmAmbient = new THREE.AmbientLight(0xffedd5, 0.65);
    scene.add(warmAmbient);

    // Lumière solaire/lunaire directionnelle principale
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(15, 24, 18);
    scene.add(dirLight);

    // Lumière de remplissage cyan douce
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.75);
    fillLight.position.set(-18, 14, 12);
    scene.add(fillLight);

    // Lumière de contour arrière (rim light)
    const rimLight = new THREE.DirectionalLight(0x818cf8, 0.5);
    rimLight.position.set(0, 10, -18);
    scene.add(rimLight);

    // 5. Construction de la maquette 3D architecturale
    const materials = createHouseMaterials();
    materialsRef.current = materials;
    const { houseGroup, interactiveNodes } = buildHouseGeometry(materials);
    scene.add(houseGroup);
    houseDataRef.current = { houseGroup, interactiveNodes };

    // 6. Raycaster et interactions souris (Clic et rotation douce)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragDistance = 0;
    let rotY = 0;
    let targetRotY = 0;

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(houseGroup.children, true);

      if (intersects.length > 0) {
        let current = intersects[0].object;
        while (current && current !== houseGroup) {
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
      dragDistance = 0;
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (isPointerDown) {
        const dx = e.clientX - pointerStartX;
        dragDistance += Math.abs(dx);
        targetRotY += dx * 0.006;
        targetRotY = THREE.MathUtils.clamp(targetRotY, -0.65, 0.65);
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        canvas.style.cursor = 'grabbing';
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(houseGroup.children, true);
        let foundDevice = false;
        if (intersects.length > 0) {
          let cur = intersects[0].object;
          while (cur && cur !== houseGroup) {
            if (cur.name && cur.name.startsWith("Device_")) {
              foundDevice = true;
              break;
            }
            cur = cur.parent;
          }
        }
        canvas.style.cursor = foundDevice ? 'pointer' : 'grab';
      }
    };

    const onPointerUp = (e) => {
      canvas.style.cursor = 'grab';
      if (isPointerDown && dragDistance < 6) {
        handleCanvasClick(e);
      }
      isPointerDown = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 7. Redimensionnement réactif via ResizeObserver
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && renderer && camera) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // 8. Boucle d'animation principale à 60 FPS
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const { sceneId, stageIndex, houseState, isOffline } = stateRef.current;
      const { lights, blinds, ac, coffee, speaker } = houseState;
      const nodes = houseDataRef.current.interactiveNodes;

      // Rotation douce au glissé de la souris
      rotY = THREE.MathUtils.lerp(rotY, targetRotY, 0.08);
      houseGroup.rotation.y = rotY;

      // A. Interpolation douce de la caméra (Lerp 0.05)
      camera.position.lerp(cameraTargetPos.current, 0.05);
      currentLookAt.current.lerp(cameraLookAt.current, 0.05);
      camera.lookAt(currentLookAt.current);

      // B. Système de toiture rétractable (Cutaway architectural intelligent)
      // En vue extérieure (Scène 1 étape 0 ou fin Scène 7) : toit fermé à y = 7.35
      // En présentation intérieure / démos : toit glisse en douceur vers le haut (y = 12.8) et s'estompe
      const isExteriorOverview = (sceneId === 1 && stageIndex === 0) || (sceneId === 7 && stageIndex >= 2);
      const targetRoofY = isExteriorOverview ? 7.35 : 12.8;
      const targetRoofOpacity = isExteriorOverview ? 1.0 : 0.06;

      if (nodes.roofGroup) {
        nodes.roofGroup.position.y = THREE.MathUtils.lerp(nodes.roofGroup.position.y, targetRoofY, 0.05);
        if (materials.roofExterior) {
          materials.roofExterior.opacity = THREE.MathUtils.lerp(materials.roofExterior.opacity, targetRoofOpacity, 0.06);
          materials.roofTrim.opacity = THREE.MathUtils.lerp(materials.roofTrim.opacity, targetRoofOpacity, 0.06);
          materials.solarCell.opacity = THREE.MathUtils.lerp(materials.solarCell.opacity, targetRoofOpacity, 0.06);
          materials.solarFrame.opacity = THREE.MathUtils.lerp(materials.solarFrame.opacity, targetRoofOpacity, 0.06);
        }
      }

      // C. Animation des Lumières Connectées
      const targetLivingInt = lights ? (isOffline ? 1.0 + Math.random() * 0.8 : 3.4) : 0.1;
      const targetKitchenInt = lights ? (isOffline ? 0.8 + Math.random() * 0.7 : 2.6) : 0.1;
      const targetBedroomInt = lights ? (isOffline ? 0.9 + Math.random() * 0.8 : 2.8) : 0.1;

      if (nodes.lights.living) nodes.lights.living.intensity = THREE.MathUtils.lerp(nodes.lights.living.intensity, targetLivingInt, 0.1);
      if (nodes.lights.kitchen) nodes.lights.kitchen.intensity = THREE.MathUtils.lerp(nodes.lights.kitchen.intensity, targetKitchenInt, 0.1);
      if (nodes.lights.bedroom) nodes.lights.bedroom.intensity = THREE.MathUtils.lerp(nodes.lights.bedroom.intensity, targetBedroomInt, 0.1);

      if (nodes.floorLampShade) {
        nodes.floorLampShade.material = lights ? materials.lampWarmShade : materials.metalDark;
      }
      if (nodes.bedsideLamps && nodes.bedsideLamps.length > 0) {
        nodes.bedsideLamps.forEach((shade) => {
          shade.material = lights ? materials.lampWarmShade : materials.metalDark;
        });
      }

      // D. Animation physique des Stores Électriques
      const isBlindsOpen = blinds === "open";
      const isBlindsHalf = blinds === "half";

      nodes.blindsSlats.forEach((slat, idx) => {
        const fullDownY = 1.15 - idx * 0.18;
        const targetY = isBlindsOpen 
          ? 1.25 - idx * 0.02 // Empilement compact dans le caisson
          : isBlindsHalf 
            ? (idx < 7 ? 1.25 - idx * 0.02 : 1.15 - (idx - 7) * 0.18)
            : fullDownY; // Totalement fermé

        slat.position.y = THREE.MathUtils.lerp(slat.position.y, targetY, 0.08);
      });

      // E. Animation de l'Enceinte Connectée
      if (nodes.speakerGlowRing) {
        if (speaker) {
          const pulse = 1.0 + Math.sin(elapsedTime * 6) * 0.15;
          nodes.speakerGlowRing.scale.set(pulse, pulse, pulse);
          nodes.speakerGlowRing.material.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 6) * 0.5;

          nodes.speakerWaves.forEach((wave, idx) => {
            const waveProgress = (elapsedTime * 1.5 + idx * 0.33) % 1.0;
            const waveScale = 1.0 + waveProgress * 1.8;
            wave.scale.set(waveScale, waveScale, waveScale);
            wave.material.opacity = (1.0 - waveProgress) * 0.5;
          });
        } else {
          nodes.speakerGlowRing.scale.set(1, 1, 1);
          nodes.speakerGlowRing.material.emissiveIntensity = 0.3;
          nodes.speakerWaves.forEach((wave) => {
            wave.material.opacity = 0;
          });
        }
      }

      // F. Animation de la Machine à Café Connectée (Vapeur)
      if (nodes.coffeeSteam && nodes.coffeeLed) {
        if (coffee) {
          nodes.coffeeLed.material = materials.emissiveAmber;
          nodes.coffeeSteam.forEach((p) => {
            p.mesh.visible = true;
            p.mesh.position.y += p.speed;
            p.mesh.position.x += Math.sin(elapsedTime * 4 + p.initOffset) * 0.002;
            if (p.mesh.position.y > p.baseY + 0.6) {
              p.mesh.position.y = p.baseY;
            }
          });
        } else {
          nodes.coffeeLed.material = materials.emissiveGreen;
          nodes.coffeeSteam.forEach((p) => {
            p.mesh.visible = false;
          });
        }
      }

      // G. Animation de la Climatisation Connectée (Flux d'air frais)
      if (nodes.acAirflow && nodes.acLed) {
        if (ac) {
          nodes.acLed.material = materials.emissiveCyan;
          nodes.acAirflow.forEach((beam) => {
            beam.mesh.visible = true;
            beam.mesh.position.z += beam.speed;
            beam.mesh.position.y -= beam.speed * 0.5;
            if (beam.mesh.position.z > beam.baseZ + 1.2) {
              beam.mesh.position.z = beam.baseZ;
              beam.mesh.position.y = beam.baseY;
            }
          });
        } else {
          nodes.acLed.material = materials.metalDark;
          nodes.acAirflow.forEach((beam) => {
            beam.mesh.visible = false;
          });
        }
      }

      // H. Hub central Wi-Fi & Alerte coupure
      if (nodes.glitchHubLed) {
        if (isOffline) {
          nodes.glitchHubLed.material = materials.emissiveRed;
          nodes.glitchHubLed.material.emissiveIntensity = Math.sin(elapsedTime * 12) > 0 ? 1.5 : 0.2;
        } else {
          nodes.glitchHubLed.material = materials.emissiveCyan;
          nodes.glitchHubLed.material.emissiveIntensity = 0.8;
        }
      }

      // Rendu de la frame
      renderer.render(scene, camera);
    };

    animate();

    // Nettoyage lors du démontage
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer) {
        renderer.dispose();
      }
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

      {/* Halo indicateur de commande groupée 3D */}
      {highlightMulti && (
        <div className="three-multi-command-badge animate-pulse">
          <span>COMMANDE GROUPÉE 3D ACTIVE</span>
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
