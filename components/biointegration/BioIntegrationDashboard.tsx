import React from 'react';
import { Agent } from '../../types';
import OmicsDataPlatforms from './OmicsDataPlatforms';
import LabAutomationMonitor from './LabAutomationMonitor';
import ComputationalBiologyLab from './ComputationalBiologyLab';
import EthicalOversight from './EthicalOversight';

interface BioIntegrationDashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const BioIntegrationDashboard: React.FC<BioIntegrationDashboardProps> = ({ agent, onReturn }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3>Bio-Integration Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>

            <div className="bio-dashboard">
                <div className="bio-lab"><ComputationalBiologyLab /></div>
                <div className="bio-omics"><OmicsDataPlatforms /></div>
                <div className="bio-automation">
                    <LabAutomationMonitor />
                    <EthicalOversight />
                </div>
            </div>
        </>
    );
};

export default BioIntegrationDashboard;