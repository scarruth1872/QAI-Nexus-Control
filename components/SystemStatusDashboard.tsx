// Fix: Replaced placeholder content with a valid React component.
import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { SystemStatus } from '../types';

interface SystemStatusDashboardProps {
  status: SystemStatus;
}

const SystemStatusDashboard: React.FC<SystemStatusDashboardProps> = ({ status }) => {
  return (
    <div className="module-panel">
      <h3>System Status</h3>
      <ul>
        <li>Quantum Core Temp: {status.quantumCoreTemp.toFixed(2)} K</li>
        <li>Neuromorphic Load: {status.neuromorphicProcessorLoad.toFixed(1)}%</li>
        <li>Cognitive Efficiency: {status.cognitiveSynthesizerEfficiency.toFixed(2)}%</li>
        <li>System Integrity: {status.systemIntegrity}%</li>
        <li>Power: Main {status.powerLevels.main}% | Aux {status.powerLevels.auxiliary}%</li>
      </ul>
    </div>
  );
};

export default SystemStatusDashboard;