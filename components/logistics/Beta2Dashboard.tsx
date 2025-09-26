import React, { useState, useEffect } from 'react';
// Fix: Corrected import path for types.
import { Agent, Shipment, Warehouse, LogisticsAlert } from '../../types';
import LogisticsOverview from './LogisticsOverview';
import ShipmentMap from './ShipmentMap';
import InventoryManager from './InventoryManager';
import RouteOptimizer from './RouteOptimizer';
import AlertsFeed from './AlertsFeed';

// Mock Data
const initialShipments: Shipment[] = [
    { id: 'SH-001', origin: 'New York', destination: 'Los Angeles', status: 'ON_TIME', currentLocation: { lat: 40.71, lon: -95.00 }, eta: '2 days', manifest: [{ item: 'Quantum Gyroscopes', quantity: 50 }] },
    { id: 'SH-002', origin: 'London', destination: 'Tokyo', status: 'ON_TIME', currentLocation: { lat: 51.50, lon: 45.00 }, eta: '5 days', manifest: [{ item: 'Plasma Injectors', quantity: 200 }] },
    { id: 'SH-003', origin: 'Berlin', destination: 'Sydney', status: 'DELAYED', currentLocation: { lat: 25.27, lon: 82.97 }, eta: '8 days (Delayed)', manifest: [{ item: 'Cryo-coolant', quantity: 1500 }] },
];

const initialWarehouses: Warehouse[] = [
    { id: 'WH-NY', location: 'New York', capacity: 10000, inventory: [{ sku: 'QG-01', name: 'Quantum Gyroscopes', quantity: 1200, reorderPoint: 1000 }] },
    { id: 'WH-TK', location: 'Tokyo', capacity: 25000, inventory: [{ sku: 'PI-03', name: 'Plasma Injectors', quantity: 8500, reorderPoint: 5000 }, { sku: 'CC-02', name: 'Cryo-coolant', quantity: 4500, reorderPoint: 5000 }] },
];

interface Beta2DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Beta2Dashboard: React.FC<Beta2DashboardProps> = ({ agent, onReturn }) => {
    const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
    const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
    const [alerts, setAlerts] = useState<LogisticsAlert[]>([]);
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

    // Simulation loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Move shipments
            setShipments(prev => prev.map(s => {
                if (s.status !== 'DELIVERED') {
                    // Simple mock movement towards destination
                    const lonDelta = s.destination === 'Los Angeles' ? -2 : (s.destination === 'Tokyo' ? 2 : 1);
                     return { ...s, currentLocation: { ...s.currentLocation, lon: s.currentLocation.lon + lonDelta } };
                }
                return s;
            }));

            // Check for new alerts
            const lowStockItem = warehouses.flatMap(w => w.inventory).find(i => i.quantity < i.reorderPoint);
            if (lowStockItem && !alerts.some(a => a.message.includes(lowStockItem.sku))) {
                setAlerts(prev => [{ id: `alrt-${Date.now()}`, type: 'LOW_STOCK', message: `Low stock for ${lowStockItem.name} (${lowStockItem.sku})`, timestamp: new Date().toISOString() }, ...prev]);
            }

        }, 2000);

        return () => clearInterval(interval);
    }, [alerts, warehouses]);

    const onTimeRate = (shipments.filter(s => s.status === 'ON_TIME').length / shipments.length) * 100;

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                 <h3>Logistics Dashboard: {agent.name}</h3>
                 <button onClick={onReturn}>Return to Comms</button>
            </div>
           
            <div className="logistics-dashboard">
                <div className="logistics-overview">
                    <LogisticsOverview 
                        onTimeRate={onTimeRate}
                        activeShipments={shipments.filter(s => s.status !== 'DELIVERED').length}
                        warehouses={warehouses}
                    />
                </div>
                <div className="module-panel logistics-alerts">
                    <h3>Alerts</h3>
                    <AlertsFeed alerts={alerts} />
                </div>
                <div className="module-panel logistics-map">
                    <h3>Live Shipment Map</h3>
                    <ShipmentMap 
                        shipments={shipments}
                        selectedShipmentId={selectedShipmentId}
                        onSelectShipment={setSelectedShipmentId}
                    />
                </div>
                <div className="module-panel logistics-inventory">
                    <h3>Inventory Management</h3>
                    <InventoryManager warehouses={warehouses} />
                </div>
                <div className="module-panel logistics-optimizer">
                    <h3>Route Optimization</h3>
                    <RouteOptimizer shipments={shipments} />
                </div>
            </div>
        </>
    );
};

export default Beta2Dashboard;