import React, { useState } from 'react';
import Spinner from '../Spinner';
import { getQuantumAlgorithmSuggestion } from '../../services/geminiService';
import { QuantumExperimentResult } from '../../types';

const CircuitDesigner: React.FC = () => {
    const [problem, setProblem] = useState<string>('Design a molecule for a new, highly efficient battery.');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<QuantumExperimentResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunSimulation = async () => {
        if (!problem.trim()) return;
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const res = await getQuantumAlgorithmSuggestion(problem);
            setResult(res);
        } catch (err) {
            console.error(err);
            setError("Failed to generate quantum algorithm. The AI core may be offline or the request is invalid.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel quantum-module">
            <h3>Interactive Research Hub</h3>
            <p>Input a complex research problem for Epsilon-5 to analyze and solve using quantum computation.</p>
            
            <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g., Find the prime factors of a large number, simulate a chemical reaction..."
                disabled={isLoading}
                style={{ width: '100%', minHeight: '60px', backgroundColor: '#000', border: '1px solid var(--lcars-secondary)', color: 'var(--lcars-text)', padding: '0.5rem', borderRadius: '5px', margin: '0.5rem 0' }}
            />
            
            <button onClick={handleRunSimulation} disabled={isLoading || !problem.trim()}>
                {isLoading ? 'Simulating...' : 'Design & Simulate on QPU'}
            </button>
            
            {isLoading && <Spinner />}
            
            {error && <div className="module-response mt-2" style={{color: 'var(--status-error)'}}>{error}</div>}

            {result && (
                <div className="mt-2">
                    <div className="module-response">
                        <strong>Algorithm:</strong> {result.algorithmName}
                        <p>{result.description}</p>
                    </div>
                    <div className="module-panel" style={{marginTop: '1rem'}}>
                        <h4>Quantum Circuit Visualization</h4>
                        <div className="circuit-placeholder">
                           {result.circuitVisualization}
                        </div>
                    </div>
                     <div className="module-response" style={{marginTop: '1rem'}}>
                        <strong>Simulated Result:</strong>
                        <p>{result.simulatedResult}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircuitDesigner;
