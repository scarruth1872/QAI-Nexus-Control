import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Warehouse } from '../../types';
// FIX: Corrected import path for Icons to be a relative module path.
import { TruckIcon, WarehouseIcon, ClipboardListIcon } from '../Icons';

interface LogisticsOverviewProps {
    onTimeRate: number;
    activeShipments: number;
    warehouses: Warehouse[];
}

const LogisticsOverview: React.FC<LogisticsOverviewProps> = ({ onTimeRate, activeShipments, warehouses }) => {
    const totalInventoryItems = warehouses.reduce((sum, wh) => sum + wh.inventory.reduce((s, i) => s + i.quantity, 0), 0);

    return (
        <div className="module-panel" style={{ border: 'none', padding: '0 0 1rem 0'}}>
            <div className="logistics-overview-grid">
                <div className="logistics-metric">
                    <div className="value">{onTimeRate.toFixed(1)}%</div>
                    <div className="label">On-Time Delivery</div>
                </div>
                <div className="logistics-metric">
                    <div className="value">{activeShipments}</div>
                    <div className="label">Active Shipments</div>
                </div>
                <div className="logistics-metric">
                    <div className="value">{totalInventoryItems.toLocaleString()}</div>
                    <div className="label">Total Inventory Units</div>
                </div>
                 <div className="logistics-metric">
                    <div className="value">98%</div>
                    <div className="label">Resource Availability</div>
                </div>
            </div>
        </div>
    );
};

export default LogisticsOverview;