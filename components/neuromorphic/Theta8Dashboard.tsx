import React from 'react';
import { Agent } from '../../types';
import NeuromorphicHardwareMonitor from './NeuromorphicHardwareMonitor';
import SnnModelManager from './SnnModelManager';
import EventStreamVisualizer from './EventStreamVisualizer';
import CognitiveTaskOffload from './CognitiveTaskOffload';

interface Theta8DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Theta8Dashboard: React.FC<Theta8DashboardProps> = ({ agent, onReturn }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3>Neuromorphic Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>

            <div className="theta-dashboard">
                <div className="theta-hardware"><NeuromorphicHardwareMonitor /></div>
                <div className="theta-models"><SnnModelManager /></div>
                <div className="theta-offload"><CognitiveTaskOffload /></div>
                <div className="theta-visualizer"><EventStreamVisualizer /></div>
            </div>
        </>
    );
};

export default Theta8Dashboard;