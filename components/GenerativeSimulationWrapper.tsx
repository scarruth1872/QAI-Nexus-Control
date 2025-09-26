import React, { useState }from 'react';
import GenerativeSimulationEngine from './GenerativeSimulationEngine';
import MultiModalInput from './MultiModalInput';
import MediaOutput from './MediaOutput';
// Fix: Corrected import path for geminiService.
import { generateImageFromPrompt } from '../services/geminiService';
import Spinner from './Spinner';

const GenerativeSimulationWrapper: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("A photorealistic image of a sleek, silver android serving tea to a cat in a zero-gravity environment.");
    const [outputPrompt, setOutputPrompt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const resultUrl = await generateImageFromPrompt(prompt);
            setImageUrl(resultUrl);
            setOutputPrompt(prompt);
        } catch (err) {
            setError("Failed to generate simulation media.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="module-panel">
            <h3>Generative Simulation</h3>
            <MultiModalInput prompt={prompt} setPrompt={setPrompt} isLoading={isLoading} />
            <GenerativeSimulationEngine onGenerate={handleGenerate} isLoading={isLoading} />
            {isLoading ? <Spinner /> : error ? <p className="error-message">{error}</p> : <MediaOutput imageUrl={imageUrl} prompt={outputPrompt} /> }
        </div>
    );
};

export default GenerativeSimulationWrapper;