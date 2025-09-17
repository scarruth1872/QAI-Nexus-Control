
import React, { useState } from 'react';
import { AgentType, GenerativeSimulationResult } from '../types';
import { Spinner } from './Spinner';
import { CubeIcon } from './Icons';
import { runGenerativeSimulation } from '../services/geminiService';

interface GenerativeSimulationEngineProps {
    // No props needed as it's self-contained for now
}

export const GenerativeSimulationEngine: React.FC<GenerativeSimulationEngineProps> = () => {
    const [domain, setDomain] = useState<AgentType>(AgentType.PLANETARY_EXPLORATION);
    const [scenario, setScenario] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GenerativeSimulationResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scenario.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const res = await runGenerativeSimulation(domain, scenario);
            setResult(res);
        } catch (error) {
            console.error("Generative simulation failed:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="animate-fade-in-up bg-gray-800/50 border border-indigo-500/20 rounded-lg p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/20">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-300">Multi-Modal Generative Simulation</h3>
                <p className="mt-2 text-indigo-200/80 max-w-3xl mx-auto text-sm">
                    Create highly realistic and complex simulations for agents to analyze "what-if" scenarios.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <label htmlFor="sim-domain" className="block text-xs font-medium text-indigo-300 mb-1">Domain</label>
                        <select
                            id="sim-domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value as AgentType)}
                            className="w-full p-2 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 focus:ring-1 focus:ring-indigo-400"
                        >
                            <option value={AgentType.PLANETARY_EXPLORATION}>Planetary Exploration</option>
                            <option value={AgentType.SOCIETAL_MODELING}>Societal Modeling</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                         <label htmlFor="sim-scenario" className="block text-xs font-medium text-indigo-300 mb-1">Scenario</label>
                         <input
                            id="sim-scenario"
                            type="text"
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value)}
                            placeholder="e.g., 'Atmospheric composition of a tidally locked super-Earth'"
                            className="w-full p-2 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-indigo-400"
                        />
                    </div>
                </div>
                 <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !scenario.trim()}
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><Spinner className="w-5 h-5 mr-2" /> Simulating...</> : <><CubeIcon className="w-5 h-5 mr-2" /> Run Simulation</>}
                    </button>
                </div>
            </form>
            
            {result && !isLoading && (
                <div className="mt-6 border-t border-indigo-500/20 pt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-indigo-300">Simulation Complete: <span className="italic">{result.scenario}</span></h4>
                    <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Narrative Output</h5>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{result.simulationOutput}</p>
                    </div>
                     <div className="p-4 bg-black/30 rounded-lg">
                        <h5 className="font-semibold text-gray-300 mb-2">Key Generated Parameters</h5>
                        <ul className="text-xs font-mono text-gray-400 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                           {result.generatedParameters.map(p => (
                               <li key={p.key}><span className="text-cyan-400">{p.key}:</span> {p.value}</li>
                           ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};