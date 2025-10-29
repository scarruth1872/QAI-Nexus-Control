import React from 'react';
import { useAppState } from '../../contexts/AppContext.tsx';

const ElectronicsLabView: React.FC = () => {
    const { arasLabState } = useAppState();
    const electronicsState = arasLabState.electronics;

    return (
        <div className="zonal-view-grid">
            <div className="module-panel">
                <h3>Lab Environment</h3>
                <p>ESD Protection: {electronicsState.esdProtection}</p>
                <p>Clean Room Status: {electronicsState.cleanRoom.status}</p>
                <p>Particulates: {electronicsState.cleanRoom.particulates} ppm</p>
            </div>
             <div className="module-panel">
                <h3>Test & Measurement Equipment</h3>
                <table className="quantum-table">
                    <thead>
                        <tr>
                            <th>Equipment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {electronicsState.equipment.map(eq => (
                            <tr key={eq.id}>
                                <td>{eq.name}</td>
                                <td>{eq.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ElectronicsLabView;
