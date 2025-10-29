import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { MainBayState } from '../../types';

interface GantryControlProps {
    gantry: MainBayState['gantryCrane'];
}

const GantryControl: React.FC<GantryControlProps> = ({ gantry }) => {
    return (
        <div className="module-panel">
            <h3>Gantry Crane Control</h3>
            <p>Status: {gantry.status}</p>
            <p>Position (X,Y,Z): {gantry.position.x}m, {gantry.position.y}m, {gantry.position.z}m</p>
            <div className="flex gap-2 mt-2">
                <button className="text-xs p-1">Home</button>
                <button className="text-xs p-1">Stop</button>
            </div>
        </div>
    );
};

export default GantryControl;