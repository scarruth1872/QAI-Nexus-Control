import React from 'react';
import { SmartContract } from '../../types';

const contracts: SmartContract[] = [
    { id: 'sc-001', name: 'EthicalGovernance', version: 'v2.1', status: 'Active', address: '0x12...aB56' },
    { id: 'sc-002', name: 'ResourceAllocation', version: 'v1.5', status: 'Active', address: '0x78...dC90' },
    { id: 'sc-003', name: 'DataProvenance', version: 'v3.0', status: 'Active', address: '0x34...eF12' },
    { id: 'sc-004', name: 'ResourceAllocation', version: 'v1.4', status: 'Deprecated', address: '0x90...gH34' },
];

const SmartContractManager: React.FC = () => {
    return (
        <div className="module-panel">
            <h3>Smart Contract Manager</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map(c => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.version}</td>
                            <td className={`status-${c.status.toLowerCase()}`}>{c.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SmartContractManager;