import React from 'react';
import { SnnModel } from '../../types';

const models: SnnModel[] = [
    { id: 'snn-01', name: 'ObjectRecognition', neuronCount: 1024, synapseCount: 1000000, status: 'Deployed' },
    { id: 'snn-02', name: 'AnomalyDetection', neuronCount: 2048, synapseCount: 5000000, status: 'Deployed' },
    { id: 'snn-03', name: 'PredictiveAnalysis', neuronCount: 4096, synapseCount: 10000000, status: 'Training' },
];

const SnnModelManager: React.FC = () => {
    return (
        <div className="module-panel">
            <h3>SNN Model Manager</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Neurons</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(m => (
                        <tr key={m.id}>
                            <td>{m.name}</td>
                            <td>{m.neuronCount}</td>
                            <td className={`status-${m.status.toLowerCase()}`}>{m.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SnnModelManager;