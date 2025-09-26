import React, { useState } from 'react';
import { Agent, ProvenanceLog } from '../../types';
import SimulationSoftwareStack from './SimulationSoftwareStack';
import VirtualLab from './VirtualLab';
import NanoCadViewer from './NanoCadViewer';
import ProvenanceLogger from './ProvenanceLogger';

interface NanomaterialsDashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const NanomaterialsDashboard: React.FC<NanomaterialsDashboardProps> = ({ agent, onReturn }) => {
    const [provenanceLogs, setProvenanceLogs] = useState<ProvenanceLog[]>([]);

    const addProvenanceLog = (message: string) => {
        const newLog: ProvenanceLog = {
            timestamp: new Date().toLocaleTimeString(),
            message,
        };
        setProvenanceLogs(prev => [newLog, ...prev]);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                 <h3>Nanomaterials Dashboard: {agent.name}</h3>
                 <button onClick={onReturn}>Return to Comms</button>
            </div>
           
            <div className="nanomaterials-dashboard">
                <div className="nano-lab"><VirtualLab addProvenanceLog={addProvenanceLog} /></div>
                <div className="nano-cad"><NanoCadViewer /></div>
                <div className="nano-provenance"><ProvenanceLogger logs={provenanceLogs} /></div>
                <div className="nano-stack"><SimulationSoftwareStack /></div>
            </div>
        </>
    );
};

export default NanomaterialsDashboard;