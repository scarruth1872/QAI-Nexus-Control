// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent } from '../types';
import AgentCard from './AgentCard';
import Spinner from './Spinner';

interface AgentExplorerProps {
  agents: Agent[];
  isLoading: boolean;
  onSelectAgent: (agentId: string | null) => void;
  selectedAgentId: string | null;
}

const AgentExplorer: React.FC<AgentExplorerProps> = ({ agents, isLoading, onSelectAgent, selectedAgentId }) => {
  return (
    <div className="agent-explorer module-panel">
      <h3>Agent Explorer</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="agent-grid">
          {agents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelect={() => onSelectAgent(agent.id)}
              isSelected={agent.id === selectedAgentId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentExplorer;