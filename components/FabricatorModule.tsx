// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const FabricatorModule: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleNewTask = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Outline the steps for a new fabrication task to create a self-assembling micro-drone, including material requirements and estimated time.");
            setResponse(res);
        } catch (error) {
            setResponse("Error creating fabrication task.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Fabricator Module</h3>
            <p>Status: Idle</p>
            <p>Energy Reserves: 100%</p>
            <button onClick={handleNewTask} disabled={isLoading}>
                {isLoading ? 'Tasking...' : 'New Fabrication Task'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default FabricatorModule;