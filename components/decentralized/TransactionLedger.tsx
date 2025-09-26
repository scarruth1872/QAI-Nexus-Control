import React, { useState, useEffect } from 'react';
import { DltTransaction } from '../../types';

const transactionTypes: DltTransaction['type'][] = ['Resource Allocation', 'Ethical Compliance', 'Data Provenance'];

const createMockTransaction = (): DltTransaction => ({
    id: `0x${[...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}...`,
    timestamp: new Date().toLocaleTimeString(),
    type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    details: `Agent ${['Alpha-1', 'Gamma-3', 'Eta-7'][Math.floor(Math.random()*3)]} action recorded.`
});


const TransactionLedger: React.FC = () => {
    const [transactions, setTransactions] = useState<DltTransaction[]>([]);

    useEffect(() => {
        const initialTxs = [...Array(10)].map(createMockTransaction);
        setTransactions(initialTxs);

        const interval = setInterval(() => {
            setTransactions(prev => [createMockTransaction(), ...prev.slice(0, 50)]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-panel">
            <h3>Immutable Transaction Ledger</h3>
            <div className="transaction-feed">
                {transactions.map((tx, index) => (
                    <div key={tx.id + index} className={`transaction-item ${index === 0 ? 'new' : ''}`}>
                        <span>{`[${tx.timestamp}] `}</span>
                        <span style={{color: 'var(--lcars-primary)'}}>{`${tx.type}: `}</span>
                        <span>{tx.details}</span>
                        <span style={{color: 'var(--lcars-tertiary)', display: 'block'}}>{`TxID: ${tx.id}`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionLedger;