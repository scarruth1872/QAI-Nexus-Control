import React, { useState, useEffect } from 'react';
import { NeuromorphicChip } from '../../types';

const initialChips: NeuromorphicChip[] = [
    { id: 'NM-01', status: 'ONLINE', temperature: 35.2, synapticConnections: 100000000 },
    { id: 'NM-02', status: 'ONLINE', temperature: 34.8, synapticConnections: 100000000 },
    { id: 'NM-03', status: 'OFFLINE', temperature: 25.0, synapticConnections: 100000000 },
];

const NeuromorphicHardwareMonitor: React.FC = () => {
    const [chips, setChips] = useState(initialChips);

    useEffect(() => {
        const interval = setInterval(() => {
            setChips(prevChips => prevChips.map(chip => 
                chip.status === 'ONLINE' 
                ? { ...chip, temperature: 34 + Math.random() * 2 }
                : chip
            ));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="module-panel">
            <h3>Hardware Monitor</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Chip ID</th>
                        <th>Temp (°C)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {chips.map(chip => (
                        <tr key={chip.id}>
                            <td>{chip.id}</td>
                            <td>{chip.temperature.toFixed(1)}</td>
                            <td className={`status-${chip.status.toLowerCase()}`}>{chip.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NeuromorphicHardwareMonitor;
