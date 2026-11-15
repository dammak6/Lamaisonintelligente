import * as THREE from 'three';

import oakTextureUrl from '../assets/images/tex_warm_oak_wood_1794782953835.jpg';
import stoneTextureUrl from '../assets/images/tex_architectural_stone_1794782953966.jpg';
import concreteTextureUrl from '../assets/images/tex_concrete_plaster_1794782954815.jpg';

export interface ArchitecturalMaterials {
  // Primary Textured Architectural Materials
  warmOakFloor: THREE.MeshStandardMaterial;
  warmOakCabinet: THREE.MeshStandardMaterial;
  darkWalnutWood: THREE.MeshStandardMaterial;
  travertineStone: THREE.MeshStandardMaterial;
  boardConcrete: THREE.MeshStandardMaterial;
  exteriorPlaster: THREE.MeshStandardMaterial;
  interiorWallMatte: THREE.MeshStandardMaterial;
  charcoalMatteMetal: THREE.MeshStandardMaterial;
  brushedBronze: THREE.MeshPhysicalMaterial;
  brushedSteel: THREE.MeshStandardMaterial;
  architecturalGlass: THREE.MeshPhysicalMaterial;
  balustradeGlass: THREE.MeshPhysicalMaterial;
  skylightGlass: THREE.MeshPhysicalMaterial;
  waterSurface: THREE.MeshPhysicalMaterial;
  // Upholstery & Soft Furnishings
  boucleCreamFabric: THREE.MeshStandardMaterial;
  linenTaupeFabric: THREE.MeshStandardMaterial;
  charcoalWoolFabric: THREE.MeshStandardMaterial;
  terracottaAccentFabric: THREE.MeshStandardMaterial;
  sageCushionFabric: THREE.MeshStandardMaterial;
  wovenRugMaterial: THREE.MeshStandardMaterial;
  bedroomRugMaterial: THREE.MeshStandardMaterial;
  // Stone & Countertops
  marbleCountertop: THREE.MeshPhysicalMaterial;
  slatePatioTile: THREE.MeshStandardMaterial;
  // Landscape & Foliage
  manicuredGrass: THREE.MeshStandardMaterial;
  soilMulch: THREE.MeshStandardMaterial;
  treeBark: THREE.MeshStandardMaterial;
  foliageOlive: THREE.MeshStandardMaterial;
  foliageDeepGreen: THREE.MeshStandardMaterial;
  foliageWarmGreen: THREE.MeshStandardMaterial;
  // Emissive & Accents
  warmLightEmissive: THREE.MeshStandardMaterial;
  tvScreenMaterial: THREE.MeshStandardMaterial;
  artCanvasWarm: THREE.MeshStandardMaterial;
  artCanvasAbstract: THREE.MeshStandardMaterial;
  contactShadowMat: THREE.MeshBasicMaterial;
  // Smart Speaker Redesign Materials
  smartSpeakerFabric: THREE.MeshStandardMaterial;
  smartSpeakerControlGlass: THREE.MeshStandardMaterial;
  smartSpeakerRing: THREE.MeshStandardMaterial;
  dispose: () => void;
}

