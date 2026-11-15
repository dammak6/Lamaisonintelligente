import React from 'react';
import {
  CAMERA_PRESETS,
  CameraPresetId,
  LIGHTING_AMBIANCES,
  LightingAmbianceId,
  RoofMode,
} from '../scene/architecturalState';
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Home,
  Layers,
  Lightbulb,
  Sun,
} from 'lucide-react';

interface ControlDockProps {
  activeCamera: CameraPresetId;
  onSelectCamera: (presetId: CameraPresetId) => void;
  roofMode: RoofMode;
  onSelectRoofMode: (mode: RoofMode) => void;
  roofTargetProgress: number;
  onScrubRoofProgress: (progress: number) => void;
  lightingAmbiance: LightingAmbianceId;
  onSelectLightingAmbiance: (ambiance: LightingAmbianceId) => void;
  interiorLightsOn: boolean;
  onToggleInteriorLights: () => void;
  dockCollapsed: boolean;
  onToggleDockCollapsed: () => void;
}

const MACRO_CAMERAS: CameraPresetId[] = ['exterior', 'overview', 'cutaway'];
const ROOM_CAMERAS: CameraPresetId[] = [
  'living',
  'kitchen',
  'hallway',
  'bedroom',
];
const AMBIANCE_IDS: LightingAmbianceId[] = ['daylight', 'golden', 'evening'];

