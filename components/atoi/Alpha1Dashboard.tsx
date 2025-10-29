// Fix: Implemented the Alpha1Dashboard, a specialized view for the ATOI agent.
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent, AtoiMission, AtoiTelemetry, AtoiUnit } from '../../types';
import AtoiCommandOverview from './AtoiCommandOverview';
import AtoiMissionManager from './AtoiMissionManager';
import AtoiViewport from './AtoiViewport';
import AtoiAnalyticsHub from './AtoiAnalyticsHub';
import AtoiDecisionSupport from './AtoiDecisionSupport';

const initialTelemetry: AtoiTelemetry = {
    activeUnits: 5,
    threatLevel: 'Low',
    commsStatus: 'Secure'
};

const initialMissions: AtoiMission[] = [
    { id: 'M01', objective: 'Patrol Sector 7G', priority: 'Medium', status: 'ACTIVE' },
    { id: 'M02', objective: 'Recon Point Delta', priority: 'High', status: 'PENDING' },
];

const initialUnits: AtoiUnit[] = [
    { id: 'GU-01', type: 'Ground Unit', status: 'Patrolling', position: { lat: 34.0522, lng: -118.2437 } },
    { id: 'DR-01', type: 'Drone', status: 'Patrolling', position: { lat: 34.06, lng: -118.25 } },
    { id: 'DR-02', type: 'Drone', status: 'Patrolling', position: { lat: 34.04, lng: -118.26 } },
    { id: 'GU-02', type: 'Ground Unit', status: 'ACTIVE', position: { lat: 34.07, lng: -118.23 } },
    { id: 'GU-03', type: 'Ground Unit', status: 'MAINTENANCE', position: { lat: 34.03, lng: -118.27 } },
];

interface Alpha1DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Alpha1Dashboard: React.FC<Alpha1DashboardProps> = ({ agent, onReturn }) => {
    const [telemetry, setTelemetry] = useState(initialTelemetry);
    const [missions, setMissions] = useState(initialMissions);
    const [units, setUnits] = useState(initialUnits);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>ATOI Field Commander Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="atoi-dashboard-grid">
                <div className="atoi-overview"><AtoiCommandOverview telemetry={telemetry} /></div>
                <div className="atoi-missions"><AtoiMissionManager missions={missions} /></div>
                <div className="atoi-viewport"><AtoiViewport units={units} /></div>
                <div className="atoi-analytics"><AtoiAnalyticsHub units={units} /></div>
                <div className="atoi-decision"><AtoiDecisionSupport telemetry={telemetry} /></div>
            </div>
        </div>
    );
};

export default Alpha1Dashboard;