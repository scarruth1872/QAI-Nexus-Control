import React from 'react';
// Fix: Corrected import path for types.
import { LogisticsAlert } from '../../types';

interface AlertsFeedProps {
    alerts: LogisticsAlert[];
}

const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts }) => {
    if (alerts.length === 0) {
        return <p className="text-sm text-gray-400">No critical alerts.</p>;
    }

    return (
        <div className="alerts-feed">
            {alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                   <p className="font-bold">{alert.type.replace('_', ' ')}</p>
                   <p>{alert.message}</p>
                </div>
            ))}
        </div>
    );
};

export default AlertsFeed;