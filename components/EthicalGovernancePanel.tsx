import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const EthicalGovernancePanel: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleAudit = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Perform an ethical compliance audit of the last 1000 high-level decisions. Highlight any decisions that required adjudication by the Asimov-Prime v3.2 framework and report on the outcome.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running ethical audit.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Ethical Governance</h3>
            <p>Compliance Status: 100%</p>
            <p>Framework: Asimov-Prime v3.2</p>
            <button onClick={handleAudit} disabled={isLoading} className="mt-4">
                {isLoading ? 'Auditing...' : 'Audit Decisions'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default EthicalGovernancePanel;
