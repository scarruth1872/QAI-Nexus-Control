// Fix: Implemented the DevelopmentPlanner component with static data.
import React, { useState } from 'react';
import Spinner from './Spinner';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';

interface DevTask {
    id: string;
    title: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    eta: string;
}

const initialTasks: DevTask[] = [
    { id: 'dev-1', title: 'Upgrade Neuromorphic Processor Drivers', status: 'Completed', eta: 'N/A' },
    { id: 'dev-2', title: 'Implement Predictive Caching Layer', status: 'In Progress', eta: '3 days' },
    { id: 'dev-3', title: 'Refactor Agent Communication Protocol', status: 'Pending', eta: '1 week' },
    { id: 'dev-4', title: 'Integrate XAI feedback loop', status: 'Pending', eta: '2 weeks' },
];

const DevelopmentPlanner: React.FC = () => {
    const [tasks] = useState<DevTask[]>(initialTasks);
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<string | null>(null);

    const getUpgradeDetails = async () => {
        const nextUpgrade = tasks.find(t => t.status !== 'Completed');
        if (!nextUpgrade) {
            setDetails("All scheduled development tasks are complete.");
            return;
        }
        setIsLoading(true);
        setDetails(null);
        try {
            const res = await getTacticalSuggestion(`Provide a summary of the next scheduled system upgrade: "${nextUpgrade.title}". Include its importance and expected impact.`);
            setDetails(res);
        } catch (error) {
            setDetails("Error fetching upgrade details.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="module-panel">
            <h3>Development Planner</h3>
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className={`task-item status-${task.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="task-title">{task.title}</span>
                        <span className="task-status">{task.status}</span>
                        <span className="task-eta">ETA: {task.eta}</span>
                    </div>
                ))}
            </div>
            <button onClick={getUpgradeDetails} disabled={isLoading} style={{marginTop: '1rem'}}>
                {isLoading ? 'Fetching...' : 'Get Details on Next Upgrade'}
            </button>
            {isLoading && <Spinner />}
            {details && <div className="module-response">{details}</div>}
        </div>
    );
};

export default DevelopmentPlanner;