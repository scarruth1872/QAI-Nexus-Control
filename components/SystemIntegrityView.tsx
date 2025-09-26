// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const SystemIntegrityView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleRunDiagnostic = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Provide a detailed report from a full system integrity diagnostic. Mention any anomalies found.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running diagnostic.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>System Integrity</h3>
            <p>Overall Integrity: 99.9%</p>
            <p>Last Check: 5 minutes ago</p>
            <button onClick={handleRunDiagnostic} disabled={isLoading}>
                {isLoading ? 'Running...' : 'Run Full Diagnostic'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default SystemIntegrityView;