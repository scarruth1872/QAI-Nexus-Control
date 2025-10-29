import React, { useState } from 'react';
import Dashboard from './Dashboard';
import AgentPanel from './AgentPanel';
import { Agent } from '../types';
import { useAppState } from '../contexts/AppContext.tsx';

interface CommandDeckProps {
    onOpenSpecializedDashboard: (agent: Agent) => void;
}

const CommandDeck: React.FC<CommandDeckProps> = ({ onOpenSpecializedDashboard }) => {
    // FIX: Renamed `onSendMessage` to `handleSendMessage` to match the AppContext state.
    const { agents, agentChats, handleSendMessage } = useAppState();
    
    // Initialize with the first non-ARAS agent
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents.find(a => a.name !== 'ARAS') || null);
    
    const handleSelectAgent = (agentId: string | null) => {
        const agent = agents.find(a => a.id === agentId) || null;
        setSelectedAgent(agent);
    };

    return (
        <div className="command-deck-grid">
            <div className="dashboard-container">
                <Dashboard 
                    selectedAgentId={selectedAgent?.id || null}
                    onSelectAgent={handleSelectAgent}
                />
            </div>
            <div className="agent-panel-container">
                {selectedAgent ? (
                    <AgentPanel 
                        agent={selectedAgent}
                        chatHistory={agentChats[selectedAgent.id] || []}
                        onSendMessage={handleSendMessage}
                        onOpenSpecializedDashboard={onOpenSpecializedDashboard}
                    />
                ) : (
                    <div className="module-panel">
                        <h3>No Agent Selected</h3>
                        <p>Select an agent from the Agent Explorer to view details and communicate.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommandDeck;