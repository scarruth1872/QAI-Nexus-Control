// Fix: Implemented the AtoiViewport component.
import React, { useState } from 'react';
import { AtoiUnit } from '../../types';

interface AtoiViewportProps {
    units: AtoiUnit[];
}

const AtoiViewport: React.FC<AtoiViewportProps> = ({ units }) => {
    const [hoveredUnit, setHoveredUnit] = useState<AtoiUnit | null>(null);

    // Normalize coordinates to a 0-100 range for display
    const latToY = (lat: number) => ((lat - 34.03) / 0.05) * 100;
    const lngToX = (lng: number) => ((lng - -118.27) / 0.05) * 100;

    return (
        <div className="module-panel atoi-module atoi-viewport-container">
            <h3>Tactical Viewport</h3>
            <div className="atoi-map" onMouseLeave={() => setHoveredUnit(null)}>
                {units.map(unit => (
                    <div
                        key={unit.id}
                        className={`atoi-unit-icon type-${unit.type.toLowerCase().replace(' ', '-')}`}
                        style={{
                            left: `${lngToX(unit.position.lng)}%`,
                            top: `${latToY(unit.position.lat)}%`,
                        }}
                        onMouseEnter={() => setHoveredUnit(unit)}
                    />
                ))}
                {hoveredUnit && (
                    <div className="atoi-tooltip" style={{
                        left: `${lngToX(hoveredUnit.position.lng)}%`,
                        top: `${latToY(hoveredUnit.position.lat)}%`,
                    }}>
                        <strong>ID:</strong> {hoveredUnit.id} <br />
                        <strong>Type:</strong> {hoveredUnit.type} <br />
                        <strong>Status:</strong> {hoveredUnit.status}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AtoiViewport;
