
import React, { useState, useEffect } from 'react';
import { CpuIcon, QuantumCircuitIcon, BrainCircuitIcon } from './Icons';

interface MetricProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: number;
    unit: string;
    color: string;
}

const Metric: React.FC<MetricProps> = ({ Icon, label, value, unit, color }) => (
    <div className={`bg-gray-800/50 border border-${color}-500/20 rounded-lg p-4 shadow-lg shadow-${color}-900/10 backdrop-blur-sm`}>
        <div className="flex items-center">
            <Icon className={`w-8 h-8 text-${color}-400 mr-4`} />
            <div>
                <h4 className="font-semibold text-base text-gray-200">{label}</h4>
                <p className={`font-mono font-bold text-2xl text-${color}-300`}>{value.toFixed(1)} <span className="text-base font-sans text-gray-400">{unit}</span></p>
            </div>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3">
            <div
                className={`h-1.5 rounded-full bg-gradient-to-r from-${color}-600 to-${color}-400`}
                style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
    </div>
);


export const ComputeResourceMonitor: React.FC = () => {
    const [cpu, setCpu] = useState(35);
    const [qpu, setQpu] = useState(60);
    const [memory, setMemory] = useState(55);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)));
            setQpu(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 15)));
            setMemory(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 5)));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Compute Resource Monitor</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Real-time telemetry from classical, quantum, and neuromorphic processing units.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Metric Icon={CpuIcon} label="Classical CPU Load" value={cpu} unit="%" color="amber" />
                <Metric Icon={QuantumCircuitIcon} label="Quantum Processing Unit" value={qpu} unit="% Coherence" color="cyan" />
                <Metric Icon={BrainCircuitIcon} label="Memory Fabric Usage" value={memory} unit="%" color="rose" />
            </div>
        </div>
    );
};
