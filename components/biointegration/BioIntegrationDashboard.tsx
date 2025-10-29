// Fix: Implemented the BioIntegrationDashboard, a specialized view for the biology agent.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent } from '../../types';
import ComputationalBiologyLab from './ComputationalBiologyLab';
import OmicsDataPlatforms from './OmicsDataPlatforms';
import LabAutomationMonitor from './LabAutomationMonitor';
import EthicalOversight from './EthicalOversight';

interface BioIntegrationDashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const BioIntegrationDashboard: React.FC<BioIntegrationDashboardProps> = ({ agent, onReturn }) => {
    return (
        <div className="h-full flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <h3>Bio-Integration Specialist Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
             <div className="quantum-dashboard-grid">
                <div className="quantum-main">
                    <ComputationalBiologyLab />
                </div>
                <div className="quantum-sidebar">
                    <OmicsDataPlatforms />
                    <LabAutomationMonitor />
                    <EthicalOversight />
                </div>
            </div>
        </div>
    );
};

export default BioIntegrationDashboard;