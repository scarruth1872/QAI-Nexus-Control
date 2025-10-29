// FIX: Replaced placeholder content with a valid React component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { LabAutomationRun } from '../../types';

const initialRuns: LabAutomationRun[] = [
    // Fix: Changed status from 'Completed' to 'COMPLETED' to match the Status type.
    { id: 'run-001', protocol: 'DNA Sequencing (Sanger)', status: 'COMPLETED', startTime: '10:00 AM', endTime: '11:30 AM' },
    { id: 'run-002', protocol: 'Protein Synthesis', status: 'Running', startTime: '11:45 AM' },
    // Fix: Changed status from 'Completed' to 'COMPLETED' to match the Status type.
    { id: 'run-003', protocol: 'Cell Culture Maintenance', status: 'COMPLETED', startTime: '09:00 AM', endTime: '09:15 AM' },
    { id: 'run-004', protocol: 'PCR Amplification', status: 'Failed', startTime: '10:30 AM', endTime: '11:00 AM' },
];

const LabAutomationMonitor: React.FC = () => {
    return (
        <div className="module-panel bio-module">
            <h3>Lab Automation Monitor</h3>
            <table className="quantum-table">
                <thead>
                    <tr>
                        <th>Protocol</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {initialRuns.map(run => (
                        <tr key={run.id}>
                            <td>{run.protocol}</td>
                            <td className={`status-${run.status.toLowerCase()}`}>{run.status}</td>
                            <td>{run.startTime}{run.endTime ? ` - ${run.endTime}` : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabAutomationMonitor;