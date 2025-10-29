import React from 'react';
import AgentExplorer from './AgentExplorer';
import SystemStatusDashboard from './SystemStatusDashboard';
import OrchestrationMonitor from './OrchestrationMonitor';
import MissionInput from './MissionInput';
import { useAppState } from '../contexts/AppContext.tsx';

interface DashboardProps {
    selectedAgentId: string | null;
    onSelectAgent: (agentId: string | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
    selectedAgentId,
    onSelectAgent
}) => {
    // FIX: Renamed `onInitiateMission` to `handleInitiateMission` to match the AppContext state.
    const { agents, systemStatus, handleInitiateMission, isMissionLoading, mission } = useAppState();
    
    // Filter out the ARAS agent from the main command deck explorer
    const displayAgents = agents.filter(a => a.name !== 'ARAS');

    return (
        <div className="dashboard-grid">
            <div className="grid-item mission-control">
                <h3>Mission Control</h3>
                <MissionInput onSubmit={handleInitiateMission} isLoading={isMissionLoading} />
            </div>
            <div className="grid-item agent-explorer-container">
                <AgentExplorer 
                    agents={displayAgents} 
                    isLoading={isMissionLoading} 
                    onSelectAgent={onSelectAgent} 
                    selectedAgentId={selectedAgentId} 
                />
            </div>
            <div className="grid-item system-status-container">
                <SystemStatusDashboard status={systemStatus} />
            </div>
            <div className="grid-item orchestration-monitor-container">
                <OrchestrationMonitor mission={mission} agents={agents} />
            </div>
        </div>
    );
};

export default Dashboard;