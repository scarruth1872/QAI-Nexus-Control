// Fix: Implemented the CommandDeck component as the main application view.
import React from 'react';
import AgentExplorer from './AgentExplorer';
import SystemStatusDashboard from './SystemStatusDashboard';
import OrchestrationMonitor from './OrchestrationMonitor';
import MissionInput from './MissionInput';
// Fix: Corrected import path for AgentPanel.
import AgentPanel from './AgentPanel';
import TacticalPhase from './TacticalPhase';
// Fix: Corrected import path for types.
import { Agent, SystemStatus, Mission, AgentChats } from '../types';

interface CommandDeckProps {
    agents: Agent[];
    areAgentsLoading: boolean;
    systemStatus: SystemStatus;
    mission: Mission | null;
    onInitiateMission: (objective: string) => void;
    isMissionLoading: boolean;
    selectedAgentId: string | null;
    onSelectAgent: (id: string | null) => void;
    agentChats: AgentChats;
    onSendAgentMessage: (agentId: string, text: string) => void;
    onShowSpecializedDashboard: (agentId: string) => void;
}

const CommandDeck: React.FC<CommandDeckProps> = ({ 
    agents, areAgentsLoading, systemStatus, mission, onInitiateMission, isMissionLoading, 
    selectedAgentId, onSelectAgent, agentChats, onSendAgentMessage, onShowSpecializedDashboard
}) => {
    
    const selectedAgent = agents.find(agent => agent.id === selectedAgentId) || null;
    const selectedAgentChatHistory = selectedAgentId ? agentChats[selectedAgentId] || [] : [];

    return (
        <div className="command-deck-grid">
            <div className="mission-control-panel">
                <div className="module-panel">
                    <h3>Mission Control</h3>
                    <MissionInput onSubmit={onInitiateMission} isLoading={isMissionLoading} />
                </div>
                <div className="module-panel">
                   <TacticalPhase mission={mission} />
                </div>
            </div>

            <div className="system-status-panel">
                <SystemStatusDashboard status={systemStatus} />
            </div>

            <div className="agent-explorer-panel">
                <AgentExplorer agents={agents} isLoading={areAgentsLoading} onSelectAgent={onSelectAgent} selectedAgentId={selectedAgentId} />
            </div>

            <div className="agent-details-panel">
                <AgentPanel 
                    agent={selectedAgent} 
                    chatHistory={selectedAgentChatHistory} 
                    onSendMessage={onSendAgentMessage}
                    onShowSpecializedDashboard={onShowSpecializedDashboard}
                />
            </div>

             <div className="orchestration-monitor-panel">
                <OrchestrationMonitor mission={mission} agents={agents} />
            </div>
        </div>
    );
};

export default CommandDeck;