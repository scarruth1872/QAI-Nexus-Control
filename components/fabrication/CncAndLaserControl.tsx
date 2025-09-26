import React from 'react';
import { FabricationMachine } from '../../types';

interface CncAndLaserControlProps {
    machine: FabricationMachine;
    name: string;
}

const CncAndLaserControl: React.FC<CncAndLaserControlProps> = ({ machine, name }) => {
    return (
        <div className="module-panel">
            <h3>{name}</h3>
             <div className="machine-status">
                <div className="status-indicator">
                    <span>{machine.id}</span>
                    <span className={`status-${machine.status.toLowerCase()}`}>{machine.status}</span>
                </div>
                <p className="job">Job: {machine.job}</p>
            </div>
        </div>
    );
};

export default CncAndLaserControl;
