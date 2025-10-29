import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Material } from '../../types';

interface MaterialInventoryProps {
    materials: Material[];
}

const MaterialInventory: React.FC<MaterialInventoryProps> = ({ materials }) => {
    return (
        <div className="module-panel">
            <h3>Material Inventory</h3>
            {materials.map(mat => (
                <div key={mat.id}>
                    <p className="text-sm">{mat.name} ({mat.id})</p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${mat.stock}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialInventory;