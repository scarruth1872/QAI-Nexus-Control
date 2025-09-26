// Fix: Implemented the AtoiAnalyticsHub component.
import React from 'react';
import { AtoiUnit } from '../../types';

interface AtoiAnalyticsHubProps {
    units: AtoiUnit[];
}

const AtoiAnalyticsHub: React.FC<AtoiAnalyticsHubProps> = ({ units }) => {
    const readyUnits = units.filter(u => u.status !== 'Damaged').length;
    const unitReadiness = (readyUnits / units.length) * 100;

    return (
        <div className="module-panel atoi-module">
            <h3>Analytics Hub</h3>
            <p><strong>Unit Readiness:</strong> {unitReadiness.toFixed(1)}%</p>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${unitReadiness}%` }}></div>
            </div>
            <p className="text-xs mt-2"><strong>Performance Metrics:</strong></p>
            <ul className="text-xs">
                <li>Avg. Engagement Time: 4.2 mins</li>
                <li>Success Rate: 98%</li>
            </ul>
        </div>
    );
};

export default AtoiAnalyticsHub;
