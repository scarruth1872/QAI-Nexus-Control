// Fix: Implemented the Theta8Dashboard, a specialized view for the neuromorphic agent.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent } from '../../types';
import EventStreamVisualizer from './EventStreamVisualizer';
import NeuromorphicHardwareMonitor from './NeuromorphicHardwareMonitor';
import SnnModelManager from './SnnModelManager';
import CognitiveTaskOffload from './CognitiveTaskOffload';


interface Theta8DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Theta8Dashboard: React.FC<Theta8DashboardProps> = ({ agent, onReturn }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>Neuromorphic Architect Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="neuromorphic-dashboard-grid">
                <div className="nm-visualizer">
                    <EventStreamVisualizer />
                </div>
                <div className="nm-sidebar">
                    <NeuromorphicHardwareMonitor />
                    <SnnModelManager />
                </div>
                 <div className="nm-offload">
                    <CognitiveTaskOffload />
                </div>
            </div>
        </div>
    );
};

export default Theta8Dashboard;