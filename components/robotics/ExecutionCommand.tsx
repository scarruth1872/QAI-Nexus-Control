import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Status } from '../../types';

interface StatusIndicatorProps {
    status: Status;
    text: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, text }) => {
    return (
        <div className="status-indicator">
            <div className={`status-dot ${String(status).toLowerCase()}`}></div>
            <span>{text}</span>
        </div>
    );
};

export default StatusIndicator;