// buildHouseGeometry.js
// Maquette architecturale 3D de précision pour « LA MAISON INTELLIGENTE »
// Modélisation architecturale étagée fidèle à la référence (Living room ouvert, escalier central, cuisine en îlot, suite parentale et stores)

import * as THREE from 'three';

export function buildHouseGeometry(materials) {
  const houseGroup = new THREE.Group();
  houseGroup.name = "House_Root";

  const interactiveNodes = {
    speakerGlowRing: null,
    speakerWaves: [],
    coffeeSteam: [],
    coffeeLed: null,
    blindsSlats: [],
    acAirflow: [],
    acLed: null,
    floorLampShade: null,
    bedsideLamps: [],
    lights: {
      living: null,
      kitchen: null,
      bedroom: null,
      spots: []
    },
    glitchHubLed: null,
    roofGroup: null
  };

  // =========================================================================
  // 1. SOCLE & AMÉNAGEMENT PAYSAGER (Socle biseauté, gravier & pins low-poly)
  // =========================================================================
  const landscapeGroup = new THREE.Group();

  // Grand socle architectural noir mat
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(19.2, 0.7, 19.2),
    materials.plinth
  );
  plinth.position.set(0, -0.35, 0);
  landscapeGroup.add(plinth);

  // Lit de gravier sombre paysager
  const gravel = new THREE.Mesh(
    new THREE.BoxGeometry(18.4, 0.12, 18.4),
    materials.gravel
  );
  gravel.position.set(0, 0.06, 0);
  landscapeGroup.add(gravel);

  // Bordures extérieures du jardin
  const curbFront = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.16, 0.2), materials.gardenCurb);
  curbFront.position.set(0, 0.08, 9.1);
  const curbRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 18.4), materials.gardenCurb);
  curbRight.position.set(9.1, 0.08, 0);
  landscapeGroup.add(curbFront, curbRight);

  // Arbres pins géométriques low-poly (Zone jardin gauche comme sur la référence)
  const createPineTree = (x, z, scale = 1.0) => {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0.1, z);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * scale, 0.16 * scale, 0.8 * scale, 6),
      materials.treeTrunk
    );
    trunk.position.set(0, 0.4 * scale, 0);
    treeGroup.add(trunk);

    const cone1 = new THREE.Mesh(new THREE.ConeGeometry(1.1 * scale, 1.2 * scale, 7), materials.foliagePine);
    cone1.position.set(0, 1.1 * scale, 0);
    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.85 * scale, 1.0 * scale, 7), materials.foliagePineDark);
    cone2.position.set(0, 1.7 * scale, 0);
    const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.55 * scale, 0.8 * scale, 7), materials.foliagePine);
    cone3.position.set(0, 2.2 * scale, 0);

    treeGroup.add(cone1, cone2, cone3);
    return treeGroup;
  };

  landscapeGroup.add(createPineTree(-6.8, 3.8, 1.05));
  landscapeGroup.add(createPineTree(-7.5, 1.2, 0.85));
  landscapeGroup.add(createPineTree(-6.4, 6.8, 0.75));

  // Buissons géométriques arrondis (Icosaèdres flat-shaded)
  const createBush = (x, z, r = 0.35) => {
    const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), materials.foliageBush);
    bush.position.set(x, 0.12 + r, z);
    return bush;
  };

  landscapeGroup.add(createBush(-5.2, 6.2, 0.38));
  landscapeGroup.add(createBush(-4.5, 7.2, 0.28));
  landscapeGroup.add(createBush(7.2, 5.8, 0.36));
  landscapeGroup.add(createBush(6.2, 7.0, 0.3));

  // Projecteurs encastrés au sol
  [[-4.5, 5.2], [4.5, 7.0], [7.2, 4.0]].forEach(([x, z]) => {
    const spotFixture = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 8), materials.metalDark);
    spotFixture.position.set(x, 0.14, z);
    const spotLens = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 8), materials.spotlightLens);
    spotLens.position.set(x, 0.18, z);
    landscapeGroup.add(spotFixture, spotLens);

    const spotLight = new THREE.SpotLight(0x38bdf8, 1.2, 6, Math.PI / 4, 0.3);
    spotLight.position.set(x, 0.2, z);
    spotLight.target.position.set(x * 0.7, 2.0, z * 0.7);
    landscapeGroup.add(spotLight, spotLight.target);
    interactiveNodes.lights.spots.push(spotLight);
  });

  houseGroup.add(landscapeGroup);

  // =========================================================================
  // 2. REZ-DE-CHAUSSÉE (Coupe ouverte : Salon, Escalier central & Cuisine)
  // =========================================================================
  const groundGroup = new THREE.Group();
  groundGroup.name = "Ground_Floor";

  // Dalle de sol RDC
  const gfSlab = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.22, 13.6), materials.wallExteriorDark);
  gfSlab.position.set(0, 0.21, 0);
  groundGroup.add(gfSlab);

  // Sol parquet chêne miel pour le salon & zone escalier
  const livingFloor = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.04, 13.0), materials.floorWood);
  livingFloor.position.set(-2.5, 0.34, 0);
  groundGroup.add(livingFloor);

  // Sol carrelage clair pour la cuisine
  const kitchenFloor = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.04, 13.0), materials.floorKitchen);
  kitchenFloor.position.set(4.0, 0.34, 0);
  groundGroup.add(kitchenFloor);

  // Mur de fond RDC
  const backWallRDC = new THREE.Mesh(new THREE.BoxGeometry(13.6, 3.4, 0.3), materials.wallInterior);
  backWallRDC.position.set(0, 2.05, -6.4);
  groundGroup.add(backWallRDC);

  // Panneau acoustique en bois cannelé derrière le canapé
  const woodPanelWall = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.3, 0.08), materials.wallAccentWood);
  woodPanelWall.position.set(-3.5, 2.05, -6.2);
  groundGroup.add(woodPanelWall);

  // Mur extérieur gauche avec vitrage donnant sur le jardin
  const leftWallRDC = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.4, 13.2), materials.wallExteriorWhite);
  leftWallRDC.position.set(-6.65, 2.05, 0);
  groundGroup.add(leftWallRDC);

  const leftGlassRDC = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.8, 7.0), materials.glass);
  leftGlassRDC.position.set(-6.45, 1.8, 0);
  groundGroup.add(leftGlassRDC);

  // -------------------------------------------------------------------------
  // MOBILIER DU SALON (Canapé contemporain, table basse, tapis géométrique)
  // -------------------------------------------------------------------------
  const livingFurniture = new THREE.Group();

  // Grand tapis géométrique contemporain
  const rugBase = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.02, 3.8), materials.rugGeometric);
  rugBase.position.set(-2.8, 0.37, 2.2);
  const rugStripe = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.022, 1.4), materials.rugPattern);
  rugStripe.position.set(-2.8, 0.372, 2.2);
  livingFurniture.add(rugBase, rugStripe);

  // Canapé 2 places (Greige clair contemporain)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(-3.4, 0.36, 0.6);

  const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.28, 1.4), materials.sofaBeige);
  sofaBase.position.set(0, 0.14, 0);
  const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.32, 1.2), materials.sofaBeige);
  sofaSeat.position.set(0, 0.44, 0);
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.9, 0.35), materials.sofaBeige);
  sofaBack.position.set(0, 0.85, -0.5);
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 1.3), materials.sofaBeige);
  armL.position.set(-1.6, 0.55, 0);
  const armR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 1.3), materials.sofaBeige);
  armR.position.set(1.6, 0.55, 0);

  // Coussins d'accentuation bleu
  const cushion1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.18), materials.cushionAccent);
  cushion1.position.set(-1.0, 0.75, -0.35);
  cushion1.rotation.y = 0.1;
  const cushion2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.18), materials.cushionAccent);
  cushion2.position.set(1.0, 0.75, -0.35);
  cushion2.rotation.y = -0.1;

  sofaGroup.add(sofaBase, sofaSeat, sofaBack, armL, armR, cushion1, cushion2);
  livingFurniture.add(sofaGroup);

  // Fauteuil bleu contemporain perpendiculaire
  const chairBlueGroup = new THREE.Group();
  chairBlueGroup.position.set(-0.8, 0.36, 3.8);
  chairBlueGroup.rotation.y = Math.PI;

  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 1.2), materials.sofaBlue);
  chairSeat.position.set(0, 0.35, 0);
  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.75, 0.3), materials.sofaBlue);
  chairBack.position.set(0, 0.75, 0.45);
  chairBlueGroup.add(chairSeat, chairBack);
  livingFurniture.add(chairBlueGroup);

  // Table basse en noyer avec livre
  const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 1.0), materials.woodTable);
  coffeeTable.position.set(-2.8, 0.52, 2.2);
  const tableBook = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.3), materials.countertopQuartz);
  tableBook.position.set(-2.6, 0.69, 2.15);
  livingFurniture.add(coffeeTable, tableBook);

  // Table d'appoint avec l'ENCEINTE CONNECTÉE
  const sideTable = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 0.65, 12),
    materials.woodTable
  );
  sideTable.position.set(-5.5, 0.68, 0.6);
  livingFurniture.add(sideTable);

  // -------------------------------------------------------------------------
  // APPAREIL 1 : ENCEINTE CONNECTÉE (Haute précision)
  // -------------------------------------------------------------------------
  const speakerGroup = new THREE.Group();
  speakerGroup.name = "Device_Speaker";
  speakerGroup.position.set(-5.5, 1.05, 0.6);

  const speakerBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.24, 0.55, 16),
    materials.speakerBody
  );
  speakerBody.position.set(0, 0.28, 0);

  const speakerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.03, 12, 24),
    materials.speakerRing
  );
  speakerRing.position.set(0, 0.56, 0);
  speakerRing.rotation.x = Math.PI / 2;
  speakerGroup.add(speakerBody, speakerRing);
  interactiveNodes.speakerGlowRing = speakerRing;

  for (let i = 0; i < 3; i++) {
    const wave = new THREE.Mesh(
      new THREE.TorusGeometry(0.35 + i * 0.2, 0.02, 8, 24),
      materials.speakerWave.clone()
    );
    wave.position.set(0, 0.56, 0);
    wave.rotation.x = Math.PI / 2;
    wave.material.opacity = 0;
    speakerGroup.add(wave);
    interactiveNodes.speakerWaves.push(wave);
  }

  livingFurniture.add(speakerGroup);

  // -------------------------------------------------------------------------
  // APPAREIL 4 (Partie Salon) : LAMPADAIRE CONNECTÉ & ÉCLAIRAGE SALON
  // -------------------------------------------------------------------------
  const floorLampGroup = new THREE.Group();
  floorLampGroup.name = "Device_Lights";
  floorLampGroup.position.set(-5.5, 0.36, -2.5);

  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 12), materials.metalDark);
  lampBase.position.set(0, 0.02, 0);
  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.4, 8), materials.lampMetal);
  lampPole.position.set(0, 1.2, 0);
  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.5, 14), materials.lampWarmShade);
  lampShade.position.set(0, 2.3, 0);
  floorLampGroup.add(lampBase, lampPole, lampShade);
  interactiveNodes.floorLampShade = lampShade;
  livingFurniture.add(floorLampGroup);

  // PointLight salon (2700K chaleureux)
  const livingLight = new THREE.PointLight(0xffedd5, 3.2, 11, 1.4);
  livingLight.position.set(-3.2, 2.6, 1.5);
  livingFurniture.add(livingLight);
  interactiveNodes.lights.living = livingLight;

  groundGroup.add(livingFurniture);

  // -------------------------------------------------------------------------
  // ESCALIER EN BOIS (Élément architectural reliant RDC et Étage)
  // -------------------------------------------------------------------------
  const stairGroup = new THREE.Group();
  stairGroup.position.set(-0.6, 0.36, -4.2);

  for (let s = 0; s < 7; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.45), materials.stairsWood);
    step.position.set(0, s * 0.48 + 0.24, s * 0.42);
    stairGroup.add(step);
  }
  groundGroup.add(stairGroup);

  // -------------------------------------------------------------------------
  // CUISINE & ÎLOT AMÉRICAIN AVEC MACHINE À CAFÉ CONNECTÉE
  // -------------------------------------------------------------------------
  const kitchenGroup = new THREE.Group();

  // Îlot de cuisine avec comptoir quartz blanc en cascade (waterfall)
  const islandGroup = new THREE.Group();
  islandGroup.position.set(3.6, 0.36, 2.2);

  const islandBody = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 1.6), materials.counterCabinets);
  islandBody.position.set(0, 0.55, 0);
  const islandTop = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.12, 1.8), materials.countertopQuartz);
  islandTop.position.set(0, 1.16, 0);
  islandGroup.add(islandBody, islandTop);

  // Tabourets de bar
  const createStool = (xOffset) => {
    const stool = new THREE.Group();
    stool.position.set(xOffset, 0, 1.4);

    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 12), materials.barStoolSeat);
    seat.position.set(0, 0.85, 0);
    const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.82, 4), materials.barStoolFrame);
    legs.position.set(0, 0.41, 0);
    stool.add(seat, legs);
    return stool;
  };
  islandGroup.add(createStool(-0.9));
  islandGroup.add(createStool(0.9));

  kitchenGroup.add(islandGroup);

  // Meuble bas de cuisine au fond
  const kitchenBackCounter = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.1, 1.2), materials.counterCabinets);
  kitchenBackCounter.position.set(4.0, 0.91, -5.5);
  const kitchenBackTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 1.3), materials.countertopQuartz);
  kitchenBackTop.position.set(4.0, 1.51, -5.5);
  kitchenGroup.add(kitchenBackCounter, kitchenBackTop);

  // -------------------------------------------------------------------------
  // APPAREIL 2 : MACHINE À CAFÉ CONNECTÉE (Comptoir cuisine)
  // -------------------------------------------------------------------------
  const coffeeGroup = new THREE.Group();
  coffeeGroup.name = "Device_CoffeeMachine";
  coffeeGroup.position.set(4.2, 1.95, -5.4);

  const coffeeBase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.55), materials.coffeeBody);
  coffeeBase.position.set(0, 0, 0);
  const coffeeHead = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.25, 0.5), materials.coffeeAccents);
  coffeeHead.position.set(0, 0.32, 0.02);
  const portafilter = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8), materials.metalChrome);
  portafilter.position.set(0, 0.15, 0.32);
  portafilter.rotation.x = Math.PI / 2;

  const coffeeCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.18, 12), materials.coffeeCup);
  coffeeCup.position.set(0, -0.15, 0.2);

  const coffeeLed = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), materials.emissiveGreen);
  coffeeLed.position.set(0.2, 0.35, 0.28);
  coffeeGroup.add(coffeeBase, coffeeHead, portafilter, coffeeCup, coffeeLed);
  interactiveNodes.coffeeLed = coffeeLed;

  for (let p = 0; p < 8; p++) {
    const steam = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), materials.steamParticle.clone());
    steam.position.set((Math.random() - 0.5) * 0.08, -0.05 + p * 0.08, 0.2 + (Math.random() - 0.5) * 0.06);
    steam.visible = false;
    coffeeGroup.add(steam);
    interactiveNodes.coffeeSteam.push({
      mesh: steam,
      baseY: -0.05,
      speed: 0.008 + Math.random() * 0.006,
      initOffset: p * 0.5
    });
  }

  kitchenGroup.add(coffeeGroup);

  const kitchenLight = new THREE.PointLight(0xfffbeb, 2.6, 9, 1.4);
  kitchenLight.position.set(3.8, 2.6, 0.5);
  kitchenGroup.add(kitchenLight);
  interactiveNodes.lights.kitchen = kitchenLight;

  groundGroup.add(kitchenGroup);

  // Ruban LED linéaire cyan continu sous le plancher intermédiaire
  const gfFasciaTrim = new THREE.Mesh(new THREE.BoxGeometry(13.8, 0.08, 0.1), materials.linearLedCyan);
  gfFasciaTrim.position.set(0, 3.75, 6.8);
  groundGroup.add(gfFasciaTrim);

  houseGroup.add(groundGroup);

  // =========================================================================
  // 3. ÉTAGE SUPÉRIEUR (Suite parentale, Climatisation, Stores & Balcon)
  // Architecture étagée ouverte : le salon en bas reste visible depuis le haut
  // =========================================================================
  const upperGroup = new THREE.Group();
  upperGroup.name = "Upper_Floor";

  // Plancher de la suite parentale (Partie droite et arrière)
  const bedroomSlab = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.28, 9.8), materials.wallExteriorWhite);
  bedroomSlab.position.set(3.2, 3.89, -1.5);
  upperGroup.add(bedroomSlab);

  const bedroomFloorWood = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.04, 9.6), materials.floorWood);
  bedroomFloorWood.position.set(3.2, 4.05, -1.5);
  upperGroup.add(bedroomFloorWood);

  // Passerelle / coursive supérieure gauche (qui porte les stores)
  const hallwaySlab = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.28, 5.8), materials.wallExteriorWhite);
  hallwaySlab.position.set(-3.5, 3.89, -3.5);
  upperGroup.add(hallwaySlab);

  const hallwayFloorWood = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.04, 5.6), materials.floorWood);
  hallwayFloorWood.position.set(-3.5, 4.05, -3.5);
  upperGroup.add(hallwayFloorWood);

  // Garde-corps en verre le long du vide sur séjour (Salon en contrebas)
  const mezzanineGlass = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.9, 0.06), materials.glass);
  mezzanineGlass.position.set(-3.5, 4.5, -0.6);
  const mezzanineRail = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.06, 0.08), materials.railingMetal);
  mezzanineRail.position.set(-3.5, 4.95, -0.6);
  upperGroup.add(mezzanineGlass, mezzanineRail);

  // Mur du fond étage
  const backWallUF = new THREE.Mesh(new THREE.BoxGeometry(13.6, 3.3, 0.3), materials.wallInterior);
  backWallUF.position.set(0, 5.7, -6.4);
  upperGroup.add(backWallUF);

  // Mur droit de la chambre
  const rightWallUF = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.3, 9.4), materials.wallExteriorWhite);
  rightWallUF.position.set(6.75, 5.7, -1.6);
  upperGroup.add(rightWallUF);

  // -------------------------------------------------------------------------
  // SUITE PARENTALE & MOBILIER (Lit design, chevets, bureau d'étude)
  // -------------------------------------------------------------------------
  const bedGroup = new THREE.Group();
  bedGroup.position.set(3.2, 4.08, -1.5);

  const bedRug = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.02, 3.8), materials.rugGeometric);
  bedRug.position.set(0, 0.01, 0.2);
  bedGroup.add(bedRug);

  const headboard = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 0.25), materials.bedHeadboard);
  headboard.position.set(0, 0.7, -1.5);

  const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.35, 2.8), materials.counterCabinets);
  bedFrame.position.set(0, 0.18, 0);
  const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.6), materials.bedDuvet);
  mattress.position.set(0, 0.45, 0);

  const bedRunner = new THREE.Mesh(new THREE.BoxGeometry(2.62, 0.04, 0.9), materials.bedRunner);
  bedRunner.position.set(0, 0.64, 0.7);

  const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.5), materials.bedPillows);
  pillow1.position.set(-0.65, 0.68, -0.85);
  const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.5), materials.bedPillows);
  pillow2.position.set(0.65, 0.68, -0.85);

  bedGroup.add(headboard, bedFrame, mattress, bedRunner, pillow1, pillow2);

  const createBedsideTable = (xPos) => {
    const tableGroup = new THREE.Group();
    tableGroup.position.set(xPos, 0, -1.3);

    const table = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.5), materials.nightstandWood);
    table.position.set(0, 0.22, 0);

    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8), materials.lampMetal);
    lampStem.position.set(0, 0.55, 0);
    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.25, 12), materials.lampWarmShade);
    lampShade.position.set(0, 0.8, 0);

    tableGroup.add(table, lampStem, lampShade);
    interactiveNodes.bedsideLamps.push(lampShade);
    return tableGroup;
  };

  bedGroup.add(createBedsideTable(-1.85));
  bedGroup.add(createBedsideTable(1.85));
  upperGroup.add(bedGroup);

  // Bureau d'étude en arrière-plan
  const studyDeskGroup = new THREE.Group();
  studyDeskGroup.position.set(2.0, 4.08, -5.2);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.0), materials.deskWood);
  deskTop.position.set(0, 0.85, 0);
  const deskLegL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 0.95), materials.deskWood);
  deskLegL.position.set(-1.0, 0.42, 0);
  const deskLegR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 0.95), materials.deskWood);
  deskLegR.position.set(1.0, 0.42, 0);

  const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.04), materials.monitorScreen);
  monitor.position.set(0, 1.25, -0.2);
  const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6), materials.metalChrome);
  monitorStand.position.set(0, 0.95, -0.2);

  const officeChair = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.5, 0.6), materials.chairOffice);
  officeChair.position.set(0, 0.55, 0.65);

  studyDeskGroup.add(deskTop, deskLegL, deskLegR, monitor, monitorStand, officeChair);
  upperGroup.add(studyDeskGroup);

  // -------------------------------------------------------------------------
  // APPAREIL 5 : CLIMATISATION CONNECTÉE (Split mural chambre)
  // -------------------------------------------------------------------------
  const acGroup = new THREE.Group();
  acGroup.name = "Device_AirConditioner";
  acGroup.position.set(6.55, 6.2, -1.0);
  acGroup.rotation.y = -Math.PI / 2;

  const acBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.35), materials.acBody);
  const acGrille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.05), materials.acGrille);
  acGrille.position.set(0, -0.15, 0.16);

  const acLed = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.02), materials.acLed);
  acLed.position.set(0.5, 0.05, 0.17);
  acGroup.add(acBody, acGrille, acLed);
  interactiveNodes.acLed = acLed;

  for (let b = 0; b < 5; b++) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.7), materials.airflowStream.clone());
    beam.position.set(-0.4 + b * 0.2, -0.2, 0.4 + b * 0.15);
    beam.rotation.x = Math.PI / 6;
    beam.visible = false;
    acGroup.add(beam);
    interactiveNodes.acAirflow.push({
      mesh: beam,
      baseZ: 0.2,
      baseY: -0.2,
      speed: 0.015 + b * 0.004
    });
  }
  upperGroup.add(acGroup);

  // -------------------------------------------------------------------------
  // APPAREIL 3 : STORES ÉLECTRIQUES CONNECTÉS (Baie vitrée gauche étage)
  // -------------------------------------------------------------------------
  const blindsFrameGroup = new THREE.Group();
  blindsFrameGroup.name = "Device_ElectricBlinds";
  blindsFrameGroup.position.set(-3.5, 5.65, -0.6);

  const wFrameTop = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.12, 0.25), materials.windowFrame);
  wFrameTop.position.set(0, 1.45, 0);
  const wFrameBtm = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.12, 0.25), materials.windowFrame);
  wFrameBtm.position.set(0, -1.45, 0);
  const wFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.9, 0.25), materials.windowFrame);
  wFrameL.position.set(-2.55, 0, 0);
  const wFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.9, 0.25), materials.windowFrame);
  wFrameR.position.set(2.55, 0, 0);

  const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.8, 0.06), materials.glass);
  blindsFrameGroup.add(wFrameTop, wFrameBtm, wFrameL, wFrameR, windowGlass);

  const shutterBox = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.35, 0.35), materials.shuttersBox);
  shutterBox.position.set(0, 1.35, 0.12);
  blindsFrameGroup.add(shutterBox);

  for (let s = 0; s < 14; s++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.16, 0.04), materials.shuttersSlat);
    slat.position.set(0, 1.15 - s * 0.18, 0.08);
    blindsFrameGroup.add(slat);
    interactiveNodes.blindsSlats.push(slat);
  }

  upperGroup.add(blindsFrameGroup);

  // Balcon avec garde-corps noir mat (Côté droit de l'étage)
  const balconyGroup = new THREE.Group();
  balconyGroup.position.set(6.6, 4.08, 3.2);

  const railingFront = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 0.06), materials.railingMetal);
  railingFront.position.set(-1.8, 0.45, 1.6);
  const railingSide = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 3.2), materials.railingMetal);
  railingSide.position.set(0.1, 0.45, 0);
  balconyGroup.add(railingFront, railingSide);

  const plantPot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.5, 10), materials.metalDark);
  plantPot.position.set(-0.6, 0.25, 0.8);
  const plantFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4), materials.foliageBush);
  plantFoliage.position.set(-0.6, 0.65, 0.8);
  balconyGroup.add(plantPot, plantFoliage);

  upperGroup.add(balconyGroup);

  // Source lumineuse de la chambre (PointLight chaude 2700K)
  const bedroomLight = new THREE.PointLight(0xfef08a, 2.8, 10, 1.4);
  bedroomLight.position.set(3.2, 6.2, -1.2);
  upperGroup.add(bedroomLight);
  interactiveNodes.lights.bedroom = bedroomLight;

  houseGroup.add(upperGroup);

  // =========================================================================
  // 4. TOITURE MODERNE & PANNEAUX SOLAIRES (Groupe rétractable intelligent)
  // =========================================================================
  const roofGroup = new THREE.Group();
  roofGroup.name = "Roof_Cutaway_Group";
  roofGroup.position.set(0, 7.35, 0);

  // Dalle de toiture principale
  const mainRoofSlab = new THREE.Mesh(
    new THREE.BoxGeometry(14.2, 0.35, 11.2),
    materials.roofExterior
  );
  mainRoofSlab.position.set(0, 0, -1.2);
  roofGroup.add(mainRoofSlab);

  // Acrotère architectural
  const parapetFront = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.25, 0.2), materials.roofTrim);
  parapetFront.position.set(0, 0.25, 4.3);
  const parapetLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 11.2), materials.roofTrim);
  parapetLeft.position.set(-7.0, 0.25, -1.2);
  roofGroup.add(parapetFront, parapetLeft);

  // Panneaux solaires photovoltaïques inclinés
  const solarGroup = new THREE.Group();
  solarGroup.position.set(-1.5, 0.25, -2.5);
  solarGroup.rotation.x = -0.15;

  const solarCadre = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 2.4), materials.solarFrame);
  const solarCells = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.09, 2.2), materials.solarCell);
  solarGroup.add(solarCadre, solarCells);
  roofGroup.add(solarGroup);

  // Antenne centrale / Hub Wi-Fi domotique
  const hubGroup = new THREE.Group();
  hubGroup.position.set(4.5, 0.25, -4.5);

  const hubBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.15, 8), materials.metalDark);
  hubBase.position.set(0, 0.08, 0);
  const hubMast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), materials.metalChrome);
  hubMast.position.set(0, 0.55, 0);
  const hubLed = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), materials.emissiveCyan);
  hubLed.position.set(0, 1.02, 0);
  hubGroup.add(hubBase, hubMast, hubLed);
  roofGroup.add(hubGroup);
  interactiveNodes.glitchHubLed = hubLed;

  // Ruban LED linéaire cyan sous la casquette de toiture
  const roofLedTrim = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.08, 0.1), materials.linearLedCyan);
  roofLedTrim.position.set(0, -0.18, 4.4);
  roofGroup.add(roofLedTrim);

  houseGroup.add(roofGroup);
  interactiveNodes.roofGroup = roofGroup;

  return {
    houseGroup,
    interactiveNodes
  };
}
