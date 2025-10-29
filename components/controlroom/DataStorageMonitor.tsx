import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { DataStorageState } from '../../types';

interface DataStorageMonitorProps {
    storageState: DataStorageState;
    onGenerateReport: () => void;
}

const DataStorageMonitor: React.FC<DataStorageMonitorProps> = ({ storageState, onGenerateReport }) => {
    const usagePercent = (storageState.used / storageState.total) * 100;
    return (
        <div className="module-panel">
            <h3>Data Storage Array</h3>
            <p>Usage: {storageState.used.toFixed(2)} / {storageState.total.toFixed(2)} PB</p>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${usagePercent}%` }}></div>
            </div>
            <div className="mt-4">
                <p>Read: {storageState.readSpeed.toFixed(2)} GB/s</p>
                <p>Write: {storageState.writeSpeed.toFixed(2)} GB/s</p>
            </div>
            <button onClick={onGenerateReport} className="mt-4 text-xs p-1">Generate Report</button>
        </div>
    );
};

export default DataStorageMonitor;