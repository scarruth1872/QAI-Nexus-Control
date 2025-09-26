// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
// Fix: Corrected import path for types.
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agentId: string) => void;
  isSelected: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, isSelected }) => {
  return (
    <div
      className={`agent-card status-${agent.status.toLowerCase()} ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(agent.id)}
    >
      <div className="agent-avatar">
        {agent.avatar && <img src={agent.avatar} alt={`${agent.name} avatar`} />}
      </div>
      <div className="agent-info">
        <h4>{agent.name}</h4>
        <p>Role: {agent.role}</p>
        <p className="agent-status">Status: {agent.status}</p>
        <p>Task: {agent.task || 'Awaiting assignment'}</p>
        <div className="performance-bar">
          <div style={{ width: `${agent.performance}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;