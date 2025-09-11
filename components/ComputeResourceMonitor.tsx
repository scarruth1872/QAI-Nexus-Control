

import React, { useState, useEffect } from 'react';
import { CpuIcon, QuantumCircuitIcon, BrainCircuitIcon } from './Icons';

interface ComputeResourceMonitorProps {
    isNcpIntegrated?: boolean;
}

interface ResourceBarProps {
    label: string;
    value: number;
    colorClass: string;
    icon: React.ReactNode;
}

const ResourceBar: React.FC<ResourceBarProps> = ({ label, value, colorClass, icon }) => (
    <div className="flex items-center space-x-3">
        <div className={`p-2 bg-gray-900/50 rounded-md border border-indigo-500/10 ${colorClass}`}>
            {icon}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-indigo-200">{label}</span>
                <span className={`font-mono font-semibold text-base ${colorClass}`}>{value.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                    className={`h-2 rounded-full ${colorClass.replace('text-', 'bg-')}`}
                    style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
                ></div>
            </div>
        </div>
    </div>
);

const useFluctuatingValue = (base: number, range: number, interval: number) => {
    const [value, setValue] = useState(base);

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(v => {
                let newValue = v + (Math.random() - 0.5) * range;
                return Math.max(0, Math.min(100, newValue));
            });
        }, interval);

        return () => clearInterval(timer);
    }, [base, range, interval]);

    return value;
};


export const ComputeResourceMonitor: React.FC<ComputeResourceMonitorProps> = ({ isNcpIntegrated = false }) => {
    const classicalCpuBase = isNcpIntegrated ? 20 : 35;
    const classicalCpu = useFluctuatingValue(classicalCpuBase, 10, 1500);
    const quantumCore = useFluctuatingValue(60, 25, 2000);
    const neuromorphicBase = isNcpIntegrated ? 45 : 15;
    const neuromorphic = useFluctuatingValue(neuromorphicBase, isNcpIntegrated ? 20 : 5, 2500);
    
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Compute Resource Monitor</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Live telemetry from the Nexus computational substrates.
                </p>
            </div>

            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20 space-y-6">
                <ResourceBar
                    label="Classical Substrate (CPU)"
                    value={classicalCpu}
                    colorClass="text-amber-400"
                    icon={<CpuIcon className="w-6 h-6" />}
                />
                 <ResourceBar
                    label="Quantum Core (QPU)"
                    value={quantumCore}
                    colorClass="text-cyan-400"
                    icon={<QuantumCircuitIcon className="w-6 h-6" />}
                />
                 <ResourceBar
                    label="Neuromorphic Co-Processor"
                    value={neuromorphic}
                    colorClass="text-rose-400"
                    icon={<BrainCircuitIcon className="w-6 h-6" />}
                />
            </div>
        </div>
    );
};