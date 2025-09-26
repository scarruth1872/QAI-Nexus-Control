import React from 'react';
import { Status } from '../../types';

interface StatusIndicatorProps {
    status: Status;
    text: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, text }) => {
    return (
        <div className="status-indicator">
            <div className={`status-dot ${status.toLowerCase()}`}></div>
            <span>{text}</span>
        </div>
    );
};

export default StatusIndicator;