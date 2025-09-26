import React from 'react';
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
                    logs.map((log, i) => <p key={i}>[{log.timestamp}] {log.message}</p>)
                ) : (
                    <p>No activity logged for this session.</p>
                )}
            </div>
        </div>
    );
};

export default ProvenanceLogger;
