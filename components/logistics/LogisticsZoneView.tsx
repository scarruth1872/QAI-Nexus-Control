import React from 'react';
import { useAppState } from '../../contexts/AppContext.tsx';

const LogisticsZoneView: React.FC = () => {
    const { arasLabState } = useAppState();
    const logisticsState = arasLabState.logistics;

    return (
        <div className="zonal-view-grid">
            <div className="module-panel">
                <h3>Automated Storage (AS/RS)</h3>
                <p>System Status: {logisticsState.asrs.status}</p>
                <p>Last Movement: {logisticsState.asrs.lastMovement}</p>
            </div>
            <div className="module-panel">
                <h3>Shipments</h3>
                <p>Incoming Deliveries: {logisticsState.shipments.incoming}</p>
                <p>Outgoing Packages: {logisticsState.shipments.outgoing}</p>
            </div>
             <div className="module-panel">
                <h3>Secure Storage</h3>
                <p>Occupancy:</p>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${logisticsState.secureStorage.occupancy}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default LogisticsZoneView;
