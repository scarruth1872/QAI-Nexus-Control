import React from 'react';
import { LoggedChatMessage, AgentType } from '../types';
import { ScienceIcon, SocietyIcon, PlanetIcon } from './Icons';

const agentDetails = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { name: 'Scientific Discovery', icon: ScienceIcon, color: 'text-cyan-400' },
  [AgentType.SOCIETAL_MODELING]: { name: 'Societal Modeling', icon: SocietyIcon, color: 'text-rose-400' },
  [AgentType.PLANETARY_EXPLORATION]: { name: 'Planetary Exploration', icon: PlanetIcon, color: 'text-amber-400' },
};

interface InteractionLogProps {
    log: LoggedChatMessage[];
}

export const InteractionLog: React.FC<InteractionLogProps> = ({ log }) => {
    return (
        <div className="mt-12 animate-fade-in-up">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-indigo-300 tracking-wider">Agent Interaction Log</h2>
                <div className="w-24 h-0.5 bg-indigo-500 mx-auto mt-2"></div>
            </div>
            <div className="bg-gray-800/50 border border-indigo-500/20 rounded-lg p-4 shadow-lg backdrop-blur-sm h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {log.length === 0 && (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No agent interactions recorded yet.
                        </div>
                    )}
                    {log.map((entry, index) => {
                        const details = agentDetails[entry.agentType];
                        const Icon = details.icon;
                        const isUser = entry.role === 'user';
                        return (
                             <div key={index} className="flex items-start gap-3 p-2 rounded-md bg-black/20 animate-fade-in-up" style={{animationDelay: `${index * 10}ms`}}>
                                <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${details.color}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline">
                                        <p className={`font-semibold text-sm ${isUser ? 'text-indigo-300' : details.color}`}>
                                            {isUser ? `User to ${details.name}` : details.name}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-300">{entry.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
