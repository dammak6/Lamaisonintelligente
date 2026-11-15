import * as THREE from 'three';
import { ArchitecturalMaterials } from '../materials';

/**
 * Helper to build a framed modern architectural window with dark anodized mullions,
 * transoms, and realistic transmissive glass pane.
 */
function createMullionedWindow(
  width: number,
  height: number,
  mullionCount: number,
  materials: ArchitecturalMaterials
): THREE.Group {
  const winGroup = new THREE.Group();
  const frameDepth = 0.18;
  const border = 0.07;

  // Top & Bottom frame rails
  const topRail = new THREE.Mesh(
    new THREE.BoxGeometry(width, border, frameDepth),
    materials.charcoalMatteMetal
  );
  topRail.position.y = height / 2 - border / 2;
  winGroup.add(topRail);

  const bottomRail = new THREE.Mesh(
    new THREE.BoxGeometry(width, border, frameDepth),
    materials.charcoalMatteMetal
  );
  bottomRail.position.y = -height / 2 + border / 2;
  winGroup.add(bottomRail);

  // Left & Right jambs
  const leftJamb = new THREE.Mesh(
    new THREE.BoxGeometry(border, height, frameDepth),
    materials.charcoalMatteMetal
  );
  leftJamb.position.x = -width / 2 + border / 2;
  winGroup.add(leftJamb);

  const rightJamb = new THREE.Mesh(
    new THREE.BoxGeometry(border, height, frameDepth),
    materials.charcoalMatteMetal
  );
  rightJamb.position.x = width / 2 - border / 2;
  winGroup.add(rightJamb);

  // Vertical mullions
  for (let i = 1; i <= mullionCount; i++) {
    const x = -width / 2 + (width * i) / (mullionCount + 1);
    const mullion = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, height - border * 2, frameDepth * 0.85),
      materials.charcoalMatteMetal
    );
    mullion.position.x = x;
    winGroup.add(mullion);
  }

  // Horizontal transom at upper third
  const transom = new THREE.Mesh(
    new THREE.BoxGeometry(width - border * 2, 0.04, frameDepth * 0.8),
    materials.charcoalMatteMetal
  );
  transom.position.y = height * 0.22;
  winGroup.add(transom);

  // Transmissive glass sheet
  const glassPane = new THREE.Mesh(
    new THREE.BoxGeometry(width - border * 2, height - border * 2, 0.025),
    materials.architecturalGlass
  );
  glassPane.renderOrder = 4;
  winGroup.add(glassPane);

  return winGroup;
}

/**
 * Helper to build a framed modern interior/exterior architectural door
 * with jambs, oak leaf panel, and brushed bronze lever handle.
 */
function createModernFramedDoor(
  width: number,
  height: number,
  materials: ArchitecturalMaterials,
  openAngle = 0.28
): THREE.Group {
  const doorGroup = new THREE.Group();
  const frameDepth = 0.24;
  const jambThick = 0.07;

  // Frame Header & Side Jambs
  const header = new THREE.Mesh(
    new THREE.BoxGeometry(width + jambThick * 2, jambThick, frameDepth),
    materials.charcoalMatteMetal
  );
  header.position.y = height + jambThick / 2;
  doorGroup.add(header);

  const leftJamb = new THREE.Mesh(
    new THREE.BoxGeometry(jambThick, height, frameDepth),
    materials.charcoalMatteMetal
  );
  leftJamb.position.set(-width / 2 - jambThick / 2, height / 2, 0);
  doorGroup.add(leftJamb);

  const rightJamb = new THREE.Mesh(
    new THREE.BoxGeometry(jambThick, height, frameDepth),
    materials.charcoalMatteMetal
  );
  rightJamb.position.set(width / 2 + jambThick / 2, height / 2, 0);
  doorGroup.add(rightJamb);

  // Hinged pivot group for door leaf
  const pivot = new THREE.Group();
  pivot.position.set(-width / 2, 0, 0);
  pivot.rotation.y = openAngle;

  const doorLeaf = new THREE.Mesh(
    new THREE.BoxGeometry(width, height - 0.02, 0.055),
    materials.darkWalnutWood
  );
  doorLeaf.position.set(width / 2, height / 2, 0);
  doorLeaf.castShadow = true;
  doorLeaf.receiveShadow = true;
  pivot.add(doorLeaf);

  // Vertical bronze inlay reveal + modern handle
  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.42, 0.09),
    materials.brushedBronze
  );
  handle.position.set(width - 0.14, height * 0.48, 0);
  pivot.add(handle);

  doorGroup.add(pivot);
  return doorGroup;
}

