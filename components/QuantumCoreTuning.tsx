
import React, { useState } from 'react';
import { QuantumRefinementResult } from '../types';
import { Spinner } from './Spinner';
import { QuantumCircuitIcon, CheckCircleIcon } from './Icons';
import { runQuantumRefinement } from '../services/geminiService';

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const QuantumCoreTuning: React.FC = () => {
    const [result, setResult] = useState<QuantumRefinementResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTuned, setIsTuned] = useState(false);

    const handleInitiate = async () => {
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runQuantumRefinement();
            setResult(res);
            setIsTuned(true);
        } catch (error) {
            console.error("Quantum refinement failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-cyan-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-300">Quantum Core Tuning</h3>
                <p className="mt-2 text-cyan-200/80 max-w-3xl mx-auto text-sm">
                    Optimize the quantum processing unit's algorithms and configurations for peak performance and stability.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={handleInitiate}
                    disabled={isLoading || isTuned}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Tuning...
                        </>
                    ) : isTuned ? (
                        <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            Core Tuned
                        </>
                    ) : (
                        <>
                            <QuantumCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate Tuning Cycle
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title="Algorithm Improvements">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                           {result.algorithmImprovements.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Hardware Enhancements">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                           {result.hardwareEnhancements.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Performance Gain">
                        <p className="font-semibold text-green-400 text-xs">{result.performanceGain}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};
