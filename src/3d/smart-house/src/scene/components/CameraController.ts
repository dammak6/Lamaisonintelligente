import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CAMERA_PRESETS,
  CameraPresetId,
  clampCameraPosition,
} from '../architecturalState';

export interface CameraRig {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  transitionToPreset: (presetId: CameraPresetId) => void;
  stepTransition: (deltaSeconds: number, roofProgress: number) => boolean;
  handleResize: (width: number, height: number) => void;
  dispose: () => void;
}

// Pre-allocated scratch vector at module scope (zero GC in render loop)
const _clampedVec = new THREE.Vector3();

export function createCameraController(
  domElement: HTMLElement,
  isSoftwareGl: boolean,
  onCameraChange: () => void
): CameraRig {
  const initialPreset = CAMERA_PRESETS.exterior;

  const camera = new THREE.PerspectiveCamera(
    initialPreset.fov,
    domElement.clientWidth / Math.max(1, domElement.clientHeight),
    0.25,
    180
  );
  camera.position.set(
    initialPreset.position.x,
    initialPreset.position.y,
    initialPreset.position.z
  );

  const controls = new OrbitControls(camera, domElement);
  controls.target.set(
    initialPreset.target.x,
    initialPreset.target.y,
    initialPreset.target.z
  );
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI / 2 - 0.03; // Never dip below ground plane
  controls.minPolarAngle = 0.08;
  controls.minDistance = 4.2;
  controls.maxDistance = 42.0;
  controls.panSpeed = 0.8;
  controls.rotateSpeed = 0.75;

  let activeTransition = false;
  const targetPos = new THREE.Vector3(
    initialPreset.position.x,
    initialPreset.position.y,
    initialPreset.position.z
  );
  const targetLookAt = new THREE.Vector3(
    initialPreset.target.x,
    initialPreset.target.y,
    initialPreset.target.z
  );
  let targetFov = initialPreset.fov;

  // Cancel scripted transition when user manually orbits or pans
  const handleControlStart = () => {
    activeTransition = false;
  };

  const handleControlChange = () => {
    onCameraChange();
  };

  controls.addEventListener('start', handleControlStart);
  controls.addEventListener('change', handleControlChange);
  controls.update();

  const transitionToPreset = (presetId: CameraPresetId) => {
    const preset = CAMERA_PRESETS[presetId];
    targetPos.set(preset.position.x, preset.position.y, preset.position.z);
    targetLookAt.set(preset.target.x, preset.target.y, preset.target.z);
    targetFov = preset.fov;
    activeTransition = true;
    onCameraChange();
  };

  const stepTransition = (
    deltaSeconds: number,
    roofProgress: number
  ): boolean => {
    const dt = Math.min(Math.max(deltaSeconds, 0.001), 0.1);
    let stillMoving = false;

    if (activeTransition) {
      const lambda = isSoftwareGl ? 11.0 : 7.2;
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        targetPos.x,
        lambda,
        dt
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        targetPos.y,
        lambda,
        dt
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        targetPos.z,
        lambda,
        dt
      );

      controls.target.x = THREE.MathUtils.damp(
        controls.target.x,
        targetLookAt.x,
        lambda,
        dt
      );
      controls.target.y = THREE.MathUtils.damp(
        controls.target.y,
        targetLookAt.y,
        lambda,
        dt
      );
      controls.target.z = THREE.MathUtils.damp(
        controls.target.z,
        targetLookAt.z,
        lambda,
        dt
      );

      camera.lookAt(controls.target);

      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, lambda, dt);
        camera.updateProjectionMatrix();
      }

      const posDistSq = camera.position.distanceToSquared(targetPos);
      const lookDistSq = controls.target.distanceToSquared(targetLookAt);

      if (posDistSq < 0.0004 && lookDistSq < 0.0004) {
        camera.position.copy(targetPos);
        controls.target.copy(targetLookAt);
        camera.lookAt(targetLookAt);
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
        activeTransition = false;
        controls.update();
      } else {
        stillMoving = true;
      }
    } else {
      // Protection anti-collision appliquée pendant le contrôle manuel orbital
      const clamped = clampCameraPosition(
        {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        roofProgress
      );
      _clampedVec.set(clamped.x, clamped.y, clamped.z);
      camera.position.copy(_clampedVec);
      controls.update();
    }
    return stillMoving;
  };

  const handleResize = (width: number, height: number) => {
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  };

  return {
    camera,
    controls,
    transitionToPreset,
    stepTransition,
    handleResize,
    dispose: () => {
      controls.removeEventListener('start', handleControlStart);
      controls.removeEventListener('change', handleControlChange);
      controls.dispose();
    },
  };
}
