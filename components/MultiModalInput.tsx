// Fix: Replaced placeholder content with a valid React component.
import React, { useState, useRef, useEffect } from 'react';
// Fix: Corrected import path for Icons.
import { MicrophoneIcon, StopCircleIcon } from './Icons';

interface MultiModalInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    isLoading: boolean;
}

const MultiModalInput: React.FC<MultiModalInputProps> = ({ prompt, setPrompt, isLoading }) => {
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Fix: Cast window to `any` to access browser-specific SpeechRecognition APIs.
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event: any) => {
                const finalTranscript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map(result => result.transcript)
                    .join('');

                if (finalTranscript) {
                    setPrompt(prev => (prev ? prev + ' ' : '') + finalTranscript.trim());
                }
            };

            recognition.onend = () => {
                setIsRecording(false);
            };
        }
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [setPrompt]);

    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert("Voice recognition is not supported by your browser.");
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    return (
        <div className="module-panel" style={{padding: 0, border: 'none'}}>
            <h3>Multi-Modal Input</h3>
            <textarea 
                placeholder="Enter text prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                style={{ width: '100%', minHeight: '100px', backgroundColor: '#000', border: '1px solid var(--lcars-secondary)', color: 'var(--lcars-text)', padding: '0.5rem', borderRadius: '5px' }}
            ></textarea>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button disabled={isLoading}>Upload Image</button>
                 {recognitionRef.current && (
                    <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`voice-btn ${isRecording ? 'recording' : ''}`}
                        title={isRecording ? 'Stop Recording' : 'Start Recording'}
                        disabled={isLoading}
                    >
                        {isRecording ? <StopCircleIcon /> : <MicrophoneIcon />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiModalInput;