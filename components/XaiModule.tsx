// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { Mission } from '../types';
import { generateMissionExplanation } from '../services/geminiService';
import Spinner from './Spinner';

interface XaiModuleProps {
    mission: Mission | null;
}

const XaiModule: React.FC<XaiModuleProps> = ({ mission }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!mission) {
            setError("No mission is active to explain.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setExplanation(null);
        try {
            const result = await generateMissionExplanation(mission);
            setExplanation(result);
        } catch (err) {
            setError("Failed to generate explanation from the AI.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>XAI Module (Explainable AI)</h3>
            <p>Query the AI's reasoning for its last decision.</p>
            <button onClick={handleGenerate} disabled={isLoading || !mission}>
                {isLoading ? 'Generating...' : 'Generate Explanation'}
            </button>
            {isLoading && <Spinner />}
            {error && <p className="error-message">{error}</p>}
            {explanation && (
                <div className="explanation-result" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                    <h4>Strategic Rationale</h4>
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

export default XaiModule;