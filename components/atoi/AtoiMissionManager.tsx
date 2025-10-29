// Fix: Implemented the AtoiMissionManager component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { AtoiMission } from '../../types';

interface AtoiMissionManagerProps {
    missions: AtoiMission[];
}

const AtoiMissionManager: React.FC<AtoiMissionManagerProps> = ({ missions }) => {
    return (
        <div className="module-panel atoi-module">
            <h3>Mission Manager</h3>
            <ul className="atoi-mission-list">
                {missions.map(mission => (
                    <li key={mission.id} className={`mission-item status-${mission.status.toLowerCase()}`}>
                        <span className="objective">{mission.objective}</span>
                        <span className="priority">{mission.priority}</span>
                        <span className="status">{mission.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AtoiMissionManager;