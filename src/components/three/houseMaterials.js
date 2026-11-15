// houseMaterials.js
// Matériaux Three.js harmonisés pour le rendu architectural 3D low-poly moderne

import * as THREE from 'three';

export function createHouseMaterials() {
  return {
    // Structure & Façades
    platform: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.85,
      metalness: 0.1
    }),
    platformTrim: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      roughness: 0.3
    }),
    wallExterior: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      metalness: 0.15
    }),
    wallInterior: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.75,
      metalness: 0.05
    }),
    wallAccentWood: new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.6,
      metalness: 0.1
    }),
    floorWood: new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.6,
      metalness: 0.1
    }),
    floorKitchen: new THREE.MeshStandardMaterial({
      color: 0x1e2433,
      roughness: 0.5,
      metalness: 0.2
    }),
    floorBalcony: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.1
    }),
    roof: new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.7,
      metalness: 0.3
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.9
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
      metalness: 0.6
    }),

    // Stores électriques connectés
    shuttersSlat: new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.5
    }),
    shuttersBox: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.7
    }),

    // Mobilier intérieur
    sofa: new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Bleu moderne
      roughness: 0.8,
      metalness: 0.1
    }),
    sofaCushion: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.9,
      metalness: 0.05
    }),
    tableWood: new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.5,
      metalness: 0.1
    }),
    counterTop: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.4
    }),
    counterBase: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.2
    }),
    bedSheet: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.85,
      metalness: 0.05
    }),
    bedPillows: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      metalness: 0.05
    }),
    desk: new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.5,
      metalness: 0.3
    }),
    chair: new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.6,
      metalness: 0.2
    }),

    // Appareils connectés & Éléments émissifs
    metalDark: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8
    }),
    metalChrome: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.95
    }),
    emissiveCyan: new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
      roughness: 0.2
    }),
    emissiveAmber: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.2
    }),
    emissiveGreen: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.0,
      roughness: 0.2
    }),
    emissiveRed: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.0,
      roughness: 0.2
    }),
    steamParticle: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45
    }),
    airflowStream: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4
    }),
    spotlightLens: new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    })
  };
}