export const ControlDock: React.FC<ControlDockProps> = ({
  activeCamera,
  onSelectCamera,
  roofMode,
  onSelectRoofMode,
  roofTargetProgress,
  onScrubRoofProgress,
  lightingAmbiance,
  onSelectLightingAmbiance,
  interiorLightsOn,
  onToggleInteriorLights,
  dockCollapsed,
  onToggleDockCollapsed,
}) => {
  const currentPreset = CAMERA_PRESETS[activeCamera];
  const roofPercentage = Math.round(roofTargetProgress * 100);

  return (
    <>
      {/* Minimal Architectural Title & Context Header (Top-Left, High-Contrast Dark Slate Surface) */}
      <header className="pointer-events-none fixed top-4 left-5 z-20 flex flex-col gap-0.5 rounded-xl border border-slate-700/80 bg-[#12161f]/95 px-4 py-2.5 shadow-xl select-none">
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-sm font-bold tracking-tight text-white whitespace-nowrap">
            LA MAISON INTELLIGENTE
          </h1>
          <span className="text-xs text-slate-400" aria-hidden="true">
            ·
          </span>
          <span className="text-xs font-medium text-amber-400 whitespace-nowrap">
            {currentPreset.frenchSubtitle}
          </span>
        </div>
        <p className="text-[11px] text-slate-300 whitespace-nowrap">
          <span>Contemporary Cutaway Residence</span>
          <span className="mx-1.5 text-slate-500" aria-hidden="true">
            ·
          </span>
          <span className="font-mono tabular-nums text-slate-200">
            Roof State: {roofMode} ({roofPercentage}%)
          </span>
        </p>
      </header>

      {/* Unified Collapsible Bottom Control Dock (Centered via Flex Wrapper, Zero Side-Panel Clutter) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-20 flex justify-center px-3">
        <div
          className="pointer-events-auto w-full max-w-[920px] transition-transform duration-200 ease-out"
          style={{
            transform: dockCollapsed
              ? 'translateY(calc(100% - 32px))'
              : 'translateY(0)',
          }}
        >
          {/* Collapse / Expand Drawer Handle */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onToggleDockCollapsed}
              aria-expanded={!dockCollapsed}
              aria-label={
                dockCollapsed
                  ? 'Show architectural controls'
                  : 'Hide architectural controls'
              }
              className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-slate-700/80 bg-[#12161f] px-4 py-1 text-xs font-medium text-slate-200 hover:bg-[#191f2c] hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {dockCollapsed ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 text-amber-400" />
                  <span>Show Controls (H)</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  <span>Hide Controls (H)</span>
                </>
              )}
            </button>
          </div>

          {/* Main Dock Surface (Compact, solid dark slate without backdrop-filter) */}
          <section
            aria-label="Architectural Visualization Controls"
            className="rounded-xl border border-slate-700/80 bg-[#12161f]/95 px-4 py-3 shadow-2xl"
          >
            <div className="flex flex-col gap-2.5">
              {/* Row 1: Roof Architecture State + Articulation Slider + Lighting Ambiance */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 pb-2.5">
              {/* Roof Mode Selector & Continuous Articulation Slider */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>Roof Mode</span>
                </div>

                <div
                  role="group"
                  aria-label="Roof Architectural Mode"
                  className="flex items-center gap-1 rounded-lg bg-[#0b0e14] p-1 border border-slate-800/90"
                >
                  <button
                    type="button"
                    onClick={() => onSelectRoofMode('EXTERIOR')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      roofMode === 'EXTERIOR'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Exterior Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoofMode('INTERIOR')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      roofMode === 'INTERIOR'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Interior Mode
                  </button>
                </div>

                {/* Continuous Roof Articulation Scrubber */}
                <div className="flex items-center gap-2 pl-1">
                  <label
                    htmlFor="roof-elevation-slider"
                    className="text-xs text-slate-400 whitespace-nowrap"
                  >
                    Elevation
                  </label>
                  <input
                    id="roof-elevation-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={roofPercentage}
                    onChange={(e) =>
                      onScrubRoofProgress(Number(e.target.value) / 100)
                    }
                    className="h-1.5 w-24 accent-amber-400 cursor-pointer bg-slate-800 rounded-lg"
                  />
                  <span className="w-9 text-right font-mono text-xs tabular-nums text-slate-300">
                    {roofPercentage}%
                  </span>
                </div>
              </div>

              {/* Lighting Ambiance & Interior Fixtures */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap">
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Lighting</span>
                </div>

                <div
                  role="group"
                  aria-label="Lighting Ambiance"
                  className="flex items-center gap-1 rounded-lg bg-[#0b0e14] p-1 border border-slate-800/90"
                >
                  {AMBIANCE_IDS.map((ambId) => {
                    const cfg = LIGHTING_AMBIANCES[ambId];
                    const active = lightingAmbiance === ambId;
                    return (
                      <button
                        key={ambId}
                        type="button"
                        onClick={() => onSelectLightingAmbiance(ambId)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-slate-800 text-amber-300 border border-slate-700'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={onToggleInteriorLights}
                  aria-pressed={interiorLightsOn}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    interiorLightsOn
                      ? 'border-amber-500/50 bg-amber-500/15 text-amber-200'
                      : 'border-slate-800 bg-[#0b0e14] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Interior Lights</span>
                </button>
              </div>
            </div>

            {/* Row 2: Cinematic Camera Views (Architectural Macro + Room Close-Ups) */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Macro Architectural Views */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap">
                  <Camera className="h-3.5 w-3.5 text-amber-400" />
                  <span>Views</span>
                </div>
                <div
                  role="group"
                  aria-label="Architectural Camera Views"
                  className="flex items-center gap-1 rounded-lg bg-[#0b0e14] p-1 border border-slate-800/90"
                >
                  {MACRO_CAMERAS.map((camId) => {
                    const preset = CAMERA_PRESETS[camId];
                    const isSelected = activeCamera === camId;
                    return (
                      <button
                        key={camId}
                        type="button"
                        onClick={() => onSelectCamera(camId)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-200 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room Close-Up Camera Views */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap">
                  <Home className="h-3.5 w-3.5 text-amber-400" />
                  <span>Rooms</span>
                </div>
                <div
                  role="group"
                  aria-label="Room Close-Up Camera Views"
                  className="flex flex-wrap items-center gap-1 rounded-lg bg-[#0b0e14] p-1 border border-slate-800/90"
                >
                  {ROOM_CAMERAS.map((camId) => {
                    const preset = CAMERA_PRESETS[camId];
                    const isSelected = activeCamera === camId;
                    return (
                      <button
                        key={camId}
                        type="button"
                        onClick={() => onSelectCamera(camId)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
