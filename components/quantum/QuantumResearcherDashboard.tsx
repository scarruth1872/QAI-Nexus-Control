// Fix: Implemented the QuantumResearcherDashboard, a specialized view for the quantum agent.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
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
        <div className="h-full flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <h3>Quantum Researcher Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="quantum-dashboard-grid">
                <div className="quantum-main">
                    <CircuitDesigner />
                </div>
                <div className="quantum-sidebar">
                    <QpuMonitor />
                    <QuantumSoftwareStack />
                    <EthicsCheck />
                </div>
            </div>
        </div>
    );
};

export default QuantumResearcherDashboard;