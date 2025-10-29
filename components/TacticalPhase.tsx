// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Mission } from '../types';

interface TacticalPhaseProps {
    mission: Mission | null;
}

const TacticalPhase: React.FC<TacticalPhaseProps> = ({ mission }) => {
    if (!mission) {
        return (
            <div className="module-panel">
                <h3>Tactical Phase</h3>
                <p>No active mission.</p>
            </div>
        );
    }

    const pending = mission.tasks.filter(t => t.status === 'PENDING').length;
    const inProgress = mission.tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completed = mission.tasks.filter(t => t.status === 'COMPLETED').length;

    return (
        <div className="module-panel">
            <h3>Tactical Phase</h3>
            <div>
                <h4>Objective: {mission.objective}</h4>
                <p><strong>Status:</strong> {mission.status}</p>
                <p>
                    <strong>Tasks:</strong> {completed} Completed | {inProgress} In Progress | {pending} Pending
                </p>
            </div>
        </div>
    );
};

export default TacticalPhase;