// Fix: Implemented the StrategicRoadmap component.
import React, { useState } from 'react';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const phases = [
    { title: "Phase 1: Quantum Core Stabilization", status: "completed" },
    { title: "Phase 2: Multi-Agent Coordination Enhancement", status: "active" },
    { title: "Phase 3: Cognitive Synthesis Expansion", status: "pending" },
    { title: "Phase 4: Self-Evolving Framework Deployment", status: "pending" },
];

const StrategicRoadmap: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<string | null>(null);

    const getPhaseDetails = async (phaseTitle: string) => {
        setIsLoading(true);
        setDetails(null);
        try {
            const res = await getTacticalSuggestion(`Provide a detailed tactical briefing for the following strategic phase: "${phaseTitle}".`);
            setDetails(res);
        } catch (error) {
            setDetails(`Error fetching details for ${phaseTitle}.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Strategic Roadmap</h3>
            <div className="roadmap-list">
                {phases.map(phase => (
                    <div key={phase.title} className={`roadmap-item ${phase.status}`}>
                        <button onClick={() => getPhaseDetails(phase.title)} disabled={isLoading}>
                           {phase.title} ({phase.status})
                        </button>
                    </div>
                ))}
            </div>
            {isLoading && <Spinner />}
            {details && <div className="module-response">{details}</div>}
        </div>
    );
};

export default StrategicRoadmap;