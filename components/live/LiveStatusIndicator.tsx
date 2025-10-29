import React from 'react';

type ConnectionState = 'IDLE' | 'CONNECTING' | 'ACTIVE' | 'CLOSED' | 'ERROR';

interface LiveStatusIndicatorProps {
    state: ConnectionState;
}

const LiveStatusIndicator: React.FC<LiveStatusIndicatorProps> = ({ state }) => {
    const statusText = {
        IDLE: 'Offline',
        CONNECTING: 'Connecting...',
        ACTIVE: 'Live',
        CLOSED: 'Disconnected',
        ERROR: 'Error'
    };

    return (
        <div className="live-status-indicator">
            <div className={`live-status-dot ${state.toLowerCase()}`} />
            <span className="font-bold">{statusText[state]}</span>
        </div>
    );
};

export default LiveStatusIndicator;
