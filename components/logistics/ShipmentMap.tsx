import React, { useState } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Shipment } from '../../types';

interface ShipmentMapProps {
    shipments: Shipment[];
    selectedShipmentId: string | null;
    onSelectShipment: (id: string | null) => void;
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipments, selectedShipmentId, onSelectShipment }) => {
    const [hoveredShipment, setHoveredShipment] = useState<Shipment | null>(null);

    const lonToX = (lon: number) => ((lon + 180) / 360) * 100;
    const latToY = (lat: number) => ((90 - lat) / 180) * 100;

    return (
        <div className="shipment-map-container" onMouseLeave={() => setHoveredShipment(null)}>
            {shipments.map(shipment => (
                <div
                    key={shipment.id}
                    className={`shipment-point ${shipment.status} ${selectedShipmentId === shipment.id ? 'selected' : ''}`}
                    style={{
                        left: `${lonToX(shipment.currentLocation.lon)}%`,
                        top: `${latToY(shipment.currentLocation.lat)}%`,
                    }}
                    onMouseEnter={() => setHoveredShipment(shipment)}
                    onClick={() => onSelectShipment(shipment.id === selectedShipmentId ? null : shipment.id)}
                />
            ))}
            {hoveredShipment && (
                <div className="shipment-tooltip" style={{
                    left: `${lonToX(hoveredShipment.currentLocation.lon)}%`,
                    top: `${latToY(hoveredShipment.currentLocation.lat)}%`,
                }}>
                    <strong>ID:</strong> {hoveredShipment.id} <br/>
                    <strong>Status:</strong> {hoveredShipment.status} <br/>
                    <strong>To:</strong> {hoveredShipment.destination}
                </div>
            )}
        </div>
    );
};

export default ShipmentMap;