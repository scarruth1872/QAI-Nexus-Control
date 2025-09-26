import React, { useState, useEffect } from 'react';
import { NeuromorphicChip } from '../../types';

const initialChips: NeuromorphicChip[] = [
    { id: 'NM-01', status: 'Online', temperature: 35, synapticConnections: 1000000000 },
    { id: 'NM-02', status: 'Online', temperature: 36, synapticConnections: 1000000000 },
];

const NeuromorphicHardwareMonitor: React.FC = () => {
    const [chips, setChips] = useState(initialChips);

    useEffect(() => {
        const interval = setInterval(() => {
            setChips(prev => prev.map(c => ({...c, temperature: 34 + Math.random() * 4 })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="module-panel">
            <h3>Hardware Monitor</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Chip ID</th>
                        <th>Status</th>
                        <th>Temp.</th>
                    </tr>
                </thead>
                <tbody>
                    {chips.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td className={`status-${c.status.toLowerCase()}`}>{c.status}</td>
                            <td>{c.temperature.toFixed(1)}°C</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NeuromorphicHardwareMonitor;