import * as THREE from 'three';
import { ArchitecturalMaterials } from '../materials';

/**
 * Builds a multi-part sculptural architectural tree (trunk, secondary branches,
 * and multi-scale foliage canopy clusters with varied roughness/scale).
 */
function createArchitecturalTree(
  materials: ArchitecturalMaterials,
  scale = 1.0,
  variant: 'olive' | 'maple' = 'olive'
): THREE.Group {
  const tree = new THREE.Group();
  tree.name = `ArchitecturalTree_${variant}`;

  // Contact shadow disc on ground
  const shadowDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.7 * scale, 24),
    materials.contactShadowMat
  );
  shadowDisc.rotation.x = -Math.PI / 2;
  shadowDisc.position.y = 0.015;
  tree.add(shadowDisc);

  // Sculpted stone tree planter ring
  const planterRing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68 * scale, 0.74 * scale, 0.22 * scale, 24),
    materials.travertineStone
  );
  planterRing.position.y = 0.11 * scale;
  planterRing.castShadow = true;
  planterRing.receiveShadow = true;
  tree.add(planterRing);

  const soilMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.58 * scale, 0.58 * scale, 0.24 * scale, 20),
    materials.soilMulch
  );
  soilMesh.position.y = 0.11 * scale;
  tree.add(soilMesh);

  // Main trunk
  const trunkGeo = new THREE.CylinderGeometry(
    0.11 * scale,
    0.18 * scale,
    1.85 * scale,
    12
  );
  const trunk = new THREE.Mesh(trunkGeo, materials.treeBark);
  trunk.position.y = 1.0 * scale;
  trunk.rotation.z = 0.04;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  tree.add(trunk);

  // 3 secondary branches
  const branchConfigs = [
    { x: -0.26, y: 1.85, z: 0.12, rz: 0.52, rx: -0.2, len: 0.95 },
    { x: 0.28, y: 1.95, z: -0.15, rz: -0.48, rx: 0.22, len: 1.05 },
    { x: 0.04, y: 2.1, z: 0.25, rz: -0.12, rx: -0.45, len: 0.88 },
  ];

  for (const b of branchConfigs) {
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.05 * scale,
        0.09 * scale,
        b.len * scale,
        8
      ),
      materials.treeBark
    );
    branch.position.set(b.x * scale, b.y * scale, b.z * scale);
    branch.rotation.set(b.rx, 0, b.rz);
    branch.castShadow = true;
    tree.add(branch);
  }

  // Multi-part layered foliage clusters
  const foliageClusters = [
    { x: 0.0, y: 2.75, z: 0.0, rx: 1.15, ry: 0.72, rz: 1.1, mat: materials.foliageOlive },
    { x: -0.62, y: 2.38, z: 0.25, rx: 0.82, ry: 0.54, rz: 0.78, mat: materials.foliageDeepGreen },
    { x: 0.68, y: 2.48, z: -0.22, rx: 0.86, ry: 0.56, rz: 0.82, mat: materials.foliageWarmGreen },
    { x: 0.15, y: 2.55, z: 0.58, rx: 0.74, ry: 0.48, rz: 0.74, mat: materials.foliageOlive },
    { x: -0.22, y: 3.12, z: -0.18, rx: 0.78, ry: 0.5, rz: 0.75, mat: materials.foliageWarmGreen },
  ];

  const sphereGeo = new THREE.IcosahedronGeometry(1.0, 2);
  for (const c of foliageClusters) {
    const canopy = new THREE.Mesh(sphereGeo, c.mat);
    canopy.position.set(c.x * scale, c.y * scale, c.z * scale);
    canopy.scale.set(c.rx * scale, c.ry * scale, c.rz * scale);
    canopy.castShadow = true;
    canopy.receiveShadow = true;
    tree.add(canopy);
  }

  return tree;
}

/**
 * Creates a modern architectural pathway bollard luminaire (3-part composite).
 */
function createPathwayBollard(materials: ArchitecturalMaterials): THREE.Group {
  const bollard = new THREE.Group();

  // Base plinth
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.11, 0.06, 16),
    materials.charcoalMatteMetal
  );
  base.position.y = 0.03;
  bollard.add(base);

  // Anodized dark aluminum housing column
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.62, 0.12),
    materials.charcoalMatteMetal
  );
  body.position.y = 0.34;
  body.castShadow = true;
  bollard.add(body);

  // Warm glowing luminaire head
  const diffuser = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.14, 0.1),
    materials.warmLightEmissive
  );
  diffuser.position.y = 0.72;
  bollard.add(diffuser);

  // Top cap
  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.03, 0.13),
    materials.charcoalMatteMetal
  );
  cap.position.y = 0.805;
  bollard.add(cap);

  return bollard;
}

