import React, { useState, useEffect, useRef } from 'react';
import { SelectedParticleStats } from '../types';
import { Shield, Eye, Cpu, Orbit, Compass, Activity, Zap } from 'lucide-react';

const getInventoryParticleInstructions = (type: string): string[] => {
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

interface ParticleInventoryProps {
  params: any;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  selectedStatsList: SelectedParticleStats[];
  activeLeptons: any[];
}

export default function ParticleInventory({
  params,
  selectedIds,
  setSelectedIds,
  selectedStatsList,
  activeLeptons,
}: ParticleInventoryProps) {
  const [activeTab, setActiveTab] = useState<'sub' | 'meta'>('sub');
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleToggleSelectId = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id].slice(-4));
    }
  };

  // Animate the quantum phase oscillation for all selected particles
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      // Draw background grid lines
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      for (let x = 20; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      if (selectedStatsList && selectedStatsList.length > 0) {
        selectedStatsList.forEach((selectedStats, idx) => {
          ctx.beginPath();
          ctx.lineWidth = idx === 0 ? 1.75 : 1.0;
          
          let waveColor = 'rgba(6, 182, 212, 0.85)'; // cyan
          let frequency = 0.04;
          let amplitude = 22;
          let speedCoeff = 0.05;

          const themeColors = [
            'rgba(6, 182, 212, 0.85)', // cyan
            'rgba(245, 158, 11, 0.85)', // amber
            'rgba(168, 85, 247, 0.85)', // purple
            'rgba(236, 72, 153, 0.85)', // pink
            'rgba(34, 197, 94, 0.85)'   // green
          ];
          waveColor = themeColors[idx % themeColors.length];

          if (selectedStats.type === 'up-quark') {
            frequency = 0.06;
            amplitude = 16;
          } else if (selectedStats.type === 'down-quark') {
            frequency = 0.045;
            amplitude = 14;
          } else if (selectedStats.type === 'electron') {
            frequency = 0.09;
            amplitude = 25;
            speedCoeff = 0.12;
          } else if (selectedStats.type === 'positron') {
            frequency = 0.095;
            amplitude = 23;
            speedCoeff = 0.11;
          } else if (selectedStats.type === 'antineutrino') {
            frequency = 0.16;
            amplitude = 8;
            speedCoeff = 0.22;
          }

          // Wave physics mathematics for dynamic rendering
          ctx.moveTo(0, h / 2);
          for (let x = 0; x < w; x++) {
            const sineVal = Math.sin(x * frequency - offset * speedCoeff + idx * 1.5);
            // Envelope decay so wave looks confined in a potential well
            const envelope = Math.sin((x / w) * Math.PI); 
            const y = h / 2 + sineVal * amplitude * envelope;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = waveColor;
          ctx.stroke();

          // Draw secondary conjugate imaginary phase wave
          ctx.beginPath();
          ctx.lineWidth = 0.5;
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = waveColor.replace('0.85', '0.25').replace('0.9', '0.35');
          ctx.moveTo(0, h / 2);
          for (let x = 0; x < w; x++) {
            const cosVal = Math.cos(x * frequency - offset * speedCoeff + idx * 1.5);
            const envelope = Math.sin((x / w) * Math.PI);
            const y = h / 2 + cosVal * amplitude * envelope;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        });
      } else {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(63, 63, 70, 0.4)';
        ctx.moveTo(0, h / 2);
        for (let x = 0; x < w; x++) {
          ctx.lineTo(x, h / 2);
        }
        ctx.stroke();
      }

      offset += params.isBalanced ? 1.0 : 2.5;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [selectedStatsList, params.isBalanced]);

  // Generate dynamic quarks based on the selected Nucleon (Isotope) configuration
  const config = params.nucleonConfig || 'deuterium';
  
  const nucleonsDef: { type: 'Neutron' | 'Proton'; label: string; cx: number; cy: number; cz: number }[] = [];
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
  }

  const quarks: {
    id: string;
    name: string;
    nucleon: string;
    type: 'down-quark' | 'up-quark';
    charge: string;
    mass: string;
    defaultPos: string;
    status: string;
  }[] = [];

  let quarkCounter = 1;
  nucleonsDef.forEach((n) => {
    if (n.type === 'Neutron') {
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `d-Quark #${quarkCounter}`, 
        nucleon: n.label, 
        type: 'down-quark', 
        charge: '-1/3 e', 
        mass: '4.8 MeV/c²', 
        defaultPos: `${n.cx - 10}, ${n.cy - 8}, ${n.cz - 5}`, 
        status: 'Stable binding' 
      });
      quarkCounter++;
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `u-Quark #${quarkCounter}`, 
        nucleon: n.label, 
        type: 'up-quark', 
        charge: '+2/3 e', 
        mass: '2.3 MeV/c²', 
        defaultPos: `${n.cx + 8}, ${n.cy + 12}, ${n.cz + 3}`, 
        status: 'Stable binding' 
      });
      quarkCounter++;
      // The 3rd quark of each Neutron is transmutable
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `d-Quark #${quarkCounter} (Transmutable)`, 
        nucleon: n.label, 
        type: 'down-quark', 
        charge: '-1/3 e', 
        mass: '4.8 MeV/c²', 
        defaultPos: `${n.cx - 2}, ${n.cy - 4}, ${n.cz + 8}`, 
        status: 'Beta-decay origin' 
      });
      quarkCounter++;
    } else {
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `u-Quark #${quarkCounter}`, 
        nucleon: n.label, 
        type: 'up-quark', 
        charge: '+2/3 e', 
        mass: '2.3 MeV/c²', 
        defaultPos: `${n.cx - 10}, ${n.cy - 8}, ${n.cz - 5}`, 
        status: 'Stable binding' 
      });
      quarkCounter++;
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `d-Quark #${quarkCounter}`, 
        nucleon: n.label, 
        type: 'down-quark', 
        charge: '-1/3 e', 
        mass: '4.8 MeV/c²', 
        defaultPos: `${n.cx + 8}, ${n.cy + 12}, ${n.cz + 3}`, 
        status: 'Stable binding' 
      });
      quarkCounter++;
      quarks.push({ 
        id: `quark-${quarkCounter}`, 
        name: `u-Quark #${quarkCounter}`, 
        nucleon: n.label, 
        type: 'up-quark', 
        charge: '+2/3 e', 
        mass: '2.3 MeV/c²', 
        defaultPos: `${n.cx - 2}, ${n.cy - 4}, ${n.cz + 8}`, 
        status: 'Stable binding' 
      });
      quarkCounter++;
    }
  });

  // Dynamic values or display labels representing the selected particle properties
  const selectedStats = selectedStatsList && selectedStatsList.length > 0 ? selectedStatsList[0] : null;
  const speedDisplay = selectedStats ? `${selectedStats.speed.toFixed(2)}` : '0.00';
  const kineticEnergy = selectedStats 
    ? (selectedStats.type === 'antineutrino' 
       ? (selectedStats.speed * 0.15).toFixed(3) 
       : (0.5 * 1.0 * selectedStats.speed * selectedStats.speed * 0.08).toFixed(2))
    : '0.00';

  return (
    <div className="bg-[#09090b] rounded-xl border border-[#27272a] p-5 flex flex-col h-full" id="particle-inventory-module">
      <div className="flex flex-row justify-between items-start mb-4">
        <div>
          <span className="text-[10px] tracking-widest font-mono text-[#71717a] uppercase font-semibold">Interaction Inventory</span>
          <h2 className="text-xl font-serif italic text-zinc-100 flex items-center gap-2">
            <Orbit size={20} className="text-[#c5a059]" />
            Particle & Subsystem Explorer
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex bg-black/60 border border-[#27272a]/80 p-0.5 rounded font-mono text-[9px] font-bold">
          <button
            onClick={() => setActiveTab('sub')}
            className={`px-3 py-1 rounded transition-all leading-none ${activeTab === 'sub' ? 'bg-[#c5a059] text-black' : 'text-[#71717a] hover:text-zinc-200'}`}
          >
            Sub-Nucleons (Quarks)
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`px-3 py-1 rounded transition-all leading-none ${activeTab === 'meta' ? 'bg-[#c5a059] text-black' : 'text-[#71717a] hover:text-zinc-200'}`}
          >
            Meta-Ejections (Cascade)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-stretch">
        
        {/* Left Hand: The Particle Lists (7 columns on desktop) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {activeTab === 'sub' ? (
            <div className="space-y-2">
              <div className="text-[11px] text-[#71717a] font-sans text-left mb-2.5">
                The sub-nucleon systems comprise basic quark lattices binding individual Protons ($|uud\rangle$) and Neutrons ($|udd\rangle$). Click any node to establish local tracking.
              </div>

              <div className="grid grid-cols-1 gap-1.5 select-none text-left">
                {quarks.map((q) => {
                  const isSelected = selectedIds.includes(q.id);
                  
                  // Live status adjustments
                  let currentLabel = q.type === 'down-quark' ? 'd (down}' : 'u (up)';
                  let currentCharge = q.charge;
                  let currentStatus = q.status;
                  let colorClass = q.type === 'down-quark' ? 'text-cyan-400 border-cyan-950/25 bg-cyan-950/5' : 'text-[#f59e0b] border-amber-950/25 bg-amber-950/5';

                  const isTransmutable = q.name.includes('Transmutable');

                  if (isTransmutable) {
                    if (!params.isBalanced) {
                      currentLabel = 'u (up)';
                      currentCharge = '+2/3 e';
                      currentStatus = 'Decayed into Proton Quark!';
                      colorClass = 'text-emerald-400 border-emerald-990/25 bg-emerald-950/5';
                    } else if (params.zeroShieldStability > 0) {
                      currentStatus = 'Confinement drift wiggles';
                      colorClass = 'text-cyan-300 border-cyan-800/20 bg-cyan-950/10 animate-pulse';
                    }
                  }

                  return (
                    <div
                      key={q.id}
                      onClick={() => handleToggleSelectId(q.id)}
                      className={`group p-2.5 rounded-lg border cursor-pointer hover:bg-zinc-900/30 transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-[#18181b]/95 border-[#c5a059] shadow-[0_0_12px_rgba(197,160,89,0.1)]' 
                          : 'bg-black/30 border-[#27272a]/60 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${colorClass}`}>
                          {isTransmutable && !params.isBalanced ? 'u' : q.type === 'down-quark' ? 'd' : 'u'}
                        </div>
                        <div>
                          <div className="text-xs font-serif italic text-zinc-200 font-bold flex items-center gap-1.5">
                            {isTransmutable ? `${q.name.split(' (')[0]} (Beta Origin)` : q.name}
                            <span className="text-[8px] font-mono font-medium px-1 bg-zinc-950 rounded border border-zinc-900 text-[#71717a] leading-tight">
                              {q.nucleon}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#71717a] font-mono font-medium mt-0.5">
                            {currentStatus} | m_0: {q.mass}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono text-[10px] flex items-center gap-3">
                        <div>
                          <span className="text-[#a1a1aa] font-bold">{currentCharge}</span>
                        </div>
                        <Eye size={12} className={`transition ${isSelected ? 'text-[#c5a059]' : 'text-[#71717a] group-hover:text-zinc-300'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Meta-System (Cascade ejections) - 5 columns
            <div className="flex-1 flex flex-col">
              {params.isBalanced ? (
                <div className="flex-1 flex flex-col items-center justify-center border border-[#27272a]/40 border-dashed rounded-xl p-6 bg-black/15 text-center min-h-[220px]">
                  <Zap size={24} className="text-zinc-600 mb-2 animate-bounce" />
                  <span className="text-xs font-mono font-bold text-zinc-400">CASCADE ENVELOPE OFFLINE</span>
                  <p className="text-[11px] text-[#71717a] font-sans max-w-sm mt-1 leading-relaxed">
                    Symmetry is coherent. No relativistic particles have been ejected yet. Create confinement shielding or trigger a collapse to spawn active leptons and neutrinos!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="text-[11px] text-[#71717a] font-sans text-left mb-1.5">
                    Click any energetic decay partner currently traveling through the spatial projection to engage telemetry lock (supports up to 4 concurrent multi-locks).
                  </div>

                  {/* List the representative particles in a table-like layout */}
                  <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
                    {activeLeptons && activeLeptons.length > 0 ? (
                      activeLeptons.map((lepton) => {
                        const isSelected = selectedIds.includes(lepton.id);
                        const typeStr = lepton.type;
                        
                        let symbol = 'ν̅_e';
                        let colorBadge = 'bg-purple-950/20 text-purple-400 border-purple-800/30';
                        let particleName = 'Antineutrino';
                        
                        if (typeStr === 'electron') {
                          symbol = 'β⁻ (e⁻)';
                          colorBadge = 'bg-cyan-950/20 text-cyan-400 border-cyan-800/30';
                          particleName = 'Electron';
                        } else if (typeStr === 'positron') {
                          symbol = 'β⁺ (e⁺)';
                          colorBadge = 'bg-[#c5a059]/15 text-[#c5a059] border-[#c5a059]/20';
                          particleName = 'Positron';
                        } else if (typeStr === 'positronium') {
                          symbol = 'e⁺e⁻';
                          colorBadge = 'bg-pink-950/25 text-pink-400 border-pink-800/30';
                          particleName = 'Positronium';
                        } else if (typeStr === 'w-boson') {
                          symbol = 'W⁻';
                          colorBadge = 'bg-rose-950/20 text-rose-400 border-rose-800/30';
                          particleName = 'W⁻ Boson';
                        } else if (typeStr === 'w+boson') {
                          symbol = 'W⁺';
                          colorBadge = 'bg-indigo-950/25 text-indigo-400 border-indigo-800/30';
                          particleName = 'W⁺ Boson';
                        } else if (typeStr === 'z-boson') {
                          symbol = 'Z⁰';
                          colorBadge = 'bg-yellow-950/20 text-yellow-400 border-yellow-800/30';
                          particleName = 'Z⁰ Boson';
                        } else if (typeStr === 'deuterium-seed') {
                          symbol = '²H*';
                          colorBadge = 'bg-green-950/20 text-green-400 border-green-800/30';
                          particleName = '²H Seed';
                        } else if (typeStr === 'tritium-seed') {
                          symbol = '³H*';
                          colorBadge = 'bg-teal-950/20 text-teal-450 border-teal-850/35';
                          particleName = '³H Seed';
                        } else if (typeStr === 'alpha-seed') {
                          symbol = '⁴He*';
                          colorBadge = 'bg-orange-950/20 text-orange-400 border-orange-800/30';
                          particleName = 'Alpha Seed';
                        }
                        
                        return (
                          <div
                            key={lepton.id}
                            onClick={() => handleToggleSelectId(lepton.id)}
                            className={`p-2 rounded border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                              isSelected 
                                ? 'bg-[#18181b] border-[#c5a059] text-zinc-100 shadow-[0_0_8px_rgba(197,160,89,0.08)]' 
                                : 'bg-black/40 border-[#27272a]/40 text-[#a1a1aa] hover:border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            <div className="flex flex-col gap-1 max-w-[70%]">
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold leading-none ${colorBadge}`}>
                                  {symbol}
                                </span>
                                <span className="font-serif italic font-medium text-[11px] text-zinc-300 animate-pulse">
                                  {particleName} #{lepton.index} <span className="text-[8px] font-mono font-normal opacity-65">(Active)</span>
                                </span>
                              </div>
                              {lepton.instructions && lepton.instructions[lepton.currentInstructionIndex] && (
                                <div className="text-[9.5px] text-[#c5a059] font-mono leading-tight mt-0.5 pl-1 border-l border-[#c5a059]/40 break-words">
                                  {lepton.instructions[lepton.currentInstructionIndex]}
                                </div>
                              )}
                            </div>
 
                            <span className="font-mono text-[9px] text-[#71717a] flex items-center gap-2">
                              <span>v: {lepton.speed.toFixed(2)} c</span>
                              <Eye size={11} className={isSelected ? 'text-[#c5a059]' : 'text-[#71717a]'} />
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      [0, 1, 2, 3, 4, 15, 30].map((idx) => {
                        const targetLeptonId = `lepton-${idx}`;
                        const isSelected = selectedIds.includes(targetLeptonId);
                        const typeStr = idx % 3 === 0 ? 'electron' : idx % 3 === 1 ? 'positron' : 'antineutrino';
                        const symbol = typeStr === 'electron' ? 'β⁻ (e⁻)' : typeStr === 'positron' ? 'β⁺ (e⁺)' : 'ν̅_e';
                        const colorBadge = typeStr === 'electron' ? 'bg-cyan-950/20 text-cyan-400 border-cyan-800/30' : typeStr === 'positron' ? 'bg-[#c5a059]/15 text-[#c5a059] border-[#c5a059]/20' : 'bg-purple-950/20 text-purple-400 border-purple-800/30';
                        const particleName = typeStr === 'electron' ? 'Electron' : typeStr === 'positron' ? 'Positron' : 'Antineutrino';
                        const restingInsts = getInventoryParticleInstructions(typeStr);
                        
                        return (
                          <div
                            key={idx}
                            onClick={() => handleToggleSelectId(targetLeptonId)}
                            className={`p-2 rounded border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                              isSelected 
                                ? 'bg-[#18181b] border-[#c5a059] text-zinc-100 shadow-[0_0_8px_rgba(197,160,89,0.08)]' 
                                : 'bg-black/40 border-[#27272a]/40 text-[#a1a1aa] hover:border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            <div className="flex flex-col gap-1 max-w-[70%]">
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold leading-none ${colorBadge}`}>
                                  {symbol}
                                </span>
                                <span className="font-serif italic font-medium text-[11px] text-zinc-300">
                                  {particleName} Ejecta #{idx}
                                </span>
                              </div>
                              <div className="text-[9.5px] text-[#71717a] font-mono leading-tight mt-0.5 pl-1 border-l border-[#27272a] break-words">
                                {restingInsts[0]}
                              </div>
                            </div>
 
                            <span className="font-mono text-[9px] text-[#71717a] flex items-center gap-2">
                              <span>Resting</span>
                              <Eye size={11} className={isSelected ? 'text-[#c5a059]' : 'text-[#71717a]'} />
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Hand: The Tracking Oscilloscope Dashboard (5 columns on desktop) */}
        <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#27272a]/60 pt-4 md:pt-0 md:pl-5">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[#71717a] uppercase mb-2">
                <span className="flex items-center gap-1.5 text-[#c5a059]">
                  <Activity size={12} /> Live Wave mechanics
                </span>
                <span>ψ(x,t) Eigenstate</span>
              </div>

              {/* Graphical Quantum Waveform Display */}
              <div className="relative rounded-lg bg-black/60 border border-[#27272a]/50 p-1 mb-3.5">
                <canvas 
                  ref={waveCanvasRef} 
                  width={240} 
                  height={85} 
                  className="w-full h-[85px] block rounded"
                />
                <div className="absolute bottom-1 right-2 font-mono text-[7px] text-[#71717a] font-bold tracking-wide">
                  COHERENT PROJECTION SCREEN
                </div>
              </div>

              {/* Dynamic Telemetry Specs comparing grid */}
              <div className="space-y-3 pr-1 max-h-[290px] overflow-y-auto">
                {selectedStatsList && selectedStatsList.length > 0 ? (
                  selectedStatsList.map((stats, cellIdx) => {
                    const statusColor = stats.interactionState.includes('Stable') || stats.interactionState.includes('Coherent') ? 'text-emerald-400' : 'text-cyan-400';
                    const activeColors = ['border-[#06b6d4]/45', 'border-[#f59e0b]/45', 'border-[#22d3ee]/45', 'border-[#ec4899]/45', 'border-[#a855f7]/45'];
                    const borderAccent = activeColors[cellIdx % activeColors.length];
                    
                    return (
                      <div 
                        key={stats.id} 
                        className={`space-y-1.5 text-left bg-black/45 p-2.5 rounded-lg border ${borderAccent} transition-all`}
                      >
                        <div className="text-[9px] font-mono text-[#a1a1aa] font-bold border-b border-[#27272a]/45 pb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
                            LOCK TARGET ({cellIdx + 1}):
                          </span>
                          <span className="text-[#c5a059] font-serif italic text-[10px] font-bold">
                            {stats.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[9px]">
                          <div>
                            <span className="text-[#71717a]">Coordinates:</span>
                            <div className="text-zinc-300 font-bold truncate">
                              [{stats.x.toFixed(1)}, {stats.y.toFixed(1)}, {stats.z.toFixed(1)}]
                            </div>
                          </div>
                          <div>
                            <span className="text-[#71717a]">Speed Vector:</span>
                            <div className="text-zinc-200 font-bold truncate">
                              v: {stats.speed.toFixed(3)} c
                            </div>
                          </div>
                          <div>
                            <span className="text-[#71717a]">Electric Q:</span>
                            <div className="text-[#c5a059] font-bold">
                              {stats.charge}
                            </div>
                          </div>
                          <div>
                            <span className="text-[#71717a]/70">Baryon / Mass:</span>
                            <div className="text-zinc-300 font-semibold truncate">
                              {stats.mass}
                            </div>
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-[#27272a]/30">
                          <span className="font-mono text-[8px] text-[#71717a] uppercase font-bold block">Confinement Matrix:</span>
                          <span className={`text-[10px] font-serif italic font-bold leading-tight block truncate ${statusColor}`}>
                            {stats.interactionState}
                          </span>
                        </div>

                        {stats.instructions && stats.instructions.length > 0 && (
                          <div className="pt-2 border-t border-[#27272a]/30 space-y-1">
                            <span className="font-mono text-[8px] text-[#a1a1aa] uppercase font-bold block">Quantum Decay Blueprint (Pre-Scheduled):</span>
                            <div className="space-y-1 max-h-[85px] overflow-y-auto pr-0.5 custom-scrollbar">
                              {stats.instructions.map((inst: string, instIdx: number) => {
                                const isActive = instIdx === stats.currentInstructionIndex;
                                return (
                                  <div 
                                    key={instIdx} 
                                    className={`text-[8.5px] font-mono p-1 rounded-sm border transition-all ${
                                      isActive 
                                        ? 'bg-[#c5a059]/15 border-[#c5a059]/40 text-[#c5a059] font-bold shadow-[0_0_4px_rgba(197,160,89,0.05)]' 
                                        : 'bg-black/20 border-[#27272a]/20 text-[#71717a]'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center text-[7.5px] font-bold tracking-wide">
                                      <span>{isActive ? '● ACTIVE PHASE' : `PHASE ${instIdx + 1}`}</span>
                                    </div>
                                    <div className="mt-0.5 font-sans leading-normal break-words text-[8px]">
                                      {inst}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center p-6 border border-zinc-800/40 border-dashed rounded-lg bg-black/10">
                    <span className="font-mono text-[10px] text-[#71717a]">NO LOCK TARGETS ENGAGED</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272a]/45 font-mono text-[9px] text-[#71717a] text-left leading-relaxed">
              * The quantum wavefunction maps probability density envelopes representing spatial probability clouds of leptons.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
