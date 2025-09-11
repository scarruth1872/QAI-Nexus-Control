
import React from 'react';
import { ResilienceAnalysis } from '../types';
import { Spinner } from './Spinner';
import { ShieldCheckIcon } from './Icons';

interface ResilienceModuleProps {
    onInitiate: () => void;
    result: ResilienceAnalysis | null;
    isLoading: boolean;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode; color?: string }> = ({ title, children, color = 'indigo' }) => (
    <div className={`bg-gray-900/50 border border-${color}-500/20 rounded-lg p-4`}>
        <h4 className={`text-sm font-semibold uppercase tracking-wider text-${color}-300 mb-2`}>{title}</h4>
        <div className="text-gray-200 text-sm">{children}</div>
    </div>
);

const severityColors = {
    'High': 'text-rose-400',
    'Medium': 'text-amber-400',
    'Low': 'text-cyan-400',
}

export const ResilienceModule: React.FC<ResilienceModuleProps> = ({ onInitiate, result, isLoading }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Predictive Self-Healing &amp; Adaptive Resilience</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Engage the PSHARM module to proactively anticipate, prevent, and autonomously mitigate system anomalies and potential failures.
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
                            Scanning for Anomalies...
                        </>
                    ) : (
                        <>
                            <ShieldCheckIcon className="w-5 h-5 mr-2" />
                            Initiate Resilience Scan
                        </>
                    )}
                </button>
            </div>
            
            {result && !isLoading && (
                 <div className="mt-10 bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-cyan-500/10 space-y-4 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-cyan-300 text-center">Resilience Analysis Complete</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                             <ResultCard title="Predicted Anomalies">
                                <ul className="space-y-2 font-mono text-xs">
                                    {result.predictedAnomalies.map((anomaly, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className={`mr-2 font-bold ${severityColors[anomaly.severity]}`}>[{anomaly.severity.toUpperCase()}]</span>
                                            <span className="text-gray-400">{anomaly.component}: {anomaly.description} ({(anomaly.probability * 100).toFixed(1)}% prob.)</span>
                                        </li>
                                    ))}
                                </ul>
                            </ResultCard>
                        </div>
                        <ResultCard title="System Health Score" color="cyan">
                             <div className="text-center">
                                <p className="text-5xl font-bold text-cyan-300">{result.systemHealthScore.toFixed(1)}<span className="text-2xl">%</span></p>
                                <p className="text-xs text-gray-400 mt-1">Overall operational integrity rating.</p>
                            </div>
                        </ResultCard>
                    </div>
                    <ResultCard title="Recommended Actions" color="green">
                        <ul className="list-disc list-inside space-y-1">
                            {result.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
                        </ul>
                    </ResultCard>
                 </div>
            )}
        </div>
    );
};
