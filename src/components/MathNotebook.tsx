import React, { useState } from 'react';
import { BookOpen, Book } from 'lucide-react';

export default function MathNotebook() {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. Entropy of Absolute Zero (S₀)",
      summary: "Universal state of perfect initial quantum coherence where thermal noise vanishes.",
      content: (
        <div className="space-y-3 text-zinc-300 font-sans text-sm leading-relaxed text-left">
          <p>
            At the thermal boundary of <strong>Absolute Zero (T = 0)</strong>, entropy approaches its absolute minimum:
          </p>
          <div className="p-2.5 bg-black/40 border border-[#27272a]/45 rounded font-mono text-[11px] text-[#c5a059] text-center">
            S = k_B * ln(Ω) → 0
          </div>
          <p>
            In this state, random thermal shaking ceases entirely. All physical coordinate coordinates fall into their lowest energy eigenvalues. In Geometric Unification theory, this is the master alignment coordinate: there are no local fluctuations, and the entire system behaves as a single macroscopic quantum wave.
          </p>
        </div>
      )
    },
    {
      title: "2. The Unstable Unity State",
      summary: "High-stress symmetric unity carrying dense quantum potential before spontaneous breaking.",
      content: (
        <div className="space-y-3 text-zinc-300 font-sans text-sm leading-relaxed text-left">
          <p>
            <strong>Unstable Unity</strong> represents a high-symmetry condition where all coordinates are locked into a single unified circular ring under the generator mapping. While aesthetically perfect, it has zero thermal dampening to absorb energy fluxes.
          </p>
          <p>
            The potential energy density is maximized. If the system is perturbed by even a single quantum unit, the unified symmetry breaks spontaneously, causing the potential structure to collapse and dissipate its core energy into the vacuum.
          </p>
        </div>
      )
    },
    {
      title: "3. Cascading Beta Decay Events",
      summary: "The quantum thermodynamics of coordinate collapse and particle-state creation.",
      content: (
        <div className="space-y-3 text-zinc-300 font-sans text-sm leading-relaxed text-left">
          <p>
            The collapse of the unstable thermodynamic unity is not silent; it triggers massive ejections of standard particles. In quantum field mechanics, this represents cascades of <strong>Beta Decay (β⁻ and β⁺)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 text-xs">
            <li>
              <strong>Beta-Minus (β⁻):</strong> Neutrons decay into protons, releasing a high-energy electron and an electron antineutrino, forming blue electric spirals on the projection screen.
            </li>
            <li>
              <strong>Beta-Plus (β⁺):</strong> Up-quarks convert to down-quarks, ejecting glowing gold positrons and neutrinos that trace hyper-parabolic paths.
            </li>
            <li>
              <strong>Fermi Energy Release:</strong> Decay events conserve global momentum, distributing kinetic momentum across the spatial coordinates.
            </li>
          </ul>
          <p className="mt-2 text-[10px] text-[#71717a] border-t border-[#27272a] pt-2 font-mono">
            N(t) = N₀ * e^(-λt) | dP/dt = -λ * N | E_decay = Q_value - E_neutrino
          </p>
        </div>
      )
    },
    {
      title: "4. TGIU Cubic Phase-Shift & Nucleon Coexistence",
      summary: "Analyzing phase boundary transitions and multi-neutron synthesis under cubic hermite spline functions.",
      content: (
        <div className="space-y-3 text-zinc-300 font-sans text-sm leading-relaxed text-left">
          <p>
            Standard classical thermodynamics models energy decay on an exponential or quadratic downward curve. However, the <strong>Thermodynamic Geometric Unification (TGIU)</strong> asserts that critical phase transitions of unified gauge groups undergo a <strong>cubic phase shift</strong>:
          </p>
          <div className="p-2.5 bg-black/40 border border-[#27272a]/45 rounded font-mono text-[11px] text-[#c5a059] text-center">
            {"P(\u03C4) = 3\u03C4\u00B2 - 2\u03C4\u00B3 \u2002|\u2002 dP/d\u03C4 = 6\u03C4(1 - \u03C4)"}
          </div>
          <p>
            This cubic profile forms an S-curve inflection. At the start and end of the energy transition, the rate of change vanishes, preventing instantaneous shocks and modeling the realistic delay of nucleon confinement setup and leptonic ejections.
          </p>
          <p>
            <strong>5D Pentaneutron & Shield emergence:</strong> In the 5-dimensional triangulation matrix, the minimal layer starts with nothing but neutrons and background neutrinos. Rather than starting with a pre-existing field, the system undergoes a spontaneous collapse: the neutrons collapse fast enough for other particles (beta electrons, positrons) to form. It is the high density of these expanding decay products that triggers the subsequent <em>Confinement Shield Emergence</em>. The emerging shield then applies extra-dimensional winding forces to wrap the coordinates and draw the particles back into absolute zero coherence.
          </p>
        </div>
      )
    },
    {
      title: "5. Neutronic Singularity & Time Compression Carry",
      summary: "Modeling the collapse of single-neutron systems into a micro black hole with lemniscate-bound decays.",
      content: (
        <div className="space-y-3 text-zinc-300 font-sans text-sm leading-relaxed text-left">
          <p>
            When simulating a isolated <strong>Single Neutron (the 0 state / Null Iso-Vector)</strong>, the lack of supporting electrostatic proton fields means that upon spontaneous symmetry breaking, the nucleons undergo key gravitational collapse directly into a central physical singularity:
          </p>
          <div className="p-2.5 bg-black/40 border border-[#27272a]/45 rounded font-mono text-[11px] text-[#c5a059] text-center">
            {"ds\u00B2 = -(1 - r_s/r) c\u00B2 dt\u00B2 + (1 - r_s/r)\u207B\u00B9 dr\u00B2 + r\u00B2 d\u03A9\u00B2 \u2002|\u2002 dt/d\u03C4 \u2192 \u221E"}
          </div>
          <p>
            Under Schwarzschild metrics, local coordinate time experiences extreme dilation. Leptonic decay ejecta (electrons and antineutrinos) cannot escape ballistically; instead, they are steered into stable orbital geodesic belts wrapping around the singularity. We model this extra-dimensional flow using a 3D <strong>Lemniscate of Bernoulli (The Infinity Loop)</strong> trajectory:
          </p>
          <div className="p-2.5 bg-black/40 border border-[#27272a]/45 rounded font-mono text-[10px] text-[#c5a059] text-center">
            x(t) = a·cos(t) / (1 + sin²(t)) <br/>
            y(t) = a·sin(t)·cos(t) / (1 + sin²(t)) <br/>
            z(t) = a·\u03B2·sin(2t)
          </div>
          <p>
            <strong>Multi-Epoch Carry:</strong> As the universe transitions to successive epochs (Aeons), the compression energy of the previous collapsed state carries forward. This increases the local <em>black hole compression factor</em> for subsequent cycles, compressing spatial coordinates and dilating time (revolving orbitals faster near the core) as a persistent cosmic carry!
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#09090b] rounded-xl border border-[#27272a] p-5 flex flex-col h-full" id="math-notebook-module">
      <div className="mb-4">
        <span className="text-[10px] tracking-widest font-mono text-[#71717a] uppercase font-medium">Theoretical Groundings</span>
        <h2 className="text-xl font-serif italic text-zinc-100 flex items-center gap-2">
          <BookOpen size={20} className="text-[#c5a059]" />
          The Geometric Notebook
        </h2>
      </div>

      <div className="flex-1 space-y-3">
        {sections.map((section, idx) => {
          const isExpanded = expandedSection === idx;
          return (
            <div 
              key={idx}
              className="border border-[#27272a]/60 rounded overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedSection(isExpanded ? null : idx)}
                className={`w-full text-left p-3.5 flex justify-between items-start gap-4 transition-all ${
                  isExpanded ? 'bg-[#111113]/80 text-zinc-100' : 'bg-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div>
                  <h3 className="font-serif italic text-sm text-zinc-200">{section.title}</h3>
                  <p className="text-[11px] text-[#71717a] font-sans mt-0.5">{section.summary}</p>
                </div>
                <Book size={14} className={`flex-shrink-0 mt-0.5 transition ${isExpanded ? 'text-[#c5a059]' : 'text-[#71717a]'}`} />
              </button>

              {isExpanded && (
                <div className="p-4 bg-black/10 border-t border-[#27272a]/40 px-5">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
