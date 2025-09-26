// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const SystemOptimization: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleRunDiagnostics = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Describe the results of a full system optimization diagnostic, including neuromorphic processor load and cognitive synthesizer efficiency.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running diagnostics.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>System Optimization</h3>
            <p>All systems are running at peak efficiency.</p>
            <button onClick={handleRunDiagnostics} disabled={isLoading}>
                {isLoading ? 'Running...' : 'Run Diagnostics'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default SystemOptimization;