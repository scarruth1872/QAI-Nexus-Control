import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const QuantumSecurityModule: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleScan = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Run a full scan of the quantum entanglement grid for signs of decoherence or unauthorized observation. Report on the grid's integrity and any detected anomalies.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running security scan.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Quantum Security Module</h3>
            <p>Entanglement Grid: Secure</p>
            <p>Threat Level: Low</p>
            <button onClick={handleScan} disabled={isLoading} className="mt-4">
                {isLoading ? 'Scanning...' : 'Scan Entanglement Grid'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default QuantumSecurityModule;
