import React, { useState } from 'react';
import Spinner from '../Spinner';

const EthicalOversight: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleRunCheck = () => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult('Ethical oversight check complete. Proposed analysis on gene expression is compliant with Bio-Ethics Protocol 2.1. No concerns flagged.');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="module-panel bio-module">
            <h3>Ethical Oversight</h3>
            <p>Current analysis: <strong>Gene expression profiling</strong></p>
            <p>This module ensures all bio-computational tasks adhere to strict ethical and safety protocols.</p>
            <button onClick={handleRunCheck} disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Run Compliance Check'}
            </button>
            {isLoading && <Spinner />}
            {result && <div className="module-response mt-2">{result}</div>}
        </div>
    );
};

export default EthicalOversight;
