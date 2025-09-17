
import React from 'react';
import { OrchestrationLogEntry, LogEntryType } from '../types';
import { CpuIcon, QuantumCircuitIcon, OptimizationIcon, NexusIcon, AlertIcon } from './Icons';

const logDetails: { [key in LogEntryType]: { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string; } } = {
    'Quantum': { icon: QuantumCircuitIcon, color: 'text-cyan-400' },
    'Classical': { icon: CpuIcon, color: 'text-amber-400' },
    'Optimization': { icon: OptimizationIcon, color: 'text-indigo-400' },
    'System': { icon: NexusIcon, color: 'text-gray-400' },
    'Error': { icon: AlertIcon, color: 'text-rose-400' },
};

export const OrchestrationMonitor: React.FC<{ log: OrchestrationLogEntry[] }> = ({ log }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Orchestration Layer Activity</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Real-time decision log from the system's integrative brain, managing quantum and classical resources.
                </p>
            </div>
            
            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm h-[60vh] flex flex-col p-4">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {log.length === 0 && (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Awaiting mission start to initialize orchestration log...
                        </div>
                    )}
                    {log.map((entry, index) => {
                        const details = logDetails[entry.type] || logDetails['System'];
                        const Icon = details.icon;
                        return (
                             <div key={index} className="flex items-start gap-3 p-2 rounded-md bg-black/20 animate-fade-in-up" style={{animationDelay: `${index * 20}ms`}}>
                                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${details.color}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline">
                                        <p className={`font-semibold text-sm ${details.color}`}>{entry.type} Tasking</p>
                                        <p className="text-xs text-gray-500 font-mono">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                    <p className="text-sm text-gray-300">{entry.decision}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};