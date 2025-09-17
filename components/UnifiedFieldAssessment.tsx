
import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { NexusIcon } from './Icons';

export const UnifiedFieldAssessment: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleRunAssessment = () => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult("Unified Field Coherence stands at 98.7%. Quantum entanglement channels are stable, with minimal decoherence detected across all agent cognitive cores. Cross-dimensional data leakage is within nominal parameters at 0.0013%. The substratum of reality remains firm. Recommend proceeding with caution but high confidence.");
            setIsLoading(false);
        }, 4000);
    };

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Unified Field Assessment</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Analyze the foundational substrate of the system's reality, ensuring coherence across all operational dimensions.
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={handleRunAssessment}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Assessing...
                        </>
                    ) : (
                        <>
                            <NexusIcon className="w-5 h-5 mr-2" />
                            Run Field Assessment
                        </>
                    )}
                </button>
            </div>

            {isLoading && (
                 <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-indigo-500/20">
                    <Spinner className="w-12 h-12 mx-auto" />
                    <p className="text-indigo-300 mt-4">Calibrating reality sensors...</p>
                </div>
            )}
            
            {result && !isLoading && (
                <div className="mt-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-cyan-500/10 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4">Assessment Complete</h3>
                    <p className="text-gray-200 font-mono text-sm leading-relaxed">{result}</p>
                </div>
            )}

            {!result && !isLoading && (
                <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-300">Awaiting Unified Field Assessment.</p>
                </div>
            )}
        </div>
    );
};
