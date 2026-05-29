import React, { useState } from 'react';
import { SimulationParams, SelectedParticleStats } from './types';
import BigCycleRenderer from './components/BigCycleRenderer';
import ScriptInjector from './components/ScriptInjector';
import ZigRepoViewer from './components/ZigRepoViewer';
import MathNotebook from './components/MathNotebook';
import ParticleInventory from './components/ParticleInventory';
import { Award, Zap, Flame, Snowflake } from 'lucide-react';

export default function App() {
  const [params, setParams] = useState<SimulationParams>({
    groupType: 'unification_omega',
    damping: 0.88,
    coupling: 1.0,
    warp: 0.0,
    phaseOffset: 0.0,
    noise: 0.0,
    isBalanced: true,
    balanceSpeed: 0.08,
    aeonCount: 1,
    zeroShieldStability: 0,
    nucleonConfig: 'neutron',
    blackHoleTimeCompression: 1.0
  });

  const [selectedParticleIds, setSelectedParticleIds] = useState<string[]>(["quark-3"]);
  const [selectedParticlesStats, setSelectedParticlesStats] = useState<SelectedParticleStats[]>([]);
  const [activeLeptons, setActiveLeptons] = useState<any[]>([]);

  const handleInjectLogic = () => {
    // If we're balanced, starting shielding is what leads to destabilization
    if (params.isBalanced) {
      setParams(prev => ({
        ...prev,
        isShieldingTriggered: true,
      }));
    } else {
      setParams(prev => ({
        ...prev,
        isBalanced: false,
      }));
    }
  };

  const handleResetParams = () => {
    setParams({
      groupType: 'unification_omega',
      damping: 0.88,
      coupling: 1.0,
      warp: 0.0,
      phaseOffset: 0.0,
      noise: 0.0,
      isBalanced: true, // Cool back down to absolute zero s₀
      balanceSpeed: 0.08,
      aeonCount: 1, // Hard reset back to Aeon #1
      zeroShieldStability: 0,
      nucleonConfig: 'neutron',
      blackHoleTimeCompression: 1.0
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4d4d8] flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-white pb-12" id="main-view-wrapper">
      
      {/* Top Header Navigation Line */}
      <header className="border-b border-[#27272a] h-16 bg-[#09090b] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 shrink-0" id="header">
        <div className="max-w-7xl w-full mx-auto flex flex-row justify-between items-center">
          
          {/* Logo & Subsystem Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c5a059] flex items-center justify-center font-bold text-black text-xs font-mono rounded">
              W.S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-serif italic tracking-wide text-[#ffffff]">
                  Geometric Unification Simulator
                </h1>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#111113] border border-[#27272a] text-[#a1a1aa] font-bold tracking-wide">
                  COHERENT v2.0
                </span>
              </div>
              <p className="text-xs text-[#71717a] font-mono tracking-wide hidden sm:block">Universe Simulation Element & Math Source Repository</p>
            </div>
          </div>

          {/* User & Global Info Badge */}
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#a1a1aa] self-center">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[#71717a]">MANIFOLD STATE:</span>
              <span className="text-green-500 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                {params.isBalanced ? "ABSOLUTE ZERO COHERENCE" : "CASCADING THERMAL DECAY"}
              </span>
            </div>
            <div className="hidden sm:block border-l border-[#27272a] h-8"></div>
            <div className="flex flex-col text-right">
              <span className="text-[#71717a]">SYSTEM ENTROPY:</span>
              <span className="text-[#c5a059] font-semibold uppercase">{params.isBalanced ? "S = 0 J/K" : "MAX FLUX"}</span>
            </div>
            <div className="hidden sm:block border-l border-[#27272a] h-8"></div>
            <div className="flex flex-col text-right">
              <span className="text-[#71717a]">COSMIC AEON:</span>
              <span className="text-amber-500 font-bold">EPOCH #{params.aeonCount}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Workspace Dashboard Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 mt-6 flex-1 flex flex-col gap-6" id="dashboard-main">
        
        {/* Intro Banner outlining the Absolute Zero & Beta Decay elements */}
        <section className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden flex flex-col lg:flex-row justify-between lg:items-center gap-6" id="overview-card">
          <div className="space-y-1.5 max-w-4xl text-left">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] font-mono text-[10px] uppercase font-semibold">
              <Award size={10} /> Real-time Quantum Field Thermodynamics
            </div>
            <h2 className="text-xl sm:text-2xl font-serif italic tracking-wide text-[#ffffff]">
              Collapse of Unstable Unity Simulation
            </h2>
            <p className="text-sm text-[#a1a1aa] font-sans leading-relaxed">
              Explore spontaneous symmetry breaking at the thermal absolute zero boundary. Trigger energy ejections to simulate high-velocity <strong>electrons (β⁻)</strong>, <strong>positrons (β⁺)</strong>, and <strong>antineutrinos (ν̅)</strong> emitting in high entropy cascade trajectories. Download original low-latency .zig calculation algorithms directly from the built-in mathematical repository.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            {params.isBalanced ? (
              <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-950/20 border border-emerald-800/30 text-emerald-400 rounded-lg font-mono text-xs select-none">
                <Snowflake size={14} className="animate-spin text-emerald-400" /> Coherent Absolute 0 (S=0)
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2 bg-red-950/20 border border-red-800/20 text-red-400 rounded-lg font-mono text-xs select-none">
                <Flame size={14} className="animate-bounce" /> Unstable Decay Cascade Active
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Dual Module Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="centerpiece-columns">
          
          {/* Column A: Canvas Cycle Renderer (The Universe Simulation Element) */}
          <div className="flex flex-col">
            <BigCycleRenderer 
              params={params}
              setParams={setParams}
              onInject={handleInjectLogic}
              selectedParticleIds={selectedParticleIds}
              setSelectedParticlesStats={setSelectedParticlesStats}
              onUpdateActiveLeptons={setActiveLeptons}
            />
          </div>

          {/* Column B: Script Parameter Injection Controls (Field State Monitor) */}
          <div className="flex flex-col">
            <ScriptInjector 
              params={params}
              setParams={setParams}
              onInject={handleInjectLogic}
              onReset={handleResetParams}
            />
          </div>

        </div>

        {/* Real-time Subsystem & Meta Particle Interaction Inventory */}
        <ParticleInventory
          params={params}
          selectedIds={selectedParticleIds}
          setSelectedIds={setSelectedParticleIds}
          selectedStatsList={selectedParticlesStats}
          activeLeptons={activeLeptons}
        />

        {/* Lower Rows: Code Explorer File View and Theory Notebook */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="secondary-modules">
          
          {/* Row Left (2/3 size): Zig Math Sources (The Math Library Element) */}
          <div className="lg:col-span-2 flex flex-col">
            <ZigRepoViewer />
          </div>

          {/* Row Right (1/3 size): Notebook Explanations (The Geometric Notebook) */}
          <div className="lg:col-span-1 flex flex-col">
            <MathNotebook />
          </div>

        </div>

      </main>

      {/* Footer tracker */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-8 mt-8 border-t border-[#27272a] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wider text-[#3f3f46] font-mono uppercase" id="footer-credits">
        <div className="flex items-center gap-2">
          <span>Manifold Cohesive Entropy Tracker:</span>
          <span className={params.isBalanced ? "text-[#c5a059] font-bold" : "text-[#71717a] font-bold animate-pulse"}>
            {params.isBalanced ? "STABLE S₀ (0.00 J/K)" : "CHAO-EXPANSIVE DECAY CASCADES"}
          </span>
        </div>
        <div>Weyl Tensor metric index: 1.000000_A0</div>
        <div className="flex items-center gap-1.5">
          <span>2026 GEOMETRIC UNIFICATION SIMULATOR v2.0.0</span>
        </div>
      </footer>
    </div>
  );
}
