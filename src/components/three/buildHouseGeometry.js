// buildHouseGeometry.js
// Générateur procédural de la maquette 3D architecturale low-poly moderne (dollhouse cutaway)

import * as THREE from 'three';

export function buildHouseGeometry(materials) {
  const houseGroup = new THREE.Group();
  houseGroup.name = "SmartHouseRoot";

  // Dictionnaire des nœuds interactifs retournés pour le contrôle de l'animation
  const interactiveNodes = {
    speaker: null,
    speakerGlowRing: null,
    speakerWaves: [],
    coffee: null,
    coffeeLed: null,
    coffeeSteam: [],
    blinds: null,
    blindsSlats: [],
    ac: null,
    acLed: null,
    acAirflow: [],
    lights: {
      living: null,
      kitchen: null,
      bedroom: null,
      spots: []
    },
    rooms: {
      living: null,
      kitchen: null,
      bedroom: null
    },
    glitchHubLed: null
  };

  // ==========================================
  // 1. FONDATION & SOCLE ARCHITECTURAL
  // ==========================================
  // Socle terrasse moderne
  const platformGeo = new THREE.BoxGeometry(18.5, 0.6, 15.5);
  const platformMesh = new THREE.Mesh(platformGeo, materials.platform);
  platformMesh.position.set(0, -0.3, 0);
  houseGroup.add(platformMesh);

  // Liseré LED cyan discret sur les bordures extérieures du socle
  const trimFront = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.05, 0.12), materials.platformTrim);
  trimFront.position.set(0, 0.02, 7.75);
  const trimRight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 15.6), materials.platformTrim);
  trimRight.position.set(9.25, 0.02, 0);
  houseGroup.add(trimFront, trimRight);

  // Spotlights extérieurs au sol
  [-5, 0, 5].forEach((xPos) => {
    const spotBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.15, 8), materials.metalDark);
    spotBase.position.set(xPos, 0.08, 6.8);
    const spotLens = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 8), materials.spotlightLens);
    spotLens.position.set(xPos, 0.16, 6.8);
    houseGroup.add(spotBase, spotLens);

    const spotLight = new THREE.SpotLight(0x38bdf8, 1.2, 8, Math.PI / 4, 0.4);
    spotLight.position.set(xPos, 0.2, 6.8);
    spotLight.target.position.set(xPos, 3, 4.5);
    houseGroup.add(spotLight);
    houseGroup.add(spotLight.target);
    interactiveNodes.lights.spots.push(spotLight);
  });

  // ==========================================
  // 2. REZ-DE-CHAUSSÉE (Living Room & Kitchen)
  // ==========================================
  const gfFloorWoodGeo = new THREE.BoxGeometry(8, 0.1, 9.4);
  const gfFloorWood = new THREE.Mesh(gfFloorWoodGeo, materials.floorWood);
  gfFloorWood.position.set(3, 0.05, 0.2);
  houseGroup.add(gfFloorWood);

  const gfFloorKitchenGeo = new THREE.BoxGeometry(5.4, 0.1, 9.4);
  const gfFloorKitchen = new THREE.Mesh(gfFloorKitchenGeo, materials.floorKitchen);
  gfFloorKitchen.position.set(-3.7, 0.05, 0.2);
  houseGroup.add(gfFloorKitchen);

  // Mur du fond rez-de-chaussée
  const gfBackWallGeo = new THREE.BoxGeometry(13.4, 3.6, 0.4);
  const gfBackWall = new THREE.Mesh(gfBackWallGeo, materials.wallInterior);
  gfBackWall.position.set(-0.35, 1.8, -4.5);
  houseGroup.add(gfBackWall);

  // Mur latéral gauche
  const gfLeftWallGeo = new THREE.BoxGeometry(0.4, 3.6, 9.4);
  const gfLeftWall = new THREE.Mesh(gfLeftWallGeo, materials.wallExterior);
  gfLeftWall.position.set(-6.4, 1.8, 0.2);
  houseGroup.add(gfLeftWall);

  // Mur latéral droit
  const gfRightWallGeo = new THREE.BoxGeometry(0.4, 3.6, 9.4);
  const gfRightWall = new THREE.Mesh(gfRightWallGeo, materials.wallExterior);
  gfRightWall.position.set(7.0, 1.8, 0.2);
  houseGroup.add(gfRightWall);

  // Cloison centrale semi-ouverte avec panneau bois
  const gfDividerGeo = new THREE.BoxGeometry(0.3, 3.6, 5.0);
  const gfDivider = new THREE.Mesh(gfDividerGeo, materials.wallAccentWood);
  gfDivider.position.set(-1.0, 1.8, -2.0);
  houseGroup.add(gfDivider);

  // ------------------------------------------
  // MOBILIER DU SALON (Living Room)
  // ------------------------------------------
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(3.2, 0.1, -0.5);

  // Base canapé
  const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.4, 1.6), materials.counterBase);
  sofaBase.position.set(0, 0.2, 0);
  const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.4, 1.5), materials.sofa);
  sofaSeat.position.set(0, 0.5, 0);
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.0, 0.4), materials.sofa);
  sofaBack.position.set(0, 0.9, -0.6);
  // Coussins
  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.2), materials.sofaCushion);
  cushionL.position.set(-0.9, 0.8, -0.4);
  const cushionR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.2), materials.sofaCushion);
  cushionR.position.set(0.9, 0.8, -0.4);
  sofaGroup.add(sofaBase, sofaSeat, sofaBack, cushionL, cushionR);
  houseGroup.add(sofaGroup);

  // Table basse
  const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 1.1), materials.tableWood);
  coffeeTable.position.set(3.2, 0.28, 1.4);
  houseGroup.add(coffeeTable);

  // Tapis moderne
  const rug = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.02, 3.2), materials.sofaCushion);
  rug.position.set(3.2, 0.11, 0.8);
  houseGroup.add(rug);

  // Meuble TV mural au fond
  const tvConsole = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 0.6), materials.metalDark);
  tvConsole.position.set(3.2, 0.35, -4.1);
  const tvScreen = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.5, 0.08), materials.roof);
  tvScreen.position.set(3.2, 1.8, -4.2);
  houseGroup.add(tvConsole, tvScreen);

  // Table d'appoint pour l'enceinte connectée
  const sideTable = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.85, 12), materials.tableWood);
  sideTable.position.set(5.8, 0.52, 0.2);
  houseGroup.add(sideTable);

  // ------------------------------------------
  // APPAREIL 1 : ENCEINTE CONNECTÉE (Salon)
  // ------------------------------------------
  const speakerGroup = new THREE.Group();
  speakerGroup.name = "Device_Speaker";
  speakerGroup.position.set(5.8, 1.1, 0.2);

  // Corps cylindrique en tissu acoustique
  const speakerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.65, 16), materials.metalDark);
  speakerGroup.add(speakerBody);

  // Anneau lumineux supérieur interactif
  const ringGeo = new THREE.TorusGeometry(0.24, 0.035, 8, 24);
  ringGeo.rotateX(Math.PI / 2);
  const speakerGlowRing = new THREE.Mesh(ringGeo, materials.emissiveCyan);
  speakerGlowRing.position.set(0, 0.33, 0);
  speakerGroup.add(speakerGlowRing);

  // Ondes sonores semi-transparentes pulsantes
  for (let w = 0; w < 3; w++) {
    const waveGeo = new THREE.TorusGeometry(0.4 + w * 0.2, 0.02, 6, 24);
    waveGeo.rotateX(Math.PI / 2);
    const waveMesh = new THREE.Mesh(waveGeo, new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0
    }));
    waveMesh.position.set(0, 0.34, 0);
    speakerGroup.add(waveMesh);
    interactiveNodes.speakerWaves.push(waveMesh);
  }

  houseGroup.add(speakerGroup);
  interactiveNodes.speaker = speakerGroup;
  interactiveNodes.speakerGlowRing = speakerGlowRing;

  // ------------------------------------------
  // MOBILIER DE LA CUISINE & APPAREIL 2 : MACHINE À CAFÉ
  // ------------------------------------------
  const kitchenCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 1.4), materials.counterBase);
  kitchenCounter.position.set(-3.7, 0.65, -3.4);
  const kitchenCounterTop = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.12, 1.5), materials.counterTop);
  kitchenCounterTop.position.set(-3.7, 1.24, -3.4);
  houseGroup.add(kitchenCounter, kitchenCounterTop);

  // Îlot bar
  const island = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 3.2), materials.counterBase);
  island.position.set(-1.8, 0.65, -0.6);
  const islandTop = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 3.4), materials.counterTop);
  islandTop.position.set(-1.8, 1.24, -0.6);
  houseGroup.add(island, islandTop);

  // Machine à café connectée
  const coffeeGroup = new THREE.Group();
  coffeeGroup.name = "Device_CoffeeMachine";
  coffeeGroup.position.set(-3.5, 1.3, -3.3);

  const coffeeBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.65), materials.metalDark);
  coffeeBody.position.set(0, 0.4, 0);
  const coffeeDispenser = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.3), materials.metalChrome);
  coffeeDispenser.position.set(0, 0.55, 0.25);
  const coffeeCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.22, 10), materials.bedPillows);
  coffeeCup.position.set(0, 0.2, 0.3);

  // LED indicatrice d'état
  const coffeeLed = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), materials.emissiveGreen);
  coffeeLed.position.set(0, 0.72, 0.33);

  coffeeGroup.add(coffeeBody, coffeeDispenser, coffeeCup, coffeeLed);

  // Particules de vapeur animées
  for (let s = 0; s < 6; s++) {
    const steamGeo = new THREE.SphereGeometry(0.06 + s * 0.02, 6, 6);
    const steamMesh = new THREE.Mesh(steamGeo, materials.steamParticle.clone());
    steamMesh.position.set((Math.random() - 0.5) * 0.1, 0.35 + s * 0.18, 0.3 + (Math.random() - 0.5) * 0.1);
    steamMesh.visible = false;
    coffeeGroup.add(steamMesh);
    interactiveNodes.coffeeSteam.push({
      mesh: steamMesh,
      baseY: 0.35 + s * 0.18,
      speed: 0.015 + s * 0.005,
      initOffset: s * 0.4
    });
  }

  houseGroup.add(coffeeGroup);
  interactiveNodes.coffee = coffeeGroup;
  interactiveNodes.coffeeLed = coffeeLed;

  // ------------------------------------------
  // LUMIÈRES DU REZ-DE-CHAUSSÉE (Living & Kitchen)
  // ------------------------------------------
  const livingLight = new THREE.PointLight(0xffedd5, 0, 10, 1.5);
  livingLight.position.set(3.2, 2.8, 0.2);
  houseGroup.add(livingLight);
  interactiveNodes.lights.living = livingLight;

  const kitchenLight = new THREE.PointLight(0xfffbeb, 0, 8, 1.5);
  kitchenLight.position.set(-3.7, 2.8, -1.0);
  houseGroup.add(kitchenLight);
  interactiveNodes.lights.kitchen = kitchenLight;

  // ==========================================
  // 3. ÉTAGE SUPÉRIEUR (Suite & Chambre)
  // ==========================================
  const floorSlabGeo = new THREE.BoxGeometry(13.8, 0.35, 9.8);
  const floorSlab = new THREE.Mesh(floorSlabGeo, materials.floorBalcony);
  floorSlab.position.set(-0.2, 3.75, 0.2);
  houseGroup.add(floorSlab);

  // Parquet chambre
  const bedroomFloor = new THREE.Mesh(new THREE.BoxGeometry(13.2, 0.08, 9.2), materials.floorWood);
  bedroomFloor.position.set(-0.2, 3.96, 0.2);
  houseGroup.add(bedroomFloor);

  // Mur du fond étage
  const ufBackWallGeo = new THREE.BoxGeometry(13.4, 3.2, 0.4);
  const ufBackWall = new THREE.Mesh(ufBackWallGeo, materials.wallInterior);
  ufBackWall.position.set(-0.35, 5.5, -4.4);
  houseGroup.add(ufBackWall);

  // Mur gauche étage
  const ufLeftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 9.2), materials.wallExterior);
  ufLeftWall.position.set(-6.4, 5.5, 0.2);
  houseGroup.add(ufLeftWall);

  // Mur droit étage avec grande ouverture baie vitrée
  const ufRightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 4.0), materials.wallExterior);
  ufRightWall.position.set(6.8, 5.5, -2.4);
  houseGroup.add(ufRightWall);

  // ------------------------------------------
  // MOBILIER DE LA CHAMBRE
  // ------------------------------------------
  const bedGroup = new THREE.Group();
  bedGroup.position.set(1.5, 4.0, -2.4);

  // Cadre de lit
  const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.4, 3.2), materials.counterBase);
  bedFrame.position.set(0, 0.2, 0);
  const bedMattress = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.45, 3.0), materials.bedSheet);
  bedMattress.position.set(0, 0.55, 0);
  const bedHeadboard = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.4, 0.3), materials.wallAccentWood);
  bedHeadboard.position.set(0, 0.9, -1.5);
  // Oreillers
  const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.2, 0.6), materials.bedPillows);
  pillow1.position.set(-0.65, 0.85, -1.0);
  const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.2, 0.6), materials.bedPillows);
  pillow2.position.set(0.65, 0.85, -1.0);

  bedGroup.add(bedFrame, bedMattress, bedHeadboard, pillow1, pillow2);
  houseGroup.add(bedGroup);

  // Bureau d'étude
  const deskGroup = new THREE.Group();
  deskGroup.position.set(-4.0, 4.0, -2.2);
  const deskTable = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.2), materials.desk);
  deskTable.position.set(0, 0.9, 0);
  const deskLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 1.1), materials.counterBase);
  deskLeg1.position.set(-1.1, 0.45, 0);
  const deskLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 1.1), materials.counterBase);
  deskLeg2.position.set(1.1, 0.45, 0);
  const deskChair = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 0.7), materials.chair);
  deskChair.position.set(0, 0.5, 0.8);
  deskGroup.add(deskTable, deskLeg1, deskLeg2, deskChair);
  houseGroup.add(deskGroup);

  // ------------------------------------------
  // APPAREIL 3 : STORES ÉLECTRIQUES CONNECTÉS (Baie vitrée chambre)
  // ------------------------------------------
  const blindsGroup = new THREE.Group();
  blindsGroup.name = "Device_ElectricBlinds";
  blindsGroup.position.set(6.8, 5.5, 2.3);

  // Encadrement de baie vitrée
  const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.8, 4.8), materials.glass);
  windowGlass.position.set(0, 0, 0);
  const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.9, 5.0), materials.windowFrame);
  windowFrame.position.set(0, 0, 0);
  // Caisson supérieur moteur du store
  const shutterCassette = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 4.9), materials.shuttersBox);
  shutterCassette.position.set(-0.05, 1.35, 0);
  blindsGroup.add(windowGlass, windowFrame, shutterCassette);

  // Lames horizontales du store qui coulissent
  const slatsContainer = new THREE.Group();
  slatsContainer.position.set(-0.06, 0, 0);

  const numSlats = 14;
  const slatHeight = 0.16;
  for (let i = 0; i < numSlats; i++) {
    const slatMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, slatHeight, 4.7), materials.shuttersSlat);
    slatMesh.position.set(0, 1.15 - i * (slatHeight + 0.02), 0);
    slatsContainer.add(slatMesh);
    interactiveNodes.blindsSlats.push(slatMesh);
  }

  blindsGroup.add(slatsContainer);
  houseGroup.add(blindsGroup);
  interactiveNodes.blinds = slatsContainer;

  // ------------------------------------------
  // APPAREIL 4 : CLIMATISATION CONNECTÉE (Chambre)
  // ------------------------------------------
  const acGroup = new THREE.Group();
  acGroup.name = "Device_AirConditioner";
  acGroup.position.set(-1.8, 6.4, -4.1);

  // Unité murale split moderne
  const acBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 0.45), materials.bedPillows);
  const acVent = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.46), materials.metalDark);
  acVent.position.set(0, -0.22, 0.02);

  // Écran digital LED 21°C
  const acDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.02), materials.emissiveCyan);
  acDisplay.position.set(0.65, 0.08, 0.24);

  acGroup.add(acBody, acVent, acDisplay);

  // Faisceaux d'air frais animés
  for (let b = 0; b < 5; b++) {
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.12, 1.6, 6);
    beamGeo.rotateX(Math.PI / 3);
    const beamMesh = new THREE.Mesh(beamGeo, materials.airflowStream.clone());
    beamMesh.position.set(-0.6 + b * 0.3, -0.8, 0.5 + b * 0.1);
    beamMesh.visible = false;
    acGroup.add(beamMesh);
    interactiveNodes.acAirflow.push({
      mesh: beamMesh,
      baseY: -0.8,
      baseZ: 0.5 + b * 0.1,
      speed: 0.02 + b * 0.005
    });
  }

  houseGroup.add(acGroup);
  interactiveNodes.ac = acGroup;
  interactiveNodes.acLed = acDisplay;

  // ------------------------------------------
  // APPAREIL 5 : LUMIÈRES CONNECTÉES (Étage)
  // ------------------------------------------
  const bedroomLight = new THREE.PointLight(0xfef08a, 0, 10, 1.4);
  bedroomLight.position.set(-0.2, 6.3, 0.2);
  houseGroup.add(bedroomLight);
  interactiveNodes.lights.bedroom = bedroomLight;

  // Suspensions lumineuses design
  const lampLiving = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 10), materials.metalDark);
  lampLiving.position.set(3.2, 3.4, 0.2);
  houseGroup.add(lampLiving);

  const lampBedroom = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.25, 10), materials.metalDark);
  lampBedroom.position.set(-0.2, 6.8, 0.2);
  houseGroup.add(lampBedroom);

  // ------------------------------------------
  // APPAREIL 4 : LUMIÈRES CONNECTÉES (Lampadaire design salon)
  // ------------------------------------------
  const floorLampGroup = new THREE.Group();
  floorLampGroup.name = "Device_Lights";
  floorLampGroup.position.set(0.8, 0.1, 2.2);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.05, 12), materials.metalDark);
  lampBase.position.set(0, 0.025, 0);
  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 8), materials.metalDark);
  lampPole.position.set(0, 1.1, 0);
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.45, 12), materials.emissiveAmber);
  lampShade.position.set(0, 2.2, 0);
  floorLampGroup.add(lampBase, lampPole, lampShade);
  houseGroup.add(floorLampGroup);
  interactiveNodes.floorLampShade = lampShade;

  // ==========================================
  // 4. TOIT PLAT ARCHITECTURAL & HUB DOMOTIQUE
  // ==========================================
  const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.45, 10.6), materials.roof);
  roofSlab.position.set(-0.2, 7.3, 0.2);
  houseGroup.add(roofSlab);

  // Balustrade terrasse supérieure
  const railingGeo = new THREE.BoxGeometry(14.4, 0.5, 0.1);
  const railing = new THREE.Mesh(railingGeo, materials.windowFrame);
  railing.position.set(-0.2, 7.7, 5.3);
  houseGroup.add(railing);

  // Antenne / Hub central Wi-Fi (utilisé pour l'alerte glitch dans la Scène 6)
  const hubGroup = new THREE.Group();
  hubGroup.position.set(-5.0, 7.6, -3.5);
  const hubBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.2, 8), materials.metalDark);
  const hubAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 6), materials.metalChrome);
  hubAntenna.position.set(0, 0.4, 0);
  const hubLed = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), materials.emissiveCyan);
  hubLed.position.set(0, 0.8, 0);

  hubGroup.add(hubBase, hubAntenna, hubLed);
  houseGroup.add(hubGroup);
  interactiveNodes.glitchHubLed = hubLed;

  return {
    houseGroup,
    interactiveNodes
  };
}
