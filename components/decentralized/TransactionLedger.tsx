import React, { useState, useEffect } from 'react';
import { DltTransaction } from '../../types';

const generateRandomTransaction = (id: number): DltTransaction => {
    const types: DltTransaction['type'][] = ['Resource Allocation', 'Ethical Compliance', 'Data Provenance'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
        id: `tx-${Date.now()}-${id}`,
        timestamp: new Date().toISOString(),
        type,
        details: `Tx Details for ${type} - Hash: ${Math.random().toString(36).substring(2, 15)}`
    };
};

const TransactionLedger: React.FC = () => {
    const [transactions, setTransactions] = useState<DltTransaction[]>(() => 
        [...Array(5)].map((_, i) => generateRandomTransaction(i))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTransactions(prev => [generateRandomTransaction(prev.length), ...prev.slice(0, 100)]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3>Live Transaction Ledger</h3>
            <div className="transaction-ledger-feed">
                {transactions.map(tx => (
                    <div key={tx.id} className="tx-item">
                        <span className="tx-time">[{new Date(tx.timestamp).toLocaleTimeString()}]</span>
                        <span className="tx-type">{tx.type}</span>
                        <span className="tx-details">{tx.details}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionLedger;
