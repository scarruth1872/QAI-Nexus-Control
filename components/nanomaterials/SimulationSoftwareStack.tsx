import React from 'react';

const SimulationSoftwareStack: React.FC = () => {
    const stack = [
        { name: 'Molecular Dynamics Sim', version: 'v4.1.0', status: 'Active' },
        { name: 'Quantum Dot Modeler', version: 'v2.7.2', status: 'Nominal' },
        { name: 'Graphene Lattice Predictor', version: 'v1.9.5', status: 'Nominal' },
        { name: 'AI-Assisted Design', version: 'v3.0.1', status: 'Active' },
    ];
    return (
        <div className="module-panel nano-module">
            <h3>Simulation Software Stack</h3>
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

export default SimulationSoftwareStack;
