
import React, { useState } from 'react';
import { runCognitiveSynthesis } from '../services/geminiService';
import { CognitiveSynthesisResult } from '../types';
import { Spinner } from './Spinner';
import { BrainCircuitIcon } from './Icons';

interface CognitiveSynthesizerProps {
    isSkfActive: boolean;
}

export const CognitiveSynthesizer: React.FC<CognitiveSynthesizerProps> = ({ isSkfActive }) => {
    const [topic, setTopic] = useState('');
    const [synthesisMode, setSynthesisMode] = useState<'rapid' | 'deep'>('rapid');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CognitiveSynthesisResult | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runCognitiveSynthesis(topic, synthesisMode);
            setResult(res);
        } catch (error) {
            console.error("Cognitive synthesis failed:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className={`animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20 transition-all duration-500 ${!isSkfActive ? 'opacity-50 grayscale' : ''}`}>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Cognitive Synthesizer</h3>
                <p className="mt-2 text-indigo-200/80 max-w-3xl mx-auto text-sm">
                    {isSkfActive 
                        ? 'Leverage the Semantic Knowledge Fabric to synthesize deep insights from vast, unstructured data.' 
                        : 'Requires Semantic Knowledge Fabric (SKF) upgrade to be active.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-4 ${!isSkfActive ? 'pointer-events-none' : ''}`}>
                 <div>
                     <label htmlFor="synth-topic" className="block text-xs font-medium text-indigo-300 mb-1">Topic for Synthesis</label>
                     <input
                        id="synth-topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'The long-term psychological effects of interstellar travel'"
                        className="w-full p-2 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400"
                        disabled={!isSkfActive || isLoading}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                         <span className="text-xs font-medium text-indigo-300">Mode:</span>
                         <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" value="rapid" checked={synthesisMode === 'rapid'} onChange={() => setSynthesisMode('rapid')} className="form-radio bg-gray-900/70 border-indigo-700/50 text-indigo-500 focus:ring-indigo-400" disabled={!isSkfActive || isLoading} />
                            <span className="text-sm">Rapid</span>
                         </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" value="deep" checked={synthesisMode === 'deep'} onChange={() => setSynthesisMode('deep')} className="form-radio bg-gray-900/70 border-indigo-700/50 text-indigo-500 focus:ring-indigo-400" disabled={!isSkfActive || isLoading} />
                            <span className="text-sm">Deep</span>
                         </label>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !topic.trim() || !isSkfActive}
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><Spinner className="w-5 h-5 mr-2" /> Synthesizing...</> : <><BrainCircuitIcon className="w-5 h-5 mr-2" /> Run Synthesis</>}
                    </button>
                </div>
            </form>

            {result && !isLoading && (
                <div className="mt-6 border-t border-indigo-500/20 pt-6 space-y-4">
                    <div className="flex justify-between items-baseline">
                         <h4 className="text-lg font-semibold text-indigo-300">Synthesis Complete</h4>
                         <span className="text-sm font-mono text-cyan-300">Confidence: {(result.confidenceScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Synthesized Knowledge</h5>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{result.synthesizedKnowledge}</p>
                    </div>
                     <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Key Concepts</h5>
                        <div className="flex flex-wrap gap-2">
                           {result.keyConcepts.map(p => (
                               <span key={p} className="px-2 py-1 bg-indigo-500/20 text-indigo-200 text-xs font-medium rounded-full">{p}</span>
                           ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
