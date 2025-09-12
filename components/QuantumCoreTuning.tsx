
import React from 'react';
// FIX: Corrected import path for types to be a relative path.
import { QuantumRefinementResult } from '../types';
import { Spinner } from './Spinner';
// FIX: Corrected import path for Icons to be a relative path.
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
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Quantum Core Refinement</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Initiate a deep recalibration cycle for the Quantum Processing Unit (QPU) to enhance entanglement fidelity and reduce decoherence rates.
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={onInitiate}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Calibrating...
                        </>
                    ) : (
                        <>
                            <QuantumCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate QPU Tuning Cycle
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="mt-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-cyan-500/10 space-y-4 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-cyan-300 text-center">Refinement Protocol Complete</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <ResultCard title="Overall Performance Gain">
                        <p className="font-semibold text-green-400">{result.performanceGain}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};