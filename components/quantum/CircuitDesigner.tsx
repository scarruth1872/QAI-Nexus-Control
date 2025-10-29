import React, { useState } from 'react';
import Spinner from '../Spinner';
import { getQuantumAlgorithmSuggestion } from '../../services/geminiService';
import { QuantumExperimentResult } from '../../types';
import QuantumCircuitVisualizer from './QuantumCircuitVisualizer';

const CircuitDesigner: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('Factoring a large integer using a quantum algorithm.');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<QuantumExperimentResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunSimulation = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const res = await getQuantumAlgorithmSuggestion(prompt);
            setResult(res);
        } catch (err) {
            console.error(err);
            setError("Failed to generate quantum algorithm suggestion. The AI core may be offline or the request is invalid.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel quantum-module">
            <h3>Quantum Circuit Designer</h3>
            <p>Design a quantum circuit by describing the problem you want to solve.</p>
            
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Searching an unstructured database..."
                disabled={isLoading}
                style={{ width: '100%', minHeight: '60px', backgroundColor: '#000', border: '1px solid var(--lcars-secondary)', color: 'var(--lcars-text)', padding: '0.5rem', borderRadius: '5px', margin: '0.5rem 0' }}
            />
            
            <button onClick={handleRunSimulation} disabled={isLoading || !prompt.trim()}>
                {isLoading ? 'Designing...' : 'Design & Simulate'}
            </button>
            
            {isLoading && <Spinner />}
            
            {error && <div className="module-response mt-2" style={{color: 'var(--status-error)'}}>{error}</div>}

            {result && (
                <div className="mt-2 module-response">
                    <h4>{result.algorithmName}</h4>
                    <p>{result.description}</p>
                    <div className="mt-4">
                        <QuantumCircuitVisualizer circuitString={result.circuitVisualization} />
                    </div>
                    <div className="mt-4">
                        <strong>Simulated Result:</strong>
                        <p>{result.simulatedResult}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircuitDesigner;
