import React, { useState, useEffect } from 'react';
import { BrainCircuitIcon } from './Icons';

interface KnowledgeBaseMonitorProps {
    isSkfActive: boolean;
}

const MetricDisplay: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
    <div className="bg-black/20 p-3 rounded-md text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{label}</div>
        <div className="font-mono font-bold text-2xl text-cyan-300 mt-1">{value}</div>
        <div className="text-xs text-gray-400">{unit}</div>
    </div>
);

export const KnowledgeBaseMonitor: React.FC<KnowledgeBaseMonitorProps> = ({ isSkfActive }) => {
    const [entries, setEntries] = useState(1478);
    const [relations, setRelations] = useState(isSkfActive ? 8392 : 0);

    useEffect(() => {
        if (isSkfActive) {
            const interval = setInterval(() => {
                setEntries(e => e + Math.floor(Math.random() * 5));
                setRelations(r => r + Math.floor(Math.random() * 20));
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isSkfActive]);
    
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Knowledge Base Status</h3>
                <div className={`mt-2 px-3 py-1 inline-block text-sm font-bold rounded-full ${isSkfActive ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {isSkfActive ? 'Semantic Knowledge Fabric: ACTIVE' : 'Legacy Knowledge Base: ACTIVE'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <MetricDisplay label="Data Entries" value={entries.toLocaleString()} unit="Items" />
                <MetricDisplay label="Inference Speed" value={isSkfActive ? "8.2" : "117.4"} unit="ms / query" />
                <MetricDisplay label="Semantic Relations" value={isSkfActive ? relations.toLocaleString() : "N/A"} unit="Links" />
                <MetricDisplay label="Data Coherence" value={isSkfActive ? "99.2" : "87.6"} unit="%" />
            </div>

             <div className="mt-6 text-center">
                <BrainCircuitIcon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-indigo-200/80">
                    {isSkfActive 
                        ? "Fabric is online. Cross-domain inference and synthesis are at peak efficiency." 
                        : "Legacy system operational. Upgrade to SKF for enhanced capabilities."}
                </p>
            </div>
        </div>
    );
};
