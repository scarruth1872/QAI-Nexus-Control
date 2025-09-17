
import React, { useState } from 'react';
import { runCognitiveSynthesis } from '../services/geminiService';
import { CognitiveSynthesisResult } from '../types';
import { Spinner } from './Spinner';
import { BrainCircuitIcon } from './Icons';

export const CognitiveSynthesizer: React.FC = () => {
    const [topicA, setTopicA] = useState('');
    const [topicB, setTopicB] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CognitiveSynthesisResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topicA.trim() || !topicB.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runCognitiveSynthesis(topicA, topicB);
            setResult(res);
        } catch (error) {
            console.error("Cognitive synthesis failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Cognitive Synthesizer</h3>
                <p className="mt-2 text-indigo-200/80 max-w-3xl mx-auto text-sm">
                    Bridge two disparate concepts to generate novel, emergent ideas and insights.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="topic-a" className="block text-xs font-medium text-indigo-300 mb-1">Concept A</label>
                        <input
                            id="topic-a"
                            type="text"
                            value={topicA}
                            onChange={(e) => setTopicA(e.target.value)}
                            placeholder="e.g., Quantum Entanglement"
                            className="w-full p-2 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400"
                        />
                    </div>
                     <div>
                        <label htmlFor="topic-b" className="block text-xs font-medium text-indigo-300 mb-1">Concept B</label>
                        <input
                            id="topic-b"
                            type="text"
                            value={topicB}
                            onChange={(e) => setTopicB(e.target.value)}
                            placeholder="e.g., Mycelial Networks"
                            className="w-full p-2 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !topicA.trim() || !topicB.trim()}
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><Spinner className="w-5 h-5 mr-2" /> Synthesizing...</> : <><BrainCircuitIcon className="w-5 h-5 mr-2" /> Synthesize</>}
                    </button>
                </div>
            </form>

            {result && !isLoading && (
                <div className="mt-6 border-t border-indigo-500/20 pt-6 space-y-4">
                    <div className="flex justify-between items-baseline">
                        <h4 className="text-lg font-semibold text-indigo-300">Synthesis Complete</h4>
                        <span className="text-sm text-cyan-300 font-mono">Confidence: {(result.confidenceScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Generated Synthesis</h5>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{result.synthesis}</p>
                    </div>
                     <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Emergent Concepts</h5>
                        <ul className="text-xs font-mono text-gray-400 space-y-1">
                           {result.emergentConcepts.map((concept, index) => (
                               <li key={index} className="flex items-center">
                                <span className="text-indigo-400 mr-2">&rarr;</span>
                                {concept}
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
