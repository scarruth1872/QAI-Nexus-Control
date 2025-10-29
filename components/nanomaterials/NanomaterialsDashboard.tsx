// Fix: Implemented the NanomaterialsDashboard, a specialized view for the materials science agent.
import React, { useState } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent, ProvenanceLog } from '../../types';
import VirtualLab from './VirtualLab';
import NanoCadViewer from './NanoCadViewer';
import SimulationSoftwareStack from './SimulationSoftwareStack';
import ProvenanceLogger from './ProvenanceLogger';

interface NanomaterialsDashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const NanomaterialsDashboard: React.FC<NanomaterialsDashboardProps> = ({ agent, onReturn }) => {
    const [provenanceLogs, setProvenanceLogs] = useState<ProvenanceLog[]>([]);

    const addProvenanceLog = (message: string) => {
        const newLog: ProvenanceLog = {
            timestamp: new Date().toISOString(),
            message,
        };
        setProvenanceLogs(prev => [newLog, ...prev]);
    };

    return (
        <div className="h-full flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <h3>Nanomaterials Scientist Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="quantum-dashboard-grid">
                <div className="quantum-main">
                    <VirtualLab addProvenanceLog={addProvenanceLog} />
                </div>
                <div className="quantum-sidebar">
                    <NanoCadViewer />
                    <SimulationSoftwareStack />
                    <ProvenanceLogger logs={provenanceLogs} />
                </div>
            </div>
        </div>
    );
};

export default NanomaterialsDashboard;