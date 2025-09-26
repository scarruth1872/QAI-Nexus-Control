import React, { useState } from 'react';
import Spinner from '../Spinner';
import { getNanomaterialSimulationSuggestion, getMaterialCharacterization } from '../../services/geminiService';
import { SimulationResult } from '../../types';

interface VirtualLabProps {
    addProvenanceLog: (message: string) => void;
}

const VirtualLab: React.FC<VirtualLabProps> = ({ addProvenanceLog }) => {
    const [prompt, setPrompt] = useState<string>('A self-healing polymer with high thermal resistance for use in starship hulls.');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [isCharacterizing, setIsCharacterizing] = useState(false);
    const [characterizationResult, setCharacterizationResult] = useState<string | null>(null);

    const handleRunSimulation = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setResult(null);
        setError(null);
        setCharacterizationResult(null);
        try {
            addProvenanceLog(`Simulation started: "${prompt}"`);
            const res = await getNanomaterialSimulationSuggestion(prompt);
            setResult(res);
            addProvenanceLog(`Simulation complete for material: ${res.materialName}`);
        } catch (err) {
            console.error(err);
            const errorMsg = "Failed to generate nanomaterial simulation. The AI core may be offline or the request is invalid.";
            setError(errorMsg);
            addProvenanceLog(`Simulation failed: ${errorMsg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCharacterize = async (tool: 'SEM' | 'TEM' | 'XRD') => {
        if (!result) return;
        setIsCharacterizing(true);
        setCharacterizationResult(null);
        try {
            addProvenanceLog(`Characterization started for ${result.materialName} using ${tool}.`);
            const res = await getMaterialCharacterization(result.materialName, tool);
            setCharacterizationResult(res);
            addProvenanceLog(`Characterization complete for ${result.materialName}.`);
        } catch (err) {
            setCharacterizationResult(`Error running ${tool} characterization.`);
             addProvenanceLog(`Characterization failed for ${result.materialName}.`);
        } finally {
            setIsCharacterizing(false);
        }
    };

    return (
        <div className="module-panel nano-module">
            <h3>Virtual Lab</h3>
            <p>Design a novel nanomaterial by describing its desired properties and applications.</p>
            
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A carbon nanotube mesh for filtering microplastics from water..."
                disabled={isLoading}
                style={{ width: '100%', minHeight: '60px', backgroundColor: '#000', border: '1px solid var(--lcars-secondary)', color: 'var(--lcars-text)', padding: '0.5rem', borderRadius: '5px', margin: '0.5rem 0' }}
            />
            
            <button onClick={handleRunSimulation} disabled={isLoading || !prompt.trim()}>
                {isLoading ? 'Synthesizing...' : 'Run Simulation'}
            </button>
            
            {isLoading && <Spinner />}
            
            {error && <div className="module-response mt-2" style={{color: 'var(--status-error)'}}>{error}</div>}

            {result && (
                <div className="mt-2 module-response">
                    <h4>Simulation Complete: {result.materialName}</h4>
                    <div className="mt-2">
                        <strong>Predicted Properties:</strong>
                        <ul>
                            <li>Stability: {result.predictedProperties.stability}</li>
                            <li>Conductivity: {result.predictedProperties.conductivity}</li>
                            <li>Tensile Strength: {result.predictedProperties.tensileStrength}</li>
                        </ul>
                    </div>
                    <div className="mt-2">
                        <strong>Synthesis Notes:</strong>
                        <p>{result.synthesisNotes}</p>
                    </div>
                    <div className="mt-2">
                        <strong>Potential Applications:</strong>
                        <ul>
                            {result.applications.map((app, i) => <li key={i}>{app}</li>)}
                        </ul>
                    </div>
                    <div className="mt-2">
                        <strong>Fabrication Instructions:</strong>
                        <p>{result.fabricationInstructions}</p>
                    </div>

                    <div className="mt-4">
                        <h4>Virtual Characterization</h4>
                        <p className="text-sm">Analyze the designed material using virtual instruments.</p>
                        <div className="characterization-controls">
                            <button onClick={() => handleCharacterize('SEM')} disabled={isCharacterizing}>Run SEM</button>
                            <button onClick={() => handleCharacterize('TEM')} disabled={isCharacterizing}>Run TEM</button>
                            <button onClick={() => handleCharacterize('XRD')} disabled={isCharacterizing}>Run XRD</button>
                        </div>
                        {isCharacterizing && <Spinner />}
                        {characterizationResult && <div className="module-response">{characterizationResult}</div>}
                    </div>

                </div>
            )}
        </div>
    );
};

export default VirtualLab;
