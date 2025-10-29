import React from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { ProvenanceLog } from '../../types';

interface ProvenanceLoggerProps {
    logs: ProvenanceLog[];
}

const ProvenanceLogger: React.FC<ProvenanceLoggerProps> = ({ logs }) => {
    return (
        <div className="module-panel nano-module">
            <h3>Provenance Logger</h3>
            <div className="provenance-log-entries">
                {logs.length > 0 ? (
                    logs.map((log, i) => <p key={i}>[{new Date(log.timestamp).toLocaleTimeString()}] {log.message}</p>)
                ) : (
                    <p>No activity logged for this session.</p>
                )}
            </div>
        </div>
    );
};

export default ProvenanceLogger;