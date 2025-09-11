

import React, { useState } from 'react';
// FIX: Corrected import paths for child components and types to be relative.
import { AgentPanel } from './AgentPanel';
import { AgentType, ProbeType, LoggedChatMessage } from '../types';
import { GenerativeSimulationEngine } from './GenerativeSimulationEngine';
import { InteractionLog } from './InteractionLog';

interface AgentExplorerProps {
    onProbe: (agentType: AgentType, probeType: ProbeType) => void;
}

export const AgentExplorer: React.FC<AgentExplorerProps> = ({ onProbe }) => {
  const [interactionLog, setInteractionLog] = useState<LoggedChatMessage[]>([]);
  
  const agents = [
    AgentType.SCIENTIFIC_DISCOVERY,
    AgentType.SOCIETAL_MODELING,
    AgentType.PLANETARY_EXPLORATION,
  ];

  const handleNewInteraction = (logEntry: LoggedChatMessage) => {
      setInteractionLog(prev => [...prev.slice(-99), logEntry]); // Keep last 100 messages
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-300">QAI Cognitive Core Explorer</h2>
        <p className="mt-2 text-lg text-indigo-200/80 max-w-3xl mx-auto">
          Directly probe the cognitive functions of each specialized agent to analyze their quantum-native processes.
        </p>
      </div>

      <div className="my-12">
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-300 tracking-wider">Phase 2: Generative Simulation Engine</h2>
            <div className="w-24 h-0.5 bg-indigo-500 mx-auto mt-2"></div>
        </div>
        <GenerativeSimulationEngine />
      </div>

      <div className="space-y-12">
        {agents.map(agentType => (
          <AgentPanel 
            key={agentType} 
            agentType={agentType} 
            onProbe={onProbe} 
            onNewInteraction={handleNewInteraction}
          />
        ))}
      </div>

      <InteractionLog log={interactionLog} />
    </div>
  );
};