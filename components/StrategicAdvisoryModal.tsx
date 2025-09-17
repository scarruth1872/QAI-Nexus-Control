
import React, { useState } from 'react';
import { AgentType, StrategicAdvice } from '../types';
import { Spinner } from './Spinner';
import { ScienceIcon, SocietyIcon, PlanetIcon, LightbulbIcon } from './Icons';

interface StrategicAdvisoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (query: string) => void;
    isLoading: boolean;
    advice: StrategicAdvice | null;
}

const agentDetails: { [key in AgentType]: { icon: React.FC<React.SVGProps<SVGSVGElement>>, color: string } } = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { icon: ScienceIcon, color: 'text-cyan-400' },
  [AgentType.SOCIETAL_MODELING]: { icon: SocietyIcon, color: 'text-rose-400' },
  [AgentType.PLANETARY_EXPLORATION]: { icon: PlanetIcon, color: 'text-amber-400' },
};

export const StrategicAdvisoryModal: React.FC<StrategicAdvisoryModalProps> = ({ isOpen, onClose, onSubmit, isLoading, advice }) => {
    const [query, setQuery] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(query);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800/90 border border-indigo-500/30 rounded-xl shadow-2xl shadow-indigo-500/10 w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-indigo-500/20">
                    <h2 className="text-2xl font-bold text-indigo-300 flex items-center">
                        <LightbulbIcon className="w-7 h-7 mr-3" />
                        Strategic Advisory Council
                    </h2>
                    <p className="text-sm text-indigo-200/70 mt-1">Pose a query to the council of active agents for synthesized strategic guidance.</p>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {!advice && !isLoading && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="advisory-query" className="block text-sm font-medium text-indigo-300 mb-2">
                                Your Strategic Query
                            </label>
                            <textarea
                                id="advisory-query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., An unexpected energy signature has been detected. What are the potential implications and recommended course corrections?"
                                className="w-full h-32 p-3 bg-gray-900/70 border border-indigo-700/50 rounded-md text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 resize-none"
                                disabled={isLoading}
                            />
                        </form>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Spinner className="w-12 h-12" />
                            <p className="mt-4 text-indigo-200">The council is deliberating...</p>
                        </div>
                    )}
                    
                    {advice && !isLoading && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-indigo-300 mb-3">Agent Perspectives</h3>
                                <div className="space-y-4">
                                    {advice.agentPerspectives.map((p, index) => {
                                        const details = agentDetails[p.agent];
                                        const Icon = details.icon;
                                        return (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-black/30 rounded-lg border border-indigo-500/10">
                                                <Icon className={`w-8 h-8 flex-shrink-0 mt-1 ${details.color}`} />
                                                <div>
                                                    <h4 className={`font-semibold ${details.color}`}>{p.agent}</h4>
                                                    <p className="text-sm text-gray-300">{p.analysis}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-green-300 mb-3">Synthesized Recommendation</h3>
                                <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                                    <p className="text-sm text-green-200">{advice.synthesizedRecommendation}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-900/50 border-t border-indigo-500/20 flex justify-end items-center space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
                    >
                        Close
                    </button>
                    {!advice && (
                         <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading || !query.trim()}
                            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all"
                        >
                            {isLoading ? 'Consulting...' : 'Submit to Council'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};