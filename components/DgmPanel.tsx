import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const DgmPanel: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleReevaluate = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Based on the last 24 hours of operational data, re-evaluate the priority of all secondary objectives. Report any recommended changes to the current goal hierarchy.");
            setResponse(res);
        } catch (error) {
            setResponse("Error re-evaluating objectives.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Dynamic Goal Management</h3>
            <p>Primary Objective: Stable.</p>
            <p>Secondary Objectives: In progress.</p>
             <button onClick={handleReevaluate} disabled={isLoading} className="mt-4">
                {isLoading ? 'Evaluating...' : 'Re-evaluate Objectives'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default DgmPanel;
