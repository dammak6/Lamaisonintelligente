import * as THREE from 'three';
import { computeRoofPanelTransforms } from '../architecturalState';
import { ArchitecturalMaterials } from '../materials';

export interface RoofAssembly {
  group: THREE.Group;
  updateRoofProgress: (progress: number) => void;
}

export function createRoofSystem(
  materials: ArchitecturalMaterials
): RoofAssembly {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ArticulatedRoofSystem';

  // Base resting height of the upper roof assembly (y = 7.05)
  const baseRoofY = 7.05;

  // ============================================================================
  // PANEL 1: MAIN MASTER SUITE CANTILEVERED ROOF WING (x = -8.7 to -1.15)
  // ============================================================================
  const mainSuitePanel = new THREE.Group();
  mainSuitePanel.name = 'RoofPanel_MainSuite';
  const mainBasePos = new THREE.Vector3(-4.9, baseRoofY, 0.0);
  mainSuitePanel.position.copy(mainBasePos);

  // Structural Concrete Roof Deck
  const mainDeck = new THREE.Mesh(
    new THREE.BoxGeometry(7.7, 0.28, 10.6),
    materials.boardConcrete
  );
  mainDeck.position.set(0, 0.14, 0);
  mainDeck.castShadow = true;
  mainDeck.receiveShadow = true;
  mainSuitePanel.add(mainDeck);

  // Warm Oak Soffit Ceiling Underside (visible from interior and exterior eaves)
  const mainSoffit = new THREE.Mesh(
    new THREE.BoxGeometry(7.45, 0.04, 10.35),
    materials.warmOakCabinet
  );
  mainSoffit.position.set(0, -0.01, 0);
  mainSuitePanel.add(mainSoffit);

  // Dark Anodized Aluminum Perimeter Fascia Trim
  const mainFasciaFront = new THREE.Mesh(
    new THREE.BoxGeometry(7.76, 0.34, 0.08),
    materials.charcoalMatteMetal
  );
  mainFasciaFront.position.set(0, 0.16, 5.3);
  mainSuitePanel.add(mainFasciaFront);

  const mainFasciaBack = mainFasciaFront.clone();
  mainFasciaBack.position.set(0, 0.16, -5.3);
  mainSuitePanel.add(mainFasciaBack);

  const mainFasciaLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.34, 10.68),
    materials.charcoalMatteMetal
  );
  mainFasciaLeft.position.set(-3.86, 0.16, 0);
  mainSuitePanel.add(mainFasciaLeft);

  // Brushed Bronze Accent Reveal Strip along Cantilever Eave
  const bronzeTrimLeft = new THREE.Mesh(
    new THREE.BoxGeometry(7.78, 0.045, 0.095),
    materials.brushedBronze
  );
  bronzeTrimLeft.position.set(0, 0.03, 5.31);
  mainSuitePanel.add(bronzeTrimLeft);

  // Architectural Rooftop Solar / Acoustic Louver Array on Master Roof
  const solarFrame = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.08, 6.2),
    materials.charcoalMatteMetal
  );
  solarFrame.position.set(-0.2, 0.32, -0.4);
  mainSuitePanel.add(solarFrame);

  for (let i = 0; i < 6; i++) {
    const solarPanel = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 0.04, 0.78),
      materials.tvScreenMaterial
    );
    solarPanel.position.set(-0.2, 0.39, -2.7 + i * 0.96);
    solarPanel.rotation.x = 0.08;
    solarPanel.castShadow = true;
    mainSuitePanel.add(solarPanel);
  }

  rootGroup.add(mainSuitePanel);

  // ============================================================================
  // PANEL 2: CENTER GALLERY & SKYLIGHT ATRIUM SPINE (x = -1.15 to +4.25)
  // ============================================================================
  const centerSkylightPanel = new THREE.Group();
  centerSkylightPanel.name = 'RoofPanel_CenterSkylight';
  const centerBasePos = new THREE.Vector3(1.55, baseRoofY + 0.22, 0.0);
  centerSkylightPanel.position.copy(centerBasePos);

  // Left & Right Structural Spine Beams framing the Atrium Skylight
  const spineLeftBeam = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.28, 10.6),
    materials.boardConcrete
  );
  spineLeftBeam.position.set(-2.12, 0.14, 0);
  spineLeftBeam.castShadow = true;
  spineLeftBeam.receiveShadow = true;
  centerSkylightPanel.add(spineLeftBeam);

  const spineRightBeam = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.28, 10.6),
    materials.boardConcrete
  );
  spineRightBeam.position.set(2.12, 0.14, 0);
  spineRightBeam.castShadow = true;
  spineRightBeam.receiveShadow = true;
  centerSkylightPanel.add(spineRightBeam);

  const spineFrontHeader = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 0.32, 1.5),
    materials.charcoalMatteMetal
  );
  spineFrontHeader.position.set(0, 0.15, 4.55);
  centerSkylightPanel.add(spineFrontHeader);

  const spineBackHeader = spineFrontHeader.clone();
  spineBackHeader.position.set(0, 0.15, -4.55);
  centerSkylightPanel.add(spineBackHeader);

  // Glazed Skylight Well over the Staircase & Mezzanine Gallery
  const skylightGlassPane = new THREE.Mesh(
    new THREE.BoxGeometry(3.15, 0.04, 7.6),
    materials.skylightGlass
  );
  skylightGlassPane.position.set(0, 0.24, 0);
  skylightGlassPane.renderOrder = 7;
  centerSkylightPanel.add(skylightGlassPane);

  // Oak & Dark Metal Skylight Louver Ribs
  for (let r = 0; r < 9; r++) {
    const rib = new THREE.Mesh(
      new THREE.BoxGeometry(3.1, 0.16, 0.08),
      materials.warmOakCabinet
    );
    rib.position.set(0, 0.14, -3.4 + r * 0.85);
    centerSkylightPanel.add(rib);
  }

  rootGroup.add(centerSkylightPanel);

  // ============================================================================
  // PANEL 3: RIGHT TERRACE ARCHITECTURAL PERGOLA CANOPY (x = +4.25 to +8.35)
  // ============================================================================
  const terracePergolaPanel = new THREE.Group();
  terracePergolaPanel.name = 'RoofPanel_TerracePergola';
  const terraceBasePos = new THREE.Vector3(6.3, baseRoofY, 0.0);
  terracePergolaPanel.position.copy(terraceBasePos);

  // Perimeter Steel Pergola Frame
  const pergolaOuterRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.28, 10.4),
    materials.charcoalMatteMetal
  );
  pergolaOuterRight.position.set(1.9, 0.14, 0);
  pergolaOuterRight.castShadow = true;
  terracePergolaPanel.add(pergolaOuterRight);

  const pergolaOuterLeft = pergolaOuterRight.clone();
  pergolaOuterLeft.position.set(-1.9, 0.14, 0);
  terracePergolaPanel.add(pergolaOuterLeft);

  const pergolaFrontBeam = new THREE.Mesh(
    new THREE.BoxGeometry(4.04, 0.28, 0.26),
    materials.charcoalMatteMetal
  );
  pergolaFrontBeam.position.set(0, 0.14, 5.1);
  terracePergolaPanel.add(pergolaFrontBeam);

  const pergolaBackBeam = pergolaFrontBeam.clone();
  pergolaBackBeam.position.set(0, 0.14, -5.1);
  terracePergolaPanel.add(pergolaBackBeam);

  // Warm Oak Brise-Soleil Pergola Slats over Upper Terrace
  const pergolaSlatGeo = new THREE.BoxGeometry(3.6, 0.14, 0.09);
  for (let s = 0; s < 15; s++) {
    const slat = new THREE.Mesh(pergolaSlatGeo, materials.warmOakCabinet);
    slat.position.set(0, 0.14, -4.4 + s * 0.63);
    terracePergolaPanel.add(slat);
  }

  rootGroup.add(terracePergolaPanel);

  // ============================================================================
  // PANEL 4: FRONT ARCHITECTURAL EAVE BROW & WARM SOFFIT DOWNLIGHT BAR
  // ============================================================================
  const frontFasciaPanel = new THREE.Group();
  frontFasciaPanel.name = 'RoofPanel_FrontFascia';
  const fasciaBasePos = new THREE.Vector3(0.0, baseRoofY + 0.05, 5.42);
  frontFasciaPanel.position.copy(fasciaBasePos);

  const browBeam = new THREE.Mesh(
    new THREE.BoxGeometry(17.1, 0.22, 0.45),
    materials.charcoalMatteMetal
  );
  browBeam.castShadow = true;
  frontFasciaPanel.add(browBeam);

  const browBronzeLine = new THREE.Mesh(
    new THREE.BoxGeometry(17.14, 0.04, 0.48),
    materials.brushedBronze
  );
  browBronzeLine.position.y = -0.09;
  frontFasciaPanel.add(browBronzeLine);

  const browLightStrip = new THREE.Mesh(
    new THREE.BoxGeometry(16.2, 0.025, 0.08),
    materials.warmLightEmissive
  );
  browLightStrip.position.set(0, -0.115, -0.1);
  frontFasciaPanel.add(browLightStrip);

  rootGroup.add(frontFasciaPanel);

  // ============================================================================
  // KINEMATIC ARTICULATION UPDATE
  // ============================================================================
  const updateRoofProgress = (progress: number) => {
    const transforms = computeRoofPanelTransforms(progress);

    mainSuitePanel.position.set(
      mainBasePos.x + transforms.mainSuite.offset.x,
      mainBasePos.y + transforms.mainSuite.offset.y,
      mainBasePos.z + transforms.mainSuite.offset.z
    );
    mainSuitePanel.rotation.set(
      transforms.mainSuite.rotation.x,
      transforms.mainSuite.rotation.y,
      transforms.mainSuite.rotation.z
    );

    centerSkylightPanel.position.set(
      centerBasePos.x + transforms.centerSkylight.offset.x,
      centerBasePos.y + transforms.centerSkylight.offset.y,
      centerBasePos.z + transforms.centerSkylight.offset.z
    );
    centerSkylightPanel.rotation.set(
      transforms.centerSkylight.rotation.x,
      transforms.centerSkylight.rotation.y,
      transforms.centerSkylight.rotation.z
    );

    terracePergolaPanel.position.set(
      terraceBasePos.x + transforms.terracePergola.offset.x,
      terraceBasePos.y + transforms.terracePergola.offset.y,
      terraceBasePos.z + transforms.terracePergola.offset.z
    );
    terracePergolaPanel.rotation.set(
      transforms.terracePergola.rotation.x,
      transforms.terracePergola.rotation.y,
      transforms.terracePergola.rotation.z
    );

    frontFasciaPanel.position.set(
      fasciaBasePos.x + transforms.frontFascia.offset.x,
      fasciaBasePos.y + transforms.frontFascia.offset.y,
      fasciaBasePos.z + transforms.frontFascia.offset.z
    );
    frontFasciaPanel.rotation.set(
      transforms.frontFascia.rotation.x,
      transforms.frontFascia.rotation.y,
      transforms.frontFascia.rotation.z
    );
  };

  updateRoofProgress(0);

  return {
    group: rootGroup,
    updateRoofProgress,
  };
}
