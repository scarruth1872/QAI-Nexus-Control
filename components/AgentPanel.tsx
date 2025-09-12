import React from 'react';
import { Agent, AgentType } from '../types';
import { ScienceIcon, SocietyIcon, PlanetIcon } from './Icons';

const agentDetails = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { icon: ScienceIcon, color: 'cyan' },
  [AgentType.SOCIETAL_MODELING]: { icon: SocietyIcon, color: 'rose' },
  [AgentType.PLANETARY_EXPLORATION]: { icon: PlanetIcon, color: 'amber' },
};

export const AgentPanel: React.FC<{ agent: Agent }> = ({ agent }) => {
    const details = agentDetails[agent.type];
    const Icon = details.icon;
    const color = details.color;

    return (
        <div className={`bg-gray-800/50 border border-${color}-500/30 rounded-lg p-5 shadow-lg shadow-${color}-900/10 backdrop-blur-sm space-y-4`}>
            <div className="flex items-center">
                <Icon className={`w-10 h-10 text-${color}-400 mr-4`} />
                <div>
                    <h3 className={`font-semibold text-lg text-${color}-300`}>{agent.type}</h3>
                    <p className="text-sm text-gray-400 capitalize">{agent.status}</p>
                </div>
            </div>
            
            <div>
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-indigo-300">Confidence</span>
                    <span className={`font-mono font-bold text-xl text-${color}-400`}>{agent.confidence.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full bg-gradient-to-r from-${color}-600 to-${color}-400`}
                        style={{ width: `${agent.confidence}%`, transition: 'width 0.5s ease-in-out' }}
                    ></div>
                </div>
            </div>
             <div>
                <h4 className="text-sm font-semibold text-indigo-300 mb-2">Cognitive State</h4>
                <div className="text-xs font-mono p-2 bg-black/30 rounded-md text-gray-400">
                    <p>&gt; Status: <span className="text-green-400">NOMINAL</span></p>
                    <p>&gt; Current Task ID: <span className="text-green-400">{agent.status === 'active' ? `T-${agent.id.slice(0,4)}...` : 'N/A'}</span></p>
                    <p>&gt; Heuristic Bias: <span className="text-green-400">-0.023</span></p>
                </div>
            </div>
        </div>
    );
};
