import React from 'react';
import { AtoiUnit } from '../../types';

interface AtoiViewportProps {
    units: AtoiUnit[];
}

const AtoiViewport: React.FC<AtoiViewportProps> = ({ units }) => {
    // A simplified mercator-like projection for display
    const lonToX = (lon: number) => ((lon + 118.3) / 0.1) * 100;
    const latToY = (lat: number) => ((34.1 - lat) / 0.1) * 100;

    return (
        <div className="module-panel atoi-module" style={{ height: '100%' }}>
            <h3>Tactical Viewport</h3>
            <div className="atoi-map-container">
                {units.map(unit => (
                    <div
                        key={unit.id}
                        className={`atoi-unit-icon ${unit.type.replace(' ', '-').toLowerCase()} status-${unit.status.toLowerCase()}`}
                        style={{
                            left: `${lonToX(unit.position.lng)}%`,
                            top: `${latToY(unit.position.lat)}%`,
                        }}
                        title={`${unit.id} (${unit.type}) - ${unit.status}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AtoiViewport;
