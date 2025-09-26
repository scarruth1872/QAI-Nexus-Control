import React from 'react';
import { Sensor } from '../../types';

interface SensorListProps {
    sensors: Sensor[];
}

const SensorList: React.FC<SensorListProps> = ({ sensors }) => {
    return (
        <ul>
            {sensors.map(sensor => (
                <li key={sensor.type} className="text-sm">
                    <strong>[{sensor.type}]</strong> {sensor.model}: {sensor.description}
                </li>
            ))}
        </ul>
    );
};

export default SensorList;