// Fix: Implemented the OrchestrationMonitor component with placeholder content.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Mission, Agent } from '../types';

interface OrchestrationMonitorProps {
    mission: Mission | null;
    agents: Agent[];
}

const OrchestrationMonitor: React.FC<OrchestrationMonitorProps> = ({ mission, agents }) => {
    if (!mission) {
        return (
            <div className="module-panel">
                <h3>Orchestration Monitor</h3>
                <p>Awaiting new mission directive.</p>
            </div>
        );
    }
    
    const completedTasks = mission.tasks.filter(t => t.status === 'COMPLETED').length;
    const totalTasks = mission.tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const activeAgents = agents.filter(a => a.status === 'ACTIVE').length;

    const lastCompletedTask = [...mission.tasks].reverse().find(t => t.status === 'COMPLETED');

    return (
        <div className="module-panel">
            <h3>Orchestration Monitor</h3>
            <div className="monitor-content">
                <h4>Objective: {mission.objective}</h4>
                <p><strong>Status:</strong> {mission.status}</p>
                <div className="progress-section">
                    <p>Task Progress: {completedTasks} / {totalTasks}</p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <p><strong>Active Agents:</strong> {activeAgents}</p>
                {lastCompletedTask && lastCompletedTask.result && (
                     <div className="module-response" style={{marginTop: '1rem'}}>
                        <strong>Last Log:</strong> {lastCompletedTask.result}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrchestrationMonitor;