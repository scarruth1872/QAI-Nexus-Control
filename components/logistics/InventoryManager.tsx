import React from 'react';
// Fix: Corrected import path for types.
import { Warehouse } from '../../types';

interface InventoryManagerProps {
    warehouses: Warehouse[];
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ warehouses }) => {
    return (
        <div className="inventory-manager">
            {warehouses.map(wh => {
                const totalItems = wh.inventory.reduce((sum, item) => sum + item.quantity, 0);
                const utilization = (totalItems / wh.capacity) * 100;
                return (
                    <div key={wh.id} className="mb-4">
                        <h4>{wh.location} (WH-{wh.id})</h4>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${utilization}%` }}></div>
                        </div>
                        <p className="text-xs text-right">{totalItems.toLocaleString()} / {wh.capacity.toLocaleString()} Units ({utilization.toFixed(1)}%)</p>
                        
                        <div className="mt-2">
                            {wh.inventory.map(item => (
                                <div key={item.sku} className="inventory-item text-xs flex justify-between">
                                    <span className="name">{item.name}</span>
                                    <span>
                                        {item.quantity.toLocaleString()}
                                        {item.quantity < item.reorderPoint && <span className="reorder"> (REORDER)</span>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default InventoryManager;