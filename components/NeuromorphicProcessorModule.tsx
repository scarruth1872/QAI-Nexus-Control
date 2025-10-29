import React, { useState } from 'react';
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const NeuromorphicProcessorModule: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleRunTest = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Simulate a synaptic plasticity test on the neuromorphic processor. Describe the learning rate and efficiency improvements.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running synaptic plasticity test.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Neuromorphic Processor</h3>
            <p>Activity: Nominal</p>
            <p>Synaptic Plasticity: Optimal</p>
            <button onClick={handleRunTest} disabled={isLoading} className="mt-4">
                {isLoading ? 'Testing...' : 'Run Plasticity Test'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default NeuromorphicProcessorModule;