export function createHouseArchitecture(
  materials: ArchitecturalMaterials
): THREE.Group {
  const house = new THREE.Group();
  house.name = 'HouseArchitecture';

  // ============================================================================
  // 1. GROUND FLOOR SLAB & ROOM FLOORING (y = 0.0 to y = 0.20)
  // ============================================================================
  const groundSlab = new THREE.Mesh(
    new THREE.BoxGeometry(16.0, 0.22, 9.6),
    materials.boardConcrete
  );
  groundSlab.position.set(0, 0.11, 0);
  groundSlab.receiveShadow = true;
  groundSlab.castShadow = true;
  house.add(groundSlab);

  // Living Room + Foyer Warm Oak Flooring (x = -7.8 to +1.8, y offset +0.02)
  const livingOakFloor = new THREE.Mesh(
    new THREE.BoxGeometry(9.5, 0.03, 9.2),
    materials.warmOakFloor
  );
  livingOakFloor.position.set(-3.0, 0.235, 0);
  livingOakFloor.receiveShadow = true;
  house.add(livingOakFloor);

  // Kitchen & Dining Honed Travertine Flooring (x = +1.82 to +7.8, y offset +0.02)
  const kitchenStoneFloor = new THREE.Mesh(
    new THREE.BoxGeometry(5.95, 0.03, 9.2),
    materials.travertineStone
  );
  kitchenStoneFloor.position.set(4.8, 0.235, 0);
  kitchenStoneFloor.receiveShadow = true;
  house.add(kitchenStoneFloor);

  // ============================================================================
  // 2. GROUND FLOOR PERIMETER & INTERIOR WALLS (y = 0.22 to y = 3.62)
  // ============================================================================
  const gfHeight = 3.4;
  const gfCenterY = 0.22 + gfHeight / 2;

  // Rear Left Wall (Living Room Back Wall: x = -7.8 to -1.6)
  const rearWallLiving = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, gfHeight, 0.28),
    materials.exteriorPlaster
  );
  rearWallLiving.position.set(-4.7, gfCenterY, -4.66);
  rearWallLiving.castShadow = true;
  rearWallLiving.receiveShadow = true;
  house.add(rearWallLiving);

  // Acoustic Vertical Oak Slat Feature Panel on Living Room Back Wall
  const slatBacking = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, gfHeight - 0.1, 0.04),
    materials.charcoalMatteMetal
  );
  slatBacking.position.set(-5.6, gfCenterY, -4.49);
  house.add(slatBacking);

  const slatGeo = new THREE.BoxGeometry(0.055, gfHeight - 0.12, 0.05);
  for (let i = 0; i < 28; i++) {
    const slat = new THREE.Mesh(slatGeo, materials.warmOakCabinet);
    slat.position.set(-7.2 + i * 0.118, gfCenterY, -4.46);
    slat.castShadow = true;
    house.add(slat);
  }

  // Travertine Fireplace Feature Column in Living Room (x = -2.7, z = -4.25)
  const fireplaceChimney = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, gfHeight, 0.65),
    materials.travertineStone
  );
  fireplaceChimney.position.set(-2.7, gfCenterY, -4.25);
  fireplaceChimney.castShadow = true;
  fireplaceChimney.receiveShadow = true;
  house.add(fireplaceChimney);

  // Recessed hearth box & warm glowing ember strip
  const firebox = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.48, 0.28),
    materials.charcoalMatteMetal
  );
  firebox.position.set(-2.7, 0.82, -3.98);
  house.add(firebox);

  const flameGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.12, 0.12),
    materials.warmLightEmissive
  );
  flameGlow.position.set(-2.7, 0.68, -3.95);
  house.add(flameGlow);

  // Center Foyer Rear Curtain Window + Framed Modern Pivot Entrance Door (x = -1.6 to +2.2)
  const foyerWindow = createMullionedWindow(1.9, gfHeight - 0.2, 1, materials);
  foyerWindow.position.set(-0.6, gfCenterY, -4.66);
  house.add(foyerWindow);

  const mainEntranceDoor = createModernFramedDoor(1.15, 2.65, materials, 0.35);
  mainEntranceDoor.position.set(1.15, 0.22, -4.66);
  house.add(mainEntranceDoor);

  // Transom panel above main entrance door
  const entranceTransom = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.72, 0.28),
    materials.exteriorPlaster
  );
  entranceTransom.position.set(1.15, 3.26, -4.66);
  house.add(entranceTransom);

  // Rear Right Wall (Kitchen & Dining Back Wall: x = +1.85 to +7.8)
  const rearWallKitchen = new THREE.Mesh(
    new THREE.BoxGeometry(5.95, gfHeight, 0.28),
    materials.exteriorPlaster
  );
  rearWallKitchen.position.set(4.82, gfCenterY, -4.66);
  rearWallKitchen.castShadow = true;
  rearWallKitchen.receiveShadow = true;
  house.add(rearWallKitchen);

  // Left Exterior Wall (Living Room Side Wall with Panoramic Mullioned Window: x = -7.8)
  const leftWallRearPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, gfHeight, 2.2),
    materials.travertineStone
  );
  leftWallRearPier.position.set(-7.86, gfCenterY, -3.7);
  leftWallRearPier.castShadow = true;
  leftWallRearPier.receiveShadow = true;
  house.add(leftWallRearPier);

  const leftWallFrontPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, gfHeight, 1.8),
    materials.travertineStone
  );
  leftWallFrontPier.position.set(-7.86, gfCenterY, 3.9);
  leftWallFrontPier.castShadow = true;
  leftWallFrontPier.receiveShadow = true;
  house.add(leftWallFrontPier);

  const leftLivingWindow = createMullionedWindow(5.6, gfHeight - 0.3, 2, materials);
  leftLivingWindow.rotation.y = Math.PI / 2;
  leftLivingWindow.position.set(-7.86, gfCenterY, 0.2);
  house.add(leftLivingWindow);

  // Right Exterior Wall (Kitchen/Dining Side Wall with Panoramic Window: x = +7.8)
  const rightWallRearPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, gfHeight, 3.2),
    materials.exteriorPlaster
  );
  rightWallRearPier.position.set(7.86, gfCenterY, -3.2);
  rightWallRearPier.castShadow = true;
  rightWallRearPier.receiveShadow = true;
  house.add(rightWallRearPier);

  const rightWallFrontPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, gfHeight, 1.6),
    materials.exteriorPlaster
  );
  rightWallFrontPier.position.set(7.86, gfCenterY, 4.0);
  rightWallFrontPier.castShadow = true;
  rightWallFrontPier.receiveShadow = true;
  house.add(rightWallFrontPier);

  const rightDiningWindow = createMullionedWindow(4.8, gfHeight - 0.3, 2, materials);
  rightDiningWindow.rotation.y = Math.PI / 2;
  rightDiningWindow.position.set(7.86, gfCenterY, 0.8);
  house.add(rightDiningWindow);

  // Interior Partition Columns & Partial Divider Wall (Separating Foyer/Stairs and Kitchen)
  const partitionWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, gfHeight, 3.6),
    materials.interiorWallMatte
  );
  partitionWall.position.set(1.9, gfCenterY, -2.7);
  partitionWall.castShadow = true;
  partitionWall.receiveShadow = true;
  house.add(partitionWall);

  // Architectural Steel & Oak Cutaway Frame Columns at Front Plane (z = +4.65)
  const columnXPositions = [-7.86, -1.35, 2.05, 7.86];
  for (const cx of columnXPositions) {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, gfHeight, 0.24),
      materials.charcoalMatteMetal
    );
    col.position.set(cx, gfCenterY, 4.65);
    col.castShadow = true;
    col.receiveShadow = true;
    house.add(col);
  }

  // ============================================================================
  // 3. FLOATING ARCHITECTURAL STAIRCASE (Connecting Foyer x = -1.0..+1.5 to Upper Hall)
  // ============================================================================
  const stairGroup = new THREE.Group();
  stairGroup.name = 'ArchitecturalStaircase';

  const numSteps = 14;
  const stairStartX = -1.1;
  const stairEndX = 1.45;
  const stairStartY = 0.38;
  const stairEndY = 3.72;
  const stairZ = -2.35;

  // Dual diagonal dark steel stringer beams
  const stringerLength = Math.hypot(
    stairEndX - stairStartX + 0.4,
    stairEndY - stairStartY
  );
  const stringerAngle = Math.atan2(
    stairEndY - stairStartY,
    stairEndX - stairStartX
  );

  for (const zOffset of [-0.32, 0.32]) {
    const stringer = new THREE.Mesh(
      new THREE.BoxGeometry(stringerLength, 0.14, 0.06),
      materials.charcoalMatteMetal
    );
    stringer.position.set(
      (stairStartX + stairEndX) / 2,
      (stairStartY + stairEndY) / 2 - 0.08,
      stairZ + zOffset
    );
    stringer.rotation.z = stringerAngle;
    stringer.castShadow = true;
    stairGroup.add(stringer);
  }

  // Thick solid oak floating treads
  const treadGeo = new THREE.BoxGeometry(0.32, 0.065, 1.12);
  for (let i = 0; i < numSteps; i++) {
    const t = i / (numSteps - 1);
    const tx = THREE.MathUtils.lerp(stairStartX, stairEndX, t);
    const ty = THREE.MathUtils.lerp(stairStartY, stairEndY, t);
    const tread = new THREE.Mesh(treadGeo, materials.warmOakCabinet);
    tread.position.set(tx, ty, stairZ);
    tread.castShadow = true;
    tread.receiveShadow = true;
    stairGroup.add(tread);
  }

  // Tempered glass stair balustrade + brushed bronze handrail
  const stairGlassRail = new THREE.Mesh(
    new THREE.BoxGeometry(stringerLength, 0.92, 0.025),
    materials.balustradeGlass
  );
  stairGlassRail.position.set(
    (stairStartX + stairEndX) / 2,
    (stairStartY + stairEndY) / 2 + 0.52,
    stairZ + 0.55
  );
  stairGlassRail.rotation.z = stringerAngle;
  stairGlassRail.renderOrder = 5;
  stairGroup.add(stairGlassRail);

  const stairBronzeHandrail = new THREE.Mesh(
    new THREE.BoxGeometry(stringerLength + 0.1, 0.04, 0.05),
    materials.brushedBronze
  );
  stairBronzeHandrail.position.set(
    (stairStartX + stairEndX) / 2,
    (stairStartY + stairEndY) / 2 + 0.99,
    stairZ + 0.55
  );
  stairBronzeHandrail.rotation.z = stringerAngle;
  stairGroup.add(stairBronzeHandrail);

  house.add(stairGroup);

  // ============================================================================
  // 4. UPPER FLOOR SLAB, MEZZANINE VOID & CANTILEVERED PAVILION (y = 3.62 to 7.05)
  // ============================================================================
  // Main Upper Floor Slab (with stairwell cutout over x = -1.2 to +1.35, z = -3.0 to -1.6)
  // Left & Center Bedroom + Hallway Slab (x = -8.35 cantilevered to +4.2)
  const upperSlabMain = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 0.24, 9.8),
    materials.boardConcrete
  );
  upperSlabMain.position.set(-4.75, 3.74, 0.0);
  upperSlabMain.castShadow = true;
  upperSlabMain.receiveShadow = true;
  house.add(upperSlabMain);

  // Upper Hallway Bridge Slab in front of and behind the stairwell
  const upperHallFrontSlab = new THREE.Mesh(
    new THREE.BoxGeometry(5.35, 0.24, 6.3),
    materials.boardConcrete
  );
  upperHallFrontSlab.position.set(1.52, 3.74, 1.75);
  upperHallFrontSlab.castShadow = true;
  upperHallFrontSlab.receiveShadow = true;
  house.add(upperHallFrontSlab);

  const upperHallLandingSlab = new THREE.Mesh(
    new THREE.BoxGeometry(2.85, 0.24, 3.5),
    materials.boardConcrete
  );
  upperHallLandingSlab.position.set(2.77, 3.74, -3.15);
  upperHallLandingSlab.castShadow = true;
  upperHallLandingSlab.receiveShadow = true;
  house.add(upperHallLandingSlab);

  // Right Upper Roof Terrace Slab (over Kitchen/Dining: x = +4.2 to +8.0)
  const upperTerraceSlab = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.24, 9.8),
    materials.boardConcrete
  );
  upperTerraceSlab.position.set(6.1, 3.74, 0.0);
  upperTerraceSlab.castShadow = true;
  upperTerraceSlab.receiveShadow = true;
  house.add(upperTerraceSlab);

  // Upper Floor Warm Oak Flooring (Master Bedroom + Upper Hallway, offset +0.025 on Y)
  const bedroomOakFloor = new THREE.Mesh(
    new THREE.BoxGeometry(6.9, 0.03, 9.2),
    materials.warmOakFloor
  );
  bedroomOakFloor.position.set(-4.7, 3.875, 0.0);
  bedroomOakFloor.receiveShadow = true;
  house.add(bedroomOakFloor);

  const hallwayOakFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.03, 5.9),
    materials.warmOakFloor
  );
  hallwayOakFloor.position.set(2.7, 3.875, 1.65);
  hallwayOakFloor.receiveShadow = true;
  house.add(hallwayOakFloor);

  // Upper Terrace Slate Decking (x = +4.3 to +7.75)
  const terraceDeckFloor = new THREE.Mesh(
    new THREE.BoxGeometry(3.45, 0.03, 9.1),
    materials.slatePatioTile
  );
  terraceDeckFloor.position.set(6.02, 3.875, 0.0);
  terraceDeckFloor.receiveShadow = true;
  house.add(terraceDeckFloor);

  // ============================================================================
  // 5. UPPER FLOOR WALLS, GLASS BALUSTRADES, LOUVERS & DOORS (y = 3.86 to 7.05)
  // ============================================================================
  const ufHeight = 3.18;
  const ufCenterY = 3.86 + ufHeight / 2;

  // Rear Wall of Master Bedroom & Upper Hallway (x = -8.2 to +4.2, z = -4.66)
  const upperRearWall = new THREE.Mesh(
    new THREE.BoxGeometry(12.4, ufHeight, 0.28),
    materials.exteriorPlaster
  );
  upperRearWall.position.set(-2.0, ufCenterY, -4.66);
  upperRearWall.castShadow = true;
  upperRearWall.receiveShadow = true;
  house.add(upperRearWall);

  // Master Bedroom Architectural Upholstered & Oak Headboard Feature Wall (x = -4.6, z = -4.46)
  const headboardOakBacking = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, ufHeight - 0.15, 0.08),
    materials.darkWalnutWood
  );
  headboardOakBacking.position.set(-4.6, ufCenterY, -4.46);
  house.add(headboardOakBacking);

  // Warm LED Cove Strip above headboard
  const bedroomCoveStrip = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.05, 0.06),
    materials.warmLightEmissive
  );
  bedroomCoveStrip.position.set(-4.6, 6.85, -4.4);
  house.add(bedroomCoveStrip);

  // Left Cantilevered Master Suite Wall with Timber Privacy Louvers & Window (x = -8.2)
  const upperLeftRearPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, ufHeight, 2.5),
    materials.exteriorPlaster
  );
  upperLeftRearPier.position.set(-8.2, ufCenterY, -3.55);
  upperLeftRearPier.castShadow = true;
  house.add(upperLeftRearPier);

  const upperLeftFrontPier = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, ufHeight, 1.8),
    materials.exteriorPlaster
  );
  upperLeftFrontPier.position.set(-8.2, ufCenterY, 3.9);
  upperLeftFrontPier.castShadow = true;
  house.add(upperLeftFrontPier);

  const bedroomSideWindow = createMullionedWindow(5.2, ufHeight - 0.28, 2, materials);
  bedroomSideWindow.rotation.y = Math.PI / 2;
  bedroomSideWindow.position.set(-8.2, ufCenterY, 0.2);
  house.add(bedroomSideWindow);

  // Exterior Architectural Brise-Soleil Vertical Oak Louvers outside Bedroom Window
  const louverGeo = new THREE.BoxGeometry(0.18, ufHeight - 0.15, 0.05);
  for (let i = 0; i < 14; i++) {
    const louver = new THREE.Mesh(louverGeo, materials.warmOakCabinet);
    louver.position.set(-8.38, ufCenterY, -2.1 + i * 0.35);
    louver.rotation.y = 0.35;
    louver.castShadow = true;
    house.add(louver);
  }

  // Interior Partition Wall between Master Suite & Upper Hallway (x = -1.25) with Framed Door
  const bedroomHallPartitionRear = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, ufHeight, 3.2),
    materials.interiorWallMatte
  );
  bedroomHallPartitionRear.position.set(-1.25, ufCenterY, -3.1);
  bedroomHallPartitionRear.castShadow = true;
  bedroomHallPartitionRear.receiveShadow = true;
  house.add(bedroomHallPartitionRear);

  const bedroomHallPartitionFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, ufHeight, 3.6),
    materials.interiorWallMatte
  );
  bedroomHallPartitionFront.position.set(-1.25, ufCenterY, 2.2);
  bedroomHallPartitionFront.castShadow = true;
  bedroomHallPartitionFront.receiveShadow = true;
  house.add(bedroomHallPartitionFront);

  // Framed interior door between Upper Hallway & Master Suite
  const masterSuiteDoor = createModernFramedDoor(1.05, 2.45, materials, -0.45);
  masterSuiteDoor.rotation.y = Math.PI / 2;
  masterSuiteDoor.position.set(-1.25, 3.86, -0.75);
  house.add(masterSuiteDoor);

  const masterDoorTransom = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.72, 1.4),
    materials.interiorWallMatte
  );
  masterDoorTransom.position.set(-1.25, 6.68, -0.75);
  house.add(masterDoorTransom);

  // Partition Wall & Glass Sliding Door between Upper Hallway and Right Roof Terrace (x = +4.15)
  const terraceWallRear = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, ufHeight, 3.2),
    materials.exteriorPlaster
  );
  terraceWallRear.position.set(4.15, ufCenterY, -3.1);
  terraceWallRear.castShadow = true;
  house.add(terraceWallRear);

  const terraceGlassDoor = createMullionedWindow(4.8, ufHeight - 0.24, 2, materials);
  terraceGlassDoor.rotation.y = Math.PI / 2;
  terraceGlassDoor.position.set(4.15, ufCenterY, 1.2);
  house.add(terraceGlassDoor);

  // Glass Balustrades:
  // 1) Upper Hallway Mezzanine Guardrail overlooking Stairwell Void
  const mezzanineGlass = new THREE.Mesh(
    new THREE.BoxGeometry(2.55, 1.05, 0.03),
    materials.balustradeGlass
  );
  mezzanineGlass.position.set(0.1, 4.38, -1.42);
  mezzanineGlass.renderOrder = 5;
  house.add(mezzanineGlass);

  const mezzanineCap = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.04, 0.06),
    materials.brushedBronze
  );
  mezzanineCap.position.set(0.1, 4.92, -1.42);
  house.add(mezzanineCap);

  // 2) Front Cutaway Low Architectural Glass Guardrail along Upper Hall & Terrace (so cutaway view is crystal clear)
  const terraceFrontGlass = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.02, 0.03),
    materials.balustradeGlass
  );
  terraceFrontGlass.position.set(6.0, 4.38, 4.72);
  terraceFrontGlass.renderOrder = 6;
  house.add(terraceFrontGlass);

  const terraceRightGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 1.02, 9.4),
    materials.balustradeGlass
  );
  terraceRightGlass.position.set(7.84, 4.38, 0.0);
  terraceRightGlass.renderOrder = 6;
  house.add(terraceRightGlass);

  const terraceBackParapet = new THREE.Mesh(
    new THREE.BoxGeometry(3.7, 1.15, 0.24),
    materials.travertineStone
  );
  terraceBackParapet.position.set(6.0, 4.44, -4.66);
  terraceBackParapet.castShadow = true;
  house.add(terraceBackParapet);

  // Front Cutaway Frame Columns on Upper Floor (Master Suite + Hallway + Terrace Rear Column)
  for (const ux of [-8.2, -1.25, 4.15]) {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, ufHeight, 0.24),
      materials.charcoalMatteMetal
    );
    col.position.set(ux, ufCenterY, 4.65);
    col.castShadow = true;
    house.add(col);
  }

  const terraceRearCol = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, ufHeight, 0.24),
    materials.charcoalMatteMetal
  );
  terraceRearCol.position.set(7.84, ufCenterY, -4.65);
  terraceRearCol.castShadow = true;
  house.add(terraceRearCol);

  // Architectural Walnut & Charcoal Baseboards along Rear Walls for Crisp Floor-Wall Grounding
  const gfBaseboard = new THREE.Mesh(
    new THREE.BoxGeometry(15.6, 0.09, 0.06),
    materials.charcoalMatteMetal
  );
  gfBaseboard.position.set(0, 0.29, -4.5);
  house.add(gfBaseboard);

  const ufBaseboard = new THREE.Mesh(
    new THREE.BoxGeometry(12.2, 0.09, 0.06),
    materials.charcoalMatteMetal
  );
  ufBaseboard.position.set(-2.0, 3.93, -4.5);
  house.add(ufBaseboard);

  return house;
}
