// Fix: Replaced placeholder content with a valid React component.
import React from 'react';

interface GenerativeSimulationEngineProps {
    onGenerate: () => void;
    isLoading: boolean;
}

const GenerativeSimulationEngine: React.FC<GenerativeSimulationEngineProps> = ({ onGenerate, isLoading }) => {
    return (
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <p>Run predictive models for mission outcomes.</p>
            <button onClick={onGenerate} disabled={isLoading}>
                {isLoading ? 'Simulating...' : 'New Simulation'}
            </button>
        </div>
    );
};

export default GenerativeSimulationEngine;