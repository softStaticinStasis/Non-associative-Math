import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Zap, HelpCircle, Flame, ShieldAlert, Cpu, Shield } from 'lucide-react';

// Float-safe scalar/coordinate sanitization layer to protect against NaNs or Infinities under high density transitions
const floatCheat = (val: number, fallback: number = 0): number => {
  if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
    return fallback;
  }
  return val;
};

// Recursively cuts and regulates explosive source of energy in hyper-dense extra dimensions
const recursiveFloatCheat = (val: number, fallback: number = 0, depth: number = 3): number => {
  return floatCheat(val, fallback);
};

// Double-wrapped float-safe protection layer to "float cheat the float cheat each time we move out of order"
const doubleFloatCheat = (val: number, fallback: number = 0): number => {
  return floatCheat(val, fallback);
};

interface DecayParticle {
  id: number;
  type: 'electron' | 'positron' | 'antineutrino' | 'positronium' | 'w-boson' | 'w+boson' | 'z-boson' | 'deuterium-seed' | 'tritium-seed' | 'alpha-seed';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  charge: number;
  trail: { x: number; y: number; z: number }[];
  life: number;
  maxLife: number;
  size: number;
  label?: string;
  instructions?: string[];
}

interface VisualPhoton {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  freq: number;
}

const getDynamicQuarks = (
  config: string,
  tremble: number,
  failureDriftScale: number,
  isBalanced: boolean,
  phase: string,
  qTrans: number
) => {
  const nucleonsDef: { type: 'Neutron' | 'Proton' | 'Majorana'; label: string; cx: number; cy: number; cz: number }[] = [];
  if (config === 'neutron') {
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #1', cx: 0, cy: 0, cz: 0 });
  } else if (config === 'hydrogen1') {
    nucleonsDef.push({ type: 'Proton', label: 'Proton #1', cx: 0, cy: 0, cz: 0 });
  } else if (config === 'deuterium') {
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #1', cx: -24, cy: -6, cz: 0 });
    nucleonsDef.push({ type: 'Proton', label: 'Proton #1', cx: 24, cy: 6, cz: 0 });
  } else if (config === 'tritium') {
    nucleonsDef.push({ type: 'Proton', label: 'Proton #1', cx: 0, cy: 24, cz: 0 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #1', cx: -24, cy: -14, cz: -8 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #2', cx: 24, cy: -14, cz: 8 });
  } else if (config === 'helium4') {
    nucleonsDef.push({ type: 'Proton', label: 'Proton #1', cx: -22, cy: 22, cz: -4 });
    nucleonsDef.push({ type: 'Proton', label: 'Proton #2', cx: 22, cy: -22, cz: 4 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #1', cx: -22, cy: -22, cz: 4 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #2', cx: 22, cy: 22, cz: -4 });
  } else if (config === 'pentaneutron_5d') {
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #1 (5D-α)', cx: -32, cy: -12, cz: 10 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #2 (5D-β)', cx: 32, cy: -12, cz: -10 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #3 (5D-γ)', cx: 0, cy: 36, cz: -18 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #4 (5D-δ)', cx: -15, cy: 15, cz: 25 });
    nucleonsDef.push({ type: 'Neutron', label: 'Neutron #5 (5D-ε)', cx: 15, cy: 15, cz: -25 });
  } else if (config === 'majorana_5d') {
    nucleonsDef.push({ type: 'Majorana', label: 'ψ_L (Chiral Spinor)', cx: -18, cy: -8, cz: 10 });
    nucleonsDef.push({ type: 'Majorana', label: 'ψ_R (Chiral Spinor)', cx: 18, cy: 8, cz: -10 });
  }

  const qDrift = (qid: number, axis: 'x' | 'y' | 'z') => {
    const oscSpeed = 0.0015 + qid * 0.0006;
    const phaseOffset = qid * 2.0 + (axis === 'x' ? 0 : axis === 'y' ? 2.5 : 5.0);
    return doubleFloatCheat(Math.sin(Date.now() * oscSpeed + phaseOffset) * failureDriftScale, 0);
  };

  const quarks = [];
  let quarkCounter = 1;
  const blendColors = (c1: string, c2: string, pct: number) => {
    const r1 = parseInt(c1.substring(1, 3), 16);
    const g1 = parseInt(c1.substring(3, 5), 16);
    const b1 = parseInt(c1.substring(5, 7), 16);
    const r2 = parseInt(c2.substring(1, 3), 16);
    const g2 = parseInt(c2.substring(3, 5), 16);
    const b2 = parseInt(c2.substring(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * pct);
    const g = Math.round(g1 + (g2 - g1) * pct);
    const b = Math.round(b1 + (b2 - b1) * pct);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  for (let i = 0; i < nucleonsDef.length; i++) {
    const n = nucleonsDef[i];
    if (n.type === 'Neutron') {
      const idA = quarkCounter++;
      quarks.push({
        id: idA,
        nucleonType: 'Neutron',
        nucleonLabel: n.label,
        type: 'down',
        label: 'd',
        charge: '-1/3',
        ox: n.cx - 10 + tremble + qDrift(idA, 'x'),
        oy: n.cy - 8 + tremble + qDrift(idA, 'y'),
        oz: n.cz - 5 + qDrift(idA, 'z'),
        bColor: '#06b6d4',
        mass: '4.8 MeV/c²',
        isTransmutable: false,
        name: `d-Quark #${idA}`
      });

      const idB = quarkCounter++;
      quarks.push({
        id: idB,
        nucleonType: 'Neutron',
        nucleonLabel: n.label,
        type: 'up',
        label: 'u',
        charge: '+2/3',
        ox: n.cx + 10 + tremble + qDrift(idB, 'x'),
        oy: n.cy + 12 + tremble + qDrift(idB, 'y'),
        oz: n.cz + 2 + qDrift(idB, 'z'),
        bColor: '#f59e0b',
        mass: '2.3 MeV/c²',
        isTransmutable: false,
        name: `u-Quark #${idB}`
      });

      const idC = quarkCounter++;
      const currentType = qTrans > 0.5 ? 'up' : 'down';
      const currentLabel = qTrans > 0.5 ? 'u' : 'd';
      const currentCharge = qTrans > 0.5 ? '+2/3' : '-1/3';
      const currentColor = qTrans > 0.01 ? blendColors('#06b6d4', '#e11d48', qTrans) : '#06b6d4';
      const currentMass = qTrans > 0.5 ? '2.3 MeV/c²' : '4.8 MeV/c²';

      quarks.push({
        id: idC,
        nucleonType: 'Neutron',
        nucleonLabel: n.label,
        type: currentType,
        label: currentLabel,
        charge: currentCharge,
        ox: n.cx - 2 + tremble + qDrift(idC, 'x'),
        oy: n.cy - 4 + tremble + qDrift(idC, 'y'),
        oz: n.cz + 8 + qDrift(idC, 'z'),
        bColor: currentColor,
        mass: currentMass,
        isTransmutable: true,
        name: `d-Quark #${idC} (Transmutable)`
      });
    } else if (n.type === 'Proton') {
      const idA = quarkCounter++;
      quarks.push({
        id: idA,
        nucleonType: 'Proton',
        nucleonLabel: n.label,
        type: 'up',
        label: 'u',
        charge: '+2/3',
        ox: n.cx - 10 + tremble + qDrift(idA, 'x'),
        oy: n.cy - 8 + tremble + qDrift(idA, 'y'),
        oz: n.cz - 5 + qDrift(idA, 'z'),
        bColor: '#f59e0b',
        mass: '2.3 MeV/c²',
        isTransmutable: false,
        name: `u-Quark #${idA}`
      });

      const idB = quarkCounter++;
      quarks.push({
        id: idB,
        nucleonType: 'Proton',
        nucleonLabel: n.label,
        type: 'down',
        label: 'd',
        charge: '-1/3',
        ox: n.cx + 10 + tremble + qDrift(idB, 'x'),
        oy: n.cy + 12 + tremble + qDrift(idB, 'y'),
        oz: n.cz + 2 + qDrift(idB, 'z'),
        bColor: '#06b6d4',
        mass: '4.8 MeV/c²',
        isTransmutable: false,
        name: `d-Quark #${idB}`
      });

      const idC = quarkCounter++;
      quarks.push({
        id: idC,
        nucleonType: 'Proton',
        nucleonLabel: n.label,
        type: 'up',
        label: 'u',
        charge: '+2/3',
        ox: n.cx - 2 + tremble + qDrift(idC, 'x'),
        oy: n.cy - 4 + tremble + qDrift(idC, 'y'),
        oz: n.cz + 8 + qDrift(idC, 'z'),
        bColor: '#f59e0b',
        mass: '2.3 MeV/c²',
        isTransmutable: false,
        name: `u-Quark #${idC}`
      });
    } else if (n.type === 'Majorana') {
      // 5D Majorana Spinor contains 3 highly-entangled extra-dimensional coordinates (ψ_L, ψ_R, ψ_0)
      const idA = quarkCounter++;
      quarks.push({
        id: idA,
        nucleonType: 'Majorana',
        nucleonLabel: n.label,
        type: 'weyl_left',
        label: 'ψ_L',
        charge: '0.0',
        ox: n.cx - 8 + tremble + qDrift(idA, 'x'),
        oy: n.cy - 6 + tremble + qDrift(idA, 'y'),
        oz: n.cz - 5 + qDrift(idA, 'z'),
        bColor: '#8b5cf6', // Violet
        mass: '0.0 eV / Weyl limit',
        isTransmutable: true,
        name: `ψ_L (Left-handed Chirality Tensor)`
      });

      const idB = quarkCounter++;
      quarks.push({
        id: idB,
        nucleonType: 'Majorana',
        nucleonLabel: n.label,
        type: 'weyl_right',
        label: 'ψ_R',
        charge: '0.0',
        ox: n.cx + 8 + tremble + qDrift(idB, 'x'),
        oy: n.cy + 8 + tremble + qDrift(idB, 'y'),
        oz: n.cz + 5 + qDrift(idB, 'z'),
        bColor: '#ec4899', // Pink
        mass: '0.0 eV / Weyl limit',
        isTransmutable: true,
        name: `ψ_R (Right-handed Chirality Tensor)`
      });

      const idC = quarkCounter++;
      quarks.push({
        id: idC,
        nucleonType: 'Majorana',
        nucleonLabel: n.label,
        type: 'weyl_zero',
        label: 'ψ_0',
        charge: '0.0',
        ox: n.cx + tremble + qDrift(idC, 'x'),
        oy: n.cy - 4 + tremble + qDrift(idC, 'y'),
        oz: n.cz + 10 + qDrift(idC, 'z'),
        bColor: '#fbbf24', // Yellow Gold
        mass: '0.0 eV / Majorana Phase',
        isTransmutable: true,
        name: `ψ_0 (Lorentz Scalar Phase Core)`
      });
    }
  }

  return quarks;
};

const getParticleInstructions = (type: string): string[] => {
  switch (type) {
    case 'electron':
      return [
        "RELATIVISTIC_EMISSION: Symmetry-breaking beta decay catapults the electron outwards at near-lightspeed.",
        "WEAK_DRIFT_STEERING: The orbital trajectory is continuously governed by weak interaction vector forces.",
        "RESONANCE_DETECTION: Searching nearby regions for stable antimatter to spark positronium fusion.",
        "CONFINEMENT_COLLAPSE: Re-integrating into the main nucleus or falling into the central singularity state."
      ];
    case 'positron':
      return [
        "POSIT_EMISSION: Mirror leptonic channel ejection with positive fundamental unit charge.",
        "LEPTOMETRIC_COUPLING: Sweeping space to attract an opposite electron partner.",
        "COHERENCE_BONDING: Resolving mutual kinetic spin into stable positronium.",
        "CORE_CONDENSATION: Retreating into the central nucleon potential well to balance local delta energy."
      ];
    case 'antineutrino':
      return [
        "GHOST_EJECTION: Zero electric coupling allows antineutrino to exceed containment orbits.",
        "FIELD_BOUNDS_PENETRATION: Sailing through the Zero Shield confinement with zero electrostatic friction.",
        "INTERACTION_DECAY: Mediating intermediate vector boson spin-exchanges upon direct seed collisions.",
        "COSMIC_PROPAGATION: Escaping nuclear boundaries to seed the background micro-entropy of the aeon."
      ];
    case 'positronium':
      return [
        "EXOTIC_BOND: Temporary e⁺e⁻ electromagnetic equilibrium maintains double-orbital rotation.",
        "CORE_FIELD_SWIRL: Scanning central field lines for heavy intermediate gauge bosons.",
        "SEED_COALESCENCE: Fusing with active force-carriers to initialize heavy isotopic cluster nucleation."
      ];
    case 'w-boson':
      return [
        "WEAK_VECTOR_DECAY: Heavy spin-1 gauge boson conveying negative unit electromagnetic charge.",
        "FLAVOR_TRANSMUTATION: Inducing local nucleon transformations from up to down configuration states.",
        "SEEDIFICATION_CAPTURE: Merging with nearby charges to develop basic Deuterium and Tritium seed grids."
      ];
    case 'w+boson':
      return [
        "WEAK_VECTOR_DECAY: Heavy spin-1 gauge boson conveying positive unit electromagnetic charge.",
        "FLAVOR_TRANSMUTATION: Inducing local nucleon transformations from down to up configuration states.",
        "SEEDIFICATION_CAPTURE: Merging with nearby charges to develop basic Deuterium and Tritium seed grids."
      ];
    case 'z-boson':
      return [
        "WEAK_NEUTRAL_CARRIER: Highly massive neutral mediator balancing electrostatic and baryonic forces.",
        "ISOMER_HYPER_STABILIZE: Binding existing seeds together into extremely tight nuclear clusters.",
        "ALPHA_CATALYSIS: Guiding multiple seed particles into the perfect tetrahedral Helium-4 core state."
      ];
    case 'deuterium-seed':
      return [
        "BARYONIC_CLUSTER_BINDING: Strong interactions coupling proton-neutron cluster coordinates.",
        "TRITIUM_PRE_TRANSITION: Attracting additional lepton ejecta to capture orbital neutrons.",
        "ALPHA_SEPARATION: Resolving nuclear force lines in preparation for secondary alpha shell formation."
      ];
    case 'tritium-seed':
      return [
        "HALO_RESONANCE: Extended multipole states binding tritium's heavy neutron shell.",
        "HELIUM_MASS_MUTATION: Absorbing weak neutral carriers to trigger mass balance decay.",
        "ALPHA_SEEDIFICATION: Organizing nucleonic vertices into highly symmetrical Helium-4 geometries."
      ];
    case 'alpha-seed':
      return [
        "ALPHA_CORE_DOMINANCE: Highly stable double-proton, double-neutron alpha cluster.",
        "MASS_DEFECT_STABILIZE: Releasing energy to seal local coordinates at absolute zero state.",
        "PRIMORDIAL_INTEGRATION: Leading the nucleation template of successive multi-atomic structures."
      ];
    default:
      return [
        "QUANTUM_EXCITATION: General elementary particle boundary initialization.",
        "VACUUM_DECAY: Dissipating path coordinates under global metric parameters."
      ];
  }
};

interface RendererProps {
  params: any;
  setParams: React.Dispatch<React.SetStateAction<any>>;
  onInject: () => void;
  selectedGroup?: any;
  selectedParticleIds?: string[];
  setSelectedParticlesStats?: (stats: any[]) => void;
  onUpdateActiveLeptons?: (leptons: any[]) => void;
}

export default function BigCycleRenderer({ 
  params, 
  setParams, 
  onInject, 
  selectedParticleIds = ["quark-3"], 
  setSelectedParticlesStats,
  onUpdateActiveLeptons
}: RendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // High performance refs for physics and rendering loops
  const particlesRef = useRef<DecayParticle[]>([]);
  const photonsRef = useRef<VisualPhoton[]>([]);
  const cameraAngleRef = useRef({ x: 0.5, y: 0.5 });
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const corePulseRef = useRef(1);
  const flashIntensityRef = useRef(0);

  // Thermodynamic dynamic refs for cycle execution
  const stableFramesRef = useRef(0);
  const manifoldStressRef = useRef(0);
  const coherenceRef = useRef(100);
  const entropyRef = useRef(0);
  const totalSpawnedRef = useRef(0);
  const returnedParticlesRef = useRef(0);
  const phaseRef = useRef<'coherent' | 'shielding' | 'broken' | 'condensing'>('coherent');
  const shieldStabilityRef = useRef<number>(0);
  const quarksTransmutationRef = useRef<number>(0);

  // React state elements for controlling active modes and updating controls dynamically
  const [autoCycle, setAutoCycle] = useState<boolean>(true);
  const [manifoldStress, setManifoldStress] = useState<number>(0);
  const [simulationPhase, setSimulationPhase] = useState<'coherent' | 'shielding' | 'broken' | 'condensing'>('coherent');

  // Lightweight React state for UI Telemetry (updated relative to frame-rate throttling to prevent UI lag)
  const [entropy, setEntropy] = useState<number>(0.00);
  const [coherence, setCoherence] = useState<number>(100);
  const [totalDecays, setTotalDecays] = useState<number>(0);
  const [countStats, setCountStats] = useState({ minus: 0, plus: 0, neutrinos: 0 });
  const [hasActiveParticles, setHasActiveParticles] = useState(false);

  // Core ring nodes properties in standard projection coordinates
  const coreNodesCount = 36;

  // Initialize
  useEffect(() => {
    resetToAbsoluteZero(false);
  }, []);

  const resetToAbsoluteZero = (preserveAeonCount: boolean = false) => {
    particlesRef.current = [];
    photonsRef.current = [];
    stableFramesRef.current = 0;
    manifoldStressRef.current = 0;
    coherenceRef.current = 100;
    entropyRef.current = 0.00;
    totalSpawnedRef.current = 0;
    returnedParticlesRef.current = 0;
    phaseRef.current = 'coherent';
    shieldStabilityRef.current = 0;
    quarksTransmutationRef.current = 0;

    setHasActiveParticles(false);
    setEntropy(0.00);
    setCoherence(100);
    setTotalDecays(0);
    setCountStats({ minus: 0, plus: 0, neutrinos: 0 });
    setManifoldStress(0);
    setSimulationPhase('coherent');
    setParams((p: any) => ({ 
      ...p, 
      isBalanced: true,
      zeroShieldStability: 0,
      ...(preserveAeonCount ? {} : { aeonCount: 1, blackHoleTimeCompression: 1.0 })
    }));
  };

  const completeAeonCycle = () => {
    particlesRef.current = [];
    photonsRef.current = [];
    stableFramesRef.current = 0;
    manifoldStressRef.current = 0;
    coherenceRef.current = 100;
    entropyRef.current = 0.00;
    totalSpawnedRef.current = 0;
    returnedParticlesRef.current = 0;
    phaseRef.current = 'coherent';
    shieldStabilityRef.current = 0;

    setHasActiveParticles(false);
    setEntropy(0.00);
    setCoherence(100);
    setManifoldStress(0);
    setSimulationPhase('coherent');
    setParams((p: any) => {
      const isNeutron = p.nucleonConfig === 'neutron';
      const compression = isNeutron ? (p.blackHoleTimeCompression || 1.0) + 0.35 : (p.blackHoleTimeCompression || 1.0);
      return { 
        ...p, 
        isBalanced: true,
        aeonCount: p.aeonCount + 1,
        zeroShieldStability: 0,
        blackHoleTimeCompression: compression
      };
    });
    flashIntensityRef.current = 1.85; 
  };

  const triggerCollapse = () => {
    setParams((p: any) => ({ ...p, isBalanced: false }));
    flashIntensityRef.current = 1.55;
    coherenceRef.current = 0;
    entropyRef.current = 84.66;
    phaseRef.current = 'broken';
    stableFramesRef.current = 0;
    manifoldStressRef.current = 0;
    shieldStabilityRef.current = 0;

    // Generate massive beta decay particles
    const newParticles: DecayParticle[] = [];
    const eventCount = 180; // Massive cascade events

    let mCount = 0;
    let pCount = 0;
    let nCount = 0;

    for (let i = 0; i < eventCount; i++) {
      const typeRand = Math.random();
      let type: 'electron' | 'positron' | 'antineutrino' = 'electron';
      let charge = -1;

      if (typeRand < 0.35) {
        type = 'electron';
        charge = -1;
        mCount++;
      } else if (typeRand < 0.7) {
        type = 'positron';
        charge = 1;
        pCount++;
      } else {
        type = 'antineutrino';
        charge = 0;
        nCount++;
      }

      // Isotropic emission of particles in spatial sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = type === 'antineutrino' ? 4.5 + Math.random() * 7 : 2.2 + Math.random() * 3.5;

      const vx = speed * Math.sin(phi) * Math.cos(theta);
      const vy = speed * Math.sin(phi) * Math.sin(theta);
      const vz = speed * Math.cos(phi);

      const maxLife = 70 + Math.random() * 110; // Expanded lifetime for beautiful dimensional looping traces

      // Emit precisely from the decaying neutron d-quarks depending on general isotope configuration
      const configStr = params.nucleonConfig || 'deuterium';
      const emitPoints: { x: number; y: number; z: number }[] = [];
      if (configStr === 'hydrogen1') {
        emitPoints.push({ x: 0, y: 0, z: 0 }); // Fallback
      } else if (configStr === 'deuterium') {
        emitPoints.push({ x: -26, y: -10, z: 8 });
      } else if (configStr === 'tritium') {
        emitPoints.push({ x: -26, y: -18, z: 0 });
        emitPoints.push({ x: 22, y: -18, z: 16 });
      } else if (configStr === 'helium4') {
        emitPoints.push({ x: -24, y: -26, z: 12 });
        emitPoints.push({ x: 20, y: 18, z: 4 });
      } else if (configStr === 'pentaneutron_5d') {
        emitPoints.push({ x: -32, y: -12, z: 10 });
        emitPoints.push({ x: 32, y: -12, z: -10 });
        emitPoints.push({ x: 0, y: 36, z: -18 });
        emitPoints.push({ x: -15, y: 15, z: 25 });
        emitPoints.push({ x: 15, y: 15, z: -25 });
      } else if (configStr === 'majorana_5d') {
        emitPoints.push({ x: -18, y: -8, z: 10 });
        emitPoints.push({ x: 18, y: 8, z: -10 });
      }

      // Randomly select one of the neutrongenerated emission coordinates to emit high energy ejecta
      const source = emitPoints[Math.floor(Math.random() * emitPoints.length)] || { x: -36, y: -12, z: 12 };
      const disp = 2.5;
      const px = source.x + (Math.random() - 0.5) * disp;
      const py = source.y + (Math.random() - 0.5) * disp;
      const pz = source.z + (Math.random() - 0.5) * disp;

      newParticles.push({
        id: i,
        type,
        x: px,
        y: py,
        z: pz,
        vx,
        vy,
        vz,
        charge,
        trail: [],
        life: maxLife,
        maxLife,
        size: type === 'antineutrino' ? 1.2 : 2.2,
        instructions: getParticleInstructions(type)
      });
    }

    particlesRef.current = newParticles;

    // Spawn massive initial thermal photonic pulse (Photonic Release from broke-symmetry)
    const initialPhotons: VisualPhoton[] = [];
    const numInitialPhotons = 16;
    for (let pIdx = 0; pIdx < numInitialPhotons; pIdx++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 7.0 + Math.random() * 2.5; // High velocity near-lightspeed
      const pvx = speed * Math.sin(phi) * Math.cos(theta);
      const pvy = speed * Math.sin(phi) * Math.sin(theta);
      const pvz = speed * Math.cos(phi);
      initialPhotons.push({
        id: pIdx,
        x: 0,
        y: 0,
        z: 0,
        vx: pvx,
        vy: pvy,
        vz: pvz,
        life: 45,
        maxLife: 45,
        freq: 0.15 + Math.random() * 0.1
      });
    }
    photonsRef.current = initialPhotons;

    totalSpawnedRef.current = eventCount;
    returnedParticlesRef.current = 0;
    
    setHasActiveParticles(true);
    setTotalDecays(prev => prev + eventCount);
    setCountStats({ minus: mCount, plus: pCount, neutrinos: nCount });
  };

  // High stability single animation loop handler
  useEffect(() => {
    let animationId: number;
    let frameCount = 0;

    const tick = () => {
      const isBalanced = params.isBalanced;

      // Handle external spontaneous collapse React trigger
      if (isBalanced && params.isShieldingTriggered) {
        setParams((p: any) => ({ ...p, isShieldingTriggered: false }));
        triggerCollapse();
      }

      // 1. Update Thermodynamic Cycle Progress
      if (isBalanced) {
        stableFramesRef.current++;
        if (phaseRef.current === 'coherent') {
          manifoldStressRef.current = 0;
          coherenceRef.current = Math.min(100, coherenceRef.current + 1.2);
          entropyRef.current = Math.max(0, entropyRef.current - 0.25);
          shieldStabilityRef.current = 0; // Baseline s0 has no shield

          // Spontaneous collapse triggers after stable coherent resting, 
          // particularly fast if there are more neutrons (5D Triangulation has higher spontaneous transition weight!).
          const isFast5D = params.nucleonConfig === 'pentaneutron_5d' || params.nucleonConfig === 'majorana_5d';
          const waitTimeThreshold = isFast5D ? 140 : 180;
          if (autoCycle && stableFramesRef.current >= waitTimeThreshold) {
            triggerCollapse();
          }
        }
      } else {
        stableFramesRef.current++;
        const currentPhase = phaseRef.current;
        if (currentPhase === 'broken') {
          // System starts with nothing but neutrons & neutrinos. The neutron has collapsed and decay particles are expanding.
          // Once frames of decay have occurred, their cross-fields trigger the emerging confinement shield!
          // We model the 5D triangulation logic: 5 neutrons in pentaneutron_5d stabilize specifically under multi-field overlaps
          const isFast5D = params.nucleonConfig === 'pentaneutron_5d' || params.nucleonConfig === 'majorana_5d';
          const emergenceDelay = isFast5D ? 45 : 55;
          if (stableFramesRef.current >= emergenceDelay) {
            phaseRef.current = 'shielding';
            stableFramesRef.current = 0;
            shieldStabilityRef.current = 0;
          }
        } else if (currentPhase === 'shielding') {
          // Creating shielding builds up from 0 to 100%
          const isFast5D = params.nucleonConfig === 'pentaneutron_5d' || params.nucleonConfig === 'majorana_5d';
          const shieldSpeed = isFast5D ? 0.95 : 0.75;
          shieldStabilityRef.current = Math.min(100, shieldStabilityRef.current + shieldSpeed);
          const rawProgress = shieldStabilityRef.current / 100;
          
          // TGIU Cubic smoothstep function for physical phase shifts: f(t) = 3*t^2 - 2*t^3
          const cubicProgress = (3 * rawProgress * rawProgress - 2 * rawProgress * rawProgress * rawProgress) * 100;
          
          manifoldStressRef.current = cubicProgress;
          coherenceRef.current = Math.min(100, cubicProgress * 0.45);
          entropyRef.current = Math.max(0, 84.66 - cubicProgress * 0.75);

          if (shieldStabilityRef.current >= 100) {
            phaseRef.current = 'condensing';
            stableFramesRef.current = 0;
          }
        }
      }

      // 2. Core pulsation state mapping
      const stressFactor = manifoldStressRef.current / 100;
      if (phaseRef.current === 'shielding') {
        // High frequency vibration/trembling under high stress/shielding buildup
        corePulseRef.current = 1 + Math.sin(Date.now() * 0.015) * (0.04 + stressFactor * 0.14);
      } else {
        corePulseRef.current = 1 + Math.sin(Date.now() * 0.004) * 0.04;
      }

      // Diminish energy flash
      flashIntensityRef.current = Math.max(0, flashIntensityRef.current - 0.035);

      // 3. Physics & Particle updates
      const particles = particlesRef.current;
      if (particles.length > 0) {
        // Transition from outward ballistic explosion into winding dimensional attraction under emerging shield
        const isRetracting = phaseRef.current === 'shielding' || phaseRef.current === 'condensing';

        const updatedList = particles
          .map(p => {
            let nvx = p.vx;
            let nvy = p.vy;
            let nvz = p.vz;

            const lifeRatio = p.life / p.maxLife;
            const timeCompression = params.blackHoleTimeCompression || 1.0;

            const isMajorana5D = params.nucleonConfig === 'majorana_5d';

            if (isMajorana5D) {
              // 5D helical double-cone geodesic flow: Weyl spinors spiral on chiral trajectories
              const theta = (p.maxLife - p.life) * 0.08 + p.id * 0.3;
              const radius = 64 * (0.1 + 0.9 * lifeRatio); // Beautiful breathing radius
              const targetX = radius * Math.cos(theta);
              const targetY = radius * Math.sin(theta);
              const isLeft = p.type === 'electron';
              const isRight = p.type === 'positron';
              const targetZ = isLeft ? 35 * Math.sin(theta) : isRight ? -35 * Math.sin(theta) : 12 * Math.cos(2 * theta);

              const steerX = (targetX - p.x) * 0.25;
              const steerY = (targetY - p.y) * 0.25;
              const steerZ = (targetZ - p.z) * 0.25;

              nvx = p.vx * 0.75 + steerX;
              nvy = p.vy * 0.75 + steerY;
              nvz = p.vz * 0.75 + steerZ;
            } else if (params.nucleonConfig === 'neutron') {
              // Special Black Hole Gravitational Infinity Loop Carry!
              // Particles are elegantly locked on a beautiful geometric 3D Lemniscate of Bernoulli
              const t = (p.maxLife - p.life) * 0.045 * timeCompression + p.id * 0.15;
              const a = 75 * (1.2 - Math.pow(lifeRatio - 0.5, 2)); // Dynamic pulsation contract loop
              const denom = 1 + Math.sin(t) * Math.sin(t);
              
              const targetX = (a * Math.cos(t)) / denom;
              const targetY = (a * Math.sin(t) * Math.cos(t)) / denom;
              const targetZ = a * 0.3 * Math.sin(2 * t);

              // Pull velocity toward the lemniscate coordinate with smooth steering
              const steerX = (targetX - p.x) * 0.22;
              const steerY = (targetY - p.y) * 0.22;
              const steerZ = (targetZ - p.z) * 0.22;

              nvx = p.vx * 0.78 + steerX;
              nvy = p.vy * 0.78 + steerY;
              nvz = p.vz * 0.78 + steerZ;
            } else if (isRetracting) {
              // We model the lowest level dimensional state:
              // Restoring confinement force pulls standard beta ejections back inwards to compact extra dimension
              const r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
              
              // Gravity-like confinement force which increases as shield stability increases
              const shieldPct = shieldStabilityRef.current;
              const confinementCoef = 0.085 * (shieldPct / 100) * Math.pow(1 - lifeRatio, 2);
              let ax = doubleFloatCheat(-p.x * confinementCoef, 0);
              let ay = doubleFloatCheat(-p.y * confinementCoef, 0);
              let az = doubleFloatCheat(-p.z * confinementCoef, 0);

              // Extra-dimensional spiral wrapping / helical twist forces
              if (r > 1) {
                const spinStrength = 1.6 * (1 - lifeRatio);
                ax += doubleFloatCheat((-p.y / r) * spinStrength, 0);
                ay += doubleFloatCheat((p.x / r) * spinStrength, 0);
              }

              nvx = doubleFloatCheat(p.vx * 0.93 + ax, p.vx * 0.93);
              nvy = doubleFloatCheat(p.vy * 0.93 + ay, p.vy * 0.93);
              nvz = doubleFloatCheat(p.vz * 0.93 + az, p.vz * 0.93);
            } else {
              // Standard initial spatial Lorentz force magnetic rotation in the XY plane
              if (p.charge !== 0) {
                const angle = 0.04 * p.charge;
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                nvx = doubleFloatCheat(p.vx * cosA - p.vy * sinA, p.vx);
                nvy = doubleFloatCheat(p.vx * sinA + p.vy * cosA, p.vy);
              }
            }

            const nx = doubleFloatCheat(p.x + nvx, p.x);
            const ny = doubleFloatCheat(p.y + nvy, p.y);
            const nz = doubleFloatCheat(p.z + nvz, p.z);

            // Generate longer trails inside extra dimensional wraps
            const newTrail = [...p.trail, { x: nx, y: ny, z: nz }].slice(-18);

            // Re-condensation calculation
            const distance = doubleFloatCheat(Math.sqrt(nx * nx + ny * ny + nz * nz), 0);
            let nextLife = p.life - 1;

            if (params.nucleonConfig === 'neutron') {
              // Sucked into the singularity once they return or complete their orbits
              if (distance < 9.5 && lifeRatio < 0.35) {
                nextLife = 0;
                returnedParticlesRef.current++;
              }
            } else if (isRetracting && distance < 14) {
              nextLife = 0; // Particle has successfully re-integrated/condensed back inside the nucleus
              returnedParticlesRef.current++;
            }

            return {
              ...p,
              x: nx,
              y: ny,
              z: nz,
              vx: nvx,
              vy: nvy,
              vz: nvz,
              trail: newTrail,
              life: nextLife,
            };
          })
          .filter(p => p.life > 0);

        // 3.1 MID-EPOCH COMPOUNDING COLLISIONS
        // Free electrons, positrons, and bosons compound into dynamic states like isotopes
        const compoundedList: DecayParticle[] = [];
        const combinedIds = new Set<number>();
        
        for (let i = 0; i < updatedList.length; i++) {
          const p1 = updatedList[i];
          if (combinedIds.has(p1.id)) continue;
          
          let hasMerged = false;
          for (let j = i + 1; j < updatedList.length; j++) {
            const p2 = updatedList[j];
            if (combinedIds.has(p2.id)) continue;
            
            // Spatial distance
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dz = p1.z - p2.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (dist < 14.5) {
              // Determine combination result
              let combinedType: DecayParticle['type'] | null = null;
              let size = 3.5;
              let label = '';
              let chg = p1.charge + p2.charge;
              
              // Define combination matrix
              // 1. e⁻ + e⁺ -> positronium (exotic atom/boson)
              if ((p1.type === 'electron' && p2.type === 'positron') || (p1.type === 'positron' && p2.type === 'electron')) {
                combinedType = 'positronium';
                size = 3.8;
                label = 'Positronium (e⁺e⁻)';
                chg = 0;
              }
              // 2. e⁻ + anti-neutrino -> W⁻ Boson
              else if ((p1.type === 'electron' && p2.type === 'antineutrino') || (p1.type === 'antineutrino' && p2.type === 'electron')) {
                combinedType = 'w-boson';
                size = 4.8;
                label = 'W⁻ Boson';
                chg = -1;
              }
              // 3. e⁺ + anti-neutrino -> W⁺ Boson
              else if ((p1.type === 'positron' && p2.type === 'antineutrino') || (p1.type === 'antineutrino' && p2.type === 'positron')) {
                combinedType = 'w+boson';
                size = 4.8;
                label = 'W⁺ Boson';
                chg = 1;
              }
              // 4. Heavy combination: positronium + any Boson -> Deuterium Seed
              else if ((p1.type === 'positronium' && (p2.type === 'w-boson' || p2.type === 'w+boson' || p2.type === 'z-boson')) ||
                       (p2.type === 'positronium' && (p1.type === 'w-boson' || p1.type === 'w+boson' || p1.type === 'z-boson'))) {
                combinedType = 'deuterium-seed';
                size = 6.5;
                label = '²H* Deuterium Seed';
              }
              // 5. W⁻ + W⁺ -> Z⁰ Boson
              else if ((p1.type === 'w-boson' && p2.type === 'w+boson') || (p1.type === 'w+boson' && p2.type === 'w-boson')) {
                combinedType = 'z-boson';
                size = 5.2;
                label = 'Z⁰ Neutral Boson';
                chg = 0;
              }
              // 6. Deuterium Seed + leptons -> Tritium Seed
              else if ((p1.type === 'deuterium-seed' && (p2.type === 'electron' || p2.type === 'positron' || p2.type === 'antineutrino')) ||
                       (p2.type === 'deuterium-seed' && (p1.type === 'electron' || p1.type === 'positron' || p1.type === 'antineutrino'))) {
                combinedType = 'tritium-seed';
                size = 7.5;
                label = '³H* Tritium Seed';
              }
              // 7. Deuterium Seed + Deuterium Seed / Tritium Seed -> Alpha Seed
              else if ((p1.type === 'deuterium-seed' && (p2.type === 'deuterium-seed' || p2.type === 'tritium-seed' || p2.type === 'w+boson')) ||
                       ((p1.type === 'deuterium-seed' || p1.type === 'tritium-seed' || p1.type === 'w+boson') && p2.type === 'deuterium-seed')) {
                combinedType = 'alpha-seed';
                size = 9.0;
                label = '⁴He* Alpha Seed';
              }

              if (combinedType) {
                combinedIds.add(p1.id);
                combinedIds.add(p2.id);
                
                // Average positions and velocities for perfect inelastic compound conservation
                const cx = (p1.x + p2.x) / 2;
                const cy = (p1.y + p2.y) / 2;
                const cz = (p1.z + p2.z) / 2;
                const cvx = (p1.vx + p2.vx) * 0.44;
                const cvy = (p1.vy + p2.vy) * 0.44;
                const cvz = (p1.vz + p2.vz) * 0.44;
                
                // Re-energize lifetime of the compound seed!
                const newLife = Math.min(220, Math.max(p1.life, p2.life) + 32);
                const newMaxLife = Math.min(220, Math.max(p1.maxLife, p2.maxLife) + 32);

                compoundedList.push({
                  id: p1.id,
                  type: combinedType,
                  x: cx,
                  y: cy,
                  z: cz,
                  vx: cvx,
                  vy: cvy,
                  vz: cvz,
                  charge: chg,
                  trail: [...p1.trail].slice(-10),
                  life: newLife,
                  maxLife: newMaxLife,
                  size,
                  label,
                  instructions: getParticleInstructions(combinedType)
                });

                // Spawn beautiful radiative reaction photons representing the photonic release of binding energy
                const numReactionPhotons = combinedType === 'positronium' ? 2 : 1; 
                for (let rIdx = 0; rIdx < numReactionPhotons; rIdx++) {
                  const angle = (rIdx * Math.PI) + (Math.random() - 0.5) * 0.5;
                  const pSpeed = 6.0;
                  const pvx = Math.cos(angle) * pSpeed;
                  const pvy = Math.sin(angle) * pSpeed;
                  const pvz = (Math.random() - 0.5) * 2.0;

                  photonsRef.current.push({
                    id: Math.floor(Math.random() * 1000000),
                    x: cx,
                    y: cy,
                    z: cz,
                    vx: pvx,
                    vy: pvy,
                    vz: pvz,
                    life: 50,
                    maxLife: 50,
                    freq: 0.2 + Math.random() * 0.1
                  });
                }

                hasMerged = true;
                break;
              }
            }
          }
          
          if (!hasMerged) {
            compoundedList.push(p1);
          }
        }
        
        particlesRef.current = compoundedList;

        // Map live dynamic telemetry metrics with TGIU Cubic Phase-Shift
        const totalSpawned = totalSpawnedRef.current || 180;
        const remainingRatio = particlesRef.current.length / totalSpawned;
        const condensationRatio = returnedParticlesRef.current / totalSpawned;
        
        // TGIU Cubic smoothstep function: f(x) = 3*x^2 - 2*x^3
        const cubicRemaining = remainingRatio * remainingRatio * (3 - 2 * remainingRatio);
        const cubicCondensation = condensationRatio * condensationRatio * (3 - 2 * condensationRatio);
        
        coherenceRef.current = Math.min(100, (1 - cubicRemaining) * 60 + cubicCondensation * 40);
        entropyRef.current = cubicRemaining * 75 + 10;
      } else {
        // No active particles inside workspace - complete cycle naturally when system settles back to perfect Absolute Zero S0
        if (!isBalanced) {
          if (phaseRef.current === 'broken') {
            phaseRef.current = 'condensing';
          }
          if (phaseRef.current === 'condensing') {
            // Smoothly restore coherence and decay entropy to perfect zero-points
            coherenceRef.current = Math.min(100, coherenceRef.current + 1.4);
            entropyRef.current = Math.max(0, entropyRef.current - 0.9);

            if (coherenceRef.current >= 99.9) {
              completeAeonCycle();
            }
          }
        }
      }

      // Maintain dynamic Zero Shield Stability & Quark Transmutation factor
      const currentPhase = phaseRef.current;
      if (isBalanced) {
        // Handled inside Phase 1 and 2!
        quarksTransmutationRef.current = Math.max(0, quarksTransmutationRef.current - 0.025);
      } else {
        if (currentPhase === 'broken') {
          // Low background field noise while shield is shattered
          const fluxTarget = 3 + Math.sin(Date.now() * 0.035) * 2;
          shieldStabilityRef.current = shieldStabilityRef.current * 0.9 + fluxTarget * 0.1;
          quarksTransmutationRef.current = Math.min(1, quarksTransmutationRef.current + 0.05);
        } else if (currentPhase === 'condensing') {
          // Keep shield flat at 0 while particles finish condensing back inside nucleus
          shieldStabilityRef.current = 0;
          quarksTransmutationRef.current = Math.min(1, quarksTransmutationRef.current + 0.05);
        }
      }

      // Update photometrics (Visual wave-packets of photon release with General Relativity Gravitational Lensing)
      if (photonsRef.current.length > 0) {
        const timeCompression = params.blackHoleTimeCompression || 1.0;
        const horizonRadius = 13 * Math.sqrt(timeCompression);
        const isNeutronBH = params.nucleonConfig === 'neutron' && (!isBalanced || particlesRef.current.length > 0);

        photonsRef.current = photonsRef.current
          .map(ph => {
            let nvx = ph.vx;
            let nvy = ph.vy;
            let nvz = ph.vz;
            let nextLife = ph.life - 1;

            const r = Math.sqrt(ph.x * ph.x + ph.y * ph.y + ph.z * ph.z);

            const isMajorana5D = params.nucleonConfig === 'majorana_5d';

            if (isMajorana5D && (!isBalanced || particlesRef.current.length > 0)) {
              // 5D helical coordinate winding torsion force (spiraling spinor fields)
              const twistStrength = 0.081;
              const ax = -ph.y * twistStrength - ph.x * 0.03;
              const ay = ph.x * twistStrength - ph.y * 0.03;
              const az = -ph.z * 0.045;

              const tempVx = ph.vx + ax;
              const tempVy = ph.vy + ay;
              const tempVz = ph.vz + az;

              const currentSpeed = Math.sqrt(ph.vx * ph.vx + ph.vy * ph.vy + ph.vz * ph.vz);
              const tempSpeed = Math.sqrt(tempVx * tempVx + tempVy * tempVy + tempVz * tempVz);

              if (tempSpeed > 0) {
                nvx = (tempVx / tempSpeed) * currentSpeed;
                nvy = (tempVy / tempSpeed) * currentSpeed;
                nvz = (tempVz / tempSpeed) * currentSpeed;
              }
            } else if (isNeutronBH) {
              // 1. Black Hole capture boundary (Event Horizon)
              if (r < horizonRadius) {
                nextLife = 0; // Photon gets trapped/swallowed by the event horizon
              } else {
                // 2. Gravitational Lensing (directional bending) under Schwarzschild geometry approximation
                const gravityStrength = 42 * timeCompression;
                const force = gravityStrength / (r * r + 1e-3);
                
                // Acceleration vector toward the singularity (0,0,0)
                const ax = -(ph.x / (r + 1e-3)) * force;
                const ay = -(ph.y / (r + 1e-3)) * force;
                const az = -(ph.z / (r + 1e-3)) * force;

                const tempVx = ph.vx + ax;
                const tempVy = ph.vy + ay;
                const tempVz = ph.vz + az;

                const currentSpeed = Math.sqrt(ph.vx * ph.vx + ph.vy * ph.vy + ph.vz * ph.vz);
                const tempSpeed = Math.sqrt(tempVx * tempVx + tempVy * tempVy + tempVz * tempVz);

                if (tempSpeed > 0) {
                  // Photons travel at the constant speed of light, so we preserve speed and only change trajectory direction!
                  nvx = (tempVx / tempSpeed) * currentSpeed;
                  nvy = (tempVy / tempSpeed) * currentSpeed;
                  nvz = (tempVz / tempSpeed) * currentSpeed;
                }
              }
            } else if (phaseRef.current === 'shielding' || phaseRef.current === 'condensing') {
              // Mild winding force under confinement shield wrap
              const shieldPct = shieldStabilityRef.current;
              const confinementCoef = 0.05 * (shieldPct / 100);
              const ax = -ph.x * confinementCoef;
              const ay = -ph.y * confinementCoef;
              const az = -ph.z * confinementCoef;

              const tempVx = ph.vx + ax;
              const tempVy = ph.vy + ay;
              const tempVz = ph.vz + az;

              const currentSpeed = Math.sqrt(ph.vx * ph.vx + ph.vy * ph.vy + ph.vz * ph.vz);
              const tempSpeed = Math.sqrt(tempVx * tempVx + tempVy * tempVy + tempVz * tempVz);

              if (tempSpeed > 0) {
                nvx = (tempVx / tempSpeed) * currentSpeed;
                nvy = (tempVy / tempSpeed) * currentSpeed;
                nvz = (tempVz / tempSpeed) * currentSpeed;
              }
            }

            return {
              ...ph,
              x: ph.x + nvx,
              y: ph.y + nvy,
              z: ph.z + nvz,
              vx: nvx,
              vy: nvy,
              vz: nvz,
              life: nextLife
            };
          })
          .filter(ph => ph.life > 0);
      }

      // Manual / Auto rotating camera adjustments
      if (!isDraggingRef.current) {
        cameraAngleRef.current.y += 0.0012;
      }

      // 4. Paint canvas
      renderCanvas();

      // 5. Update state variables at 15 FPS (every 4 frames) to prevent browser throttling from heavy React rendering
      frameCount++;
      if (frameCount % 4 === 0) {
        setHasActiveParticles(particlesRef.current.length > 0);
        setEntropy(entropyRef.current);
        setCoherence(coherenceRef.current);
        setManifoldStress(manifoldStressRef.current);
        setSimulationPhase(phaseRef.current);

        // Map active simulation leptons down to the panels
        if (onUpdateActiveLeptons) {
          const firstLeptons = particlesRef.current.slice(0, 15).map(p => {
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
            const isMovingOut = (p.vx * p.x + p.vy * p.y + p.vz * p.z) > 0;
            const interactionState = isMovingOut ? "High-Velocity Expansion" : "Re-condensation to Core";
            
            const isMajorana5D = params.nucleonConfig === 'majorana_5d';
            let typeLabel = p.type === 'electron' 
              ? (isMajorana5D ? 'ψ_L Weyl Spinor (Left)' : 'Electron β⁻') 
              : p.type === 'positron' 
                ? (isMajorana5D ? 'ψ_R Weyl Spinor (Right)' : 'Positron β⁺') 
                : (isMajorana5D ? 'ψ_0 Scalar Component' : 'Antineutrino ν̅_e');
            let massStr = isMajorana5D 
              ? 'Near-zero (Weyl spinor)'
              : (p.type === 'antineutrino' ? '< 1.1 eV/c²' : '0.511 MeV/c²');
            let chargeStr = isMajorana5D 
              ? '0.0 (Self-Neutral)' 
              : (p.type === 'electron' ? '-1.0 e' : p.type === 'positron' ? '+1.0 e' : '0.0 (Neutral)');

            if (p.type === 'positronium') {
              typeLabel = 'Positronium (e⁺e⁻)';
              massStr = '1.022 MeV/c²';
              chargeStr = '0.0 (Neutral)';
            } else if (p.type === 'w-boson') {
              typeLabel = 'W⁻ Boson (Gauge)';
              massStr = '80.38 GeV/c²';
              chargeStr = '-1.0 e';
            } else if (p.type === 'w+boson') {
              typeLabel = 'W⁺ Boson (Gauge)';
              massStr = '80.38 GeV/c²';
              chargeStr = '+1.0 e';
            } else if (p.type === 'z-boson') {
              typeLabel = 'Z⁰ Neutral Boson';
              massStr = '91.19 GeV/c²';
              chargeStr = '0.0 (Neutral)';
            } else if (p.type === 'deuterium-seed') {
              typeLabel = '²H* Deuterium Seed';
              massStr = '1.876 GeV/c²';
              chargeStr = '+1.0 e';
            } else if (p.type === 'tritium-seed') {
              typeLabel = '³H* Tritium Seed';
              massStr = '2.809 GeV/c²';
              chargeStr = '+1.0 e';
            } else if (p.type === 'alpha-seed') {
              typeLabel = '⁴He* Alpha Seed';
              massStr = '3.728 GeV/c²';
              chargeStr = '+2.0 e';
            }

            const progressRatio = Math.max(0, Math.min(1, 1 - (p.life / p.maxLife)));
            const insts = p.instructions || getParticleInstructions(p.type);
            const currentInstructionIndex = Math.min(insts.length - 1, Math.floor(progressRatio * insts.length));

            return {
              id: `lepton-${p.id}`,
              index: p.id,
              name: `${typeLabel} #${p.id}`,
              type: p.type,
              x: p.x,
              y: p.y,
              z: p.z,
              vx: p.vx,
              vy: p.vy,
              vz: p.vz,
              speed,
              charge: chargeStr,
              mass: massStr,
              interactionState,
              life: p.life,
              maxLife: p.maxLife,
              instructions: insts,
              currentInstructionIndex
            };
          });
          onUpdateActiveLeptons(firstLeptons);
        }

        // Map selected particle stats upwards for the inventory UI
        if (selectedParticleIds && setSelectedParticlesStats) {
          const statsList: any[] = [];

          selectedParticleIds.forEach(id => {
            let stats: any = null;

            if (id.startsWith('quark-')) {
              const qid = parseInt(id.substring(6));
              const shieldPct = shieldStabilityRef.current;
              const failureProgress = (100 - shieldPct) / 100;
              const failureDriftScale = failureProgress * 24;
              
              const dynamicQuarks = getDynamicQuarks(params.nucleonConfig || 'deuterium', 0, failureDriftScale, isBalanced, phaseRef.current, quarksTransmutationRef.current);
              const q = dynamicQuarks.find(item => item.id === qid);
              if (q) {
                let qType = q.type === 'down' ? 'down-quark' : 'up-quark';
                let qLabel = q.name;
                let qCharge = `${q.charge} e`;
                let qMass = q.mass;
                let interactionState = 'Bound in Nucleus (Perfect Coherence)';

                if (q.isTransmutable) {
                  if (phaseRef.current === 'broken' || phaseRef.current === 'condensing' || !isBalanced) {
                    qType = 'up-quark';
                    qLabel = `u-Quark #${q.id} (Transmuted)`;
                    qCharge = '+2/3 e';
                    qMass = '2.3 MeV/c²';
                    interactionState = 'Successfully Decayed (Transformed udd → uud)';
                  } else if (phaseRef.current === 'shielding') {
                    interactionState = 'Stressed under Confinement (Exchanging Weak Boson)';
                  } else {
                    interactionState = 'Resting in Coherent Absolute Zero State';
                  }
                } else {
                  interactionState = isBalanced ? 'Bound in Nucleus (Quark Confinement)' : 'Symmetric bound state (Excited nuclei)';
                }

                stats = {
                  id,
                  name: qLabel,
                  system: 'sub',
                  type: qType,
                  x: q.ox,
                  y: q.oy,
                  z: q.oz,
                  vx: 0,
                  vy: 0,
                  vz: 0,
                  speed: 0,
                  charge: qCharge,
                  mass: qMass,
                  interactionState,
                  life: 100,
                  maxLife: 100
                };
              }
            } else if (id.startsWith('lepton-')) {
              const idx = parseInt(id.substring(7));
              const p = particlesRef.current.find(item => item.id === idx);

              if (p) {
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
                const isMovingOut = (p.vx * p.x + p.vy * p.y + p.vz * p.z) > 0;
                const interactionState = isMovingOut ? "High-Velocity Relativistic Expansion" : "Gravitational Re-condensation to Core";
                
                const isMajorana5D = params.nucleonConfig === 'majorana_5d';
                const typeLabel = p.type === 'electron' 
                  ? (isMajorana5D ? 'ψ_L Weyl Spinor (Left)' : 'Electron β⁻') 
                  : p.type === 'positron' 
                    ? (isMajorana5D ? 'ψ_R Weyl Spinor (Right)' : 'Positron β⁺') 
                    : (isMajorana5D ? 'ψ_0 Scalar Component' : 'Electron Antineutrino ν̅_e');
                const massStr = isMajorana5D 
                  ? 'Near-zero (Weyl spinor)'
                  : p.type === 'antineutrino' ? '< 1.1 eV/c² (Extreme Relativistic)' : '0.511 MeV/c²';
                const chargeStr = isMajorana5D 
                  ? '0.0 (Self-Neutral)' 
                  : p.type === 'electron' ? '-1.0 e' : p.type === 'positron' ? '+1.0 e' : '0.0 (Neutral)';

                const progressRatio = Math.max(0, Math.min(1, 1 - (p.life / p.maxLife)));
                const insts = p.instructions || getParticleInstructions(p.type);
                const currentInstructionIndex = Math.min(insts.length - 1, Math.floor(progressRatio * insts.length));

                stats = {
                  id,
                  name: `${typeLabel} #${idx}`,
                  system: 'meta',
                  type: p.type,
                  x: p.x,
                  y: p.y,
                  z: p.z,
                  vx: p.vx,
                  vy: p.vy,
                  vz: p.vz,
                  speed: speed,
                  charge: chargeStr,
                  mass: massStr,
                  interactionState,
                  life: p.life,
                  maxLife: p.maxLife,
                  instructions: insts,
                  currentInstructionIndex
                };
              } else {
                const isMajorana5D = params.nucleonConfig === 'majorana_5d';
                const typeStr = idx % 3 === 0 ? 'electron' : idx % 3 === 1 ? 'positron' : 'antineutrino';
                const typeLabel = typeStr === 'electron' 
                  ? (isMajorana5D ? 'ψ_L Weyl Spinor (Left)' : 'Electron β⁻') 
                  : typeStr === 'positron' 
                    ? (isMajorana5D ? 'ψ_R Weyl Spinor (Right)' : 'Positron β⁺') 
                    : (isMajorana5D ? 'ψ_0 Scalar Component' : 'Electron Antineutrino ν̅_e');
                const massStr = isMajorana5D ? 'Near-zero (Weyl limit)' : (typeStr === 'antineutrino' ? '< 1.1 eV/c²' : '0.511 MeV/c²');
                const chargeStr = isMajorana5D ? '0.0 (Self-Neutral)' : (typeStr === 'electron' ? '-1.0 e' : typeStr === 'positron' ? '+1.0 e' : '0.0');

                const insts = getParticleInstructions(typeStr);

                stats = {
                  id,
                  name: `${typeLabel} #${idx} (Resting)`,
                  system: 'meta',
                  type: typeStr,
                  x: -36,
                  y: -12,
                  z: 12,
                  vx: 0,
                  vy: 0,
                  vz: 0,
                  speed: 0,
                  charge: chargeStr,
                  mass: massStr,
                  interactionState: isBalanced ? "Awaiting Core Symmetry Breaking Collapse" : "Expended (Settled into Nucleon Envelope)",
                  life: 0,
                  maxLife: 100,
                  instructions: insts,
                  currentInstructionIndex: insts.length - 1
                };
              }
            }
            if (stats) statsList.push(stats);
          });
          setSelectedParticlesStats(statsList);
        }

        // Map shield stability parameter back up
        setParams((p: any) => {
          const roundedShield = Math.round(shieldStabilityRef.current);
          if (p.zeroShieldStability !== roundedShield) {
            return { ...p, zeroShieldStability: roundedShield };
          }
          return p;
        });
      }

      animationId = requestAnimationFrame(tick);
    };

    // Actual 3D drawing processor
    const renderCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // DPR scale correction to perfectly center perspective (the DPR offset bug fix)
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr); // Correct layout scaling inside active transform stack
      ctx.translate(w / 2, h / 2);

      const angleX = cameraAngleRef.current.x;
      const angleY = cameraAngleRef.current.y;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Camera 3D projection mathematical mapping with safety clipping and black hole dilation warping
      const project = (x3d: number, y3d: number, z3d: number) => {
        let rx = x3d;
        let ry = y3d;
        let rz = z3d;

        // Gravitational lensing gravitational pull towards center (0,0,0) for the neutronic singularity
        if (params.nucleonConfig === 'neutron' && (!params.isBalanced || particlesRef.current.length > 0)) {
          const r = Math.sqrt(x3d * x3d + y3d * y3d + z3d * z3d);
          if (r > 1) {
            const compression = params.blackHoleTimeCompression || 1.0;
            const power = 0.32 * Math.sqrt(compression);
            const warpFactor = Math.max(0.18, 1 - (power * Math.exp(-r / 90)));
            rx *= warpFactor;
            ry *= warpFactor;
            rz *= warpFactor;
          }
        }

        const x1 = rx * cosY - rz * sinY;
        const z1 = rx * sinY + rz * cosY;
        const y2 = ry * cosX - z1 * sinX;
        const z2 = ry * sinX + z1 * cosX;
        const pers = 350;
        
        // Safe check for distance/behind-camera clipping
        if (z2 <= -300) {
          return { x: 0, y: 0, zDepth: doubleFloatCheat(z2, 0), scale: 0, visible: false };
        }
        
        const divisor = pers + z2;
        const scale = doubleFloatCheat(Math.min(10, Math.max(0, pers / divisor)), 1);
        const xProj = doubleFloatCheat(x1 * scale, 0);
        const yProj = doubleFloatCheat(y2 * scale, 0);
        const zDepthProj = doubleFloatCheat(z2, 0);
        return { x: xProj, y: yProj, zDepth: zDepthProj, scale, visible: true };
      };

      const isBalanced = params.isBalanced;
      let quarks: any[] = [];

      // Draw central unstable unity orbital coordinates and Lattice
      if (isBalanced || particlesRef.current.length > 0) {
        const corePulse = corePulseRef.current;
        const opacity = isBalanced ? 0.75 : 0.15;

        const fractionReturned = (totalSpawnedRef.current > 0) 
          ? (returnedParticlesRef.current / totalSpawnedRef.current) 
          : 0;

        // -----------------------------------------------------------------------
        // DYNAMIC SPACETIME METRIC GRID: Represents Spatial Expansion & Thermodynamic Cooling
        // -----------------------------------------------------------------------
        let spacetimeGridScale = 1.0;
        let spacetimeColor = 'rgba(197, 160, 89, 0.08)'; // Default amber-bronze
        if (!isBalanced) {
          const currentPh = phaseRef.current;
          if (currentPh === 'broken') {
            // Rapid outward spatial expansion and thermal cooling
            const expansionProgress = Math.min(1.0, stableFramesRef.current / 45);
            spacetimeGridScale = 1.0 + expansionProgress * 1.5; // Up to 2.5x original metric size
            
            // Blend from hot orange-red to cold deep space blue
            const r = Math.round(197 - expansionProgress * (197 - 59));
            const g = Math.round(160 - expansionProgress * (160 - 130));
            const b = Math.round(89 + expansionProgress * (246 - 89));
            spacetimeColor = `rgba(${r}, ${g}, ${b}, ${0.12 * (1 - expansionProgress * 0.45)})`;
          } else if (currentPh === 'shielding') {
            // Confinement force wrapping spacetime back and restabilizing metric scale
            const contractProgress = shieldStabilityRef.current / 100;
            spacetimeGridScale = 2.5 - contractProgress * 1.5; // Compressing back to 1.0
            
            // Shifting from cool blue back to ambient gold
            const r = Math.round(59 + contractProgress * (197 - 59));
            const g = Math.round(130 + contractProgress * (160 - 130));
            const b = Math.round(246 - contractProgress * (246 - 89));
            spacetimeColor = `rgba(${r}, ${g}, ${b}, ${0.08 + contractProgress * 0.05})`;
          } else if (currentPh === 'condensing') {
            spacetimeGridScale = 1.0;
            spacetimeColor = 'rgba(197, 160, 89, 0.15)';
          }
        }

        // Draw 3D expanding spatial metric coordinate lines on a cosmic horizontal slice
        ctx.save();
        ctx.strokeStyle = spacetimeColor;
        ctx.lineWidth = 0.5;
        const gridLinesCount = 8;
        const gridSpacingLen = 28 * spacetimeGridScale;
        
        for (let l = -gridLinesCount / 2; l <= gridLinesCount / 2; l++) {
          // Longitudinal coordinate lines
          ctx.beginPath();
          let lineStartX = l * gridSpacingLen;
          let lineStartY = -gridLinesCount / 2 * gridSpacingLen;
          let lineEndX = l * gridSpacingLen;
          let lineEndY = gridLinesCount / 2 * gridSpacingLen;
          
          let firstLineSeg = true;
          for (let seg = 0; seg <= 10; seg++) {
            const segRatio = seg / 10;
            const yCoord = lineStartY + (lineEndY - lineStartY) * segRatio;
            const pCoord = project(lineStartX, yCoord, -15);
            if (pCoord.visible) {
              if (firstLineSeg) {
                ctx.moveTo(pCoord.x, pCoord.y);
                firstLineSeg = false;
              } else {
                ctx.lineTo(pCoord.x, pCoord.y);
              }
            }
          }
          ctx.stroke();

          // Latitudinal coordinate lines
          ctx.beginPath();
          lineStartX = -gridLinesCount / 2 * gridSpacingLen;
          lineStartY = l * gridSpacingLen;
          lineEndX = gridLinesCount / 2 * gridSpacingLen;
          lineEndY = l * gridSpacingLen;
          
          firstLineSeg = true;
          for (let seg = 0; seg <= 10; seg++) {
            const segRatio = seg / 10;
            const xCoord = lineStartX + (lineEndX - lineStartX) * segRatio;
            const pCoord = project(xCoord, lineStartY, -15);
            if (pCoord.visible) {
              if (firstLineSeg) {
                ctx.moveTo(pCoord.x, pCoord.y);
                firstLineSeg = false;
              } else {
                ctx.lineTo(pCoord.x, pCoord.y);
              }
            }
          }
          ctx.stroke();
        }
        ctx.restore();

        // LATTICE: Draw Vibrating lowest level nested dimensional coordinate circles (Calabi-Yau torus projection)
        ctx.strokeStyle = isBalanced ? `rgba(197, 160, 89, 0.28)` : `rgba(197, 160, 89, ${0.08 + fractionReturned * 0.22})`;
        ctx.lineWidth = 0.5;
        
        const dimRings = 5;
        const timeFactor = Date.now() * 0.0004;
        const gridScale = isBalanced ? 36 * corePulse : (15 + fractionReturned * 21) * corePulse;
        
        for (let j = 0; j < dimRings; j++) {
          const rotationAngle = timeFactor + (j * Math.PI / dimRings);
          ctx.beginPath();
          for (let a = 0; a <= 360; a += 15) {
            const radAngle = a * Math.PI / 180;
            const rx = gridScale * Math.cos(radAngle);
            const ry = gridScale * Math.sin(radAngle) * Math.cos(rotationAngle);
            const rz = gridScale * Math.sin(radAngle) * Math.sin(rotationAngle);
            const projRing = project(rx, ry, rz);
            if (projRing.visible) {
              if (a === 0) {
                ctx.moveTo(projRing.x, projRing.y);
              } else {
                ctx.lineTo(projRing.x, projRing.y);
              }
            }
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Sub-Nucleon composite state quarks (Neutron + Proton) representing the lowest level dimensional state
        const timeVal = Date.now() * 0.0035;
        const tremble = (simulationPhase === 'shielding') ? (manifoldStressRef.current * 0.12 * Math.sin(timeVal * 7.5)) : 0;
        
        // Zero Shield confinement wiggles: quarks experience drift fluctuation if shield stability declines below 100%
        const shieldPct = shieldStabilityRef.current; // Realtime shield percentage
        const failureProgress = (100 - shieldPct) / 100; // 0 when shield is perfect, up to 1 when collapsed
        const failureDriftScale = failureProgress * 24; // Up to 24px dimensional drift
        
        const qTrans = quarksTransmutationRef.current;

        // Dynamic multi-isotope Quarks list using TGIU generator helper
        quarks = getDynamicQuarks(params.nucleonConfig || 'deuterium', tremble, failureDriftScale, isBalanced, phaseRef.current, qTrans);

        // Draw Central Singularity (Micro Black Hole) for decaying neutronic matrices
        if (params.nucleonConfig === 'neutron' && (!isBalanced || particlesRef.current.length > 0)) {
          const timeCompression = params.blackHoleTimeCompression || 1.0;
          const bhCenterProj = project(0, 0, 0);
          if (bhCenterProj.visible) {
            const scale = bhCenterProj.scale;
            const eventHorizonRadius = 13 * Math.sqrt(timeCompression) * scale;
            const accretionDiskRadius = eventHorizonRadius * (2.1 + 0.3 * Math.sin(Date.now() * 0.005));

            // ACCRETION DISK SWIRL GLOW
            const gradientDisk = ctx.createRadialGradient(
              bhCenterProj.x, bhCenterProj.y, eventHorizonRadius * 0.8,
              bhCenterProj.x, bhCenterProj.y, accretionDiskRadius
            );
            gradientDisk.addColorStop(0, 'rgba(236, 72, 153, 0.7)'); // Hot pink core coupling
            gradientDisk.addColorStop(0.35, 'rgba(245, 158, 11, 0.4)'); // Amber accretion disk
            gradientDisk.addColorStop(0.7, 'rgba(124, 58, 237, 0.15)'); // Violet gravitational lensing warp
            gradientDisk.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradientDisk;
            ctx.beginPath();
            ctx.arc(bhCenterProj.x, bhCenterProj.y, accretionDiskRadius, 0, Math.PI * 2);
            ctx.fill();

            // GRAVITATIONAL LENSING FIELD LINE
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 + 0.12 * Math.sin(Date.now() * 0.004)})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.arc(bhCenterProj.x, bhCenterProj.y, eventHorizonRadius * 1.5, 0, Math.PI * 2);
            ctx.stroke();

            // EVENT HORIZON (Absolute Zero Hole Core)
            ctx.fillStyle = '#010101';
            ctx.beginPath();
            ctx.arc(bhCenterProj.x, bhCenterProj.y, eventHorizonRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(bhCenterProj.x, bhCenterProj.y, eventHorizonRadius, 0, Math.PI * 2);
            ctx.stroke();

            // TIME DILATION HUD DETAIL
            if (scale > 0.85) {
              ctx.fillStyle = 'rgba(245, 158, 11, 0.95)';
              ctx.font = 'bold 7px monospace';
              ctx.textAlign = 'center';
              ctx.fillText('SINGULARITY S₀', bhCenterProj.x, bhCenterProj.y - eventHorizonRadius - 4);
              ctx.fillStyle = 'rgba(161, 161, 170, 0.85)';
              ctx.fillText(`dt/dτ = ${(1 / timeCompression).toFixed(2)}x (DILATED)`, bhCenterProj.x, bhCenterProj.y + eventHorizonRadius + 9);
            }
          }
        }

        // -------------------------------------------------------------
        // VISUALIZE DYNAMIC ZERO SHIELD BOUNDARIES ON THE LOWEST SYSTEM
        // -------------------------------------------------------------
        const shieldOpacity = (phaseRef.current === 'shielding')
          ? 0.2 + (shieldPct / 100) * 0.6
          : shieldPct / 100 * (isBalanced ? 0.75 : 0.25);
        const shieldVibe = (100 - shieldPct) * 0.15 * Math.sin(Date.now() * 0.05);
        
        let shieldColor = shieldPct >= 95 
          ? `rgba(16, 185, 129, ${shieldOpacity})` // Green when secure
          : `rgba(6, 182, 212, ${shieldOpacity})`; // Intense cyan during confinement setup
        
        if (phaseRef.current === 'broken') {
          shieldColor = `rgba(239, 68, 68, 0.45)`; // Flashing red
        }

        // Helper function to project-render 3D shield orbits around Quarks nested system
        const draw3DShieldRing = (radius: number, plane: 'xy' | 'xz' | 'yz', color: string, width: number, dashed: boolean) => {
          ctx.beginPath();
          const steps = 48;
          let first = true;
          
          if (dashed) {
            ctx.setLineDash([4, 6]);
          } else {
            ctx.setLineDash([]);
          }

          // Limit steps to make shield rings physically draw/assemble as progress builds up!
          const maxDrawSteps = (phaseRef.current === 'shielding' || phaseRef.current === 'coherent')
            ? Math.max(1, Math.floor(steps * (shieldPct / 100)))
            : steps;

          for (let i = 0; i <= maxDrawSteps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            let sx = 0, sy = 0, sz = 0;
            const pulseRadius = radius + shieldVibe;

            if (plane === 'xy') {
              sx = pulseRadius * Math.cos(angle);
              sy = pulseRadius * Math.sin(angle);
              sz = 0;
            } else if (plane === 'xz') {
              sx = pulseRadius * Math.cos(angle);
              sy = 0;
              sz = pulseRadius * Math.sin(angle);
            } else if (plane === 'yz') {
              sx = 0;
              sy = pulseRadius * Math.cos(angle);
              sz = pulseRadius * Math.sin(angle);
            }

            const pShield = project(sx, sy, sz);
            if (pShield.visible) {
              if (first) {
                ctx.moveTo(pShield.x, pShield.y);
                first = false;
              } else {
                ctx.lineTo(pShield.x, pShield.y);
              }
            }
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.stroke();
          ctx.setLineDash([]);
        };

        const isDashedShield = shieldPct < 95;
        const shieldLineWidth = shieldPct >= 95 ? 1.5 : 0.75;
        
        // Draw 3 orthogonal bounding shield cages directly wrapping quarks structure
        draw3DShieldRing(54, 'xy', shieldColor, shieldLineWidth, isDashedShield);
        draw3DShieldRing(54, 'xz', shieldColor, shieldLineWidth, isDashedShield);
        draw3DShieldRing(54, 'yz', shieldColor, shieldLineWidth, isDashedShield);

        const drawGluonField = (q1: any, q2: any, activeColor: string) => {
          const p1 = project(q1.ox, q1.oy, q1.oz);
          const p2 = project(q2.ox, q2.oy, q2.oz);
          if (!p1.visible || !p2.visible) return;
          
          ctx.beginPath();
          const rawDist = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
          const dist = rawDist < 0.01 ? 0.01 : rawDist;
          const segments = Math.max(8, Math.floor(dist / 4));
          ctx.moveTo(p1.x, p1.y);
          
          const dx = doubleFloatCheat((p2.x - p1.x) / dist, 0);
          const dy = doubleFloatCheat((p2.y - p1.y) / dist, 0);
          const nx = doubleFloatCheat(-dy, 0);
          const ny = doubleFloatCheat(dx, 0);
          
          for (let s = 1; s < segments; s++) {
            const r = s / segments;
            const bx = doubleFloatCheat(p1.x + dx * (r * dist), p1.x);
            const by = doubleFloatCheat(p1.y + dy * (r * dist), p1.y);
            const frequency = 0.55;
            const baseAmp = (simulationPhase === 'shielding') ? 5.5 : 2.5;
            const failureAmpExtra = (100 - shieldPct) * 0.12;
            const amplitude = doubleFloatCheat(baseAmp + failureAmpExtra, 0);
            const w = doubleFloatCheat(Math.sin(r * dist * frequency + Date.now() * 0.015) * amplitude, 0);
            ctx.lineTo(doubleFloatCheat(bx + nx * w, bx), doubleFloatCheat(by + ny * w, by));
          }
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = activeColor;
          ctx.lineWidth = doubleFloatCheat(1.2 * Math.min(2.5, p1.scale), 1.2);
          ctx.stroke();
        };

        // Render gluon field strings
        const gluonColor = isBalanced 
          ? 'rgba(197, 160, 89, 0.45)' 
          : (simulationPhase === 'shielding') 
            ? 'rgba(6, 182, 212, 0.72)' 
            : 'rgba(197, 160, 89, 0.16)';
            
        // Draw gluon lines dynamically for each 3-quark nucleon set
        for (let idx = 0; idx < quarks.length; idx += 3) {
          if (idx + 2 < quarks.length) {
            drawGluonField(quarks[idx], quarks[idx + 1], gluonColor);
            drawGluonField(quarks[idx + 1], quarks[idx + 2], gluonColor);
            drawGluonField(quarks[idx + 2], quarks[idx], gluonColor);
          }
        }
        
        // Inter-nucleon gluon coupling fields (strong exchange) if multiple nucleons are present
        if (quarks.length >= 6) {
          for (let n = 0; n < quarks.length - 3; n += 3) {
            drawGluonField(
              quarks[n + 1], 
              quarks[n + 4], 
              isBalanced ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.08)'
            );
          }
        }

        // Paint Quarks spherical 3D nodes
        quarks.forEach(q => {
          const proj = project(q.ox, q.oy, q.oz);
          if (!proj.visible) return;
          const r = 9.5 * proj.scale;
          
          // Outer shadow glow
          const radialGlow = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, r * 2.8);
          radialGlow.addColorStop(0, q.bColor + (isBalanced ? '70' : '22'));
          radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = radialGlow;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r * 2.8, 0, Math.PI * 2);
          ctx.fill();
          
          // Stroke profile border
          ctx.strokeStyle = isBalanced ? '#c5a059' : 'rgba(197, 160, 89, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
          ctx.stroke();
          
          // Core body filling
          ctx.fillStyle = isBalanced ? q.bColor : 'rgba(39, 39, 42, 0.85)';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r * 0.9, 0, Math.PI * 2);
          ctx.fill();
          
          // Centered letter text
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.floor(7.5 * proj.scale)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(q.label, proj.x, proj.y - 0.5);
          
          // Charge labeling when zoom perspective allows details
          if (proj.scale > 1.2) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = `${Math.floor(4 * proj.scale)}px sans-serif`;
            ctx.fillText(q.charge, proj.x, proj.y + 5.5 * proj.scale);
          }
        });

        // Dynamic Nucleon state labels
        const configurationStr = params.nucleonConfig || 'deuterium';
        const nucleonsForLabels: { type: 'Neutron' | 'Proton'; label: string; cx: number; cy: number; cz: number }[] = [];
        if (configurationStr === 'neutron') {
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON [d-u-d]', cx: 0, cy: 24, cz: 0 });
        } else if (configurationStr === 'hydrogen1') {
          nucleonsForLabels.push({ type: 'Proton', label: 'PROTON [u-d-u]', cx: 0, cy: 36, cz: 0 });
        } else if (configurationStr === 'deuterium') {
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON [d-u-d]', cx: -24, cy: 28, cz: 0 });
          nucleonsForLabels.push({ type: 'Proton', label: 'PROTON [u-d-u]', cx: 24, cy: 32, cz: 0 });
        } else if (configurationStr === 'tritium') {
          nucleonsForLabels.push({ type: 'Proton', label: 'PROTON [u-d-u]', cx: 0, cy: 46, cz: 0 });
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON_1 [d-u-d]', cx: -24, cy: 6, cz: -8 });
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON_2 [d-u-d]', cx: 24, cy: 6, cz: 8 });
        } else if (configurationStr === 'helium4') {
          nucleonsForLabels.push({ type: 'Proton', label: 'PROTON_1 [u-d-u]', cx: -22, cy: 46, cz: -4 });
          nucleonsForLabels.push({ type: 'Proton', label: 'PROTON_2 [u-d-u]', cx: 22, cy: -4, cz: 4 });
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON_1 [d-u-d]', cx: -22, cy: -4, cz: 4 });
          nucleonsForLabels.push({ type: 'Neutron', label: 'NEUTRON_2 [d-u-d]', cx: 22, cy: 46, cz: -4 });
        } else if (configurationStr === 'pentaneutron_5d') {
          nucleonsForLabels.push({ type: 'Neutron', label: '5D-ALPHA [d-u-d]', cx: -32, cy: -12, cz: 10 });
          nucleonsForLabels.push({ type: 'Neutron', label: '5D-BETA [d-u-d]', cx: 32, cy: -12, cz: -10 });
          nucleonsForLabels.push({ type: 'Neutron', label: '5D-GAMMA [d-u-d]', cx: 0, cy: 36, cz: -18 });
          nucleonsForLabels.push({ type: 'Neutron', label: '5D-DELTA [d-u-d]', cx: -15, cy: 15, cz: 25 });
          nucleonsForLabels.push({ type: 'Neutron', label: '5D-EPSILON [d-u-d]', cx: 15, cy: 15, cz: -25 });
        }

        nucleonsForLabels.forEach((n) => {
          const p = project(n.cx, n.cy, n.cz);
          if (p.visible) {
            ctx.fillStyle = 'rgba(113, 113, 122, 0.82)';
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            
            let labelText = n.label;
            if (n.type === 'Neutron' && qTrans > 0.5) {
              labelText = `PROTON [TRANSMUTED d→u]`;
            }
            ctx.fillText(labelText, p.x, p.y);
          }
        });
      }

      // Draw Cascading Beta Decay particle trails & emitters
      const activeParticles = particlesRef.current;
      activeParticles.forEach(p => {
        // Project 3D Trail positions onto 2D projection plane
        if (p.trail.length > 1) {
          let hasInvalid = false;
          const trailPoints: { x: number; y: number }[] = [];
          
          for (let i = 0; i < p.trail.length; i++) {
            const projPoint = project(p.trail[i].x, p.trail[i].y, p.trail[i].z);
            if (!projPoint.visible) {
              hasInvalid = true;
              break;
            }
            trailPoints.push({ x: projPoint.x, y: projPoint.y });
          }

          if (!hasInvalid && trailPoints.length > 1) {
            ctx.beginPath();
            ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
            for (let i = 1; i < trailPoints.length; i++) {
              ctx.lineTo(trailPoints[i].x, trailPoints[i].y);
            }

            let color = 'rgba(6, 182, 212, 0.45)';
            if (p.type === 'positron') color = 'rgba(197, 160, 89, 0.45)';
            else if (p.type === 'antineutrino') color = 'rgba(168, 85, 247, 0.25)';
            else if (p.type === 'positronium') color = 'rgba(236, 72, 153, 0.6)';
            else if (p.type === 'w-boson') color = 'rgba(244, 63, 94, 0.65)';
            else if (p.type === 'w+boson') color = 'rgba(168, 85, 247, 0.65)';
            else if (p.type === 'z-boson') color = 'rgba(234, 179, 8, 0.6)';
            else if (p.type === 'deuterium-seed') color = 'rgba(34, 197, 94, 0.55)';
            else if (p.type === 'tritium-seed') color = 'rgba(20, 184, 166, 0.55)';
            else if (p.type === 'alpha-seed') color = 'rgba(249, 115, 22, 0.65)';

            ctx.strokeStyle = color;
            const startProj = project(p.trail[0].x, p.trail[0].y, p.trail[0].z);
            ctx.lineWidth = p.size * 0.8 * Math.min(5, startProj.scale);
            ctx.stroke();
          }
        }

        // Draw active Particle center profile
        const proj = project(p.x, p.y, p.z);
        if (proj.visible) {
          const rad = p.size * proj.scale;

          let baseFill = '#22d3ee';
          if (p.type === 'positron') baseFill = '#f59e0b';
          else if (p.type === 'antineutrino') baseFill = '#c084fc';
          else if (p.type === 'positronium') baseFill = '#ec4899';
          else if (p.type === 'w-boson') baseFill = '#f43f5e';
          else if (p.type === 'w+boson') baseFill = '#a855f7';
          else if (p.type === 'z-boson') baseFill = '#eab308';
          else if (p.type === 'deuterium-seed') baseFill = '#22c55e';
          else if (p.type === 'tritium-seed') baseFill = '#14b8a6';
          else if (p.type === 'alpha-seed') baseFill = '#f97316';

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, rad * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = baseFill;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, rad * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Orbit rings around heavy/compact compound states
          const isHeavySeed = p.type === 'deuterium-seed' || p.type === 'tritium-seed' || p.type === 'alpha-seed';
          if (isHeavySeed) {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, rad * 2.8, 0, Math.PI * 2);
            ctx.strokeStyle = baseFill + 'a0';
            ctx.lineWidth = 0.65;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Custom visual HUD indicators for compound states
          if (p.label && proj.scale > 0.55) {
            ctx.fillStyle = baseFill;
            ctx.font = 'bold 7.5px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(p.label, proj.x, proj.y - rad * 1.9 - 3);
          }
        }
      });

      // -----------------------------------------------------------------------
      // DRAW RADIATIVE PHOTON GAMMA RAYS (Photonic Release wavepackets)
      // -----------------------------------------------------------------------
      const activePhotons = photonsRef.current;
      activePhotons.forEach(ph => {
        const proj = project(ph.x, ph.y, ph.z);
        if (proj.visible) {
          const size = 18 * (ph.life / ph.maxLife) * proj.scale;
          ctx.save();
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.45 * (ph.life / ph.maxLife)})`;
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 6;
          ctx.lineWidth = 1.35 * proj.scale;
          
          // Draw a high frequency squiggle representing quantum wave-particle packeting
          ctx.beginPath();
          const angle = Math.atan2(ph.vy, ph.vx);
          const perpX = -Math.sin(angle);
          const perpY = Math.cos(angle);
          
          let first = true;
          const segments = 10;
          for (let s = -segments / 2; s <= segments / 2; s++) {
            const fraction = s / (segments / 2); // -1.0 to 1.0
            const distAlong = fraction * (size * 0.5);
            
            // High frequency sinusoid
            const waveVal = Math.sin(fraction * Math.PI * 4.5 + Date.now() * ph.freq) * (2.5 * proj.scale);
            
            const wx = proj.x + Math.cos(angle) * distAlong + perpX * waveVal;
            const wy = proj.y + Math.sin(angle) * distAlong + perpY * waveVal;
            
            if (first) {
              ctx.moveTo(wx, wy);
              first = false;
            } else {
              ctx.lineTo(wx, wy);
            }
          }
          ctx.stroke();
          
          // Small glowing central head of the wave packet
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.8 * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          
          ctx.restore();
        }
      });

      // -----------------------------------------------------------------------
      // HIGH-FIDELITY ACTIVE TARGET LOCATOR FOR THE SEPARATE SELECTED PARTICLE
      // -----------------------------------------------------------------------
      if (selectedParticleIds && selectedParticleIds.length > 0) {
        selectedParticleIds.forEach((selectedParticleId, sIdx) => {
          let targetX = 0, targetY = 0, targetZ = 0;
        let pLabel = '';
        let foundTarget = false;
        let isQuarkType = false;

        if (selectedParticleId.startsWith('quark-')) {
          const qid = parseInt(selectedParticleId.substring(6));
          const matchedQ = quarks.find(item => item.id === qid);
          if (matchedQ) {
            targetX = matchedQ.ox;
            targetY = matchedQ.oy;
            targetZ = matchedQ.oz;
            pLabel = qid === 3 && (phaseRef.current === 'broken' || phaseRef.current === 'condensing' || !isBalanced) ? 'u-QUARK #3 [TRANSMUTED]' : matchedQ.name.toUpperCase();
            foundTarget = true;
            isQuarkType = true;
          }
        } else if (selectedParticleId.startsWith('lepton-')) {
          const l_idx = parseInt(selectedParticleId.substring(7));
          const matchedLepton = particlesRef.current.find(item => item.id === l_idx);
          if (matchedLepton) {
            targetX = matchedLepton.x;
            targetY = matchedLepton.y;
            targetZ = matchedLepton.z;
            if (matchedLepton.type === 'electron') pLabel = 'ELECTRON β⁻';
            else if (matchedLepton.type === 'positron') pLabel = 'POSITRON β⁺';
            else if (matchedLepton.type === 'antineutrino') pLabel = 'ANTINEUTRINO ν̅_e';
            else if (matchedLepton.type === 'positronium') pLabel = 'POSITRONIUM (e⁺e⁻)';
            else if (matchedLepton.type === 'w-boson') pLabel = 'W⁻ GAUGE BOSON';
            else if (matchedLepton.type === 'w+boson') pLabel = 'W⁺ GAUGE BOSON';
            else if (matchedLepton.type === 'z-boson') pLabel = 'Z⁰ GAUGE BOSON';
            else if (matchedLepton.type === 'deuterium-seed') pLabel = '²H* DEUTERIUM SEED';
            else if (matchedLepton.type === 'tritium-seed') pLabel = '³H* TRITIUM SEED';
            else if (matchedLepton.type === 'alpha-seed') pLabel = '⁴He* ALPHA SEED';
            else pLabel = (matchedLepton.label || matchedLepton.type).toUpperCase();
            foundTarget = true;

            const originProj = project(-36, -12, 12);
            const lepProj = project(targetX, targetY, targetZ);
            if (originProj.visible && lepProj.visible) {
              ctx.save();
              ctx.strokeStyle = matchedLepton.type === 'electron' ? 'rgba(34, 211, 238, 0.25)' : matchedLepton.type === 'positron' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(168, 85, 247, 0.2)';
              ctx.lineWidth = 1;
              ctx.setLineDash([2, 3]);
              ctx.beginPath();
              ctx.moveTo(originProj.x, originProj.y);
              ctx.lineTo(lepProj.x, lepProj.y);
              ctx.stroke();
              ctx.restore();
            }
          } else {
            targetX = -36;
            targetY = -12;
            targetZ = 12;
            const typeStr = l_idx % 3 === 0 ? 'ELECTRON β⁻' : l_idx % 3 === 1 ? 'POSITRON β⁺' : 'ANTINEUTRINO ν̅_e';
            pLabel = `${typeStr} #${l_idx} [RESTING]`;
            foundTarget = true;
          }
        }

        if (foundTarget) {
          const projTarget = project(targetX, targetY, targetZ);
          if (projTarget.visible) {
            const sizeBase = isQuarkType ? 10.5 : 4.5;
            const sizeFactor = sizeBase * projTarget.scale;
            const colors = ['#06b6d4', '#f59e0b', '#22d3ee', '#ec4899', '#a855f7'];
            const targetColor = colors[sIdx % colors.length];
            
            ctx.save();
            const ringRadius = sizeFactor * (1.6 + 0.3 * Math.sin(Date.now() * 0.0075 + sIdx * 1.5));
            ctx.strokeStyle = targetColor;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.arc(projTarget.x, projTarget.y, ringRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = targetColor;
            ctx.beginPath();
            ctx.arc(projTarget.x, projTarget.y, 2, 0, Math.PI * 2);
            ctx.fill();

            const borderLen = 5.5;
            ctx.strokeStyle = targetColor;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(projTarget.x - ringRadius - 2, projTarget.y - ringRadius - 2);
            ctx.lineTo(projTarget.x - ringRadius - 2 + borderLen, projTarget.y - ringRadius - 2);
            ctx.moveTo(projTarget.x - ringRadius - 2, projTarget.y - ringRadius - 2);
            ctx.lineTo(projTarget.x - ringRadius - 2, projTarget.y - ringRadius - 2 + borderLen);
            
            ctx.moveTo(projTarget.x + ringRadius + 2, projTarget.y - ringRadius - 2);
            ctx.lineTo(projTarget.x + ringRadius + 2 - borderLen, projTarget.y - ringRadius - 2);
            ctx.moveTo(projTarget.x + ringRadius + 2, projTarget.y - ringRadius - 2);
            ctx.lineTo(projTarget.x + ringRadius + 2, projTarget.y - ringRadius - 2 + borderLen);

            ctx.moveTo(projTarget.x - ringRadius - 2, projTarget.y + ringRadius + 2);
            ctx.lineTo(projTarget.x - ringRadius - 2 + borderLen, projTarget.y + ringRadius + 2);
            ctx.moveTo(projTarget.x - ringRadius - 2, projTarget.y + ringRadius + 2);
            ctx.lineTo(projTarget.x - ringRadius - 2, projTarget.y + ringRadius + 2 - borderLen);

            ctx.moveTo(projTarget.x + ringRadius + 2, projTarget.y + ringRadius + 2);
            ctx.lineTo(projTarget.x + ringRadius + 2 - borderLen, projTarget.y + ringRadius + 2);
            ctx.moveTo(projTarget.x + ringRadius + 2, projTarget.y + ringRadius + 2);
            ctx.lineTo(projTarget.x + ringRadius + 2, projTarget.y + ringRadius + 2 - borderLen);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`TL_LOCK: ${pLabel}`, projTarget.x + ringRadius + 6, projTarget.y - 3.5);

            ctx.fillStyle = 'rgba(161, 161, 170, 0.85)';
            ctx.font = '7.5px monospace';
            ctx.fillText(`XYZ: [${targetX.toFixed(1)}, ${targetY.toFixed(1)}, ${targetZ.toFixed(1)}]`, projTarget.x + ringRadius + 6, projTarget.y + 4.5);
            ctx.restore();
          }
        }
      });
    }

      // Shockwave Flash Burst
      const shockIntensity = flashIntensityRef.current;
      if (shockIntensity > 0.01) {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 200 * shockIntensity);
        g.addColorStop(0, `rgba(255, 245, 220, ${shockIntensity * 0.35})`);
        g.addColorStop(0.5, `rgba(197, 160, 89, ${shockIntensity * 0.1})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, 200 * shockIntensity, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [params.isBalanced, autoCycle]);

  // Orbit dragging mouse action handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    cameraAngleRef.current.x -= dy * 0.005;
    cameraAngleRef.current.y += dx * 0.005;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Canvas Resizing triggers
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const containerWidth = rect?.width || canvas.parentElement?.clientWidth || 600;
      canvas.width = containerWidth * window.devicePixelRatio;
      canvas.height = 360 * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '360px';
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#09090b] rounded-xl border border-[#27272a] p-5 relative overflow-hidden flex flex-col h-full" id="unification-physics-simulation">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#c5a059]/5 rounded-full filter blur-3xl pointer-events-none" />
      
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4 z-10 text-left">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-1.5 w-1.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${params.isBalanced ? 'bg-amber-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${params.isBalanced ? 'bg-amber-400' : 'bg-red-400'}`}></span>
            </span>
            <span className="text-[10px] tracking-widest font-mono text-[#71717a] uppercase font-semibold">Universe Simulator Element</span>
          </div>
          <h2 className="text-xl font-serif italic text-zinc-100 flex items-center gap-2">
            Absolute Zero state Space
          </h2>
        </div>

        {/* Realtime entropy & coherence status gauges + Auto Cycle Mode toggle */}
        <div className="flex flex-wrap gap-2 font-mono text-xs items-center sm:self-center">
          <button
            onClick={() => setAutoCycle(prev => !prev)}
            className={`px-3 py-1 border rounded text-[10px] font-bold tracking-wider uppercase transition ${
              autoCycle 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20' 
                : 'bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#a1a1aa]'
            }`}
          >
            {autoCycle ? "● Auto Cycle ON" : "○ Manual Control"}
          </button>
          
          <div className="px-2.5 py-1 bg-black/45 border border-[#27272a]/70 rounded flex items-center gap-1.5">
            <span className="text-[#71717a]">Entropy (S):</span>
            <span className={`font-bold ${params.isBalanced ? 'text-green-500' : 'text-amber-400'}`}>
              {entropy.toFixed(3)} J/K
            </span>
          </div>
          <div className="px-2.5 py-1 bg-black/45 border border-[#27272a]/70 rounded flex items-center gap-1.5">
            <span className="text-[#71717a]">Coherence:</span>
            <span className={`font-bold ${coherence > 80 ? 'text-[#c5a059]' : 'text-zinc-400'}`}>
              {coherence.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Physics Interactive Canvas Container */}
      <div 
        className="flex-1 min-h-[300px] border border-[#27272a]/60 bg-black/40 rounded-lg relative overflow-hidden cursor-grab active:cursor-grabbing group/canvas select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        id="physics-main-viewport"
      >
        <canvas ref={canvasRef} className="block w-full h-[360px]" />

        {/* Floating telemetry metrics block */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 text-[10px] font-mono bg-black/80 px-2.5 py-2 rounded border border-[#27272a]/80 text-[#71717a] select-none pointer-events-none text-left">
          <span className="text-zinc-400 font-bold mb-1 col-span-2">CASCADING BETA SPECTRUM:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"></span>
            Electrons (β⁻): <strong className="text-zinc-200">{countStats.minus}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            Positrons (β⁺): <strong className="text-zinc-200">{countStats.plus}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
            Elect. Antineutrinos (ν̅): <strong className="text-zinc-200">{countStats.neutrinos}</strong>
          </span>
          {params.nucleonConfig === 'neutron' && (
            <>
              <div className="border-t border-[#27272a]/60 my-1"></div>
              <span className="text-[#f59e0b] font-bold">BLACK HOLE CARRY:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse"></span>
                Dilation (dt): <strong className="text-zinc-200">{(1 / (params.blackHoleTimeCompression || 1.0)).toFixed(2)}x</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-450"></span>
                Loop Carry: <strong className="text-amber-400">{((params.blackHoleTimeCompression || 1.0) * 100 - 100).toFixed(0)}%</strong>
              </span>
            </>
          )}
        </div>

        <div className="absolute bottom-3 right-3 text-[9px] font-mono text-[#71717a] bg-black/60 px-2.5 py-1 rounded border border-[#27272a]/40 uppercase pointer-events-none">
          Drag to Orbit Spatial Manifold
        </div>

        {/* State prompt Overlay */}
        {params.isBalanced ? (
          <div className="absolute bottom-3 left-3 bg-black/70 border border-[#c5a059]/10 px-3 py-1.5 rounded font-mono text-[10px] text-[#c5a059] flex items-center gap-1.5 pointer-events-none">
            <Cpu size={12} className="animate-spin text-[#c5a059]" /> Core Locked At s₀ (Absolute Zero Coherence)
          </div>
        ) : !hasActiveParticles ? (
          <div className="absolute bottom-3 left-3 bg-black/70 border border-red-500/10 px-3 py-1.5 rounded font-mono text-[10px] text-red-400 flex items-center gap-1.5 pointer-events-none">
            <Flame size={12} className="animate-pulse" /> Spontaneous Decay Dispersed
          </div>
        ) : null}
      </div>

      {/* Simulation Phase Progress Tracker */}
      <div className="mt-4 p-3.5 bg-[#050505] border border-[#27272a]/70 rounded-lg text-left" id="phase-progress-panel">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wide">
            Manifold Evolutionary State
          </span>
          <span className="text-[10px] font-mono text-[#71717a] leading-none shrink-0 text-right">
            {simulationPhase === 'coherent' && "Perfect S₀ symmetry holding"}
            {simulationPhase === 'destabilizing' && `Stress buildup: ${manifoldStress.toFixed(0)}%`}
            {simulationPhase === 'broken' && "Symmetry broken: high emission"}
            {simulationPhase === 'condensing' && `Re-condensation: ${returnedParticlesRef.current}/${totalSpawnedRef.current || 180} wound`}
          </span>
        </div>
        
        {/* Phase progress visual bar */}
        <div className="h-1 bg-zinc-900 border border-[#27272a]/50 rounded-full overflow-hidden mb-3.5">
          {simulationPhase === 'destabilizing' ? (
            <div 
              className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" 
              style={{ width: `${manifoldStress}%` }}
            />
          ) : simulationPhase === 'condensing' ? (
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
              style={{ width: `${((returnedParticlesRef.current / (totalSpawnedRef.current || 180)) * 100)}%` }}
            />
          ) : simulationPhase === 'broken' ? (
            <div className="h-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] w-full animate-pulse" />
          ) : (
            <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] w-full" />
          )}
        </div>

        {/* Staggered Phase Step Names */}
        <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono text-center">
          <div className={`p-1.5 rounded border transition-all duration-300 ${
            simulationPhase === 'coherent' 
              ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400 font-bold' 
              : 'bg-transparent border-transparent text-[#71717a]'
          }`}>
            Coherent S₀
          </div>
          <div className={`p-1.5 rounded border transition-all duration-300 ${
            simulationPhase === 'shielding' 
              ? 'bg-cyan-950/10 border-cyan-500/20 text-cyan-400 font-bold' 
              : 'bg-transparent border-transparent text-[#71717a]'
          }`}>
            Confinement Shielding
          </div>
          <div className={`p-1.5 rounded border transition-all duration-300 ${
            simulationPhase === 'broken' 
              ? 'bg-red-950/10 border-red-500/20 text-red-400 font-bold' 
              : 'bg-transparent border-transparent text-[#71717a]'
          }`}>
            Decay Burst
          </div>
          <div className={`p-1.5 rounded border transition-all duration-300 ${
            simulationPhase === 'condensing' 
              ? 'bg-[#c5a059]/10 border-[#c5a059]/20 text-[#c5a059] font-bold' 
              : 'bg-transparent border-transparent text-[#71717a]'
          }`}>
            Condensation
          </div>
        </div>
      </div>

      {/* Main master controls - NO INDIVIDUAL PARTICLE SLIDERS OR POPUPS */}
      <div className="mt-4 flex gap-3 z-10 font-mono">
        {params.isBalanced ? (
          <button
            onClick={() => triggerCollapse()}
            className="flex-1 py-3 px-4 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 text-amber-200 text-xs font-bold rounded flex items-center justify-center gap-2 transition duration-200 active:scale-[0.99]"
          >
            <Flame size={14} className="text-[#c5a059] animate-pulse" />
            {params.nucleonConfig === 'pentaneutron_5d' 
              ? "Trigger 5D Pentaneutron Symmetric Collapse" 
              : "Trigger Unstable S₀ Spontaneous Collapse"}
          </button>
        ) : (
          <div className="flex-1 flex gap-3">
            {phaseRef.current === 'broken' && (
              <div className="flex-grow py-3 px-4 bg-red-950/20 border border-red-900/35 text-red-400 text-xs font-bold rounded flex items-center justify-center gap-2 animate-pulse select-none">
                <Zap size={14} className="animate-bounce text-red-500" />
                Unstable Collapse / Expanding Beta Leptons
              </div>
            )}
            {phaseRef.current === 'shielding' && (
              <div className="flex-grow py-3 px-4 bg-cyan-950/20 border border-cyan-900/35 text-cyan-400 text-xs font-bold rounded flex items-center justify-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1"></span>
                Confinement Shield Emergence: {Math.round(shieldStabilityRef.current)}%
              </div>
            )}
            {phaseRef.current === 'condensing' && (
              <div className="flex-grow py-3 px-4 bg-[#c5a059]/10 border border-[#c5a059]/25 text-[#c5a059] text-xs font-bold rounded flex items-center justify-center gap-2 select-none">
                <RotateCcw size={14} className="animate-spin text-[#c5a059] mr-1" />
                Re-condensation & Winding Coordinates
              </div>
            )}
            <button
              onClick={() => resetToAbsoluteZero(true)}
              className="py-3 px-4 bg-zinc-950 hover:bg-zinc-900 border border-[#27272a]/60 text-zinc-400 text-xs font-bold rounded flex items-center justify-center gap-2 transition duration-200 active:scale-[0.99]"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
