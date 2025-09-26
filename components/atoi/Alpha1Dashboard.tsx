// Fix: Implemented the Alpha1Dashboard component with mock data and sub-components.
import React, { useState, useEffect } from 'react';
import { Agent, AtoiUnit, AtoiMission, AtoiTelemetry } from '../../types';
import AtoiCommandOverview from './AtoiCommandOverview';
import AtoiMissionManager from './AtoiMissionManager';
import AtoiViewport from './AtoiViewport';
import AtoiAnalyticsHub from './AtoiAnalyticsHub';
import AtoiDecisionSupport from './AtoiDecisionSupport';

// Mock Data
const initialUnits: AtoiUnit[] = [
    { id: 'drone-01', type: 'Drone', position: { lat: 34.05, lng: -118.25 }, status: 'Idle', weaponSystems: [{ name: 'Laser', status: 'Ready' }] },
    { id: 'drone-02', type: 'Drone', position: { lat: 34.07, lng: -118.23 }, status: 'Idle', weaponSystems: [{ name: 'Laser', status: 'Ready' }] },
    { id: 'ground-01', type: 'Ground Unit', position: { lat: 34.04, lng: -118.26 }, status: 'Idle', weaponSystems: [{ name: 'Pulse Cannon', status: 'Ready' }] },
];

const initialMissions: AtoiMission[] = [
    { id: 'atoi-m-01', objective: 'Recon Sector 7G', status: 'Completed', priority: 'Medium', assignedUnits: ['drone-01'] },
    { id: 'atoi-m-02', objective: 'Secure Perimeter', status: 'Active', priority: 'High', assignedUnits: ['ground-01', 'drone-02'] },
];

interface Alpha1DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Alpha1Dashboard: React.FC<Alpha1DashboardProps> = ({ agent, onReturn }) => {
    const [units, setUnits] = useState<AtoiUnit[]>(initialUnits);
    const [missions, setMissions] = useState<AtoiMission[]>(initialMissions);
    const [telemetry, setTelemetry] = useState<AtoiTelemetry>({
        activeUnits: 2,
        threatLevel: 'Medium',
        commsStatus: 'Secure'
    });

    // Mock data simulation loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly move active units
            setUnits(prev => prev.map(u => {
                if (u.status === 'Engaged' || missions.find(m => m.assignedUnits.includes(u.id) && m.status === 'Active')) {
                    return {
                        ...u,
                        position: {
                            lat: u.position.lat + (Math.random() - 0.5) * 0.005,
                            lng: u.position.lng + (Math.random() - 0.5) * 0.005,
                        }
                    };
                }
                return u;
            }));

            // Randomly change threat level
            if (Math.random() > 0.9) {
                const levels: AtoiTelemetry['threatLevel'][] = ['Low', 'Medium', 'High'];
                setTelemetry(prev => ({ ...prev, threatLevel: levels[Math.floor(Math.random() * levels.length)]}));
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [missions]);


    return (
        <>
            <div className="flex justify-between items-center mb-4">
                 <h3>ATOI Dashboard: {agent.name}</h3>
                 <button onClick={onReturn}>Return to Comms</button>
            </div>
           
            <div className="atoi-dashboard">
                <div className="atoi-overview"><AtoiCommandOverview telemetry={telemetry} /></div>
                <div className="atoi-missions"><AtoiMissionManager missions={missions} /></div>
                <div className="atoi-viewport"><AtoiViewport units={units} /></div>
                <div className="atoi-analytics"><AtoiAnalyticsHub units={units} /></div>
                <div className="atoi-support"><AtoiDecisionSupport telemetry={telemetry} /></div>
            </div>
        </>
    );
};

export default Alpha1Dashboard;
