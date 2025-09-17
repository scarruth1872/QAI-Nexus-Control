
import React, { useState } from 'react';
import { runQaeAnalysis } from '../services/geminiService';
import { QaeAnalysisResult } from '../types';
import { Spinner } from './Spinner';
import { AlertIcon, QuantumCircuitIcon } from './Icons';

const severityClasses: { [key: string]: string } = {
    Low: 'border-cyan-500 text-cyan-300',
    Medium: 'border-amber-500 text-amber-300',
    High: 'border-rose-500 text-rose-300',
    Critical: 'border-red-500 text-red-300 animate-pulse',
};

export const QaeInterface: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<QaeAnalysisResult | null>(null);

    const handleScan = async () => {
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runQaeAnalysis();
            setResult(res);
        } catch (error) {
            console.error("QAE analysis failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) return null;
        
        const severityKey = result.severity as keyof typeof severityClasses;
        const severityClass = severityClasses[severityKey] || severityClasses.Low;

        return (
            <div className={`mt-10 bg-gray-800/50 border rounded-lg p-6 backdrop-blur-sm shadow-2xl space-y-4 animate-fade-in-up ${severityClass.replace('text-', 'border-').replace(/-\d+$/, '-500/30')} shadow-cyan-500/10`}>
                <div className="flex justify-between items-center">
                    <h3 className={`text-xl font-bold ${severityClass}`}>{result.severity} Anomaly Detected</h3>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full bg-opacity-20 ${severityClass.replace('border-', 'bg-').replace(/-\d+$/, '-500/20')}`}>{result.severity} Severity</span>
                </div>
                <p className="text-xs text-gray-500 font-mono">ID: {result.anomalyId}</p>
                
                <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="font-semibold text-gray-300 mb-2">Description</h4>
                    <p className="text-sm text-gray-300">{result.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 bg-black/30 rounded-lg">
                        <h4 className="font-semibold text-gray-300 mb-2">Probable Source</h4>
                        <p className="text-sm text-gray-300 font-mono">{result.source}</p>
                    </div>
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-green-300 mb-2">Suggested Action</h4>
                        <p className="text-sm text-green-200">{result.suggestedAction}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Quantum Anomaly Engine</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Initiate a deep-level scan of system telemetry to detect and classify operational anomalies using quantum-assisted heuristics.
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={handleScan}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 mr-2" />
                            Scanning...
                        </>
                    ) : (
                        <>
                            <QuantumCircuitIcon className="w-5 h-5 mr-2" />
                            Initiate Anomaly Scan
                        </>
                    )}
                </button>
            </div>

            {result && !isLoading && renderResult()}
            
             {!result && !isLoading && (
                <div className="text-center py-16 bg-gray-800/30 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-300">System is nominal. Awaiting scan initiation.</p>
                </div>
            )}
        </div>
    );
};