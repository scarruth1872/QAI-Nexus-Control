import React from 'react';
import { MainBayState } from '../../types';

interface EnvironmentControlProps {
    environment: MainBayState['environment'];
}

const EnvironmentControl: React.FC<EnvironmentControlProps> = ({ environment }) => {
    return (
        <div className="module-panel">
            <h3>Environment Control</h3>
            <p>Lighting: {environment.lighting}%</p>
            <p>Floor State: {environment.floor}</p>
            <p>Temperature: {environment.temperature}°C</p>
        </div>
    );
};

export default EnvironmentControl;
