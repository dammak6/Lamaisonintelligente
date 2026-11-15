import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  LIGHTING_AMBIANCES,
  LightingAmbianceId,
} from '../architecturalState';
import { ArchitecturalMaterials } from '../materials';

export interface LightingRig {
  group: THREE.Group;
  applyAmbiance: (
    ambianceId: LightingAmbianceId,
    interiorLightsEnabled: boolean
  ) => void;
  dispose: () => void;
}

export function createLightingSystem(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  materials: ArchitecturalMaterials,
  isSoftwareGl: boolean
): LightingRig {
  const group = new THREE.Group();
  group.name = 'LightingRig';

  // Studio environment reflections via RoomEnvironment + PMREMGenerator
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envRenderTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRenderTarget.texture;
  pmremGenerator.dispose();

  // 1. Key Light (Directional Sun) - Sole shadow caster for peak performance & crisp architectural shadows
  const sunLight = new THREE.DirectionalLight(0xfff6e8, 2.35);
  sunLight.position.set(-16, 24, 18);
  sunLight.target.position.set(0, 2, 0);
  sunLight.castShadow = !isSoftwareGl;

  if (!isSoftwareGl) {
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    const d = 16.5;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.camera.near = 2.0;
    sunLight.shadow.camera.far = 52.0;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.normalBias = 0.02;
    sunLight.shadow.radius = 2.0;
  }
  group.add(sunLight);
  group.add(sunLight.target);

  // 2. Sky / Ground Hemisphere Fill Light (Warm/Cool temperature contrast)
  const hemiLight = new THREE.HemisphereLight(0xd8e8f8, 0x9b8e7e, 0.85);
  hemiLight.position.set(0, 30, 0);
  group.add(hemiLight);

  // 3. Architectural Rim / Backlight
  const rimLight = new THREE.DirectionalLight(0xdceeff, 0.65);
  rimLight.position.set(18, 15, -16);
  group.add(rimLight);

  // 4. Warm Interior Architectural Point Lights (5 calibrated zones, unshadowed for fast rendering)
  const livingRoomLight = new THREE.PointLight(0xffcb88, 3.2, 11, 1.6);
  livingRoomLight.position.set(-4.3, 3.25, 0.2);
  group.add(livingRoomLight);

  const kitchenDiningLight = new THREE.PointLight(0xffcc8a, 3.4, 11, 1.6);
  kitchenDiningLight.position.set(4.6, 3.2, 0.4);
  group.add(kitchenDiningLight);

  const foyerStairLight = new THREE.PointLight(0xffd296, 2.6, 9.5, 1.6);
  foyerStairLight.position.set(0.5, 4.2, -1.6);
  group.add(foyerStairLight);

  const masterBedroomLight = new THREE.PointLight(0xffc982, 3.2, 10.5, 1.6);
  masterBedroomLight.position.set(-3.4, 6.65, -0.4);
  group.add(masterBedroomLight);

  const gardenPathLight = new THREE.PointLight(0xffbf75, 2.0, 9.0, 1.7);
  gardenPathLight.position.set(-1.5, 1.1, 7.2);
  group.add(gardenPathLight);

  // Éclairage studio d'appoint doux pour la mise en valeur rapprochée de l'enceinte intelligente
  const speakerStudioLight = new THREE.PointLight(0xdbeafe, 1.8, 5.0, 1.8);
  speakerStudioLight.position.set(-4.6, 2.0, -3.2);
  group.add(speakerStudioLight);

  const interiorLights = [
    { light: livingRoomLight, baseIntensity: 3.2 },
    { light: kitchenDiningLight, baseIntensity: 3.4 },
    { light: foyerStairLight, baseIntensity: 2.6 },
    { light: masterBedroomLight, baseIntensity: 3.2 },
    { light: gardenPathLight, baseIntensity: 2.0 },
    { light: speakerStudioLight, baseIntensity: 1.6 },
  ];

  // Atmospheric Sky Dome backdrop
  const skyGeo = new THREE.SphereGeometry(75, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0xcbe0f5) },
      bottomColor: { value: new THREE.Color(0xe9eef4) },
      offset: { value: 4.0 },
      exponent: { value: 0.65 },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(skyGeo, skyMat);
  skyDome.name = 'SkyDome';
  group.add(skyDome);

  scene.fog = new THREE.FogExp2(0xe6ecf2, 0.0085);

  const applyAmbiance = (
    ambianceId: LightingAmbianceId,
    interiorLightsEnabled: boolean
  ) => {
    const cfg = LIGHTING_AMBIANCES[ambianceId];

    sunLight.color.setHex(cfg.sunColor);
    sunLight.intensity = cfg.sunIntensity;
    sunLight.position.set(
      cfg.sunPosition.x,
      cfg.sunPosition.y,
      cfg.sunPosition.z
    );

    hemiLight.color.setHex(cfg.hemiSkyColor);
    hemiLight.groundColor.setHex(cfg.hemiGroundColor);
    hemiLight.intensity = cfg.hemiIntensity;

    rimLight.color.setHex(cfg.rimColor);
    rimLight.intensity = cfg.rimIntensity;

    skyMat.uniforms.topColor.value.setHex(cfg.skyTopColor);
    skyMat.uniforms.bottomColor.value.setHex(cfg.skyHorizonColor);

    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.setHex(cfg.fogColor);
    }
    scene.background = new THREE.Color(cfg.fogColor);
    renderer.toneMappingExposure = cfg.exposure;

    const mult = interiorLightsEnabled ? cfg.interiorWarmMultiplier : 0.12;
    for (const item of interiorLights) {
      item.light.intensity = item.baseIntensity * mult;
    }

    materials.warmLightEmissive.emissiveIntensity = interiorLightsEnabled
      ? 1.8 * cfg.interiorWarmMultiplier
      : 0.15;
  };

  applyAmbiance('evening', true);

  return {
    group,
    applyAmbiance,
    dispose: () => {
      scene.environment = null;
      envRenderTarget.dispose();
      skyGeo.dispose();
      skyMat.dispose();
    },
  };
}
