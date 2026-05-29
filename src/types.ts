export interface GroupNode {
  id: number;
  label: string;
  // Perfect balanced coordinates
  bx: number;
  by: number;
  bz: number;
  // Current dynamic coordinates (for simulation of balancing)
  x: number;
  y: number;
  z: number;
  // Orbital parameters
  orbitId: number;
  phase: number;
  weight: number;
}

export interface GroupEdge {
  source: number;
  target: number;
  generatorId: number; // 0 for generator 'a', 1 for generator 'b', etc.
  type: 'cycle' | 'reflection' | 'coupling';
}

export interface GroupConfig {
  id: string;
  name: string;
  symbol: string;
  order: number;
  description: string;
  generatorsDescription: string;
  generators: string[]; // e.g. ["a: Rotation (2π/n)", "b: Reflection", "c: Dimension Shift"]
}

export interface SimulationParams {
  groupType: string;
  damping: number;
  coupling: number;
  warp: number;
  phaseOffset: number;
  noise: number;
  isBalanced: boolean;
  balanceSpeed: number; // rate of transition to balanced coordinates
  aeonCount: number; // cosmetic and cyclic aeon epochs count
  zeroShieldStability: number; // Dynamic real-time percentage of shield containment
  isShieldingTriggered?: boolean;
  nucleonConfig?: 'neutron' | 'hydrogen1' | 'deuterium' | 'tritium' | 'helium4' | 'pentaneutron_5d' | 'majorana_5d';
  blackHoleTimeCompression?: number;
}

export interface SelectedParticleStats {
  id: string;
  name: string;
  system: 'sub' | 'meta';
  type: string; // e.g. "down-quark", "up-quark", "electron", "positron", "antineutrino"
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  speed: number;
  charge: string;
  mass: string;
  interactionState: string;
  life: number;
  maxLife: number;
  instructions?: string[];
  currentInstructionIndex?: number;
}

export interface ZigFile {
  name: string;
  path: string;
  description: string;
  content: string;
}
