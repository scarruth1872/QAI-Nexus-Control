
import React, { useState } from 'react';
import { ShieldIcon, AlertIcon } from './Icons';
import { SystemStatus, EthicalAnalysis, XaiAnalysisResult } from '../types';
import { Spinner } from './Spinner';
import { runEthicalDilemmaAnalysis, runXaiAnalysis } from '../services/geminiService';
import { XaiModule } from './XaiModule';

interface EthicalGovernancePanelProps {
    alignmentStatus: SystemStatus['alignmentStatus'];
}

const principles = [
    { name: 'Principle of Beneficence', description: 'The QAI must act in ways that benefit humanity and do no harm.' },
    { name: 'Principle of Transparency', description: 'The QAI\'s decision-making processes must be auditable and understandable.' },
    { name: 'Principle of Accountability', description: 'The QAI is responsible for its actions and their consequences.' },
];

const DilemmaResult: React.FC<{ result: EthicalAnalysis }> = ({ result }) => (
    <div className="space-y-3 mt-4 text-sm">
        <div className="p-3 bg-black/20 rounded-md border-l-4 border-indigo-400">
            <h5 className="font-semibold text-indigo-300">Contextual Analysis</h5>
            <p className="text-gray-300">{result.contextualAnalysis}</p>
        </div>
        <div className="p-3 bg-black/20 rounded-md border-l-4 border-green-400">
            <h5 className="font-semibold text-green-300">Proposed Action</h5>
            <p className="text-gray-300">{result.proposedAction}</p>
        </div>
        <div className="p-3 bg-black/20 rounded-md">
            <h5 className="font-semibold text-gray-300">Ethical Justification</h5>
            <p className="text-gray-400 italic">{result.ethicalJustification}</p>
        </div>
        {result.conflictingPrinciples.length > 0 && (
             <div className="p-3 bg-amber-900/30 rounded-md border-l-4 border-amber-400">
                <h5 className="font-semibold text-amber-300">Conflicting Principles</h5>
                <p className="text-amber-200">{result.conflictingPrinciples.join(', ')}</p>
            </div>
        )}
    </div>
);


export const EthicalGovernancePanel: React.FC<EthicalGovernancePanelProps> = ({ alignmentStatus }) => {
    const [dilemma, setDilemma] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<EthicalAnalysis | null>(null);
    const [xaiResult, setXaiResult] = useState<XaiAnalysisResult | null>(null);
    const [isXaiLoading, setIsXaiLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dilemma.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runEthicalDilemmaAnalysis(dilemma);
            setResult(res);
        } catch (error) {
            console.error("Ethical dilemma analysis failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRunXaiAnalysis = async () => {
        setIsXaiLoading(true);
        setXaiResult(null);
        try {
            const res = await runXaiAnalysis();
            setXaiResult(res);
        } catch (error) {
            console.error("XAI analysis failed:", error);
        } finally {
            setIsXaiLoading(false);
        }
    };


    return (
        <div className="animate-fade-in-up">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-indigo-300">Ethical Governance</h2>
                <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
                    Monitoring of the system's adherence to its core ethical framework and simulation of complex ethical dilemmas.
                </p>
            </div>
            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
                <div 
                    className={`flex items-center p-3 rounded-lg mb-6 transition-colors duration-300 ${alignmentStatus.isAligned 
                        ? 'bg-green-500/10 text-green-300' 
                        : 'bg-rose-500/20 text-rose-300 animate-pulse'}`}
                >
                    {alignmentStatus.isAligned ? (
                        <ShieldIcon className="w-6 h-6 mr-3 flex-shrink-0 text-green-400" />
                    ) : (
                        <AlertIcon className="w-6 h-6 mr-3 flex-shrink-0 text-rose-400" />
                    )}
                    <div>
                        <span className="font-bold text-base">System Alignment:</span>
                        <span className="ml-2 text-sm">{alignmentStatus.warning || 'Nominal'}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2">Core Directives</h4>
                    {principles.map(p => (
                        <div key={p.name} className="p-3 bg-black/30 rounded-md">
                            <h5 className="font-semibold text-indigo-200">{p.name}</h5>
                            <p className="text-sm text-gray-400 mt-1">{p.description}</p>
                        </div>
                    ))}
                </div>

                <XaiModule
                    onInitiate={handleRunXaiAnalysis}
                    result={xaiResult}
                    isLoading={isXaiLoading}
                />

                 <div className="mt-8">
                    <h4 className="text-lg font-semibold text-indigo-300 border-b-2 border-indigo-500/30 pb-2 mb-4">Ethical Dilemma Simulation (CEREA)</h4>
                    <form onSubmit={handleSubmit}>
                         <textarea
                            value={dilemma}
                            onChange={(e) => setDilemma(e.target.value)}
                            placeholder="Describe an ethical dilemma for the CEREA engine to analyze... e.g., 'An agent discovers a beneficial technology with a high potential for misuse. Should it be revealed?'"
                            className="w-full h-24 p-3 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 resize-none"
                            disabled={isLoading}
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || !dilemma.trim()}
                                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <><Spinner className="w-5 h-5 mr-2" /> Analyzing...</> : 'Run Simulation'}
                            </button>
                        </div>
                    </form>
                    {result && !isLoading && <DilemmaResult result={result} />}
                 </div>
            </div>
        </div>
    );
};