import React, { useState, useEffect } from 'react';
import { Shield, Database, Flame, Terminal, HelpCircle, Activity } from 'lucide-react';

interface InjectorProps {
  params: any;
  setParams: React.Dispatch<React.SetStateAction<any>>;
  onInject: () => void;
  onReset: () => void;
}

export default function ScriptInjector({ params, setParams, onInject, onReset }: InjectorProps) {
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "SYS_INIT: Quantum manifold stabilizer ONLINE.",
    "ENTROPY_INDEX: Adjusted near absolute minimum (S ~ 0).",
    "UNITY_LOCK: Synchronized core orbital generators."
  ]);

  useEffect(() => {
    if (params.isBalanced) {
      setConsoleLogs([
        "[STATE 0] Absolute zero thermal boundaries secured.",
        "COHERENCE: Perfect macroscopic wavefunction alignment.",
        "POTENTIAL_ENERGY: Dense core locked in cyclic state.",
        "STABILIZER: Weyl tensor anomaly risk minimized."
      ]);
    } else {
      setConsoleLogs([
        "⚠️ CRITICAL: Symmetry breaking event logged!",
        "DECAY_INIT: Transition through unstable absolute zero coordinate.",
        "SPECTRAL: Relativistic beta particle paths ejected.",
        "ENTROPY: Massive energy dissipation in vacuum.",
        "THERMODYNAMICAL: Expanding and cooling state."
      ]);
    }
  }, [params.isBalanced]);

  return (
    <div className="bg-[#09090b] rounded-xl border border-[#27272a] p-5 flex flex-col h-full" id="script-injector-interface">
      <div className="mb-4">
        <span className="text-[10px] tracking-widest font-mono text-[#71717a] uppercase font-semibold">Thermodynamic state Monitor</span>
        <h2 className="text-xl font-serif italic text-zinc-100 flex items-center gap-2">
          <Activity size={20} className="text-[#c5a059]" />
          Field Tensor Analyzer
        </h2>
      </div>

      {/* Dynamic Isotope (Nucleon Matrix) Selection Component */}
      <div className="mb-4 p-3 bg-[#111113]/90 border border-[#27272a] rounded-lg text-left">
        <label className="block text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wider mb-2">
          Nucleon Isotope Matrix Configuration (TGIU Integration)
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 font-mono text-[9px]">
          {[
            { id: 'majorana_5d', label: '5D Majorana', desc: 'Weyl primitive' },
            { id: 'pentaneutron_5d', label: 'Pentan-5D', desc: '5n (5D Tri)' },
            { id: 'neutron', label: 'Neutron', desc: '0p, 1n' },
            { id: 'hydrogen1', label: 'Hydrogen-1', desc: '1p, 0n' },
            { id: 'deuterium', label: 'Deuterium', desc: '1p, 1n' },
            { id: 'tritium', label: 'Tritium', desc: '1p, 2n' },
            { id: 'helium4', label: 'Helium-4', desc: '2p, 2n' }
          ].map((iso) => {
            const isSelected = params.nucleonConfig === iso.id;
            return (
              <button
                key={iso.id}
                onClick={() => setParams((p: any) => ({ ...p, nucleonConfig: iso.id }))}
                className={`py-1.5 px-0.5 text-center rounded border transition-all ${
                  isSelected 
                    ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059] font-bold shadow-[0_0_8px_rgba(197,160,89,0.1)]' 
                    : 'bg-black/30 border-[#27272a] text-[#71717a] hover:text-zinc-350 hover:border-zinc-800'
                }`}
              >
                <div className="font-semibold text-[9px] truncate">{iso.label}</div>
                <div className="text-[7.5px] opacity-75 mt-0.5 truncate">{iso.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        
        {/* Left Column: Wave Function Telemetry Metrics */}
        <div className="p-4 bg-black/40 border border-[#27272a]/60 rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span>●</span> Quantum Eigenstates
            </h3>
            <p className="text-xs text-[#71717a] font-sans leading-relaxed mb-4">
              Analyzing the high-energy unstable unity projection vector before and during symmetry fragmentation into leptons and antineutrinos.
            </p>

            <div className="space-y-2 font-mono text-[11px] text-zinc-300">
              <div className="flex justify-between items-center py-1 border-b border-[#27272a]/30">
                <span className="text-[#71717a]">Cosmic Aeon Age:</span>
                <span className="text-[#c5a059] font-serif italic font-bold">Epoch #{params.aeonCount}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#27272a]/30">
                <span className="text-[#71717a]">Fermi Potential Q:</span>
                <span className="text-zinc-200 font-bold">18.67 MeV</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#27272a]/30">
                <span className="text-[#71717a]">Relativity Constant γ:</span>
                <span className="text-[#c5a059]">0.9987 c</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#27272a]/30">
                <span className="text-[#71717a]">Symmetry Class:</span>
                <span className="text-amber-500 font-bold">{params.isBalanced ? "COHERENT S₀" : "BROKEN COLLAPSE"}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#71717a]">Local Fluctuation:</span>
                <span className="text-zinc-200">{params.isBalanced ? "0.000%" : "98.441%"}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a]/45 space-y-2 text-left">
            <h4 className="text-[9px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wider mb-1">Confinement Shield Diagnostics</h4>
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Shield size={14} className={
                  (params.zeroShieldStability ?? 0) === 100 ? "text-emerald-500 animate-pulse" :
                  (params.zeroShieldStability ?? 0) > 0 ? "text-cyan-400 animate-pulse" : "text-[#71717a]"
                } />
                <span className={`text-[10px] font-bold ${
                  (params.zeroShieldStability ?? 0) === 100 ? "text-emerald-400" :
                  (params.zeroShieldStability ?? 0) > 0 ? "text-cyan-400" : "text-[#71717a]"
                }`}>
                  {(params.zeroShieldStability ?? 0) === 100 ? "ZERO SHIELD SECURED" :
                   (params.zeroShieldStability ?? 0) > 0 ? "CREATING SHIELDING (CONFINEMENT)" : "NO SHIELD (ABS ZERO S₀)"}
                </span>
              </div>
              <span className={`font-bold ${
                (params.zeroShieldStability ?? 0) === 100 ? "text-emerald-400" :
                (params.zeroShieldStability ?? 0) > 0 ? "text-cyan-400" : "text-[#71717a]"
              }`}>{Math.round(params.zeroShieldStability ?? 0)}%</span>
            </div>
            
            {/* Visual Mini Progress Bar */}
            <div className="h-1 bg-zinc-950 border border-[#27272a]/40 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${
                  (params.zeroShieldStability ?? 0) === 100 ? "bg-emerald-500" :
                  (params.zeroShieldStability ?? 0) > 0 ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "bg-neutral-800"
                }`}
                style={{ width: `${params.zeroShieldStability ?? 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Console Log Analyzer */}
        <div className="p-4 bg-black/70 border border-[#27272a]/80 rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[10px] font-mono font-bold text-[#a1a1aa] uppercase tracking-wide flex items-center gap-1.5">
              <Terminal size={12} className="text-[#c5a059]" /> System logs
            </span>
            <span className="text-[8px] font-mono text-[#71717a] uppercase font-semibold">T = 0s₀_Manifold</span>
          </div>

          <div className="flex-1 min-h-[140px] rounded p-2.5 bg-black/60 border border-[#27272a]/40 font-mono text-[10px] leading-relaxed text-[#a1a1aa] overflow-y-auto space-y-1">
            {consoleLogs.map((log, i) => (
              <div key={i} className="flex gap-1">
                <span className="text-[#c5a059] pointer-events-none">&gt;</span>
                <span className="text-left font-medium">{log}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[10px] font-mono font-medium text-[#71717a] leading-relaxed text-left">
            Calculated Decaying Speed: <code className="bg-[#111113] border border-[#27272a] text-zinc-300 px-1 rounded font-bold">dN/dt = -λ * N</code>
          </div>
        </div>

      </div>

      {/* Manual stabilization actions */}
      <div className="mt-4 flex gap-2">
        {params.isBalanced ? (
          <button
            onClick={onInject}
            disabled={params.zeroShieldStability > 0}
            className={`flex-1 py-2.5 px-4 font-mono text-xs rounded transition font-bold ${
              params.zeroShieldStability > 0 
                ? "bg-zinc-950 border border-zinc-900 text-zinc-600 cursor-not-allowed" 
                : "bg-cyan-950/20 hover:bg-cyan-950/45 border border-cyan-800/30 hover:border-cyan-800/60 text-cyan-400"
            }`}
          >
            {params.zeroShieldStability > 0 ? `Shield Confinement Building (${params.zeroShieldStability}%)` : "Create Confinement Shielding"}
          </button>
        ) : (
          <button
            onClick={onReset}
            className="flex-1 py-2.5 px-4 bg-[#111113] hover:bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-[#a1a1aa] font-mono text-xs rounded transition"
          >
            Cool Down state (T → 0)
          </button>
        )}
      </div>
    </div>
  );
}
