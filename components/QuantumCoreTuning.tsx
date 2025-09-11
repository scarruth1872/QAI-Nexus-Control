import React from 'react';
import { QuantumRefinementResult } from '../types';
import { Spinner } from './Spinner';
import { QuantumCircuitIcon } from './Icons';

interface QuantumCoreTuningProps {
    onInitiate: () => void;
    result: QuantumRefinementResult | null;
    isLoading: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const QuantumCoreTuning: React.FC<QuantumCoreTuningProps> = ({ onInitiate, result, isLoading }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-cyan-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-cyan-300">Quantum Core Tuning</h3>
                <p className="mt-2 text-cyan-200/80 max-w-3xl mx-auto text-sm">
                    Initiate hardware acceleration and algorithmic refinement for the quantum core, enhancing computational throughput and error correction.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={onInitiate}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Refining Core...
                        </>
                    ) : (
                        <>
                            <QuantumCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate Quantum Refinement
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title="Algorithm Improvements">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                            {result.algorithmImprovements.map((imp, i) => <li key={i}>{imp}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Hardware Enhancements">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                           {result.hardwareEnhancements.map((enh, i) => <li key={i}>{enh}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Overall Performance Gain">
                        <p className="font-semibold text-green-400 text-xs">{result.performanceGain}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};