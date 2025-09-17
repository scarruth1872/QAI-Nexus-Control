
import React from 'react';
import { SelfEvolvingAlgorithmResult } from '../types';
import { Spinner } from './Spinner';
import { RecursionIcon, CheckCircleIcon } from './Icons';

interface SelfEvolvingFrameworkProps {
    onInitiate: () => void;
    result: SelfEvolvingAlgorithmResult | null;
    isLoading: boolean;
    isUpgraded: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-rose-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const SelfEvolvingFramework: React.FC<SelfEvolvingFrameworkProps> = ({ onInitiate, result, isLoading, isUpgraded }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-rose-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-rose-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-rose-300">Self-Evolving Algorithm Framework</h3>
                <p className="mt-2 text-rose-200/80 max-w-3xl mx-auto text-sm">
                    Allow the system to autonomously explore, optimize, and adapt its own internal algorithms and configurations using meta-learning.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={onInitiate}
                    disabled={isLoading || isUpgraded}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 disabled:bg-rose-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Evolving...
                        </>
                    ) : isUpgraded ? (
                         <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            Upgrade Complete
                        </>
                    ) : (
                        <>
                            <RecursionIcon className="w-5 h-5 mr-2" />
                            Initiate Meta-Learning Cycle
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title={`Framework: ${result.framework}`}>
                        <p className="font-mono text-xs">Target Module: <span className="text-white">{result.targetModule}</span></p>
                    </ResultCard>
                     <ResultCard title="Optimization Method">
                        <p className="font-mono text-xs">{result.optimizationMethod}</p>
                    </ResultCard>
                     <ResultCard title="Discovered Improvement">
                        <p className="font-mono text-xs p-2 bg-black/30 rounded-md border border-indigo-500/10">{result.discoveredImprovement}</p>
                    </ResultCard>
                    <ResultCard title={`Projected Gain (${result.performanceMetric})`}>
                        <p className="font-semibold text-green-400 text-xs">{result.projectedGain}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};