import * as THREE from 'three';
import { ArchitecturalMaterials } from '../materials';

function addContactShadow(
  parent: THREE.Group,
  radiusX: number,
  radiusZ: number,
  materials: ArchitecturalMaterials
) {
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(1.0, 24),
    materials.contactShadowMat
  );
  disc.rotation.x = -Math.PI / 2;
  disc.scale.set(radiusX, radiusZ, 1);
  disc.position.y = 0.012;
  parent.add(disc);
}

/**
 * Composite multi-part potted architectural indoor plant (ribbed ceramic planter,
 * dark soil, wooden stems, and layered organic leaves).
 */
function createIndoorPlanter(
  materials: ArchitecturalMaterials,
  scale = 1.0
): THREE.Group {
  const group = new THREE.Group();
  addContactShadow(group, 0.36 * scale, 0.36 * scale, materials);

  // Ceramic tapered pot
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24 * scale, 0.18 * scale, 0.42 * scale, 20),
    materials.exteriorPlaster
  );
  pot.position.y = 0.21 * scale;
  pot.castShadow = true;
  pot.receiveShadow = true;
  group.add(pot);

  // Brass stand ring
  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25 * scale, 0.25 * scale, 0.04 * scale, 20),
    materials.brushedBronze
  );
  stand.position.y = 0.08 * scale;
  group.add(stand);

  // Soil surface
  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22 * scale, 0.22 * scale, 0.04 * scale, 16),
    materials.soilMulch
  );
  soil.position.y = 0.41 * scale;
  group.add(soil);

  // Stems & sculptural foliage clusters
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025 * scale, 0.035 * scale, 0.65 * scale, 8),
    materials.treeBark
  );
  stem.position.y = 0.7 * scale;
  group.add(stem);

  const leafOffsets = [
    { x: 0.0, y: 1.02, z: 0.0, rx: 0.28, ry: 0.22, rz: 0.28 },
    { x: -0.16, y: 0.86, z: 0.12, rx: 0.22, ry: 0.16, rz: 0.22 },
    { x: 0.18, y: 0.9, z: -0.1, rx: 0.24, ry: 0.18, rz: 0.22 },
    { x: 0.05, y: 0.78, z: -0.16, rx: 0.2, ry: 0.15, rz: 0.2 },
  ];

  const leafGeo = new THREE.IcosahedronGeometry(1, 2);
  for (const lf of leafOffsets) {
    const leaf = new THREE.Mesh(leafGeo, materials.foliageDeepGreen);
    leaf.position.set(lf.x * scale, lf.y * scale, lf.z * scale);
    leaf.scale.set(lf.rx * scale, lf.ry * scale, lf.rz * scale);
    leaf.castShadow = true;
    group.add(leaf);
  }

  return group;
}

/**
 * Builds the complete Ground-Floor Living Salon furniture ensemble.
 */
