import React from 'react';
import { Agent } from '../../types';
import DltNetworkMonitor from './DltNetworkMonitor';
import SmartContractManager from './SmartContractManager';
import TransactionLedger from './TransactionLedger';
import TokenizedResourceView from './TokenizedResourceView';

interface Zeta6DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Zeta6Dashboard: React.FC<Zeta6DashboardProps> = ({ agent, onReturn }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3>Decentralized Systems Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>

            <div className="zeta-dashboard">
                <div className="zeta-monitor"><DltNetworkMonitor /></div>
                <div className="zeta-contracts"><SmartContractManager /></div>
                <div className="zeta-ledger"><TransactionLedger /></div>
                <div className="zeta-resources"><TokenizedResourceView /></div>
            </div>
        </>
    );
};

export default Zeta6Dashboard;