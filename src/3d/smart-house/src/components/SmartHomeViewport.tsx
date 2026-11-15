import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  CAMERA_PRESETS,
  CameraPresetId,
  LightingAmbianceId,
  RoofMode,
} from '../scene/architecturalState';
import { createArchitecturalMaterials } from '../scene/materials';
import { createLightingSystem, LightingRig } from '../scene/components/LightingSystem';
import { createExteriorGarden } from '../scene/components/ExteriorGarden';
import { createHouseArchitecture } from '../scene/components/HouseArchitecture';
import { createRoofSystem, RoofAssembly } from '../scene/components/RoofSystem';
import { createFurnitureAndDecor } from '../scene/components/FurnitureAndDecor';
import {
  createCameraController,
  CameraRig,
} from '../scene/components/CameraController';
import { ControlDock } from './ControlDock';

export interface SmartHomeViewportProps {
  initialCamera?: CameraPresetId;
  initialRoofMode?: RoofMode;
  initialAmbiance?: LightingAmbianceId;
}

export const SmartHomeViewport: React.FC<SmartHomeViewportProps> = ({
  initialCamera = 'exterior',
  initialRoofMode = 'EXTERIOR',
  initialAmbiance = 'daylight',
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  const [activeCamera, setActiveCamera] =
    useState<CameraPresetId>(initialCamera);
  const [roofMode, setRoofMode] = useState<RoofMode>(initialRoofMode);
  const [roofTargetProgress, setRoofTargetProgress] = useState<number>(
    initialRoofMode === 'INTERIOR' ? 1 : 0
  );
  const [lightingAmbiance, setLightingAmbiance] =
    useState<LightingAmbianceId>(initialAmbiance);
  const [interiorLightsOn, setInteriorLightsOn] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [webglLost, setWebglLost] = useState<boolean>(false);

  // Mutable refs for the WebGL loop so React state changes never recreate the scene
  const roofTargetRef = useRef<number>(initialRoofMode === 'INTERIOR' ? 1 : 0);
  const roofCurrentRef = useRef<number>(initialRoofMode === 'INTERIOR' ? 1 : 0);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const cameraRigRef = useRef<CameraRig | null>(null);
  const lightingRigRef = useRef<LightingRig | null>(null);
  const roofAssemblyRef = useRef<RoofAssembly | null>(null);

  // Handlers wired to both React UI and Three.js refs
  const handleSelectRoofMode = useCallback((mode: RoofMode) => {
    setRoofMode(mode);
    const target = mode === 'INTERIOR' ? 1.0 : 0.0;
    setRoofTargetProgress(target);
    roofTargetRef.current = target;
    requestRenderRef.current?.();
  }, []);

  const handleScrubRoofProgress = useCallback((progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    setRoofTargetProgress(clamped);
    setRoofMode(clamped >= 0.5 ? 'INTERIOR' : 'EXTERIOR');
    roofTargetRef.current = clamped;
    requestRenderRef.current?.();
  }, []);

  const handleSelectCamera = useCallback((presetId: CameraPresetId) => {
    setActiveCamera(presetId);
    const preset = CAMERA_PRESETS[presetId];
    // Automatically coordinate roof state so camera is never blocked by roof panels
    const targetRoof = preset.recommendedRoofMode === 'INTERIOR' ? 1.0 : 0.0;
    setRoofMode(preset.recommendedRoofMode);
    setRoofTargetProgress(targetRoof);
    roofTargetRef.current = targetRoof;

    cameraRigRef.current?.transitionToPreset(presetId);
    requestRenderRef.current?.();
  }, []);

  const handleSelectLightingAmbiance = useCallback(
    (ambiance: LightingAmbianceId) => {
      setLightingAmbiance(ambiance);
      lightingRigRef.current?.applyAmbiance(ambiance, interiorLightsOn);
      requestRenderRef.current?.();
    },
    [interiorLightsOn]
  );

  const handleToggleInteriorLights = useCallback(() => {
    setInteriorLightsOn((prev) => {
      const next = !prev;
      lightingRigRef.current?.applyAmbiance(lightingAmbiance, next);
      requestRenderRef.current?.();
      return next;
    });
  }, [lightingAmbiance]);

  const handleToggleDockCollapsed = useCallback(() => {
    setDockCollapsed((prev) => !prev);
  }, []);

  // Keyboard shortcuts ('H' to toggle controls dock, 'R' to toggle roof mode, '1'-'7' for cameras)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'h') {
        setDockCollapsed((prev) => !prev);
      } else if (key === 'r') {
        const nextMode: RoofMode =
          roofTargetRef.current < 0.5 ? 'INTERIOR' : 'EXTERIOR';
        handleSelectRoofMode(nextMode);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSelectRoofMode]);

  // Initialize Three.js WebGLRenderer & Architectural Scene once on mount
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software-WebGL Guard (detects SwiftShader / llvmpipe / softpipe)
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.setAttribute('data-testid', 'smart-home-canvas');
    canvas.className = 'block w-full h-full outline-none';
    container.appendChild(canvas);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglLost(true);
    };
    const onContextRestored = () => {
      setWebglLost(false);
      requestRender();
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // 2. Scene & Modular Architectural Hierarchy
    const scene = new THREE.Scene();

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTimestamp = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        const rawDt = (now - lastTimestamp) / 1000;
        const dt = isSoftwareGl
          ? Math.min(Math.max(rawDt, 0.085), 0.16)
          : Math.min(Math.max(rawDt, 0.004), 0.1);
        lastTimestamp = now;

        // Smoothly damp roof articulation toward roofTargetRef.current
        const roofDiff = Math.abs(
          roofCurrentRef.current - roofTargetRef.current
        );
        let roofMoving = false;
        if (roofDiff > 0.002) {
          roofCurrentRef.current = THREE.MathUtils.damp(
            roofCurrentRef.current,
            roofTargetRef.current,
            isSoftwareGl ? 11.0 : 7.0,
            dt
          );
          roofAssembly.updateRoofProgress(roofCurrentRef.current);
          roofMoving = true;
        } else if (roofDiff > 0) {
          roofCurrentRef.current = roofTargetRef.current;
          roofAssembly.updateRoofProgress(roofCurrentRef.current);
        }

        const camMoving = cameraRig.stepTransition(dt, roofCurrentRef.current);

        renderer.render(scene, cameraRig.camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty || roofMoving || camMoving) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    requestRenderRef.current = requestRender;

    // 3. Build Materials, Lighting, Garden, Architecture, Roof, Furniture, and Camera
    const materials = createArchitecturalMaterials(
      renderer,
      isSoftwareGl,
      requestRender
    );

    const lightingRig = createLightingSystem(
      scene,
      renderer,
      materials,
      isSoftwareGl
    );
    lightingRigRef.current = lightingRig;
    scene.add(lightingRig.group);

    const gardenGroup = createExteriorGarden(materials);
    scene.add(gardenGroup);

    const houseGroup = createHouseArchitecture(materials);
    scene.add(houseGroup);

    const roofAssembly = createRoofSystem(materials);
    roofAssemblyRef.current = roofAssembly;
    scene.add(roofAssembly.group);

    const furnitureGroup = createFurnitureAndDecor(materials);
    scene.add(furnitureGroup);

    const cameraRig = createCameraController(
      canvas,
      isSoftwareGl,
      requestRender
    );
    cameraRigRef.current = cameraRig;

    if (!isSoftwareGl) {
      renderer.compile(scene, cameraRig.camera);
    }

    const onWindowResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRig.handleResize(w, h);
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', onWindowResize);

    // Trigger initial render
    requestRender();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      requestRenderRef.current = null;
      cameraRig.dispose();
      lightingRig.dispose();
      materials.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <main
      data-state-camera={activeCamera}
      data-state-roof={roofMode}
      data-state-ambiance={lightingAmbiance}
      className="relative h-screen w-screen overflow-hidden bg-[#0e1116] select-none"
    >
      {/* Dedicated Empty WebGL Canvas Mount Container */}
      <div
        ref={canvasMountRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Graceful Fallback if WebGL Context is Lost */}
      {webglLost && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/90 p-6 text-center">
          <div className="max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold text-white">
              3D Viewport Paused
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              The WebGL graphics context was interrupted. It will automatically
              restore when resources become available.
            </p>
          </div>
        </div>
      )}

      {/* Unified Collapsible Bottom Control Dock & Top-Left Architectural Header */}
      <ControlDock
        activeCamera={activeCamera}
        onSelectCamera={handleSelectCamera}
        roofMode={roofMode}
        onSelectRoofMode={handleSelectRoofMode}
        roofTargetProgress={roofTargetProgress}
        onScrubRoofProgress={handleScrubRoofProgress}
        lightingAmbiance={lightingAmbiance}
        onSelectLightingAmbiance={handleSelectLightingAmbiance}
        interiorLightsOn={interiorLightsOn}
        onToggleInteriorLights={handleToggleInteriorLights}
        dockCollapsed={dockCollapsed}
        onToggleDockCollapsed={handleToggleDockCollapsed}
      />
    </main>
  );
};