function createLivingRoomFurniture(
  materials: ArchitecturalMaterials
): THREE.Group {
  const living = new THREE.Group();
  living.name = 'LivingRoomFurniture';
  const floorY = 0.25;
  living.position.set(-4.6, floorY, 0.0);

  // 1. Large Woven Architectural Area Rug (offset +0.015 on Y)
  const rug = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.02, 4.4),
    materials.wovenRugMaterial
  );
  rug.position.set(0.1, 0.01, 0.35);
  rug.receiveShadow = true;
  living.add(rug);

  // 2. L-Shaped Boucle Sectional Sofa (10-part composite model)
  const sofa = new THREE.Group();
  sofa.name = 'BoucleSectionalSofa';
  sofa.position.set(-0.25, 0.02, 0.65);
  addContactShadow(sofa, 2.1, 1.5, materials);

  // Oak & Bronze Recessed Plinth Base
  const mainPlinth = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.1, 1.02),
    materials.darkWalnutWood
  );
  mainPlinth.position.set(0, 0.08, 0);
  mainPlinth.castShadow = true;
  sofa.add(mainPlinth);

  const chaisePlinth = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.1, 1.35),
    materials.darkWalnutWood
  );
  chaisePlinth.position.set(-1.06, 0.08, -1.18);
  chaisePlinth.castShadow = true;
  sofa.add(chaisePlinth);

  // Plush Boucle Seat Cushions (3 segments + chaise lounge)
  for (let i = 0; i < 3; i++) {
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.98, 0.24, 0.94),
      materials.boucleCreamFabric
    );
    seat.position.set(-1.0 + i * 1.0, 0.25, -0.02);
    seat.castShadow = true;
    seat.receiveShadow = true;
    sofa.add(seat);
  }

  const chaiseCushion = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.24, 1.32),
    materials.boucleCreamFabric
  );
  chaiseCushion.position.set(-1.04, 0.25, -1.15);
  chaiseCushion.castShadow = true;
  chaiseCushion.receiveShadow = true;
  sofa.add(chaiseCushion);

  // Low-profile Architectural Backrest & Side Armrests (kept low at 0.72m so front cutaway is unobstructed)
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(3.24, 0.56, 0.24),
    materials.boucleCreamFabric
  );
  backrest.position.set(0, 0.42, 0.44);
  backrest.castShadow = true;
  backrest.receiveShadow = true;
  sofa.add(backrest);

  const rightArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.48, 1.06),
    materials.boucleCreamFabric
  );
  rightArm.position.set(1.52, 0.38, 0);
  rightArm.castShadow = true;
  sofa.add(rightArm);

  const leftArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.48, 2.38),
    materials.boucleCreamFabric
  );
  leftArm.position.set(-1.62, 0.38, -0.66);
  leftArm.castShadow = true;
  sofa.add(leftArm);

  // Accent Throw Pillows (Terracotta & Sage Linen)
  const pillow1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.34, 0.14),
    materials.terracottaAccentFabric
  );
  pillow1.position.set(-1.1, 0.52, 0.24);
  pillow1.rotation.set(-0.18, 0.12, 0);
  pillow1.castShadow = true;
  sofa.add(pillow1);

  const pillow2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.34, 0.14),
    materials.sageCushionFabric
  );
  pillow2.position.set(0.1, 0.52, 0.24);
  pillow2.rotation.set(-0.16, -0.08, 0);
  pillow2.castShadow = true;
  sofa.add(pillow2);

  const pillow3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.34, 0.14),
    materials.linenTaupeFabric
  );
  pillow3.position.set(1.12, 0.52, 0.22);
  pillow3.rotation.set(-0.2, -0.15, 0);
  pillow3.castShadow = true;
  sofa.add(pillow3);

  living.add(sofa);

  // 3. Sculptural Travertine & Warm Oak Coffee Table + Decor (6-part composite)
  const coffeeTable = new THREE.Group();
  coffeeTable.position.set(0.25, 0.02, -0.85);
  addContactShadow(coffeeTable, 0.95, 0.65, materials);

  const leg1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.34, 20),
    materials.travertineStone
  );
  leg1.position.set(-0.42, 0.17, 0);
  leg1.castShadow = true;
  coffeeTable.add(leg1);

  const leg2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.34, 20),
    materials.warmOakCabinet
  );
  leg2.position.set(0.42, 0.17, 0);
  leg2.castShadow = true;
  coffeeTable.add(leg2);

  const tableSlab = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.06, 0.92),
    materials.marbleCountertop
  );
  tableSlab.position.set(0, 0.36, 0);
  tableSlab.castShadow = true;
  tableSlab.receiveShadow = true;
  coffeeTable.add(tableSlab);

  // Architecture monograph book stack & bronze sculptural vessel on table
  const artBook = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.045, 0.28),
    materials.charcoalWoolFabric
  );
  artBook.position.set(-0.32, 0.41, 0.06);
  artBook.rotation.y = 0.15;
  coffeeTable.add(artBook);

  const ceramicVase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.11, 0.24, 16),
    materials.terracottaAccentFabric
  );
  ceramicVase.position.set(0.34, 0.51, -0.08);
  ceramicVase.castShadow = true;
  coffeeTable.add(ceramicVase);

  living.add(coffeeTable);

  // 4. Designer Lounge Accent Chair (Facing Coffee Table from Right)
  const loungeChair = new THREE.Group();
  loungeChair.position.set(1.95, 0.02, -0.65);
  loungeChair.rotation.y = -Math.PI * 0.68;
  addContactShadow(loungeChair, 0.55, 0.55, materials);

  const chairBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.12, 0.82),
    materials.darkWalnutWood
  );
  chairBase.position.y = 0.14;
  chairBase.castShadow = true;
  loungeChair.add(chairBase);

  const chairSeat = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.18, 0.76),
    materials.terracottaAccentFabric
  );
  chairSeat.position.y = 0.28;
  chairSeat.castShadow = true;
  loungeChair.add(chairSeat);

  const chairBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.46, 0.16),
    materials.terracottaAccentFabric
  );
  chairBack.position.set(0, 0.52, -0.32);
  chairBack.rotation.x = -0.14;
  chairBack.castShadow = true;
  loungeChair.add(chairBack);

  living.add(loungeChair);

  // 5. Low Walnut & Bronze Media Credenza + Framed Wall Television (against acoustic slat wall)
  const mediaGroup = new THREE.Group();
  mediaGroup.position.set(-0.9, 0.0, -4.08);

  const credenzaBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.85, 0.46, 0.54),
    materials.darkWalnutWood
  );
  credenzaBody.position.y = 0.34;
  credenzaBody.castShadow = true;
  credenzaBody.receiveShadow = true;
  mediaGroup.add(credenzaBody);

  const credenzaTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.88, 0.04, 0.56),
    materials.marbleCountertop
  );
  credenzaTop.position.y = 0.59;
  mediaGroup.add(credenzaTop);

  // Ultra-thin Framed Architectural Display Screen
  const tvFrame = new THREE.Mesh(
    new THREE.BoxGeometry(2.15, 1.22, 0.05),
    materials.charcoalMatteMetal
  );
  tvFrame.position.set(0, 1.68, -0.24);
  tvFrame.castShadow = true;
  mediaGroup.add(tvFrame);

  const tvPanel = new THREE.Mesh(
    new THREE.BoxGeometry(2.06, 1.14, 0.02),
    materials.artCanvasWarm
  );
  tvPanel.position.set(0, 1.68, -0.21);
  mediaGroup.add(tvPanel);

  living.add(mediaGroup);

  // 6. Sculptural Brass Floor Lamp beside Sofa
  const floorLamp = new THREE.Group();
  floorLamp.position.set(-2.35, 0.0, -1.95);

  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.24, 0.06, 20),
    materials.travertineStone
  );
  lampBase.position.y = 0.03;
  floorLamp.add(lampBase);

  const lampStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 2.05, 12),
    materials.brushedBronze
  );
  lampStem.position.y = 1.05;
  floorLamp.add(lampStem);

  const lampGlobe = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 20, 16),
    materials.warmLightEmissive
  );
  lampGlobe.position.set(0.12, 2.05, 0.1);
  floorLamp.add(lampGlobe);

  living.add(floorLamp);

  // 7. Indoor Potted Fiddle-Leaf Fig in Left Window Corner
  const indoorPlant = createIndoorPlanter(materials, 1.25);
  indoorPlant.position.set(-2.55, 0.0, 2.85);
  living.add(indoorPlant);

  return living;
}

