import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAMERA_PRESETS,
  computeRoofPanelTransforms,
  clampCameraPosition,
  easeInOutCubic,
} from './architecturalState';

test('easeInOutCubic clamps boundaries and is monotonic', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(1), 1);
  assert.equal(easeInOutCubic(-0.5), 0);
  assert.equal(easeInOutCubic(1.5), 1);
  assert.equal(easeInOutCubic(0.5), 0.5);
  assert.ok(easeInOutCubic(0.25) < easeInOutCubic(0.75));
});

test('computeRoofPanelTransforms returns zero offsets in EXTERIOR mode (progress=0)', () => {
  const closed = computeRoofPanelTransforms(0);
  assert.equal(closed.mainSuite.offset.x, 0);
  assert.equal(closed.mainSuite.offset.y, 0);
  assert.equal(closed.mainSuite.offset.z, 0);
  assert.equal(closed.centerSkylight.offset.y, 0);
  assert.equal(closed.terracePergola.offset.y, 0);
});

test('computeRoofPanelTransforms lifts panels upward and outward in INTERIOR mode (progress=1)', () => {
  const open = computeRoofPanelTransforms(1);
  // All panels must lift upward (+Y) and move backward/outward (-Z and +-X) so they never block front cutaway camera
  assert.ok(open.mainSuite.offset.y > 3.0);
  assert.ok(open.mainSuite.offset.x < -1.5);
  assert.ok(open.mainSuite.offset.z < -2.0);

  assert.ok(open.centerSkylight.offset.y > 3.5);
  assert.ok(open.centerSkylight.offset.z < -2.5);

  assert.ok(open.terracePergola.offset.y > 2.8);
  assert.ok(open.terracePergola.offset.x > 1.5);
  assert.ok(open.terracePergola.offset.z < -2.0);
});

test('clampCameraPosition prevents camera from clipping inside walls or under roof', () => {
  // Attempt to move camera inside the living room box at z = 1.0
  const clamped = clampCameraPosition({ x: -3.5, y: 2.2, z: 1.0 }, 0);
  assert.ok(clamped.z >= 5.2, 'Camera Z should be pushed outside the cutaway plane');
  assert.ok(clamped.y >= 0.75, 'Camera Y should stay above ground plane');

  // Camera below ground should clamp to minY
  const underground = clampCameraPosition({ x: -12, y: -4, z: 15 }, 1);
  assert.equal(underground.y, 0.75);
});

test('all camera presets have valid non-clipping positions and recommended roof modes', () => {
  for (const preset of Object.values(CAMERA_PRESETS)) {
    const progress = preset.recommendedRoofMode === 'INTERIOR' ? 1 : 0;
    const clamped = clampCameraPosition(preset.position, progress);
    assert.equal(clamped.x, preset.position.x, `Preset ${preset.id} X should not clip`);
    assert.equal(clamped.y, preset.position.y, `Preset ${preset.id} Y should not clip`);
    assert.equal(clamped.z, preset.position.z, `Preset ${preset.id} Z should not clip`);
  }
});
