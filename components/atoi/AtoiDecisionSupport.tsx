// Fix: Implemented the AtoiDecisionSupport component.
import React, { useState } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { AtoiTelemetry } from '../../types';
import Spinner from '../Spinner';

interface AtoiDecisionSupportProps {
    telemetry: AtoiTelemetry;
}

const AtoiDecisionSupport: React.FC<AtoiDecisionSupportProps> = ({ telemetry }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);

    const getSuggestion = () => {
        setIsLoading(true);
        setSuggestion(null);
        setTimeout(() => {
            let sug = "All systems nominal. Maintain current posture.";
            if (telemetry.threatLevel === 'High') {
                sug = "High threat detected. Recommend redeploying drone units to Sector 7G for overwatch.";
            } else if (telemetry.threatLevel === 'Medium') {
                sug = "Threat level elevated. Suggest increasing patrol frequency for ground units.";
            }
            setSuggestion(sug);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="module-panel atoi-module">
            <h3>Decision Support</h3>
            <button onClick={getSuggestion} disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Get Tactical Suggestion'}
            </button>
            {isLoading && <Spinner />}
            {suggestion && <div className="module-response mt-2">{suggestion}</div>}
        </div>
    );
};

export default AtoiDecisionSupport;