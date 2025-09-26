import React from 'react';

const QuantumSoftwareStack: React.FC = () => {
    const stack = [
        { name: 'Quantum OS', version: 'v3.2.1', status: 'Nominal' },
        { name: 'Q-Compiler', version: 'v1.8.3', status: 'Nominal' },
        { name: 'Error Correction Layer', version: 'v2.5.0', status: 'Active' },
        { name: 'Entanglement Manager', version: 'v4.0.0', status: 'Nominal' },
    ];
    return (
        <div className="module-panel quantum-module">
            <h3>Software Stack</h3>
            <table className="quantum-table">
                <thead>
                    <tr><th>Component</th><th>Version</th><th>Status</th></tr>
                </thead>
                <tbody>
                    {stack.map(s => (
                        <tr key={s.name}>
                            <td>{s.name}</td><td>{s.version}</td><td className={`status-${s.status.toLowerCase()}`}>{s.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuantumSoftwareStack;