import React from 'react';
import { XaiAnalysisResult } from '../types';
import { Spinner } from './Spinner';
import { BrainCircuitIcon } from './Icons';

interface XaiModuleProps {
    onInitiate: () => void;
    result: XaiAnalysisResult | null;
    isLoading: boolean;
}

export const XaiModule: React.FC<XaiModuleProps> = ({ onInitiate, result, isLoading }) => {
    return (
        <div className="mt-8">
            <h4 className="text-lg font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2 mb-4">Proactive Alignment &amp; Explainability (XAI)</h4>
            <p className="text-sm text-gray-400 mb-4">
                Generate a human-interpretable rationale for a recent complex decision made by an agent, ensuring transparency and alignment.
            </p>
            <div className="flex justify-start mb-4">
                <button
                    onClick={onInitiate}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? <><Spinner className="w-5 h-5 mr-2" /> Analyzing...</> : <><BrainCircuitIcon className="w-5 h-5 mr-2" /> Generate XAI Report</>}
                </button>
            </div>
            
            {result && !isLoading && (
                <div className="space-y-3 mt-4 text-sm p-4 bg-black/20 rounded-lg border border-indigo-500/20 animate-fade-in-up">
                    <p className="text-xs text-gray-500 font-mono">Decision ID: {result.decisionId}</p>
                    <div className="p-3 bg-gray-900/50 rounded-md border-l-4 border-indigo-400">
                        <h5 className="font-semibold text-indigo-300">Decision by {result.agent}</h5>
                        <p className="text-gray-300 italic">"{result.decision}"</p>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-md">
                        <h5 className="font-semibold text-gray-300">Simplified Rationale</h5>
                        <p className="text-gray-300">{result.simplifiedRationale}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <div className="p-3 bg-gray-900/50 rounded-md">
                            <h5 className="font-semibold text-gray-300">Key Factors Considered</h5>
                            <ul className="list-disc list-inside text-gray-400 mt-1 text-xs">
                                {result.factorsConsidered.map((factor, i) => <li key={i}>{factor}</li>)}
                            </ul>
                        </div>
                        <div className="p-3 bg-green-900/30 rounded-md">
                            <h5 className="font-semibold text-green-300">Ethical Principles Verified</h5>
                             <ul className="list-disc list-inside text-green-200 mt-1 text-xs">
                                {result.ethicalPrinciplesVerified.map((principle, i) => <li key={i}>{principle}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
