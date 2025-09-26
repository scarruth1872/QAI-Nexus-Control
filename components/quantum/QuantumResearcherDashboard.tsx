import React from 'react';
import { Agent } from '../../types';
import QpuMonitor from './QpuMonitor';
import QuantumSoftwareStack from './QuantumSoftwareStack';
import CircuitDesigner from './CircuitDesigner';
import EthicsCheck from './EthicsCheck';

interface QuantumResearcherDashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const QuantumResearcherDashboard: React.FC<QuantumResearcherDashboardProps> = ({ agent, onReturn }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                 <h3>Quantum Research Dashboard: {agent.name}</h3>
                 <button onClick={onReturn}>Return to Comms</button>
            </div>
           
            <div className="quantum-dashboard">
                <div className="quantum-monitor"><QpuMonitor /></div>
                <div className="quantum-stack"><QuantumSoftwareStack /></div>
                <div className="quantum-designer"><CircuitDesigner /></div>
                <div className="quantum-ethics"><EthicsCheck /></div>
            </div>
        </>
    );
};

export default QuantumResearcherDashboard;