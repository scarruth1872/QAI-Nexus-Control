import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const CognitiveSynthesizer: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleRunTest = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Run a diagnostic on the cognitive synthesizer. Report on the data fusion rate, conceptual accuracy, and identify any semantic drift.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running synthesizer diagnostic.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Cognitive Synthesizer</h3>
            <p>Data Fusion Rate: 1.2 TB/s</p>
            <p>Conceptual Accuracy: 99.4%</p>
            <button onClick={handleRunTest} disabled={isLoading} className="mt-4">
                {isLoading ? 'Testing...' : 'Run Fusion Test'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default CognitiveSynthesizer;