/**
 * Builds the Modern Kitchen & Dining Area furniture ensemble (Ground Right).
 */
function createKitchenAndDiningFurniture(
  materials: ArchitecturalMaterials
): THREE.Group {
  const kitchen = new THREE.Group();
  kitchen.name = 'KitchenAndDiningFurniture';
  const floorY = 0.25;
  kitchen.position.set(4.85, floorY, 0.0);

  // 1. Rear Full-Height Architectural Kitchen Cabinetry Wall (z = -4.15)
  const backWallUnit = new THREE.Group();
  backWallUnit.position.set(0.0, 0, -4.15);

  // Tall left refrigerator & oven tower
  const tallTowerLeft = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 2.85, 0.68),
    materials.charcoalMatteMetal
  );
  tallTowerLeft.position.set(-2.05, 1.425, 0);
  tallTowerLeft.castShadow = true;
  tallTowerLeft.receiveShadow = true;
  backWallUnit.add(tallTowerLeft);

  // Built-in stainless & glass dual ovens
  const ovenFace = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.62, 0.03),
    materials.tvScreenMaterial
  );
  ovenFace.position.set(-1.75, 1.38, 0.345);
  backWallUnit.add(ovenFace);

  const ovenHandle = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.025, 0.04),
    materials.brushedBronze
  );
  ovenHandle.position.set(-1.75, 1.62, 0.37);
  backWallUnit.add(ovenHandle);

  // Lower base cabinets along rear wall
  const baseCabinets = new THREE.Mesh(
    new THREE.BoxGeometry(3.85, 0.92, 0.65),
    materials.warmOakCabinet
  );
  baseCabinets.position.set(0.55, 0.46, 0);
  baseCabinets.castShadow = true;
  baseCabinets.receiveShadow = true;
  backWallUnit.add(baseCabinets);

  // Honed Marble Countertop & Travertine Backsplash Slab
  const rearCountertop = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.05, 0.68),
    materials.marbleCountertop
  );
  rearCountertop.position.set(0.55, 0.945, 0);
  backWallUnit.add(rearCountertop);

  const backsplash = new THREE.Mesh(
    new THREE.BoxGeometry(3.85, 0.88, 0.04),
    materials.travertineStone
  );
  backsplash.position.set(0.55, 1.4, -0.3);
  backWallUnit.add(backsplash);

  // Under-cabinet warm LED task light bar
  const taskLight = new THREE.Mesh(
    new THREE.BoxGeometry(3.7, 0.025, 0.05),
    materials.warmLightEmissive
  );
  taskLight.position.set(0.55, 1.84, -0.1);
  backWallUnit.add(taskLight);

  // Upper minimalist wall cabinets
  const upperCabinets = new THREE.Mesh(
    new THREE.BoxGeometry(3.88, 0.96, 0.42),
    materials.charcoalMatteMetal
  );
  upperCabinets.position.set(0.55, 2.35, -0.12);
  upperCabinets.castShadow = true;
  backWallUnit.add(upperCabinets);

  // Brushed bronze gooseneck faucet & undermount sink basin
  const faucetStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.022, 0.34, 12),
    materials.brushedBronze
  );
  faucetStem.position.set(0.45, 1.12, -0.14);
  backWallUnit.add(faucetStem);

  kitchen.add(backWallUnit);

  // 2. Sculptural Waterfall Travertine & Fluted Oak Kitchen Island (z = -1.75)
  const islandGroup = new THREE.Group();
  islandGroup.position.set(0.0, 0, -1.75);
  addContactShadow(islandGroup, 1.85, 0.78, materials);

  const islandCore = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.92, 1.05),
    materials.warmOakCabinet
  );
  islandCore.position.y = 0.46;
  islandCore.castShadow = true;
  islandCore.receiveShadow = true;
  islandGroup.add(islandCore);

  // Waterfall Marble Top + Left/Right Drop Panels
  const islandTop = new THREE.Mesh(
    new THREE.BoxGeometry(3.24, 0.06, 1.16),
    materials.marbleCountertop
  );
  islandTop.position.y = 0.95;
  islandTop.castShadow = true;
  islandTop.receiveShadow = true;
  islandGroup.add(islandTop);

  const waterfallLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.96, 1.16),
    materials.marbleCountertop
  );
  waterfallLeft.position.set(-1.59, 0.48, 0);
  waterfallLeft.castShadow = true;
  islandGroup.add(waterfallLeft);

  const waterfallRight = waterfallLeft.clone();
  waterfallRight.position.set(1.59, 0.48, 0);
  islandGroup.add(waterfallRight);

  // Warm recessed toe-kick LED strip under island front
  const islandLed = new THREE.Mesh(
    new THREE.BoxGeometry(2.95, 0.03, 0.04),
    materials.warmLightEmissive
  );
  islandLed.position.set(0, 0.05, 0.52);
  islandGroup.add(islandLed);

  // 3 Sculptural Barstools along front of Kitchen Island
  for (let i = -1; i <= 1; i++) {
    const stool = new THREE.Group();
    stool.position.set(i * 0.92, 0, 0.78);

    const stoolSeat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.21, 0.07, 20),
      materials.linenTaupeFabric
    );
    stoolSeat.position.y = 0.68;
    stoolSeat.castShadow = true;
    stool.add(stoolSeat);

    const stoolBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.16, 0.06),
      materials.darkWalnutWood
    );
    stoolBack.position.set(0, 0.8, 0.17);
    stoolBack.castShadow = true;
    stool.add(stoolBack);

    const stoolColumn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.66, 12),
      materials.charcoalMatteMetal
    );
    stoolColumn.position.y = 0.33;
    stool.add(stoolColumn);

    const stoolBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.24, 0.03, 20),
      materials.charcoalMatteMetal
    );
    stoolBase.position.y = 0.015;
    stool.add(stoolBase);

    islandGroup.add(stool);
  }

  kitchen.add(islandGroup);

  // 3. Architectural Solid Oak Dining Table & 6 Designer Chairs (z = +1.75)
  const diningGroup = new THREE.Group();
  diningGroup.position.set(0.05, 0, 1.75);
  addContactShadow(diningGroup, 1.7, 1.15, materials);

  // Solid Oak Tabletop with chamfered apron
  const diningTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.55, 0.065, 1.12),
    materials.warmOakCabinet
  );
  diningTop.position.y = 0.76;
  diningTop.castShadow = true;
  diningTop.receiveShadow = true;
  diningGroup.add(diningTop);

  // Sculptural twin V-leg architectural trestle supports
  for (const lx of [-0.82, 0.82]) {
    const trestle = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.73, 0.74),
      materials.charcoalMatteMetal
    );
    trestle.position.set(lx, 0.365, 0);
    trestle.castShadow = true;
    diningGroup.add(trestle);
  }

  // Centerpiece ceramic bowl on dining table
  const centerpiece = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.14, 0.1, 20),
    materials.travertineStone
  );
  centerpiece.position.set(0, 0.84, 0);
  centerpiece.castShadow = true;
  diningGroup.add(centerpiece);

  // 6 Upholstered Dining Chairs (3 back, 3 front)
  const chairXOffsets = [-0.8, 0.0, 0.8];
  for (const cx of chairXOffsets) {
    for (const side of [-1, 1]) {
      const dChair = new THREE.Group();
      dChair.position.set(cx, 0, side * 0.72);
      dChair.rotation.y = side === 1 ? Math.PI : 0;

      const cSeat = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.06, 0.46),
        materials.boucleCreamFabric
      );
      cSeat.position.y = 0.46;
      cSeat.castShadow = true;
      dChair.add(cSeat);

      const cBack = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.36, 0.06),
        materials.darkWalnutWood
      );
      cBack.position.set(0, 0.67, -0.21);
      cBack.castShadow = true;
      dChair.add(cBack);

      for (const legX of [-0.2, 0.2]) {
        for (const legZ of [-0.19, 0.19]) {
          const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.018, 0.014, 0.45, 8),
            materials.charcoalMatteMetal
          );
          leg.position.set(legX, 0.225, legZ);
          dChair.add(leg);
        }
      }

      diningGroup.add(dChair);
    }
  }

  // Suspended Linear Brass & Warm Alabaster Chandelier above Dining Table
  const chandelier = new THREE.Group();
  chandelier.position.set(0, 2.38, 0);

  const lightBar = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.045, 0.065),
    materials.brushedBronze
  );
  chandelier.add(lightBar);

  const glowTube = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.035, 0.05),
    materials.warmLightEmissive
  );
  glowTube.position.y = -0.035;
  chandelier.add(glowTube);

  for (const rx of [-0.75, 0.75]) {
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.95, 8),
      materials.brushedBronze
    );
    rod.position.set(rx, 0.48, 0);
    chandelier.add(rod);
  }

  diningGroup.add(chandelier);
  kitchen.add(diningGroup);

  return kitchen;
}

