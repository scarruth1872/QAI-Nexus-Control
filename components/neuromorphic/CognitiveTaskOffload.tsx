import React, { useState } from 'react';
import Spinner from '../Spinner';

const CognitiveTaskOffload: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleOffload = () => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult('Task "Real-time pattern recognition" offloaded to chip NM-02. Result: Pattern detected with 99.9% confidence in 5ms. Power consumption: 2mW.');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="module-panel">
            <h3>Cognitive Task Offload</h3>
            <p>Delegate specific, low-power tasks to the neuromorphic hardware for rapid, efficient processing.</p>
            <button onClick={handleOffload} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Offload Pattern Recognition Task'}
            </button>
            {isLoading && <Spinner />}
            {result && <div className="module-response mt-2">{result}</div>}
        </div>
    );
};

export default CognitiveTaskOffload;