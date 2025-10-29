import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent } from '../../types';
import DltNetworkMonitor from './DltNetworkMonitor';
import SmartContractManager from './SmartContractManager';
import TransactionLedger from './TransactionLedger';
import TokenizedResourceView from './TokenizedResourceView';
import NetworkVisualization from './NetworkVisualization';

interface Zeta6DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Zeta6Dashboard: React.FC<Zeta6DashboardProps> = ({ agent, onReturn }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>Decentralized Systems Analyst Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="decentralized-dashboard-grid">
                <div className="dlt-network-monitor"><DltNetworkMonitor /></div>
                <div className="dlt-smart-contracts"><SmartContractManager /></div>
                <div className="dlt-ledger"><TransactionLedger /></div>
                <div className="dlt-resources"><TokenizedResourceView /></div>
                <div className="dlt-visualization"><NetworkVisualization /></div>
            </div>
        </div>
    );
};

export default Zeta6Dashboard;
