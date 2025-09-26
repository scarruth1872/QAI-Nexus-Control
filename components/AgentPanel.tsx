// Fix: Implemented the AgentPanel component for displaying agent details and a chat interface.
import React, { useState, useEffect, useRef } from 'react';
import { Agent, ChatMessage } from '../types';

interface AgentPanelProps {
  agent: Agent | null;
  chatHistory: ChatMessage[];
  onSendMessage: (agentId: string, text: string) => void;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ agent, chatHistory, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  if (!agent) {
    return (
      <div className="module-panel agent-panel">
        <h3>Agent Details</h3>
        <p>Loading ARAS Lab AI Overseer...</p>
      </div>
    );
  }

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(agent.id, input.trim());
      setInput('');
    }
  };

  return (
    <div className="module-panel agent-panel">
      <div className="agent-panel-header">
        <div className="agent-avatar-large">
          <img src={agent.avatar} alt={`${agent.name} avatar`} />
        </div>
        <div className="agent-info-large">
          <h3>{agent.name}</h3>
          <p><strong>Role:</strong> {agent.role}</p>
          <p><strong>Status:</strong> {agent.status}</p>
          <p><strong>Task:</strong> {agent.task}</p>
        </div>
      </div>

      <div className="chat-interface">
        <h4>Comms Channel: ARAS Overseer</h4>
        <div className="chat-messages">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'agent'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${agent.name}...`}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AgentPanel;
