// Fix: Implemented the Beta2Dashboard, a specialized view for the logistics agent.
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Agent, Shipment, Warehouse, LogisticsAlert } from '../../types';
import LogisticsOverview from './LogisticsOverview';
import ShipmentMap from './ShipmentMap';
import InventoryManager from './InventoryManager';
import RouteOptimizer from './RouteOptimizer';
import AlertsFeed from './AlertsFeed';
import { getTacticalSuggestion } from '../../services/geminiService';
import Spinner from '../Spinner';

const initialShipments: Shipment[] = [
    // Fix: Changed status from 'IN_TRANSIT' to 'IN_PROGRESS' to match the Status type.
    { id: 'SHP-001', origin: 'New York', destination: 'Los Angeles', status: 'IN_PROGRESS', currentLocation: { lat: 39.8283, lon: -98.5795 } },
    { id: 'SHP-002', origin: 'Chicago', destination: 'Miami', status: 'DELAYED', currentLocation: { lat: 36.1699, lon: -86.7816 } },
    // Fix: Changed status from 'IN_TRANSIT' to 'IN_PROGRESS' to match the Status type.
    { id: 'SHP-003', origin: 'Seattle', destination: 'Denver', status: 'IN_PROGRESS', currentLocation: { lat: 43.0731, lon: -107.2903 } },
    { id: 'SHP-004', origin: 'Houston', destination: 'New York', status: 'DELIVERED', currentLocation: { lat: 40.7128, lon: -74.0060 } },
];

const initialWarehouses: Warehouse[] = [
    { id: 'WH-01', location: 'Edison, NJ', capacity: 100000, inventory: [{ sku: 'COMP-A', name: 'Quantum Processors', quantity: 5000, reorderPoint: 2000 }] },
    { id: 'WH-02', location: 'Ontario, CA', capacity: 150000, inventory: [{ sku: 'MAT-B', name: 'Carbon Nanotubes', quantity: 12000, reorderPoint: 10000 }] },
];

const initialAlerts: LogisticsAlert[] = [
    { id: 'ALERT-01', type: 'WEATHER_WARNING', message: 'Tornado warning near Nashville, TN. SHP-002 may be affected.' },
];

interface Beta2DashboardProps {
    agent: Agent;
    onReturn: () => void;
}

const Beta2Dashboard: React.FC<Beta2DashboardProps> = ({ agent, onReturn }) => {
    const [shipments, setShipments] = useState(initialShipments);
    const [warehouses, setWarehouses] = useState(initialWarehouses);
    const [alerts, setAlerts] = useState(initialAlerts);
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    const generateReport = async () => {
        setIsLoadingReport(true);
        setReport(null);
        try {
            const prompt = `Generate a daily logistics summary for Beta-2. There are ${shipments.length} total shipments (${shipments.filter(s => s.status === 'DELAYED').length} delayed). Warehouse utilization is high. There is one weather alert.`;
            const res = await getTacticalSuggestion(prompt);
            setReport(res);
        } catch (error) {
            setReport("Error generating report.");
        } finally {
            setIsLoadingReport(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3>Logistics Coordinator Dashboard: {agent.name}</h3>
                <button onClick={onReturn}>Return to Comms</button>
            </div>
            <div className="logistics-dashboard-grid">
                <div className="logistics-overview module-panel">
                    <LogisticsOverview onTimeRate={75.0} activeShipments={shipments.filter(s=>s.status !== 'DELIVERED').length} warehouses={warehouses} />
                </div>
                <div className="logistics-map module-panel">
                    <h3>Global Shipment Tracker</h3>
                    <ShipmentMap shipments={shipments} selectedShipmentId={selectedShipmentId} onSelectShipment={setSelectedShipmentId} />
                </div>
                <div className="logistics-inventory module-panel">
                    <h3>Warehouse Inventory</h3>
                    <InventoryManager warehouses={warehouses} />
                </div>
                <div className="logistics-routes module-panel">
                     <h3>Route Optimization</h3>
                     <RouteOptimizer shipments={shipments} />
                </div>
                <div className="logistics-alerts module-panel">
                     <h3>Critical Alerts</h3>
                     <AlertsFeed alerts={alerts} />
                </div>
                <div className="logistics-report module-panel">
                    <h3>AI-Generated Summary</h3>
                    <button onClick={generateReport} disabled={isLoadingReport}>
                        {isLoadingReport ? "Generating..." : "Generate Daily Briefing"}
                    </button>
                    {isLoadingReport && <Spinner />}
                    {report && <div className="module-response mt-2">{report}</div>}
                </div>
            </div>
        </div>
    );
};

export default Beta2Dashboard;