function createMicroBumpCanvasTexture(
  pattern: 'wood' | 'stone' | 'fabric' | 'rug' | 'art1' | 'art2',
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  if (pattern === 'wood') {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 64; i++) {
      const y = (i * 4) % 256;
      ctx.fillStyle = i % 8 === 0 ? '#505050' : '#8d8d8d';
      ctx.fillRect(0, y, 256, 2);
    }
  } else if (pattern === 'stone') {
    ctx.fillStyle = '#848484';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 600; i++) {
      const x = (i * 73) % 256;
      const y = (i * 137) % 256;
      const w = 6 + (i % 18);
      ctx.fillStyle = i % 2 === 0 ? '#969696' : '#6e6e6e';
      ctx.fillRect(x, y, w, 2);
    }
  } else if (pattern === 'fabric') {
    ctx.fillStyle = '#7c7c7c';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#929292';
    for (let y = 0; y < 256; y += 4) {
      for (let x = (y % 8 === 0 ? 0 : 2); x < 256; x += 4) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  } else if (pattern === 'rug') {
    ctx.fillStyle = '#dad3c8';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#c4bbb0';
    ctx.lineWidth = 2;
    for (let y = 4; y < 256; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
    // Subtle geometric architectural border weave
    ctx.strokeStyle = '#9e9284';
    ctx.lineWidth = 4;
    ctx.strokeRect(18, 18, 220, 220);
  } else if (pattern === 'art1') {
    // Contemporary minimalist architectural canvas (warm ochre, charcoal, alabaster)
    ctx.fillStyle = '#ebe4d8';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#c87d4b';
    ctx.beginPath();
    ctx.arc(128, 140, 72, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#23272e';
    ctx.fillRect(42, 150, 172, 68);
    ctx.strokeStyle = '#d9ceb8';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(42, 90);
    ctx.lineTo(214, 90);
    ctx.stroke();
  } else if (pattern === 'art2') {
    // Geometric Nordic relief painting
    ctx.fillStyle = '#e5dfd5';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#3b4954';
    ctx.fillRect(28, 28, 95, 200);
    ctx.fillStyle = '#b98b62';
    ctx.fillRect(135, 28, 93, 95);
    ctx.fillStyle = '#738276';
    ctx.fillRect(135, 133, 93, 95);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  if (pattern === 'rug' || pattern === 'art1' || pattern === 'art2') {
    tex.colorSpace = THREE.SRGBColorSpace;
  }
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0, 'rgba(12, 15, 20, 0.55)');
  grad.addColorStop(0.55, 'rgba(12, 15, 20, 0.22)');
  grad.addColorStop(1, 'rgba(12, 15, 20, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createArchitecturalMaterials(
  renderer: THREE.WebGLRenderer,
  isSoftwareGl: boolean,
  onTextureLoad: () => void
): ArchitecturalMaterials {
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const loader = new THREE.TextureLoader();

  const disposableTextures: THREE.Texture[] = [];
  const disposableMaterials: THREE.Material[] = [];

  const loadTiledTexture = (
    url: string,
    repeatX: number,
    repeatY: number
  ): THREE.Texture => {
    const tex = loader.load(url, () => {
      onTextureLoad();
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.anisotropy = maxAnisotropy;
    disposableTextures.push(tex);
    return tex;
  };

  const oakFloorMap = loadTiledTexture(oakTextureUrl, 4, 3);
  const oakCabinetMap = loadTiledTexture(oakTextureUrl, 2, 2);
  const travertineMap = loadTiledTexture(stoneTextureUrl, 3, 2);
  const concreteMap = loadTiledTexture(concreteTextureUrl, 3, 2);
  const slateTileMap = loadTiledTexture(concreteTextureUrl, 6, 6);

  const woodBump = createMicroBumpCanvasTexture('wood', maxAnisotropy);
  woodBump.repeat.set(4, 3);
  const stoneBump = createMicroBumpCanvasTexture('stone', maxAnisotropy);
  stoneBump.repeat.set(3, 2);
  const fabricBump = createMicroBumpCanvasTexture('fabric', maxAnisotropy);
  fabricBump.repeat.set(8, 8);
  const rugTex = createMicroBumpCanvasTexture('rug', maxAnisotropy);
  const art1Tex = createMicroBumpCanvasTexture('art1', maxAnisotropy);
  const art2Tex = createMicroBumpCanvasTexture('art2', maxAnisotropy);
  const shadowTex = createContactShadowTexture();

  disposableTextures.push(
    woodBump,
    stoneBump,
    fabricBump,
    rugTex,
    art1Tex,
    art2Tex,
    shadowTex
  );

  const track = <T extends THREE.Material>(m: T): T => {
    disposableMaterials.push(m);
    return m;
  };

  const warmOakFloor = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: oakFloorMap,
      bumpMap: woodBump,
      bumpScale: 0.015,
      roughness: 0.42,
      metalness: 0.05,
    })
  );

  const warmOakCabinet = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: oakCabinetMap,
      bumpMap: woodBump,
      bumpScale: 0.01,
      roughness: 0.36,
      metalness: 0.06,
    })
  );

  const darkWalnutWood = track(
    new THREE.MeshStandardMaterial({
      color: 0x78563c,
      map: oakCabinetMap,
      bumpMap: woodBump,
      bumpScale: 0.012,
      roughness: 0.38,
      metalness: 0.08,
    })
  );

  const travertineStone = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: travertineMap,
      bumpMap: stoneBump,
      bumpScale: 0.02,
      roughness: 0.62,
      metalness: 0.04,
    })
  );

  const boardConcrete = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: concreteMap,
      bumpMap: stoneBump,
      bumpScale: 0.016,
      roughness: 0.72,
      metalness: 0.05,
    })
  );

  const exteriorPlaster = track(
    new THREE.MeshStandardMaterial({
      color: 0xf4f0ea,
      bumpMap: stoneBump,
      bumpScale: 0.006,
      roughness: 0.82,
      metalness: 0.02,
    })
  );

  const interiorWallMatte = track(
    new THREE.MeshStandardMaterial({
      color: 0xf7f4ee,
      roughness: 0.86,
      metalness: 0.01,
    })
  );

  const charcoalMatteMetal = track(
    new THREE.MeshStandardMaterial({
      color: 0x22262c,
      roughness: 0.34,
      metalness: 0.78,
    })
  );

  const brushedBronze = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xb88c5a,
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.25,
      clearcoatRoughness: 0.2,
    })
  );

  const brushedSteel = track(
    new THREE.MeshStandardMaterial({
      color: 0xc8cfd6,
      roughness: 0.22,
      metalness: 0.9,
    })
  );

  const architecturalGlass = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xdff0f7,
      roughness: 0.04,
      metalness: 0.08,
      transmission: 0,
      transparent: true,
      opacity: 0.32,
      ior: 1.5,
      clearcoat: 0.9,
      clearcoatRoughness: 0.04,
      depthWrite: false,
    })
  );

  const balustradeGlass = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xd0e8f2,
      roughness: 0.04,
      metalness: 0.08,
      transmission: 0,
      transparent: true,
      opacity: 0.35,
      ior: 1.5,
      clearcoat: 0.9,
      clearcoatRoughness: 0.04,
      depthWrite: false,
    })
  );

  const skylightGlass = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xe3f2fa,
      roughness: 0.05,
      metalness: 0.08,
      transmission: 0,
      transparent: true,
      opacity: 0.36,
      ior: 1.5,
      clearcoat: 0.9,
      clearcoatRoughness: 0.04,
      depthWrite: false,
    })
  );

  const waterSurface = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x3b7a8c,
      roughness: 0.08,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.88,
    })
  );

  const boucleCreamFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0xede7dd,
      bumpMap: fabricBump,
      bumpScale: 0.018,
      roughness: 0.88,
      metalness: 0.0,
    })
  );

  const linenTaupeFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0xc5baaa,
      bumpMap: fabricBump,
      bumpScale: 0.014,
      roughness: 0.85,
      metalness: 0.0,
    })
  );

  const charcoalWoolFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0x3a3f47,
      bumpMap: fabricBump,
      bumpScale: 0.015,
      roughness: 0.84,
      metalness: 0.02,
    })
  );

  const terracottaAccentFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0xb86b4b,
      bumpMap: fabricBump,
      bumpScale: 0.012,
      roughness: 0.8,
      metalness: 0.0,
    })
  );

  const sageCushionFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0x6f8274,
      bumpMap: fabricBump,
      bumpScale: 0.012,
      roughness: 0.82,
      metalness: 0.0,
    })
  );

  const wovenRugMaterial = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: rugTex,
      bumpMap: fabricBump,
      bumpScale: 0.02,
      roughness: 0.92,
      metalness: 0.0,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );

  const bedroomRugMaterial = track(
    new THREE.MeshStandardMaterial({
      color: 0xe6dfd5,
      map: rugTex,
      bumpMap: fabricBump,
      bumpScale: 0.02,
      roughness: 0.9,
      metalness: 0.0,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );

  const marbleCountertop = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xfaf7f2,
      map: travertineMap,
      roughness: 0.16,
      metalness: 0.02,
      clearcoat: 0.65,
      clearcoatRoughness: 0.12,
    })
  );

  const slatePatioTile = track(
    new THREE.MeshStandardMaterial({
      color: 0x5c6066,
      map: slateTileMap,
      bumpMap: stoneBump,
      bumpScale: 0.015,
      roughness: 0.76,
      metalness: 0.08,
    })
  );

  const manicuredGrass = track(
    new THREE.MeshStandardMaterial({
      color: 0x4c6b46,
      bumpMap: fabricBump,
      bumpScale: 0.025,
      roughness: 0.92,
      metalness: 0.0,
    })
  );

  const soilMulch = track(
    new THREE.MeshStandardMaterial({
      color: 0x3d3229,
      roughness: 0.95,
      metalness: 0.0,
    })
  );

  const treeBark = track(
    new THREE.MeshStandardMaterial({
      color: 0x5a483a,
      bumpMap: woodBump,
      bumpScale: 0.02,
      roughness: 0.88,
      metalness: 0.0,
    })
  );

  const foliageOlive = track(
    new THREE.MeshStandardMaterial({
      color: 0x627c5b,
      roughness: 0.78,
      metalness: 0.02,
    })
  );

  const foliageDeepGreen = track(
    new THREE.MeshStandardMaterial({
      color: 0x3b593f,
      roughness: 0.72,
      metalness: 0.04,
    })
  );

  const foliageWarmGreen = track(
    new THREE.MeshStandardMaterial({
      color: 0x547249,
      roughness: 0.82,
      metalness: 0.01,
    })
  );

  const warmLightEmissive = track(
    new THREE.MeshStandardMaterial({
      color: 0xfff3dc,
      emissive: new THREE.Color(0xffc878),
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.0,
    })
  );

  const tvScreenMaterial = track(
    new THREE.MeshStandardMaterial({
      color: 0x14181f,
      roughness: 0.14,
      metalness: 0.35,
    })
  );

  const artCanvasWarm = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: art1Tex,
      roughness: 0.65,
      metalness: 0.02,
    })
  );

  const artCanvasAbstract = track(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: art2Tex,
      roughness: 0.65,
      metalness: 0.02,
    })
  );

  const contactShadowMat = track(
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })
  );

  // Matériau tissu acoustique 3D micro-tissé pour l'enceinte intelligente
  const smartSpeakerFabric = track(
    new THREE.MeshStandardMaterial({
      color: 0x222834,
      bumpMap: fabricBump,
      bumpScale: 0.022,
      roughness: 0.78,
      metalness: 0.08,
    })
  );

  // Disque tactile supérieur noir obsidienne fumé
  const smartSpeakerControlGlass = track(
    new THREE.MeshStandardMaterial({
      color: 0x11141a,
      roughness: 0.18,
      metalness: 0.72,
    })
  );

  // Anneau lumineux LED électroluminescent
  const smartSpeakerRing = track(
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.1,
    })
  );

  return {
    warmOakFloor,
    warmOakCabinet,
    darkWalnutWood,
    travertineStone,
    boardConcrete,
    exteriorPlaster,
    interiorWallMatte,
    charcoalMatteMetal,
    brushedBronze,
    brushedSteel,
    architecturalGlass,
    balustradeGlass,
    skylightGlass,
    waterSurface,
    boucleCreamFabric,
    linenTaupeFabric,
    charcoalWoolFabric,
    terracottaAccentFabric,
    sageCushionFabric,
    wovenRugMaterial,
    bedroomRugMaterial,
    marbleCountertop,
    slatePatioTile,
    manicuredGrass,
    soilMulch,
    treeBark,
    foliageOlive,
    foliageDeepGreen,
    foliageWarmGreen,
    warmLightEmissive,
    tvScreenMaterial,
    artCanvasWarm,
    artCanvasAbstract,
    contactShadowMat,
    smartSpeakerFabric,
    smartSpeakerControlGlass,
    smartSpeakerRing,
    dispose: () => {
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
    },
  };
}
