import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { PowerState } from '../../types';

interface PowerManagementPanelProps {
    powerState: PowerState;
    onGenerateReport: () => void;
}

const PowerManagementPanel: React.FC<PowerManagementPanelProps> = ({ powerState, onGenerateReport }) => {
    return (
        <div className="module-panel">
            <h3>Power Management</h3>
            <p>UPS Status: {powerState.upsStatus}</p>
            <p>System Load: {powerState.load.toFixed(1)}%</p>
            <p>Backup Time: {powerState.backupTime}</p>
            <button onClick={onGenerateReport} className="mt-4 text-xs p-1">Generate Report</button>
        </div>
    );
};

export default PowerManagementPanel;