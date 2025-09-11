import React from 'react';
import { QuantumCircuitIcon, OptimizationIcon, CpuIcon, BrainCircuitIcon, CubeIcon, ShieldIcon, RecursionIcon, LockClosedIcon, RoadmapIcon } from './Icons';

const roadmapData = [
  {
    phase: 1,
    title: "Core System Optimization & Quantum Layer Enhancement",
    timeline: "Next 6-12 Months",
    color: "cyan",
    initiatives: [
      { name: "Quantum Hardware Acceleration", icon: QuantumCircuitIcon },
      { name: "Hybrid AI Algorithmic Refinement", icon: OptimizationIcon },
      { name: "Dynamic Resource Allocation Agent (DRAA) Upgrade", icon: CpuIcon },
    ],
  },
  {
    phase: 2,
    title: "Knowledge Synthesis & Agent Autonomy Expansion",
    timeline: "Next 12-24 Months",
    color: "indigo",
    initiatives: [
      { name: "Semantic Knowledge Fabric (SKF) Initiative", icon: BrainCircuitIcon },
      { name: "Multi-Modal Generative Simulation Engines", icon: CubeIcon },
      { name: "Proactive Alignment & Explainability Modules", icon: ShieldIcon },
    ],
  },
  {
    phase: 3,
    title: "Predictive Self-Improvement & Resilient Architecture",
    timeline: "24+ Months",
    color: "rose",
    initiatives: [
      { name: "Self-Evolving Algorithm Frameworks", icon: RecursionIcon },
      { name: "Quantum-Secure Communication & Data Integrity", icon: LockClosedIcon },
      { name: "Neuromorphic Co-Processor Integration", icon: BrainCircuitIcon },
    ],
  },
];

export const StrategicRoadmap: React.FC = () => {
    const currentPhase = 3;
    return (
        <div className="animate-fade-in-up max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300 flex items-center justify-center">
                    <RoadmapIcon className="w-8 h-8 mr-3" />
                    QAI Strategic Evolution Roadmap
                </h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    A multi-phase plan to systematically evolve the system's core capabilities, efficiency, and resilience.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {roadmapData.map((phaseData) => {
                    const color = phaseData.color;
                    return (
                         <div key={phaseData.phase} className={`bg-gray-800/50 border border-${color}-500/20 rounded-lg p-6 shadow-lg shadow-${color}-900/20 backdrop-blur-sm flex flex-col`}>
                            <div className="border-b border-${color}-500/20 pb-4">
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm font-bold text-${color}-400`}>Phase {phaseData.phase}</span>
                                    {phaseData.phase < currentPhase && <span className="text-xs text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full font-bold">COMPLETED</span>}
                                    {phaseData.phase === currentPhase && <span className={`text-xs text-${color}-300 bg-${color}-500/20 px-2 py-0.5 rounded-full font-bold`}>ACTIVE</span>}
                                    <span className="text-xs text-gray-400 font-mono">{phaseData.timeline}</span>
                                </div>
                                <h3 className={`mt-2 text-xl font-bold text-${color}-300`}>{phaseData.title}</h3>
                            </div>
                            <div className="mt-4 flex-1">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">Key Initiatives</h4>
                                <ul className="space-y-3">
                                    {phaseData.initiatives.map((initiative) => {
                                        const Icon = initiative.icon;
                                        return (
                                            <li key={initiative.name} className="flex items-center">
                                                <div className={`p-2 bg-gray-900/50 rounded-md mr-3 border border-${color}-500/10`}>
                                                    <Icon className={`w-5 h-5 text-${color}-400`} />
                                                </div>
                                                <span className="text-sm text-gray-200">{initiative.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};