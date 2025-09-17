
import React from 'react';
import { Agent, AgentType } from '../types';
import { ScienceIcon, SocietyIcon, PlanetIcon } from './Icons';

const agentDetails = {
  [AgentType.SCIENTIFIC_DISCOVERY]: { icon: ScienceIcon, color: 'cyan' },
  [AgentType.SOCIETAL_MODELING]: { icon: SocietyIcon, color: 'rose' },
  [AgentType.PLANETARY_EXPLORATION]: { icon: PlanetIcon, color: 'amber' },
};

export const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  const details = agentDetails[agent.type];
  const Icon = details.icon;
  const color = details.color;

  return (
    <div className={`bg-gray-800/50 border border-${color}-500/30 rounded-lg p-4 shadow-lg shadow-${color}-900/10 backdrop-blur-sm`}>
      <div className="flex items-center">
        <Icon className={`w-8 h-8 text-${color}-400 mr-4`} />
        <div>
          <h3 className={`font-semibold text-base text-${color}-300`}>{agent.type}</h3>
          <p className="text-xs text-gray-400">{agent.status}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Confidence</span>
            <span className={`font-mono font-semibold text-lg text-${color}-400`}>{agent.confidence.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-1.5">
            <div
                className={`h-1.5 rounded-full bg-${color}-500`}
                style={{ width: `${agent.confidence}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
      </div>
    </div>
  );
};