// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
import AgentExplorer from './AgentExplorer';
import SystemStatusDashboard from './SystemStatusDashboard';
import OrchestrationMonitor from './OrchestrationMonitor';
import MissionInput from './MissionInput';
// Fix: Corrected import path for types.
import { Agent, SystemStatus, Mission } from '../types';

interface DashboardProps {
    agents: Agent[];
    systemStatus: SystemStatus;
    onInitiateMission: (objective: string) => void;
    isMissionLoading: boolean;
    mission: Mission | null;
}

const Dashboard: React.FC<DashboardProps> = ({ agents, systemStatus, onInitiateMission, isMissionLoading, mission }) => {
    // FIX: Added state for selected agent to satisfy AgentExplorer props.
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    return (
        <div className="dashboard-grid">
            <div className="grid-item mission-control">
                <h3>Mission Control</h3>
                <MissionInput onSubmit={onInitiateMission} isLoading={isMissionLoading} />
            </div>
            <div className="grid-item agent-explorer-container">
                 {/* FIX: Passed missing props to AgentExplorer component. */}
                <AgentExplorer agents={agents} isLoading={isMissionLoading} onSelectAgent={setSelectedAgentId} selectedAgentId={selectedAgentId} />
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