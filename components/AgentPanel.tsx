// Fix: Implemented the AgentPanel component with agent details and chat functionality.
import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent, ChatMessage } from '../types';

interface AgentPanelProps {
    agent: Agent;
    chatHistory: ChatMessage[];
    onSendMessage: (agentId: string, text: string) => void;
    onOpenSpecializedDashboard?: (agent: Agent) => void;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ agent, chatHistory = [], onSendMessage, onOpenSpecializedDashboard }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chatHistory]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(agent.id, input.trim());
        setInput('');
    };

    return (
        <div className="module-panel agent-panel">
            <div className="agent-panel-header">
                <div className="agent-avatar">
                    {agent.avatar && <img src={agent.avatar} alt={`${agent.name} avatar`} />}
                </div>
                <div className="agent-info">
                    <h3>{agent.name}</h3>
                    <p>{agent.role}</p>
                    <p className={`agent-status status-${agent.status.toLowerCase()}`}>Status: {agent.status}</p>
                </div>
            </div>
            
            {agent.specializedDashboard && onOpenSpecializedDashboard && (
                <button 
                    className="specialized-dashboard-btn" 
                    onClick={() => onOpenSpecializedDashboard(agent)}
                >
                    Open {agent.name}'s Dashboard
                </button>
            )}

            <div className="chat-messages">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'agent'}`}>
                        <p>
                            <strong>{msg.sender === 'user' ? 'You' : agent.name}:</strong> {msg.text}
                        </p>
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
    );
};

export default AgentPanel;