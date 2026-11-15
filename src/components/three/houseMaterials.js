// houseMaterials.js
// Matériaux Three.js harmonisés pour le rendu architectural 3D premium (Style miniature d'architecte)

import * as THREE from 'three';

export function createHouseMaterials() {
  return {
    // 1. Socle & Aménagement paysager
    plinth: new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.9,
      metalness: 0.1
    }),
    gravel: new THREE.MeshStandardMaterial({
      color: 0x131a2a,
      roughness: 0.95,
      metalness: 0.05
    }),
    gardenCurb: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.2
    }),
    foliagePine: new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Sarcelle géométrique comme la référence
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true
    }),
    foliagePineDark: new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.85,
      flatShading: true
    }),
    foliageBush: new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.8,
      flatShading: true
    }),
    treeTrunk: new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.9
    }),

    // 2. Structure & Façades architecturales
    wallExteriorWhite: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.65,
      metalness: 0.05
    }),
    wallExteriorDark: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.75,
      metalness: 0.15
    }),
    wallInterior: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.7,
      metalness: 0.02
    }),
    wallAccentWood: new THREE.MeshStandardMaterial({
      color: 0xb45309, // Teck / Chêne cannelé
      roughness: 0.55,
      metalness: 0.08
    }),

    // 3. Planchers & Sols
    floorWood: new THREE.MeshStandardMaterial({
      color: 0xc2410c, // Chêne miel chaleureux
      roughness: 0.45,
      metalness: 0.05
    }),
    floorKitchen: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Quartz / béton ciré clair
      roughness: 0.35,
      metalness: 0.1
    }),
    floorBalcony: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6,
      metalness: 0.1
    }),

    // 4. Toiture & Solaire (Groupe rétractable)
    roofExterior: new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.5,
      metalness: 0.25,
      transparent: true,
      opacity: 1.0
    }),
    roofTrim: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.4,
      transparent: true,
      opacity: 1.0
    }),
    solarCell: new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 1.0
    }),
    solarFrame: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 1.0
    }),

    // 5. Baies vitrées, Garde-corps & Finitions
    glass: new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.9
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.35,
      metalness: 0.7
    }),
    railingMetal: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.7
    }),

    // 6. Rubans LED architecturaux (Signature visuelle de la référence)
    linearLedCyan: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.8,
      roughness: 0.2
    }),
    linearLedWarm: new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
      roughness: 0.3
    }),

    // 7. Mobilier du Salon
    sofaBeige: new THREE.MeshStandardMaterial({
      color: 0xd4d4d8, // Canapé greige clair contemporain
      roughness: 0.85,
      metalness: 0.05
    }),
    sofaBlue: new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Fauteuil bleu roi d'accentuation
      roughness: 0.8,
      metalness: 0.05
    }),
    cushionAccent: new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      roughness: 0.9
    }),
    woodTable: new THREE.MeshStandardMaterial({
      color: 0x78350f, // Bois noyer
      roughness: 0.45,
      metalness: 0.05
    }),
    rugGeometric: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.95
    }),
    rugPattern: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.95
    }),
    stairsWood: new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.5
    }),

    // 8. Cuisine & Îlot central
    countertopQuartz: new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Plan de travail blanc pur
      roughness: 0.25,
      metalness: 0.05
    }),
    counterCabinets: new THREE.MeshStandardMaterial({
      color: 0x1e2433, // Meubles bas anthracite
      roughness: 0.65,
      metalness: 0.1
    }),
    barStoolSeat: new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.55
    }),
    barStoolFrame: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.8
    }),

    // 9. Chambre & Espace Bureau
    bedHeadboard: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9
    }),
    bedDuvet: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Couette blanche
      roughness: 0.85
    }),
    bedRunner: new THREE.MeshStandardMaterial({
      color: 0x475569, // Jeté de lit géométrique
      roughness: 0.9
    }),
    bedPillows: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8
    }),
    nightstandWood: new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.5
    }),
    deskWood: new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.45
    }),
    chairOffice: new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6
    }),
    monitorScreen: new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.2
    }),

    // 10. Luminaires & Lampes
    lampWarmShade: new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
      roughness: 0.3
    }),
    lampMetal: new THREE.MeshStandardMaterial({
      color: 0xd97706, // Laiton / or brossé
      roughness: 0.3,
      metalness: 0.85
    }),

    // 11. Les 5 Appareils Connectés
    // Appareil 1 : Enceinte connectée
    speakerBody: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.3
    }),
    speakerRing: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.6,
      roughness: 0.2
    }),
    speakerWave: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5
    }),

    // Appareil 2 : Machine à café connectée
    coffeeBody: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.25,
      metalness: 0.85
    }),
    coffeeAccents: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.4
    }),
    coffeeCup: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    }),
    steamParticle: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45
    }),

    // Appareil 3 : Stores électriques connectés
    shuttersSlat: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.35,
      metalness: 0.5
    }),
    shuttersBox: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.7
    }),

    // Appareil 4 : Climatisation connectée
    acBody: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1
    }),
    acGrille: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.4
    }),
    acLed: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.2,
      roughness: 0.2
    }),
    airflowStream: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45
    }),

    // Métaux, LEDs d'alerte et utilitaires
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
      emissiveIntensity: 1.0,
      roughness: 0.2
    }),
    emissiveAmber: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.1,
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
      emissiveIntensity: 1.2,
      roughness: 0.2
    }),
    spotlightLens: new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    })
  };
}
