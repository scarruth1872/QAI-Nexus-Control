// Fix: Implemented the AtoiCommandOverview component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { AtoiTelemetry } from '../../types';

interface AtoiCommandOverviewProps {
    telemetry: AtoiTelemetry;
}

const AtoiCommandOverview: React.FC<AtoiCommandOverviewProps> = ({ telemetry }) => {
    return (
        <div className="module-panel atoi-module">
            <h3>Command Overview</h3>
            <div className="atoi-overview-grid">
                <div className="atoi-metric">
                    <div className="value">{telemetry.activeUnits}</div>
                    <div className="label">Active Units</div>
                </div>
                <div className="atoi-metric">
                    <div className={`value threat-${telemetry.threatLevel.toLowerCase()}`}>{telemetry.threatLevel}</div>
                    <div className="label">Threat Level</div>
                </div>
                <div className="atoi-metric">
                    <div className={`value comms-${telemetry.commsStatus.toLowerCase()}`}>{telemetry.commsStatus}</div>
                    <div className="label">Comms Status</div>
                </div>
            </div>
        </div>
    );
};

export default AtoiCommandOverview;