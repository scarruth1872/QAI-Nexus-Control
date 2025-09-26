import React from 'react';
import { SimulationEnvironment } from '../../types';
import StatusIndicator from './ExecutionCommand'; // Repurposed to StatusIndicator

interface SimulationStatusProps {
    simulations: SimulationEnvironment[];
}

const SimulationStatus: React.FC<SimulationStatusProps> = ({ simulations }) => {
    return (
        <div>
            {simulations.map(sim => (
                <div key={sim.name} className="mb-2">
                    <StatusIndicator status={sim.status} text={sim.name} />
                    <div className="metrics-group">
                        Fidelity: {sim.fidelity}% / Training Coverage: {sim.coverage}% / Deployment Validation: {sim.validation}%
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SimulationStatus;