export function createExteriorGarden(
  materials: ArchitecturalMaterials
): THREE.Group {
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'ExteriorGardenAndSite';

  // 1. Expansive Architectural Site Base & Surrounds (Natural perimeter instead of floating box)
  const outerGround = new THREE.Mesh(
    new THREE.CylinderGeometry(52, 54, 0.5, 64),
    materials.boardConcrete
  );
  outerGround.position.set(0, -0.62, 0);
  outerGround.receiveShadow = true;
  gardenGroup.add(outerGround);

  // Manicured Lawn Estate Plinth (-0.36 to 0)
  const estateLawn = new THREE.Mesh(
    new THREE.BoxGeometry(34.0, 0.34, 26.0),
    materials.manicuredGrass
  );
  estateLawn.position.set(0, -0.19, 1.2);
  estateLawn.receiveShadow = true;
  gardenGroup.add(estateLawn);

  // Architectural Stone Perimeter Coping Frame around Estate Lawn
  const copingFront = new THREE.Mesh(
    new THREE.BoxGeometry(34.4, 0.38, 0.35),
    materials.travertineStone
  );
  copingFront.position.set(0, -0.18, 14.2);
  copingFront.receiveShadow = true;
  gardenGroup.add(copingFront);

  const copingBack = copingFront.clone();
  copingBack.position.set(0, -0.18, -11.8);
  gardenGroup.add(copingBack);

  const copingLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.38, 26.35),
    materials.travertineStone
  );
  copingLeft.position.set(-17.05, -0.18, 1.2);
  gardenGroup.add(copingLeft);

  const copingRight = copingLeft.clone();
  copingRight.position.set(17.05, -0.18, 1.2);
  gardenGroup.add(copingRight);

  // 2. Elevated Travertine House Plinth & Front Terrace Deck
  const mainHousePlinth = new THREE.Mesh(
    new THREE.BoxGeometry(17.6, 0.36, 12.2),
    materials.travertineStone
  );
  mainHousePlinth.position.set(0, -0.18, -0.2);
  mainHousePlinth.receiveShadow = true;
  mainHousePlinth.castShadow = true;
  gardenGroup.add(mainHousePlinth);

  // Front Forecourt Slate Patio Apron (offset on Y to avoid Z-fighting)
  const frontPatio = new THREE.Mesh(
    new THREE.BoxGeometry(16.8, 0.08, 4.2),
    materials.slatePatioTile
  );
  frontPatio.position.set(0, -0.01, 7.6);
  frontPatio.receiveShadow = true;
  gardenGroup.add(frontPatio);

  // 3. Architectural Reflecting Pool & Floating Stepping Stones (Left Forecourt)
  const poolBasinFrame = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 0.18, 3.4),
    materials.travertineStone
  );
  poolBasinFrame.position.set(-4.4, 0.02, 7.6);
  poolBasinFrame.receiveShadow = true;
  gardenGroup.add(poolBasinFrame);

  const poolWater = new THREE.Mesh(
    new THREE.BoxGeometry(6.3, 0.06, 2.9),
    materials.waterSurface
  );
  poolWater.position.set(-4.4, 0.1, 7.6);
  gardenGroup.add(poolWater);

  // Floating travertine stepping stones across reflecting pool
  for (let i = 0; i < 3; i++) {
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.12, 0.82),
      materials.travertineStone
    );
    pad.position.set(-0.35, 0.11, 6.45 + i * 1.12);
    pad.castShadow = true;
    pad.receiveShadow = true;
    gardenGroup.add(pad);
  }

  // Grand Entrance Stepped Walkway leading to the street/forecourt
  for (let s = 0; s < 3; s++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.08, 1.1),
      materials.travertineStone
    );
    step.position.set(0.5, -0.02 - s * 0.03, 10.3 + s * 1.18);
    step.receiveShadow = true;
    gardenGroup.add(step);
  }

  // 4. Sculpted Boxwood Hedges & Architectural Planters
  const planterConfigs = [
    { x: -10.4, z: 4.5, w: 2.6, d: 7.4 },
    { x: 10.4, z: 4.5, w: 2.6, d: 7.4 },
    { x: 5.4, z: 10.2, w: 5.6, d: 1.5 },
    { x: -5.2, z: 10.2, w: 5.2, d: 1.5 },
  ];

  for (const p of planterConfigs) {
    const planterBox = new THREE.Mesh(
      new THREE.BoxGeometry(p.w, 0.42, p.d),
      materials.boardConcrete
    );
    planterBox.position.set(p.x, 0.21, p.z);
    planterBox.castShadow = true;
    planterBox.receiveShadow = true;
    gardenGroup.add(planterBox);

    const hedge = new THREE.Mesh(
      new THREE.BoxGeometry(p.w - 0.28, 0.48, p.d - 0.28),
      materials.foliageDeepGreen
    );
    hedge.position.set(p.x, 0.56, p.z);
    hedge.castShadow = true;
    hedge.receiveShadow = true;
    gardenGroup.add(hedge);
  }

  // 5. Rear & Side Architectural Timber Slatted Privacy Screen
  const fenceGroup = new THREE.Group();
  fenceGroup.name = 'PerimeterArchitecturalScreen';

  const rearWallBase = new THREE.Mesh(
    new THREE.BoxGeometry(26.0, 0.55, 0.35),
    materials.travertineStone
  );
  rearWallBase.position.set(0, 0.27, -8.8);
  rearWallBase.castShadow = true;
  rearWallBase.receiveShadow = true;
  fenceGroup.add(rearWallBase);

  // Horizontal bronze-tinted oak louver slats along rear garden boundary
  const slatGeo = new THREE.BoxGeometry(25.6, 0.08, 0.06);
  for (let i = 0; i < 10; i++) {
    const slat = new THREE.Mesh(slatGeo, materials.darkWalnutWood);
    slat.position.set(0, 0.72 + i * 0.14, -8.8);
    fenceGroup.add(slat);
  }
  gardenGroup.add(fenceGroup);

  // 6. Multi-Part Architectural Trees flanking the house (Framing vista without blocking cutaway)
  const leftFrontTree = createArchitecturalTree(materials, 1.25, 'olive');
  leftFrontTree.position.set(-12.2, 0, 7.2);
  gardenGroup.add(leftFrontTree);

  const leftBackTree = createArchitecturalTree(materials, 1.45, 'maple');
  leftBackTree.position.set(-12.8, 0, -4.2);
  gardenGroup.add(leftBackTree);

  const rightFrontTree = createArchitecturalTree(materials, 1.2, 'olive');
  rightFrontTree.position.set(12.2, 0, 7.4);
  gardenGroup.add(rightFrontTree);

  const rightBackTree = createArchitecturalTree(materials, 1.5, 'maple');
  rightBackTree.position.set(12.6, 0, -3.8);
  gardenGroup.add(rightBackTree);

  // 7. Pathway Bollard Luminaires along Entrance & Reflecting Pool
  const bollardCoords = [
    { x: -1.4, z: 9.8 },
    { x: 2.3, z: 9.8 },
    { x: -8.2, z: 8.8 },
    { x: 8.4, z: 8.8 },
  ];
  for (const bc of bollardCoords) {
    const bollard = createPathwayBollard(materials);
    bollard.position.set(bc.x, 0.0, bc.z);
    gardenGroup.add(bollard);
  }

  // 8. Exterior Patio Lounge Seating on Right Garden Terrace (x = 5.2, z = 7.4)
  const loungeGroup = new THREE.Group();
  loungeGroup.position.set(5.2, 0.03, 7.5);

  const outdoorRug = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.02, 2.5),
    materials.wovenRugMaterial
  );
  outdoorRug.position.y = 0.01;
  outdoorRug.receiveShadow = true;
  loungeGroup.add(outdoorRug);

  // Low teak bench day-sofa
  const teakFrame = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 0.22, 0.92),
    materials.warmOakCabinet
  );
  teakFrame.position.set(0, 0.16, -0.55);
  teakFrame.castShadow = true;
  loungeGroup.add(teakFrame);

  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.16, 0.84),
    materials.boucleCreamFabric
  );
  mattress.position.set(0, 0.34, -0.55);
  mattress.castShadow = true;
  loungeGroup.add(mattress);

  // Outdoor stone coffee drum table
  const stoneDrum = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.42, 0.36, 24),
    materials.travertineStone
  );
  stoneDrum.position.set(0, 0.18, 0.42);
  stoneDrum.castShadow = true;
  loungeGroup.add(stoneDrum);

  gardenGroup.add(loungeGroup);

  return gardenGroup;
}
