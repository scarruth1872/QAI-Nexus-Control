

import React from 'react';
import { ResilienceAnalysis } from '../types';
import { Spinner } from './Spinner';
import { ShieldCheckIcon, CheckCircleIcon } from './Icons';

interface ResilienceModuleProps {
    onInitiate: () => void;
    result: ResilienceAnalysis | null;
    isLoading: boolean;
    isUpgraded: boolean;
}

const severityClasses = {
    Low: 'border-cyan-500 text-cyan-300',
    Medium: 'border-amber-500 text-amber-300',
    High: 'border-rose-500 text-rose-300',
};


export const ResilienceModule: React.FC<ResilienceModuleProps> = ({ onInitiate, result, isLoading, isUpgraded }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Predictive Resilience (PSHARM)</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Engage the Predictive Self-Healing & Adaptive Resilience Module to anticipate potential failures and receive proactive recovery protocols.
                </p>
            </div>

             <div className="flex justify-center mb-8">
                <button
                    onClick={onInitiate}
                    disabled={isLoading || isUpgraded}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Analyzing...
                        </>
                    ) : isUpgraded ? (
                        <>
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
                            PSHARM Active
                        </>
                    ) : (
                        <>
                            <ShieldCheckIcon className="w-5 h-5 mr-2" />
                            Run PSHARM Analysis
                        </>
                    )}
                </button>
            </div>

            {result && !isLoading && (
                 <div className="mt-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-cyan-500/10 space-y-6 animate-fade-in-up">
                    <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
                        <h3 className="text-xl font-bold text-cyan-300">Resilience Analysis Complete</h3>
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-wider text-indigo-300">System Health Score</p>
                            <p className="text-3xl font-mono font-bold text-green-400">{result.systemHealthScore}%</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold text-cyan-300 mb-3">Predicted Anomalies</h4>
                        <div className="space-y-3">
                            {result.predictedAnomalies.map((anomaly, index) => (
                                <div key={index} className={`p-3 bg-black/30 rounded-md border-l-4 ${severityClasses[anomaly.severity]}`}>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="font-semibold">{anomaly.component}</p>
                                        <div className="flex items-center space-x-4">
                                            <span>Probability: <span className="font-mono">{anomaly.probability.toFixed(2)}%</span></span>
                                            <span className={`px-2 py-0.5 text-xs font-bold rounded-full bg-opacity-20 ${severityClasses[anomaly.severity].replace('border-', 'bg-').replace('text-cyan-300', 'text-cyan-200').replace('text-amber-300', 'text-amber-200').replace('text-rose-300', 'text-rose-200')}`}>{anomaly.severity}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{anomaly.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-cyan-300 mb-3">Recommended Actions</h4>
                         <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                            {result.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
                        </ul>
                    </div>
                 </div>
            )}

        </div>
    );
};