/**
 * Builds the Upper-Floor Master Bedroom Suite, Upper Gallery Hallway,
 * and Upper Roof Terrace furniture ensemble.
 */
function createUpperFloorFurniture(
  materials: ArchitecturalMaterials
): THREE.Group {
  const upper = new THREE.Group();
  upper.name = 'UpperFloorFurniture';
  const floorY = 3.89;
  upper.position.set(0, floorY, 0);

  // ============================================================================
  // A. MASTER BEDROOM SUITE (x = -4.65, z = 0)
  // ============================================================================
  const bedroom = new THREE.Group();
  bedroom.position.set(-4.65, 0, 0);

  // 1. Plush Woven Wool Bedroom Rug
  const bedRug = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.02, 4.2),
    materials.bedroomRugMaterial
  );
  bedRug.position.set(0.0, 0.01, -0.85);
  bedRug.receiveShadow = true;
  bedroom.add(bedRug);

  // 2. Architectural Platform King Bed (10-part composite model anchored to headboard wall)
  const bedGroup = new THREE.Group();
  bedGroup.position.set(0.05, 0.02, -2.55);
  addContactShadow(bedGroup, 1.65, 1.8, materials);

  // Extended Walnut Floating Platform Frame
  const bedFrame = new THREE.Mesh(
    new THREE.BoxGeometry(2.45, 0.24, 2.38),
    materials.darkWalnutWood
  );
  bedFrame.position.set(0, 0.14, 0);
  bedFrame.castShadow = true;
  bedFrame.receiveShadow = true;
  bedGroup.add(bedFrame);

  // Upholstered Boucle Channel Headboard
  const headboardCushion = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 1.18, 0.16),
    materials.linenTaupeFabric
  );
  headboardCushion.position.set(0, 0.68, -1.22);
  headboardCushion.castShadow = true;
  bedGroup.add(headboardCushion);

  // Mattress
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(2.12, 0.26, 2.15),
    materials.boucleCreamFabric
  );
  mattress.position.set(0, 0.36, -0.02);
  mattress.castShadow = true;
  mattress.receiveShadow = true;
  bedGroup.add(mattress);

  // Layered Linen Duvet & Terracotta Throw Blanket at Foot of Bed
  const duvet = new THREE.Mesh(
    new THREE.BoxGeometry(2.18, 0.22, 1.55),
    materials.linenTaupeFabric
  );
  duvet.position.set(0, 0.41, 0.3);
  duvet.castShadow = true;
  duvet.receiveShadow = true;
  bedGroup.add(duvet);

  const footThrow = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.24, 0.52),
    materials.terracottaAccentFabric
  );
  footThrow.position.set(0, 0.42, 0.84);
  footThrow.castShadow = true;
  bedGroup.add(footThrow);

  // 4 Sleeping & Accent Pillows
  for (const px of [-0.52, 0.52]) {
    const backPillow = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.24, 0.36),
      materials.boucleCreamFabric
    );
    backPillow.position.set(px, 0.56, -0.82);
    backPillow.rotation.x = 0.26;
    backPillow.castShadow = true;
    bedGroup.add(backPillow);

    const frontPillow = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.2, 0.28),
      materials.sageCushionFabric
    );
    frontPillow.position.set(px, 0.54, -0.54);
    frontPillow.rotation.x = 0.2;
    frontPillow.castShadow = true;
    bedGroup.add(frontPillow);
  }

  // Upholstered End-of-Bed Bench
  const endBench = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.38, 0.48),
    materials.charcoalWoolFabric
  );
  endBench.position.set(0, 0.21, 1.48);
  endBench.castShadow = true;
  bedGroup.add(endBench);

  // Twin Floating Oak Nightstands + Warm Alabaster Globe Lamps
  for (const nx of [-1.62, 1.62]) {
    const nightstand = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.22, 0.48),
      materials.warmOakCabinet
    );
    nightstand.position.set(nx, 0.38, -0.92);
    nightstand.castShadow = true;
    bedGroup.add(nightstand);

    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.09, 0.08, 16),
      materials.brushedBronze
    );
    lampBase.position.set(nx, 0.53, -0.92);
    bedGroup.add(lampBase);

    const lampOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16),
      materials.warmLightEmissive
    );
    lampOrb.position.set(nx, 0.66, -0.92);
    bedGroup.add(lampOrb);
  }

  bedroom.add(bedGroup);

  // 3. Built-In Walnut & Bronze Wardrobe along Right Partition Wall (x = +2.95)
  const wardrobe = new THREE.Group();
  wardrobe.position.set(2.95, 0, 2.15);

  const wardrobeBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 2.75, 3.1),
    materials.darkWalnutWood
  );
  wardrobeBody.position.y = 1.375;
  wardrobeBody.castShadow = true;
  wardrobeBody.receiveShadow = true;
  wardrobe.add(wardrobeBody);

  // Vertical bronze door pulls
  for (const wz of [-0.95, -0.15, 0.65]) {
    const pull = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 1.15, 0.03),
      materials.brushedBronze
    );
    pull.position.set(-0.355, 1.35, wz);
    wardrobe.add(pull);
  }

  bedroom.add(wardrobe);

  // 4. Bedroom Reading Lounge Corner (Left Window Side: x = -2.15, z = +1.85)
  const readingNook = new THREE.Group();
  readingNook.position.set(-2.15, 0.02, 1.85);
  readingNook.rotation.y = Math.PI * 0.3;

  const chairShell = new THREE.Mesh(
    new THREE.BoxGeometry(0.84, 0.68, 0.82),
    materials.boucleCreamFabric
  );
  chairShell.position.y = 0.38;
  chairShell.castShadow = true;
  readingNook.add(chairShell);

  const ottoman = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.32, 20),
    materials.terracottaAccentFabric
  );
  ottoman.position.set(0, 0.16, 0.78);
  ottoman.castShadow = true;
  readingNook.add(ottoman);

  bedroom.add(readingNook);

  // Framed Abstract Artwork on Bedroom Rear Wall
  const bedroomArt = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 1.75, 0.04),
    materials.artCanvasAbstract
  );
  bedroomArt.position.set(-2.75, 1.72, -4.46);
  bedroom.add(bedroomArt);

  upper.add(bedroom);

  // ============================================================================
  // B. UPPER GALLERY HALLWAY & FOYER CONSOLE (x = +2.65)
  // ============================================================================
  const galleryGroup = new THREE.Group();
  galleryGroup.position.set(2.65, 0, 1.5);

  // Sculptural Console Table in Upper Gallery
  const consoleTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.06, 0.44),
    materials.travertineStone
  );
  consoleTop.position.set(0, 0.78, -2.4);
  consoleTop.castShadow = true;
  galleryGroup.add(consoleTop);

  for (const cx of [-0.55, 0.55]) {
    const cLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.76, 0.36),
      materials.darkWalnutWood
    );
    cLeg.position.set(cx, 0.38, -2.4);
    cLeg.castShadow = true;
    galleryGroup.add(cLeg);
  }

  // Gallery Artwork above Console
  const galleryPainting = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.55, 0.05),
    materials.artCanvasWarm
  );
  galleryPainting.position.set(-0.2, 1.78, -5.98);
  galleryGroup.add(galleryPainting);

  const galleryPlanter = createIndoorPlanter(materials, 1.05);
  galleryPlanter.position.set(0.85, 0, 1.9);
  galleryGroup.add(galleryPlanter);

  upper.add(galleryGroup);

  // ============================================================================
  // C. UPPER ROOF TERRACE LOUNGE (x = +6.05)
  // ============================================================================
  const terraceLounge = new THREE.Group();
  terraceLounge.position.set(6.05, 0.02, 0.2);

  // Twin Outdoor Lounge Chairs + Travertine Side Table
  for (const tz of [-1.45, 0.85]) {
    const deckChair = new THREE.Group();
    deckChair.position.set(0.15, 0, tz);
    deckChair.rotation.y = tz < 0 ? 0.25 : -0.25;

    const teakBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 0.16, 1.35),
      materials.warmOakCabinet
    );
    teakBase.position.y = 0.16;
    teakBase.castShadow = true;
    deckChair.add(teakBase);

    const cushion = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 0.12, 1.28),
      materials.boucleCreamFabric
    );
    cushion.position.y = 0.29;
    cushion.castShadow = true;
    deckChair.add(cushion);

    terraceLounge.add(deckChair);
  }

  const terracePlant = createIndoorPlanter(materials, 1.2);
  terracePlant.position.set(0.95, 0, -3.2);
  terraceLounge.add(terracePlant);

  upper.add(terraceLounge);

  return upper;
}

export function createFurnitureAndDecor(
  materials: ArchitecturalMaterials
): THREE.Group {
  const root = new THREE.Group();
  root.name = 'AllFurnitureAndDecor';

  root.add(createLivingRoomFurniture(materials));
  root.add(createKitchenAndDiningFurniture(materials));
  root.add(createUpperFloorFurniture(materials));

  return root;
}
