import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const ResilienceModule: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleSimulate = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Simulate a cascading failure in the auxiliary power grid. Describe how the Predictive Self-Healing & Adaptive Resilience Module (PSHARM) responds to the event.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running failover simulation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Resilience Module</h3>
            <p>Redundancy: Active</p>
            <p>Predicted Failures: 0</p>
            <button onClick={handleSimulate} disabled={isLoading} className="mt-4">
                {isLoading ? 'Simulating...' : 'Simulate Failover'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default ResilienceModule;
