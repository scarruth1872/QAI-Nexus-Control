import React from 'react';

interface RobotOperationsLogProps {
    logs: string[];
}

const RobotOperationsLog: React.FC<RobotOperationsLogProps> = ({ logs }) => {
    return (
        <div className="module-panel h-full">
            <h3>Operations Log</h3>
            <div className="operations-log-feed">
                {logs.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default RobotOperationsLog;
