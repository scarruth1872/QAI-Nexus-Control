
import React from 'react';
// FIX: Corrected import paths for types and child components to be relative.
import { DGMOptimization } from '../types';
import { Spinner } from './Spinner';
import { OptimizationIcon } from './Icons';

interface DgmPanelProps {
    onInitiate: () => void;
    result: DGMOptimization | null;
    isLoading: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{children}</div>
    </div>
);

export const DgmPanel: React.FC<DgmPanelProps> = ({ onInitiate, result, isLoading }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Darwin Gödel Machine</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Initiate a self-improvement cycle. The system will analyze its own core logic and propose an optimization to enhance its mission planning capabilities.
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={onInitiate}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Optimizing...
                        </>
                    ) : (
                        <>
                            <OptimizationIcon className="w-5 h-5 mr-2" />
                            Initiate Self-Optimization Cycle
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="mt-10 bg-gray-800/50 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-green-500/10 space-y-4 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-green-300 text-center">Optimization Proposal Generated</h3>
                    <ResultCard title="Analysis of Current Logic">
                        <p>{result.analysis}</p>
                    </ResultCard>
                    <ResultCard title="Proposed Modification">
                        <p className="p-3 bg-black/30 rounded-md border border-indigo-500/10">{result.proposedModification}</p>
                    </ResultCard>
                    <ResultCard title="Rationale">
                        <p>{result.rationale}</p>
                    </ResultCard>
                    <ResultCard title="Projected Impact">
                        <p className="font-semibold text-green-400">{result.projectedImpact}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};
