import React, { useRef, useEffect } from 'react';
// FIX: Corrected import path for types to be a relative module path.
import { LiveTranscriptionTurn } from '../../types';

interface TranscriptionDisplayProps {
    history: LiveTranscriptionTurn[];
    currentInput: string;
    currentOutput: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ history, currentInput, currentOutput }) => {
    const endOfHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, currentInput, currentOutput]);

    return (
        <div className="module-panel h-full flex flex-col">
            <h3>Live Transcription</h3>
            <div className="transcription-history flex-grow">
                {history.map((turn, index) => (
                    <div key={index} className="transcription-turn">
                        <p><strong>You:</strong> {turn.user}</p>
                        <p><strong>Model:</strong> {turn.model}</p>
                    </div>
                ))}
                {currentInput && <p><strong>You:</strong> {currentInput}...</p>}
                {currentOutput && <p><strong>Model:</strong> {currentOutput}...</p>}
                <div ref={endOfHistoryRef} />
            </div>
        </div>
    );
};

export default TranscriptionDisplay;