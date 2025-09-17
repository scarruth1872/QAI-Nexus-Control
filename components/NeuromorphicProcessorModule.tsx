

import React from 'react';
import { NeuromorphicIntegrationResult } from '../types';
import { Spinner } from './Spinner';
import { BrainCircuitIcon, CheckCircleIcon } from './Icons';

interface NeuromorphicProcessorModuleProps {
    onInitiate: () => void;
    result: NeuromorphicIntegrationResult | null;
    isLoading: boolean;
    isUpgraded: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-rose-500/20 rounded-lg p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-300 mb-2">{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

export const NeuromorphicProcessorModule: React.FC<NeuromorphicProcessorModuleProps> = ({ onInitiate, result, isLoading, isUpgraded }) => {
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-rose-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-rose-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-rose-300">Neuromorphic Co-Processor</h3>
                <p className="mt-2 text-rose-200/80 max-w-3xl mx-auto text-sm">
                    Integrate a specialized neuromorphic co-processor to accelerate highly parallel, energy-efficient tasks like sensory data fusion.
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
                            Integrating...
                        </>
                    ) : isUpgraded ? (
                         <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            Integration Complete
                        </>
                    ) : (
                        <>
                            <BrainCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate Integration
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="space-y-3 animate-fade-in-up">
                    <ResultCard title={`Processor Model: ${result.processorModel}`}>
                        <p className="font-mono text-xs">{result.integrationSummary}</p>
                    </ResultCard>
                    <ResultCard title="Target Workloads">
                        <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                           {result.targetWorkloads.map((workload, i) => <li key={i}>{workload}</li>)}
                        </ul>
                    </ResultCard>
                    <ResultCard title="Performance Gains">
                        <p className="font-semibold text-green-400 text-xs">{result.performanceGains}</p>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};