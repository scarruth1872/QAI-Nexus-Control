// Fix: Replaced placeholder content with a valid React component.
import React, { useState } from 'react';
// Fix: Corrected import path for geminiService.
import { getTacticalSuggestion } from '../services/geminiService';
import Spinner from './Spinner';

const CosmicCalibrator: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleCalibrate = async () => {
        setIsLoading(true);
        setResponse(null);
        try {
            const res = await getTacticalSuggestion("Summarize the results of a full cosmic calibration sequence locked on the pulsar PSR B1919+21. Note any deviations from expected background radiation levels.");
            setResponse(res);
        } catch (error) {
            setResponse("Error running calibration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Cosmic Calibrator</h3>
            <p>Background Radiation: 2.7K</p>
            <p>Alignment: Locked on PSR B1919+21</p>
            <button onClick={handleCalibrate} disabled={isLoading}>
                {isLoading ? 'Calibrating...' : 'Run Full Calibration'}
            </button>
            {isLoading && <Spinner />}
            {response && <div className="module-response">{response}</div>}
        </div>
    );
};

export default CosmicCalibrator;