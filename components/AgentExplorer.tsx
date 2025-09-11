
import React from 'react';
// FIX: Corrected import paths for child components and types to be relative.
import { AgentPanel } from './AgentPanel';
import { AgentType, ProbeType } from '../types';

interface AgentExplorerProps {
    onProbe: (agentType: AgentType, probeType: ProbeType) => void;
}

export const AgentExplorer: React.FC<AgentExplorerProps> = ({ onProbe }) => {
  const agents = [
    AgentType.SCIENTIFIC_DISCOVERY,
    AgentType.SOCIETAL_MODELING,
    AgentType.PLANETARY_EXPLORATION,
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-300">QAI Cognitive Core Explorer</h2>
        <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
          Directly probe the cognitive functions of each specialized agent to analyze their quantum-native processes.
        </p>
      </div>
      <div className="space-y-12">
        {agents.map(agentType => (
          <AgentPanel key={agentType} agentType={agentType} onProbe={onProbe} />
        ))}
      </div>
    </div>
  );
};
