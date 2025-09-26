import React from 'react';
import { HpcClusterState } from '../../types';

interface HpcClusterMonitorProps {
    clusterState: HpcClusterState;
    onGenerateReport: () => void;
}

const HpcClusterMonitor: React.FC<HpcClusterMonitorProps> = ({ clusterState, onGenerateReport }) => {
    return (
        <div className="module-panel">
            <h3>HPC Cluster</h3>
            {clusterState.servers.map(server => (
                <div key={server.id}>
                    <p className="text-sm">{server.id} ({server.type}) Load: {server.load.toFixed(1)}% | Temp: {server.temp.toFixed(1)}°C</p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${server.load}%` }}></div>
                    </div>
                </div>
            ))}
            <div className="mt-4">
                <h4>AI Training</h4>
                <p className="text-sm">Job: {clusterState.aiTraining.job}</p>
                <p className="text-sm">Progress: {clusterState.aiTraining.progress}% (ETA: {clusterState.aiTraining.eta})</p>
                 <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${clusterState.aiTraining.progress}%` }}></div>
                </div>
            </div>
             <button onClick={onGenerateReport} className="mt-4 text-xs p-1">Generate Report</button>
        </div>
    );
};

export default HpcClusterMonitor;
