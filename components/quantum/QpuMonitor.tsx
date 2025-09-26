import React from 'react';

const QpuMonitor: React.FC = () => {
    // In a real app, this would be fed by live data
    const qpuData = {
        qubits: 128,
        connectivity: 'Heavy-Hex Lattice',
        coherenceTime: '150 µs',
        gateFidelity: '99.98%',
        temperature: '15 mK'
    };

    return (
        <div className="module-panel quantum-module">
            <h3>QPU Monitor</h3>
            <ul className="quantum-stats">
                <li><strong>Qubits:</strong> {qpuData.qubits}</li>
                <li><strong>Connectivity:</strong> {qpuData.connectivity}</li>
                <li><strong>Avg. T1 Coherence:</strong> {qpuData.coherenceTime}</li>
                <li><strong>Avg. 2Q Gate Fidelity:</strong> {qpuData.gateFidelity}</li>
                <li><strong>Core Temperature:</strong> {qpuData.temperature}</li>
            </ul>
        </div>
    );
};

export default QpuMonitor;