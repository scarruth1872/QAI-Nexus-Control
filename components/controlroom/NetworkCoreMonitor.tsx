import React from 'react';
import { NetworkState } from '../../types';

interface NetworkCoreMonitorProps {
    networkState: NetworkState;
    onGenerateReport: () => void;
}

const NetworkCoreMonitor: React.FC<NetworkCoreMonitorProps> = ({ networkState, onGenerateReport }) => {
    return (
        <div className="module-panel">
            <h3>Network Core</h3>
            <p>Bandwidth: {networkState.bandwidth.toFixed(2)} Gbps</p>
            <p>Latency: {networkState.latency.toFixed(2)} ms</p>
            <p>Status: <span className={`comms-${networkState.status.toLowerCase()}`}>{networkState.status}</span></p>
             <button onClick={onGenerateReport} className="mt-4 text-xs p-1">Generate Report</button>
        </div>
    );
};

export default NetworkCoreMonitor;
