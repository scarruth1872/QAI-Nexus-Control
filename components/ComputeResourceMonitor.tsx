
import React, { useState, useEffect, useMemo } from 'react';
// FIX: Corrected import path for types to be a relative path.
import { Mission, AgentType } from '../types';

// Custom hook for smooth value animation
const useAnimatedValue = (targetValue: number, duration: number = 500) => {
    const [currentValue, setCurrentValue] = useState(targetValue);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let frame = 0;
        const startValue = currentValue;
        const valueDifference = targetValue - startValue;

        const counter = setInterval(() => {
            frame++;
            const progress = Math.min(frame / totalFrames, 1);
            const newValue = startValue + valueDifference * progress;
            setCurrentValue(newValue);

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [targetValue, duration, currentValue, totalFrames]);

    return currentValue;
};

const ResourceBar: React.FC<{ label: string; value: number; unit: string; color: string, max?: number }> = ({ label, value, unit, color, max = 100 }) => {
    const animatedValue = useAnimatedValue(value);

    return (
        <div className="bg-gray-900/50 p-3 rounded-md border border-indigo-500/10">
            <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{label}</h4>
                <p className="font-mono text-lg"><span className={color}>{animatedValue.toFixed(unit === '%' ? 1 : 2)}</span> <span className="text-xs text-gray-400">{unit}</span></p>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${Math.min((animatedValue / max) * 100, 100)}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
        </div>
    );
};

const agentResourceProfiles = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { qe: 5, coherence: -0.1, qflops: 10, cpu: 2, mem: 5, io: 1 },
  [AgentType.SOCIETAL_MODELING]:    { qe: 1, coherence: -0.02, qflops: 2, cpu: 10, mem: 8, io: 4 },
  [AgentType.PLANETARY_EXPLORATION]:{ qe: 2, coherence: -0.05, qflops: 5, cpu: 5, mem: 10, io: 10 },
};

const idleResources = {
    qe: 5, coherence: 99.8, qflops: 10, cpu: 15, mem: 20, io: 5
};

export const ComputeResourceMonitor: React.FC<{ mission: Mission | null }> = ({ mission }) => {
    const resourceUsage = useMemo(() => {
        if (!mission || mission.status !== 'executing') {
            return idleResources;
        }

        const activeTasks = mission.taskGraph.filter(task => task.status === 'in_progress');

        const load = activeTasks.reduce((acc, task) => {
            const profile = agentResourceProfiles[task.agent];
            if (profile) {
                const effortMultiplier = task.effort / 5; // Normalize effort
                acc.qe += profile.qe * effortMultiplier;
                acc.coherence += profile.coherence * effortMultiplier * 5; // Coherence drop is more sensitive
                acc.qflops += profile.qflops * effortMultiplier;
                acc.cpu += profile.cpu * effortMultiplier;
                acc.mem += profile.mem * effortMultiplier;
                acc.io += profile.io * effortMultiplier;
            }
            return acc;
        }, { qe: 0, coherence: 0, qflops: 0, cpu: 0, mem: 0, io: 0 });

        return {
            qe: Math.min(idleResources.qe + load.qe, 100),
            coherence: Math.max(idleResources.coherence + load.coherence, 85),
            qflops: Math.min(idleResources.qflops + load.qflops, 100),
            cpu: Math.min(idleResources.cpu + load.cpu, 100),
            mem: Math.min(idleResources.mem + load.mem, 1000),
            io: Math.min(idleResources.io + load.io, 100)
        };
    }, [mission]);

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Compute & Resource Allocation</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Real-time monitoring of the QAI's quantum and classical compute resources.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-300 border-b-2 border-cyan-500/30 pb-2">Quantum Core</h3>
                    <ResourceBar label="Qubit Entanglement" value={resourceUsage.qe} unit="QE/s" color="text-cyan-400" />
                    <ResourceBar label="State Coherence" value={resourceUsage.coherence} unit="%" color="text-cyan-400" />
                    <ResourceBar label="Computational Throughput" value={resourceUsage.qflops} unit="QFLOPS" color="text-cyan-400" />
                </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-300 border-b-2 border-amber-500/30 pb-2">Classical Substrate</h3>
                    <ResourceBar label="CPU Utilization" value={resourceUsage.cpu} unit="%" color="text-amber-400" />
                    <ResourceBar label="Memory Allocation" value={resourceUsage.mem} unit="PB" color="text-amber-400" max={1000} />
                    <ResourceBar label="Network I/O" value={resourceUsage.io} unit="Tbps" color="text-amber-400" />
                </div>
            </div>
        </div>
    );
};
