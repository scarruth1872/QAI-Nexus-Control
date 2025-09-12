
import React from 'react';
// FIX: Corrected import path for types to be a relative path.
import { SkfUpgradeResult } from '../types';
import { Spinner } from './Spinner';
// FIX: Corrected import path for Icons to be a relative path.
import { BrainCircuitIcon, CheckCircleIcon } from './Icons';

interface SkfUpgradeModuleProps {
    onInitiate: () => void;
    result: SkfUpgradeResult | null;
    isLoading: boolean;
    isUpgraded: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const SkfUpgradeModule: React.FC<SkfUpgradeModuleProps> = ({ onInitiate, result, isLoading, isUpgraded }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Semantic Knowledge Fabric Upgrade</h3>
                <p className="mt-2 text-indigo-200/80 max-w-3xl mx-auto text-sm">
                    Evolve the legacy knowledge base into the Semantic Knowledge Fabric (SKF) for superior data synthesis and advanced cross-domain inference.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={onInitiate}
                    disabled={isLoading || isUpgraded}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Synthesizing...
                        </>
                    ) : isUpgraded ? (
                         <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            Upgrade Complete
                        </>
                    ) : (
                        <>
                            <BrainCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate SKF Upgrade
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title="Upgrade Summary">
                        <p className="font-mono text-xs">{result.upgradeSummary}</p>
                    </ResultCard>
                    <ResultCard title="New Capabilities">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                            {result.newCapabilities.map((cap, i) => <li key={i}>{cap}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Performance Impact">
                        <p className="font-semibold text-green-400 text-xs">{result.performanceImpact}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};