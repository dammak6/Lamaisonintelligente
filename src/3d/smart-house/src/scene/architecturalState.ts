export type RoofMode = 'EXTERIOR' | 'INTERIOR';

export type CameraPresetId =
  | 'exterior'
  | 'overview'
  | 'cutaway'
  | 'living'
  | 'kitchen'
  | 'hallway'
  | 'bedroom';

export type LightingAmbianceId = 'daylight' | 'golden' | 'evening';

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface CameraPreset {
  id: CameraPresetId;
  label: string;
  frenchSubtitle: string;
  category: 'macro' | 'room';
  position: Vec3Tuple;
  target: Vec3Tuple;
  fov: number;
  recommendedRoofMode: RoofMode;
}

export interface RoofPanelTransform {
  id: 'mainSuite' | 'centerSkylight' | 'terracePergola' | 'frontFascia';
  offset: Vec3Tuple;
  rotation: Vec3Tuple;
}

export interface LightingAmbianceConfig {
  id: LightingAmbianceId;
  label: string;
  skyTopColor: number;
  skyHorizonColor: number;
  fogColor: number;
  sunColor: number;
  sunIntensity: number;
  sunPosition: Vec3Tuple;
  hemiSkyColor: number;
  hemiGroundColor: number;
  hemiIntensity: number;
  rimColor: number;
  rimIntensity: number;
  interiorWarmMultiplier: number;
  exposure: number;
}

export const HOUSE_DIMENSIONS = {
  totalWidth: 16.0,
  totalDepth: 10.4,
  groundFloorY: 0.0,
  groundCeilingY: 3.6,
  upperFloorY: 3.78,
  upperCeilingY: 7.1,
  plinthHeight: 0.36,
} as const;

export const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  exterior: {
    id: 'exterior',
    label: 'Exterior View',
    frenchSubtitle: 'Vue Extérieure Trois-Quarts',
    category: 'macro',
    position: { x: -15.5, y: 7.4, z: 19.5 },
    target: { x: 0.0, y: 3.1, z: 0.0 },
    fov: 38,
    recommendedRoofMode: 'EXTERIOR',
  },
  overview: {
    id: 'overview',
    label: 'Elevated Overview',
    frenchSubtitle: 'Perspective Architecturale Élevée',
    category: 'macro',
    position: { x: 16.8, y: 14.5, z: 20.5 },
    target: { x: 0.0, y: 2.8, z: -0.4 },
    fov: 36,
    recommendedRoofMode: 'EXTERIOR',
  },
  cutaway: {
    id: 'cutaway',
    label: 'Interior Cutaway',
    frenchSubtitle: 'Coupe Intérieure Panoramique',
    category: 'macro',
    position: { x: 0.0, y: 5.4, z: 19.6 },
    target: { x: 0.0, y: 3.1, z: -0.8 },
    fov: 37,
    recommendedRoofMode: 'INTERIOR',
  },
  living: {
    id: 'living',
    label: 'Living Salon',
    frenchSubtitle: 'Salon Contemporain (RDC)',
    category: 'room',
    position: { x: -4.4, y: 2.35, z: 9.6 },
    target: { x: -4.4, y: 1.35, z: -1.5 },
    fov: 39,
    recommendedRoofMode: 'INTERIOR',
  },
  kitchen: {
    id: 'kitchen',
    label: 'Kitchen & Dining',
    frenchSubtitle: 'Cuisine & Salle à Manger (RDC)',
    category: 'room',
    position: { x: 4.8, y: 2.45, z: 9.6 },
    target: { x: 4.6, y: 1.4, z: -1.5 },
    fov: 39,
    recommendedRoofMode: 'INTERIOR',
  },
  hallway: {
    id: 'hallway',
    label: 'Stairs & Hallway',
    frenchSubtitle: 'Escalier & Galerie Vitrée',
    category: 'room',
    position: { x: 0.6, y: 4.2, z: 10.4 },
    target: { x: 0.4, y: 2.8, z: -2.0 },
    fov: 39,
    recommendedRoofMode: 'INTERIOR',
  },
  bedroom: {
    id: 'bedroom',
    label: 'Master Bedroom',
    frenchSubtitle: 'Suite Parentale (Étage)',
    category: 'room',
    position: { x: -4.2, y: 5.8, z: 9.5 },
    target: { x: -4.2, y: 4.65, z: -1.6 },
    fov: 39,
    recommendedRoofMode: 'INTERIOR',
  },
};

