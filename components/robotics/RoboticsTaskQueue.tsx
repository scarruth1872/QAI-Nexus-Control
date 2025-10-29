import React from 'react';

const tasks = [
    { id: 'RT-01', description: 'Move component A to assembly station', status: 'In Progress' },
    { id: 'RT-02', description: 'Scan Sector 4 for anomalies', status: 'Pending' },
    { id: 'RT-03', description: 'Recharge UGV-02', status: 'Pending' },
];

const RoboticsTaskQueue: React.FC = () => {
    return (
        <div className="module-panel">
            <h3>Task Queue</h3>
            <ul className="task-queue-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <span>{task.description}</span>
                        <span className={`status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoboticsTaskQueue;