export const LIGHTING_AMBIANCES: Record<LightingAmbianceId, LightingAmbianceConfig> = {
  daylight: {
    id: 'daylight',
    label: 'Soft Daylight',
    skyTopColor: 0xb8d3ee,
    skyHorizonColor: 0xe4ebf2,
    fogColor: 0xe2e9f0,
    sunColor: 0xfff5e4,
    sunIntensity: 2.4,
    sunPosition: { x: -16, y: 24, z: 18 },
    hemiSkyColor: 0xd8e8f8,
    hemiGroundColor: 0x8c7d6b,
    hemiIntensity: 0.82,
    rimColor: 0xdceeff,
    rimIntensity: 0.65,
    interiorWarmMultiplier: 1.25,
    exposure: 1.06,
  },
  golden: {
    id: 'golden',
    label: 'Golden Hour',
    skyTopColor: 0x2c3e58,
    skyHorizonColor: 0xd89c72,
    fogColor: 0xc69878,
    sunColor: 0xffb26b,
    sunIntensity: 2.65,
    sunPosition: { x: -24, y: 11, z: 16 },
    hemiSkyColor: 0x8ea4c8,
    hemiGroundColor: 0x6e533e,
    hemiIntensity: 0.72,
    rimColor: 0xffcfa3,
    rimIntensity: 0.8,
    interiorWarmMultiplier: 1.9,
    exposure: 1.06,
  },
  evening: {
    id: 'evening',
    label: 'Architectural Dusk',
    skyTopColor: 0x050914,
    skyHorizonColor: 0x0c1322,
    fogColor: 0x070b16,
    sunColor: 0x93c5fd,
    sunIntensity: 1.15,
    sunPosition: { x: 14, y: 18, z: 14 },
    hemiSkyColor: 0x1e293b,
    hemiGroundColor: 0x070b14,
    hemiIntensity: 0.52,
    rimColor: 0x38bdf8,
    rimIntensity: 0.75,
    interiorWarmMultiplier: 2.8,
    exposure: 1.14,
  },
};

/**
 * Smooth cubic easing for architectural roof articulation.
 */
export function easeInOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Computes the articulated upward and outward transformations for each roof section
 * given a normalized progress value in [0, 1] (0 = EXTERIOR closed, 1 = INTERIOR open).
 */
export function computeRoofPanelTransforms(rawProgress: number): Record<RoofPanelTransform['id'], RoofPanelTransform> {
  const p = easeInOutCubic(rawProgress);
  const nz = (v: number) => (v === 0 ? 0 : v);

  return {
    mainSuite: {
      id: 'mainSuite',
      offset: {
        x: nz(-2.45 * p),
        y: nz(4.35 * p),
        z: nz(-3.8 * p),
      },
      rotation: {
        x: nz(-0.15 * p),
        y: 0,
        z: nz(0.06 * p),
      },
    },
    centerSkylight: {
      id: 'centerSkylight',
      offset: {
        x: 0.0,
        y: nz(5.1 * p),
        z: nz(-4.2 * p),
      },
      rotation: {
        x: nz(-0.16 * p),
        y: 0,
        z: 0,
      },
    },
    terracePergola: {
      id: 'terracePergola',
      offset: {
        x: nz(2.35 * p),
        y: nz(4.15 * p),
        z: nz(-3.6 * p),
      },
      rotation: {
        x: nz(-0.14 * p),
        y: 0,
        z: nz(-0.06 * p),
      },
    },
    frontFascia: {
      id: 'frontFascia',
      offset: {
        x: 0.0,
        y: nz(4.75 * p),
        z: nz(-3.8 * p),
      },
      rotation: {
        x: nz(-0.12 * p),
        y: 0,
        z: 0,
      },
    },
  };
}

/**
 * Ensures the camera never clips through the back wall, side walls, ground plane,
 * or closed roof slab during interactive orbiting or preset transitions.
 */
export function clampCameraPosition(
  pos: Vec3Tuple,
  roofProgress: number
): Vec3Tuple {
  // Never go below ground terrace level
  const minY = 0.75;
  const maxY = 28.0;

  let x = Math.max(-32, Math.min(32, pos.x));
  let y = Math.max(minY, Math.min(maxY, pos.y));
  let z = Math.max(-24, Math.min(34, pos.z));

  // Prevent camera from entering the solid interior volume behind the cutaway plane (z < 5.0)
  // when within the house footprint (-8.6 < x < 8.6 and y < 8.8)
  const insideFootprintX = x > -8.6 && x < 8.6;
  const maxProtectedY = roofProgress < 0.5 ? 8.8 : 7.6;

  if (insideFootprintX && y < maxProtectedY && z < 5.2) {
    z = 5.2;
  }

  return { x, y, z };
}
